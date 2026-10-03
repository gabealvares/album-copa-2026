// Fireflies v2 · documentos A4 (mm) · manual 5.2 e 5.3
// Margens: sup 25 · inf 22 · esq 25 · dir 20. Cabeçalho a 12 mm do topo; rodapé a 10 mm da base.
const L = require('./lib');
const { C, pt, t, para, logo, icon, emb, orn, padrao, rect, line, exemplo, measure } = L;

const A4W = 210, A4H = 297, B = 3;
const ML = 25, MR = 20, MT = 25, MB = 22, TW = 165;
const DIR = 'documentos/';
const CNPJ = 'CNPJ 66.630.305/0001-95';
const CRC = 'CRC-SP 2SP053069';

// ---------- componentes ----------
function rodape(o, { ref = '', pag, total, sufixo = 'Confidencial' } = {}) {
  const x = o + ML, s = pt(7.5);
  let r = line(x, o + A4H - 18.6, x + 12, o + A4H - 18.6, C.rubrica, pt(0.75));
  r += t('Fireflies Consultoria LTDA · ' + CNPJ + ' · São Paulo/SP · fireflies.com.br', { f: 'mono4', s, x, y: o + A4H - 14, fill: C.pedra });
  r += t([CRC, 'Responsável técnico: Gabriel Alvares', ref, sufixo].filter(Boolean).join(' · '), { f: 'mono4', s, x, y: o + A4H - 10, fill: C.pedra });
  if (pag) r += t(`Página ${pag} de ${total}`, { f: 'mono4', s, x: o + A4W - MR, y: o + A4H - 14, fill: C.pedra, a: 'end' });
  return r;
}
function rodapeTimbrado(o) {
  const x = o + ML, s = pt(7.5);
  let r = line(x, o + A4H - 22.6, x + 12, o + A4H - 22.6, C.rubrica, pt(0.75));
  r += t('Fireflies Consultoria LTDA · ' + CNPJ + ' · ' + CRC + ' · São Paulo/SP', { f: 'mono4', s, x, y: o + A4H - 18, fill: C.pedra });
  r += t('WhatsApp +55 11 98245-0527 · contato@fireflies.com.br · fireflies.com.br', { f: 'mono4', s, x, y: o + A4H - 14, fill: C.pedra });
  r += t('Responsável técnico: Gabriel Alvares', { f: 'mono4', s, x, y: o + A4H - 10, fill: C.pedra });
  return r;
}
// cabeçalho da 1ª página interna: logo principal 40 mm; nas demais, símbolo 8 mm
function cabecalho(o, { tipo, dir1, dir2, primeira = true }) {
  let r = '';
  const y = o + 12;
  if (primeira) r += logo('horizontal', 'digital', { w: 40, x: o + ML, y }).svg;
  else {
    const sb = logo('simbolo', 'digital', { h: 8, x: o + ML, y });
    r += sb.svg + t(tipo, { f: 'mono4', s: pt(7.5), x: o + ML + sb.w + 3, y: y + 5.5, fill: C.pedra, tr: 0.08 });
  }
  r += t(dir1, { f: 'mono4', s: pt(7.5), x: o + A4W - MR, y: y + 4, fill: C.pedra, a: 'end', tr: 0.04 });
  r += t(dir2, { f: 'mono4', s: pt(7.5), x: o + A4W - MR, y: y + 8, fill: C.pedra, a: 'end', tr: 0.04 });
  const fy = y + (primeira ? 14.2 : 8) + 4;
  r += line(o + ML, fy, o + A4W - MR, fy, C.fumaca, pt(0.5));
  return { svg: r, y: fy };
}
// fluxo de texto
class Flow {
  constructor(o, y) { this.o = o; this.y = y; this.svg = ''; this.x = o + ML; }
  eyebrow(s) { this.svg += t(s.toUpperCase(), { f: 'mono5', s: pt(8), x: this.x, y: this.y, fill: C.rubrica, tr: 0.1 }); this.y += pt(8) + 3; return this; }
  titulo(s, size = 20) { const p = para(s, { f: 'sora7', s: pt(size), lh: pt(size * 1.2), w: TW, x: this.x, y: this.y + pt(size) * 0.75, fill: C.anil, tr: 0.02, bf: 'sora7', bfill: C.rubrica, btr: 0.02 }); this.svg += p.svg; this.y = p.y + pt(size) * 0.45 + 2; return this; }
  sub(s) { const p = para(s, { s: pt(12), lh: pt(16), w: TW, x: this.x, y: this.y + pt(12), fill: C.pedra }); this.svg += p.svg; this.y = p.y + pt(18); return this; }
  h1(s) { this.y += pt(14) + pt(9); this.svg += t(s.toUpperCase(), { f: 'sora6', s: pt(14), x: this.x, y: this.y, fill: C.anil, tr: 0.02 }); this.y += pt(10); return this; }
  h2(s) { this.y += pt(10); this.svg += t(s, { f: 'sans6', s: pt(12), x: this.x, y: this.y, fill: C.anil }); this.y += pt(8); return this; }
  p(s, { w = TW, x = this.x, size = 10, lh = 14.5, fill = C.fuligem } = {}) {
    const r = para(s, { s: pt(size), lh: pt(lh), w, x, y: this.y + pt(size) * 0.8, fill, bf: 'sans6', bfill: C.rubrica });
    this.svg += r.svg; this.y = r.y + pt(size) * 0.3 + pt(6); return this;
  }
  lista(itens) {
    itens.forEach(it => {
      this.svg += L.circle(this.x + 1.2, this.y + pt(10) * 0.8 - 1.15, 0.85, C.anil);
      const r = para(it, { s: pt(10), lh: pt(14.5), w: TW - 5, x: this.x + 5, y: this.y + pt(10) * 0.8, fill: C.fuligem, bf: 'sans6', bfill: C.rubrica });
      this.svg += r.svg; this.y = r.y + pt(10) * 0.3 + pt(3);
    });
    this.y += pt(3); return this;
  }
  gap(mm) { this.y += mm; return this; }
  add(s) { this.svg += s; return this; }
}
// tabela no padrão do manual
function tabela(x, y, cols, rows, { total, w = TW } = {}) {
  // cols: [{label, w, a:'start'|'end', mono}]
  const s = pt(9), rh = 7.2;
  let r = '', cx = x;
  const xs = cols.map(c => { const v = c.a === 'end' ? cx + c.w : cx; cx += c.w; return v; });
  cols.forEach((c, i) => { r += t(c.label, { f: 'mono5', s: pt(8), x: xs[i], y: y, fill: C.anil, tr: 0.08, a: c.a || 'start' }); });
  r += line(x, y + 2.2, x + w, y + 2.2, C.anil, pt(0.75));
  let yy = y + 2.2;
  rows.forEach(row => {
    row.forEach((v, i) => { r += t(v, { f: cols[i].mono ? 'mono4' : 'sans4', s, x: xs[i], y: yy + rh / 2 + 1.3, fill: C.fuligem, a: cols[i].a || 'start' }); });
    yy += rh; r += line(x, yy, x + w, yy, C.fumaca, pt(0.5));
  });
  if (total) {
    r += line(x, yy, x + w, yy, C.anil, pt(0.75));
    total.forEach((v, i) => { if (v) r += t(v, { f: cols[i].mono ? 'mono5' : 'sans6', s, x: xs[i], y: yy + rh / 2 + 1.3, fill: C.anil, a: cols[i].a || 'start' }); });
    yy += rh;
  }
  return { svg: r, y: yy };
}
function capaDados(x, y, pares, cor = C.fumaca, val = C.cal) {
  let r = '';
  pares.forEach(([k, v], i) => {
    r += t(k, { f: 'mono5', s: pt(7.5), x, y: y + i * 9, fill: cor, tr: 0.1 });
    r += t(v, { f: 'sans4', s: pt(10), x: x + 42, y: y + i * 9, fill: val });
  });
  return r;
}

