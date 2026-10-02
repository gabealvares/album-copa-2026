// Fireflies Consultoria v2 · aplicações · biblioteca comum
// Toda peça é AUTORADA EM SVG, com o texto convertido em curvas (opentype.js).
// Nada depende de fonte instalada: o SVG abre igual no Illustrator, Inkscape, Figma, navegador.
const fs = require('fs');
const path = require('path');
const opentype = require('opentype.js');
const QR = require('qrcode');

const BUILD = __dirname;
const OUT = path.resolve(__dirname, '..');          // v2/aplicacoes
const V2 = path.resolve(__dirname, '../..');        // v2
const LOGO = path.join(V2, 'logo/svg');
const ICO = path.join(V2, 'iconografia');

// ---------- cores (tokens.json) ----------
const C = {
  anil: '#17183A', profundo: '#0F1029', cal: '#EDEEEA', branco: '#FFFFFF', ambar: '#F2B544',
  vermelhao: '#E65A3E', rubrica: '#A9301F', ceu: '#6E89B4', fuligem: '#2A2F3D', pedra: '#5E6271',
  fumaca: '#D2D4DA', sucesso: '#2D7550', alerta: '#9A5A06', erro: '#A51C45',
};
const pt = n => n * 25.4 / 72; // pt -> mm

// ---------- fontes ----------
const FONTES = {
  sora6: 'Sora-600-normal.ttf', sora7: 'Sora-700-normal.ttf',
  sans4: 'IBMPlexSans-400-normal.ttf', sans5: 'IBMPlexSans-500-normal.ttf', sans6: 'IBMPlexSans-600-normal.ttf',
  sansi: 'IBMPlexSans-400-italic-var.ttf',
  mono4: 'IBMPlexMono-400-normal.ttf', mono5: 'IBMPlexMono-500-normal.ttf',
};
const cache = {};
function fonte(k) {
  if (!cache[k]) {
    const b = fs.readFileSync(path.join(BUILD, 'fonts', FONTES[k]));
    cache[k] = opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
  }
  return cache[k];
}
const n2 = v => String(Math.round(v * 100) / 100);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function glyphs(str, f, s, tr) {
  const fnt = fonte(f);
  const sc = s / fnt.unitsPerEm;
  const gs = fnt.stringToGlyphs(str);
  gs.forEach((g, i) => { if (g.index === 0 && str[i] !== ' ') console.warn(`  ! glifo ausente em ${f}: "${str[i]}"`); });
  const adv = gs.map((g, i) => {
    let a = g.advanceWidth * sc;
    if (i < gs.length - 1) {
      const k = fnt.getKerningValue(g, gs[i + 1]);
      a += (Number.isFinite(k) ? k : 0) * sc + tr * s;
    }
    return a;
  });
  return { fnt, gs, adv, w: adv.reduce((a, b) => a + b, 0) };
}
function measure(str, f = 'sans4', s = 16, tr = 0) { return str ? glyphs(str, f, s, tr).w : 0; }

function pathData(cmds) {
  let d = '';
  for (const c of cmds) {
    if (c.type === 'M' || c.type === 'L') d += `${c.type}${n2(c.x)} ${n2(c.y)}`;
    else if (c.type === 'Q') d += `Q${n2(c.x1)} ${n2(c.y1)} ${n2(c.x)} ${n2(c.y)}`;
    else if (c.type === 'C') d += `C${n2(c.x1)} ${n2(c.y1)} ${n2(c.x2)} ${n2(c.y2)} ${n2(c.x)} ${n2(c.y)}`;
    else if (c.type === 'Z') d += 'Z';
  }
  return d;
}

// texto em curvas. y = linha de base. a = start|middle|end. tr = tracking em em.
function t(str, { f = 'sans4', s = 16, x = 0, y = 0, fill = C.fuligem, tr = 0, a = 'start', op } = {}) {
  str = String(str);
  if (!str.trim()) return '';
  const { gs, adv, w } = glyphs(str, f, s, tr);
  let cx = a === 'middle' ? x - w / 2 : a === 'end' ? x - w : x;
  let d = '';
  gs.forEach((g, i) => { d += pathData(g.getPath(cx, y, s).commands); cx += adv[i]; });
  return `<path aria-label="${esc(str)}" d="${d}" fill="${fill}"${op != null ? ` fill-opacity="${op}"` : ''}/>`;
}

