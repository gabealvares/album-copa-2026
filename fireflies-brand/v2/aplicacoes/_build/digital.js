// Fireflies v2 · digital (px) · manual 5.5 e 5.6
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const { C, t, para, logo, emb, padrao, rect, line, circle, measure } = L;
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
  b += t('Contador responsável', { s: 12, x, y: 72, fill: C.pedra });
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
  <tr><td style="font-size:12px;line-height:18px;color:#5E6271;">Contador responsável</td></tr>
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

// 3 · CAPAS DO LINKEDIN (sem logo) ------------------------------------------
// Empresa: 4200×700 (envio) e 1128×191 (mínimo). Perfil pessoal: 1584×396.
// "Nada trabalha sozinho": as 8 constelações dos serviços num fio que esquenta até um único ponto de luz,
// e a assinatura LUZ MEDIDA. à direita. O canto inferior esquerdo fica livre (logo da página ou foto do perfil).
function capaLinkedin(W, H) {
  const u = H / 700;
  const p = padrao('reticula-celeste-escuro', { lit: C.ceu, k: 1.6 * u });
  let b = rect(0, 0, W, H, p.fill, ' opacity=".3"');
  const tx = W * 0.56;                               // início do texto
  const cy = H * 0.40;                               // linha do fio
  const servs = [['contabil', 'CONTÁBIL'], ['fiscal', 'FISCAL'], ['financeira', 'FINANCEIRA'], ['auditoria', 'AUDITORIA'],
    ['processos', 'PROCESSOS'], ['sindicancia', 'SINDICÂNCIA'], ['condominios', 'CONDOMÍNIOS'], ['academy', 'ACADEMY']];
  const x0 = W * 0.16, x1 = tx - 150 * u, passo = (x1 - x0) / servs.length;
  const s = Math.min(136 * u, passo * 0.72);
  const rotulos = passo / u > 150;                   // nomes dos serviços só quando cabem (na capa do perfil, não)
  // fio: frio à esquerda, esquenta até o ponto de luz antes do texto
  const gid = 'capa-fio-' + W;
  b += `<defs><linearGradient id="${gid}" x1="0" x2="${x1 + 60 * u}" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${C.ceu}" stop-opacity="0"/><stop offset="0.55" stop-color="${C.ceu}" stop-opacity=".7"/><stop offset="0.85" stop-color="${C.vermelhao}"/><stop offset="1" stop-color="${C.ambar}"/></linearGradient></defs>`;
  b += `<path d="M0 ${cy} L${x1 + 60 * u} ${cy}" stroke="url(#${gid})" stroke-width="${2.2 * u}" fill="none"/>`;
  servs.forEach(([f, nome], i) => {
    const cx = x0 + passo * (i + 0.5);
    b += rect(cx - s / 2 - 8 * u, cy - s / 2 - 8 * u, s + 16 * u, s + 16 * u, C.anil);
    b += emb(f + '-sem-letras', { x: cx - s / 2, y: cy - s / 2, s, c: C.cal, lit: C.cal, line: C.ceu });
    if (rotulos) b += t(nome, { f: 'mono5', s: 20 * u, x: cx, y: cy + s / 2 + 48 * u, fill: C.fumaca, a: 'middle', tr: 0.12 });
  });
  // a luz: um único ponto âmbar, com halo
  const lx = x1 + 60 * u;
  b += `<defs><radialGradient id="${gid}-h"><stop offset="0" stop-color="${C.ambar}" stop-opacity=".5"/><stop offset=".4" stop-color="${C.ambar}" stop-opacity=".15"/><stop offset="1" stop-color="${C.ambar}" stop-opacity="0"/></radialGradient></defs>`;
  b += `<circle cx="${lx}" cy="${cy}" r="${70 * u}" fill="url(#${gid}-h)"/>` + circle(lx, cy, 11 * u, C.ambar);
  // assinatura
  b += line(tx + 6 * u, H * 0.27, tx + 86 * u, H * 0.27, C.vermelhao, 6 * u);
  b += t('LUZ MEDIDA.', { f: 'sora7', s: 160 * u, x: tx, y: H * 0.27 + 175 * u, fill: C.cal, tr: 0.03 });
  b += t('Precisão que ilumina decisões.', { f: 'sans4', s: 46 * u, x: tx + 6 * u, y: H * 0.27 + 260 * u, fill: C.cal });
  b += t('WWW.FIREFLIES.COM.BR  ·  SÃO PAULO', { f: 'mono5', s: 28 * u, x: tx + 6 * u, y: H * 0.27 + 330 * u, fill: C.fumaca, tr: 0.12 });
  return { b, def: p.def };
}
for (const [W, H, nome, tit, sc] of [[4200, 700, 'linkedin-capa_4200x700', 'capa da página da empresa no LinkedIn', 1],
  [1128, 191, 'linkedin-capa_1128x191', 'capa da página da empresa no LinkedIn (tamanho mínimo)', 2],
  [1584, 396, 'linkedin-capa-perfil_1584x396', 'capa do perfil pessoal no LinkedIn', 2]]) {
  const c = capaLinkedin(W, H);
  L.save(DIR + nome, { w: W, h: H, bg: C.anil, body: c.b, defs: c.def, scale: sc, title: 'Fireflies Consultoria · ' + tit });
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
