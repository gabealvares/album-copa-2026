// Fireflies v2 · atualiza as imagens do manual de marca (img/) a partir do logo e das aplicações.
// Uso: node imagens.js && python3 build.py
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const V2 = path.resolve(__dirname, '../..');
const IMG = path.join(V2, 'manual-de-marca/img');
const url = f => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');

(async () => {
  const br = await chromium.launch();
  const pg = await br.newPage();
  // desenha html num quadro w×h e salva (png transparente ou jpg)
  const quadro = async (html, w, h, out, bg = 'transparent') => {
    await pg.setViewportSize({ width: w, height: h });
    await pg.setContent(`<html><body style="margin:0;width:${w}px;height:${h}px;background:${bg};overflow:hidden">${html}</body></html>`);
    await pg.waitForLoadState('load');
    const jpg = out.endsWith('.jpg');
    await pg.screenshot({ path: out, type: jpg ? 'jpeg' : 'png', quality: jpg ? 88 : undefined, omitBackground: !jpg, clip: { x: 0, y: 0, width: w, height: h } });
  };
  // galeria: app-{grupo}-{arquivo}.jpg <- aplicacoes/{grupo}/{arquivo}.png, mesma largura de antes
  for (const j of fs.readdirSync(IMG).filter(f => /^app-.*\.jpg$/.test(f))) {
    const b = j.slice(4, -4), g = b.split('-')[0], resto = b.slice(g.length + 1);
    const png = fs.readdirSync(path.join(V2, 'aplicacoes', g)).find(f => f.endsWith('.png') && f.slice(0, -4).replace(/_/g, '-') === resto);
    if (!png) { console.warn('sem origem:', j); continue; }
    const src = path.join(V2, 'aplicacoes', g, png);
    const dim = await (async () => { await pg.setContent(`<img src="${url(src)}">`); return pg.evaluate(() => { const i = document.querySelector('img'); return [i.naturalWidth, i.naturalHeight]; }); })();
    const W = { 'digital-avatar-1080': 760, 'ambientacao-selo-contas-auditadas-digital-1080': 760 }[b] || (dim[0] > dim[1] ? (b.startsWith('papelaria-cartao') ? 1063 : 1200) : 760);
    const H = Math.round(W * dim[1] / dim[0]);
    await quadro(`<img src="${url(src)}" style="width:${W}px;height:${H}px;display:block">`, W, H, path.join(IMG, j), '#fff');
  }
  console.log('galeria ok');
  // logo
  const L = f => url(path.join(V2, 'logo/png', f));
  await quadro(`<img src="${L('fireflies_simbolo_digital.png')}" style="width:600px;height:600px">`, 600, 600, path.join(IMG, 'logo-simbolo.png'));
  await quadro(`<img src="${L('fireflies_favicon_digital.png')}" style="width:240px;height:240px">`, 240, 240, path.join(IMG, 'logo-favicon.png'));
  const fam = ['favicon', 'favicon-diagonal', 'favicon-laco'].map(v => `<img src="${L(`fireflies_${v}_digital-negativo.png`)}" style="width:200px;height:200px">`).join('');
  await quadro(`<div style="display:flex;gap:40px;padding:20px">${fam}</div>`, 720, 240, path.join(IMG, 'logo-favicon-familia.png'));
  // construções
  const svg = f => fs.readFileSync(path.join(V2, 'logo', f), 'utf8');
  await quadro(svg('construcao.svg').replace('<svg ', '<svg width="1800" height="1362" style="display:block" '), 1800, 1180, path.join(IMG, 'logo-construcao.jpg'), '#fff');
  await quadro(svg('construcao-simbolo.svg').replace('<svg ', '<svg width="1800" height="900" style="display:block" '), 1800, 900, path.join(IMG, 'logo-construcao-simbolo.jpg'), '#fff');
  console.log('logo ok');
  await br.close();
})();
// As pranchas (img/prancha-*.jpg) vêm de ../../manual-de-aplicacao/pranchas/*.png, reduzidas para 1800 px de largura.