// texto em arco (selos). top: base no raio, letras para fora; bottom: letras para dentro.
function tArc(str, { f = 'mono5', s = 10, cx = 0, cy = 0, r = 50, fill = C.anil, tr = 0, bottom = false, center = 0 } = {}) {
  const { gs, adv, w } = glyphs(str, f, s, tr);
  const total = w / r; // rad
  let acc = 0, out = '';
  gs.forEach((g, i) => {
    const gw = g.advanceWidth * s / fonte(f).unitsPerEm;
    const mid = acc + gw / 2;
    const d = pathData(g.getPath(-gw / 2, 0, s).commands);
    if (!bottom) {
      const th = center * Math.PI / 180 - total / 2 + mid / r;
      const px = cx + r * Math.sin(th), py = cy - r * Math.cos(th);
      out += `<path d="${d}" transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(th * 180 / Math.PI)})"/>`;
    } else {
      const ps = -total / 2 + mid / r;
      const px = cx + r * Math.sin(ps), py = cy + r * Math.cos(ps);
      out += `<path d="${d}" transform="translate(${n2(px)} ${n2(py)}) rotate(${n2(-ps * 180 / Math.PI)})"/>`;
    }
    acc += adv[i];
  });
  return `<g aria-label="${esc(str)}" fill="${fill}">${out}</g>`;
}

// parágrafo com quebra automática. **palavra** = destaque (fonte bf, cor bfill).
// \n força quebra. Retorna { svg, h, n, y (base da última linha) }.
function para(text, o = {}) {
  const { f = 'sans4', s = 16, lh = s * 1.45, w = 400, x = 0, y = 0, fill = C.fuligem, tr = 0, a = 'start',
    bf = 'sans6', bfill = C.rubrica, btr = tr } = o;
  const toks = [];
  let em = false, sp = false;
  for (const part of String(text).split(/(\*\*|\n| +)/)) {
    if (part === '**') { em = !em; continue; }
    if (part === '\n') { toks.push({ br: true }); sp = false; continue; }
    if (/^ +$/.test(part)) { sp = true; continue; }
    if (part === '') continue;
    toks.push({ wd: part, em, sp }); sp = false;
  }
  const lines = [[]];
  let lw = 0;
  const sw = measure(' ', f, s, tr) + tr * s;
  toks.forEach(tk => {
    if (tk.br) { lines.push([]); lw = 0; return; }
    const ww = measure(tk.wd, tk.em ? bf : f, s, tk.em ? btr : tr);
    const cur = lines[lines.length - 1];
    const gap = cur.length && tk.sp ? sw : 0;
    if (cur.length && lw + gap + ww > w) { lines.push([{ ...tk, sp: false }]); lw = ww; }
    else { cur.push(tk); lw += gap + ww; }
  });
  let svg = '';
  lines.forEach((ln, li) => {
    const by = y + li * lh;
    // agrupa por estilo
    const runs = [];
    ln.forEach((tk, i) => {
      const last = runs[runs.length - 1];
      const sep = i > 0 && tk.sp ? ' ' : '';
      if (last && last.em === tk.em) last.str += sep + tk.wd;
      else runs.push({ em: tk.em, str: tk.wd, lead: sep });
    });
    const lineW = runs.reduce((acc, r) => acc + (r.lead ? sw : 0) + measure(r.str, r.em ? bf : f, s, r.em ? btr : tr), 0);
    let cx = a === 'middle' ? x - lineW / 2 : a === 'end' ? x - lineW : x;
    runs.forEach(r => {
      if (r.lead) cx += sw;
      const ff = r.em ? bf : f;
      svg += t(r.str, { f: ff, s, x: cx, y: by, fill: r.em ? bfill : fill, tr: r.em ? btr : tr });
      cx += measure(r.str, ff, s, r.em ? btr : tr) + (r.em ? btr : tr) * s;
    });
  });
  return { svg, h: lines.length * lh, n: lines.length, y: y + (lines.length - 1) * lh };
}

