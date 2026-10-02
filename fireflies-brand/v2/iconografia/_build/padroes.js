// Fireflies v2 · camada 4 · padrões repetíveis (SVG <pattern>, sem emenda)
// Determinísticos: semente 1603 (ano da Uranometria de Bayer). Mesma semente = mesmo céu, sempre.
// Cada padrão sai em duas versões: -claro (Anil sobre Cal Virgem) e -escuro (Cal sobre Anil).
const fs = require('fs');
const path = require('path');
const { ROOT, COR, f, gapFor, rng, fontFaceCSS, shot } = require('./lib');

const OUT = path.join(ROOT, 'padroes');
const T = {
  claro: { bg: COR.cal, ink: COR.anil, dim: COR.anil, dimOp: .45, line: COR.anil, lineOp: .22, lit: COR.ambar, edge: COR.anil },
  escuro: { bg: COR.anil, ink: COR.cal, dim: COR.ceu, dimOp: 1, line: COR.ceu, lineOp: .45, lit: COR.ambar, edge: 'none' },
};
const lantern = (x, y, r, t) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${t.lit}"${t.edge !== 'none' ? ` stroke="${t.edge}" stroke-width="1.2"` : ''}/>`;
// repete um desenho nas 9 posições vizinhas: o <pattern> recorta no tile, e o que sai de um lado entra do outro
const wrap9 = (W, H, inner) => [-1, 0, 1].flatMap(i => [-1, 0, 1].map(j => (i || j) ? `<g transform="translate(${i * W} ${j * H})">${inner}</g>` : inner)).join('');

const P = {};

// 1 · Campo de estrelas (grade com jitter = distribuição uniforme sem aglomerados; magnitudes em lei de potência)
P['campo-estrelas'] = t => {
  const W = 720, H = 720, R = rng(1603), cells = 18, cs = W / cells, out = [];
  for (let i = 0; i < cells; i++) for (let j = 0; j < cells; j++) {
    if (R() < .42) continue; // céu com vazios
    const x = (i + R()) * cs, y = (j + R()) * cs, m = R();
    const r = m < .62 ? .7 : m < .88 ? 1.1 : m < .975 ? 1.7 : 2.5;
    const dim = r < 1;
    out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${dim ? t.dim : t.ink}"${dim && t.dimOp < 1 ? ` opacity="${t.dimOp}"` : ''}/>`);
  }
  out.push(lantern(478, 226, 3.4, t)); // uma luz por 720 × 720
  return { W, H, body: wrap9(W, H, out.join('')) };
};

// 2 · Retícula celeste: meridianos e paralelos a cada 15° (60 px), graduação de 3° (12 px), cruz de registro nos nós
P['reticula-celeste'] = t => {
  const W = 480, H = 480, out = [];
  const L = `stroke="${t.line}" stroke-opacity="${t.lineOp}"`;
  let lines = '', ticks = '';
  for (let k = 0; k < 480; k += 60) lines += `M0 ${k}H480M${k} 0V480`;
  for (let k = 0; k < 480; k += 12) if (k % 60) for (let g = 0; g < 480; g += 60) ticks += `M${k} ${g - 2.5}v5M${g - 2.5} ${k}h5`;
  out.push(`<path d="${lines}" ${L} stroke-width=".7"/>`);
  out.push(`<path d="${ticks}" ${L} stroke-width=".6"/>`);
  for (let x = 0; x < 480; x += 60) for (let y = 0; y < 480; y += 60) {
    if (x === 300 && y === 120) continue;
    if ((x + y) % 120 === 0) out.push(`<circle cx="${x}" cy="${y}" r="1.4" fill="${t.ink}"/>`);
    else out.push(`<circle cx="${x}" cy="${y}" r="3.5" fill="none" stroke="${t.line}" stroke-opacity="${Math.min(1, t.lineOp * 2)}" stroke-width=".6"/>`);
  }
  out.push(lantern(300, 120, 3.2, t));
  return { W, H, body: wrap9(W, H, out.join('')) };
};

// 3 · Constelação contínua: árvore geradora mínima em métrica periódica (sem ciclos = figura de constelação,
//     não "rede neural"); arestas longas cortadas para formar asterismos separados
P['constelacao-continua'] = t => {
  const W = 720, H = 720, R = rng(1603 * 7), out = [], grid = 6, cs = W / grid;
  const pts = [];
  for (let i = 0; i < grid; i++) for (let j = 0; j < grid; j++) {
    const x = (i + .2 + R() * .6) * cs, y = (j + .2 + R() * .6) * cs, m = R();
    pts.push({ x, y, r: m < .45 ? 1.3 : m < .85 ? 2 : 2.9 });
  }
  const LI = pts.reduce((b, p, i) => (Math.hypot(p.x - 300, p.y - 170) < Math.hypot(pts[b].x - 300, pts[b].y - 170) ? i : b), 0);
  // distância periódica (toro)
  const pd = (a, b) => { let dx = b.x - a.x, dy = b.y - a.y; dx -= W * Math.round(dx / W); dy -= H * Math.round(dy / H); return [Math.hypot(dx, dy), dx, dy]; };
  // Prim
  const inT = new Set([0]), edges = [];
  while (inT.size < pts.length) {
    let best = null;
    for (const i of inT) for (let j = 0; j < pts.length; j++) if (!inT.has(j)) {
      const [d] = pd(pts[i], pts[j]); if (!best || d < best[0]) best = [d, i, j];
    }
    inT.add(best[2]); edges.push(best);
  }
  const lineCol = t.ink;
  edges.filter(e => e[0] < 112).forEach(([, i, j]) => {
    const a = pts[i], b = pts[j], [d, dx, dy] = pd(a, b);
    const ux = dx / d, uy = dy / d, s = (i === LI ? 6.5 : a.r) + 5, e = (j === LI ? 6.5 : b.r) + 5;
    const x1 = a.x + ux * s, y1 = a.y + uy * s, x2 = a.x + dx - ux * e, y2 = a.y + dy - uy * e;
    const len = Math.hypot(x2 - x1, y2 - y1);
    out.push(`<path d="M${f(x1)} ${f(y1)} ${f(x2)} ${f(y2)}" stroke="${lineCol}" stroke-opacity="${t === T.claro ? .7 : .8}" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="0 ${gapFor(len, 4.2)}"/>`);
  });
  pts.forEach((p, i) => out.push(i === LI ? lantern(p.x, p.y, 4.4, t) : `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${p.r}" fill="${t.ink}"/>`));
  // poeira de fundo
  for (let k = 0; k < 140; k++) out.push(`<circle cx="${f(R() * W)}" cy="${f(R() * H)}" r=".6" fill="${t.dim}" opacity="${t === T.claro ? .35 : .8}"/>`);
  return { W, H, body: wrap9(W, H, out.join('')) };
};

