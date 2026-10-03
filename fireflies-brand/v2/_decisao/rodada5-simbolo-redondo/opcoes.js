// Rodada 5b: A e C, F em cor única (sem o braço colorido)
const base = { cx: 60, cy: 62, corte: .4, nucleo: 2.5, halo: 12, pn: 5.2, ph: 15, est: 1, fUnico: true, fJunto: true };
module.exports = {
  A: { ...base, nome: 'Órbita de frente', a: 41, b: 41, inc: 0, fim: -114, voo: 300, fH: 38, fDx: 1.2, w0: .85, w1: 4.2, pw: 4.6 },
  C: { ...base, nome: 'Órbita-selo', a: 38, b: 38, inc: 0, fim: -102, voo: 330, fH: 42, fDx: 1.2, w0: 1, w1: 5.0, nucleo: 2.9, halo: 13, est: 1.1, pw: 5.4, pn: 5.8 },
};
// rodada 5 (bicolor) e a opção B ficam registradas aqui para histórico
module.exports.r5 = {
  A: { ...module.exports.A, fUnico: false, fJunto: false },
  B: { ...base, fUnico: false, fJunto: false, nome: 'Órbita em três quartos', a: 44, b: 35, inc: -12, fim: -108, voo: 300, fH: 34, fDx: 1.2, w0: .85, w1: 4.0, pw: 4.4 },
  C: { ...module.exports.C, fUnico: false, fJunto: false },
};
