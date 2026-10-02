// Fireflies v2 · papelaria (mm) · manual 5.3, 5.4, 5.7 e 5.8
const L = require('./lib');
const { C, pt, t, para, logo, icon, emb, orn, padrao, qr, rect, line, circle, measure } = L;
const DIR = 'papelaria/';
const B = 3;
const CRC = 'CRC-SP [nº a confirmar]';
const WA = 'https://wa.me/5511982450527';

// =====================================================================
// 1 · CARTÃO DE VISITA 90×50 (arquivo 96×56, sangria 3, segurança 5)
// =====================================================================
{
  const W = 96, H = 56, o = B;
  // frente
  const p = padrao('campo-estrelas-escuro', { k: 0.16, lit: C.ceu, cor: { '#EDEEEA': C.ceu } });
  let f = rect(0, 0, W, H, C.anil);
  f += rect(0, o + 50 * 2 / 3 - 2, W, H, p.fill, ' opacity=".3"');
  const lv = logo('vertical', 'digital-negativo', { w: 28 });
  f += logo('vertical', 'digital-negativo', { w: 28, x: W / 2 - 14, y: o + 25 - lv.h / 2 - 2 }).svg;
  L.save(DIR + 'cartao-visita_frente', { w: W, h: H, unit: 'mm', bleed: o, body: f, defs: p.def, pdf: DIR + 'cartao-visita_90x50mm_sangria3mm', title: 'Fireflies Consultoria · cartão de visita · frente' });
  // verso
  const s = o + 5; // segurança
  let v = rect(0, 0, W, H, C.branco);
  v += line(s, s + 3, s + 8, s + 3, C.rubrica, pt(0.75));
  v += t('Gabriel Alvares', { f: 'sans6', s: pt(9), x: s, y: s + 9, fill: C.anil });
  v += t('Contador responsável · ' + CRC, { f: 'sans4', s: pt(7), x: s, y: s + 13, fill: C.pedra });
  v += t('Fireflies Consultoria', { f: 'sans4', s: pt(7), x: s, y: s + 16.6, fill: C.pedra });
  ['+55 11 98245-0527', 'contato@fireflies.com.br', 'fireflies.com.br'].forEach((d, i) => {
    v += t(d, { f: 'mono4', s: pt(7), x: s, y: s + 28 + i * 3.6, fill: C.fuligem });
  });
  v += qr(WA, { x: o + 90 - 5 - 15, y: o + 50 - 5 - 15, s: 15, c: C.anil });
  v += t('WHATSAPP', { f: 'mono5', s: pt(5.5), x: o + 90 - 5 - 7.5, y: o + 50 - 5 - 16.6, fill: C.pedra, a: 'middle', tr: 0.1 });
  v += logo('simbolo-pequeno', 'digital', { w: 11, x: o + 90 - 5 - 11, y: s }).svg;
  L.save(DIR + 'cartao-visita_verso', { w: W, h: H, unit: 'mm', bleed: o, body: v, pdf: DIR + 'cartao-visita_90x50mm_sangria3mm', title: 'Fireflies Consultoria · cartão de visita · verso' });
}

// =====================================================================
// 2 · ENVELOPE DL 220×110 (frente + aba interna)
// =====================================================================
{
  const W = 220, H = 110;
  let f = logo('horizontal', 'digital', { w: 40, x: 12, y: 12 }).svg;
  f += line(12, 33, 22, 33, C.rubrica, pt(0.75));
  ['Fireflies Consultoria', 'São Paulo/SP · fireflies.com.br', 'contato@fireflies.com.br'].forEach((d, i) => {
    f += t(d, { f: 'mono4', s: pt(7), x: 12, y: 38 + i * 3.4, fill: C.pedra });
  });
  L.save(DIR + 'envelope-dl_frente', { w: W, h: H, unit: 'mm', bg: C.branco, body: f, pdf: DIR + 'envelope-dl_220x110mm', title: 'Fireflies Consultoria · envelope DL · frente (janela 100×35 é faca do fornecedor)' });
  // aba interna: padrão constelação contínua em Anil
  const p = padrao('constelacao-continua-claro', { k: 0.2, lit: C.anil });
  let v = `<path d="M0 0H${W}V8L${W - 30} 42H30L0 8Z" fill="${p.fill}"/>`;
  v += `<path d="M0 8L30 42H${W - 30}L${W} 8" fill="none" stroke="${C.fumaca}" stroke-width="0.3" stroke-dasharray="1 1"/>`;
  v += t('LUZ MEDIDA.', { f: 'sora6', s: pt(8), x: W / 2, y: 80, fill: C.anil, a: 'middle', tr: 0.08 });
  L.save(DIR + 'envelope-dl_verso-aba', { w: W, h: H, unit: 'mm', bg: C.branco, body: v, defs: p.def, pdf: DIR + 'envelope-dl_220x110mm', title: 'Fireflies Consultoria · envelope DL · verso com aba (padrão no interno da aba)' });
}

