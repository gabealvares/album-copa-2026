// Fireflies v2 · redes sociais (px) · manual 5.6
// Post 1080×1350: texto a 80 px das bordas; símbolo 48 px no canto inferior direito ou handle em Mono.
// Uma luz por card: se o card tem o Símbolo (âmbar), o destaque do texto é Vermelhão (escuro) / Rubrica (claro).
const L = require('./lib');
const { C, t, para, logo, icon, emb, padrao, rect, line, circle, exemplo, measure } = L;
const DIR = 'redes/';
const HANDLE = '@firefliesconsultoria';

function eyebrow(x, y, s, escuro) {
  const cor = escuro ? C.vermelhao : C.rubrica;
  return line(x, y - 7, x + 40, y - 7, cor, 3) + t(s.toUpperCase(), { f: 'mono5', s: 22, x: x + 56, y, fill: escuro ? C.fumaca : C.rubrica, tr: 0.12 });
}
function base(W, H, escuro, { simbolo = true, num, M = 80 } = {}) {
  let s = t(HANDLE, { f: 'mono4', s: 22, x: M, y: H - M + 6, fill: escuro ? C.fumaca : C.pedra, tr: 0.04 });
  if (simbolo) {
    const sb = logo('simbolo', escuro ? 'digital-negativo' : 'digital', { h: 48 });
    s += logo('simbolo', escuro ? 'digital-negativo' : 'digital', { h: 48, x: W - M - sb.w, y: H - M - 34 }).svg;
  }
  if (num) s += t(num, { f: 'mono5', s: 22, x: W - M, y: H - M + 6, fill: escuro ? C.fumaca : C.pedra, a: 'end', tr: 0.1 });
  return s;
}
const titulo = (s, o) => para(s, { f: 'sora7', lh: o.s * 1.08, fill: o.escuro ? C.cal : C.anil, tr: 0.02, bf: 'sora7', bfill: o.escuro ? C.vermelhao : C.rubrica, btr: 0.02, ...o });
const corpo = (s, o) => para(s, { f: 'sans4', s: 34, lh: 46, fill: o.escuro ? C.fumaca : C.fuligem, bf: 'sans6', bfill: o.escuro ? C.cal : C.rubrica, ...o });