// 4 · Matriz de pontos para dados: passo 12, a cada 5 um ponto-guia maior (como papel de engenharia); luz 1 a cada 300 × 300
P['matriz-pontos'] = t => {
  const W = 600, H = 600, out = [];
  for (let x = 0; x < W; x += 12) for (let y = 0; y < H; y += 12) {
    if (x === 420 && y === 168) continue;
    const major = x % 60 === 0 && y % 60 === 0;
    out.push(`<circle cx="${x}" cy="${y}" r="${major ? 1.5 : .8}" fill="${major ? t.ink : t.dim}"${!major ? ` opacity="${t === T.claro ? .4 : .75}"` : ''}/>`);
  }
  out.push(lantern(420, 168, 3, t));
  return { W, H, body: wrap9(W, H, out.join('')) };
};

function svgFor(key, theme, w = 1440, h = 900) {
  const t = T[theme], { W, H, body } = P[key](t);
  const id = `ff-${key}-${theme}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <title>Fireflies · padrão ${key} (${theme}) · tile ${W}×${H}</title>
  <defs>
    <pattern id="${id}" width="${W}" height="${H}" patternUnits="userSpaceOnUse">
      <rect width="${W}" height="${H}" fill="${t.bg}"/>
      ${body}
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${id})"/>
</svg>
`;
}

function write() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) if (f.endsWith('.svg')) fs.unlinkSync(path.join(OUT, f));
  const res = {};
  for (const k of Object.keys(P)) for (const th of ['claro', 'escuro']) {
    res[`${k}-${th}`] = svgFor(k, th);
    fs.writeFileSync(path.join(OUT, `${k}-${th}.svg`), res[`${k}-${th}`]);
  }
  return res;
}

const INFO = {
  'campo-estrelas': ['Campo de estrelas', 'tile 720 · 4 magnitudes · 1 lanterna por tile · semente 1603', 'capas, fundos de slide, verso de cartão'],
  'reticula-celeste': ['Retícula celeste', 'tile 480 · meridianos e paralelos a 15° (60 px) · graduação a 3° · 1 luz por tile', 'fundos de página, mapas, área de gráficos'],
  'constelacao-continua': ['Constelação contínua', 'tile 720 · árvore geradora mínima periódica · asterismos separados', 'redes, divisórias de seção, envelopes'],
  'matriz-pontos': ['Matriz de pontos', 'tile 600 · passo 12 · guia a cada 60 · 1 luz por tile', 'painel mensal, tabelas, fundo de dados'],
};

function html(S) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaceCSS()}
*{box-sizing:border-box;margin:0}
body{width:1500px;background:${COR.cal};color:${COR.anil};font-family:'IBM Plex Mono'}
.top{padding:56px 56px 24px;display:grid;grid-template-columns:1fr auto;align-items:end;border-bottom:1px solid ${COR.anil}}
h1{font-family:'Cormorant Garamond';font-weight:700;font-size:64px;line-height:.9}
h1 em{font-weight:400;font-style:italic}
.top p{font-size:12px;letter-spacing:.08em;text-transform:uppercase;line-height:1.7;text-align:right}
section{padding:30px 56px 10px}
.hd{display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:baseline;margin-bottom:12px}
.hd b{font-family:'Cormorant Garamond';font-weight:700;font-size:30px}
.hd span{font-size:11px;letter-spacing:.06em;opacity:.75}
.hd i{font-style:normal;font-size:11px;letter-spacing:.06em;text-align:right}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.pair div{position:relative;height:330px;overflow:hidden;outline:1px solid rgba(23,24,58,.15)}
.pair svg{position:absolute;inset:0;width:1440px;height:900px}
.pair em{position:absolute;left:12px;bottom:10px;font-style:normal;font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:3px 6px;background:${COR.cal};color:${COR.anil}}
</style></head><body>
<div class="top"><h1>Padrões<br><em>repetíveis</em></h1><p>Fireflies Consultoria · v2<br>4 padrões × claro / escuro · SVG pattern sem emenda<br>semente 1603 · lanterna rara</p></div>
${Object.keys(P).map(k => `<section><div class="hd"><b>${INFO[k][0]}</b><span>${INFO[k][1]}</span><i>${INFO[k][2]}</i></div>
<div class="pair"><div>${S[k + '-claro']}<em>claro · ${k}-claro.svg</em></div><div>${S[k + '-escuro']}<em>escuro · ${k}-escuro.svg</em></div></div></section>`).join('')}
<div style="height:46px"></div>
</body></html>`;
}

(async () => {
  const S = write();
  await shot(html(S), path.join(OUT, 'prancha.png'), 1500, { scale: 1.25 });
  console.log('padrões:', Object.keys(S).length);
})();