// ---------- logo ----------
// Caixa da ARTE visível (sem a área de proteção que já vem no viewBox, sem o halo).
const ART = {
  horizontal: [-208, -109, 1120, 396], 'condominios-horizontal': [-208, -109, 1120, 396],
  'academy-horizontal': [-208, -109, 1120, 396], vertical: [0, -262, 708, 454],
  simbolo: [3, 35, 113, 45], 'simbolo-pequeno': [3, 36, 114, 46], favicon: [28.7, 20.5, 74.7, 93.4],
  wordmark: [0, 0, 708, 192.3],
};
const XCAP = 96 / 1120; // X (altura da versal) em fração da largura do horizontal
let UID = 0;
function interior(svg) {
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>[\s\S]*?<\/title>/, '');
}
function prefixIds(s, p) {
  return s.replace(/id="([^"]+)"/g, `id="${p}$1"`).replace(/url\(#([^)]+)\)/g, `url(#${p}$1)`).replace(/href="#([^"]+)"/g, `href="#${p}$1"`);
}
// logo(versao, cor, {x, y, w | h}) -> {svg, w, h, x, y}. x,y = canto superior esquerdo da arte.
function logo(v, cor, { x = 0, y = 0, w, h } = {}) {
  const raw = fs.readFileSync(path.join(LOGO, `fireflies_${v}_${cor}.svg`), 'utf8');
  const A = ART[v];
  const sc = w ? w / A[2] : h / A[3];
  const inner = prefixIds(interior(raw), `lg${++UID}-`);
  return {
    svg: `<g aria-label="Fireflies ${v} ${cor}" transform="translate(${n2(x - A[0] * sc)} ${n2(y - A[1] * sc)}) scale(${sc.toFixed(5)})">${inner}</g>`,
    w: A[2] * sc, h: A[3] * sc, x, y, X: (v.includes('horizontal') ? A[2] * XCAP : v === 'vertical' ? A[2] * 0.12 : A[2] * 0.2) * sc,
  };
}

// ---------- iconografia ----------
// resolve currentColor e as variáveis CSS para cores literais (abre em qualquer programa)
function resolve(s, { c, lit, edge = 'none', line }) {
  return s
    .replace(/var\(--ff-lit-edge,\s*none\)/g, edge || 'none')
    .replace(/var\(--ff-lit,\s*currentColor\)/g, lit || c)
    .replace(/var\(--ff-line,\s*currentColor\)/g, line || c)
    .replace(/currentColor/g, c);
}
function rootAttrs(raw) {
  const m = raw.match(/<svg([^>]*)>/)[1];
  const vb = m.match(/viewBox="([^"]+)"/)[1].split(/[ ,]+/).map(Number);
  const keep = (m.match(/\s(fill|stroke|stroke-width|stroke-linecap|stroke-linejoin)="[^"]*"/g) || []).join('');
  return { vb, keep };
}
function grafico(file, { x = 0, y = 0, w, h, c = C.anil, lit, edge, line, op, extra = '' } = {}) {
  const raw = fs.readFileSync(file, 'utf8');
  const { vb, keep } = rootAttrs(raw);
  const sc = w ? w / vb[2] : h / vb[3];
  const inner = prefixIds(resolve(interior(raw), { c, lit, edge, line }), `gr${++UID}-`);
  return `<g transform="translate(${n2(x - vb[0] * sc)} ${n2(y - vb[1] * sc)}) scale(${sc.toFixed(5)})"${resolve(keep, { c })}${op != null ? ` opacity="${op}"` : ''}${extra}>${inner}</g>`;
}
// lit: cor da lanterna; no claro use lit:C.ambar, edge:C.anil; quando o logo já é a luz, lit = c
const icon = (n, o) => grafico(path.join(ICO, 'icones/svg', n + '.svg'), { w: o.s, ...o });
const emb = (n, o) => grafico(path.join(ICO, 'constelacoes/svg', n + '.svg'), { w: o.s, ...o });
const orn = (n, o) => grafico(path.join(ICO, 'ornamentos/svg', n + '.svg'), o);

