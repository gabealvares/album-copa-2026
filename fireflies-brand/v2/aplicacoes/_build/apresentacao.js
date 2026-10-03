// Fireflies v2 · apresentação 16:9 (1920×1080) · 8 slides-mestre
// Manual 5.1: margens 96/80/72, 12 colunas, gutter 24; rodapé nos 48 px de baixo.
const L = require('./lib');
const { C, t, para, logo, icon, emb, padrao, rect, line, circle, exemplo } = L;

const W = 1920, H = 1080, M = 96, TOP = 80, BOT = 72, TOT = 8;
const col = i => M + (i - 1) * 146;
const span = n => n * 122 + (n - 1) * 24;
const DIR = 'apresentacao/';

function eyebrow(x, y, txt, { cor = C.rubrica, txtCor } = {}) {
  return line(x, y - 5, x + 40, y - 5, cor, 2) + t(txt.toUpperCase(), { f: 'mono5', s: 15, x: x + 56, y, fill: txtCor || cor, tr: 0.12 });
}
function rodape(n, { escuro = false, simbolo = true, titulo = 'AUDITORIA DAS CONTAS 2026' } = {}) {
  const cor = escuro ? C.fumaca : C.pedra;
  const y = H - 30;
  let s = t(`FIREFLIES CONSULTORIA · ${titulo}`, { f: 'mono4', s: 12, x: M, y, fill: cor, tr: 0.08 });
  let xr = W - M;
  if (simbolo) {
    const sb = logo('simbolo', escuro ? 'digital-negativo' : 'digital', { h: 44, x: 0, y: 0 });
    const sb2 = logo('simbolo', escuro ? 'digital-negativo' : 'digital', { h: 44, x: W - M - sb.w, y: y - 26 });
    s += sb2.svg; xr = W - M - sb.w - 24;
  }
  s += t(`${String(n).padStart(2, '0')} / ${String(TOT).padStart(2, '0')}`, { f: 'mono4', s: 12, x: xr, y, fill: cor, a: 'end', tr: 0.08 });
  return s;
}
const slides = [];
const add = (nome, titulo, bg, body, defs = '') => slides.push({ nome, titulo, bg, body, defs });

