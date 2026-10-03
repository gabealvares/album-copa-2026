// Fireflies v2 · digital (px) · manual 5.5 e 5.6
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const { C, t, para, logo, padrao, rect, line, circle, measure } = L;
const DIR = 'digital/';

// 1 · ASSINATURA DE E-MAIL ------------------------------------------------
// PNG do logo: arte 180 px de largura (exibido a 180×64), exportado em 2× (360×128), fundo transparente
{
  const lg = logo('horizontal', 'digital', { w: 180, x: 2, y: 2 });
  const w = 184, h = Math.ceil(lg.h + 4);
  L.save(DIR + 'img/fireflies-logo-assinatura@2x', { w, h, body: lg.svg, title: 'Fireflies Consultoria · logo para assinatura de e-mail (exibir a 184 px)' });
  // variante para dark mode: placa Branca arredondada
  L.save(DIR + 'img/fireflies-logo-assinatura-placa@2x', { w: w + 16, h: h + 16, body: `<rect width="${w + 16}" height="${h + 16}" rx="10" fill="${C.branco}"/>` + logo('horizontal', 'digital', { w: 180, x: 10, y: 10 }).svg, title: 'Fireflies Consultoria · logo em placa branca (dark mode)' });
  // prévia da assinatura em curvas (a peça "viva" é o HTML)
  const W = 600, H = 250, x = 24;
  let b = line(x, 30, x + 24, 30, C.rubrica, 2);
  b += t('Gabriel Alvares', { f: 'sans6', s: 14, x, y: 52, fill: C.anil });
  b += t('Contador responsável · CRC-SP [nº a confirmar]', { s: 12, x, y: 72, fill: C.pedra });
  b += t('Fireflies Consultoria', { s: 12, x, y: 90, fill: C.fuligem });
  let cx = x;
  [['WhatsApp ', C.fuligem], ['+55 11 98245-0527', C.rubrica], [' · ', C.pedra], ['contato@fireflies.com.br', C.rubrica], [' · ', C.pedra], ['fireflies.com.br', C.rubrica]].forEach(([s, c]) => {
    b += t(s, { s: 12, x: cx, y: 108, fill: c }); cx += measure(s, 'sans4', 12);
  });
  b += t('Precisão que ilumina decisões.', { f: 'sansi', s: 12, x, y: 126, fill: C.pedra });
  b += logo('horizontal', 'digital', { w: 180, x, y: 146 }).svg;
  L.save(DIR + 'assinatura-email_preview', { w: W, h: H, bg: C.branco, body: b, title: 'Fireflies Consultoria · assinatura de e-mail (prévia)' });
  // HTML com tabelas e estilos inline
  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Assinatura de e-mail · Fireflies Consultoria</title></head>
<body style="margin:0;padding:24px;background:#FFFFFF;">
<!-- Copie a tabela abaixo para o campo de assinatura do Gmail/Outlook.
     Troque o src da imagem pelo endereço HTTPS onde o PNG estiver hospedado
     (ex.: https://fireflies.com.br/assinatura/fireflies-logo-assinatura@2x.png). -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;max-width:600px;font-family:'IBM Plex Sans',Arial,Helvetica,sans-serif;">
  <tr><td style="padding:0 0 10px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="24" height="2" style="background:#A9301F;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
  <tr><td style="font-size:14px;line-height:20px;font-weight:bold;color:#17183A;">Gabriel Alvares</td></tr>
  <tr><td style="font-size:12px;line-height:18px;color:#5E6271;">Contador responsável · CRC-SP [nº a confirmar]</td></tr>
  <tr><td style="font-size:12px;line-height:18px;color:#2A2F3D;">Fireflies Consultoria</td></tr>
  <tr><td style="font-size:12px;line-height:18px;color:#2A2F3D;">WhatsApp <a href="https://wa.me/5511982450527" style="color:#A9301F;text-decoration:none;">+55 11 98245-0527</a> · <a href="mailto:contato@fireflies.com.br" style="color:#A9301F;text-decoration:none;">contato@fireflies.com.br</a> · <a href="https://fireflies.com.br" style="color:#A9301F;text-decoration:none;">fireflies.com.br</a></td></tr>
  <tr><td style="font-size:12px;line-height:18px;font-style:italic;color:#5E6271;padding:0 0 12px 0;">Precisão que ilumina decisões.</td></tr>
  <tr><td><a href="https://fireflies.com.br" style="text-decoration:none;"><img src="img/fireflies-logo-assinatura@2x.png" width="184" height="${h}" alt="Fireflies Consultoria" style="display:block;border:0;width:184px;height:${h}px;"></a></td></tr>
</table>
</body></html>
`;
  fs.writeFileSync(path.join(L.OUT, DIR + 'assinatura-email.html'), html);
  console.log('html', DIR + 'assinatura-email.html', (html.length / 1024).toFixed(1) + ' KB');
}

// 2 · OG IMAGE 1200×630 ---------------------------------------------------
{
  const W = 1200, H = 630, M = 60;
  const p = padrao('reticula-celeste-escuro', { lit: C.ceu, k: 0.8 });
  let b = rect(780, 0, W - 780, H, p.fill, ' opacity=".6"');
  b += logo('horizontal', 'digital-negativo', { w: 320, x: M, y: M }).svg;
  b += line(M, 330, M + 40, 330, C.vermelhao, 3);
  b += para('PRECISÃO QUE ILUMINA **DECISÕES.**', { f: 'sora7', s: 60, lh: 66, w: 680, x: M, y: 400, fill: C.cal, tr: 0.02, bf: 'sora7', bfill: C.vermelhao, btr: 0.02 }).svg;
  b += t('Consultoria financeira, contábil e fiscal · São Paulo', { s: 26, x: M, y: 540, fill: C.fumaca });
  b += t('FIREFLIES.COM.BR', { f: 'mono5', s: 18, x: M, y: H - M + 10, fill: C.fumaca, tr: 0.12 });
  L.save(DIR + 'og-image_1200x630', { w: W, h: H, bg: C.anil, body: b, defs: p.def, title: 'Fireflies Consultoria · imagem de compartilhamento (OG)' });
}

// 3 · CAPA DO LINKEDIN 4200×700 e 1128×191 ----------------------------------
function capaLinkedin() {
  const p = padrao('reticula-celeste-escuro', { lit: C.ceu, k: 1.6 });
  let b = rect(0, 0, 4200, 700, p.fill, ' opacity=".3"');
  b += line(2250, 215, 2330, 215, C.vermelhao, 6);
  b += t('LUZ MEDIDA.', { f: 'sora7', s: 160, x: 2240, y: 400, fill: C.cal, tr: 0.03 });
  b += t('CONSULTORIA FINANCEIRA, CONTÁBIL E FISCAL · SÃO PAULO', { f: 'mono5', s: 34, x: 2250, y: 490, fill: C.fumaca, tr: 0.1 });
  return { b, def: p.def };
}
{
  const c = capaLinkedin();
  L.save(DIR + 'linkedin-capa_4200x700', { w: 4200, h: 700, bg: C.anil, body: c.b, defs: c.def, scale: 1, title: 'Fireflies Consultoria · capa da página no LinkedIn' });
  const c2 = capaLinkedin(), k = 1128 / 4200;
  L.save(DIR + 'linkedin-capa_1128x191', { w: 1128, h: 191, bg: C.anil, body: `<g transform="translate(0 ${(191 - 700 * k) / 2}) scale(${k})">${c2.b}</g>`, defs: c2.def, title: 'Fireflies Consultoria · capa do LinkedIn (tamanho mínimo)' });
}

// 4 · AVATAR 1080 -----------------------------------------------------------
{
  const W = 1080;
  let b = ""; // símbolo dentro do círculo de 70 % (r 378)
  const sb = logo('simbolo', 'digital-negativo', { w: 690 });
  b += logo('simbolo', 'digital-negativo', { w: 690, x: 540 - 345, y: 540 - sb.h / 2 }).svg;
  L.save(DIR + 'avatar_1080', { w: W, h: W, bg: C.anil, body: b, title: 'Fireflies Consultoria · avatar (F em órbita)' });
}

// 5 · FUNDO DE ZOOM / MEET 1920×1080 ----------------------------------------
{
  const W = 1920, H = 1080;
  const p = padrao('campo-estrelas-escuro', { lit: C.ceu, k: 1.4 });
  let b = rect(0, 0, W, H, p.fill, ' opacity=".55"');
  b += rect(0, H - 120, W, 120, C.profundo);
  b += logo('horizontal', 'digital-negativo', { w: 300, x: W - 72 - 300, y: 64 }).svg;
  b += line(72, H - 60, 102, H - 60, C.vermelhao, 2);
  b += t('FIREFLIES CONSULTORIA · AUDITORIA DE CONDOMÍNIOS E CONSULTORIA CONTÁBIL · FIREFLIES.COM.BR', { f: 'mono5', s: 18, x: 118, y: H - 54, fill: C.fumaca, tr: 0.12 });
  L.save(DIR + 'fundo-videochamada_1920x1080', { w: W, h: H, bg: C.anil, body: b, defs: p.def, scale: 1, title: 'Fireflies Consultoria · fundo para Zoom / Meet / Teams' });
}
L.flush('digital');
