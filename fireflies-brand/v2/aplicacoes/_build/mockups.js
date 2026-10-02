// Fireflies v2 · prancha-resumo de todas as aplicações → aplicacoes/mockups.png
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const OUT = path.resolve(__dirname, '..');
const LOGO = path.resolve(__dirname, '../../logo/svg/fireflies_horizontal_digital-negativo.svg');

const G = [
  ['01', 'Apresentação 16:9', 260, ['apresentacao/slide-01-capa-escura', 'apresentacao/slide-02-capa-clara', 'apresentacao/slide-03-divisor', 'apresentacao/slide-04-conteudo', 'apresentacao/slide-05-dados', 'apresentacao/slide-06-citacao', 'apresentacao/slide-07-tabela', 'apresentacao/slide-08-encerramento']],
  ['02', 'Documentos A4', 420, ['documentos/papel-timbrado_A4-sangria3mm', 'documentos/proposta-comercial_01-capa', 'documentos/proposta-comercial_02-interna', 'documentos/relatorio-auditoria_01-capa', 'documentos/relatorio-auditoria_01-capa-escritorio', 'documentos/relatorio-auditoria_02-interna', 'documentos/parecer-tecnico_A4']],
  ['03', 'Papelaria', 330, ['papelaria/cartao-visita_frente', 'papelaria/cartao-visita_verso', 'papelaria/envelope-dl_frente', 'papelaria/pasta-A4_frente', 'papelaria/cracha_54x86mm', 'papelaria/certificado-academy_A4-paisagem']],
  ['04', 'Digital', 300, ['digital/og-image_1200x630', 'digital/avatar_1080', 'digital/fundo-videochamada_1920x1080', 'digital/assinatura-email_preview', 'digital/linkedin-capa_4200x700']],
  ['05', 'Redes sociais', 400, ['redes/instagram_01-manifesto', 'redes/instagram_02-dado', 'redes/instagram_03-dica-sindico', 'redes/carrossel_01-capa', 'redes/carrossel_02-interna', 'redes/carrossel_03-interna', 'redes/story_1080x1920', 'redes/linkedin-post_1200x1200', 'redes/linkedin-post_1200x627']],
  ['06', 'Ambientação e brindes', 360, ['ambientacao/placa-fachada_600x300mm', 'ambientacao/selo-contas-auditadas_digital-1080', 'ambientacao/mockup-caneca', 'ambientacao/mockup-camiseta']],
];
const nome = r => r.split('/')[1].replace(/_/g, ' · ').replace(/-/g, ' ');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Mono;src:url('file://${__dirname}/fonts/IBMPlexMono-500-normal.ttf')}
@font-face{font-family:Sora;src:url('file://${__dirname}/fonts/Sora-700-normal.ttf')}
body{margin:0;background:#EDEEEA;width:3200px;font-family:Mono}
.top{background:#17183A;color:#EDEEEA;padding:80px 100px;display:flex;justify-content:space-between;align-items:flex-end}
.top h1{font:700 64px Sora;letter-spacing:.03em;margin:0} .top p{font:500 20px Mono;letter-spacing:.12em;color:#D2D4DA;margin:16px 0 0}
.top img{width:420px}
section{padding:56px 100px 20px}
h2{font:500 20px Mono;letter-spacing:.14em;color:#A9301F;margin:0 0 24px;text-transform:uppercase}
h2 b{color:#17183A;margin-right:16px}
.row{display:flex;flex-wrap:wrap;gap:28px 28px;align-items:flex-end}
figure{margin:0;display:flex;flex-direction:column;align-items:flex-start}
figure img{display:block;outline:1px solid #D2D4DA;background:repeating-conic-gradient(#fff 0 25%,#f4f4f2 0 50%) 0 0/16px 16px}
figcaption{font:500 13px Mono;color:#5E6271;letter-spacing:.06em;margin-top:10px;text-transform:uppercase}
.rod{padding:40px 100px 70px;font:500 16px Mono;color:#5E6271;letter-spacing:.1em}
</style></head><body>
<div class="top"><div><h1>APLICAÇÕES DA MARCA</h1><p>FIREFLIES CONSULTORIA · IDENTIDADE V2 "ÓRBITA DO VAGALUME" · SVG EM CURVAS + PNG + PDF</p></div><img src="file://${LOGO}"></div>
${G.map(([n, tit, h, itens]) => `<section><h2><b>${n}</b>${tit}</h2><div class="row">${itens.map(r => `<figure><img src="file://${path.join(OUT, r + '.png')}" style="height:${r.includes('linkedin-capa') ? 120 : r.includes('assinatura') ? 200 : r.includes('1200x627') ? 260 : h}px"><figcaption>${nome(r)}</figcaption></figure>`).join('')}</div></section>`).join('')}
<div class="rod">LUZ MEDIDA. · NÚMEROS MARCADOS "DADOS DE EXEMPLO" SÃO FICTÍCIOS · CRC-SP E CNPJ A CONFIRMAR</div>
</body></html>`;
(async () => {
  const f = path.join(__dirname, 'manifesto', '_mockups.html');
  fs.writeFileSync(f, html);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 3200, height: 1000 } });
  await p.goto('file://' + f);
  await p.waitForFunction(() => [...document.images].every(i => i.complete));
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(OUT, 'mockups.png'), fullPage: true });
  await b.close();
  console.log('png mockups.png');
})();
