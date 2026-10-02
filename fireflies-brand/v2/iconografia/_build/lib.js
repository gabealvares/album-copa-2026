// Fireflies v2 · iconografia · utilitários comuns
// Gramática "Carta do Lume": estrela (círculo cheio), ponto (magnitude menor),
// lanterna (no máx. 1, class="lit"), traço de constelação pontilhado (no máx. 1).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FONTS = path.join(__dirname, 'fonts');

const COR = {
  anil: '#17183A', cal: '#EDEEEA', branco: '#FFFFFF', ambar: '#F2B544',
  vermelhao: '#E65A3E', rubrica: '#A9301F', ceu: '#6E89B4',
  fuligem: '#2A2F3D', pedra: '#5E6271', fumaca: '#D2D4DA',
};

const r2 = n => Math.round(n * 100) / 100;
const f = n => String(r2(n)).replace(/^0\./, '.').replace(/^-0\./, '-.');

// arco por ângulos (graus, 0 = direita, sentido horário na tela)
function arcPts(cx, cy, r, a0, a1) {
  const rad = a => (a * Math.PI) / 180;
  const p0 = [cx + r * Math.cos(rad(a0)), cy + r * Math.sin(rad(a0))];
  const p1 = [cx + r * Math.cos(rad(a1)), cy + r * Math.sin(rad(a1))];
  const sweep = a1 > a0 ? 1 : 0;
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return { p0, p1, d: `M${f(p0[0])} ${f(p0[1])}A${f(r)} ${f(r)} 0 ${large} ${sweep} ${f(p1[0])} ${f(p1[1])}`, len: (Math.abs(a1 - a0) * Math.PI * r) / 180 };
}

// pontilhado que fecha exatamente nas pontas: n intervalos iguais perto de `alvo`
function gapFor(len, alvo = 3) {
  const n = Math.max(1, Math.round(len / alvo));
  return r2(len / n);
}

// ---- texto em curvas (opentype.js) ----
let opentype;
try { opentype = require('opentype.js'); } catch (e) {
  opentype = require('/tmp/claude-0/-home-user-album-copa-2026/d4646268-3ddb-517a-9bb4-aa870c740fea/scratchpad/v2/tipo/node_modules/opentype.js');
}
const fontCache = {};
function font(file) {
  if (!fontCache[file]) { const b = fs.readFileSync(path.join(FONTS, file)); fontCache[file] = opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); }
  return fontCache[file];
}
// devolve {d, width}; tracking em em
function textPath(str, file, size, x, y, { tracking = 0, anchor = 'start' } = {}) {
  const fnt = font(file);
  const scale = size / fnt.unitsPerEm;
  const glyphs = fnt.stringToGlyphs(str);
  let w = 0;
  const adv = glyphs.map((g, i) => {
    let a = g.advanceWidth * scale;
    if (i < glyphs.length - 1) { const k = fnt.getKerningValue(g, glyphs[i + 1]); a += (Number.isFinite(k) ? k : 0) * scale + tracking * size; }
    w += a; return a;
  });
  let cx = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  let d = '';
  const n = v => String(Math.round(v * 100) / 100);
  glyphs.forEach((g, i) => {
    for (const c of g.getPath(cx, y, size).commands) {
      if (c.type === 'M' || c.type === 'L') d += `${c.type}${n(c.x)} ${n(c.y)}`;
      else if (c.type === 'Q') d += `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
      else if (c.type === 'C') d += `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
      else if (c.type === 'Z') d += 'Z';
    }
    cx += adv[i];
  });
  return { d, width: w };
}

// RNG determinístico (mulberry32)
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fontFaceCSS() {
  const ff = (fam, file, w, st = 'normal') => `@font-face{font-family:'${fam}';src:url('file://${path.join(FONTS, file)}');font-weight:${w};font-style:${st}}`;
  return [
    ff('Cormorant Garamond', 'CG-700.ttf', 700), ff('Cormorant Garamond', 'CormorantG-600-normal.ttf', 600),
    ff('Cormorant Garamond', 'CormorantG-400-italic.ttf', 400, 'italic'),
    ff('IBM Plex Sans', 'IBMPlexSans-400-normal.ttf', 400), ff('IBM Plex Sans', 'IBMPlexSans-500-normal.ttf', 500),
    ff('IBM Plex Sans', 'IBMPlexSans-600-normal.ttf', 600),
    ff('IBM Plex Mono', 'IBMPlexMono-400-normal.ttf', 400), ff('IBM Plex Mono', 'IBMPlexMono-500-normal.ttf', 500),
  ].join('\n');
}

async function shot(html, out, width = 1400, opts = {}) {
  const { chromium } = require('/opt/node22/lib/node_modules/playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: 800 }, deviceScaleFactor: opts.scale || 1 });
  const tmp = path.join(__dirname, 'review', path.basename(out).replace(/\.png$/, '.html'));
  fs.writeFileSync(tmp, html);
  await page.goto('file://' + tmp);
  await page.evaluate(() => document.fonts.ready);
  let result = null;
  if (opts.evaluate) result = await page.evaluate(opts.evaluate);
  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  return result;
}

module.exports = { ROOT, FONTS, COR, f, r2, arcPts, gapFor, textPath, rng, fontFaceCSS, shot };
