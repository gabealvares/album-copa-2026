// Fireflies v2 · ambientação · manual 5.8 e guia de rollout (selo datado)
const L = require('./lib');
const { C, pt, t, tArc, logo, qr, rect, line, circle } = L;
const DIR = 'ambientacao/';
const B = 3;

// 1 · PLACA DE PORTA / FACHADA 600×300 mm (ACM Anil + adesivo de recorte Cal + Âmbar) -----
{
  const o = B, W = 600 + 2 * o, H = 300 + 2 * o;
  const lg = logo('horizontal', 'chapado-negativo', { w: 420 });
  let b = logo('horizontal', 'chapado-negativo', { w: 420, x: o + 90, y: o + 150 - lg.h / 2 - 8 }).svg;
  b += t('AUDITORIA DE CONDOMÍNIOS · CONSULTORIA CONTÁBIL E FISCAL', { f: 'mono5', s: 9, x: o + 300, y: o + 268, fill: C.fumaca, a: 'middle', tr: 0.14 });
  L.save(DIR + 'placa-fachada_600x300mm', { w: W, h: H, unit: 'mm', bleed: o, bg: C.anil, body: b, pdf: true, title: 'Fireflies Consultoria · placa de porta/fachada 600×300 mm (ACM Anil, recorte Cal + Âmbar)' });
}

// 2 · SELO "PRESTAÇÃO DE CONTAS AUDITADA" · vinil Ø100 mm + digital 1080 -----------------
const SELO_URL = 'https://fireflies.com.br/selo/AUD-2026-031';
function selo(cx, cy) {
  let b = circle(cx, cy, 50, C.anil);
  b += `<circle cx="${cx}" cy="${cy}" r="46.5" fill="none" stroke="${C.ceu}" stroke-width="0.35"/>`;
  b += `<circle cx="${cx}" cy="${cy}" r="37" fill="none" stroke="${C.ceu}" stroke-width="0.35"/>`;
  // marcas graduadas entre os anéis (Selo de Carta)
  let d = '';
  for (let i = 0; i < 120; i++) {
    const a = i * Math.PI / 60, r1 = 37, r2 = i % 10 === 0 ? 38.6 : 37.8;
    d += `M${(cx + r1 * Math.sin(a)).toFixed(2)} ${(cy - r1 * Math.cos(a)).toFixed(2)}L${(cx + r2 * Math.sin(a)).toFixed(2)} ${(cy - r2 * Math.cos(a)).toFixed(2)}`;
  }
  b += `<path d="${d}" stroke="${C.ceu}" stroke-width="0.25"/>`;
  b += tArc('PRESTAÇÃO DE CONTAS 2026', { f: 'mono5', s: 4.6, cx, cy, r: 41, fill: C.cal, tr: 0.12 });
  b += tArc('AUDITADA POR FIREFLIES CONSULTORIA', { f: 'mono5', s: 4.1, cx, cy, r: 41 + 3.1, fill: C.cal, tr: 0.08, bottom: true });
  b += circle(cx - 42.6, cy, 0.9, C.vermelhao) + circle(cx + 42.6, cy, 0.9, C.vermelhao);
  const sb = logo('simbolo', 'digital-negativo', { h: 12 });
  b += logo('simbolo', 'digital-negativo', { h: 12, x: cx - sb.w / 2, y: cy - 28.5 }).svg;
  b += `<rect x="${cx - 12.5}" y="${cy - 13}" width="25" height="25" rx="1.6" fill="${C.branco}"/>`;
  b += qr(SELO_URL, { x: cx - 10.5, y: cy - 11, s: 21, c: C.anil });
  b += t('VERIFIQUE PELO QR', { f: 'mono5', s: 2.3, x: cx, y: cy + 17.5, fill: C.cal, a: 'middle', tr: 0.12 });
  b += t('Válido até o próximo exercício', { f: 'sans4', s: 2.4, x: cx, y: cy + 21.5, fill: C.fumaca, a: 'middle' });
  b += t('AUD-2026-031', { f: 'mono4', s: 2.2, x: cx, y: cy + 25.3, fill: C.fumaca, a: 'middle', tr: 0.08 });
  return b;
}
{
  const o = B, W = 100 + 2 * o;
  // sangria: o Anil continua 3 mm além do corte circular (faca em círculo Ø100)
  const b = circle(W / 2, W / 2, 53, C.anil) + selo(W / 2, W / 2);
  L.save(DIR + 'selo-contas-auditadas_vinil-100mm', { w: W, h: W, unit: 'mm', bleed: o, body: b, pdf: true, title: 'Selo datado "Prestação de contas 2026 auditada por Fireflies Consultoria" · vinil Ø100 mm, faca circular' });
  const k = 1080 / 120;
  L.save(DIR + 'selo-contas-auditadas_digital-1080', { w: 1080, h: 1080, bg: C.cal, body: `<g transform="scale(${k}) translate(10 10)">${selo(50, 50)}</g>`, title: 'Selo datado · versão digital 1080×1080 para informativos' });
}

