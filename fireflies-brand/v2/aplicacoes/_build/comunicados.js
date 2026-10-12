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

// 2 · Carrossel "revise o cadastro do condomínio até 01/12" (post 04 do blog) -------------------------
// Público: administradoras, síndicos e conselhos. 6 cards 1200×1500, numerados.
{
  const W = 1200, H = 1500, M = 90, N = 6;
  const foto = path.join(__dirname, 'fotos/gabriel-alvares.jpg');
  const topo = (n) => eyebrow(M, 140, 'Reforma tributária · Condomínios')
    + t(`${n}/${N}`, { f: 'mono5', s: 22, x: W - M, y: 140, fill: C.fumaca, a: 'end', tr: 0.1 });
  const rodape = (comLogoHorizontal, seta = true) => {
    let r = line(M, H - 130, W - M, H - 130, C.fuligem, 1.5);
    r += comLogoHorizontal
      ? logo('horizontal', 'digital-negativo', { w: 250, x: M - 22, y: H - 118 }).svg
      : logo('wordmark', 'digital-negativo', { w: 190, x: M, y: H - 100 }).svg;
    r += t(seta ? 'ARRASTE →' : SITE, { f: 'mono4', s: 22, x: W - M, y: H - 72, fill: seta ? C.ceu : C.fumaca, a: 'end', tr: seta ? 0.12 : 0.04 });
    return r;
  };
  const salvar = (n, nome, b, titulo) => L.save(DIR + `linkedin-carrossel-cadastro-${String(n).padStart(2, '0')}-${nome}_1200x1500`, { w: W, h: H, bg: C.anil, body: b, title: `LinkedIn · carrossel cadastro ${n}/${N} · ${titulo}` });
  const linhas = (itens, y0, passo, rotX = M, txtX = 470, rotFn) => {
    let b = '', y = y0;
    itens.forEach((it, i) => {
      b += line(M, y, W - M, y, C.fuligem, 1.5);
      b += rotFn(it, i, y);
      b += corpo(it[it.length - 1], { s: 30, lh: 41, w: W - M - txtX, x: txtX, y: y + 62 }).svg;
      y += passo;
    });
    return { svg: b, y };
  };

  // 1 · capa
  {
    let b = topo(1);
    b += retrato(foto, { cx: 840, cy: 450, r: 215 });
    const fy = 300;
    b += t('NFS-E DO CONDOMÍNIO EM', { f: 'mono5', s: 22, x: M, y: fy, fill: C.ceu, tr: 0.1 });
    b += t('01/12', { f: 'sora7', s: 96, x: M - 4, y: fy + 100, fill: C.cal });
    b += line(M, fy + 150, M + 340, fy + 150, C.ceu, 1.5);
    b += t('REVISE EM CADA UNIDADE', { f: 'mono5', s: 22, x: M, y: fy + 200, fill: C.ceu, tr: 0.1 });
    b += t('IPTU · CIB · CPF', { f: 'sora7', s: 40, x: M, y: fy + 254, fill: C.cal });
    b += t('FALTAM 55 DIAS', { f: 'mono5', s: 26, x: M, y: fy + 300, fill: C.vermelhao, tr: 0.12 });
    b += t('Gabriel Alvares', { f: 'sans6', s: 30, x: 840, y: 780, fill: C.cal, a: 'middle' });
    b += t('CONTADOR RESPONSÁVEL', { f: 'mono4', s: 18, x: 840, y: 814, fill: C.fumaca, a: 'middle', tr: 0.12 });
    const tt = titulo('ADMINISTRADORA, SÍNDICO: COMECE A **REVISAR O CADASTRO** DOS SEUS CONDOMÍNIOS.', { s: 64, w: 1020, x: M, y: 920 });
    b += tt.svg;
    b += corpo('A partir de 01/12/2026, cada cobrança do condomínio sai em nota fiscal, com **o imóvel e o proprietário identificados**. Os dados de cada unidade precisam estar certos até lá.', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 80 }).svg;
    b += rodape(false);
    salvar(1, 'capa', b, 'capa');
  }

  // 2 · os três cadastros
  {
    let b = topo(2);
    const tt = titulo('OS 3 DADOS QUE A **NOTA DO CONDOMÍNIO** VAI LEVAR.', { s: 68, w: 1020, x: M, y: 270 });
    b += tt.svg;
    const it = [
      ['IPTU', 'INSCRIÇÃO DE CADA UNIDADE', 'O número com que a prefeitura identifica a unidade. É a partir dele que o imóvel chega ao **CIB**.'],
      ['CIB', 'O "CPF DO IMÓVEL"', 'Código nacional no formato **AAAAAAA-D**. Nas capitais, as unidades já estão recebendo o código.'],
      ['CPF', 'DE CADA PROPRIETÁRIO', 'Nome e CPF **exatamente como na Receita**. Com erro, a nota é rejeitada.'],
    ];
    let y = tt.y + 110;
    it.forEach(([sigla, rot, txt], i) => {
      b += line(M, y, W - M, y, C.fuligem, 1.5);
      b += t(String(i + 1).padStart(2, '0'), { f: 'mono5', s: 22, x: M, y: y + 62, fill: C.vermelhao, tr: 0.1 });
      b += t(sigla, { f: 'sora7', s: 88, x: M + 60, y: y + 118, fill: C.cal });
      b += t(rot, { f: 'mono5', s: 20, x: 470, y: y + 62, fill: C.ceu, tr: 0.1 });
      b += corpo(txt, { s: 30, lh: 41, w: 640, x: 470, y: y + 108 }).svg;
      y += 250;
    });
    b += rodape(true);
    salvar(2, 'tres-dados', b, 'os 3 dados');
  }

  // 3 · CPF errado
  {
    let b = topo(3);
    const tt = titulo('CPF ERRADO, **NOTA REJEITADA.**', { s: 96, w: 1020, x: M, y: 300 });
    b += tt.svg;
    b += corpo('A nota é conferida na emissão, com o documento do proprietário. Os erros de cadastro que mais vão aparecer em dezembro:', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 90 }).svg;
    const erros = [
      ['REJEITA', 'CPF com dígito verificador errado'],
      ['REJEITA', 'CPF que não existe na base da Receita'],
      ['PASSA', 'Unidade ainda em nome da construtora'],
      ['PASSA', 'Inquilino cadastrado no lugar do dono'],
    ];
    let y = tt.y + 250;
    erros.forEach(([cod, txt]) => {
      b += line(M, y, W - M, y, C.fuligem, 1.5);
      b += t(cod, { f: 'mono5', s: 26, x: M, y: y + 66, fill: cod === 'PASSA' ? C.ceu : C.vermelhao, tr: 0.1 });
      b += t(txt, { f: 'sans5', s: 36, x: M + 210, y: y + 66, fill: C.cal });
      y += 104;
    });
    b += line(M, y, W - M, y, C.fuligem, 1.5);
    b += corpo('**"Passa"** é pior: a nota sai, mas contra a pessoa errada.', { s: 30, lh: 42, w: 1000, x: M, y: y + 70 }).svg;
    b += rodape(true);
    salvar(3, 'cpf-errado', b, 'CPF errado');
  }

  // 4 · quem revisa o quê
  {
    let b = topo(4);
    const tt = titulo('CADA UM REVISA **UMA PARTE.**', { s: 76, w: 1020, x: M, y: 280 });
    b += tt.svg;
    const papeis = [
      ['Administradora', 'Cruza o cadastro com matrícula, carnê de IPTU e contratos. Valida CPFs e CNPJs.'],
      ['Síndico', 'Aprova o recadastramento, avisa os condôminos e cobra quem não respondeu.'],
      ['Conselho', 'Confere por amostragem e acompanha as correções até dezembro.'],
      ['Condômino', 'Confirma nome, CPF e todos os titulares da própria unidade.'],
    ];
    b += linhas(papeis, tt.y + 100, 200, M, 545, ([nome], i, y) =>
      t(String(i + 1).padStart(2, '0'), { f: 'mono5', s: 22, x: M, y: y + 62, fill: C.vermelhao, tr: 0.1 })
      + t(nome, { f: 'sora7', s: 36, x: M + 60, y: y + 66, fill: C.cal })).svg;
    b += rodape(true);
    salvar(4, 'quem-revisa', b, 'quem revisa o quê');
  }

  // 5 · checklist por unidade
  {
    let b = topo(5);
    const tt = titulo('O QUE CONFERIR EM **CADA UNIDADE.**', { s: 76, w: 1020, x: M, y: 280 });
    b += tt.svg;
    const itens = [
      'Inscrição de IPTU igual à do carnê',
      'Código CIB levantado (nas capitais)',
      'Endereço completo, com CEP',
      'Proprietário atual, não a construtora',
      'Nome igual ao do CPF na Receita',
      'Todos os titulares e a parte de cada um',
      'Inquilino em campo separado do dono',
    ];
    let y = tt.y + 100;
    itens.forEach((txt) => {
      b += line(M, y, W - M, y, C.fuligem, 1.5);
      b += `<rect x="${M}" y="${y + 34}" width="38" height="38" rx="4" fill="none" stroke="${C.ceu}" stroke-width="2.5"/>`;
      b += t(txt, { f: 'sans5', s: 36, x: M + 72, y: y + 66, fill: C.cal });
      y += 104;
    });
    b += line(M, y, W - M, y, C.fuligem, 1.5);
    b += rodape(true);
    salvar(5, 'checklist', b, 'checklist por unidade');
  }

  // 6 · chamada final (a luz volta a ser o vagalume do retrato)
  {
    let b = topo(6);
    b += retrato(foto, { cx: W / 2, cy: 470, r: 200 });
    b += t('Gabriel Alvares', { f: 'sans6', s: 30, x: W / 2, y: 790, fill: C.cal, a: 'middle' });
    b += t('CONTADOR RESPONSÁVEL', { f: 'mono4', s: 18, x: W / 2, y: 824, fill: C.fumaca, a: 'middle', tr: 0.12 });
    const tt = titulo('COMECE A REVISÃO **HOJE.**', { s: 84, w: 1020, x: M, y: 960 });
    b += tt.svg;
    b += corpo('O roteiro completo, com os erros mais comuns e como corrigir cada um, está no nosso blog. **Precisa de apoio com a carteira? Fale com a gente.**', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 84 }).svg;
    b += t('FIREFLIES.COM.BR/BLOG', { f: 'mono5', s: 30, x: M, y: tt.y + 260, fill: C.vermelhao, tr: 0.1 });
    b += rodape(false, false);
    salvar(6, 'chamada', b, 'chamada final');
  }
}

