// Monta index.html a partir de fonte.html (injeta sprite de ícones, logo e constelação inline)
// e gera nfse-condominios.pdf + previews/. Uso: node _build/montar.js
const fs = require('fs'), path = require('path');
const DIR = path.resolve(__dirname, '..');
const A = p => fs.readFileSync(path.join(DIR, 'assets', p), 'utf8');

const ICONS = ['calendario','prazo','info','alerta','fiscal','endereco','nota-fiscal','credencial','equipe',
  'check','mais','menos','busca','painel-mensal','guia-imposto','conversa','video-aula'];
const sym = ICONS.map(n => {
  const s = A('icones/' + n + '.svg');
  const inner = s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return `<symbol id="ff-${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner.trim()}</symbol>`;
}).join('\n');
const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">\n${sym}\n</svg>`;

const logo = A('logo/fireflies_horizontal_digital-negativo.svg')
  .replace('<svg ', '<svg class="hero-logo" role="img" aria-label="Fireflies Consultoria" ');
const logoPos = A('logo/fireflies_horizontal_digital.svg')
  .replace('<svg ', '<svg class="logo-pos" role="img" aria-label="Fireflies Consultoria" ');
const simbolo = A('logo/fireflies_simbolo_digital-negativo.svg')
  .replace('<svg ', '<svg aria-hidden="true" ').replace(/<title>[\s\S]*?<\/title>/, '');
const cons = A('condominios-sem-letras.svg')
  .replace(/<svg [^>]*?width="64" height="64"/, m => m.replace('width="64" height="64"', 'class="hero-const" aria-hidden="true"'))
  .replace(/<title>[\s\S]*?<\/title>/, '');

const YES = '<svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="8.25" fill="currentColor"/><path d="M5 9.3l2.7 2.7L13 6.3" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const NO = '<svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7.75" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.25 9h7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const TREND = '<svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7.75" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 1.25a7.75 7.75 0 0 0 0 15.5z" fill="currentColor"/></svg>';
const CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5 10-11"/></svg>';

let html = fs.readFileSync(path.join(__dirname, 'fonte.html'), 'utf8')
  .replace('<!--SPRITE-->', sprite)
  .replace('<!--LOGO-->', logo)
  .replace('<!--CONST-->', cons)
  .replace('<!--LOGO_POS-->', logoPos)
  .replace('<!--SIMBOLO-->', simbolo)
  .split('<!--YES-->').join(YES)
  .split('<!--NO-->').join(NO)
  .split('<!--TREND-->').join(TREND)
  .split('<!--CHK-->').join(CHK);
fs.writeFileSync(path.join(DIR, 'index.html'), html);
console.log('index.html', (html.length / 1024).toFixed(0) + ' KB');

if (process.argv.includes('--sem-pdf')) process.exit(0);

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execSync } = require('child_process');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.join(DIR, 'index.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.emulateMedia({ media: 'print' });
  const pdf = path.join(DIR, 'nfse-condominios.pdf');
  await p.pdf({ path: pdf, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await b.close();
  const info = execSync(`pdfinfo "${pdf}"`).toString();
  const pages = +info.match(/Pages:\s+(\d+)/)[1];
  console.log('PDF', pages, 'páginas');
  const prev = path.join(DIR, 'previews');
  fs.readdirSync(prev).forEach(f => fs.unlinkSync(path.join(prev, f)));
  for (const n of [...new Set([1, 2, 4, pages])]) {
    execSync(`pdftoppm -png -r 110 -f ${n} -l ${n} -singlefile "${pdf}" "${prev}/pagina-${String(n).padStart(2, '0')}"`);
  }
  console.log('previews ok');
})();
