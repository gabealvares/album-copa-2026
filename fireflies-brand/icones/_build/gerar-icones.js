// Gerador do set de ícones Fireflies Consultoria.
// Uso: node gerar-icones.js  -> escreve ../svg/*.svg e ../sprite.svg
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..');

const f = (n) => +n.toFixed(2);
const P = (d) => `<path d="${d}"/>`;
const C = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
const R = (x, y, w, h, rx = 2) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
const L = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}"/>`;
const dot = (x, y) => `<path d="M${x} ${y}h0"/>`;              // pontinho de traço (Ø1,5)
const LIT = (x, y) => `<circle class="lit" cx="${x}" cy="${y}" r="1.75" fill="var(--ff-lit, currentColor)" stroke="none"/>`;
const pt = (cx, cy, r, deg) => [f(cx + r * Math.cos(deg * Math.PI / 180)), f(cy + r * Math.sin(deg * Math.PI / 180))];
// ponta de seta: tip + direção (graus), abas a 45°, comprimento a
const head = (tip, dirDeg, a = 3) => {
  const b1 = pt(tip[0], tip[1], a, dirDeg + 180 - 45), b2 = pt(tip[0], tip[1], a, dirDeg + 180 + 45);
  return P(`M${b1[0]} ${b1[1]}L${tip[0]} ${tip[1]}L${b2[0]} ${b2[1]}`);
};
// documento com dobra (x 5..19, y 3..21)
const DOC = P('M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z') + P('M14 3v3a2 2 0 0 0 2 2h3');

