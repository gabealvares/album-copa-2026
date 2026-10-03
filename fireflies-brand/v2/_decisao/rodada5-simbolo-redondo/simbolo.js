// Fireflies v2 · gerador paramétrico do símbolo "F de luz em órbita"
// Uma função pura: simbolo(opcao, cor, {pequeno}) -> string SVG (viewBox 0 0 120 120)
const deg = Math.PI / 180;
const r2 = v => Math.round(v * 100) / 100;

const C = {
  anil: '#17183A', cal: '#EDEEEA', ambar: '#F2B544', verm: '#E65A3E', rub: '#A9301F', ceu: '#6E89B4',
  laranja1: '#EB7A3F', laranja2: '#EE8A3C', preto: '#000000', branco: '#FFFFFF',
};
const F_HASTE = 'M0,2.87671v100h20.13699V19.72603h38.76712V2.87671z';
const F_INTEIRO = 'M0,2.87671v100h20.13699V61.5479h36.99301V44.5616H20.13699V19.72603h38.76712V2.87671z';
const ASA = 'M-1,0C-5,5.5 -14,8 -16,4.5C-17,1.5 -9,-0.5 -1,0';
const ASA2 = 'M-1,0C-5,-5.5 -14,-8 -16,-4.5C-17,-1.5 -9,0.5 -1,0';

// paletas: fio(t) em paradas [t, cor, opacidade]
const PAL = {
  digital: { fio: [[0, C.anil, .75], [.3, C.rub, .78], [.5, C.verm, .95], [.82, C.laranja1, 1], [1, C.laranja2, 1]],
    estrela: C.anil, estrelaOp: true, f: C.anil, braco: C.verm, asa: C.anil, asaOp: .85,
    halo: [C.ambar, .5, .15], nucleo: ['#FBD58A', C.ambar, '#EFA23F'] },
  'digital-negativo': { fio: [[0, C.cal, .75], [.25, C.ceu, .78], [.5, C.verm, .9], [.8, C.verm, .97], [1, C.ambar, 1]],
    estrela: C.cal, estrelaOp: true, f: C.cal, braco: C.ambar, asa: C.cal, asaOp: .85,
    halo: [C.ambar, .55, .16], nucleo: ['#FFF6DF', C.ambar, C.ambar] },
  chapado: { fio: [[0, C.verm, 1], [1, C.verm, 1]], estrela: C.anil, f: C.anil, braco: C.verm, asa: C.anil, nucleoChapado: C.verm },
  'chapado-negativo': { fio: [[0, C.ambar, 1], [1, C.ambar, 1]], estrela: C.cal, f: C.cal, braco: C.ambar, asa: C.cal, nucleoChapado: C.ambar },
  'mono-anil': { mono: C.anil }, 'mono-branco': { mono: C.branco }, 'mono-preto': { mono: C.preto },
};
for (const k of ['mono-anil', 'mono-branco', 'mono-preto']) {
  const m = PAL[k].mono;
  Object.assign(PAL[k], { fio: [[0, m, 1], [1, m, 1]], estrela: m, f: m, braco: m, asa: m, nucleoChapado: m });
}