// =====================================================================
// 1 · PAPEL TIMBRADO (gráfica, com sangria) + (escritório)
// =====================================================================
for (const versao of ['grafica', 'escritorio']) {
  const o = versao === 'grafica' ? B : 0;
  const W = A4W + 2 * o, H = A4H + 2 * o;
  let defs = '', b = '';
  if (versao === 'grafica') {
    const p = padrao('reticula-celeste-claro', { k: 5 / 60, lit: C.pedra, cor: { '#17183A': C.pedra } });
    defs += p.def;
    b += rect(0, 0, o + ML - 7, H, p.fill, ' opacity=".8"');
  }
  b += logo('horizontal', 'digital', { w: 45, x: o + ML, y: o + 15 }).svg;
  b += rodapeTimbrado(o);
  L.save(DIR + `papel-timbrado_${versao === 'grafica' ? 'A4-sangria3mm' : 'A4-escritorio'}`, {
    w: W, h: H, unit: 'mm', bleed: o, bg: C.branco, defs, body: b, pdf: true,
    title: `Fireflies Consultoria · papel timbrado A4 · ${versao === 'grafica' ? 'gráfica (offset, 3 mm de sangria)' : 'impressora de escritório'}`,
  });
}

// =====================================================================
// 2 · PROPOSTA COMERCIAL · capa + página interna (216×303, sangria 3 mm)
// =====================================================================
{
  const o = B, W = A4W + 2 * o, H = A4H + 2 * o;
  let b = rect(0, 0, W, H, C.anil);
  b += logo('horizontal', 'digital-negativo', { w: 60, x: o + ML, y: o + 25 }).svg;
  b += emb('condominios', { x: o + 112, y: o + 74, s: 82, c: C.cal, lit: C.cal, line: C.ceu });
  b += line(o + ML, o + 176, o + ML + 8, o + 176, C.vermelhao, pt(1));
  b += t('PROPOSTA COMERCIAL · PRO-2026-014', { f: 'mono5', s: pt(8), x: o + ML + 11, y: o + 177.2, fill: C.fumaca, tr: 0.1 });
  const tt = para('AUDITORIA CONTÁBIL E FINANCEIRA DO **CONDOMÍNIO**', { f: 'sora7', s: pt(32), lh: pt(36), w: 150, x: o + ML, y: o + 195, fill: C.cal, tr: 0.02, bf: 'sora7', bfill: C.vermelhao, btr: 0.02 });
  b += tt.svg;
  b += t('Condomínio Edifício Jacarandá', { f: 'sans5', s: pt(14), x: o + ML, y: tt.y + 14, fill: C.cal });
  b += capaDados(o + ML, tt.y + 30, [['EMISSÃO', '02/10/2026'], ['VALIDADE', '01/11/2026 (30 dias)'], ['RESPONSÁVEL', 'Gabriel Alvares, contador responsável']]);
  b += t('LUZ MEDIDA.', { f: 'sora6', s: pt(10), x: o + A4W - MR, y: o + A4H - 14, fill: C.cal, a: 'end', tr: 0.08 });
  b += t('fireflies.com.br', { f: 'mono4', s: pt(7.5), x: o + ML, y: o + A4H - 14, fill: C.fumaca });
  L.save(DIR + 'proposta-comercial_01-capa', { w: W, h: H, unit: 'mm', bleed: o, body: b, pdf: DIR + 'proposta-comercial_A4-sangria3mm', title: 'Fireflies Consultoria · proposta comercial · capa' });

  // página interna
  const cab = cabecalho(o, { tipo: 'PROPOSTA COMERCIAL', dir1: 'PROPOSTA COMERCIAL · PRO-2026-014', dir2: 'CONDOMÍNIO EDIFÍCIO JACARANDÁ' });
  const F = new Flow(o, o + 42);
  F.eyebrow('Proposta comercial nº PRO-2026-014').titulo('AUDITORIA CONTÁBIL E FINANCEIRA').sub('Precisão que ilumina decisões.');
  F.h1('1. Diagnóstico');
  F.p('Na reunião de 24/09/2026, o conselho relatou três dúvidas: o fundo de reserva caiu 18% em seis meses, o rateio de água não confere com as leituras individuais e as notas de manutenção chegam sem retenção de impostos. Nós propomos medir as contas de 01/2025 a 09/2026 e devolver ao conselho um mapa claro, com **cada achado numerado e uma solução**.');
  F.h1('2. Escopo');
  F.lista([
    'Conciliação bancária e dos fundos ordinário, de reserva e de obras.',
    'Conferência dos rateios e das leituras de água e gás.',
    'Revisão fiscal das notas de serviço: retenções de ISS, INSS e IR.',
    'Relatório para o conselho, com achados numerados, estado e recomendação.',
  ]);
  F.h1('3. 30 dias até a primeira luz');
  // trilha de 4 etapas
  {
    const x0 = o + ML + 2, x1 = o + A4W - MR - 2, yl = F.y + 4;
    const etapas = [['SEMANA 1', 'Levantamento', 'Documentos e acessos'], ['SEMANAS 2–3', 'Organização', 'Base conciliada'], ['SEMANA 4', 'Leitura', 'Achados e estados'], ['DIA 30', 'Primeira luz', 'Relatório em reunião']];
    const n = Math.round((x1 - x0) / 2.2);
    let d = '';
    F.add(`<path d="M${x0} ${yl}H${x1}" stroke="${C.anil}" stroke-width="0.7" stroke-linecap="round" stroke-dasharray="0 ${((x1 - x0) / n).toFixed(3)}" fill="none"/>`);
    etapas.forEach((e, i) => {
      const x = x0 + (x1 - x0) * i / 3;
      const r = i === 3 ? 2.1 : 1.2 + i * 0.25;
      F.add(L.circle(x, yl, r + 0.8, C.branco) + L.circle(x, yl, r, C.anil));
      const a = i === 0 ? 'start' : i === 3 ? 'end' : 'middle';
      F.add(t(e[0], { f: 'mono5', s: pt(7.5), x, y: yl + 7.5, fill: C.rubrica, a, tr: 0.08 }));
      F.add(t(e[1], { f: 'sans6', s: pt(10), x, y: yl + 12.5, fill: C.anil, a }));
      F.add(t(e[2], { f: 'sans4', s: pt(8.5), x, y: yl + 16.5, fill: C.pedra, a }));
    });
    F.y = yl + 22;
  }
  F.h1('4. Investimento');
  const tb = tabela(o + ML, F.y + 2, [{ label: 'ITEM', w: 105 }, { label: 'PRAZO', w: 28 }, { label: 'VALOR (R$)', w: 32, a: 'end', mono: true }], [
    ['Auditoria contábil e financeira, 01/2025–09/2026', '30 dias', '9.800,00'],
    ['Reunião de apresentação ao conselho (incluída)', 'dia 30', '0,00'],
    ['Acompanhamento mensal com painel (opcional, por mês)', 'mensal', '1.450,00'],
  ], { total: ['Total do escopo principal', '', '9.800,00'] });
  F.add(tb.svg); F.y = tb.y + 4;
  F.add(exemplo({ x: o + A4W - MR, y: F.y + 2, s: pt(6.5), a: 'end' }));
  F.p('Pagamento em duas parcelas: 50% no aceite e 50% na entrega do relatório.', { size: 8, lh: 11, fill: C.pedra, w: 120 });
  F.h1('5. Responsável');
  F.p('Gabriel Alvares, contador responsável. Ele conduz o trabalho, assina o relatório e apresenta os achados ao conselho em reunião.');
  L.save(DIR + 'proposta-comercial_02-interna', { w: W, h: H, unit: 'mm', bleed: o, bg: C.branco, body: cab.svg + F.svg + rodape(o, { ref: 'PRO-2026-014', pag: 2, total: 6 }), pdf: DIR + 'proposta-comercial_A4-sangria3mm', title: 'Fireflies Consultoria · proposta comercial · página interna' });
}