const icons = {
  // ---------- SERVIÇOS ----------
  'auditoria': [
    P('M11 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v4'),
    P('M7.5 7.5h6'), P('M7.5 11h2.5'),
    C(15.5, 15, 4), P('M18.5 18l2.5 2.5'),
    LIT(15.5, 15),
  ],
  'contabil': [
    R(5, 3, 14, 18), R(8, 6, 8, 3.5, 1),
    dot(9, 13), dot(15, 13), dot(9, 17),
    LIT(15, 17),
  ],
  'fiscal': [
    P('M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5z'),
    P('M9 8h6'), P('M9 11.5h6'), P('M9 15h2'),
    LIT(14.5, 15),
  ],
  'financeiro': [
    R(3, 6, 18, 14), P('M6 6l9.5-3 1 3'),
    P('M21 9.5h-4.5a3.5 3.5 0 0 0 0 7H21'),
    LIT(16.5, 13),
  ],
  'gestao-processos': [
    C(6, 6, 3), P('M6 9v6.5a2 2 0 0 0 2 2h3'), head([11.5, 17.5], 0, 2.5),
    P('M9 6h6.5a2 2 0 0 1 2 2v3'), head([17.5, 11.5], 90, 2.5),
    R(14, 14, 7, 7), LIT(17.5, 17.5),
  ],
  'sindicancia': (() => {
    return [
      P('M2.75 12C5 7.75 8.25 5.5 12 5.5s7 2.25 9.25 6.5C19 16.25 15.75 18.5 12 18.5S5 16.25 2.75 12z'),
      C(12, 12, 3.5), LIT(12, 12),
    ];
  })(),
  'academy': [
    P('M12 4L3 8.5 12 13l9-4.5z'),
    P('M7.5 10.75V15c0 1.52 2.01 2.75 4.5 2.75s4.5-1.23 4.5-2.75v-4.25'),
    P('M20 9v2.75'), LIT(20, 14.75),
  ],
  'condominio': [
    P('M3 21h18'),
    P('M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16'),
    P('M15 9h4a2 2 0 0 1 2 2v10'),
    dot(8.5, 7), dot(11.5, 7), dot(8.5, 11), dot(11.5, 11), dot(8.5, 15), dot(11.5, 15),
    LIT(18, 14),
  ],
  // ---------- CONCEITOS ----------
  'diagnostico': [
    C(10.5, 10.5, 7), P('M15.5 15.5L21 21'),
    P('M5 11h2.5l1.5 2.5 3-6 1.5 3.5h2.5'),
  ],
  'organizacao': [
    R(3, 3, 7.5, 7.5), R(13.5, 3, 7.5, 7.5), R(3, 13.5, 7.5, 7.5), R(13.5, 13.5, 7.5, 7.5),
    LIT(17.25, 17.25),
  ],
  'fechamento': [
    R(5, 3, 14, 18),
    P('M8.5 7h3'), P('M14.5 7h1'), P('M8.5 10.5h3'), P('M14.5 10.5h1'),
    P('M8.5 16.5h3'), LIT(15, 16.5),
  ],
  'rotina': (() => {
    const c = 12, r = 7.5;
    const a1 = pt(c, c, r, 200), a2 = pt(c, c, r, 340), b1 = pt(c, c, r, 20), b2 = pt(c, c, r, 160);
    return [
      P(`M${a1[0]} ${a1[1]}A${r} ${r} 0 0 1 ${a2[0]} ${a2[1]}`), head(a2, 340 + 90, 2.75),
      P(`M${b1[0]} ${b1[1]}A${r} ${r} 0 0 1 ${b2[0]} ${b2[1]}`), head(b2, 160 + 90, 2.75),
      LIT(12, 12),
    ];
  })(),
  'painel-mensal': [
    R(2.5, 4, 19, 13), P('M12 17v4'), P('M8.5 21h7'),
    dot(8, 13.5),
    dot(12, 13.5), dot(12, 10.5),
    dot(16, 13.5), dot(16, 10.5), LIT(16, 7.25),
  ],
  'conciliacao': [
    C(9, 12, 6), C(15, 12, 6), LIT(12, 12),
  ],
  'relatorio': [
    DOC, LIT(9.5, 12.5), P('M13 12.5h3'), P('M8.5 16.5h7'),
  ],
  'indicador': [
    P('M3 3v16a2 2 0 0 0 2 2h16'),
    P('M7 16l3.5-4.5 3 2.5 3.5-4.5'),
    LIT(19, 7),
  ],
  'fluxo-de-caixa': [
    P('M8 20V5'), head([8, 4.5], 270, 4),
    P('M16 4v15'), head([16, 19.5], 90, 4),
  ],
  'imposto': [
    C(12, 12, 9), P('M15.5 8.5l-7 7'), C(9, 9, 1.25), LIT(15, 15),
  ],
  'folha-pagamento': [
    R(3, 5, 18, 14),
    C(8.5, 10, 2), P('M5.5 16a3 3 0 0 1 6 0'),
    P('M14 10h4'), LIT(15, 14),
  ],
  'inadimplencia': [
    P('M16.04 7H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.04A3.5 3.5 0 0 1 16.04 7'),
    P('M6.5 10.5v5'), P('M9.5 10.5v5'), P('M12.5 10.5v5'), P('M15.5 12.5v3'),
    LIT(19.5, 6.5),
  ],
  'fundo-reserva': [
    R(3, 4, 18, 15), C(12, 11.5, 4), P('M6.5 19v2'), P('M17.5 19v2'),
    LIT(12, 11.5),
  ],
  'planejamento-tributario': [
    C(5, 19, 1.5), P('M6.5 19H13a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h4'),
    C(18, 7, 3.25), LIT(18, 7),
  ],
  'erp-tecnologia': [
    R(6, 6, 12, 12),
    P('M9.5 3v3'), P('M14.5 3v3'), P('M9.5 18v3'), P('M14.5 18v3'),
    P('M3 9.5h3'), P('M3 14.5h3'), P('M18 9.5h3'), P('M18 14.5h3'),
    LIT(12, 12),
  ],
  'compliance': [
    P('M12 3l7 2.5V11c0 4.5-3 8-7 10-4-2-7-5.5-7-10V5.5z'),
    P('M8.75 12l2.25 2.25 4.25-4.5'),
  ],
  'contrato': [
    DOC, P('M8.5 10h4'), P('M8.5 13h7'),
    P('M8.5 17c.83-1.67 1.67-1.67 2 0s1.17 1.67 2 0'),
    LIT(15.75, 17),
  ],
  'calendario-prazo': [
    R(3, 5, 18, 16), P('M8 3v4'), P('M16 3v4'), P('M3 10h18'),
    dot(7.5, 14), dot(12, 14), dot(16.5, 14), dot(7.5, 17.5), dot(12, 17.5),
    LIT(16.5, 17.5),
  ],
  // ---------- PESSOAS E CONTATO ----------
  'responsavel': [
    C(12, 7.5, 3.5), P('M5 20.5c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5'),
    LIT(12, 18),
  ],
  'equipe': [
    C(9, 8, 3.5), P('M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5'),
    P('M16 4.75a3.5 3.5 0 0 1 0 6.5'), P('M18 14c2 .9 3.5 3 3.5 6'),
  ],
  'reuniao': [
    C(6, 7.5, 2.5), C(18, 7.5, 2.5),
    P('M3 13a3 3 0 0 1 6 0'), P('M15 13a3 3 0 0 1 6 0'),
    P('M2.5 15.5h19'), P('M6 15.5v5'), P('M18 15.5v5'),
    LIT(12, 10),
  ],
  'whatsapp-conversa': (() => {
    const c = [12, 11.5], r = 8.5;
    const p1 = pt(c[0], c[1], r, 115), p2 = pt(c[0], c[1], r, 150);
    return [
      P(`M${p1[0]} ${p1[1]}A${r} ${r} 0 1 0 ${p2[0]} ${p2[1]}L3.5 20.5z`),
      dot(8.5, 11.5), dot(12, 11.5), LIT(15.75, 11.5),
    ];
  })(),
  'email': [
    R(3, 5, 18, 14), P('M3.5 7l8.5 6 8.5-6'),
  ],
  'telefone': [
    R(6, 2.5, 12, 19), P('M10.5 5.5h3'), LIT(12, 17.5),
  ],
  'localizacao': [
    P('M12 21c-4-4.2-7-7.4-7-11a7 7 0 0 1 14 0c0 3.6-3 6.8-7 11z'),
    LIT(12, 10),
  ],
  // ---------- UI ----------
  'seta-direita': [P('M4 12h15'), P('M13.5 6l6 6-6 6')],
  'check': [P('M4.5 12.5l5 5L19.5 7')],
  'alerta': [
    P('M12 3.5L21.5 20h-19z'), P('M12 9v4.5'), LIT(12, 17),
  ],
};

const ATTR = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
fs.mkdirSync(path.join(OUT, 'svg'), { recursive: true });
const symbols = [];
for (const [name, els] of Object.entries(icons)) {
  const lits = els.join('').split('class="lit"').length - 1;
  if (lits > 1) throw new Error(`${name}: mais de 1 ponto aceso`);
  const body = els.join('\n  ');
  fs.writeFileSync(path.join(OUT, 'svg', `${name}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ${ATTR} class="ff-icon ff-icon-${name}">\n  ${body}\n</svg>\n`);
  symbols.push(`  <symbol id="ff-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ff-stroke, 1.5)">\n    ${els.join('\n    ')}\n  </symbol>`);
}
fs.writeFileSync(path.join(OUT, 'sprite.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n<!-- Fireflies Consultoria · set de ícones v1 · ${Object.keys(icons).length} ícones -->\n${symbols.join('\n')}\n</svg>\n`);
fs.writeFileSync(path.join(__dirname, 'icons.json'), JSON.stringify(Object.keys(icons)));
console.log(`${Object.keys(icons).length} ícones gerados`);
