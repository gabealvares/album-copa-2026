// Fireflies v2 · camada 2 · constelações dos serviços (emblemas, grid 64)
// Cada serviço = uma pequena constelação catalogada: estrelas de 3 magnitudes,
// traço pontilhado, 1 lanterna, limite de constelação (como os limites da IAU)
// e letras de Bayer (α na lanterna, β na estrela mais brilhante).
const fs = require('fs');
const path = require('path');
const { ROOT, COR, f, gapFor, textPath, fontFaceCSS, shot } = require('./lib');

const OUT = path.join(ROOT, 'constelacoes');
const MAG = { 1: 2.6, 2: 1.8, 3: 1.1 };
const LIT_R = 4.2;

// polar helper
const pol = (cx, cy, r, a) => [+(cx + r * Math.cos((a * Math.PI) / 180)).toFixed(2), +(cy + r * Math.sin((a * Math.PI) / 180)).toFixed(2)];

// Definição: s = {nome: [x, y, mag]} (mag 1|2|3|'L'), links = ['a-b-c', ...] (cadeias), bound = polígono do limite,
// bayer = {nomeDaEstrela: [letra, dx, dy]}
const C = {};

// 1 · Auditoria — a Lupa
(() => {
  const s = {};
  [-100, -40, 10, 45, 100, 160, 215].forEach((a, i) => { s['r' + i] = [...pol(25, 25, 15, a), [2, 3, 2, 1, 3, 2, 3][i]]; });
  s.h1 = [45.5, 45.5, 3]; s.h2 = [55, 55, 1]; s.L = [25, 25, 'L'];
  C.auditoria = { titulo: 'Auditoria', latim: 'Lens', s, links: ['r0-r1-r2-r3-r4-r5-r6-r0', 'r3-h1-h2'],
    bound: [[4, 4], [44, 4], [44, 36], [60, 36], [60, 60], [32, 60], [32, 46], [4, 46]], bayer: { L: ['α', 6, -5], h2: ['β', -10, 2], r3: ['γ', 4, -4] } };
})();

// 2 · Contábil — o Razonete (conta T)
C.contabil = { titulo: 'Contábil', latim: 'Ratio', s: {
  a: [7, 15, 2], b: [19, 13.5, 3], c: [32, 14, 1], d: [45, 15.5, 3], e: [57, 14, 2],
  f: [32, 28, 3], g: [32, 41, 2], h: [32, 55, 1],
  l1: [15, 26, 3], l2: [20, 37, 3], r1: [46, 27, 3], L: [47, 42, 'L'] },
  links: ['a-b-c-d-e', 'c-f-g-h'],
  bound: [[3, 6], [61, 6], [61, 60], [24, 60], [24, 50], [3, 50]], bayer: { L: ['α', 6, -5], c: ['β', 3, -5], h: ['γ', 5, 0] } };

// 3 · Fiscal — a Balança (lanterna no fiel; pratos largos, base reta: nada de "boneco")
C.fiscal = { titulo: 'Fiscal', latim: 'Libra Fisci', s: {
  t: [32, 6, 3], L: [32, 19, 'L'], b0: [9, 19, 2], b1: [20.5, 19, 3], b3: [43.5, 19, 3], b4: [55, 19, 2],
  p0: [32, 33, 3], p1: [32, 46, 3], p2: [32, 57, 1], f0: [20, 57, 2], f1: [44, 57, 2],
  la: [2, 36, 3], lb: [6, 40.5, 3], lc: [12, 40.5, 3], ld: [16, 36, 3],
  ra: [48, 36, 3], rb: [52, 40.5, 3], rc: [58, 40.5, 3], rd: [62, 36, 3] },
  links: ['t-L', 'b0-b1-L-b3-b4', 'L-p0-p1-p2', 'f0-p2-f1', 'la-b0-ld', 'la-lb-lc-ld', 'ra-b4-rd', 'ra-rb-rc-rd'],
  bound: [[0.5, 1], [63.5, 1], [63.5, 48], [50, 48], [50, 62], [14, 62], [14, 48], [0.5, 48]], bayer: { L: ['α', 5, -6], p2: ['β', 4, -4], b4: ['γ', -2, -5] } };