function hex(h) { return [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); }
function mix(a, b, k) {
  const A = hex(a), B = hex(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join('').toUpperCase();
}
function corEm(stops, t) {
  for (let i = 1; i < stops.length; i++) if (t <= stops[i][0]) {
    const [t0, c0, o0] = stops[i - 1], [t1, c1, o1] = stops[i];
    const k = (t - t0) / (t1 - t0 || 1);
    return [mix(c0, c1, k), o0 + (o1 - o0) * k];
  }
  const l = stops[stops.length - 1]; return [l[1], l[2]];
}

// opção = geometria
// a, b: semi-eixos; inc: inclinação (graus); fim: ângulo paramétrico do vagalume; voo: varredura (graus, horário)
// fH: altura do F; fDx/fDy: deslocamento óptico do F; w0/w1: espessura do fio (constelação / ponta de luz)
// corte: fração do voo que é constelação; cx, cy: centro
function geometria(o, pequeno) {
  const N = 1400;
  const ini = o.fim - o.voo;
  const cos = Math.cos(o.inc * deg), sin = Math.sin(o.inc * deg);
  const P = th => { const x = o.a * Math.cos(th), y = o.b * Math.sin(th); return [o.cx + x * cos - y * sin, o.cy + x * sin + y * cos]; };
  const pts = [], len = [0];
  for (let i = 0; i <= N; i++) pts.push(P((ini + o.voo * i / N) * deg));
  for (let i = 1; i <= N; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const L = len[N];
  const at = t => { // ponto e tangente por comprimento de arco
    const s = t * L; let i = 1; while (i < N && len[i] < s) i++;
    const k = (s - len[i - 1]) / (len[i] - len[i - 1] || 1);
    const p = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k];
    const d = [pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]], m = Math.hypot(...d);
    return { p, d: [d[0] / m, d[1] / m] };
  };
  const corte = o.corte ?? .4;
  const w0 = pequeno ? o.pw : o.w0, w1 = pequeno ? o.pw : o.w1;
  const larg = t => pequeno ? (o.pw0 != null ? o.pw0 + (o.pw - o.pw0) * Math.min(1, t / .5) : o.pw)
    : t <= corte ? w0 : w0 + (w1 - w0) * Math.pow((t - corte) / (1 - corte), 1.25);
  return { at, larg, corte, L };
}

// contorno de um trecho [t0,t1] do fio, como polígono preenchido
function trecho(g, t0, t1, n, capIni, capFim) {
  const E = [], D = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + (t1 - t0) * i / n, { p, d } = g.at(t), w = g.larg(t) / 2;
    E.push([p[0] - d[1] * w, p[1] + d[0] * w]); D.push([p[0] + d[1] * w, p[1] - d[0] * w]);
  }
  const f = q => `${r2(q[0])},${r2(q[1])}`;
  let s = 'M' + f(E[0]) + 'L' + E.slice(1).map(f).join(' ');
  const wf = g.larg(t1) / 2;
  s += capFim ? `A${r2(wf)},${r2(wf)} 0 0 1 ${f(D[n])}` : 'L' + f(D[n]);
  s += 'L' + D.slice(0, n).reverse().map(f).join(' ');
  const wi = g.larg(t0) / 2;
  s += capIni ? `A${r2(wi)},${r2(wi)} 0 0 1 ${f(E[0])}` : '';
  return s + 'Z';
}

