// Fireflies v2 · rasteriza os SVGs registrados em manifesto/*.json
//  - PNG: digital em 2×; impresso a 300 dpi, recortado na linha de corte (prova sem sangria)
//  - PDF: Chromium page.pdf no tamanho real (mm, com sangria) e printBackground; vetorial
// Uso: node render.js            (tudo)
//      node render.js papelaria  (só entradas cujo caminho contém "papelaria")
//      node render.js --sem-png  (só PDFs)
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const OUT = path.resolve(__dirname, '..');
const PX = 96 / 25.4;

const args = process.argv.slice(2);
const filtro = args.find(a => !a.startsWith('--'));
const semPng = args.includes('--sem-png');

function inline(rel, k) {
  let s = fs.readFileSync(path.join(OUT, rel + '.svg'), 'utf8').replace(/^<\?xml[^>]*>\s*/, '');
  return s.replace(/id="([^"]+)"/g, `id="p${k}-$1"`).replace(/url\(#([^)]+)\)/g, `url(#p${k}-$1)`).replace(/href="#([^"]+)"/g, `href="#p${k}-$1"`);
}
const css = (w, h, unit) => unit === 'mm' ? [w * PX, h * PX] : [w, h];

(async () => {
  const man = fs.readdirSync(path.join(__dirname, 'manifesto')).filter(f => f.endsWith('.json'))
    .flatMap(f => JSON.parse(fs.readFileSync(path.join(__dirname, 'manifesto', f), 'utf8')));
  const sel = man.filter(p => !filtro || p.rel.includes(filtro) || (typeof p.pdf === 'string' && p.pdf.includes(filtro)));
  const browser = await chromium.launch();
  // PNG
  if (!semPng) for (const p of sel.filter(p => p.png !== false)) {
    const [cw, ch] = css(p.w, p.h, p.unit);
    const scale = p.scale || (p.unit === 'mm' ? 300 / 96 : 2);
    const page = await browser.newPage({ viewport: { width: Math.ceil(cw), height: Math.ceil(ch) }, deviceScaleFactor: scale });
    await page.setContent(`<html><body style="margin:0;background:transparent">${inline(p.rel, 0).replace(/width="[\d.]+mm" height="[\d.]+mm"/, `width="${cw}" height="${ch}"`)}</body></html>`);
    const b = (p.bleed || 0) * PX;
    const clip = { x: b, y: b, width: cw - 2 * b, height: ch - 2 * b };
    await page.screenshot({ path: path.join(OUT, p.rel + '.png'), clip, omitBackground: true });
    await page.close();
    console.log('png', p.rel + '.png');
  }
  // PDF
  const grupos = {};
  for (const p of sel.filter(p => p.pdf)) {
    const nome = typeof p.pdf === 'string' ? p.pdf : p.rel;
    (grupos[nome] = grupos[nome] || []).push(p);
  }
  for (const [nome, pags] of Object.entries(grupos)) {
    const f = pags[0];
    const W = f.unit === 'mm' ? `${f.w}mm` : `${f.w}px`, H = f.unit === 'mm' ? `${f.h}mm` : `${f.h}px`;
    const body = pags.map((p, k) => `<div class="pg">${inline(p.rel, k).replace(/<svg ([^>]*?)width="[^"]+" height="[^"]+"/, `<svg $1width="${W}" height="${H}"`)}</div>`).join('');
    const page = await browser.newPage();
    await page.setContent(`<html><head><style>@page{size:${W} ${H};margin:0}html,body{margin:0;padding:0}.pg{width:${W};height:${H};overflow:hidden;break-after:page}.pg:last-child{break-after:auto}.pg svg{display:block}</style></head><body>${body}</body></html>`);
    await page.pdf({ path: path.join(OUT, nome + '.pdf'), width: W, height: H, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
    await page.close();
    console.log('pdf', nome + '.pdf', `(${pags.length} p.)`);
  }
  await browser.close();
})();