// 1 · CAPA ESCURA ----------------------------------------------------------
{
  let b = eyebrow(M, TOP + 15, 'Apresentação ao conselho · Auditoria de condomínios', { cor: C.vermelhao, txtCor: C.fumaca });
  b += emb('condominios', { x: col(9) + 60, y: 170, s: 460, c: C.cal, lit: C.cal, line: C.ceu });
  const tt = para('AUDITORIA DAS CONTAS **2026**', { f: 'sora7', s: 72, lh: 78, w: span(8), x: M, y: 590, fill: C.cal, tr: 0.02, bf: 'sora7', bfill: C.vermelhao, btr: 0.02 });
  b += tt.svg;
  b += t('Resultado do 1º semestre, apresentado ao conselho fiscal.', { f: 'sans4', s: 28, x: M, y: tt.y + 64, fill: C.fumaca });
  b += t('CONDOMÍNIO EDIFÍCIO JACARANDÁ · 14/10/2026', { f: 'mono4', s: 15, x: M, y: tt.y + 116, fill: C.fumaca, tr: 0.12 });
  const lg = logo('horizontal', 'digital-negativo', { w: 360, x: M, y: 0 });
  b += logo('horizontal', 'digital-negativo', { w: 360, x: M, y: H - BOT - lg.h }).svg;
  b += t('LUZ MEDIDA.', { f: 'sora6', s: 24, x: W - M, y: H - BOT - 8, fill: C.cal, a: 'end', tr: 0.08 });
  add('slide-01-capa-escura', 'Capa escura', C.anil, b);
}
// 2 · CAPA CLARA ------------------------------------------------------------
{
  const p = padrao('reticula-celeste-claro', { lit: C.anil });
  let b = rect(col(9), 0, W - col(9), H, p.fill, ' opacity=".55"');
  b += rect(col(9) - 1, 0, 1, H, C.fumaca);
  b += eyebrow(M, TOP + 15, 'Proposta · Consultoria contábil para empresas');
  const tt = para('CONTABILIDADE QUE **VOCÊ LÊ**', { f: 'sora7', s: 72, lh: 78, w: span(7), x: M, y: 560, fill: C.anil, tr: 0.02, bf: 'sora7', bfill: C.rubrica, btr: 0.02 });
  b += tt.svg;
  b += para('Todo mês, em dois minutos, você sabe o que mudou, o que preocupa e o que já está resolvido.', { f: 'sans4', s: 28, lh: 38, w: span(6), x: M, y: tt.y + 64, fill: C.fuligem }).svg;
  b += t('PREPARADO PARA ORLA ARQUITETURA LTDA · 02/10/2026', { f: 'mono4', s: 15, x: M, y: tt.y + 170, fill: C.pedra, tr: 0.12 });
  const lg = logo('horizontal', 'digital', { w: 360 });
  b += logo('horizontal', 'digital', { w: 360, x: M, y: H - BOT - lg.h }).svg;
  b += t('LUZ MEDIDA.', { f: 'sora6', s: 24, x: col(9) - 48, y: H - BOT - 8, fill: C.anil, a: 'end', tr: 0.08 });
  add('slide-02-capa-clara', 'Capa clara', C.cal, b, p.def);
}
// 3 · DIVISOR ---------------------------------------------------------------
{
  let b = t('02 / 05', { f: 'mono5', s: 28, x: M, y: 430, fill: C.vermelhao, tr: 0.08 });
  b += line(M, 462, M + 64, 462, C.ceu, 1.5);
  b += t('COMO MEDIMOS', { f: 'sora7', s: 58, x: M, y: 560, fill: C.cal, tr: 0.03 });
  b += para('Quatro frentes conciliadas todo mês, com um responsável que assina.', { f: 'sans4', s: 28, lh: 38, w: span(7), x: M, y: 630, fill: C.fumaca }).svg;
  b += emb('auditoria', { x: col(8) + 120, y: 230, s: 520, c: C.cal, lit: C.ambar, line: C.ceu });
  add('slide-03-divisor', 'Divisor de seção', C.anil, b);
}
// 4 · CONTEÚDO TEXTO + ÍCONES ----------------------------------------------
{
  let b = eyebrow(M, TOP + 15, 'O que a auditoria cobre');
  b += t('QUATRO FRENTES, UM RESPONSÁVEL', { f: 'sora6', s: 38, x: M, y: TOP + 84, fill: C.anil, tr: 0.04 });
  let p = para('Sozinhas, contabilidade, fiscal, financeiro e auditoria funcionam cada uma no seu ritmo. É aí que aparecem o imposto em dobro, o rateio que não fecha e a inadimplência que ninguém viu.', { s: 24, lh: 34, w: span(6), x: M, y: 318, fill: C.fuligem });
  b += p.svg;
  b += para('A Fireflies Consultoria concilia as quatro frentes todo mês e entrega **um painel explicado em reunião**, assinado pelo contador responsável.', { s: 24, lh: 34, w: span(6), x: M, y: p.y + 70, fill: C.fuligem }).svg;
  const itens = [
    ['conciliacao', 'Conciliação bancária', 'Cada lançamento com origem, posição e responsável.'],
    ['rateio', 'Rateio e fundo de reserva', 'Conferimos se a taxa paga o que deveria pagar.'],
    ['prestacao-contas', 'Relatório para o conselho', 'Achados numerados, com estado e solução.'],
  ];
  const x0 = col(8) + 24;
  itens.forEach(([ic, tit, desc], i) => {
    const y = 300 + i * 190;
    if (i) b += line(x0, y - 40, W - M, y - 40, C.fumaca, 1);
    b += icon(ic, { x: x0, y: y - 6, s: 64, c: C.anil });
    b += t(tit, { f: 'sans6', s: 26, x: x0 + 100, y: y + 18, fill: C.anil });
    b += para(desc, { s: 22, lh: 30, w: W - M - x0 - 100, x: x0 + 100, y: y + 56, fill: C.pedra }).svg;
  });
  b += rodape(4);
  add('slide-04-conteudo', 'Conteúdo texto + ícones', C.branco, b);
}
// 5 · DADOS -----------------------------------------------------------------
{
  let b = eyebrow(M, TOP + 15, 'Inadimplência · 01/2026–09/2026');
  b += para('INADIMPLÊNCIA CAIU PARA **6,1%**', { f: 'sora6', s: 38, x: M, y: TOP + 84, w: 1500, fill: C.anil, tr: 0.04, bf: 'sora6', bfill: C.rubrica, btr: 0.04 }).svg;
  // KPI
  b += t('6,1', { f: 'sora7', s: 128, x: M - 6, y: 420, fill: C.rubrica });
  b += t('%', { f: 'mono5', s: 51, x: M + L.measure('6,1', 'sora7', 128) + 4, y: 420, fill: C.rubrica });
  b += t('em setembro; era 9,4% em janeiro', { f: 'sans5', s: 22, x: M, y: 466, fill: C.fuligem });
  b += para('Três unidades concentravam 70% da dívida. Com acordo e cobrança mensal, duas voltaram a pagar em dia.', { s: 24, lh: 34, w: span(4) - 10, x: M, y: 560, fill: C.fuligem }).svg;
  b += exemplo({ x: M, y: 860, s: 14, c: C.pedra });
  // gráfico
  const gx = col(5) + 60, gw = W - M - gx, gy = 280, gh = 560, max = 10;
  const pm = padrao('matriz-pontos-claro', { lit: C.anil });
  b += rect(gx, gy, gw, gh, pm.fill, ' opacity=".35"');
  for (let v = 0; v <= max; v += 2) {
    const y = gy + gh - (v / max) * gh;
    b += line(gx, y, gx + gw, y, C.fumaca, v === 0 ? 1.5 : 1);
    b += t(v.toString().replace('.', ',') + '%', { f: 'mono4', s: 15, x: gx - 14, y: y + 5, fill: C.pedra, a: 'end' });
  }
  const m25 = [7.6, 7.9, 8.0, 8.3, 8.5, 8.7, 8.9, 9.0, 9.2];
  const m26 = [9.4, 9.1, 8.8, 8.3, 7.9, 7.2, 6.8, 6.5, 6.1];
  const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET'];
  const cw = gw / 9, bw = cw * 0.22;
  meses.forEach((m, i) => {
    const cx = gx + cw * i + cw / 2;
    const h25 = m25[i] / max * gh, h26 = m26[i] / max * gh;
    b += rect(cx - bw - 3, gy + gh - h25, bw, h25, C.ceu);
    const last = i === 8;
    b += rect(cx + 3, gy + gh - h26, bw, h26, last ? C.ambar : C.anil, last ? ` stroke="${C.anil}" stroke-width="2"` : '');
    b += t(m, { f: 'mono4', s: 15, x: cx, y: gy + gh + 30, fill: C.pedra, a: 'middle', tr: 0.06 });
  });
  // rótulos diretos
  const cxl = gx + cw * 8 + cw / 2;
  b += t('6,1%', { f: 'mono5', s: 19, x: cxl + 3 + bw / 2, y: gy + gh - 6.1 / max * gh - 14, fill: C.anil, a: 'middle' });
  b += t('2025', { f: 'mono5', s: 15, x: gx + cw / 2 - 3 - bw / 2, y: gy + gh - 7.6 / max * gh - 12, fill: C.pedra, a: 'middle' });
  b += t('2026', { f: 'mono5', s: 15, x: gx + cw / 2 + 3 + bw / 2, y: gy + gh - 9.4 / max * gh - 12, fill: C.anil, a: 'middle' });
  b += t('Fonte: balancetes mensais do condomínio, 01/2025–09/2026. Percentual da receita prevista em atraso há mais de 30 dias.', { f: 'mono4', s: 12, x: gx, y: gy + gh + 70, fill: C.pedra });
  b += rodape(5, { simbolo: false });
  add('slide-05-dados', 'Dados / gráfico', C.branco, b, pm.def);
}
// 6 · CITAÇÃO ---------------------------------------------------------------
{
  let b = line(col(2), 330, col(2) + 64, 330, C.rubrica, 3);
  const q = para('“Os números de um condomínio são muitos pontos, cada um piscando sozinho. A gente mede, nomeia e coloca cada ponto no lugar.”', { f: 'sansi', s: 46, lh: 62, w: span(9), x: col(2), y: 430, fill: C.anil });
  b += q.svg;
  b += t('GABRIEL ALVARES · CONTADOR RESPONSÁVEL, FIREFLIES CONSULTORIA', { f: 'mono5', s: 15, x: col(2), y: q.y + 90, fill: C.pedra, tr: 0.12 });
  b += rodape(6);
  add('slide-06-citacao', 'Citação', C.cal, b);
}
// 7 · TABELA ----------------------------------------------------------------
{
  let b = eyebrow(M, TOP + 15, 'Achados · relatório parcial 01/2026–06/2026');
  b += para('TRÊS ACHADOS PEDEM **AÇÃO**', { f: 'sora6', s: 38, x: M, y: TOP + 84, w: 1500, fill: C.anil, tr: 0.04, bf: 'sora6', bfill: C.rubrica, btr: 0.04 }).svg;
  const x = { n: M, ach: M + 130, val: col(10) + 40, est: col(11) + 30 };
  const y0 = 300, rh = 92;
  const hd = (s, xx, a = 'start') => t(s, { f: 'mono5', s: 15, x: xx, y: y0, fill: C.anil, tr: 0.12, a });
  b += hd('Nº', x.n) + hd('ACHADO', x.ach) + hd('VALOR (R$)', x.val, 'end') + hd('ESTADO', x.est);
  b += line(M, y0 + 20, W - M, y0 + 20, C.anil, 1.5);
  const rows = [
    ['A-01', 'Fundo de reserva usado para pagar despesa ordinária (fev. e abr.)', '38.900,00', 'Crítico', C.erro, 'alerta'],
    ['A-02', 'Rateio de água sem conferência das leituras individuais', '12.480,00', 'Atenção', C.alerta, 'alerta'],
    ['A-03', 'Notas de manutenção sem retenção de ISS', '4.215,60', 'Atenção', C.alerta, 'alerta'],
    ['A-04', 'Conciliação bancária de janeiro a junho', '0,00', 'Em dia', C.sucesso, 'check'],
  ];
  rows.forEach((r, i) => {
    const yb = y0 + 20 + rh * i + rh / 2 + 8;
    b += t(r[0], { f: 'mono5', s: 22, x: x.n, y: yb, fill: C.anil });
    b += t(r[1], { f: 'sans4', s: 24, x: x.ach, y: yb, fill: C.fuligem });
    b += t(r[2], { f: 'mono4', s: 24, x: x.val, y: yb, fill: C.fuligem, a: 'end' });
    b += icon(r[5], { x: x.est, y: yb - 23, s: 30, c: r[4] });
    b += t(r[3], { f: 'sans6', s: 22, x: x.est + 44, y: yb, fill: r[4] });
    b += line(M, y0 + 20 + rh * (i + 1), W - M, y0 + 20 + rh * (i + 1), C.fumaca, 1);
  });
  const yt = y0 + 20 + rh * 4;
  b += line(M, yt, W - M, yt, C.anil, 1.5);
  b += t('Total apontado', { f: 'sans6', s: 24, x: x.ach, y: yt + 52, fill: C.anil });
  b += t('55.595,60', { f: 'mono5', s: 24, x: x.val, y: yt + 52, fill: C.anil, a: 'end' });
  b += t('Fonte: extratos bancários, notas fiscais e livro-caixa, 01/2026–06/2026.', { f: 'mono4', s: 12, x: M, y: yt + 120, fill: C.pedra });
  b += exemplo({ x: W - M, y: yt + 120, s: 14, a: 'end' });
  b += rodape(7);
  add('slide-07-tabela', 'Tabela', C.branco, b);
}
// 8 · ENCERRAMENTO ----------------------------------------------------------
{
  let b = eyebrow(M, TOP + 15, 'Próximo passo', { cor: C.vermelhao, txtCor: C.fumaca });
  const tt = para('30 DIAS ATÉ A\n**PRIMEIRA LUZ.**', { f: 'sora7', s: 72, lh: 80, w: span(7), x: M, y: 330, fill: C.cal, tr: 0.02, bf: 'sora7', bfill: C.vermelhao, btr: 0.02 });
  b += tt.svg;
  b += para('Diagnóstico gratuito. Em 30 dias, o primeiro painel do condomínio, explicado em reunião e assinado pelo contador responsável.', { s: 28, lh: 40, w: span(6), x: M, y: tt.y + 80, fill: C.fumaca }).svg;
  const xc = col(9);
  [['WHATSAPP', '+55 11 98245-0527'], ['E-MAIL', 'contato@fireflies.com.br'], ['SITE', 'fireflies.com.br']].forEach(([k, v], i) => {
    const y = 300 + i * 120;
    b += t(k, { f: 'mono5', s: 15, x: xc, y, fill: C.fumaca, tr: 0.12 });
    b += t(v, { f: 'sans5', s: 32, x: xc, y: y + 46, fill: C.cal });
  });
  b += line(xc, 650, W - M, 650, C.ceu, 1);
  b += t('GABRIEL ALVARES', { f: 'mono5', s: 15, x: xc, y: 690, fill: C.cal, tr: 0.12 });
  b += t('CONTADOR RESPONSÁVEL', { f: 'mono4', s: 15, x: xc, y: 718, fill: C.fumaca, tr: 0.08 });
  const lg = logo('horizontal', 'digital-negativo', { w: 360 });
  b += logo('horizontal', 'digital-negativo', { w: 360, x: M, y: H - BOT - lg.h }).svg;
  add('slide-08-encerramento', 'Encerramento / contato', C.anil, b);
}

slides.forEach(s => L.save(DIR + s.nome, { w: W, h: H, title: `Fireflies Consultoria · apresentação · ${s.titulo}`, body: s.body, defs: s.defs, bg: s.bg, pdf: DIR + 'fireflies-apresentacao-template' }));
L.flush('apresentacao');
