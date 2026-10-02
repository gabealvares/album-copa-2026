// Fireflies v2 · camada 3 · ornamentos e grafismos de carta celeste
// Tudo em currentColor; linhas secundárias em var(--ff-line, currentColor); lanterna em var(--ff-lit).
// Textos convertidos em curvas (IBM Plex Mono / Sans) para o SVG não depender de fonte instalada.
const fs = require('fs');
const path = require('path');
const { ROOT, COR, f, gapFor, textPath, fontFaceCSS, shot } = require('./lib');

const OUT = path.join(ROOT, 'ornamentos');
const MONO = 'IBMPlexMono-500-normal.ttf', MONO4 = 'IBMPlexMono-400-normal.ttf';
const rad = a => (a * Math.PI) / 180;
const P = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
const LINE = 'var(--ff-line, currentColor)';
const litC = (x, y, r, sw = 1) => `<circle class="lit" cx="${f(x)}" cy="${f(y)}" r="${f(r)}" style="fill:var(--ff-lit, currentColor);stroke:var(--ff-lit-edge, none)" stroke-width="${sw}"/>`;
const star = (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="currentColor"/>`;
const txt = (s, x, y, size, opt = {}) => `<path d="${textPath(s, opt.font || MONO, size, x, y, opt).d}" fill="${opt.fill || 'currentColor'}" stroke="none"/>`;
const dotted = (d, len, sw = 1.6, gap = 4) => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="0 ${gapFor(len, gap)}"/>`;
const svg = (w, h, body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" fill="none">\n  <title>${title}</title>\n  ${body.join('\n  ')}\n</svg>\n`;

const O = {};

// 1 · Retícula de planisfério (projeção ortográfica, 15° em 15°) + eclíptica pontilhada
O['reticula-planisferio'] = () => {
  const c = 120, R = 100, b = [];
  b.push(`<circle cx="${c}" cy="${c}" r="${R}" stroke="currentColor" stroke-width="1.25"/>`);
  for (let lon = 15; lon < 90; lon += 15) {
    const rx = R * Math.sin(rad(lon));
    b.push(`<ellipse cx="${c}" cy="${c}" rx="${f(rx)}" ry="${R}" stroke="${LINE}" stroke-width=".6"/>`);
  }
  for (let lat = -75; lat <= 75; lat += 15) {
    const y = c + R * Math.sin(rad(lat)), hw = R * Math.cos(rad(lat));
    b.push(`<path d="M${f(c - hw)} ${f(y)}H${f(c + hw)}" stroke="${LINE}" stroke-width="${lat === 0 ? 1 : .6}"/>`);
  }
  b.push(`<path d="M${c} ${c - R}V${c + R}" stroke="${LINE}" stroke-width="1"/>`);
  // eclíptica: grande círculo inclinado 23,44° (visto de perfil)
  const e0 = P(c, c, R, 180 - 23.44), e1 = P(c, c, R, -23.44);
  b.push(dotted(`M${f(e0[0])} ${f(e0[1])} ${f(e1[0])} ${f(e1[1])}`, 2 * R, 1.6, 4.5));
  // graduação externa a cada 5°
  for (let a = 0; a < 360; a += 5) {
    const l = a % 30 === 0 ? 7 : 3.5, p0 = P(c, c, R + 3, a), p1 = P(c, c, R + 3 + l, a);
    b.push(`<path d="M${f(p0[0])} ${f(p0[1])} ${f(p1[0])} ${f(p1[1])}" stroke="currentColor" stroke-width="${a % 30 ? .6 : 1}"/>`);
  }
  b.push(star(c, c, 2.2));
  return svg(240, 240, b, 'Retícula de planisfério');
};

// 2 · Retícula plana (carta em projeção cilíndrica) com graus nas bordas
O['reticula-plana'] = () => {
  const w = 360, h = 220, x0 = 30, y0 = 14, gw = 320, gh = 180, step = 40, b = [];
  b.push(`<rect x="${x0}" y="${y0}" width="${gw}" height="${gh}" stroke="currentColor" stroke-width="1.25"/>`);
  for (let x = x0 + step; x < x0 + gw; x += step) b.push(`<path d="M${x} ${y0}V${y0 + gh}" stroke="${LINE}" stroke-width=".6"/>`);
  for (let y = y0 + step / 2 + 10; y < y0 + gh; y += step) b.push(`<path d="M${x0} ${y}H${x0 + gw}" stroke="${LINE}" stroke-width=".6"/>`);
  for (let x = x0; x <= x0 + gw; x += 8) b.push(`<path d="M${x} ${y0 + gh}v${(x - x0) % 40 ? 3 : 6}" stroke="currentColor" stroke-width=".7"/>`);
  for (let i = 0; i <= 8; i++) b.push(txt(`${i * 15}°`, x0 + i * step, y0 + gh + 17, 8.5, { anchor: 'middle', font: MONO4 }));
  [[-30, 34], [-15, 74], [0, 114], [15, 154], [30, 194]].forEach(([d, y]) => b.push(txt(`${d > 0 ? '+' : d < 0 ? '−' : ' '}${Math.abs(d)}°`, x0 - 5, y + 3, 8.5, { anchor: 'end', font: MONO4 })));
  return svg(w, h, b, 'Retícula plana graduada');
};

// 3 · Régua graduada (milímetro de cartógrafo)
O['regua-graduada'] = () => {
  const b = [], x0 = 10, len = 400;
  b.push(`<path d="M${x0} 30H${x0 + len}" stroke="currentColor" stroke-width="1"/>`);
  for (let i = 0; i <= 80; i++) {
    const x = x0 + i * 5, l = i % 10 === 0 ? 14 : i % 5 === 0 ? 9 : 5;
    b.push(`<path d="M${x} 30V${30 - l}" stroke="currentColor" stroke-width="${i % 10 ? .7 : 1.1}"/>`);
    if (i % 10 === 0) b.push(txt(String(i / 10), x, 46, 9, { anchor: 'middle' }));
  }
  return svg(420, 52, b, 'Régua graduada');
};

// 4 · Limbo de astrolábio (arco graduado de 120°)
O['limbo-astrolabio'] = () => {
  const c = [200, 230], R = 190, b = [];
  const a0 = -150, a1 = -30;
  const A = P(...c, R, a0), B = P(...c, R, a1);
  b.push(`<path d="M${f(A[0])} ${f(A[1])}A${R} ${R} 0 0 1 ${f(B[0])} ${f(B[1])}" stroke="currentColor" stroke-width="1.1"/>`);
  const A2 = P(...c, R - 22, a0), B2 = P(...c, R - 22, a1);
  b.push(`<path d="M${f(A2[0])} ${f(A2[1])}A${R - 22} ${R - 22} 0 0 1 ${f(B2[0])} ${f(B2[1])}" stroke="${LINE}" stroke-width=".6"/>`);
  for (let a = a0; a <= a1 + .01; a += 2) {
    const k = Math.round(a - a0), l = k % 10 === 0 ? 12 : k % 5 === 0 ? 8 : 4.5;
    const p0 = P(...c, R, a), p1 = P(...c, R - l, a);
    b.push(`<path d="M${f(p0[0])} ${f(p0[1])} ${f(p1[0])} ${f(p1[1])}" stroke="currentColor" stroke-width="${k % 10 ? .7 : 1.1}"/>`);
    if (k % 20 === 0) {
      const t = P(...c, R + 10, a);
      const lab = textPath(`${k}`, MONO, 9, 0, 0, { anchor: 'middle' });
      b.push(`<path d="${lab.d}" transform="translate(${f(t[0])} ${f(t[1])}) rotate(${f(a + 90)}) translate(0 3)" fill="currentColor"/>`);
    }
  }
  const s = P(...c, R - 34, -90);
  b.push(litC(s[0], s[1], 5, 1.2));
  return svg(400, 120, b, 'Limbo de astrolábio');
};

// 5 · Rosa de pontos: 16 rumos de igual comprimento (nada de estrela de 4 pontas);
//     cardeais pesam pela magnitude dos pontos, não pelo tamanho do raio.
O['rosa-de-pontos'] = () => {
  const c = 120, b = [];
  b.push(`<circle cx="${c}" cy="${c}" r="92" stroke="${LINE}" stroke-width=".6"/>`);
  for (let a = 0; a < 360; a += 5) {
    const l = a % 45 === 0 ? 6 : 3, p0 = P(c, c, 92, a - 90), p1 = P(c, c, 92 + l, a - 90);
    b.push(`<path d="M${f(p0[0])} ${f(p0[1])} ${f(p1[0])} ${f(p1[1])}" stroke="currentColor" stroke-width="${a % 45 ? .6 : 1}"/>`);
  }
  for (let i = 0; i < 16; i++) {
    const a = -90 + i * 22.5, card = i % 4 === 0, inter = i % 2 === 0;
    for (let k = 0; k < 7; k++) {
      const r = 22 + k * 10, [x, y] = P(c, c, r, a);
      const base = card ? 2.2 : inter ? 1.5 : 1;
      b.push(star(x, y, Math.max(.75, base - k * (card ? .12 : .08))));
    }
  }
  b.push(`<circle cx="${c}" cy="${c}" r="14" stroke="${LINE}" stroke-width=".6"/>`);
  b.push(litC(c, c, 6, 1.25));
  [['N', -90], ['L', 0], ['S', 90], ['O', 180]].forEach(([s, a]) => {
    const [x, y] = P(c, c, 110, a);
    b.push(txt(s, x, y + 4, 11, { anchor: 'middle', font: 'IBMPlexSans-500-normal.ttf' }));
  });
  return svg(240, 240, b, 'Rosa de pontos');
};

// 6 · Selo graduado (moldura de auditoria / carta celeste), centro livre para o símbolo
function seloBody(withText) {
  const c = 120, b = [];
  b.push(`<circle cx="${c}" cy="${c}" r="112" stroke="currentColor" stroke-width="1.4"/>`);
  b.push(`<circle cx="${c}" cy="${c}" r="104" stroke="currentColor" stroke-width=".6"/>`);
  for (let a = 0; a < 360; a += 2.5) {
    const k = Math.round(a / 2.5), l = k % 12 === 0 ? 8 : k % 4 === 0 ? 5.5 : 3;
    const p0 = P(c, c, 104, a - 90), p1 = P(c, c, 104 - l, a - 90);
    b.push(`<path d="M${f(p0[0])} ${f(p0[1])} ${f(p1[0])} ${f(p1[1])}" stroke="currentColor" stroke-width="${k % 12 ? .6 : 1}"/>`);
  }
  b.push(`<circle cx="${c}" cy="${c}" r="${withText ? 66 : 84}" stroke="${LINE}" stroke-width=".6"/>`);
  if (withText) {
    // texto no anel (glifo a glifo), lido no sentido horário a partir do topo-esquerda
    const str = 'FIREFLIES CONSULTORIA · LUZ MEDIDA · SÃO PAULO · ';
    const R = 80, size = 10.5;
    const per = 360 / str.length;
    let ang = -90 - 10 * per; // 'FIREFLIES CONSULTORIA' centrado no topo
    [...str].forEach(ch => {
      const g = textPath(ch, MONO, size, 0, 0, { anchor: 'middle' });
      const [x, y] = P(c, c, R, ang);
      if (ch.trim()) b.push(`<path d="${g.d}" transform="translate(${f(x)} ${f(y)}) rotate(${f(ang + 90)}) translate(0 ${size * .36})" fill="currentColor"/>`);
      ang += per;
    });
  }
  // retícula de registro no centro (some quando o símbolo entra)
  b.push(`<path d="M${c - 8} ${c}h5M${c + 3} ${c}h5M${c} ${c - 8}v5M${c} ${c + 3}v5" stroke="${LINE}" stroke-width=".7"/>`);
  return b;
}
O['selo-graduado'] = () => svg(240, 240, seloBody(false), 'Selo graduado');
O['selo-graduado-texto'] = () => svg(240, 240, seloBody(true), 'Selo graduado com legenda');

// 7 · Trilha do Photinus: o macho voa em J e acende na subida
O['trilha-photinus'] = () => {
  const b = [];
  // curva J: desce do alto à esquerda, faz a volta e sobe à direita
  const pts = [];
  const bez = (t, p0, p1, p2, p3) => [0, 1].map(i => (1 - t) ** 3 * p0[i] + 3 * (1 - t) ** 2 * t * p1[i] + 3 * (1 - t) * t ** 2 * p2[i] + t ** 3 * p3[i]);
  const seg1 = [[24, 10], [24, 92], [56, 128], [104, 128]], seg2 = [[104, 128], [150, 128], [180, 104], [192, 54]];
  const sample = (seg, n) => Array.from({ length: n }, (_, i) => bez(i / n, ...seg));
  const all = [...sample(seg1, 400), ...sample(seg2, 400), seg2[3]];
  // distribui pontos por comprimento de arco
  const cum = [0];
  for (let i = 1; i < all.length; i++) cum.push(cum[i - 1] + Math.hypot(all[i][0] - all[i - 1][0], all[i][1] - all[i - 1][1]));
  const L = cum[cum.length - 1], step = 7.2, n = Math.floor(L / step);
  const turn = cum[400]; // ponto mais baixo: a partir daqui ele acende
  for (let k = 0; k <= n - 2; k++) {
    const s = k * step;
    let i = cum.findIndex(v => v >= s); if (i < 0) i = all.length - 1;
    const [x, y] = all[i];
    const rise = Math.max(0, (s - turn) / (L - turn));
    const r = s < turn ? 1.05 : 1.05 + rise * 1.9;
    b.push(star(x, y, r));
  }
  b.push(litC(192, 46, 7, 1.4));
  return svg(220, 140, b, 'Trilha do Photinus');
};

// 8 · Numerais de magnitude (legenda de carta)
O['numerais-magnitude'] = () => {
  const b = [], rs = [7, 5.4, 4, 2.9, 2, 1.3];
  b.push(txt('MAGNITUDE', 8, 13, 9, { tracking: .18 }));
  b.push(`<path d="M8 22H${8 + 6 * 46 + 26}" stroke="${LINE}" stroke-width=".6"/>`);
  b.push(litC(26, 48, 9, 1.4));
  b.push(txt('α', 26, 80, 11, { anchor: 'middle', font: 'IBMPlexSans-500-normal.ttf' }));
  rs.forEach((r, i) => {
    const x = 26 + (i + 1) * 46;
    b.push(star(x, 48, r));
    b.push(txt(String(i), x, 80, 11, { anchor: 'middle' }));
  });
  return svg(8 + 7 * 46 + 18, 90, b, 'Numerais de magnitude');
};

// 9–11 · Marcadores de lista
O['marcador-estrela'] = () => svg(16, 16, [star(8, 8, 3.6)], 'Marcador estrela');
O['marcador-estrela-acesa'] = () => svg(16, 16, [litC(8, 8, 4.6, 1.2)], 'Marcador estrela acesa');
O['marcador-ponto'] = () => svg(16, 16, [star(8, 8, 1.8)], 'Marcador ponto');

// 12 · Divisor de seção pontilhado (estrela central)
O['divisor-pontilhado'] = () => {
  const b = [];
  b.push(dotted('M8 12H222', 214, 1.6, 6));
  b.push(dotted('M258 12H472', 214, 1.6, 6));
  b.push(star(240, 12, 4.2));
  b.push(star(229, 12, 1.4)); b.push(star(251, 12, 1.4));
  return svg(480, 24, b, 'Divisor pontilhado');
};

// 13 · Divisor-constelação (três magnitudes e uma luz, assimétrico)
O['divisor-constelacao'] = () => {
  const b = [], S = [[10, 14, 1.6], [120, 9, 2.6], [228, 16, 1.6], [330, 11, 3.2], [470, 13, 1.6]];
  for (let i = 0; i < S.length - 1; i++) {
    const [x1, y1, r1] = S[i], [x2, y2, r2] = S[i + 1];
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const sx = x1 + ux * (r1 + 5), sy = y1 + uy * (r1 + 5), ex = x2 - ux * (r2 + 5), ey = y2 - uy * (r2 + 5);
    b.push(dotted(`M${f(sx)} ${f(sy)} ${f(ex)} ${f(ey)}`, Math.hypot(ex - sx, ey - sy), 1.4, 5));
  }
  S.forEach(([x, y, r], i) => b.push(i === 3 ? litC(x, y, 5, 1.2) : star(x, y, r)));
  return svg(480, 26, b, 'Divisor constelação');
};

// 14 · Etiqueta de coordenada
O['etiqueta-coordenada'] = () => {
  const b = [];
  b.push(`<circle cx="14" cy="14" r="6.5" stroke="currentColor" stroke-width="1.1"/>`);
  b.push(`<path d="M14 2.5v5M14 20.5v5M2.5 14h5M20.5 14h5" stroke="currentColor" stroke-width="1.1"/>`);
  b.push(star(14, 14, 1.6));
  const t = textPath('23°33′S  46°38′O', MONO, 12, 36, 18.3, { tracking: .06 });
  b.push(`<path d="${t.d}" fill="currentColor"/>`);
  const w = Math.ceil(36 + t.width + 8);
  b.push(`<path d="M36 25.5H${w - 8}" stroke="${LINE}" stroke-width=".6"/>`);
  return svg(w, 30, b, 'Etiqueta de coordenada');
};

// 15 · Marca de posição (retícula de mira, para fixar pontos em mapas e fotos)
O['marca-posicao'] = () => svg(40, 40, [
  `<circle cx="20" cy="20" r="11" stroke="currentColor" stroke-width="1.2"/>`,
  `<path d="M20 2v8M20 30v8M2 20h8M30 20h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>`,
  star(20, 20, 2.2)], 'Marca de posição');

// 16 · Cantoneira graduada (canto de carta)
O['cantoneira-graduada'] = () => {
  const b = [`<path d="M6 94V6H94" stroke="currentColor" stroke-width="1.25"/>`, `<path d="M12 94V12H94" stroke="${LINE}" stroke-width=".6"/>`];
  for (let i = 16; i <= 92; i += 6) {
    const l = (i - 16) % 24 === 0 ? 6 : 3;
    b.push(`<path d="M${i} 6v${l}M6 ${i}h${l}" stroke="currentColor" stroke-width=".7"/>`);
  }
  b.push(star(6, 6, 2.6));
  return svg(100, 100, b, 'Cantoneira graduada');
};

// 17 · Moldura de carta (neatline com barra alternada, como nas cartas topográficas)
O['moldura-carta'] = () => {
  const W = 480, H = 300, m = 10, t = 6, seg = 20, b = [];
  b.push(`<rect x="${m}" y="${m}" width="${W - 2 * m}" height="${H - 2 * m}" stroke="currentColor" stroke-width="1.1"/>`);
  b.push(`<rect x="${m + t}" y="${m + t}" width="${W - 2 * m - 2 * t}" height="${H - 2 * m - 2 * t}" stroke="currentColor" stroke-width=".7"/>`);
  for (let x = m + t, i = 0; x < W - m - t; x += seg, i++) if (i % 2 === 0) {
    const w = Math.min(seg, W - m - t - x);
    b.push(`<rect x="${x}" y="${m}" width="${w}" height="${t}" fill="currentColor"/><rect x="${x}" y="${H - m - t}" width="${w}" height="${t}" fill="currentColor"/>`);
  }
  for (let y = m + t, i = 0; y < H - m - t; y += seg, i++) if (i % 2 === 0) {
    const h = Math.min(seg, H - m - t - y);
    b.push(`<rect x="${m}" y="${y}" width="${t}" height="${h}" fill="currentColor"/><rect x="${W - m - t}" y="${y}" width="${t}" height="${h}" fill="currentColor"/>`);
  }
  return svg(W, H, b, 'Moldura de carta');
};

// 18 · Escala gráfica: "30 dias até a primeira luz"
O['escala-grafica'] = () => {
  const b = [], x0 = 10, s = 36;
  b.push(`<rect x="${x0}" y="16" width="${s * 5}" height="6" stroke="currentColor" stroke-width="1"/>`);
  for (let i = 0; i < 5; i += 2) b.push(`<rect x="${x0 + i * s}" y="16" width="${s}" height="6" fill="currentColor"/>`);
  for (let i = 0; i <= 5; i++) b.push(txt(String(i * 6), x0 + i * s, 36, 9, { anchor: 'middle' }));
  b.push(litC(x0 + 5 * s + 16, 19, 5, 1.2));
  b.push(txt('DIAS ATÉ A PRIMEIRA LUZ', x0, 9, 7.5, { tracking: .12, fill: LINE }));
  return svg(230, 42, b, 'Escala gráfica · 30 dias');
};

// 20 · Linha de chamada (anotação de carta: estrela, guia pontilhada, rótulo)
O['linha-de-chamada'] = () => {
  const b = [];
  b.push(star(8, 40, 3));
  b.push(dotted('M14 34.5 44 12', 37.2, 1.4, 4));
  b.push(`<path d="M48 10H150" stroke="currentColor" stroke-width=".8"/>`);
  b.push(txt('α', 50, 6.5, 9, { font: 'IBMPlexSans-500-normal.ttf' }));
  b.push(txt('LANTERNA · MAG 0', 60, 6.5, 7.5, { tracking: .1 }));
  b.push(txt('ponto de decisão', 50, 24, 9, { font: 'IBMPlexSans-400-normal.ttf', fill: LINE }));
  return svg(160, 46, b, 'Linha de chamada');
};

// 21 · Cartela (cartucho de título, como o das cartas antigas, sem volutas)
O['cartela'] = () => {
  const W = 260, H = 96, b = [];
  b.push(`<rect x="8" y="8" width="${W - 16}" height="${H - 16}" stroke="currentColor" stroke-width="1.1"/>`);
  b.push(`<rect x="13" y="13" width="${W - 26}" height="${H - 26}" stroke="${LINE}" stroke-width=".6"/>`);
  [[8, 8], [W - 8, 8], [8, H - 8], [W - 8, H - 8]].forEach(([x, y]) => b.push(star(x, y, 3)));
  b.push(dotted(`M40 ${H / 2}H${W - 40}`, W - 80, 1.2, 4));
  b.push(star(W / 2, H / 2, 2.4));
  return svg(W, H, b, 'Cartela de título');
};

// ---------- saída ----------
function write() {
  fs.rmSync(path.join(OUT, 'svg'), { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, 'svg'), { recursive: true });
  const out = {};
  for (const [k, fn] of Object.entries(O)) { out[k] = fn(); fs.writeFileSync(path.join(OUT, 'svg', `${k}.svg`), out[k]); }
  return out;
}

function html(S) {
  const order = ['reticula-planisferio', 'reticula-plana', 'rosa-de-pontos', 'regua-graduada', 'limbo-astrolabio',
    'selo-graduado', 'selo-graduado-texto', 'trilha-photinus', 'marca-posicao', 'numerais-magnitude', 'divisor-pontilhado',
    'divisor-constelacao', 'etiqueta-coordenada', 'escala-grafica', 'marcador-estrela', 'marcador-estrela-acesa', 'marcador-ponto',
    'cantoneira-graduada', 'moldura-carta', 'linha-de-chamada', 'cartela'];
  const span = { 'reticula-plana': 2, 'regua-graduada': 2, 'limbo-astrolabio': 2, 'numerais-magnitude': 2, 'divisor-pontilhado': 2,
    'divisor-constelacao': 2, 'moldura-carta': 2 };
  const tile = (k, i, theme) => `<figure class="${theme}${k.startsWith('marcador') ? ' mk' : ''}" style="--w:${({ 'etiqueta-coordenada': 260, 'linha-de-chamada': 260, 'escala-grafica': 290, 'marca-posicao': 72, 'cantoneira-graduada': 150 })[k] || 0}px;grid-column:span ${span[k] || 1}"><div class="art">${S[k]}</div><figcaption><span>${String(i + 1).padStart(2, '0')}</span>${k}</figcaption></figure>`;
  const keys = order.filter(k => S[k]);
  if (keys.length !== Object.keys(S).length) throw new Error('ordem incompleta');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaceCSS()}
*{box-sizing:border-box;margin:0}
body{width:1500px;background:${COR.cal};color:${COR.anil};font-family:'IBM Plex Mono'}
.top{padding:56px 56px 24px;display:grid;grid-template-columns:1fr auto;align-items:end;border-bottom:1px solid ${COR.anil}}
h1{font-family:'Cormorant Garamond';font-weight:700;font-size:64px;line-height:.9}
h1 em{font-weight:400;font-style:italic}
.top p{font-size:12px;letter-spacing:.08em;text-transform:uppercase;line-height:1.7;text-align:right}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:0 56px 0}
figure{min-height:250px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid rgba(110,137,180,.3);border-bottom:1px solid rgba(110,137,180,.3)}
.art{flex:1;display:flex;align-items:center;justify-content:center;padding:10px 0}
.art svg{max-width:100%;height:auto}
.mk .art svg{width:64px;height:64px}
figure[style*='--w:'] .art svg{width:var(--w)}
figure[style*='--w:0px'] .art svg{width:auto}

figcaption{font-size:11px;letter-spacing:.06em;display:flex;gap:12px}
figcaption span{opacity:.6}
.claro{color:${COR.anil};--ff-lit:${COR.ambar};--ff-lit-edge:${COR.anil};--ff-line:${COR.pedra}}
.escuro{background:${COR.anil};color:${COR.cal};--ff-lit:${COR.ambar};--ff-lit-edge:none;--ff-line:${COR.ceu}}
.band{background:${COR.anil};padding:40px 0 56px}
.band h2{font-family:'Cormorant Garamond';font-weight:700;font-size:30px;color:${COR.cal};padding:0 56px 14px}
</style></head><body>
<div class="top"><h1>Ornamentos<br><em>de carta celeste</em></h1><p>Fireflies Consultoria · v2<br>${keys.length} peças em SVG · texto em curvas<br>currentColor · --ff-line · --ff-lit</p></div>
<div class="grid">${keys.map((k, i) => tile(k, i, 'claro')).join('')}</div>
<div class="band"><h2>Sobre Anil de Junho</h2><div class="grid">${keys.map((k, i) => tile(k, i, 'escuro')).join('')}</div></div>
</body></html>`;
}

(async () => {
  const S = write();
  await shot(html(S), path.join(OUT, 'prancha.png'), 1500, { scale: 1.25 });
  console.log('ornamentos:', Object.keys(S).length);
})();