// 4 · Financeira — a Escalada
C.financeira = { titulo: 'Financeira', latim: 'Ascensio', s: {
  a: [6, 49, 2], b: [16, 40, 3], c: [25, 45, 2], d: [36, 30, 3], e: [44, 34, 2], L: [56, 13, 'L'],
  x0: [6, 58, 3], x1: [58, 58, 3], y0: [3, 6, 3] },
  links: ['a-b-c-d-e-L', 'y0-x0-x1'],
  bound: [[1, 3], [42, 3], [42, 1], [63, 1], [63, 62], [1, 62]], bayer: { L: ['α', -12, -2], c: ['β', -2, 8], e: ['γ', 3, 6] } };

// 5 · Gestão de projetos e processos — o Fluxo
C.processos = { titulo: 'Processos', latim: 'Fluxus', s: {
  a: [9, 9, 1], b: [32, 9, 3], d0: [32, 23, 2], d1: [39, 30, 3], d2: [32, 37, 3], d3: [25, 30, 3],
  e: [54, 30, 3], g: [32, 53, 3], L: [54, 53, 'L'] },
  links: ['a-b-d0', 'd0-d1-d2-d3-d0', 'd1-e-L', 'd2-g-L'],
  bound: [[3, 3], [44, 3], [44, 19], [61, 19], [61, 61], [3, 61]], bayer: { L: ['α', 6, -5], a: ['β', 4, -5], d0: ['γ', 4, -4] } };

// 6 · Sindicância — o Olho
(() => {
  const s = { c0: [4, 32, 2], c1: [60, 32, 2], u0: [16, 22, 3], u1: [32, 16.5, 1], u2: [48, 22, 3],
    w0: [17, 42.5, 3], w1: [32, 47.5, 2], w2: [47, 42.5, 3], L: [32, 32, 'L'] };
  [-90, -18, 54, 126, 198].forEach((a, i) => { s['i' + i] = [...pol(32, 32, 9.5, a), 3]; });
  C.sindicancia = { titulo: 'Sindicância', latim: 'Oculus', s,
    links: ['c0-u0-u1-u2-c1', 'c0-w0-w1-w2-c1', 'i0-i1-i2-i3-i4-i0'],
    bound: [[1, 8], [63, 8], [63, 54], [40, 54], [40, 58], [1, 58]], bayer: { L: ['α', 8.5, -6.5], u1: ['β', 4, -4], c1: ['γ', -2, -6] } };
})();

// 7 · Condomínios — o Edifício (torre alta + torre baixa, uma janela acesa)
C.condominios = { titulo: 'Condomínios', latim: 'Domus', s: {
  t5: [11, 56, 1], t0: [11, 7, 2], t1: [33, 7, 2], t6: [33, 56, 3], t2: [33, 22, 3], t3: [52, 22, 2], t4: [52, 56, 2],
  g0: [3, 56, 3], g1: [61, 56, 3],
  w0: [17, 15, 3], w1: [27, 15, 3], w2: [17, 25, 3], w3: [27, 25, 3], w4: [17, 35, 3], w5: [27, 35, 3], w6: [17, 45, 3], w7: [27, 45, 3],
  v0: [42.5, 30, 3], v2: [42.5, 48, 3], L: [42.5, 39, 'L'] },
  links: ['t5-t0-t1-t2-t6', 't2-t3-t4', 'g0-t5-t6-t4-g1'],
  bound: [[1, 2], [40, 2], [40, 14], [63, 14], [63, 62], [1, 62]], bayer: { L: ['α', 6, -5], t5: ['β', 4, -6], t0: ['γ', 4, -4] } };