// 3 · Carrossel "retenções do condomínio: hoje × 2027 × 2028 × 2033" (post 14 do blog) ----------------
// Público: síndicos, administradoras e conselhos. 8 cards 1200×1500 + PDF para o LinkedIn (documento).
{
  const W = 1200, H = 1500, M = 90, N = 8;
  const foto = path.join(__dirname, 'fotos/gabriel-alvares.jpg');
  const PDF = DIR + 'linkedin-carrossel-retencoes_8-paginas';
  const topo = (n) => eyebrow(M, 140, 'Reforma tributária · Retenções')
    + t(`${n}/${N}`, { f: 'mono5', s: 22, x: W - M, y: 140, fill: C.fumaca, a: 'end', tr: 0.1 });
  const rodape = (comLogoHorizontal, seta = true) => {
    let r = line(M, H - 130, W - M, H - 130, C.fuligem, 1.5);
    r += comLogoHorizontal
      ? logo('horizontal', 'digital-negativo', { w: 250, x: M - 22, y: H - 118 }).svg
      : logo('wordmark', 'digital-negativo', { w: 190, x: M, y: H - 100 }).svg;
    r += t(seta ? 'ARRASTE →' : SITE, { f: 'mono4', s: 22, x: W - M, y: H - 72, fill: seta ? C.ceu : C.fumaca, a: 'end', tr: seta ? 0.12 : 0.04 });
    return r;
  };
  const salvar = (n, nome, b, tit) => L.save(DIR + `linkedin-carrossel-retencoes-${String(n).padStart(2, '0')}-${nome}_1200x1500`, { w: W, h: H, bg: C.anil, body: b, pdf: PDF, title: `LinkedIn · carrossel retenções ${n}/${N} · ${tit}` });
  const selo = (txt, x, y, cor = C.ceu) => {
    const w = L.measure(txt, 'mono5', 18, 0.12) + 36;
    return `<rect x="${x}" y="${y - 30}" width="${L.n2(w)}" height="44" rx="22" fill="none" stroke="${cor}" stroke-width="2"/>` + t(txt, { f: 'mono5', s: 18, x: x + 18, y: y, fill: cor, tr: 0.12 });
  };
  const fio = (y) => line(M, y, W - M, y, C.fuligem, 1.5);

  // 1 · capa
  {
    let b = topo(1);
    b += retrato(foto, { cx: 840, cy: 450, r: 215 });
    const fy = 300;
    b += t('RETENÇÕES DO CONDOMÍNIO', { f: 'mono5', s: 22, x: M, y: fy, fill: C.ceu, tr: 0.1 });
    b += t('2027', { f: 'sora7', s: 96, x: M - 4, y: fy + 100, fill: C.cal });
    b += line(M, fy + 150, M + 340, fy + 150, C.ceu, 1.5);
    b += t('E DEPOIS', { f: 'mono5', s: 22, x: M, y: fy + 200, fill: C.ceu, tr: 0.1 });
    b += t('2028 · 2033', { f: 'sora7', s: 40, x: M, y: fy + 254, fill: C.cal });
    b += t('HOJE × FUTURO', { f: 'mono5', s: 26, x: M, y: fy + 300, fill: C.vermelhao, tr: 0.12 });
    b += t('Gabriel Alvares', { f: 'sans6', s: 30, x: 840, y: 780, fill: C.cal, a: 'middle' });
    b += t('CONTADOR RESPONSÁVEL', { f: 'mono4', s: 18, x: 840, y: 814, fill: C.fumaca, a: 'middle', tr: 0.12 });
    const tt = titulo('O QUE MUDA NAS **RETENÇÕES** DO CONDOMÍNIO, ANO A ANO.', { s: 68, w: 1020, x: M, y: 920 });
    b += tt.svg;
    b += corpo('Algumas mudam, outras continuam iguais e uma acaba. Separamos **o que já é lei** do que ainda falta regulamentar.', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 84 }).svg;
    b += rodape(false);
    salvar(1, 'capa', b, 'capa');
  }

  // 2 · três datas
  {
    let b = topo(2);
    const tt = titulo('3 DATAS PARA O **CALENDÁRIO** DO CONDOMÍNIO.', { s: 68, w: 1020, x: M, y: 270 });
    b += tt.svg;
    const it = [
      ['01/01/2027', 'PIS, COFINS E CSLL RETIDOS', '4,65% → 1%', 'Fica só a CSLL.'],
      ['01/01/2028', 'INSS DE EMPRESA DESONERADA', '3,5% → 11%', 'Fim da desoneração da folha.'],
      ['2033', 'ISS', 'ACABA', 'Diminui aos poucos de 2029 a 2032.'],
    ];
    b += selo('DEFINIDO EM LEI', M, tt.y + 76);
    let y = tt.y + 130;
    it.forEach(([data, rot, num, txt]) => {
      b += fio(y);
      b += t(data, { f: 'mono5', s: 24, x: M, y: y + 64, fill: C.vermelhao, tr: 0.1 });
      b += t(rot, { f: 'mono5', s: 20, x: 470, y: y + 64, fill: C.ceu, tr: 0.1 });
      // número "antes → depois": a seta vem da Plex Mono (a Sora não tem o glifo)
      const [n0, n1] = num.split(' → ');
      let nx = M - 4;
      b += t(n0, { f: 'sora7', s: 72, x: nx, y: y + 160, fill: n1 ? C.fumaca : C.cal });
      if (n1) {
        nx += L.measure(n0, 'sora7', 72) + 24;
        b += t('→', { f: 'mono5', s: 58, x: nx, y: y + 155, fill: C.vermelhao });
        nx += L.measure('→', 'mono5', 58) + 24;
        b += t(n1, { f: 'sora7', s: 72, x: nx, y: y + 160, fill: C.cal });
      }
      b += corpo(txt, { s: 30, lh: 40, w: 1000, x: M, y: y + 212 }).svg;
      y += 248;
    });
    b += fio(y);
    b += rodape(true);
    salvar(2, 'tres-datas', b, '3 datas');
  }

  // 3 · PCC vira CSLL
  {
    let b = topo(3);
    const tt = titulo('EM 2027, O PCC VIRA **CSLL DE 1%.**', { s: 80, w: 1020, x: M, y: 290 });
    b += tt.svg;
    b += corpo('PIS e Cofins deixam de existir (no lugar entra a CBS) e saem da retenção. A lista de serviços continua a mesma: limpeza, conservação, manutenção, vigilância.', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 90 }).svg;
    b += t('O QUE DECIDE É O DIA DO PAGAMENTO', { f: 'mono5', s: 22, x: M, y: tt.y + 330, fill: C.ceu, tr: 0.1 });
    const lin = [['NOTA DE DEZ/2026', 'PAGA EM DEZ/2026', '4,65%'], ['NOTA DE DEZ/2026', 'PAGA EM JAN/2027', '1%']];
    let y = tt.y + 370;
    lin.forEach(([a, p, v], i) => {
      b += fio(y);
      b += t(a, { f: 'mono4', s: 24, x: M, y: y + 74, fill: C.fumaca, tr: 0.06 });
      b += t(p, { f: 'mono4', s: 24, x: 480, y: y + 74, fill: C.fumaca, tr: 0.06 });
      b += t(v, { f: 'sora7', s: 64, x: W - M, y: y + 86, fill: i ? C.vermelhao : C.cal, a: 'end' });
      y += 130;
    });
    b += fio(y);
    b += corpo('**Planeje o fechamento de dezembro:** defina quais notas serão pagas em 2026 e quais em 2027.', { s: 30, lh: 42, w: 1000, x: M, y: y + 76 }).svg;
    b += rodape(true);
    salvar(3, 'pcc-csll', b, 'PCC vira CSLL');
  }

  // 4 · INSS 3,5% → 11%
  {
    let b = topo(4);
    const tt = titulo('INSS DE 3,5% **ACABA EM 2028.**', { s: 80, w: 1020, x: M, y: 290 });
    b += tt.svg;
    b += corpo('Vale para prestadoras na **desoneração da folha (CPRB)**, comuns na construção civil. Em 2028, elas voltam para a regra geral de 11%.', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 90 }).svg;
    b += t('EXEMPLO · OBRA DE R$ 50.000,00', { f: 'mono5', s: 22, x: M, y: tt.y + 290, fill: C.ceu, tr: 0.1 });
    const lin = [['PAGA EM 2027', '3,5%', 'R$ 1.750,00'], ['PAGA EM 2028', '11%', 'R$ 5.500,00']];
    let y = tt.y + 330;
    lin.forEach(([a, p, v], i) => {
      b += fio(y);
      b += t(a, { f: 'mono4', s: 24, x: M, y: y + 74, fill: C.fumaca, tr: 0.06 });
      b += t(p, { f: 'mono5', s: 28, x: 480, y: y + 76, fill: C.ceu, tr: 0.06 });
      b += t(v, { f: 'sora7', s: 58, x: W - M, y: y + 84, fill: i ? C.vermelhao : C.cal, a: 'end' });
      y += 130;
    });
    b += fio(y);
    b += corpo('Obras que atravessam a virada de 2027 para 2028 precisam prever essa diferença **no cronograma de pagamentos.**', { s: 30, lh: 42, w: 1000, x: M, y: y + 76 }).svg;
    b += rodape(true);
    salvar(4, 'inss', b, 'INSS 3,5% para 11%');
  }

  // 5 · ISS diminui e acaba
  {
    let b = topo(5);
    const tt = titulo('O ISS DIMINUI ATÉ **ACABAR EM 2033.**', { s: 80, w: 1020, x: M, y: 290 });
    b += tt.svg;
    b += corpo('Enquanto houver ISS, a retenção municipal continua (em São Paulo, em 7 serviços), sobre a alíquota menor.', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 90 }).svg;
    b += t('PARTE DA ALÍQUOTA ORIGINAL QUE AINDA É COBRADA', { f: 'mono5', s: 20, x: M, y: tt.y + 250, fill: C.ceu, tr: 0.1 });
    const anos = [['ATÉ 2028', 'Cheia'], ['2029', '90%'], ['2030', '80%'], ['2031', '70%'], ['2032', '60%'], ['2033', 'Acaba']];
    let y = tt.y + 280;
    anos.forEach(([a, v], i) => {
      b += fio(y);
      b += t(a, { f: 'mono5', s: 26, x: M, y: y + 64, fill: C.fumaca, tr: 0.08 });
      b += t(v, { f: 'sora7', s: 46, x: W - M, y: y + 68, fill: i === anos.length - 1 ? C.vermelhao : C.cal, a: 'end' });
      y += 98;
    });
    b += fio(y);
    b += rodape(true);
    salvar(5, 'iss', b, 'ISS diminui e acaba');
  }

  // 6 · o que não muda e o que está em aberto
  {
    let b = topo(6);
    const tt = titulo('O QUE **NÃO MUDA** (E O QUE AINDA ESTÁ EM ABERTO).', { s: 64, w: 1020, x: M, y: 270 });
    b += tt.svg;
    const nao = [
      'INSS de 11% na regra geral',
      'IR: o condomínio só retém sobre o salário dos empregados',
      'O condomínio não vai reter CBS nem IBS',
    ];
    let y = tt.y + 90;
    nao.forEach((txt) => {
      b += fio(y);
      b += t('=', { f: 'sora7', s: 40, x: M, y: y + 66, fill: C.ceu });
      b += corpo(txt, { s: 32, lh: 42, w: 900, x: M + 70, y: y + 62, fill: C.cal }).svg;
      y += 120;
    });
    b += fio(y);
    b += t('EM ABERTO', { f: 'mono5', s: 22, x: M, y: y + 90, fill: C.vermelhao, tr: 0.12 });
    const ab = [
      ['FALTA REGULAMENTAR', 'O código de DARF e o ajuste da EFD-Reinf para a CSLL de 1%.'],
      ['CENÁRIO', 'O split payment, que vai cobrar a CBS e o IBS no pagamento. Ainda sem data para ser obrigatório.'],
    ];
    y += 130;
    ab.forEach(([s0, txt]) => {
      b += selo(s0, M, y + 10, C.ceu);
      b += corpo(txt, { s: 30, lh: 40, w: 1000, x: M, y: y + 80 }).svg;
      y += 190;
    });
    b += rodape(true);
    salvar(6, 'nao-muda', b, 'o que não muda');
  }

  // 7 · o que fazer agora
  {
    let b = topo(7);
    const tt = titulo('O QUE FAZER **AGORA.**', { s: 84, w: 1020, x: M, y: 290 });
    b += tt.svg;
    const itens = [
      'Marque os prestadores na desoneração (CPRB)',
      'Prepare os pagamentos de 2027 para reter 1%',
      'Revise contratos que citam "4,65%"',
      'Planeje o fechamento de dezembro de 2026',
      'Acompanhe o código de DARF da CSLL',
      'Não mude o que não mudou',
    ];
    let y = tt.y + 100;
    itens.forEach((txt) => {
      b += fio(y);
      b += `<rect x="${M}" y="${y + 34}" width="38" height="38" rx="4" fill="none" stroke="${C.ceu}" stroke-width="2.5"/>`;
      b += t(txt, { f: 'sans5', s: 36, x: M + 72, y: y + 66, fill: C.cal });
      y += 104;
    });
    b += fio(y);
    b += rodape(true);
    salvar(7, 'checklist', b, 'o que fazer agora');
  }

  // 8 · chamada final
  {
    let b = topo(8);
    b += retrato(foto, { cx: W / 2, cy: 470, r: 200 });
    b += t('Gabriel Alvares', { f: 'sans6', s: 30, x: W / 2, y: 790, fill: C.cal, a: 'middle' });
    b += t('CONTADOR RESPONSÁVEL', { f: 'mono4', s: 18, x: W / 2, y: 824, fill: C.fumaca, a: 'middle', tr: 0.12 });
    const tt = titulo('PREPARE A **VIRADA DE 2027.**', { s: 84, w: 1020, x: M, y: 960 });
    b += tt.svg;
    b += corpo('A tabela completa, com exemplos em reais e as fontes de cada regra, está no nosso blog. **Quer as retenções da sua carteira prontas para cada ano? Fale com a gente.**', { s: 32, lh: 44, w: 1000, x: M, y: tt.y + 84 }).svg;
    b += t('FIREFLIES.COM.BR/BLOG', { f: 'mono5', s: 30, x: M, y: tt.y + 260, fill: C.vermelhao, tr: 0.1 });
    b += rodape(false, false);
    salvar(8, 'chamada', b, 'chamada final');
  }
}
L.flush('comunicados');
