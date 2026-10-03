// Fireflies v2 · logo da página da empresa no LinkedIn (F em órbita, quadrado)
// O LinkedIn pede 400×400 px; aqui saem 400 px (envio direto) e 1080 px (alta resolução).
// O símbolo ocupa 70 % do quadro: cabe também quando a rede recorta em círculo.
const L = require('./lib');
const { C, logo } = L;
const DIR = 'digital/linkedin-logo/';

const VERSOES = [
  ['anil', C.anil, 'simbolo', 'digital-negativo'],          // principal
  ['branco', C.branco, 'simbolo', 'digital'],
  ['cal', C.cal, 'simbolo', 'digital'],
  ['anil-chapado', C.anil, 'simbolo', 'chapado-negativo'],  // sem gradiente nem brilho
  ['anil-pequeno', C.anil, 'simbolo-pequeno', 'digital-negativo'], // traço grosso, para leitura em miniatura
];
for (const [nome, fundo, versao, cor] of VERSOES) {
  for (const px of [400, 1080]) {
    const W = 400, frac = 0.7;
    const sb = logo(versao, cor, { h: W * frac });
    const body = logo(versao, cor, { h: W * frac, x: (W - sb.w) / 2, y: (W - sb.h) / 2 }).svg;
    L.save(DIR + `fireflies_linkedin-logo_${nome}_${px}`, { w: W, h: W, bg: fundo, body, scale: px / W, title: `Fireflies Consultoria · logo do LinkedIn (${nome}, ${px} px)` });
  }
}
L.flush('linkedin');
