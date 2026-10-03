// Fireflies v2 · parâmetros aprovados (rodada 5, 03/10/2026)
// simbolo: opção A "órbita de frente"; simbolo-pequeno: desenho da opção C "selo"; F em cor única (inteiro)
// favicon: vagalume com rastro curto. Principal = Arco; Diagonal e Laço ficam guardados para outros usos.
const base = { cx: 60, cy: 62, corte: .4, nucleo: 2.5, halo: 12, pn: 5.2, ph: 15, est: 1, fUnico: true, fJunto: true };
const fv = { cx: 60, cy: 60, inc: 0, w0: 1.6, w1: 13, nucleo: 13, halo: 26, asa: 1.9, asaW: 2.3 };
module.exports = {
  simbolo: { ...base, a: 41, b: 41, inc: 0, fim: -114, voo: 300, fH: 38, fDx: 1.2, w0: .85, w1: 4.2, pw: 4.6 },
  pequeno: { ...base, a: 38, b: 38, inc: 0, fim: -102, voo: 330, fH: 42, fDx: 1.2, w0: 1, w1: 5.0, nucleo: 2.9, halo: 13, est: 1.1, pw: 5.4, pn: 5.8 },
  // órbita em volta de um retrato (foto redonda): mesma órbita do símbolo, sem o F, com traço fino para tamanhos grandes
  retrato: { ...base, semF: true, a: 41, b: 41, inc: 0, fim: -114, voo: 300, w0: .3, w1: 1.7, nucleo: 1.35, halo: 7, est: .5, asa: .38, asaW: .42 },
  favicon: {
    // órbita em volta de um retrato (foto redonda): mesma órbita do símbolo, sem o F, com traço fino para tamanhos grandes
  retrato: { ...base, semF: true, a: 41, b: 41, inc: 0, fim: -114, voo: 300, w0: .3, w1: 1.7, nucleo: 1.35, halo: 7, est: .5, asa: .38, asaW: .42 },
  favicon: { ...fv, a: 40, b: 40, fim: -70, voo: 150 },                 // Arco (principal)
    'favicon-diagonal': { ...fv, a: 95, b: 95, fim: -115, voo: 55 },      // guardado
    'favicon-laco': { ...fv, a: 40, b: 40, fim: -100, voo: 260, w1: 12, nucleo: 12 }, // guardado
  },
};