function simbolo(o, cor, { pequeno = false, id = 'x' } = {}) {
  const pal = PAL[cor];
  const g = geometria(o, pequeno);
  let defs = '', body = '';
  const gradiente = pal.fio.length > 2;
  // fio em pedaços curtos (< 100°), cada um com gradiente linear na corda: cor contínua ao longo do voo
  const cortes = pequeno ? [0, .34, .67, 1] : [0, g.corte, g.corte + (1 - g.corte) / 2, 1];
  if (!gradiente) {
    body += `<path d="${trecho(g, 0, 1, 360, true, true)}" fill="${pal.fio[0][1]}"/>`;
  } else for (let k = 0; k < cortes.length - 1; k++) {
    const t0 = cortes[k], t1 = cortes[k + 1];
    const a = g.at(t0).p, b = g.at(t1).p, v = [b[0] - a[0], b[1] - a[1]], vv = v[0] ** 2 + v[1] ** 2;
    const gid = `ff-${id}-g${k}`;
    let st = '';
    for (let j = 0; j <= 6; j++) {
      const t = t0 + (t1 - t0) * j / 6, p = g.at(t).p;
      const off = Math.min(1, Math.max(0, ((p[0] - a[0]) * v[0] + (p[1] - a[1]) * v[1]) / vv));
      const [c, op] = corEm(pal.fio, t);
      st += `<stop offset="${r2(off)}" stop-color="${c}"${op < 1 ? ` stop-opacity="${r2(op)}"` : ''}/>`;
    }
    defs += `<linearGradient id="${gid}" gradientUnits="userSpaceOnUse" x1="${r2(a[0])}" y1="${r2(a[1])}" x2="${r2(b[0])}" y2="${r2(b[1])}">${st}</linearGradient>`;
    const e = k ? .004 : 0; // leve sobreposição para não abrir costura
    body += `<path d="${trecho(g, Math.max(0, t0 - e), t1, 140, k === 0, k === cortes.length - 2)}" fill="url(#${gid})"/>`;
  }
  // estrelas: 8, ritmo que acelera 0,86, 3 magnitudes
  if (!pequeno) {
    const R = [1.35, .74, 2.29, .81, 1.22, .74, .94, .68], OP = [.62, .67, .71, .76, .81, .86, .9, .95];
    let gaps = [], q = 1; for (let i = 0; i < 7; i++) { gaps.push(q); q *= .86; }
    const sum = gaps.reduce((x, y) => x + y), span = g.corte * .94;
    let t = 0;
    for (let i = 0; i < 8; i++) {
      const p = g.at(t).p, r = R[i] * (o.est || 1) * (pal.estrelaOp ? 1 : 1.15);
      body += `<circle cx="${r2(p[0])}" cy="${r2(p[1])}" r="${r2(r)}" fill="${pal.estrela}"${pal.estrelaOp ? ` fill-opacity="${OP[i]}"` : ''}/>`;
      if (i < 7) t += gaps[i] / sum * span;
    }
  }
  // F de luz
  const s = o.fH / 100, fx = o.cx - 58.9 * s / 2 + (o.fDx || 0), fy = o.cy - 102.88 * s / 2 - 1.44 * s + (o.fDy || 0);
  // F: bicolor (braço de luz separado por respiro) ou cor única (fUnico); fUnico + fJunto = F inteiro, um só desenho
  const fT = `<g transform="translate(${r2(fx)} ${r2(fy)}) scale(${r2(s * 1000) / 1000})">`;
  if (o.fUnico && o.fJunto) body += `${fT}<path d="${F_INTEIRO}" fill="${pal.f}"/></g>`;
  else {
    const bx = pequeno ? 26.14 : 24.64;
    body += `${fT}<path d="${F_HASTE}" fill="${pal.f}"/><path d="M${bx},44.5616h${r2(57.13 - bx)}v16.9863h-${r2(57.13 - bx)}z" fill="${o.fUnico ? pal.f : pal.braco}"/></g>`;
  }
  // vagalume
  const { p, d } = g.at(1), ang = Math.atan2(d[1], d[0]) / deg;
  const vx = r2(p[0]), vy = r2(p[1]);
  const nuc = pequeno ? o.pn : o.nucleo, halo = pequeno ? o.ph : o.halo;
  if (!pequeno) {
    const op = pal.asaOp ? ` stroke-opacity="${pal.asaOp}"` : '';
    const sw = r2(o.asaW || .97), sc = r2(o.asa || .62);
    body += `<g transform="translate(${vx} ${vy}) rotate(${r2(ang)})"><path d="${ASA}" transform="rotate(-26) scale(${sc})" fill="none" stroke="${pal.asa}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${op}/><path d="${ASA2}" transform="rotate(26) scale(${sc})" fill="none" stroke="${pal.asa}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${op}/></g>`;
  }
  if (pal.halo) {
    const [hc, h0, h1] = pal.halo, [n0, n1, n2] = pal.nucleo;
    defs += `<radialGradient id="ff-${id}-h" cx="${vx}" cy="${vy}" r="${halo}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${hc}" stop-opacity="${h0}"/><stop offset="0.35" stop-color="${hc}" stop-opacity="${h1}"/><stop offset="1" stop-color="${hc}" stop-opacity="0"/></radialGradient>`;
    defs += `<radialGradient id="ff-${id}-c" cx="${r2(p[0] - nuc * .25)}" cy="${r2(p[1] - nuc * .25)}" r="${r2(nuc * 1.25)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${n0}"/><stop offset="0.55" stop-color="${n1}"/><stop offset="1" stop-color="${n2}"/></radialGradient>`;
    body += `<circle cx="${vx}" cy="${vy}" r="${halo}" fill="url(#ff-${id}-h)"/><circle cx="${vx}" cy="${vy}" r="${r2(nuc)}" fill="url(#ff-${id}-c)"/>`;
  } else body += `<circle cx="${vx}" cy="${vy}" r="${r2(nuc * 1.15)}" fill="${pal.nucleoChapado}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><title>Fireflies · ${pequeno ? 'símbolo pequeno (24–39 px)' : 'símbolo (F de luz em órbita)'}</title><defs>${defs}</defs>${body}</svg>`;
}