// 3 · BRINDES: caneca e camiseta (mockup vetorial chapado) -------------------------------
function caneca(x, y, cor, contorno, versao, rotulo) {
  let b = `<path d="M${x + 420} ${y + 130}C${x + 560} ${y + 130} ${x + 560} ${y + 380} ${x + 420} ${y + 380}" fill="none" stroke="${contorno}" stroke-width="64" stroke-linecap="round"/>`;
  b += `<path d="M${x + 420} ${y + 130}C${x + 560} ${y + 130} ${x + 560} ${y + 380} ${x + 420} ${y + 380}" fill="none" stroke="${cor}" stroke-width="56" stroke-linecap="round"/>`;
  b += `<rect x="${x}" y="${y}" width="440" height="500" rx="28" fill="${cor}" stroke="${contorno}" stroke-width="4"/>`;
  b += rect(x + 2, y + 2, 436, 22, contorno, ' opacity=".35"');
  b += logo('horizontal', versao, { w: 280, x: x + 80, y: y + 190 }).svg;
  b += t(rotulo, { f: 'mono5', s: 18, x: x + 220, y: y + 580, fill: C.pedra, a: 'middle', tr: 0.1 });
  return b;
}
{
  let b = caneca(140, 180, C.branco, C.fumaca, 'chapado', 'CANECA BRANCA · SERIGRAFIA 2 CORES');
  b += caneca(900, 180, C.anil, C.profundo, 'chapado-negativo', 'CANECA ANIL FOSCO · CAL + ÂMBAR');
  b += t('BRINDES · CANECA', { f: 'mono5', s: 22, x: 80, y: 90, fill: C.rubrica, tr: 0.12 });
  L.save(DIR + 'mockup-caneca', { w: 1600, h: 900, bg: C.cal, body: b, title: 'Fireflies Consultoria · caneca (mockup vetorial chapado)' });
}
function camiseta(x, y, cor, contorno, versao, rotulo) {
  const p = (px, py) => `${x + px} ${y + py}`;
  let b = `<path d="M${p(250, 40)}Q${p(400, 120)} ${p(550, 40)}L${p(720, 110)}L${p(800, 300)}L${p(675, 350)}L${p(640, 270)}L${p(640, 820)}L${p(160, 820)}L${p(160, 270)}L${p(125, 350)}L${p(0, 300)}L${p(80, 110)}Z" fill="${cor}" stroke="${contorno}" stroke-width="4" stroke-linejoin="round"/>`;
  b += `<path d="M${p(250, 40)}Q${p(400, 150)} ${p(550, 40)}" fill="none" stroke="${contorno}" stroke-width="14"/>`;
  // logo no peito, ~85 mm em camiseta adulta (≈ 26 % da largura do tronco)
  b += logo('horizontal', versao, { w: 150, x: x + 440, y: y + 210 }).svg;
  b += t(rotulo, { f: 'mono5', s: 18, x: x + 400, y: y + 880, fill: C.pedra, a: 'middle', tr: 0.1 });
  return b;
}
{
  let b = camiseta(60, 120, C.anil, C.profundo, 'chapado-negativo', 'ANIL · SERIGRAFIA CAL + ÂMBAR');
  b += camiseta(940, 120, '#E8E2D2', '#CFC6B0', 'mono-anil', 'ALGODÃO CRU · 1 COR ANIL');
  b += t('BRINDES · CAMISETA', { f: 'mono5', s: 22, x: 80, y: 70, fill: C.rubrica, tr: 0.12 });
  L.save(DIR + 'mockup-camiseta', { w: 1800, h: 1060, bg: C.cal, body: b, title: 'Fireflies Consultoria · camiseta (mockup vetorial chapado)' });
}
L.flush('ambientacao');
