// Fireflies v2 · versões HTML EDITÁVEIS (texto vivo, contenteditable) do deck e dos documentos.
// Os grafismos (logo, emblemas, gráfico, padrões) entram como SVG inline gerado pela mesma lib;
// o texto é HTML com Sora / IBM Plex Sans / IBM Plex Mono (Google Fonts + cópia local em fonts/).
// Para exportar PDF: abra no Chrome → Imprimir → Salvar como PDF (margens: nenhuma; gráficos de fundo: ligado).
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const { C, logo, icon, emb, padrao, rect, line, circle, qr } = L;

function copiaFontes(dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(path.join(L.BUILD, 'fonts'))) fs.copyFileSync(path.join(L.BUILD, 'fonts', f), path.join(dest, f));
}
const FONT_CSS = `
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
@font-face{font-family:'Sora';src:url('fonts/Sora-600-normal.ttf');font-weight:600}
@font-face{font-family:'Sora';src:url('fonts/Sora-700-normal.ttf');font-weight:700}
@font-face{font-family:'IBM Plex Sans';src:url('fonts/IBMPlexSans-400-normal.ttf');font-weight:400}
@font-face{font-family:'IBM Plex Sans';src:url('fonts/IBMPlexSans-500-normal.ttf');font-weight:500}
@font-face{font-family:'IBM Plex Sans';src:url('fonts/IBMPlexSans-600-normal.ttf');font-weight:600}
@font-face{font-family:'IBM Plex Sans';src:url('fonts/IBMPlexSans-400-italic-var.ttf');font-style:italic}
@font-face{font-family:'IBM Plex Mono';src:url('fonts/IBMPlexMono-400-normal.ttf');font-weight:400}
@font-face{font-family:'IBM Plex Mono';src:url('fonts/IBMPlexMono-500-normal.ttf');font-weight:500}
:root{--anil:#17183A;--profundo:#0F1029;--cal:#EDEEEA;--branco:#FFFFFF;--ambar:#F2B544;--vermelhao:#E65A3E;--rubrica:#A9301F;--ceu:#6E89B4;--fuligem:#2A2F3D;--pedra:#5E6271;--fumaca:#D2D4DA;--sucesso:#2D7550;--alerta:#9A5A06;--erro:#A51C45;
--display:'Sora','Century Gothic',Arial,sans-serif;--sans:'IBM Plex Sans',Arial,sans-serif;--mono:'IBM Plex Mono',Consolas,monospace}
[contenteditable]:hover{outline:1px dashed rgba(110,137,180,.6);outline-offset:4px}
[contenteditable]:focus{outline:1px solid #6E89B4;outline-offset:4px}
@media print{[contenteditable]:hover,[contenteditable]:focus{outline:none}.aviso{display:none}}
.aviso{font:13px/1.4 var(--mono);background:#FFF8E5;color:#2A2F3D;padding:10px 16px;border-bottom:1px solid #D2D4DA}
</style>`;
const svgLayer = (w, h, body, defs = '', unit = '') => `<svg class="g" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}${unit}" height="${h}${unit}" aria-hidden="true">${defs ? `<defs>${defs}</defs>` : ''}${body}</svg>`;
const E = 'contenteditable';