// padrão: devolve { def, fill } (copiado de iconografia/padroes). lit = cor que substitui o âmbar.
function padrao(nome, { k = 1, lit, semFundo = true, cor } = {}) {
  const raw = fs.readFileSync(path.join(ICO, 'padroes', nome + '.svg'), 'utf8');
  let p = raw.match(/<pattern[\s\S]*?<\/pattern>/)[0];
  const id = `pt${++UID}`;
  p = p.replace(/id="[^"]+"/, `id="${id}"`);
  if (k !== 1) p = p.replace('<pattern ', `<pattern patternTransform="scale(${k})" `);
  if (semFundo) p = p.replace(/<rect width="\d+" height="\d+" fill="#[0-9A-Fa-f]+"\/>/, '');
  if (lit) p = p.replace(/fill="#F2B544" stroke="#17183A" stroke-width="1.2"/g, `fill="${lit}"`).replace(/#F2B544/g, lit);
  if (cor) for (const [a, b] of Object.entries(cor)) p = p.split(a).join(b);
  return { def: p, fill: `url(#${id})` };
}

// QR em quadrados (sem fundo); s = lado total
function qr(url, { x = 0, y = 0, s = 100, c = C.anil } = {}) {
  const q = QR.create(url, { errorCorrectionLevel: 'M' });
  const n = q.modules.size, m = s / n;
  let d = '';
  for (let r = 0; r < n; r++) for (let col = 0; col < n; col++)
    if (q.modules.get(r, col)) d += `M${n2(x + col * m)} ${n2(y + r * m)}h${n2(m)}v${n2(m)}h-${n2(m)}z`;
  return `<path aria-label="QR ${esc(url)}" d="${d}" fill="${c}" shape-rendering="crispEdges"/>`;
}

// ---------- primitivas ----------
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="${n2(h)}" fill="${fill}"${extra}/>`;
const line = (x1, y1, x2, y2, stroke, sw, extra = '') => `<path d="M${n2(x1)} ${n2(y1)}L${n2(x2)} ${n2(y2)}" stroke="${stroke}" stroke-width="${sw}" fill="none"${extra}/>`;
const circle = (cx, cy, r, fill, extra = '') => `<circle cx="${n2(cx)}" cy="${n2(cy)}" r="${n2(r)}" fill="${fill}"${extra}/>`;

// selo "Dados de exemplo"
function exemplo({ x, y, s = 14, c = C.pedra, a = 'start', borda = true }) {
  const label = 'DADOS DE EXEMPLO';
  const w = measure(label, 'mono5', s, 0.1) + s * 1.2;
  const x0 = a === 'end' ? x - w : x;
  return (borda ? `<rect x="${n2(x0)}" y="${n2(y - s * 1.15)}" width="${n2(w)}" height="${n2(s * 1.7)}" rx="${n2(s * 0.25)}" fill="none" stroke="${c}" stroke-width="${n2(s * 0.08)}"/>` : '')
    + t(label, { f: 'mono5', s, x: x0 + s * 0.6, y, fill: c, tr: 0.1 });
}

// ---------- documento ----------
// unit 'px' (digital) ou 'mm' (impresso). bleed em mm (só impressos).
function svgDoc({ w, h, unit = 'px', title = '', body = '', defs = '', bg }) {
  const W = unit === 'mm' ? `${n2(w)}mm` : w, H = unit === 'mm' ? `${n2(h)}mm` : h;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${n2(w)} ${n2(h)}">\n<title>${esc(title)}</title>\n${defs ? `<defs>${defs}</defs>\n` : ''}${bg ? rect(0, 0, w, h, bg) + '\n' : ''}${body}\n</svg>\n`;
}

// manifesto de exportação: cada gerador registra as peças; render.js rasteriza.
const MANIFESTO = [];
function save(rel, { w, h, unit = 'px', title, body, defs, bg, print = false, bleed = 0, pdf, png = true, scale }) {
  const file = path.join(OUT, rel + '.svg');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, svgDoc({ w, h, unit, title, body, defs, bg }));
  MANIFESTO.push({ rel, w, h, unit, print, bleed, pdf, png, scale });
  console.log('svg', rel + '.svg');
}
function flush(grupo) {
  fs.mkdirSync(path.join(BUILD, 'manifesto'), { recursive: true });
  fs.writeFileSync(path.join(BUILD, 'manifesto', grupo + '.json'), JSON.stringify(MANIFESTO, null, 1));
}

module.exports = { C, pt, t, tArc, para, measure, logo, ART, icon, emb, orn, padrao, qr, rect, line, circle, exemplo, save, flush, svgDoc, OUT, V2, BUILD, esc, n2 };