// 8 · Fireflies Academy — o Livro
C.academy = { titulo: 'Academy', latim: 'Liber', s: {
  L: [32, 7, 'L'], s0: [32, 19, 2], s1: [32, 56, 1],
  l0: [19, 13.5, 3], l1: [5, 16, 2], l2: [5, 49, 3], l3: [19, 47.5, 3],
  r0: [45, 13.5, 3], r1: [59, 16, 2], r2: [59, 49, 3], r3: [45, 47.5, 3],
  t0: [12, 27, 3], t1: [12, 35, 3], t2: [52, 27, 3] },
  links: ['s0-l0-l1-l2-l3-s1', 's0-r0-r1-r2-r3-s1', 's0-s1'],
  bound: [[1, 2], [63, 2], [63, 61], [1, 61]], bayer: { L: ['α', 6, -2], s1: ['β', 4, 2], r1: ['γ', -2, -6] } };

// ---------- render ----------
function render(key, { labels = true } = {}) {
  const d = C[key];
  const out = [];
  // limite (IAU-like): tracejado fino
  out.push(`<polygon points="${d.bound.map(p => p.join(',')).join(' ')}" fill="none" stroke="var(--ff-line, currentColor)" stroke-width=".5" stroke-dasharray="2 2" opacity=".55"/>`);
  // traços de constelação
  const segs = [];
  d.links.forEach(chain => { const n = chain.split('-'); for (let i = 0; i < n.length - 1; i++) segs.push([n[i], n[i + 1]]); });
  const trim = k => (d.s[k][2] === 'L' ? LIT_R + 2.2 : MAG[d.s[k][2]] + 2.2);
  segs.forEach(([a, b]) => {
    const [x1, y1] = d.s[a], [x2, y2] = d.s[b];
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const t1 = trim(a), t2 = trim(b);
    const sx = x1 + ux * t1, sy = y1 + uy * t1, ex = x2 - ux * t2, ey = y2 - uy * t2;
    const len = Math.hypot(ex - sx, ey - sy);
    if (len < 1) return;
    out.push(`<path d="M${f(sx)} ${f(sy)} ${f(ex + ux * .02)} ${f(ey + uy * .02)}" stroke-dasharray="0 ${gapFor(len, 3)}"/>`);
  });
  // estrelas (por magnitude) e lanterna
  for (const [k, [x, y, m]] of Object.entries(d.s)) {
    if (m === 'L') continue;
    out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${MAG[m]}" fill="currentColor" stroke="none"/>`);
  }
  const [lx, ly] = d.s.L;
  out.push(`<circle class="lit" cx="${f(lx)}" cy="${f(ly)}" r="${LIT_R}" style="fill:var(--ff-lit, currentColor);stroke:var(--ff-lit-edge, none)" stroke-width="1"/>`);
  if (labels && d.bayer) {
    for (const [k, [ch, dx, dy]] of Object.entries(d.bayer)) {
      const [x, y] = d.s[k];
      out.push(`<path d="${textPath(ch, 'IBMPlexSans-500-normal.ttf', 5.2, x + dx, y + dy).d}" fill="var(--ff-line, currentColor)" stroke="none"/>`);
    }
  }
  return out;
}
const svgOf = (k, opts) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">\n  <title>${C[k].titulo} · ${C[k].latim}</title>\n  ${render(k, opts).join('\n  ')}\n</svg>\n`;

function write() {
  fs.rmSync(path.join(OUT, 'svg'), { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, 'svg'), { recursive: true });
  for (const k of Object.keys(C)) {
    fs.writeFileSync(path.join(OUT, 'svg', `${k}.svg`), svgOf(k));
    fs.writeFileSync(path.join(OUT, 'svg', `${k}-sem-letras.svg`), svgOf(k, { labels: false }));
  }
}

