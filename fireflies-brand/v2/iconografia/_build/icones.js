// Fireflies v2 · camada 1 · ícones de linha
// Grid 24 · área viva 20 (2–22) · traço 1,5 · pontas e cantos redondos · currentColor
// DNA: estrela nos nós importantes · no máx. 1 lanterna (class="lit") · no máx. 1 traço pontilhado
// Uso: node icones.js            -> gera svg/, sprite.svg e prancha.png
//      node icones.js --inspecao -> também gera _build/review/inspecao-icones.png (96 px com grade)
const fs = require('fs');
const path = require('path');
const { ROOT, COR, f, arcPts, gapFor, fontFaceCSS, shot } = require('./lib');

const OUT = path.join(ROOT, 'icones');

// ---------- primitivas ----------
const STAR = 1.25, POINT = 0.8, LIT = 2.1;
const st = (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="${STAR}" fill="currentColor" stroke="none"/>`;
const pt = (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="${POINT}" fill="currentColor" stroke="none"/>`;
const lit = (x, y, r = LIT) => `<circle class="lit" cx="${f(x)}" cy="${f(y)}" r="${f(r)}" style="fill:var(--ff-lit, currentColor);stroke:var(--ff-lit-edge, none)" stroke-width=".75"/>`;
const p = d => `<path d="${d}"/>`;
const c = (x, y, r) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/>`;
const rr = (x, y, w, h, r = 1.5) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(r)}"/>`;
// traço de constelação: pontos redondos (dash 0) com passo ajustado ao comprimento
const dot = (d, len) => `<path d="${d}" stroke-dasharray="0 ${len ? gapFor(len) : 3}"/>`;
const dotL = (x1, y1, x2, y2) => { const L = Math.hypot(x2 - x1, y2 - y1), k = (L + .02) / L; return dot(`M${f(x1)} ${f(y1)} ${f(x1 + (x2 - x1) * k)} ${f(y1 + (y2 - y1) * k)}`, L); };
const dotArc = (cx, cy, r, a0, a1) => { const a = arcPts(cx, cy, r, a0, a1); return dot(a.d, a.len); };
const arc = (cx, cy, r, a0, a1) => p(arcPts(cx, cy, r, a0, a1).d);
const dotCircle = (cx, cy, r) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" stroke-dasharray="0 ${gapFor(2 * Math.PI * r)}"/>`;
// ponta de seta no fim de um arco (sentido horário)
function arrowArc(cx, cy, r, a0, a1, head = 3) {
  const A = arcPts(cx, cy, r, a0, a1);
  const [ex, ey] = A.p1;
  const t = ((a1 + 90) * Math.PI) / 180; // tangente horária
  const w = (35 * Math.PI) / 180;
  const h1 = [ex - head * Math.cos(t - w), ey - head * Math.sin(t - w)];
  const h2 = [ex - head * Math.cos(t + w), ey - head * Math.sin(t + w)];
  return p(`${A.d}M${f(h1[0])} ${f(h1[1])} ${f(ex)} ${f(ey)} ${f(h2[0])} ${f(h2[1])}`);
}

// ---------- desenhos ----------
const I = {};
const G = []; // [grupo, [nomes]]
function group(nome, defs) { G.push([nome, Object.keys(defs)]); Object.assign(I, defs); }

group('Serviços', {
  'auditoria': [c(10.5, 10.5, 6.75), p('M15.5 15.5 20.5 20.5'), lit(10.5, 10.5)],
  'contabil': [p('M3.5 6.5h17M12 6.5V20.5'), p('M5.5 11h4M5.5 15h4M14.5 11h4'), st(12, 6.5), lit(16.5, 15.75)],
  'fiscal': [p('M12 6.6V20.5M8.5 20.5h7M5 8.5h14'), p('M5 8.5 3 13.5M5 8.5l2 5M19 8.5l-2 5M19 8.5l2 5'),
    p('M2.75 13.5h4.5a2.25 2.25 0 0 1-4.5 0zM16.75 13.5h4.5a2.25 2.25 0 0 1-4.5 0z'), lit(12, 4.5, 1.9)],
  'financeira': [p('M4 17 9 11.5l4.5 3 4.6-6.2'), dotL(4, 20.5, 20, 20.5), st(4, 17), st(9, 11.5), st(13.5, 14.5), lit(19.5, 6.5)],
  'processos': [rr(3.5, 3.5, 6, 6), p('M9.5 6.5H17v8.5'), dot('M6.5 9.5v7.75h7.5', 15.25), st(17, 6.5), lit(17, 17.25)],
  'sindicancia': [p('M3.5 12Q12 2.5 20.5 12'), dot('M3.5 12Q12 21.5 20.5 12', 19.6), c(12, 12, 3.25), st(3.5, 12), st(20.5, 12), lit(12, 12, 1.6)],
  'condominios': [p('M2.5 20.5h19'), p('M5 20.5V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15.5'), p('M13 9.5h5a1 1 0 0 1 1 1v10'),
    pt(7.5, 7.5), pt(10.5, 7.5), pt(7.5, 11), pt(10.5, 11), pt(7.5, 14.5), pt(10.5, 14.5), lit(16, 13.25, 1.75)],
  'academy': [p('M12 8C10 6.5 7 6 3.5 6.5V19c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V6.5C17 6 14 6.5 12 8z'), p('M12 8v12.5'), lit(12, 3.9, 1.75)],
});

group('Contabilidade e finanças', {
  'balancete': [rr(4, 3, 16, 18), p('M4 7.5h16M7.5 11h9M7.5 14h9M7.5 17.5h5'), st(16.5, 17.5)],
  'dre': [rr(3.5, 4, 3, 16.5, 1), rr(8.25, 4, 3, 4.5, 1), rr(13, 8.5, 3, 5, 1), rr(17.75, 13.5, 3, 7, 1), dot('M6.5 4h1.75M11.25 8.5H13M16 13.5h1.75', 1.75)],
  'conciliacao': [p('M7 3.5H4v17h3M17 3.5h3v17h-3M8 7.5h8M8 12h8'), dotL(8, 16.5, 16, 16.5), pt(8, 7.5), pt(16, 7.5), pt(8, 12), pt(16, 12), st(8, 16.5), st(16, 16.5)],
  'nota-fiscal': [p('M5.5 3h13v18l-2.17-1.5-2.17 1.5-2.16-1.5-2.17 1.5-2.17-1.5L5.5 21z'), p('M8.5 7.5h7M8.5 11h7'), dotL(8.5, 14.5, 14.5, 14.5)],
  'guia-imposto': [rr(2.5, 5.5, 19, 13), dotL(7.5, 7.5, 7.5, 16.5), p('M11.5 15.5 17.5 8.5'), st(12, 9.5), st(17, 14.5)],
  'folha': [c(8.5, 8, 2.75), p('M3.5 18a5 5 0 0 1 10 0'), c(17.75, 15.75, 3.25), st(17.75, 15.75)],
  'fluxo-caixa': [p('M3 12h18'), p('M7 12V4.5M4.75 6.75 7 4.5l2.25 2.25M17 12V7M14.75 9.25 17 7l2.25 2.25M9.75 17.25 12 19.5l2.25-2.25'), dotL(12, 12, 12, 19.5)],
  'orcamento': [p('M3 20.5h18M10 20.5V9M18 20.5V12'), dot('M6.5 17.5V5M14.5 17.5V8', 3), st(10, 9), st(18, 12)],
  'rateio': [c(12, 12, 8.5), p('M12 12V3.5M12 12l7.36 4.25M12 12l-5.46 6.51'), st(12, 12), lit(15.9, 8.9, 1.75)],
  'inadimplencia': [arc(12, 12, 8.5, 90, 270), dotArc(12, 12, 8.5, -90, 90), p('M12 7.5v5'), st(12, 16)],
  'fundo-reserva': [p('M6 4.5h12M7 4.5v2.25C5.5 7.75 4.5 9.25 4.5 11.25v7.25a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7.25c0-2-1-3.5-2.5-4.5V4.5'), dotL(7, 11.5, 17, 11.5), lit(12, 16, 2.1)],
  'conferencia': [rr(4.5, 3, 15, 18), p('M8 11.5l2.75 2.75L16 8.5'), dotL(8, 17.5, 16, 17.5), st(10.75, 14.25)],
  'parecer': [p('M13 21H6.5A1.5 1.5 0 0 1 5 19.5v-15A1.5 1.5 0 0 1 6.5 3h10A1.5 1.5 0 0 1 18 4.5v7'), p('M8.5 7.5h6M8.5 11h4'), c(17, 16.75, 3.75), lit(17, 16.75, 1.75)],
  'livro-razao': [p('M5 19V4a1.5 1.5 0 0 1 1.5-1.5H19V18H6.75a1.75 1.75 0 0 0 0 3.5H19'), p('M9 7.5h7M12.5 7.5v6'), st(12.5, 7.5)],
  'carimbo': [c(12, 5.5, 2.75), p('M10.6 8 10 12.5M13.4 8l.6 4.5'), rr(4, 12.5, 16, 4, 1), dotL(5.5, 20.5, 18.5, 20.5)],
  'assinatura': [p('M3.5 15.5c1.5-3 3.5-8 5.5-8 1.5 0 .5 7-.5 9.5 1.5-2.5 3.5-5.5 4.75-5.5 1 0 .25 3.5 1.25 3.5s2.5-2 4-3'), dotL(3.5, 19.75, 20.5, 19.75), st(18.5, 12)],
  'prazo': [arc(12, 12.5, 8.5, -90, 180), dotArc(12, 12.5, 8.5, 180, 270), p('M12 8v4.5h3.5'), lit(12, 4, 1.9)],
  'cofre': [rr(3.5, 4, 17, 15), p('M7 19v1.5M17 19v1.5M17 9.5v4'), c(11, 11.5, 3.5), st(11, 11.5)],
  'investimento': [c(8.5, 15.5, 5), st(8.5, 15.5), dotL(13, 11, 19, 5), p('M15.5 4.5H20V9')],
  'custo': [p('M3.5 12.6V5A1.5 1.5 0 0 1 5 3.5h7.6l8.4 8.4a1.5 1.5 0 0 1 0 2.1l-7 7a1.5 1.5 0 0 1-2.1 0z'), st(8, 8)],
});

group('Condomínio', {
  'predio': [p('M2.5 20.5h19'), p('M6.5 20.5V6.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v14M12 5.5V3.5'), p('M10.5 20.5v-4h3v4'),
    pt(9.5, 9), pt(14.5, 9), pt(9.5, 12.5), pt(14.5, 12.5), st(12, 3.25)],
  'assembleia': [rr(4, 12.5, 16, 8), p('M8.5 12.5V4.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v8M10.25 8l1.25 1.25 2.5-2.5'), dotL(8, 16.5, 16, 16.5)],
  'sindico': [c(12, 7.5, 3.75), p('M5 20.5a7 7 0 0 1 14 0'), st(12, 17.5)],
  'portaria': [p('M2.5 20.5h19M4.5 20.5V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15.5'), rr(17, 8.5, 3.5, 6.5, 1), dotL(9.5, 7.5, 9.5, 17.5), st(12, 12.5)],
  'manutencao': [p('M19.36 7.46A4 4 0 1 1 16.54 4.64L16.35 7.65Z'), p('M12.67 11.33 5.5 18.5'), st(5.25, 18.75)],
  'agua': [p('M12 3.5c3.25 4.25 6 7.5 6 10.75a6 6 0 0 1-12 0C6 11 8.75 7.75 12 3.5z'), p('M9 14.5a3 3 0 0 0 3 3')],
  'energia': [p('M14.5 3 7.5 12.5l9-1L9.5 21'), st(7.5, 12.5), st(16.5, 11.5)],
  'gas': [p('M12 3c.5 3 5.5 5.5 5.5 10a5.5 5.5 0 0 1-11 0c0-2.5 1.25-4.25 2.5-5.25.25 2 1 3 2 3.5C10.25 8.5 11.25 5.5 12 3z'), dotL(7.5, 21.25, 16.5, 21.25), lit(12, 14.25, 1.9)],
  'elevador': [rr(4.5, 2.5, 15, 18.5), p('M4.5 9h15M12 9v12'), lit(12, 5.75, 1.75)],
  'prestacao-contas': [p('M9 4.5H6.5A1.5 1.5 0 0 0 5 6v13.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H15'), rr(9, 3, 6, 3, 1),
    p('M11.25 10.5h4.5M11.25 14h4.5'), dotL(11.25, 17.5, 15.75, 17.5), st(8.75, 10.5), st(8.75, 14), pt(8.75, 17.5)],
});

group('Processos e tecnologia', {
  'painel-mensal': [rr(3, 4, 18, 12.5), p('M12 16.5V20M8.5 20h7'), dot('M6.5 13 9.5 10l3 2 2.9-3.1', 11.3), lit(17, 8, 1.75)],
  'fluxograma': [rr(8.5, 2.5, 7, 4.5, 1), p('M12 7v2M12 9l3.5 3.5L12 16l-3.5-3.5zM12 16v1.6'), dot('M15.5 12.5h4V4.75h-4', 15.75), lit(12, 19.5, 1.85)],
  'checklist': [p('M3.5 6.5l1.75 1.75L8.5 5M11.5 6.75h9M3.5 12.5l1.75 1.75L8.5 11M11.5 12.75h9'), dotL(11.5, 18.5, 20.5, 18.5), st(6, 18.5)],
  'planilha': [rr(3, 4, 18, 16), p('M3 9h18M9 4v16'), dotL(9, 14.5, 21, 14.5), st(15, 11.75)],
  'banco-de-dados': [`<ellipse cx="12" cy="6" rx="7" ry="2.75"/>`, p('M5 6v12c0 1.5 3.13 2.75 7 2.75S19 19.5 19 18V6'), dot('M5 12c0 1.5 3.13 2.75 7 2.75S19 13.5 19 12', 15)],
  'sincronia': [c(9, 12, 5.5), c(15, 12, 5.5), st(12, 7.39), st(12, 16.61), lit(12, 12, 1.6)],
  'api': [p('M8 6.5 2.5 12 8 17.5M16 6.5l5.5 5.5-5.5 5.5'), dotL(13.5, 5.5, 10.5, 18.5)],
  'automacao': [arrowArc(12, 12, 7.5, -160, -20), arrowArc(12, 12, 7.5, 20, 160), lit(12, 12)],
  'seguranca': [p('M12 3l7 2.75v5.5c0 4.5-2.9 7.9-7 9.75-4.1-1.85-7-5.25-7-9.75v-5.5z'), dotL(12, 13.5, 12, 17.5), lit(12, 10.25)],
  'indicador': [arc(12, 16, 8.5, 180, 360), dotArc(12, 16, 5, 180, 360), p('M12 16l4-4.5'), st(12, 16)],
});

group('Pessoas e comunicação', {
  'responsavel': [p('M5 20.5a7 7 0 0 1 14 0'), lit(12, 7.75, 3)],
  'equipe': [c(12, 7.5, 2.75), p('M7 19.5a5 5 0 0 1 10 0M2.5 18a3.25 3.25 0 0 1 4.25-3.1M21.5 18a3.25 3.25 0 0 0-4.25-3.1'), st(5, 10.75), st(19, 10.75)],
  'reuniao': [p('M2.5 15.5h19M5 15.5v5M19 15.5v5M3.75 15.5a3.75 3.75 0 0 1 7.5 0M12.75 15.5a3.75 3.75 0 0 1 7.5 0'), c(7.5, 7.5, 2.25), c(16.5, 7.5, 2.25), dotL(10.25, 7.5, 13.75, 7.5)],
  'conversa': [p('M4.5 4.5h15A1.5 1.5 0 0 1 21 6v9a1.5 1.5 0 0 1-1.5 1.5H11L6.5 20v-3.5h-2A1.5 1.5 0 0 1 3 15V6a1.5 1.5 0 0 1 1.5-1.5z'), p('M7 9h10'), dotL(7, 12.25, 13, 12.25)],
  'email': [rr(3, 5, 18, 14), p('M3.75 6.25 12 12.5l8.25-6.25'), st(12, 12.5)],
  'telefone': [rr(6.5, 2.5, 11, 19, 2), p('M10.5 5.5h3'), st(12, 18)],
  'endereco': [p('M12 21.5s-7-6.25-7-11.5a7 7 0 0 1 14 0c0 5.25-7 11.5-7 11.5z'), lit(12, 10, 2.25)],
  'apresentacao': [rr(3, 3.5, 18, 12), p('M12 15.5V18M8 21l4-3 4 3'), dot('M6.5 12 10 9l3 1.75 3.1-2.2', 12), st(17.5, 7.5)],
  'atendimento': [p('M4.75 13v-1a7.25 7.25 0 0 1 14.5 0v1'), rr(3, 13, 3.5, 5.5, 1.25), rr(17.5, 13, 3.5, 5.5, 1.25), p('M19.25 18.5c0 1.5-1.5 2.25-3 2.25H14'), st(12.75, 20.75)],
  'credencial': [rr(3, 5.5, 18, 13), c(8.5, 10.5, 2), p('M5.5 16a3 3 0 0 1 6 0M14 10h4'), dotL(14, 13.5, 18, 13.5)],
});

group('Academy', {
  'aula': [rr(3, 3.5, 18, 11.5), p('M7.5 15 6 20.5M16.5 15l1.5 5.5'), p('M6.5 7.5h6.5'), dotL(6.5, 11, 11, 11), lit(16.5, 9.25, 2)],
  'certificado': [p('M11.5 17H4.5A1.5 1.5 0 0 1 3 15.5v-10A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5V10'), p('M6.5 8h11M6.5 11.5h4.5'),
    c(16.5, 14.25, 3.25), st(16.5, 14.25), p('M14.75 17.25v4l1.75-1.25 1.75 1.25v-4')],
  'trilha': [dot('M5 3.5C5 12 7 19.5 12 19.5', 17.5), p('M12 19.5c4.5 0 6.25-4.5 6.25-8.5'), st(5, 3.5), lit(18.25, 8.1)],
  'video-aula': [rr(3, 4, 18, 12.5), p('M10.5 7.75v5l4.25-2.5z'), p('M3 20h5'), dotL(11.5, 20, 21, 20), st(8.75, 20)],
  'apostila': [rr(6.5, 3, 13, 18), dotL(4, 5.5, 4, 18.5), p('M10 8h6M10 11.5h4')],
  'turma': [p('M8 12.5a4 4 0 0 1 8 0'), p('M2.75 21a2.25 2.25 0 0 1 4.5 0M9.75 21a2.25 2.25 0 0 1 4.5 0M16.75 21a2.25 2.25 0 0 1 4.5 0'), st(5, 16.25), st(12, 16.25), st(19, 16.25), lit(12, 5.5, 2.25)],
});

group('Interface', {
  'seta-direita': [dotL(3.5, 12, 6.5, 12), p('M9.5 12h10.5M15 7l5 5-5 5')],
  'seta-esquerda': [dotL(20.5, 12, 17.5, 12), p('M14.5 12H4M9 7l-5 5 5 5')],
  'seta-cima': [dotL(12, 20.5, 12, 17.5), p('M12 14.5V4M7 9l5-5 5 5')],
  'seta-baixo': [dotL(12, 3.5, 12, 6.5), p('M12 9.5V20M7 15l5 5 5-5')],
  'check': [p('M4.5 12.5l5 5 10-11')],
  'fechar': [p('M6 6l12 12M18 6 6 18')],
  'mais': [p('M12 5v14M5 12h14')],
  'menos': [p('M5 12h14')],
  'busca': [c(10.5, 10.5, 6.75), p('M15.5 15.5 20.5 20.5')],
  'menu': [p('M4 6.5h16M4 12h16M4 17.5h16')],
  'download': [p('M12 3.5v11M7.5 10.5 12 15l4.5-4.5'), dotL(4, 20, 20, 20)],
  'link': [p('M10 7.5H7.5a4.5 4.5 0 0 0 0 9H10M14 7.5h2.5a4.5 4.5 0 0 1 0 9H14M8.5 12h7')],
  'info': [c(12, 12, 9), p('M12 11v5.5'), st(12, 7.75)],
  'alerta': [p('M10.7 4.25a1.5 1.5 0 0 1 2.6 0l8 14a1.5 1.5 0 0 1-1.3 2.25H4a1.5 1.5 0 0 1-1.3-2.25z'), p('M12 9.5v4.5'), st(12, 17)],
  'calendario': [rr(3.5, 5, 17, 15.5), p('M3.5 9.5h17M8 3v3.5M16 3v3.5'), pt(8, 13), pt(12, 13), pt(16, 13), pt(8, 16.75), pt(12, 16.75), lit(16, 16.75, 1.75)],
});

// ---------- validação de regras ----------
const problems = [];
for (const [n, parts] of Object.entries(I)) {
  const s = parts.join('');
  const lits = (s.match(/class="lit"/g) || []).length;
  const dots = (s.match(/stroke-dasharray/g) || []).length;
  if (lits > 1) problems.push(`${n}: ${lits} lanternas`);
  if (dots > 1) problems.push(`${n}: ${dots} pontilhados`);
}

const head = `xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`;
const svgOf = n => `<svg ${head} width="24" height="24">\n  ${I[n].join('\n  ')}\n</svg>\n`;

function write() {
  fs.rmSync(path.join(OUT, 'svg'), { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, 'svg'), { recursive: true });
  for (const n of Object.keys(I)) fs.writeFileSync(path.join(OUT, 'svg', `${n}.svg`), svgOf(n));
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${Object.keys(I).map(n =>
    `  <symbol id="ff-${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\n    ${I[n].join('\n    ')}\n  </symbol>`).join('\n')}\n</svg>\n`;
  fs.writeFileSync(path.join(OUT, 'sprite.svg'), sprite);
  fs.writeFileSync(path.join(__dirname, 'icones.json'), JSON.stringify(G, null, 1));
  return sprite;
}

// ---------- prancha ----------
const ico = (n, s) => `<svg class="i" width="${s}" height="${s}"><use href="#ff-${n}"/></svg>`;
function section(theme) {
  const light = theme === 'claro';
  return `<section class="t ${theme}">
  <header><h2>${light ? 'Sobre Cal Virgem' : 'Sobre Anil de Junho'}</h2>
  <span class="meta">${light ? 'traço Anil #17183A · lanterna Âmbar #F2B544 com contorno Anil' : 'traço Cal #EDEEEA · lanterna Âmbar #F2B544 pura'}</span></header>
  ${G.map(([g, list]) => `<h3><span>${g}</span><i>${String(list.length).padStart(2, '0')}</i></h3><div class="grid">${list.map(n => `
    <figure><div class="big">${ico(n, 48)}</div><div class="sm">${ico(n, 24)}${ico(n, 20)}</div><figcaption>${n}</figcaption></figure>`).join('')}</div>`).join('')}
  <h3><span>Teste de leitura · 20 px e 16 px</span></h3>
  <div class="row">${Object.keys(I).map(n => ico(n, 20)).join('')}</div>
  <div class="row r16">${Object.keys(I).map(n => ico(n, 16)).join('')}</div>
</section>`;
}

function pranchaHTML(sprite, inspect) {
  const total = Object.keys(I).length;
  const gridBg = `<svg width="96" height="96" viewBox="0 0 24 24" style="position:absolute;inset:0">
  ${Array.from({ length: 25 }, (_, i) => `<path d="M${i} 0V24M0 ${i}H24" stroke="#c9ccd6" stroke-width="${i % 2 ? .02 : .05}"/>`).join('')}
  <rect x="2" y="2" width="20" height="20" fill="none" stroke="${COR.vermelhao}" stroke-width=".06"/>
  <circle cx="12" cy="12" r="10" fill="none" stroke="${COR.ceu}" stroke-width=".05"/></svg>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaceCSS()}
*{box-sizing:border-box;margin:0}
body{background:${COR.cal};font-family:'IBM Plex Mono',monospace;width:1500px;color:${COR.anil}}
.top{padding:56px 56px 20px;display:grid;grid-template-columns:1fr auto;align-items:end;gap:24px;border-bottom:1px solid ${COR.anil}}
.top h1{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:64px;line-height:.9;letter-spacing:-.01em}
.top h1 em{font-style:italic;font-weight:400}
.top p{font-size:12px;letter-spacing:.08em;text-transform:uppercase;line-height:1.7;text-align:right}
.rules{display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:0 56px;border-bottom:1px solid ${COR.anil}}
.rules div{padding:16px 16px 18px 0;font-family:'IBM Plex Sans';font-size:13px;line-height:1.45;display:flex;gap:14px;align-items:flex-start}
.rules div+div{padding-left:16px;border-left:1px solid #c9ccd6}
.rules svg{flex:none}
.rules b{display:block;font-family:'IBM Plex Mono';font-weight:500;font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px}
.t{padding:36px 56px 48px}
.claro{background:${COR.cal};color:${COR.anil};--ff-lit:${COR.ambar};--ff-lit-edge:${COR.anil}}
.escuro{background:${COR.anil};color:${COR.cal};--ff-lit:${COR.ambar};--ff-lit-edge:none}
header{display:flex;align-items:baseline;gap:16px;margin-bottom:6px}
header h2{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:32px}
.meta{font-size:11px;opacity:.75;margin-left:auto;letter-spacing:.04em}
h3{display:flex;justify-content:space-between;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:500;margin:26px 0 10px;padding-bottom:6px;border-bottom:1px dotted currentColor}
h3 i{font-style:normal;opacity:.6}
.grid{display:grid;grid-template-columns:repeat(10,1fr);gap:0}
figure{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 4px 10px;border-right:1px solid rgba(110,137,180,.25);border-bottom:1px solid rgba(110,137,180,.25)}
.big{height:48px}
.sm{display:flex;gap:12px;align-items:center;height:24px}
figcaption{font-size:10px;opacity:.8}
.row{display:flex;flex-wrap:wrap;gap:13px;padding:12px 0 4px}
.r16{gap:17px}
.insp{display:grid;grid-template-columns:repeat(8,1fr);gap:18px;padding:32px;background:#fff;color:${COR.anil};--ff-lit:${COR.ambar};--ff-lit-edge:${COR.anil}}
.cell{position:relative;width:96px;height:96px}.cell svg.i{position:absolute;inset:0}
.insp figcaption{font-size:10px;margin-top:4px}
</style></head><body>${sprite}
${inspect ? `<div class="insp">${Object.keys(I).map(n => `<div><div class="cell">${gridBg}${ico(n, 96)}</div><figcaption>${n}</figcaption></div>`).join('')}</div>` : `
<div class="top"><h1>Iconografia de linha<br><em>Carta do Lume</em></h1>
<p>Fireflies Consultoria · v2<br>${total} ícones · grid 24 · área viva 20<br>traço 1,5 · pontas e cantos redondos · currentColor</p></div>
<div class="rules">
 <div><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 18 12 7 19 13"/>${st(12, 7)}</svg><span><b>Estrela</b>Círculo cheio r 1,25 nos nós que importam: vértice, junção, origem.</span></div>
 <div><svg width="40" height="40" viewBox="0 0 24 24" style="--ff-lit:${COR.ambar};--ff-lit-edge:${COR.anil}">${lit(12, 12)}</svg><span><b>Lanterna · máx. 1</b>Círculo r 1,6–3, class "lit". No claro, contorno Anil colado.</span></div>
 <div><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">${dotL(3, 12, 21, 12)}</svg><span><b>Traço de constelação · máx. 1</b>Pontos redondos, passo ≈ 3, ajustado para fechar nas pontas.</span></div>
 <div><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">${pt(8, 12)}${pt(12, 12)}${pt(16, 12)}</svg><span><b>Ponto</b>r 0,8, magnitude menor: janelas, grades, marcas de leitura.</span></div>
</div>
${section('claro')}${section('escuro')}`}
</body></html>`;
}

async function main() {
  if (problems.length) { console.error('REGRAS:', problems); process.exitCode = 1; }
  const sprite = write();
  const bbox = await shot(pranchaHTML(sprite, false), path.join(OUT, 'prancha.png'), 1500, {
    scale: 1.5,
    evaluate: () => {
      const out = [];
      document.querySelectorAll('svg > symbol').forEach(s => {
        const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tmp.setAttribute('viewBox', '0 0 24 24'); tmp.style.position = 'absolute';
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.innerHTML = s.innerHTML; tmp.appendChild(g); document.body.appendChild(tmp);
        const b = g.getBBox(); // geometria (sem meia espessura do traço)
        out.push([s.id, +b.x.toFixed(2), +b.y.toFixed(2), +(b.x + b.width).toFixed(2), +(b.y + b.height).toFixed(2)]);
        tmp.remove();
      });
      return out;
    },
  });
  // a geometria + meio traço (0,75) precisa caber em 2–22 (tolerância 0,25 para overshoot)
  const fora = bbox.filter(([, x0, y0, x1, y1]) => x0 < 2.5 || y0 < 2.5 || x1 > 21.5 || y1 > 21.5);
  if (fora.length) console.log('Perto da borda (geometria fora de 2,5–21,5):', fora.map(b => b.join(' ')).join('\n'));
  if (process.argv.includes('--inspecao')) await shot(pranchaHTML(sprite, true), path.join(__dirname, 'review', 'inspecao-icones.png'), 1000);
  console.log(`${Object.keys(I).length} ícones · ${G.map(([g, l]) => `${g} ${l.length}`).join(' · ')}`);
}
main();