const IG = { w: 1080, h: 1350 };
// 1 · MANIFESTO (Anil) ------------------------------------------------------
{
  const p = padrao('constelacao-continua-escuro', { lit: C.ceu, k: 1 });
  let b = rect(0, 0, 1080, 560, p.fill, ' opacity=".5"');
  b += eyebrow(80, 680, 'Manifesto', true);
  const tt = titulo('NADA TRABALHA **SOZINHO.**', { s: 92, w: 920, x: 80, y: 800, escuro: true });
  b += tt.svg;
  b += corpo('Sozinho, o vaga-lume pisca fora de ritmo. Em bando, entra em fase. Os números do seu condomínio são assim: a gente mede, nomeia e coloca cada ponto no lugar.', { w: 900, x: 80, y: tt.y + 90, escuro: true }).svg;
  b += base(1080, 1350, true);
  L.save(DIR + 'instagram_01-manifesto', { ...IG, bg: C.anil, body: b, defs: p.def, title: 'Instagram · post manifesto' });
}
// 2 · POST DE DADO (Cal) ------------------------------------------------------
{
  let b = eyebrow(80, 128, 'Inadimplência', false);
  const tt = titulo('3 UNIDADES CONCENTRAM **70%** DA DÍVIDA', { s: 68, w: 920, x: 80, y: 230 });
  b += tt.svg;
  // matriz de pontos 10×10: cada ponto = 1% da dívida
  const gx = 80, gy = tt.y + 90, step = 46;
  for (let i = 0; i < 100; i++) {
    const r = Math.floor(i / 10), c = i % 10;
    const on = i < 70;
    b += circle(gx + 14 + c * step, gy + 14 + r * step, on ? 13 : 9, on ? C.rubrica : C.ceu);
  }
  const lx = gx + 10 * step + 40;
  b += t('70%', { f: 'sora7', s: 64, x: lx, y: gy + 60, fill: C.rubrica });
  b += para('da dívida está em **3 unidades**', { s: 28, lh: 36, w: 1000 - lx, x: lx, y: gy + 104, fill: C.fuligem }).svg;
  b += line(lx, gy + 210, 1000, gy + 210, C.fumaca, 2);
  b += t('30%', { f: 'sora7', s: 44, x: lx, y: gy + 380, fill: C.anil });
  b += para('nas outras 17 unidades em atraso', { s: 28, lh: 36, w: 1000 - lx, x: lx, y: gy + 420, fill: C.pedra }).svg;
  b += t('CADA PONTO = 1% DO VALOR EM ATRASO', { f: 'mono4', s: 18, x: gx, y: gy + 10 * step + 30, fill: C.pedra, tr: 0.08 });
  b += corpo('Cobrança geral não resolve. Conversa com quem deve, sim.', { w: 920, x: 80, y: gy + 10 * step + 100 }).svg;
  b += exemplo({ x: 1000, y: 128, s: 18, a: 'end' });
  b += base(1080, 1350, false);
  L.save(DIR + 'instagram_02-dado', { ...IG, bg: C.cal, body: b, title: 'Instagram · post de dado' });
}
// 3 · DICA PARA SÍNDICO (Anil) ----------------------------------------------
{
  let b = eyebrow(80, 128, 'Dica para síndico', true);
  b += icon('fundo-reserva', { x: 80, y: 300, s: 240, c: C.cal });
  const tt = titulo('FUNDO DE RESERVA\nNÃO É **CAIXA\nDO MÊS.**', { s: 84, w: 920, x: 80, y: 760, escuro: true });
  b += tt.svg;
  b += corpo('Usar a reserva para pagar despesa comum precisa de aprovação em assembleia. Se faltou caixa, revise o orçamento antes de mexer no fundo.', { w: 900, x: 80, y: tt.y + 100, escuro: true }).svg;
  b += base(1080, 1350, true);
  L.save(DIR + 'instagram_03-dica-sindico', { ...IG, bg: C.anil, body: b, title: 'Instagram · dica para síndico' });
}
// 4 · CARROSSEL (capa Anil + 2 internas Cal) ---------------------------------
{
  let b = logo('horizontal', 'digital-negativo', { w: 280, x: 80, y: 80 }).svg;
  b += emb('condominios-sem-letras', { x: 640, y: 300, s: 340, c: C.cal, lit: C.cal, line: C.ceu });
  b += eyebrow(80, 790, 'Para síndicos e conselheiros', true);
  const tt = titulo('COMO LER A PRESTAÇÃO DE **CONTAS**', { s: 88, w: 920, x: 80, y: 910, escuro: true });
  b += tt.svg;
  b += corpo('Em 5 minutos, antes da assembleia.', { w: 900, x: 80, y: tt.y + 84, escuro: true }).svg;
  b += t('ARRASTE →', { f: 'mono5', s: 22, x: 80, y: 1350 - 80 + 6, fill: C.cal, tr: 0.12 });
  b += t('01 / 08', { f: 'mono5', s: 22, x: 1000, y: 1350 - 80 + 6, fill: C.fumaca, a: 'end', tr: 0.1 });
  L.save(DIR + 'carrossel_01-capa', { ...IG, bg: C.anil, body: b, title: 'Carrossel · capa' });

  const internas = [
    ['02 / 08', 'balancete', '1', 'COMECE PELO **SALDO**', 'Saldo inicial + receitas − despesas = saldo final. Se o resultado não bate com o extrato do banco, pergunte por quê antes de qualquer outra coisa.'],
    ['03 / 08', 'orcamento', '2', 'COMPARE COM O **ORÇAMENTO**', 'Cada linha de despesa tem um valor previsto. Diferença acima de 10% merece explicação por escrito da administradora.'],
  ];
  internas.forEach(([n, ic, k, tit, txt], i) => {
    let c = t(k, { f: 'sora7', s: 200, x: 80, y: 360, fill: C.anil });
    c += icon(ic, { x: 1000 - 160, y: 190, s: 160, c: C.anil, lit: C.ambar, edge: C.anil });
    c += line(80, 450, 1000, 450, C.fumaca, 2);
    const tt = titulo(tit, { s: 64, w: 920, x: 80, y: 570 });
    c += tt.svg;
    c += corpo(txt, { w: 900, x: 80, y: tt.y + 90 }).svg;
    c += t(HANDLE, { f: 'mono4', s: 22, x: 80, y: 1350 - 80 + 6, fill: C.pedra, tr: 0.04 });
    c += t(n, { f: 'mono5', s: 22, x: 1000, y: 1350 - 80 + 6, fill: C.pedra, a: 'end', tr: 0.1 });
    L.save(DIR + `carrossel_0${i + 2}-interna`, { ...IG, bg: C.cal, body: c, title: `Carrossel · interna ${n}` });
  });
}
// 5 · STORY 1080×1920 (seguro: 250 topo, 340 base, 64 laterais) ----------------
{
  const W = 1080, H = 1920, M = 64;
  const sb = logo('simbolo', 'digital-negativo', { h: 56 });
  let b = logo('simbolo', 'digital-negativo', { h: 56, x: M, y: 250 }).svg;
  b += t(HANDLE, { f: 'mono4', s: 24, x: W - M, y: 290, fill: C.fumaca, a: 'end', tr: 0.04 });
  b += L.orn('trilha-photinus', { x: 360, y: 430, w: 660, c: C.ceu, lit: C.cal });
  b += eyebrow(M, 980, 'Para síndicos', true);
  const tt = titulo('DIAGNÓSTICO **GRATUITO**', { s: 88, w: 950, x: M, y: 1100, escuro: true });
  b += tt.svg;
  b += para('Em 30 dias, o primeiro painel do seu condomínio, explicado em reunião.', { s: 40, lh: 54, w: 900, x: M, y: tt.y + 90, fill: C.fumaca }).svg;
  b += `<rect x="${M}" y="1450" width="${W - 2 * M}" height="104" rx="52" fill="none" stroke="${C.cal}" stroke-width="2"/>`;
  b += t('WHATSAPP +55 11 98245-0527', { f: 'mono5', s: 30, x: W / 2, y: 1512, fill: C.cal, a: 'middle', tr: 0.08 });
  L.save(DIR + 'story_1080x1920', { w: W, h: H, bg: C.anil, body: b, title: 'Story · diagnóstico gratuito' });
}
// 6 · LINKEDIN 1200×1200 (Cal) e 1200×627 (Anil) ------------------------------
{
  let b = eyebrow(90, 140, 'Como a gente trabalha', false);
  b += icon('painel-mensal', { x: 90, y: 230, s: 180, c: C.anil });
  const tt = titulo('PAINEL MENSAL, EXPLICADO EM **REUNIÃO.**', { s: 76, w: 1000, x: 90, y: 560 });
  b += tt.svg;
  b += corpo('Todo mês, em dois minutos, você sabe o que mudou, o que preocupa e o que já está resolvido. E sabe quem assina e explica.', { w: 960, x: 90, y: tt.y + 100 }).svg;
  b += base(1200, 1200, false, { M: 90 });
  L.save(DIR + 'linkedin-post_1200x1200', { w: 1200, h: 1200, bg: C.cal, body: b, title: 'LinkedIn · post quadrado' });

  let c = eyebrow(70, 110, 'Fireflies Consultoria', true);
  const t2 = titulo('UM CONTADOR\nRESPONSÁVEL,\n**QUE ASSINA.**', { s: 64, w: 760, x: 70, y: 230, escuro: true });
  c += t2.svg;
  c += para('Contabilidade, fiscal, financeiro e auditoria em fase, com uma pessoa que responde do início ao fim.', { s: 28, lh: 38, w: 720, x: 70, y: t2.y + 80, fill: C.fumaca }).svg;
  c += icon('responsavel', { x: 900, y: 150, s: 220, c: C.cal });
  c += t(HANDLE, { f: 'mono4', s: 20, x: 70, y: 627 - 50, fill: C.fumaca, tr: 0.04 });
  const sb = logo('simbolo', 'digital-negativo', { h: 44 });
  c += logo('simbolo', 'digital-negativo', { h: 44, x: 1200 - 70 - sb.w, y: 627 - 50 - 32 }).svg;
  L.save(DIR + 'linkedin-post_1200x627', { w: 1200, h: 627, bg: C.anil, body: c, title: 'LinkedIn · post paisagem' });
}
L.flush('redes');