// =====================================================================
// 3 · RELATÓRIO DE AUDITORIA · capa (gráfica e escritório) + interna
// =====================================================================
{
  const o = B, W = A4W + 2 * o, H = A4H + 2 * o;
  const dados = [['PERÍODO', '01/2026–06/2026'], ['EMISSÃO', '10/10/2026'], ['REFERÊNCIA', 'AUD-2026-031'], ['RESP. TÉCNICO', 'Gabriel Alvares']];
  let b = rect(0, 0, W, H, C.anil);
  b += logo('condominios-horizontal', 'digital-negativo', { w: 60, x: o + ML, y: o + 25 }).svg;
  b += orn('selo-graduado-texto', { x: o + 128, y: o + 70, w: 58, c: C.ceu });
  b += line(o + ML, o + 176, o + ML + 8, o + 176, C.vermelhao, pt(1));
  b += t('RELATÓRIO DE AUDITORIA', { f: 'mono5', s: pt(8), x: o + ML + 11, y: o + 177.2, fill: C.fumaca, tr: 0.1 });
  const tt = para('CONDOMÍNIO EDIFÍCIO **JACARANDÁ**', { f: 'sora7', s: pt(32), lh: pt(36), w: 150, x: o + ML, y: o + 195, fill: C.cal, tr: 0.02, bf: 'sora7', bfill: C.vermelhao, btr: 0.02 });
  b += tt.svg;
  b += t('Prestação de contas do 1º semestre de 2026', { f: 'sans5', s: pt(14), x: o + ML, y: tt.y + 14, fill: C.cal });
  b += capaDados(o + ML, tt.y + 30, dados);
  b += t('LUZ MEDIDA.', { f: 'sora6', s: pt(10), x: o + A4W - MR, y: o + A4H - 14, fill: C.cal, a: 'end', tr: 0.08 });
  b += t('Confidencial · uso do conselho', { f: 'mono4', s: pt(7.5), x: o + ML, y: o + A4H - 14, fill: C.fumaca });
  L.save(DIR + 'relatorio-auditoria_01-capa', { w: W, h: H, unit: 'mm', bleed: o, body: b, pdf: DIR + 'relatorio-auditoria_A4-sangria3mm', title: 'Fireflies Condomínios · relatório de auditoria · capa' });

  // capa escritório: Branco com faixa Anil de 60 mm (sem sangria)
  {
    let e = rect(0, 0, A4W, 60, C.anil);
    e += logo('condominios-horizontal', 'digital-negativo', { w: 60, x: ML, y: 18 }).svg;
    e += t('RELATÓRIO DE AUDITORIA', { f: 'mono5', s: pt(8), x: A4W - MR, y: 30, fill: C.fumaca, tr: 0.1, a: 'end' });
    e += t('AUD-2026-031', { f: 'mono4', s: pt(8), x: A4W - MR, y: 35, fill: C.fumaca, tr: 0.1, a: 'end' });
    e += line(ML, 112, ML + 8, 112, C.rubrica, pt(1));
    const t2 = para('CONDOMÍNIO EDIFÍCIO **JACARANDÁ**', { f: 'sora7', s: pt(32), lh: pt(36), w: 150, x: ML, y: 130, fill: C.anil, tr: 0.02, bf: 'sora7', bfill: C.rubrica, btr: 0.02 });
    e += t2.svg;
    e += t('Prestação de contas do 1º semestre de 2026', { f: 'sans5', s: pt(14), x: ML, y: t2.y + 14, fill: C.fuligem });
    e += capaDados(ML, t2.y + 30, dados, C.pedra, C.fuligem);
    e += rodape(0, { ref: 'AUD-2026-031' });
    L.save(DIR + 'relatorio-auditoria_01-capa-escritorio', { w: A4W, h: A4H, unit: 'mm', bg: C.branco, body: e, pdf: true, title: 'Fireflies Condomínios · relatório de auditoria · capa para impressora de escritório' });
  }

  // página interna: resumo para o conselho
  const cab = cabecalho(o, { tipo: 'RELATÓRIO DE AUDITORIA', dir1: 'RELATÓRIO DE AUDITORIA · AUD-2026-031', dir2: 'COND. ED. JACARANDÁ · 01/2026–06/2026' });
  const F = new Flow(o, o + 42);
  F.eyebrow('Resumo para o conselho').titulo('TRÊS PONTOS PEDEM **AÇÃO**');
  F.gap(2).p('As contas do semestre fecham: receitas e despesas conferem com os extratos e o saldo final bate com o banco. Três pontos, porém, pedem decisão do conselho antes da assembleia de dezembro. Cada achado tem número, estado e recomendação; o detalhe está nas seções 2 a 5.');
  // KPIs
  {
    const ky = F.y + 2, kw = (TW - 8) / 3;
    const kpis = [['RECEITAS DO SEMESTRE', 'R$', '1.284.600'], ['DESPESAS DO SEMESTRE', 'R$', '1.231.950'], ['INADIMPLÊNCIA EM 06/2026', '', '7,2%']];
    kpis.forEach(([k, u, v], i) => {
      const x = o + ML + i * (kw + 4);
      F.add(rect(x, ky, kw, 22, C.cal));
      F.add(t(k, { f: 'mono5', s: pt(7), x: x + 4, y: ky + 6.5, fill: C.pedra, tr: 0.08 }));
      let vx = x + 4;
      if (u) { F.add(t(u, { f: 'mono5', s: pt(8), x: vx, y: ky + 17, fill: C.anil })); vx += 6; }
      if (v.endsWith('%')) {
        F.add(t(v.slice(0, -1), { f: 'sora7', s: pt(20), x: vx, y: ky + 17, fill: C.rubrica }));
        F.add(t('%', { f: 'mono5', s: pt(8), x: vx + measure(v.slice(0, -1), 'sora7', pt(20)) + 0.8, y: ky + 17, fill: C.rubrica }));
      } else F.add(t(v, { f: 'sora7', s: pt(20), x: vx, y: ky + 17, fill: C.anil }));
    });
    F.y = ky + 22 + 3;
    F.add(exemplo({ x: o + A4W - MR, y: F.y + 3, s: pt(6.5), a: 'end' }));
    F.y += 4;
  }
  F.h1('Achados');
  const ach = [
    ['A-01', 'Crítico', C.erro, 'alerta', 'Fundo de reserva usado para despesa ordinária', 'Em fev. e abr., R$ 38.900,00 saíram da reserva para pagar manutenção comum, sem aprovação em assembleia. Recomendação: recompor em 6 parcelas e aprovar a regra de uso.'],
    ['A-02', 'Atenção', C.alerta, 'alerta', 'Rateio de água sem conferência das leituras', 'As leituras individuais não são conferidas antes do rateio; 11 unidades têm consumo zerado há 3 meses. Recomendação: conferência mensal com foto do hidrômetro.'],
    ['A-03', 'Atenção', C.alerta, 'alerta', 'Notas de manutenção sem retenção de ISS', 'Nove notas somam R$ 4.215,60 de ISS não retido. Recomendação: reter a partir da próxima nota (ver Parecer Técnico nº 007/2026).'],
    ['A-04', 'Em dia', C.sucesso, 'check', 'Conciliação bancária de janeiro a junho', 'Todos os lançamentos têm origem, documento e responsável. Nenhuma ação necessária.'],
  ];
  ach.forEach(([n, est, cor, ic, tit, desc]) => {
    const y = F.y + 2;
    F.add(t(n, { f: 'mono5', s: pt(9), x: o + ML, y: y + 3.5, fill: C.anil }));
    F.add(icon(ic, { x: o + ML + 13, y: y + 0.2, s: 4.2, c: cor }));
    F.add(t(est, { f: 'sans6', s: pt(8.5), x: o + ML + 18.5, y: y + 3.4, fill: cor }));
    F.add(t(tit, { f: 'sans6', s: pt(10.5), x: o + ML + 38, y: y + 3.5, fill: C.anil }));
    const r = para(desc, { s: pt(9.5), lh: pt(13), w: TW - 38, x: o + ML + 38, y: y + 9, fill: C.fuligem });
    F.add(r.svg);
    F.y = r.y + 4;
    F.add(line(o + ML, F.y, o + A4W - MR, F.y, C.fumaca, pt(0.5)));
  });
  F.gap(4).p('**Próximo passo:** apresentar este resumo em reunião do conselho e registrar as decisões em ata. Nós acompanhamos a execução no painel mensal.', { size: 10 });
  L.save(DIR + 'relatorio-auditoria_02-interna', { w: W, h: H, unit: 'mm', bleed: o, bg: C.branco, body: cab.svg + F.svg + rodape(o, { ref: 'AUD-2026-031', pag: 3, total: 18 }), pdf: DIR + 'relatorio-auditoria_A4-sangria3mm', title: 'Fireflies Condomínios · relatório de auditoria · resumo para o conselho' });
}

