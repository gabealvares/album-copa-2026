// Monta a prancha de revisão e renderiza com Playwright.
// Uso: node prancha.js [saida.png] [--inspecao]
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const OUT = path.join(__dirname, '..');
const names = JSON.parse(fs.readFileSync(path.join(__dirname, 'icons.json')));
const sprite = fs.readFileSync(path.join(OUT, 'sprite.svg'), 'utf8');
const inspect = process.argv.includes('--inspecao');
const outPng = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : path.join(OUT, 'prancha-icones.png');
const ico = (n, s, extra = '') => `<svg class="i" width="${s}" height="${s}" ${extra}><use href="#ff-${n}"/></svg>`;
const groups = [
  ['Serviços', names.slice(0, 8)], ['Conceitos', names.slice(8, 26)],
  ['Pessoas e contato', names.slice(26, 33)], ['UI', names.slice(33)],
];
const gridBg = `<svg width="96" height="96" viewBox="0 0 24 24" style="position:absolute;inset:0">
  ${Array.from({ length: 25 }, (_, i) => `<path d="M${i} 0V24M0 ${i}H24" stroke="#d5dbe1" stroke-width="${i % 2 ? .03 : .06}"/>`).join('')}
  <rect x="2" y="2" width="20" height="20" fill="none" stroke="#f5a524" stroke-width=".08"/>
  <circle cx="12" cy="12" r="10" fill="none" stroke="#9db9b7" stroke-width=".06"/></svg>`;
const section = (theme, title) => `
<section class="t ${theme}">
  <header><span class="dot"></span><h2>${title}</h2><span class="meta">${theme === 'papel' ? 'Papel #F3F5F7 · Tinta #0E1726 · ponto Oliva #5E6E00' : 'Noite #06262B · Papel #F3F5F7 · ponto Vagalume #D9F24A'}</span></header>
  ${groups.map(([g, list]) => `<h3>${g}</h3><div class="grid">${list.map(n => `
    <figure>${ico(n, 48)}${ico(n, 24)}<figcaption>${n}</figcaption></figure>`).join('')}</div>`).join('')}
  <h3>Teste 16 px · traço 1,5 (linha 1) e traço 2 (linha 2)</h3>
  <div class="row16">${names.map(n => ico(n, 16)).join('')}</div>
  <div class="row16 s2">${names.map(n => ico(n, 16)).join('')}</div>
</section>`;
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{background:#F3F5F7;font-family:'JetBrains Mono',ui-monospace,monospace;width:${inspect ? 820 : 1400}px}
.top{padding:40px 48px 8px;background:#F3F5F7;color:#0E1726}
.top h1{font-family:'Bricolage Grotesque',sans-serif;font-size:40px;letter-spacing:-.02em}
.top h1 b{color:#5E6E00}
.top p{font-size:12px;color:#5A6570;margin-top:6px;letter-spacing:.06em;text-transform:uppercase}
.t{padding:28px 48px 40px}
.papel{background:#F3F5F7;color:#0E1726;--ff-lit:#5E6E00}
.noite{background:#06262B;color:#F3F5F7;--ff-lit:#D9F24A}
header{display:flex;align-items:center;gap:12px;margin-bottom:8px}
header h2{font-family:'Bricolage Grotesque',sans-serif;font-size:24px}
.dot{width:10px;height:10px;border-radius:50%;background:var(--ff-lit)}
.meta{font-size:11px;opacity:.7;margin-left:auto;letter-spacing:.04em}
h3{font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.65;margin:18px 0 10px;font-weight:500}
.grid{display:grid;grid-template-columns:repeat(9,1fr);gap:10px}
figure{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 4px 10px;border-radius:8px}
.papel figure{background:#fff;box-shadow:0 0 0 1px #D5DBE1}
.noite figure{background:#082D33;box-shadow:0 0 0 1px #104048}
figcaption{font-size:10px;opacity:.75}
.row16{display:flex;flex-wrap:wrap;gap:14px;padding:10px 0}
.s2{--ff-stroke:2}
.insp{display:grid;grid-template-columns:repeat(6,1fr);gap:16px;padding:32px 48px;background:#fff;color:#0E1726;--ff-lit:#5E6E00}
.cell{position:relative;width:96px;height:96px}
.cell svg.i{position:absolute;inset:0}
.insp figcaption{font-size:10px;margin-top:4px}
</style></head><body>${sprite}
${inspect ? `<div class="insp">${names.map(n => `<div><div class="cell">${gridBg}${ico(n, 96)}</div><figcaption>${n}</figcaption></div>`).join('')}</div>` : `
<div class="top"><h1>Iconografia Fireflies<b>.</b></h1><p>36 ícones · grid 24 · área viva 20 · traço 1,5 · 1 ponto aceso no máximo</p></div>
${section('papel', 'Sobre Papel')}${section('noite', 'Sobre Noite')}`}
</body></html>`;
fs.writeFileSync(path.join(__dirname, inspect ? 'inspecao.html' : 'prancha.html'), html);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ deviceScaleFactor: inspect ? 2 : 1.5 });
  await p.setContent(html, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
  await p.waitForTimeout(500);
  await p.screenshot({ path: outPng, fullPage: true });
  await b.close();
  console.log('ok', outPng);
})();
