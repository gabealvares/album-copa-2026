// Rodada 5c: favicon = vagalume com rastro curto (sem F). Enquadramento automático (rastro() centra e ajusta).
const v = { cx: 60, cy: 60, inc: 0, w0: 1.6, w1: 13, nucleo: 13, halo: 26, asa: 1.9, asaW: 2.3 };
module.exports = {
  arco: { ...v, nome: 'Arco', a: 40, b: 40, fim: -70, voo: 150 },
  diagonal: { ...v, nome: 'Diagonal', a: 95, b: 95, fim: -115, voo: 55 },
  laco: { ...v, nome: 'Laço', a: 40, b: 40, fim: -100, voo: 260, w1: 12, nucleo: 12 },
};