function html() {
  const keys = Object.keys(C);
  const card = (k, theme) => `<figure class="${theme}"><div class="em">${svgOf(k).replace('width="64" height="64"', 'width="240" height="240"')}</div>
    <figcaption><b>${C[k].titulo}</b><i>${C[k].latim}</i><span>${String(keys.indexOf(k) + 1).padStart(2, '0')} / 08</span></figcaption></figure>`;
  const sizes = k => [128, 64, 48, 32].map(s => svgOf(k, { labels: s >= 128 }).replace('width="64" height="64"', `width="${s}" height="${s}"`)).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaceCSS()}
*{box-sizing:border-box;margin:0}
body{width:1500px;background:${COR.anil};color:${COR.cal};font-family:'IBM Plex Mono'}
.top{padding:56px 56px 24px;display:grid;grid-template-columns:1fr auto;align-items:end;border-bottom:1px solid rgba(237,238,234,.35)}
h1{font-family:'Cormorant Garamond';font-weight:700;font-size:64px;line-height:.9}
h1 em{font-weight:400;font-style:italic}
.top p{font-size:12px;letter-spacing:.08em;text-transform:uppercase;line-height:1.7;text-align:right;opacity:.85}
.grid{display:grid;grid-template-columns:repeat(4,1fr);padding:0 56px}
figure{padding:28px 20px 22px;border-right:1px solid rgba(110,137,180,.3);border-bottom:1px solid rgba(110,137,180,.3);display:flex;flex-direction:column;align-items:center;gap:14px}
.escuro{color:${COR.cal};--ff-lit:${COR.ambar};--ff-lit-edge:none;--ff-line:${COR.ceu}}
.claro{background:${COR.cal};color:${COR.anil};--ff-lit:${COR.ambar};--ff-lit-edge:${COR.anil};--ff-line:${COR.anil}}
figcaption{width:100%;display:grid;grid-template-columns:1fr auto;row-gap:2px;font-size:11px;letter-spacing:.06em}
figcaption b{font-family:'Cormorant Garamond';font-weight:700;font-size:26px;letter-spacing:0;grid-column:1}
figcaption i{font-family:'Cormorant Garamond';font-style:italic;font-size:18px;grid-column:1;opacity:.8}
figcaption span{grid-column:2;grid-row:1;align-self:end;opacity:.7}
.claro-band{background:${COR.cal};color:${COR.anil};padding:28px 56px 48px}
h2{font-family:'Cormorant Garamond';font-weight:700;font-size:30px;margin:0 0 4px}
.sub{font-size:11px;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:18px}
.claro-band .grid{padding:0}
.sizes{padding:28px 56px 56px}
.sizes .row{display:flex;align-items:center;gap:28px;padding:10px 0;border-bottom:1px dotted rgba(237,238,234,.3)}
.sizes .row b{width:150px;font-family:'Cormorant Garamond';font-size:20px}
.sizes .row{--ff-lit:${COR.ambar};--ff-lit-edge:none;--ff-line:${COR.ceu}}
</style></head><body>
<div class="top"><h1>Constelações<br><em>dos serviços</em></h1><p>Fireflies Consultoria · v2<br>8 emblemas · grid 64 · 3 magnitudes + lanterna<br>traço de constelação pontilhado · limite tracejado · letras de Bayer</p></div>
<div class="grid">${keys.map(k => card(k, 'escuro')).join('')}</div>
<div class="claro-band"><h2>Sobre Cal Virgem</h2><div class="sub">lanterna com contorno Anil · limite e letras em Anil</div><div class="grid">${keys.map(k => card(k, 'claro')).join('')}</div></div>
<div class="sizes"><h2>Escala</h2><div class="sub">128 com letras · 64 · 48 · 32 (abaixo de 48 px, usar o ícone de linha do serviço)</div>
${keys.map(k => `<div class="row"><b>${C[k].titulo}</b>${sizes(k)}</div>`).join('')}</div>
</body></html>`;
}

(async () => {
  write();
  await shot(html(), path.join(OUT, 'prancha.png'), 1500, { scale: 1.25 });
  console.log('constelações:', Object.keys(C).length);
})();
