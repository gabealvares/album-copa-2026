// Fireflies v2 · gera símbolo, símbolo pequeno e favicons (7 cores), PNGs, ícones de app, .ico,
// construções e a prancha do sistema. Uso: node gerar.js   (precisa de ../../aplicacoes/_build com npm ci)
// Parâmetros aprovados em parametros.js (rodada 5, 03/10/2026).
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { simbolo, rastro, construcao, C } = require('./simbolo');
const P = require('./parametros');
const { t } = require('../../aplicacoes/_build/lib');

const LOGO = path.resolve(__dirname, '..');
const SVG = path.join(LOGO, 'svg'), PNG = path.join(LOGO, 'png');
const SITE = path.resolve(LOGO, '../site/wp-content');
const CORES = { digital: 'dg', 'digital-negativo': 'dn', chapado: 'ch', 'chapado-negativo': 'cn', 'mono-anil': 'ma', 'mono-branco': 'mb', 'mono-preto': 'mp' };
const titulo = (s, tt) => s.replace(/<title>.*?<\/title>/, `<title>${tt}</title>`);

// ---------- SVGs ----------
const arquivos = {}; // nome -> svg
for (const [cor, k] of Object.entries(CORES)) {
  arquivos[`simbolo_${cor}`] = simbolo(P.simbolo, cor, { id: `sb-${k}` });
  arquivos[`simbolo-pequeno_${cor}`] = simbolo(P.pequeno, cor, { id: `sp-${k}`, pequeno: true });
  for (const [v, o] of Object.entries(P.favicon)) {
    const nome = { favicon: 'favicon (vagalume com rastro, Arco)', 'favicon-diagonal': 'favicon alternativo (Diagonal)', 'favicon-laco': 'favicon alternativo (Laço)' }[v];
    arquivos[`${v}_${cor}`] = titulo(rastro(o, cor, { id: `${v.replace('favicon', 'fv')}-${k}`, asas: true }), `Fireflies · ${nome}, a partir de 32 px`);
    arquivos[`${v}-16_${cor}`] = titulo(rastro(o, cor, { id: `${v.replace('favicon', 'fv')}16-${k}`, micro: true }), `Fireflies · ${nome}, desenho de 16 a 31 px`);
  }
}
// limpa versões antigas do favicon (F + luz) e grava
for (const [n, s] of Object.entries(arquivos)) fs.writeFileSync(path.join(SVG, `fireflies_${n}.svg`), s);
console.log('svg', Object.keys(arquivos).length);

// ícones sobre Anil (app, avatar)
const icone = (lado, frac, raio = 0, circulo = false) => {
  const s = arquivos['simbolo_digital-negativo'].replace(/<title>.*?<\/title>/, '');
  const inner = s.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const k = lado * frac / 120, o = (lado - 120 * k) / 2;
  const fundo = circulo ? `<circle cx="${lado / 2}" cy="${lado / 2}" r="${lado / 2}" fill="${C.anil}"/>` : `<rect width="${lado}" height="${lado}" rx="${raio}" fill="${C.anil}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}" viewBox="0 0 ${lado} ${lado}">${fundo}<g transform="translate(${o} ${o}) scale(${k})">${inner}</g></svg>`;
};