// =====================================================================
// APRESENTAÇÃO
// =====================================================================
{
  const DEST = path.join(L.OUT, 'apresentacao/editavel');
  copiaFontes(path.join(DEST, 'fonts'));
  const lgH = logo('horizontal', 'digital', { w: 360 }).h;
  const S = [];
  const rod = (n, escuro, simbolo = true) => {
    const sb = logo('simbolo', escuro ? 'digital-negativo' : 'digital', { h: 32, x: 1824 - 80, y: 1026 });
    return { g: simbolo ? sb.svg : '', h: `<div class="rod ${escuro ? 'esc' : ''}"><span ${E}>FIREFLIES CONSULTORIA · AUDITORIA DAS CONTAS 2026</span><span style="margin-right:${simbolo ? 104 : 0}px">0${n} / 08</span></div>` };
  };
  // 1 capa escura
  S.push({ cls: 'escuro', g: emb('condominios', { x: 1324, y: 170, s: 460, c: C.cal, lit: C.cal, line: C.ceu }) + logo('horizontal', 'digital-negativo', { w: 360, x: 96, y: 1008 - lgH }).svg, h: `
    <p class="ey esc" ${E}>Apresentação ao conselho · Auditoria de condomínios</p>
    <h1 class="capa" style="top:520px;color:var(--cal)" ${E}>AUDITORIA DAS CONTAS <em>2026</em></h1>
    <p class="sub" style="top:700px;color:var(--fumaca)" ${E}>Resultado do 1º semestre, apresentado ao conselho fiscal.</p>
    <p class="meta" style="top:785px;color:var(--fumaca)" ${E}>CONDOMÍNIO EDIFÍCIO JACARANDÁ · 14/10/2026</p>
    <p class="assin" style="color:var(--cal)" ${E}>LUZ MEDIDA.</p>` });
  // 2 capa clara
  { const p = padrao('reticula-celeste-claro', { lit: C.anil });
    S.push({ cls: 'cal', defs: p.def, g: rect(1264, 0, 656, 1080, p.fill, ' opacity=".55"') + rect(1263, 0, 1, 1080, C.fumaca) + logo('horizontal', 'digital', { w: 360, x: 96, y: 1008 - lgH }).svg, h: `
    <p class="ey" ${E}>Proposta · Consultoria contábil para empresas</p>
    <h1 class="capa" style="top:490px;width:1000px" ${E}>CONTABILIDADE QUE <em>VOCÊ LÊ</em></h1>
    <p class="sub" style="top:665px;width:850px" ${E}>Todo mês, em dois minutos, você sabe o que mudou, o que preocupa e o que já está resolvido.</p>
    <p class="meta" style="top:800px" ${E}>PREPARADO PARA ORLA ARQUITETURA LTDA · 02/10/2026</p>
    <p class="assin" style="right:704px" ${E}>LUZ MEDIDA.</p>` }); }
  // 3 divisor
  S.push({ cls: 'escuro', g: emb('auditoria', { x: 1338, y: 230, s: 520, c: C.cal, lit: C.ambar, line: C.ceu }) + line(96, 462, 160, 462, C.ceu, 1.5), h: `
    <p class="num" ${E}>02 / 05</p>
    <h2 class="div" ${E}>COMO MEDIMOS</h2>
    <p class="sub" style="top:600px;color:var(--fumaca);width:1000px" ${E}>Quatro frentes conciliadas todo mês, com um responsável que assina.</p>` });
  // 4 conteúdo
  { const r = rod(4, false); let g = r.g; const x0 = 1288;
    [['conciliacao', 300], ['rateio', 490], ['prestacao-contas', 680]].forEach(([ic, y], i) => { if (i) g += line(x0, y - 40, 1824, y - 40, C.fumaca, 1); g += icon(ic, { x: x0, y: y - 6, s: 64, c: C.anil }); });
    S.push({ cls: 'branco', g, h: `
    <p class="ey" ${E}>O que a auditoria cobre</p>
    <h2 class="tit" ${E}>QUATRO FRENTES, UM RESPONSÁVEL</h2>
    <div class="corpo" style="top:292px;width:850px" ${E}><p>Sozinhas, contabilidade, fiscal, financeiro e auditoria funcionam cada uma no seu ritmo. É aí que aparecem o imposto em dobro, o rateio que não fecha e a inadimplência que ninguém viu.</p><p>A Fireflies Consultoria concilia as quatro frentes todo mês e entrega <strong>um painel explicado em reunião</strong>, assinado pelo contador responsável.</p></div>
    ${[['Conciliação bancária', 'Cada lançamento com origem, posição e responsável.', 300], ['Rateio e fundo de reserva', 'Conferimos se a taxa paga o que deveria pagar.', 490], ['Relatório para o conselho', 'Achados numerados, com estado e solução.', 680]].map(([a, b, y]) => `<div class="item" style="top:${y - 16}px" ${E}><b>${a}</b><span>${b}</span></div>`).join('')}
    ${r.h}` }); }
  // 5 dados
  { const r = rod(5, false, false);
    const gx = 740, gw = 1084, gy = 280, gh = 560, max = 10; const pm = padrao('matriz-pontos-claro', { lit: C.anil });
    let g = rect(gx, gy, gw, gh, pm.fill, ' opacity=".35"');
    for (let v = 0; v <= max; v += 2) { const y = gy + gh - v / max * gh; g += line(gx, y, gx + gw, y, C.fumaca, v ? 1 : 1.5) + L.t(v + '%', { f: 'mono4', s: 15, x: gx - 14, y: y + 5, fill: C.pedra, a: 'end' }); }
    const m25 = [7.6, 7.9, 8.0, 8.3, 8.5, 8.7, 8.9, 9.0, 9.2], m26 = [9.4, 9.1, 8.8, 8.3, 7.9, 7.2, 6.8, 6.5, 6.1], ms = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET'];
    const cw = gw / 9, bw = cw * 0.22;
    ms.forEach((m, i) => { const cx = gx + cw * i + cw / 2; g += rect(cx - bw - 3, gy + gh - m25[i] / max * gh, bw, m25[i] / max * gh, C.ceu); g += rect(cx + 3, gy + gh - m26[i] / max * gh, bw, m26[i] / max * gh, i === 8 ? C.ambar : C.anil, i === 8 ? ` stroke="${C.anil}" stroke-width="2"` : ''); g += L.t(m, { f: 'mono4', s: 15, x: cx, y: gy + gh + 30, fill: C.pedra, a: 'middle' }); });
    g += L.t('6,1%', { f: 'mono5', s: 19, x: gx + cw * 8.5 + 3 + bw / 2, y: gy + gh - 61 / 100 * gh - 14, fill: C.anil, a: 'middle' });
    S.push({ cls: 'branco', defs: pm.def, g, h: `
    <p class="ey" ${E}>Inadimplência · 01/2026–09/2026</p>
    <h2 class="tit" ${E}>INADIMPLÊNCIA CAIU PARA <em>6,1%</em></h2>
    <p class="kpi" ${E}>6,1<small>%</small></p>
    <p class="kpis" ${E}>em setembro; era 9,4% em janeiro</p>
    <div class="corpo" style="top:525px;width:540px" ${E}><p>Três unidades concentravam 70% da dívida. Com acordo e cobrança mensal, duas voltaram a pagar em dia.</p></div>
    <p class="tag" style="top:842px;left:96px">DADOS DE EXEMPLO</p>
    <p class="fonte" style="left:740px;top:898px" ${E}>Fonte: balancetes mensais do condomínio, 01/2025–09/2026. Gráfico: edite os valores em _build/apresentacao.js e regenere.</p>
    ${r.h}` }); }
  // 6 citação
  { const r = rod(6, false);
    S.push({ cls: 'cal', g: r.g + line(242, 330, 306, 330, C.rubrica, 3), h: `
    <blockquote ${E}>“Os números de um condomínio são muitos pontos, cada um piscando sozinho. A gente mede, nomeia e coloca cada ponto no lugar.”</blockquote>
    <p class="meta" style="left:242px;top:${430 + 2 * 62 + 66}px" ${E}>GABRIEL ALVARES · CONTADOR RESPONSÁVEL, FIREFLIES CONSULTORIA</p>
    ${r.h}` }); }
  // 7 tabela
  { const r = rod(7, false);
    const rows = [['A-01', 'Fundo de reserva usado para pagar despesa ordinária (fev. e abr.)', '38.900,00', 'Crítico', 'erro', 'alerta'], ['A-02', 'Rateio de água sem conferência das leituras individuais', '12.480,00', 'Atenção', 'alerta', 'alerta'], ['A-03', 'Notas de manutenção sem retenção de ISS', '4.215,60', 'Atenção', 'alerta', 'alerta'], ['A-04', 'Conciliação bancária de janeiro a junho', '0,00', 'Em dia', 'sucesso', 'check']];
    const ic = (n, c) => `<svg width="30" height="30" viewBox="0 0 30 30">${icon(n, { x: 0, y: 0, s: 30, c })}</svg>`;
    S.push({ cls: 'branco', g: r.g, h: `
    <p class="ey" ${E}>Achados · relatório parcial 01/2026–06/2026</p>
    <h2 class="tit" ${E}>TRÊS ACHADOS PEDEM <em>AÇÃO</em></h2>
    <table class="tb" ${E}><thead><tr><th>Nº</th><th>ACHADO</th><th class="n">VALOR (R$)</th><th>ESTADO</th></tr></thead><tbody>
    ${rows.map(r => `<tr><td class="id">${r[0]}</td><td>${r[1]}</td><td class="n">${r[2]}</td><td class="est" style="color:var(--${r[4]})">${ic(r[5], C[r[4]])}${r[3]}</td></tr>`).join('')}
    </tbody><tfoot><tr><td></td><td>Total apontado</td><td class="n">55.595,60</td><td></td></tr></tfoot></table>
    <p class="fonte" style="left:96px;top:820px" ${E}>Fonte: extratos bancários, notas fiscais e livro-caixa, 01/2026–06/2026.</p>
    <p class="tag" style="top:806px;right:96px">DADOS DE EXEMPLO</p>
    ${r.h}` }); }
  // 8 encerramento
  S.push({ cls: 'escuro', g: logo('horizontal', 'digital-negativo', { w: 360, x: 96, y: 1008 - lgH }).svg + line(1264, 650, 1824, 650, C.ceu, 1), h: `
    <p class="ey esc" ${E}>Próximo passo</p>
    <h1 class="capa" style="top:262px;width:1100px;color:var(--cal)" ${E}>30 DIAS ATÉ A<br><em>PRIMEIRA LUZ.</em></h1>
    <p class="sub" style="top:470px;width:900px;color:var(--fumaca)" ${E}>Diagnóstico gratuito. Em 30 dias, o primeiro painel do condomínio, explicado em reunião e assinado pelo contador responsável.</p>
    <dl class="contato" ${E}><dt>WHATSAPP</dt><dd>+55 11 98245-0527</dd><dt>E-MAIL</dt><dd>contato@fireflies.com.br</dd><dt>SITE</dt><dd>fireflies.com.br</dd></dl>
    <p class="meta" style="left:1264px;top:675px;color:var(--cal)" ${E}>GABRIEL ALVARES<br><span style="color:var(--fumaca)">CONTADOR RESPONSÁVEL</span></p>` });

  const css = `<style>
  @page{size:1920px 1080px;margin:0}
  html,body{margin:0;background:#8a8c94}
  .slide{position:relative;width:1920px;height:1080px;overflow:hidden;margin:0 auto 24px;font-family:var(--sans);break-after:page}
  .slide:last-child{break-after:auto}
  @media print{html,body{background:none}.slide{margin:0}}
  .slide .g{position:absolute;inset:0}
  .slide>*:not(.g){position:absolute;margin:0}
  .escuro{background:var(--anil);color:var(--cal)} .cal{background:var(--cal);color:var(--fuligem)} .branco{background:var(--branco);color:var(--fuligem)}
  em{font-style:normal;color:var(--rubrica)} .escuro em{color:var(--vermelhao)}
  .ey{left:96px;top:80px;font:500 15px/20px var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--rubrica);padding-left:56px}
  .ey::before{content:"";position:absolute;left:0;top:9px;width:40px;height:2px;background:currentColor}
  .ey.esc{color:var(--fumaca)} .ey.esc::before{background:var(--vermelhao)}
  h1.capa{left:96px;width:1144px;font:700 72px/78px var(--display);letter-spacing:.02em;color:var(--anil)}
  h2.div{left:96px;top:500px;font:700 58px/1 var(--display);letter-spacing:.03em;color:var(--cal)}
  .num{left:96px;top:405px;font:500 28px/1 var(--mono);letter-spacing:.08em;color:var(--vermelhao)}
  h2.tit{left:96px;top:130px;font:600 38px/1.1 var(--display);letter-spacing:.04em;color:var(--anil)}
  .sub{left:96px;width:1100px;font:400 28px/38px var(--sans);color:var(--fuligem)}
  .meta{left:96px;font:400 15px/28px var(--mono);letter-spacing:.12em;color:var(--pedra)}
  .assin{right:96px;bottom:72px;font:600 24px/1 var(--display);letter-spacing:.08em;color:var(--anil)}
  .corpo{left:96px;font:400 24px/34px var(--sans);color:var(--fuligem)} .corpo p{margin:0 0 34px} .corpo strong{color:var(--rubrica);font-weight:600}
  .item{left:1388px;width:436px} .item b{display:block;font:600 26px/32px var(--sans);color:var(--anil)} .item span{display:block;font:400 22px/30px var(--sans);color:var(--pedra);margin-top:8px}
  .kpi{left:90px;top:300px;font:700 128px/1 var(--display);color:var(--rubrica)} .kpi small{font:500 51px var(--mono);margin-left:4px}
  .kpis{left:96px;top:445px;font:500 22px/1 var(--sans);color:var(--fuligem)}
  .tag{font:500 14px/1 var(--mono);letter-spacing:.1em;color:var(--pedra);border:1px solid var(--pedra);border-radius:4px;padding:5px 8px}
  .fonte{font:400 12px/1.4 var(--mono);color:var(--pedra)}
  blockquote{left:242px;top:384px;width:1290px;font:italic 400 46px/62px var(--sans);color:var(--anil)}
  .rod{left:96px;right:96px;bottom:18px;display:flex;justify-content:space-between;font:400 12px/1 var(--mono);letter-spacing:.08em;color:var(--pedra)} .rod.esc{color:var(--fumaca)}
  table.tb{left:96px;top:280px;width:1728px;border-collapse:collapse;font:400 24px/1.2 var(--sans);color:var(--fuligem)}
  .tb th{font:500 15px/1 var(--mono);letter-spacing:.12em;color:var(--anil);text-align:left;padding:0 0 12px;border-bottom:1.5px solid var(--anil)}
  .tb td{height:91px;border-bottom:1px solid var(--fumaca);vertical-align:middle} .tb .n{text-align:right;font-family:var(--mono);padding-right:120px} .tb th.n{padding-right:120px}
  .tb .id{font:500 22px var(--mono);color:var(--anil);width:135px} .tb .est{font:600 22px var(--sans);width:270px} .tb .est svg{vertical-align:-6px;margin-right:12px}
  .tb tfoot td{border-top:1.5px solid var(--anil);border-bottom:0;font-weight:600;color:var(--anil);height:80px} .tb tfoot .n{font-weight:500}
  dl.contato{left:1264px;top:282px;margin:0} .contato dt{font:500 15px/1 var(--mono);letter-spacing:.12em;color:var(--fumaca)} .contato dd{margin:12px 0 60px;font:500 32px/1 var(--sans);color:var(--cal)}
  </style>`;
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Apresentação · Fireflies Consultoria (template editável)</title>${FONT_CSS}${css}</head><body>
<div class="aviso">Template editável · clique em qualquer texto para editar · Ctrl/Cmd+P → Salvar como PDF (margens: nenhuma, gráficos de fundo ligados). Grafismos e gráfico são SVG; para mudar dados, edite _build/apresentacao.js.</div>
${S.map((s, i) => `<section class="slide ${s.cls}" id="s${i + 1}">${svgLayer(1920, 1080, s.g, s.defs)}${s.h}</section>`).join('\n')}
</body></html>`;
  fs.writeFileSync(path.join(DEST, 'apresentacao-editavel.html'), html);
  console.log('html apresentacao/editavel/apresentacao-editavel.html');
}

// =====================================================================
// DOCUMENTOS A4
// =====================================================================
{
  const DEST = path.join(L.OUT, 'documentos/editavel');
  copiaFontes(path.join(DEST, 'fonts'));
  const lg40 = logo('horizontal', 'digital', { w: 40, x: 0, y: 0 });
  const svgMM = (w, h, body, defs = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}mm" height="${h}mm">${defs ? `<defs>${defs}</defs>` : ''}${body}</svg>`;
  const logoTopo = (w = 40) => { const l = logo('horizontal', 'digital', { w, x: 0, y: 0 }); return `<div class="logo">${svgMM(w, Math.ceil(l.h), l.svg)}</div>`; };
  const rodape = (ref, pag) => `<footer><i></i><div><span ${E}>Fireflies Consultoria LTDA · CNPJ 66.630.305/0001-95 · São Paulo/SP · fireflies.com.br</span><span>${pag || ''}</span></div><div ${E}>CRC-SP 2SP053069 · Responsável técnico: Gabriel Alvares${ref ? ' · ' + ref : ''} · Confidencial</div></footer>`;
  const cabec = (d1, d2) => `<header>${logoTopo(40)}<div class="dir" ${E}>${d1}<br>${d2}</div></header>`;
  const css = `<style>
  @page{size:A4;margin:0}
  html,body{margin:0;background:#8a8c94}
  .pag{position:relative;width:210mm;height:297mm;margin:0 auto 10mm;background:#fff;box-sizing:border-box;padding:42mm 20mm 26mm 25mm;overflow:hidden;font:400 10pt/14.5pt var(--sans);color:var(--fuligem);break-after:page}
  .pag:last-child{break-after:auto}
  @media print{html,body{background:none}.pag{margin:0}}
  header{position:absolute;left:25mm;right:20mm;top:12mm;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:.5pt solid var(--fumaca);padding-bottom:4mm}
  header .dir{font:400 7.5pt/11pt var(--mono);color:var(--pedra);text-align:right;letter-spacing:.04em;text-transform:uppercase}
  .logo svg{display:block}
  footer{position:absolute;left:25mm;right:20mm;bottom:9mm;font:400 7.5pt/11pt var(--mono);color:var(--pedra)}
  footer i{display:block;width:12mm;border-top:.75pt solid var(--rubrica);margin-bottom:2.5mm} footer div{display:flex;justify-content:space-between}
  .ey{font:500 8pt/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--rubrica);margin:0 0 3mm}
  h1{font:700 20pt/24pt var(--display);letter-spacing:.02em;color:var(--anil);margin:0 0 2mm;text-transform:uppercase} h1 em{font-style:normal;color:var(--rubrica)}
  .subt{font:400 12pt/16pt var(--sans);color:var(--pedra);margin:0 0 4mm}
  h2{font:600 14pt/18pt var(--display);letter-spacing:.02em;color:var(--anil);text-transform:uppercase;margin:18pt 0 6pt}
  p{margin:0 0 6pt} strong{font-weight:600;color:var(--rubrica)}
  ul{margin:0 0 6pt;padding-left:5mm} li{margin-bottom:3pt} li::marker{color:var(--anil)}
  table{width:100%;border-collapse:collapse;font:400 9pt/12pt var(--sans);margin:2mm 0}
  th{font:500 8pt/1 var(--mono);letter-spacing:.08em;color:var(--anil);text-align:left;border-bottom:.75pt solid var(--anil);padding:0 0 2mm}
  td{border-bottom:.5pt solid var(--fumaca);padding:2mm 3mm 2mm 0;vertical-align:top} td:first-child,th:first-child,td:nth-child(2),th:nth-child(2),.n{white-space:nowrap} th{padding-right:3mm} td.n,th.n{padding-right:0} .n{text-align:right;font-family:var(--mono)} tfoot td{border-top:.75pt solid var(--anil);font-weight:600;color:var(--anil)}
  .nota{font:400 8pt/11pt var(--sans);color:var(--pedra)}
  .tag{display:inline-block;font:500 6.5pt/1 var(--mono);letter-spacing:.1em;color:var(--pedra);border:.4pt solid var(--pedra);border-radius:1mm;padding:1mm 1.5mm;float:right}
  .ementa{background:var(--cal);border-left:3pt solid var(--anil);padding:4mm 6mm;margin:4mm 0}
  .ementa b,.meta b{font:500 7.5pt/1 var(--mono);letter-spacing:.1em;color:var(--anil);display:block;margin-bottom:2mm}
  .meta{display:grid;grid-template-columns:32mm 1fr;row-gap:1.5mm;margin:3mm 0} .meta b{color:var(--pedra);margin:0;line-height:14.5pt}
  .conclusao{border-left:3pt solid var(--rubrica);padding-left:6mm} .conclusao strong{color:var(--anil)}
  .assinatura{margin-top:16mm;display:flex;justify-content:space-between;align-items:flex-end}
  .assinatura div{border-top:.5pt solid var(--fuligem);width:95mm;padding-top:2mm} .assinatura b{font:600 10pt var(--sans);color:var(--anil);display:block} .assinatura small{font:400 8pt var(--mono);color:var(--pedra)}
  .capa{background:var(--anil);color:var(--cal);padding:25mm 20mm 14mm 25mm}
  .capa h1{font-size:32pt;line-height:36pt;color:var(--cal);position:absolute;left:25mm;width:150mm;top:183mm} .capa h1 em{color:var(--vermelhao)}
  .capa .ey{position:absolute;left:25mm;top:171mm;color:var(--fumaca)}
  .capa dl{position:absolute;left:25mm;top:232mm;display:grid;grid-template-columns:42mm 1fr;row-gap:3.5mm;margin:0;font:400 10pt/1 var(--sans)} .capa dt{font:500 7.5pt/10pt var(--mono);letter-spacing:.1em;color:var(--fumaca)} .capa dd{margin:0}
  .capa .cli{position:absolute;left:25mm;top:218mm;font:500 14pt/1 var(--sans)}
  .capa .rodc{position:absolute;left:25mm;right:20mm;bottom:12mm;display:flex;justify-content:space-between;font:400 7.5pt var(--mono);color:var(--fumaca)} .capa .rodc b{font:600 10pt var(--display);letter-spacing:.08em;color:var(--cal)}
  .capa .gr{position:absolute;left:0;top:0}
  .dest{position:absolute;left:20mm;top:50mm;width:90mm;font:400 10pt/14pt var(--sans)}
  .carta{position:absolute;left:25mm;right:20mm;top:95mm}
  </style>`;
  const capaSvg = (lockup, extra) => { const l = logo(lockup, 'digital-negativo', { w: 60, x: 25, y: 25 }); return `<div class="gr">${svgMM(210, 297, l.svg + extra)}</div>`; };
  const pags = {
    'papel-timbrado': `<section class="pag">
      <div style="position:absolute;left:25mm;top:15mm">${logoTopo(45)}</div>
      <div class="dest" ${E}>Ao Conselho Fiscal do<br>Condomínio Edifício Jacarandá<br>Rua [endereço], [nº]<br>[CEP] São Paulo/SP</div>
      <div class="carta" ${E}><p style="text-align:right">São Paulo, 2 de outubro de 2026.</p><p><b style="color:var(--anil);font-weight:600">Assunto: entrega do relatório de auditoria do 1º semestre</b></p><p>Prezados conselheiros,</p><p>Encaminhamos o relatório de auditoria das contas de janeiro a junho de 2026. O resumo para o conselho está na página 3, com cada achado numerado, o estado e a recomendação.</p><p>Propomos apresentar o relatório em reunião na semana de 14/10/2026, com 40 minutos para leitura e perguntas.</p><p>Ficamos à disposição pelo WhatsApp +55 11 98245-0527.</p><p style="margin-top:12mm">Atenciosamente,</p><p style="margin-top:14mm;border-top:.5pt solid var(--fuligem);width:70mm;padding-top:2mm"><b style="color:var(--anil);font-weight:600">Gabriel Alvares</b><br><span style="font:400 8pt var(--mono);color:var(--pedra)">Contador responsável</span></p></div>
      <footer><i></i><div ${E}>Fireflies Consultoria LTDA · CNPJ 66.630.305/0001-95 · CRC-SP 2SP053069 · São Paulo/SP</div><div ${E}>WhatsApp +55 11 98245-0527 · contato@fireflies.com.br · fireflies.com.br</div><div ${E}>Responsável técnico: Gabriel Alvares</div></footer></section>`,
    'proposta-comercial': `<section class="pag capa">${capaSvg('horizontal', emb('condominios', { x: 112, y: 74, s: 82, c: C.cal, lit: C.cal, line: C.ceu }) + line(25, 172.5, 33, 172.5, C.vermelhao, 0.35))}
      <p class="ey" style="left:36mm" ${E}>Proposta comercial · PRO-2026-014</p>
      <h1 ${E}>AUDITORIA CONTÁBIL E FINANCEIRA DO <em>CONDOMÍNIO</em></h1>
      <p class="cli" style="top:232mm" ${E}>Condomínio Edifício Jacarandá</p>
      <dl style="top:244mm" ${E}><dt>EMISSÃO</dt><dd>02/10/2026</dd><dt>VALIDADE</dt><dd>01/11/2026 (30 dias)</dd><dt>RESPONSÁVEL</dt><dd>Gabriel Alvares, contador responsável</dd></dl>
      <div class="rodc"><span>fireflies.com.br</span><b>LUZ MEDIDA.</b></div></section>
    <section class="pag">${cabec('Proposta comercial · PRO-2026-014', 'Condomínio Edifício Jacarandá')}
      <div ${E}><p class="ey">Proposta comercial nº PRO-2026-014</p><h1>Auditoria contábil e financeira</h1><p class="subt">Precisão que ilumina decisões.</p>
      <h2>1. Diagnóstico</h2><p>Na reunião de 24/09/2026, o conselho relatou três dúvidas: o fundo de reserva caiu 18% em seis meses, o rateio de água não confere com as leituras individuais e as notas de manutenção chegam sem retenção de impostos. Nós propomos medir as contas de 01/2025 a 09/2026 e devolver ao conselho um mapa claro, com <strong>cada achado numerado e uma solução</strong>.</p>
      <h2>2. Escopo</h2><ul><li>Conciliação bancária e dos fundos ordinário, de reserva e de obras.</li><li>Conferência dos rateios e das leituras de água e gás.</li><li>Revisão fiscal das notas de serviço: retenções de ISS, INSS e IR.</li><li>Relatório para o conselho, com achados numerados, estado e recomendação.</li></ul>
      <h2>3. 30 dias até a primeira luz</h2><table><thead><tr><th>ETAPA</th><th>QUANDO</th><th>ENTREGÁVEL</th></tr></thead><tbody><tr><td>Levantamento</td><td>Semana 1</td><td>Documentos e acessos</td></tr><tr><td>Organização</td><td>Semanas 2–3</td><td>Base conciliada</td></tr><tr><td>Leitura</td><td>Semana 4</td><td>Achados e estados</td></tr><tr><td>Primeira luz</td><td>Dia 30</td><td>Relatório explicado em reunião</td></tr></tbody></table>
      <h2>4. Investimento <span class="tag">DADOS DE EXEMPLO</span></h2><table><thead><tr><th>ITEM</th><th>PRAZO</th><th class="n">VALOR (R$)</th></tr></thead><tbody><tr><td>Auditoria contábil e financeira, 01/2025–09/2026</td><td>30 dias</td><td class="n">9.800,00</td></tr><tr><td>Acompanhamento mensal com painel (opcional, por mês)</td><td>mensal</td><td class="n">1.450,00</td></tr></tbody><tfoot><tr><td>Total do escopo principal</td><td></td><td class="n">9.800,00</td></tr></tfoot></table>
      <h2>5. Responsável</h2><p>Gabriel Alvares, contador responsável. Ele conduz o trabalho, assina o relatório e apresenta os achados ao conselho em reunião.</p></div>
      ${rodape('PRO-2026-014', 'Página 2 de 6')}</section>`,
    'relatorio-auditoria': `<section class="pag capa">${capaSvg('condominios-horizontal', L.orn('selo-graduado-texto', { x: 128, y: 70, w: 58, c: C.ceu }) + line(25, 172.5, 33, 172.5, C.vermelhao, 0.35))}
      <p class="ey" style="left:36mm" ${E}>Relatório de auditoria</p>
      <h1 ${E}>CONDOMÍNIO EDIFÍCIO <em>JACARANDÁ</em></h1>
      <p class="cli" style="top:218mm" ${E}>Prestação de contas do 1º semestre de 2026</p>
      <dl ${E}><dt>PERÍODO</dt><dd>01/2026–06/2026</dd><dt>EMISSÃO</dt><dd>10/10/2026</dd><dt>REFERÊNCIA</dt><dd>AUD-2026-031</dd><dt>RESP. TÉCNICO</dt><dd>Gabriel Alvares</dd></dl>
      <div class="rodc"><span>Confidencial · uso do conselho</span><b>LUZ MEDIDA.</b></div></section>
    <section class="pag">${cabec('Relatório de auditoria · AUD-2026-031', 'Cond. Ed. Jacarandá · 01/2026–06/2026')}
      <div ${E}><p class="ey">Resumo para o conselho</p><h1>Três pontos pedem <em>ação</em></h1>
      <p>As contas do semestre fecham: receitas e despesas conferem com os extratos e o saldo final bate com o banco. Três pontos, porém, pedem decisão do conselho antes da assembleia de dezembro.</p>
      <h2>Achados <span class="tag">DADOS DE EXEMPLO</span></h2>
      <table><thead><tr><th>Nº</th><th>ESTADO</th><th>ACHADO E RECOMENDAÇÃO</th><th class="n">VALOR (R$)</th></tr></thead><tbody>
      <tr><td>A-01</td><td style="color:var(--erro);font-weight:600">▲ Crítico</td><td><b>Fundo de reserva usado para despesa ordinária.</b> Recompor em 6 parcelas e aprovar a regra de uso.</td><td class="n">38.900,00</td></tr>
      <tr><td>A-02</td><td style="color:var(--alerta);font-weight:600">▲ Atenção</td><td><b>Rateio de água sem conferência das leituras.</b> Conferência mensal com foto do hidrômetro.</td><td class="n">12.480,00</td></tr>
      <tr><td>A-03</td><td style="color:var(--alerta);font-weight:600">▲ Atenção</td><td><b>Notas de manutenção sem retenção de ISS.</b> Reter a partir da próxima nota.</td><td class="n">4.215,60</td></tr>
      <tr><td>A-04</td><td style="color:var(--sucesso);font-weight:600">✓ Em dia</td><td><b>Conciliação bancária de janeiro a junho.</b> Nenhuma ação necessária.</td><td class="n">0,00</td></tr></tbody></table>
      <p><strong>Próximo passo:</strong> apresentar este resumo em reunião do conselho e registrar as decisões em ata.</p></div>
      ${rodape('AUD-2026-031', 'Página 3 de 18')}</section>`,
    'parecer-tecnico': `<section class="pag" style="padding-top:44mm">${cabec('Parecer técnico', 'Nº 007/2026 · 02/10/2026')}
      <div ${E}><p class="ey">Parecer técnico nº 007/2026</p><h1>Retenção de ISS nos serviços de manutenção</h1>
      <div class="meta"><b>DESTINATÁRIO</b><span>Conselho fiscal do Condomínio Edifício Jacarandá</span><b>DATA</b><span>02/10/2026</span><b>REFERÊNCIA</b><span>Relatório AUD-2026-031, achado A-03</span></div>
      <div class="ementa"><b>EMENTA</b>Serviços de manutenção predial tomados pelo condomínio. Responsabilidade do condomínio edilício pela retenção do ISS no Município de São Paulo. Procedimento para as próximas notas e para as notas de 01/2026 a 06/2026.</div>
      <h2>1. Consulta</h2><p>O conselho fiscal pergunta se o condomínio deveria ter retido o ISS das notas de manutenção de elevadores e de bombas emitidas entre janeiro e junho de 2026, e o que fazer com as notas já pagas sem retenção.</p>
      <h2>2. Análise</h2><p>A legislação do Município de São Paulo atribui ao condomínio edilício, quando toma determinados serviços, a responsabilidade pela retenção e pelo recolhimento do ISS. Entre esses serviços estão os de conservação e manutenção. O enquadramento depende do código do serviço em cada nota e do cadastro do prestador.</p><p>Das 14 notas do período, 9 se enquadram na hipótese de retenção e somam R$ 4.215,60 de ISS não retido. (Dados de exemplo.)</p>
      <h2>3. Conclusão</h2><div class="conclusao"><p>Recomendamos (i) reter o ISS a partir da próxima nota; (ii) pedir aos prestadores o comprovante de recolhimento das 9 notas; e (iii) registrar o tema em ata. <strong>Se o recolhimento não for comprovado em 30 dias, recomendamos que o condomínio, como responsável, regularize o imposto e cobre o valor do prestador.</strong></p></div><p>É o parecer.</p></div>
      <div class="assinatura" ${E}><div><b>Gabriel Alvares</b><small>Contador responsável</small></div><span>São Paulo, 2 de outubro de 2026</span></div>
      ${rodape('PT-007/2026', 'Página 1 de 1')}</section>`,
  };
  for (const [nome, corpo] of Object.entries(pags)) {
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${nome} · Fireflies Consultoria (editável)</title>${FONT_CSS}${css}</head><body>
<div class="aviso">Documento editável · clique no texto para editar · Ctrl/Cmd+P → Salvar como PDF (A4, margens: nenhuma, gráficos de fundo ligados). Para Word/Google Docs, use os estilos da seção 9.3 do manual.</div>
${corpo}</body></html>`;
    fs.writeFileSync(path.join(DEST, nome + '.html'), html);
    console.log('html documentos/editavel/' + nome + '.html');
  }
}