module.exports = { simbolo, PAL, C };

// camada de construção (guia): elipse completa, eixos, caixa do F, área de proteção
function construcao(o, cor = '#2F7DE1') {
  const a = o.a, b = o.b, s = o.fH / 100;
  const fx = o.cx - 58.9 * s / 2 + (o.fDx || 0), fy = o.cy - 52.88 * s + 2.88 * s + (o.fDy || 0);
  const W = 2 * Math.max(a, b), m = W / 4;
  const st = `fill="none" stroke="${cor}" stroke-width="0.35"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true">
<g ${st} stroke-dasharray="1.4 1.2"><ellipse cx="${o.cx}" cy="${o.cy}" rx="${a}" ry="${b}" transform="rotate(${o.inc} ${o.cx} ${o.cy})"/>
<line x1="${o.cx - a - 6}" y1="${o.cy}" x2="${o.cx + a + 6}" y2="${o.cy}" transform="rotate(${o.inc} ${o.cx} ${o.cy})"/><line x1="${o.cx}" y1="${o.cy - b - 6}" x2="${o.cx}" y2="${o.cy + b + 6}" transform="rotate(${o.inc} ${o.cx} ${o.cy})"/></g>
<rect x="${r2(fx)}" y="${r2(fy)}" width="${r2(58.9 * s)}" height="${r2(100 * s)}" ${st}/>
<circle cx="${o.cx}" cy="${o.cy}" r="1" fill="${cor}"/></svg>`;
}
module.exports.construcao = construcao;

// favicon: F + vagalume (sem órbita); fUnico tira o braço colorido
function favicon(cor, { fUnico = true, id = 'fv' } = {}) {
  const pal = PAL[cor], s = .86, fx = 28.67, fy = 25.52;
  const F = fUnico ? `<path d="${F_INTEIRO}" fill="${pal.f}"/>` : `<path d="${F_HASTE}" fill="${pal.f}"/><path d="M29.14,44.5616h27.99v16.9863h-27.99z" fill="${pal.braco}"/>`;
  const luz = pal.nucleo ? `<defs><radialGradient id="ff-${id}-c" cx="84.47" cy="31.52" r="19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${pal.nucleo[0]}"/><stop offset="0.55" stop-color="${pal.nucleo[1]}"/><stop offset="1" stop-color="${pal.nucleo[2]}"/></radialGradient></defs><circle cx="88.47" cy="35.52" r="15" fill="url(#ff-${id}-c)"/>`
    : `<circle cx="88.47" cy="35.52" r="15" fill="${pal.nucleoChapado}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><title>Fireflies · favicon (16 px)</title><g transform="translate(${fx} ${fy}) scale(${s})">${F}</g>${luz}</svg>`;
}
module.exports.favicon = favicon;