// ---------- construção do símbolo (texto em curvas) ----------
function construcaoSimbolo() {
  const o = P.simbolo, S = 4; // 120 u -> 480
  const W = 1400, H = 700, x0 = 60, y0 = 60;
  const sb = arquivos.simbolo_digital.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<title>.*?<\/title>/, '').replace(/ff-sb-dg/g, 'cs2');
  const guia = construcao(o, '#A9301F').replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const D = 2 * o.a, prot = D / 4;
  let b = `<rect width="${W}" height="${H}" fill="#FFFFFF"/>`;
  b += `<g transform="translate(${x0} ${y0}) scale(${S})">`;
  b += `<rect x="${o.cx - o.a - prot}" y="${o.cy - o.b - prot}" width="${D + 2 * prot}" height="${D + 2 * prot}" fill="none" stroke="#6E89B4" stroke-width="0.3" stroke-dasharray="2 1.5"/>`;
  b += `<rect x="${o.cx - o.a - prot}" y="${o.cy - o.b - prot}" width="${prot}" height="${prot}" fill="#6E89B4" fill-opacity="0.15"/>`;
  b += sb + guia + `</g>`;
  b += t('¼ D', { f: 'mono4', s: 14, x: x0 + (o.cx - o.a - prot) * S + 8, y: y0 + (o.cy - o.b - prot) * S + 24, fill: '#6E89B4' });
  const L = [
    ['#6E89B4', 'D = diâmetro da órbita · área de proteção = ¼ D em volta'],
    ['#A9301F', 'órbita: círculo (a mesma órbita do nome, vista de frente)'],
    ['#A9301F', 'voo horário de 300°: começa à 1 h (−54°) e termina às 11 h (−114°)'],
    ['#A9301F', '0–40 % do voo = constelação (fio fino + 8 estrelas, ritmo 0,86)'],
    ['#A9301F', '40–100 % = luz: o fio engrossa até o vagalume, que tem asas'],
    ['#A9301F', 'F: Sora, inteiro e numa cor só; altura = 0,46 D'],
    ['#A9301F', 'F centrado, deslocado 0,015 D para a direita (compensação óptica)'],
    ['#A9301F', 'símbolo pequeno (24–39 px): círculo de 330°, F = 0,55 D,'],
    ['#A9301F', 'fio grosso e constante, sem estrelas e sem asas'],
  ];
  L.forEach(([c, s], i) => { b += t(s, { f: 'mono4', s: 17, x: 700, y: 120 + i * 34, fill: c }); });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><title>Fireflies · construção do símbolo (F em órbita)</title>${b}</svg>`;
}

// construção do lockup: troca o rodapé antigo (símbolo achatado + 2 linhas) pelo novo
function atualizaConstrucao() {
  const f = path.join(LOGO, 'construcao.svg');
  let s = fs.readFileSync(f, 'utf8');
  const i = s.indexOf('<g transform="translate(-254.09 496.65) scale(1.25)">');
  if (i < 0) { console.log('construcao.svg: rodapé já atualizado'); return; }
  s = s.slice(0, i);
  const sb = arquivos.simbolo_digital.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<title>.*?<\/title>/, '').replace(/ff-sb-dg/g, 'csb');
  s += `<g transform="translate(-262 476) scale(1.15)">${sb}</g>`;
  s += t('símbolo: a mesma órbita vista de frente (círculo, voo horário, mesmos trechos e vagalume)', { f: 'mono4', s: 15, x: -96.5, y: 562.65, fill: '#A9301F' });
  s += t('F inteiro numa cor só, centrado na órbita · detalhes em construcao-simbolo.svg', { f: 'mono4', s: 15, x: -96.5, y: 588.65, fill: '#A9301F' });
  fs.writeFileSync(f, s + '</svg>');
  console.log('construcao.svg atualizado');
}

// ---------- .ico (PNG embutido) ----------
function ico(pngs) {
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let off = head.length;
  pngs.forEach(([px, buf], i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(px >= 256 ? 0 : px, e); head.writeUInt8(px >= 256 ? 0 : px, e + 1);
    head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(buf.length, e + 8); head.writeUInt32LE(off, e + 12); off += buf.length;
  });
  return Buffer.concat([head, ...pngs.map(p => p[1])]);
}

// ---------- prancha do sistema ----------
function prancha() {
  const fundos = { digital: '#FFFFFF', 'digital-negativo': C.anil, chapado: C.cal, 'chapado-negativo': C.anil, 'mono-anil': '#FFFFFF', 'mono-branco': '#3A3B5A', 'mono-preto': '#FFFFFF' };
  const ler = n => fs.readFileSync(path.join(SVG, `fireflies_${n}.svg`), 'utf8').replace(/<title>.*?<\/title>/, '');
  let n = 0;
  const cel = (v, cor, alt) => { const s = ler(`${v}_${cor}`).replace(/id="([^"]+)"/g, `id="p${n}$1"`).replace(/url\(#([^)]+)\)/g, `url(#p${n++}$1)`); return `<td style="background:${fundos[cor]}"><div style="height:${alt}px;display:flex;align-items:center;justify-content:center">${s.replace('<svg ', `<svg style="max-height:${alt}px;max-width:220px;width:100%;height:100%" `)}</div></td>`; };
  const linhas = [['horizontal', 120], ['vertical', 170], ['simbolo', 150], ['simbolo-pequeno', 90], ['favicon', 90], ['favicon-16', 60], ['wordmark', 90], ['condominios-horizontal', 120], ['academy-horizontal', 120]];
  let h = `<table><tr><th></th>${Object.keys(CORES).map(c => `<th>${c}</th>`).join('')}</tr>`;
  for (const [v, a] of linhas) h += `<tr><th class="v">${v}</th>${Object.keys(CORES).map(c => cel(v, c, a)).join('')}</tr>`;
  h += '</table>';
  const tam = (cor, bg) => `<div class="tam" style="background:${bg}">${[128, 64, 40].map(p => `<span>${ler('simbolo_' + cor).replace(/id="([^"]+)"/g, `id="q${n}$1"`).replace(/url\(#([^)]+)\)/g, `url(#q${n++}$1)`).replace('<svg ', `<svg width="${p}" height="${p}" `)}<i>${p}</i></span>`).join('')}${[32, 24].map(p => `<span>${ler('simbolo-pequeno_' + cor).replace(/id="([^"]+)"/g, `id="q${n}$1"`).replace(/url\(#([^)]+)\)/g, `url(#q${n++}$1)`).replace('<svg ', `<svg width="${p}" height="${p}" `)}<i>${p}</i></span>`).join('')}${[48, 32].map(p => `<span>${ler('favicon_' + cor).replace(/id="([^"]+)"/g, `id="q${n}$1"`).replace(/url\(#([^)]+)\)/g, `url(#q${n++}$1)`).replace('<svg ', `<svg width="${p}" height="${p}" `)}<i>${p}</i></span>`).join('')}<span>${ler('favicon-16_' + cor).replace(/id="([^"]+)"/g, `id="q${n}$1"`).replace(/url\(#([^)]+)\)/g, `url(#q${n++}$1)`).replace('<svg ', `<svg width="16" height="16" `)}<i>16</i></span></div>`;
  const alt = ['favicon-diagonal', 'favicon-laco'].map(v => `<div class="alt"><b>${v} (guardado)</b>${['digital', 'digital-negativo', 'chapado', 'mono-anil'].map(c => `<span style="background:${fundos[c]}">${ler(`${v}_${c}`).replace(/id="([^"]+)"/g, `id="r${n}$1"`).replace(/url\(#([^)]+)\)/g, `url(#r${n++}$1)`).replace('<svg ', '<svg width="72" height="72" ')}</span>`).join('')}<span style="background:#fff">${ler(`${v}-16_digital`).replace(/id="([^"]+)"/g, `id="r${n}$1"`).replace(/url\(#([^)]+)\)/g, `url(#r${n++}$1)`).replace('<svg ', '<svg width="16" height="16" ')}</span></div>`).join('');
  return `<html><head><meta charset="utf-8"><style>body{margin:0;padding:28px;background:#D8D9D4;font:13px 'IBM Plex Mono',monospace;color:#17183A}h1{font-size:17px;margin:0 0 4px}p{margin:0 0 16px;max-width:1500px}
table{border-collapse:separate;border-spacing:4px;background:#fff}th{font-weight:400;font-size:12px;padding:6px}th.v{text-align:right;font-weight:600;width:150px}td{width:236px;padding:10px 8px}
.row{display:flex;gap:12px;margin-top:12px;flex-wrap:wrap}.tam{display:flex;align-items:flex-end;gap:14px;padding:14px 18px}.tam span,.alt span{display:flex;flex-direction:column;align-items:center;gap:4px}.tam i{font-size:10px;color:#888;font-style:normal}
.alt{display:flex;align-items:center;gap:8px;background:#fff;padding:10px 14px}.alt span{padding:6px}</style></head><body>
<h1>Fireflies · Sistema de logo · "Órbita do vagalume" (rodada 5)</h1>
<p>Símbolo: a mesma órbita do nome, vista de frente (círculo), com o F inteiro numa cor só. Símbolo pequeno: círculo de 330°, F maior, fio grosso. Favicon: o vagalume com um rastro curto (Arco), com desenho próprio para 16 px. Diagonal e Laço ficam guardados como alternativas. ${Object.keys(arquivos).length} SVG do símbolo e dos favicons em 7 cores.</p>
${h}<div class="row">${tam('digital', '#fff')}${tam('digital-negativo', C.anil)}${tam('chapado', C.cal)}</div><div class="row">${alt}</div></body></html>`;
}

(async () => {
  const br = await chromium.launch();
  const pg = await br.newPage({ viewport: { width: 1000, height: 1000 } });
  const shot = async (svg, w, h, out, transp = true) => {
    await pg.setViewportSize({ width: w, height: h });
    await pg.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${w}" height="${h}" style="display:block" `)}</body></html>`);
    return pg.screenshot({ path: out, omitBackground: transp, clip: { x: 0, y: 0, width: w, height: h } });
  };
  // PNG 2000 px (não gera PNG dos desenhos de 16 px)
  for (const [n, s] of Object.entries(arquivos)) if (!n.includes('-16_')) await shot(s, 2000, 2000, path.join(PNG, `fireflies_${n}.png`));
  console.log('png ok');
  // caixa da arte (sem halo) para a biblioteca das aplicações
  const arte = {};
  for (const v of ['simbolo', 'simbolo-pequeno', 'favicon']) {
    await pg.setContent(`<html><body style="margin:0">${arquivos[`${v}_digital`]}</body></html>`);
    arte[v] = await pg.evaluate(() => {
      const svg = document.querySelector('svg');
      svg.querySelectorAll('circle').forEach(c => { if (/-h\)/.test(c.getAttribute('fill') || '')) c.remove(); });
      const b = svg.getBBox(); return [b.x, b.y, b.width, b.height].map(v => Math.round(v * 100) / 100);
    });
  }
  fs.writeFileSync(path.join(__dirname, 'arte.json'), JSON.stringify(arte, null, 1));
  console.log('arte', JSON.stringify(arte));
  // ícones
  await shot(icone(180, .78), 180, 180, path.join(LOGO, 'apple-touch-icon-180.png'), false);
  for (const px of [192, 512]) await shot(icone(px, .74), px, px, path.join(LOGO, `android-${px}.png`), false);
  await shot(icone(1080, .7, 0, true), 1080, 1080, path.join(LOGO, 'avatar-1080.png'));
  const fv = (px) => rastro(P.favicon.favicon, 'digital-negativo', { id: 'ico' + px, fundo: true, asas: px >= 32, micro: px < 32 });
  const layers = [];
  for (const px of [16, 32, 48]) layers.push([px, await shot(fv(px), px, px, path.join(__dirname, `.ico-${px}.png`))]);
  fs.writeFileSync(path.join(LOGO, 'favicon.ico'), ico(layers));
  for (const px of [16, 32, 48]) fs.unlinkSync(path.join(__dirname, `.ico-${px}.png`));
  // favicon.svg para o site: desenho de 16 px, cores que funcionam em aba clara e escura
  fs.writeFileSync(path.join(LOGO, 'favicon.svg'), arquivos['favicon-16_digital']);
  console.log('ícones ok');
  // construções
  const cs = construcaoSimbolo();
  fs.writeFileSync(path.join(LOGO, 'construcao-simbolo.svg'), cs);
  atualizaConstrucao();
  // prancha
  await pg.setViewportSize({ width: 1900, height: 1000 });
  await pg.setContent(prancha());
  await pg.screenshot({ path: path.join(LOGO, 'prancha-sistema.png'), fullPage: true });
  console.log('prancha ok');
  // site: ícones do plugin e SVGs do tema
  if (fs.existsSync(SITE)) {
    const A = path.join(SITE, 'plugins/fireflies-core/assets');
    for (const f of ['favicon.ico', 'favicon.svg', 'android-192.png', 'android-512.png', 'apple-touch-icon-180.png']) fs.copyFileSync(path.join(LOGO, f), path.join(A, f));
    const T = path.join(SITE, 'themes/fireflies/assets/img/logo');
    for (const c of ['digital', 'digital-negativo']) fs.copyFileSync(path.join(SVG, `fireflies_simbolo_${c}.svg`), path.join(T, `fireflies_simbolo_${c}.svg`));
    console.log('site ok');
  }
  await br.close();
})();
