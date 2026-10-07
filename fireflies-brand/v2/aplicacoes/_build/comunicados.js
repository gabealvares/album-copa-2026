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

// 2 · Série "cadastro até dezembro" (post 04 do blog) -----------------------------------------------
{
  const W = 1200, H = 1500, M = 90;
  const foto = path.join(__dirname, 'fotos/gabriel-alvares.jpg');
  const rodape = (comLogoHorizontal) => {
    let r = line(M, H - 130, W - M, H - 130, C.fuligem, 1.5);
    r += comLogoHorizontal
      ? logo('horizontal', 'digital-negativo', { w: 250, x: M - 22, y: H - 118 }).svg
      : logo('wordmark', 'digital-negativo', { w: 190, x: M, y: H - 100 }).svg;
    r += t(SITE, { f: 'mono4', s: 22, x: W - M, y: H - 72, fill: C.fumaca, a: 'end', tr: 0.04 });
    return r;
  };

  // 2.1 capa (mesmo desenho do comunicado do Ato nº 7)
  {
    let b = '';
    b += eyebrow(M, 140, 'Reforma tributária · Condomínios');
    b += retrato(foto, { cx: 840, cy: 450, r: 215 });
    const fy = 300;
    b += t('NFS-E OBRIGATÓRIA EM', { f: 'mono5', s: 22, x: M, y: fy, fill: C.ceu, tr: 0.1 });
    b += t('01/12', { f: 'sora7', s: 96, x: M - 4, y: fy + 100, fill: C.cal });
    b += line(M, fy + 150, M + 340, fy + 150, C.ceu, 1.5);
    b += t('O QUE CONFERIR ANTES', { f: 'mono5', s: 22, x: M, y: fy + 200, fill: C.ceu, tr: 0.1 });
    b += t('IPTU · CIB · CPF', { f: 'sora7', s: 40, x: M, y: fy + 254, fill: C.cal });
    b += t('55 DIAS PARA COMEÇAR', { f: 'mono5', s: 26, x: M, y: fy + 300, fill: C.vermelhao, tr: 0.12 });
    b += t('Gabriel Alvares', { f: 'sans6', s: 30, x: 840, y: 780, fill: C.cal, a: 'middle' });
    b += t('CONTADOR RESPONSÁVEL', { f: 'mono4', s: 18, x: 840, y: 814, fill: C.fumaca, a: 'middle', tr: 0.12 });
    const tt = titulo('ANTES DO SISTEMA, ORGANIZE O **CADASTRO** DO CONDOMÍNIO.', { s: 68, w: 1020, x: M, y: 930 });
    b += tt.svg;
    b += corpo('A partir de 01/12/2026, cada cobrança sai em nota fiscal, com o imóvel e o condômino identificados. Entenda por que **inscrição de IPTU, código CIB e CPF corretos** vêm antes de tudo.', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 84 }).svg;
    b += rodape(false);
    L.save(DIR + 'linkedin-cadastro-01-capa_1200x1500', { w: W, h: H, bg: C.anil, body: b, title: 'LinkedIn · cadastro do condomínio até 01/12/2026 · capa' });
  }

  // 2.2 os três cadastros
  {
    let b = '';
    b += eyebrow(M, 140, 'Reforma tributária · Condomínios');
    const tt = titulo('OS 3 CADASTROS QUE A **NFS-E DO CONDOMÍNIO** VAI PEDIR.', { s: 68, w: 1020, x: M, y: 270 });
    b += tt.svg;
    const itens = [
      ['IPTU', 'INSCRIÇÃO DE CADA UNIDADE', 'O número com que a prefeitura identifica a unidade. É a partir dele que o imóvel chega ao **CIB**.'],
      ['CIB', 'O "CPF DO IMÓVEL"', 'Código nacional no formato **AAAAAAA-D**. Nas capitais, as unidades já estão recebendo o código.'],
      ['CPF', 'DE CADA PROPRIETÁRIO', 'Nome e CPF **exatamente como na Receita**. Com erro, o Ambiente Nacional rejeita a nota.'],
    ];
    let y = tt.y + 110;
    itens.forEach(([sigla, rot, txt], i) => {
      b += line(M, y, W - M, y, C.fuligem, 1.5);
      b += t(String(i + 1).padStart(2, '0'), { f: 'mono5', s: 22, x: M, y: y + 62, fill: C.vermelhao, tr: 0.1 });
      b += t(sigla, { f: 'sora7', s: 88, x: M + 60, y: y + 118, fill: C.cal });
      b += t(rot, { f: 'mono5', s: 20, x: 470, y: y + 62, fill: C.ceu, tr: 0.1 });
      b += corpo(txt, { s: 30, lh: 41, w: 640, x: 470, y: y + 108 }).svg;
      y += 250;
    });
    b += rodape(true);
    L.save(DIR + 'linkedin-cadastro-02-tres-cadastros_1200x1500', { w: W, h: H, bg: C.anil, body: b, title: 'LinkedIn · os 3 cadastros da NFS-e do condomínio' });
  }

  // 2.3 CPF errado, nota rejeitada
  {
    let b = '';
    b += eyebrow(M, 140, 'Reforma tributária · Condomínios');
    const tt = titulo('CPF ERRADO, **NOTA REJEITADA.**', { s: 96, w: 1020, x: M, y: 300 });
    b += tt.svg;
    b += corpo('O Ambiente Nacional da NFS-e confere o documento do condômino na emissão. Os erros que mais vão aparecer em dezembro:', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 90 }).svg;
    const erros = [
      ['E0206', 'CPF com dígito verificador errado'],
      ['E0207', 'CPF que não existe na base da Receita'],
      ['PASSA', 'Unidade ainda em nome da construtora'],
      ['PASSA', 'Inquilino cadastrado no lugar do dono'],
    ];
    let y = tt.y + 250;
    erros.forEach(([cod, txt]) => {
      b += line(M, y, W - M, y, C.fuligem, 1.5);
      b += t(cod, { f: 'mono5', s: 26, x: M, y: y + 66, fill: cod === 'PASSA' ? C.ceu : C.vermelhao, tr: 0.1 });
      b += t(txt, { f: 'sans5', s: 36, x: M + 190, y: y + 66, fill: C.cal });
      y += 104;
    });
    b += line(M, y, W - M, y, C.fuligem, 1.5);
    b += corpo('**"Passa"** é pior: a nota sai, mas contra a pessoa errada.', { s: 30, lh: 42, w: 1000, x: M, y: y + 70 }).svg;
    b += rodape(true);
    L.save(DIR + 'linkedin-cadastro-03-cpf-errado_1200x1500', { w: W, h: H, bg: C.anil, body: b, title: 'LinkedIn · CPF errado, nota rejeitada' });
  }
}
L.flush('comunicados');