// =====================================================================
// 4 · PARECER / NOTA TÉCNICA (A4 escritório, sem capa, sem grafismo)
// =====================================================================
{
  let b = logo('horizontal', 'digital', { w: 40, x: ML, y: 15 }).svg;
  b += t('PARECER TÉCNICO', { f: 'mono4', s: pt(7.5), x: A4W - MR, y: 19, fill: C.pedra, a: 'end', tr: 0.04 });
  b += t('Nº 007/2026 · 02/10/2026', { f: 'mono4', s: pt(7.5), x: A4W - MR, y: 23, fill: C.pedra, a: 'end', tr: 0.04 });
  b += line(ML, 33.5, A4W - MR, 33.5, C.fumaca, pt(0.5));
  const F = new Flow(0, 44);
  F.eyebrow('Parecer técnico nº 007/2026').titulo('RETENÇÃO DE ISS NOS SERVIÇOS DE MANUTENÇÃO', 18);
  // metadados
  [['DESTINATÁRIO', 'Conselho fiscal do Condomínio Edifício Jacarandá'], ['DATA', '02/10/2026'], ['REFERÊNCIA', 'Relatório AUD-2026-031, achado A-03']].forEach(([k, v]) => {
    F.add(t(k, { f: 'mono5', s: pt(7.5), x: ML, y: F.y + 3, fill: C.pedra, tr: 0.08 }));
    F.add(t(v, { f: 'sans4', s: pt(10), x: ML + 32, y: F.y + 3, fill: C.fuligem }));
    F.y += 5.6;
  });
  F.gap(4);
  // ementa
  {
    const ey = F.y;
    const txt = 'Serviços de manutenção predial tomados pelo condomínio. Responsabilidade do condomínio edilício pela retenção do ISS no Município de São Paulo. Procedimento para as próximas notas e para as notas de 01/2026 a 06/2026.';
    const r = para(txt, { s: pt(10), lh: pt(14.5), w: TW - 14, x: ML + 8, y: ey + 11, fill: C.fuligem });
    const hh = r.y - ey + 6;
    F.add(rect(ML, ey, TW, hh, C.cal) + rect(ML, ey, pt(3), hh, C.anil));
    F.add(t('EMENTA', { f: 'mono5', s: pt(7.5), x: ML + 8, y: ey + 5.5, fill: C.anil, tr: 0.1 }));
    F.add(r.svg);
    F.y = ey + hh + 2;
  }
  F.h1('1. Consulta');
  F.p('O conselho fiscal pergunta se o condomínio deveria ter retido o ISS das notas de manutenção de elevadores e de bombas emitidas entre janeiro e junho de 2026, e o que fazer com as notas já pagas sem retenção.');
  F.h1('2. Análise');
  F.p('A legislação do Município de São Paulo atribui ao condomínio edilício, quando toma determinados serviços, a responsabilidade pela retenção e pelo recolhimento do ISS. Entre esses serviços estão os de conservação e manutenção. O enquadramento depende do código do serviço em cada nota e do cadastro do prestador.');
  F.p('Das 14 notas do período, 9 se enquadram na hipótese de retenção e somam R$ 4.215,60 de ISS não retido. Nas outras 5, o serviço não se enquadra na hipótese de retenção, e não há ajuste a fazer. (Dados de exemplo.)');
  F.h1('3. Conclusão');
  {
    const cy = F.y;
    const r = para('Recomendamos (i) reter o ISS a partir da próxima nota, com a guia emitida pela administradora; (ii) pedir aos prestadores o comprovante de recolhimento das 9 notas de 01/2026 a 06/2026; e (iii) registrar o tema em ata na próxima reunião do conselho. **Se o recolhimento não for comprovado em 30 dias, recomendamos que o condomínio, como responsável, regularize o imposto e cobre o valor do prestador.**', { s: pt(10), lh: pt(14.5), w: TW - 8, x: ML + 6, y: cy + pt(10) * 0.8, fill: C.fuligem, bf: 'sans6', bfill: C.anil });
    F.add(rect(ML, cy - 1.5, pt(3), r.y - cy + 4, C.rubrica) + r.svg);
    F.y = r.y + 6;
  }
  F.p('É o parecer.', { size: 10 });
  // assinatura
  const sy = 246;
  b += line(ML, sy, ML + 70, sy, C.fuligem, pt(0.5));
  b += t('Gabriel Alvares', { f: 'sans6', s: pt(10), x: ML, y: sy + 5, fill: C.anil });
  b += t('Contador responsável', { f: 'mono4', s: pt(8), x: ML, y: sy + 9.5, fill: C.pedra });
  b += t('São Paulo, 2 de outubro de 2026', { f: 'sans4', s: pt(10), x: A4W - MR, y: sy + 5, fill: C.fuligem, a: 'end' });
  b += rodape(0, { ref: 'PT-007/2026', pag: 1, total: 1, sufixo: 'Modelo' });
  L.save(DIR + 'parecer-tecnico_A4', { w: A4W, h: A4H, unit: 'mm', bg: C.branco, body: b + F.svg, pdf: true, title: 'Fireflies Consultoria · parecer técnico / nota técnica (modelo)' });
}
L.flush('documentos');
