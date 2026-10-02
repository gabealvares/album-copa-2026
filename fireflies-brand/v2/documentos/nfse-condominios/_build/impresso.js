// Gera a versão impressa paginada: _build/impresso.html -> nfse-condominios.pdf + previews/impresso-pNN.png + spread
// Uso: node _build/impresso.js
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const B = __dirname, DIR = path.resolve(B, '..');
const A = p => fs.readFileSync(path.join(DIR, 'assets', p), 'utf8');
const ICONS = ['calendario','prazo','info','alerta','fiscal','endereco','nota-fiscal','credencial','equipe','check','guia-imposto','conversa','video-aula'];
const sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' + ICONS.map(n => {
  const inner = A('icones/' + n + '.svg').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return `<symbol id="ff-${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`;
}).join('') + '</svg>';
let k = 0;
const uniq = svg => { k++; return svg.replace(/id="([^"]+)"/g, `id="$1-${k}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${k})`).replace(/href="#([^"]+)"/g, `href="#$1-${k}"`); };
const fit = svg => svg.replace(/<title>[\s\S]*?<\/title>/, '').replace('<svg ', '<svg style="width:100%;height:100%;display:block" ').replace(/ width="\d+" height="\d+"/, '');
const S_Y = '<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" fill="currentColor"/><path d="M5 9.3l2.7 2.7L13 6.3" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const S_T = '<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="7.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 1.4a7.6 7.6 0 0 0 0 15.2z" fill="currentColor"/></svg>';
const S_N = '<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="7.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

let html = fs.readFileSync(path.join(B, 'impresso.html'), 'utf8')
  .replace('<!--SPRITE-->', sprite)
  .replace('<!--LOGO_NEG-->', () => fit(uniq(A('logo/fireflies_horizontal_digital-negativo.svg'))))
  .replace('<!--LOGO_NEG2-->', () => fit(uniq(A('logo/fireflies_horizontal_digital-negativo.svg'))))
  .replace('<!--SIMBOLO_NEG-->', () => fit(uniq(A('logo/fireflies_simbolo_digital-negativo.svg'))))
  .replace(/<!--CONST:([a-z]+)-->/g, (m, n) => fit(A(n === 'condominios' ? 'condominios-sem-letras.svg' : 'constelacoes/' + n + '.svg')))
  .split('<!--S_Y-->').join(S_Y).split('<!--S_T-->').join(S_T).split('<!--S_N-->').join(S_N);
// fólios e páginas do sumário
const pages = (html.match(/<section class="page[ "]/g) || []).length;
let i = 0;
html = html.replace(/<section class="page/g, m => (i++, m)).replace(/PAGE/g, () => '');
const out = path.join(B, 'impresso.render.html');
fs.writeFileSync(out, html);

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 900, height: 1200 } });
  await p.goto('file://' + out, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const report = await p.evaluate(() => {
    const pgs = [...document.querySelectorAll('section.page')], pad = n => String(n).padStart(2, '0');
    // números de página
    pgs.forEach((pg, i) => pg.querySelectorAll('.folio .n').forEach(n => n.append(pad(i + 1) + ' / ' + pad(pgs.length))));
    const secs = {}; document.querySelectorAll('section.page').forEach((pg, i) => { if (pg.dataset.sec) secs[pg.dataset.sec] = pad(i + 1); });
    document.querySelectorAll('.src li span:last-child').forEach(el => { const m = el.textContent.match(/^PG(\d\d)$/); if (m) el.textContent = secs[m[1]]; });
    // anotações da NFS-e alinhadas aos grupos
    const doc = document.getElementById('doc'); let last = 0;
    document.querySelectorAll('.ann').forEach(a => { const g = doc.querySelector(`[data-a="${a.dataset.for}"]`); let top = Math.max(g.offsetTop + 10, last + 8); a.style.top = top + 'px'; last = top + a.offsetHeight; });
    // checagem de colisões
    const mm = 96 / 25.4, out = [];
    document.querySelectorAll('section.page').forEach((pg, i) => {
      const r = pg.getBoundingClientRect(); const fol = pg.querySelector('.folio');
      const limit = fol ? fol.getBoundingClientRect().top - 3 * mm : r.bottom;
      const blocks = [...pg.children].filter(c => getComputedStyle(c).position === 'absolute' && !c.matches('.rh,.folio') && c.getBoundingClientRect().top > r.top + 60 * mm);
      const blockTop = Math.min(limit, ...blocks.map(c => c.getBoundingClientRect().top - 4 * mm));
      let maxB = 0; pg.querySelectorAll('.body *, :scope > .g *, :scope > div:not(.rh):not(.folio):not([style*="absolute"]) *').forEach(e => { if (e.closest('[style*="position:absolute"]') && e.closest('[style*="position:absolute"]') !== pg) return; const b = e.getBoundingClientRect().bottom; if (b > maxB) maxB = b; });
      const over = maxB - blockTop; out.push({ p: i + 1, free_mm: Math.round(-over / mm), overflow: over > 0 });
      [...pg.querySelectorAll('*')].forEach(e => { if (e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflow === 'hidden' && !e.matches('.page,.opener')) out.push({ p: i + 1, clip: e.className }); });
    });
    return out;
  });
  console.log(JSON.stringify(report));
  const pdf = path.join(DIR, 'nfse-condominios.pdf');
  await p.pdf({ path: pdf, width: '210mm', height: '297mm', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
  await b.close();
  const n = +execSync(`pdfinfo "${pdf}"`).toString().match(/Pages:\s+(\d+)/)[1];
  console.log('PDF', n, 'páginas');
  const prev = path.join(DIR, 'previews');
  fs.readdirSync(prev).filter(f => f.startsWith('impresso-') || f.startsWith('pagina-')).forEach(f => fs.unlinkSync(path.join(prev, f)));
  execSync(`pdftoppm -png -r 100 "${pdf}" "${prev}/impresso-p"`);
  fs.readdirSync(prev).forEach(f => { const m = f.match(/^impresso-p-?(\d+)\.png$/); if (m) fs.renameSync(path.join(prev, f), path.join(prev, `impresso-p${m[1].padStart(2, '0')}.png`)); });
  execSync(`python3 -c "
from PIL import Image
import glob
fs=sorted(glob.glob('${prev}/impresso-p[0-9]*.png'))
ims=[Image.open(f).convert('RGB') for f in fs]
w,h=ims[0].size; s=0.36; tw,th=int(w*s),int(h*s); cols=6; rows=(len(ims)+cols-1)//cols; g=24
sh=Image.new('RGB',(cols*tw+(cols+1)*g,rows*th+(rows+1)*g),(200,202,208))
for i,im in enumerate(ims): sh.paste(im.resize((tw,th),Image.LANCZOS),(g+(i%cols)*(tw+g),g+(i//cols)*(th+g)))
sh.save('${prev}/impresso-spread.png')
"`);
  console.log('previews ok');
})();