// =====================================================================
// 3 · PASTA A4 · frente 220×310 (arquivo 226×316)
// =====================================================================
{
  const o = B, W = 220 + 2 * o, H = 310 + 2 * o;
  const p = padrao('campo-estrelas-escuro', { k: 0.3, lit: C.ceu, cor: { '#EDEEEA': C.ceu } });
  let b = rect(0, 0, W, H, C.anil);
  b += rect(0, o + 118, W, 150, p.fill, ' opacity=".75"');
  b += logo('horizontal', 'digital-negativo', { w: 70, x: o + 25, y: o + 30 }).svg;
  b += t('LUZ MEDIDA.', { f: 'sora7', s: pt(26), x: o + 25, y: o + 290, fill: C.cal, tr: 0.04 });
  b += line(o + 25, o + 270, o + 37, o + 270, C.vermelhao, pt(1.2));
  b += t('CONSULTORIA FINANCEIRA, CONTÁBIL E FISCAL · SÃO PAULO', { f: 'mono5', s: pt(7.5), x: o + 25, y: o + 278.5, fill: C.fumaca, tr: 0.1 });
  b += t('fireflies.com.br', { f: 'mono4', s: pt(8), x: o + 220 - 20, y: o + 290, fill: C.fumaca, a: 'end' });
  L.save(DIR + 'pasta-A4_frente', { w: W, h: H, unit: 'mm', bleed: o, body: b, defs: p.def, pdf: true, title: 'Fireflies Consultoria · pasta A4 com bolso · frente 220×310 mm' });
}

// =====================================================================
// 4 · CRACHÁ PVC 54×86 vertical (arquivo 60×92)
// =====================================================================
{
  const o = B, W = 54 + 2 * o, H = 86 + 2 * o, topo = 86 * 0.4;
  let b = rect(0, 0, W, H, C.branco) + rect(0, 0, W, o + topo, C.anil);
  b += `<rect x="${o + 27 - 6.5}" y="${o + 4}" width="13" height="3" rx="1.5" fill="none" stroke="${C.ceu}" stroke-width="0.25"/>`; // furo do cordão (faca)
  const sb = logo('simbolo', 'digital-negativo', { w: 30 });
  b += logo('simbolo', 'digital-negativo', { w: 30, x: o + 27 - 15, y: o + topo / 2 - sb.h / 2 + 3 }).svg;
  b += line(o + 6, o + topo + 9, o + 14, o + topo + 9, C.rubrica, pt(0.75));
  b += t('Gabriel', { f: 'sans6', s: pt(14), x: o + 6, y: o + topo + 16, fill: C.anil });
  b += t('Alvares', { f: 'sans6', s: pt(14), x: o + 6, y: o + topo + 22, fill: C.anil });
  b += t('CONTADOR RESPONSÁVEL', { f: 'mono4', s: pt(9), x: o + 6, y: o + topo + 29, fill: C.pedra, tr: 0.02 });
  b += t(CRC, { f: 'mono4', s: pt(7), x: o + 6, y: o + topo + 33, fill: C.pedra });
  b += line(o + 6, o + 86 - 14, o + 48, o + 86 - 14, C.fumaca, pt(0.5));
  b += logo('wordmark', 'digital', { w: 19, x: o + 6, y: o + 86 - 10.5 }).svg;
  b += t('fireflies.com.br', { f: 'mono4', s: pt(6), x: o + 48, y: o + 86 - 6.6, fill: C.pedra, a: 'end' });
  L.save(DIR + 'cracha_54x86mm', { w: W, h: H, unit: 'mm', bleed: o, body: b, pdf: true, title: 'Fireflies Consultoria · crachá PVC 54×86 mm' });
}

