// Fireflies v2 · comunicados com retrato (LinkedIn)
// O retrato é a foto redonda do autor com a órbita do símbolo em volta (mesmo voo, constelação e vagalume, sem o F).
// Uma luz por card: o vagalume da órbita é a luz; o destaque do texto é Vermelhão (fundo Anil).
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const { C, t, para, logo, rect, line } = L;
const { simbolo } = require('../../logo/_build/simbolo');
const P = require('../../logo/_build/parametros');
const DIR = 'redes/';
const SITE = 'www.fireflies.com.br';

const titulo = (s, o) => para(s, { f: 'sora7', lh: o.s * 1.08, fill: C.cal, tr: 0.02, bf: 'sora7', bfill: C.vermelhao, btr: 0.02, ...o });
const corpo = (s, o) => para(s, { f: 'sans4', s: 34, lh: 46, fill: C.fumaca, bf: 'sans6', bfill: C.cal, ...o });
function eyebrow(x, y, s) {
  return line(x, y - 7, x + 40, y - 7, C.vermelhao, 3) + t(s.toUpperCase(), { f: 'mono5', s: 22, x: x + 56, y, fill: C.fumaca, tr: 0.12 });
}

// retrato: foto em círculo (raio r) com a órbita do símbolo; cx, cy = centro
let RID = 0;
function retrato(foto, { cx, cy, r, zoom = 1.12, fx = 0.5, fy = 0.47 }) {
  const id = `rt${++RID}`;
  const img = 'data:image/jpeg;base64,' + fs.readFileSync(foto).toString('base64');
  const o = P.retrato, R = r / 0.86;                 // a órbita fica a ~1,16 × o raio da foto
  const k = R / o.a, ox = cx - o.cx * k, oy = cy - o.cy * k;
  const orb = simbolo(o, 'digital-negativo', { id }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<title>.*?<\/title>/, '');
  const s = 2 * r * zoom;                              // lado da foto quadrada, recortada no círculo
  return `<defs><clipPath id="${id}-clip"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`
    + `<circle cx="${cx}" cy="${cy}" r="${r + 1}" fill="${C.profundo}"/>`
    + `<image href="${img}" x="${L.n2(cx - s * fx)}" y="${L.n2(cy - s * fy)}" width="${L.n2(s)}" height="${L.n2(s)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id}-clip)"/>`
    + `<g transform="translate(${L.n2(ox)} ${L.n2(oy)}) scale(${k.toFixed(4)})">${orb}</g>`;
}

// 1 · Reforma tributária no condomínio: NT SE/CGNFS-e nº 009 v1.01 (LinkedIn 4:5, 1200×1500) ----------
{
  const W = 1200, H = 1500, M = 90;
  const foto = path.join(__dirname, 'fotos/gabriel-alvares.jpg');
  let b = '';
  b += eyebrow(M, 140, 'Reforma tributária · Condomínios');
  // retrato à direita, no alto
  b += retrato(foto, { cx: 840, cy: 450, r: 215 });
  // ficha do ato (à esquerda do retrato)
  const fy = 300;
  b += t('ATO TÉCNICO CONJUNTO', { f: 'mono5', s: 22, x: M, y: fy, fill: C.ceu, tr: 0.1 });
  b += t('Nº 7', { f: 'sora7', s: 96, x: M - 4, y: fy + 100, fill: C.cal });
  b += line(M, fy + 150, M + 340, fy + 150, C.ceu, 1.5);
  b += t('APROVA A NOTA TÉCNICA', { f: 'mono5', s: 22, x: M, y: fy + 200, fill: C.ceu, tr: 0.1 });
  b += t('SE/CGNFS-e Nº 009', { f: 'sora7', s: 40, x: M, y: fy + 254, fill: C.cal });
  b += t('VERSÃO 1.01', { f: 'mono5', s: 26, x: M, y: fy + 300, fill: C.vermelhao, tr: 0.12 });
  // nome sob o retrato
  b += t('Gabriel Alvares', { f: 'sans6', s: 30, x: 840, y: 780, fill: C.cal, a: 'middle' });
  b += t('CONTADOR RESPONSÁVEL', { f: 'mono4', s: 18, x: 840, y: 814, fill: C.fumaca, a: 'middle', tr: 0.12 });
  // título e corpo
  const tt = titulo('VEJA AS NOVAS DEFINIÇÕES DA **REFORMA TRIBUTÁRIA** PARA O RAMO CONDOMINIAL.', { s: 68, w: 1020, x: M, y: 930 });
  b += tt.svg;
  b += corpo('O Ato Técnico Conjunto nº 7 aprova a nova versão da Nota Técnica SE/CGNFS-e nº 009 (**versão 1.01**). Entenda o que muda na nota fiscal de serviço do seu condomínio.', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 84 }).svg;
  // rodapé: wordmark + site (sem o símbolo: a luz do card já é o vagalume do retrato)
  b += line(M, H - 130, W - M, H - 130, C.fuligem, 1.5);
  b += logo('wordmark', 'digital-negativo', { w: 190, x: M, y: H - 100 }).svg;
  b += t(SITE, { f: 'mono4', s: 22, x: W - M, y: H - 72, fill: C.fumaca, a: 'end', tr: 0.04 });
  L.save(DIR + 'linkedin-comunicado-nfse-reforma_1200x1500', { w: W, h: H, bg: C.anil, body: b, title: 'LinkedIn · comunicado · Reforma tributária no condomínio (NT SE/CGNFS-e nº 009 v1.01)' });
}
L.flush('comunicados');
