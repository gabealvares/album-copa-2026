// Fireflies Consultoria · exporta todas as aplicações (PNG e PDF) com Playwright.
// Uso: node render.js            (tudo)
//      node render.js cartao     (só as peças cujo arquivo contém "cartao")
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DPI_IMPRESSO = 300 / 96; // escala dos PNGs de prova dos impressos (~300 dpi)

// Peças de tela: um HTML = um PNG no tamanho exato.
// Peças com "partes": cada seletor vira um PNG (screenshot do elemento).
// Impressos: "pdf" com tamanho da página em mm (já com sangria) e PNG de prova recortado na linha de corte.
const PECAS = [
  { src: 'redes/post-manifesto.html', w: 1080, h: 1350 },
  { src: 'redes/post-dado.html', w: 1080, h: 1350 },
  { src: 'redes/post-dica-sindico.html', w: 1080, h: 1350 },
  { src: 'redes/carrossel-01-capa.html', w: 1080, h: 1350 },
  { src: 'redes/carrossel-02-interna.html', w: 1080, h: 1350 },
  { src: 'redes/story.html', w: 1080, h: 1920 },
  { src: 'redes/linkedin-capa.html', w: 4200, h: 700 },
  { src: 'redes/linkedin-post.html', w: 1200, h: 1200 },
  { src: 'web/og-image.html', w: 1200, h: 630 },
  { src: 'web/_logo-assinatura.html', w: 180, h: 47, scale: 2, out: 'web/img/fireflies-logo-assinatura@2x.png', transparent: true },
  { src: 'web/assinatura-email.html', w: 640, h: 300, scale: 2, out: 'web/assinatura-email-preview.png', full: true },
  { src: 'apresentacao/slides-mestre.html', w: 1920, h: 1080, partes: [
      ['#s1', 'apresentacao/slide-01-capa.png'], ['#s2', 'apresentacao/slide-02-divisor.png'],
      ['#s3', 'apresentacao/slide-03-conteudo-dado.png'], ['#s4', 'apresentacao/slide-04-encerramento.png']],
    pdf: { w: '1920px', h: '1080px', out: 'apresentacao/slides-mestre.pdf' } },
  { src: 'papelaria/cartao-visita.html', w: 400, h: 500, print: true, partes: [
      ['#frente .corte', 'papelaria/cartao-visita-frente.png'], ['#verso .corte', 'papelaria/cartao-visita-verso.png']],
    pdf: { w: '96mm', h: '56mm', out: 'papelaria/cartao-visita_96x56mm_sangria3mm.pdf' } },
  { src: 'papelaria/papel-timbrado.html', w: 800, h: 1200, print: true, partes: [['.folha .corte', 'papelaria/papel-timbrado.png']],
    pdf: { w: '210mm', h: '297mm', out: 'papelaria/papel-timbrado_A4.pdf' } },
  { src: 'papelaria/capa-relatorio-auditoria.html', w: 900, h: 1200, print: true, partes: [['.folha .corte', 'papelaria/capa-relatorio-auditoria.png']],
    pdf: { w: '216mm', h: '303mm', out: 'papelaria/capa-relatorio-auditoria_A4_sangria3mm.pdf' } },
  { src: 'papelaria/certificado-academy.html', w: 1200, h: 900, print: true, partes: [['.folha .corte', 'papelaria/certificado-academy.png']],
    pdf: { w: '303mm', h: '216mm', out: 'papelaria/certificado-academy_A4-paisagem_sangria3mm.pdf' } },
  { src: 'mockups.html', w: 3200, h: 2400, out: 'mockups.png', full: true },
];

(async () => {
  const filtro = process.argv[2];
  const browser = await chromium.launch();
  for (const p of PECAS) {
    if (filtro && !p.src.includes(filtro) && !(p.out || '').includes(filtro)) continue;
    const scale = p.scale || (p.print ? DPI_IMPRESSO : 1);
    const page = await browser.newPage({ viewport: { width: p.w, height: p.h }, deviceScaleFactor: scale });
    await page.goto('file://' + path.join(ROOT, p.src));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => window.FF_READY !== false && [...document.images].every(i => i.complete));
    await page.waitForTimeout(150);
    if (p.partes) {
      for (const [sel, out] of p.partes) {
        await page.locator(sel).first().screenshot({ path: path.join(ROOT, out) });
        console.log('png', out);
      }
    } else {
      const out = p.out || p.src.replace(/\.html$/, '.png');
      await page.screenshot({ path: path.join(ROOT, out), fullPage: !!p.full, omitBackground: !!p.transparent });
      console.log('png', out);
    }
    if (p.pdf) {
      await page.pdf({ path: path.join(ROOT, p.pdf.out), width: p.pdf.w, height: p.pdf.h, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
      console.log('pdf', p.pdf.out);
    }
    await page.close();
  }
  await browser.close();
})();