// =====================================================================
// 5 · CERTIFICADO FIREFLIES ACADEMY · A4 paisagem (303×216)
// =====================================================================
{
  const o = B, W = 297 + 2 * o, H = 210 + 2 * o, cx = o + 297 / 2;
  let b = rect(0, 0, W, H, C.cal);
  // moldura-carta: neatline alternado, Anil, 3 mm, a 15 mm das bordas
  {
    const x0 = o + 15, y0 = o + 15, w = 297 - 30, h = 210 - 30, e = 3;
    b += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="none" stroke="${C.anil}" stroke-width="0.35"/>`;
    b += `<rect x="${x0 + e}" y="${y0 + e}" width="${w - 2 * e}" height="${h - 2 * e}" fill="none" stroke="${C.anil}" stroke-width="0.35"/>`;
    const seg = (len) => { const n = Math.round(len / 6); return len / n; };
    let d = '';
    const sx = seg(w - 2 * e), sy = seg(h - 2 * e);
    for (let i = 0, x = x0 + e; x < x0 + w - e - 0.01; x += sx, i++) if (i % 2 === 0) d += `M${x.toFixed(2)} ${y0}h${sx.toFixed(2)}v${e}h-${sx.toFixed(2)}zM${x.toFixed(2)} ${y0 + h - e}h${sx.toFixed(2)}v${e}h-${sx.toFixed(2)}z`;
    for (let i = 0, y = y0 + e; y < y0 + h - e - 0.01; y += sy, i++) if (i % 2 === 0) d += `M${x0} ${y.toFixed(2)}h${e}v${sy.toFixed(2)}h-${e}zM${x0 + w - e} ${y.toFixed(2)}h${e}v${sy.toFixed(2)}h-${e}z`;
    d += `M${x0} ${y0}h${e}v${e}h-${e}zM${x0 + w - e} ${y0}h${e}v${e}h-${e}zM${x0} ${y0 + h - e}h${e}v${e}h-${e}zM${x0 + w - e} ${y0 + h - e}h${e}v${e}h-${e}z`;
    b += `<path d="${d}" fill="${C.anil}"/>`;
  }
  b += emb('academy-sem-letras', { x: o + 297 - 30 - 30, y: o + 26, s: 30, c: C.anil, lit: C.anil, op: 0.4 });
  b += logo('academy-horizontal', 'chapado', { w: 60, x: cx - 30, y: o + 32 }).svg;
  b += t('CERTIFICADO', { f: 'sora7', s: pt(36), x: cx, y: o + 80, fill: C.anil, a: 'middle', tr: 0.08 });
  b += t('Certificamos que', { f: 'sans4', s: pt(12), x: cx, y: o + 92, fill: C.fuligem, a: 'middle' });
  b += t('MARIANA COSTA RIBEIRO', { f: 'sora6', s: pt(28), x: cx, y: o + 106, fill: C.anil, a: 'middle', tr: 0.03 });
  b += line(cx - 70, o + 110, cx + 70, o + 110, C.fumaca, pt(0.5));
  b += para('concluiu o curso **Contabilidade para Síndicos**, com carga horária de 12 horas,\nrealizado de 08/09/2026 a 29/09/2026, na modalidade online ao vivo.', { s: pt(12), lh: pt(18), w: 240, x: cx, y: o + 120, fill: C.fuligem, a: 'middle', bf: 'sans6', bfill: C.rubrica }).svg;
  // assinatura
  const sy = o + 168;
  b += line(o + 45, sy, o + 115, sy, C.fuligem, pt(0.5));
  b += t('Gabriel Alvares', { f: 'sans6', s: pt(10), x: o + 80, y: sy + 5, fill: C.anil, a: 'middle' });
  b += t('Instrutor e responsável técnico', { f: 'sans4', s: pt(9), x: o + 80, y: sy + 9.5, fill: C.fuligem, a: 'middle' });
  b += t(CRC, { f: 'mono4', s: pt(8), x: o + 80, y: sy + 13.5, fill: C.pedra, a: 'middle' });
  // Selo de Carta 40 mm com a Lanterna (a única luz: o logo é chapado, sem âmbar)
  b += orn('selo-graduado-texto', { x: cx - 20 + 8, y: sy - 26, w: 40, c: C.anil });
  b += circle(cx + 8, sy - 6, 2.6, C.ambar, ` stroke="${C.anil}" stroke-width="0.35"`);
  // verificação
  const qx = o + 297 - 45 - 18;
  b += qr('https://fireflies.com.br/academy/verificar?c=FA-2026-0147', { x: qx, y: sy - 16, s: 18, c: C.anil });
  b += t('FA-2026-0147', { f: 'mono5', s: pt(8), x: qx + 9, y: sy + 6, fill: C.pedra, a: 'middle', tr: 0.06 });
  b += t('Verifique em fireflies.com.br/academy', { f: 'mono4', s: pt(7), x: qx + 9, y: sy + 9.8, fill: C.pedra, a: 'middle' });
  b += t('São Paulo, 30/09/2026', { f: 'mono4', s: pt(8), x: qx + 9, y: sy + 13.5, fill: C.pedra, a: 'middle' });
  L.save(DIR + 'certificado-academy_A4-paisagem', { w: W, h: H, unit: 'mm', bleed: o, body: b, pdf: true, title: 'Fireflies Academy · certificado A4 paisagem' });
}
L.flush('papelaria');
