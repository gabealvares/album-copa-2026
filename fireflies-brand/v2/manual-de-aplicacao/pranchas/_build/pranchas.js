// Gera as 3 pranchas do manual de aplicação.
// Uso: node pranchas.js   (Playwright em /opt/node22/lib/node_modules/playwright)
const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const OUT = path.resolve(__dirname, '..');
const FONTS = path.resolve(__dirname, '../../../iconografia/_build/fonts');
const DISPLAY = '/tmp/claude-0/-home-user-album-copa-2026/d4646268-3ddb-517a-9bb4-aa870c740fea/scratchpad/v2/tipo/ttf/Jost-600-normal.ttf';

const C = {
  anil: '#17183A', prof: '#0F1029', cal: '#EDEEEA', branco: '#FFFFFF', ambar: '#F2B544',
  verm: '#E65A3E', rub: '#A9301F', ceu: '#6E89B4', ful: '#2A2F3D', ped: '#5E6271', fum: '#D2D4DA',
  ok: '#2D7550', at: '#9A5A06', er: '#A51C45', parceiro: '#1F7A7A',
};

const fontCss = () => {
  const f = (fam, file, w, st = 'normal') =>
    `@font-face{font-family:'${fam}';src:url('file://${file}');font-weight:${w};font-style:${st}}`;
  const display = fs.existsSync(DISPLAY) ? f('Display', DISPLAY, 600) : '';
  return [
    display,
    f('Plex', `${FONTS}/IBMPlexSans-400-normal.ttf`, 400),
    f('Plex', `${FONTS}/IBMPlexSans-500-normal.ttf`, 500),
    f('Plex', `${FONTS}/IBMPlexSans-600-normal.ttf`, 600),
    f('Mono', `${FONTS}/IBMPlexMono-400-normal.ttf`, 400),
    f('Mono', `${FONTS}/IBMPlexMono-500-normal.ttf`, 500),
  ].join('\n');
};

// ---------- Símbolo PROVISÓRIO: arco crescente pontilhado com nós + lanterna âmbar ----------
// fg = cor do traço e estrelas; lit = cor da lanterna; edge = contorno da lanterna (ou null)
function simbolo({ fg, lit, edge = null, size = 64 }) {
  const cx = 50, cy = 50, R = 38;
  const pt = (deg, r = R) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
  // arco crescente: de -60° (topo direita) passando pela direita e por baixo até 160°
  const a0 = -70, a1 = 165;
  const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
  const arc = `M${x0.toFixed(2)} ${y0.toFixed(2)} A${R} ${R} 0 1 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  // arco interno mais fino para dar o "crescente"
  const R2 = 31, [u0, v0] = pt(-35, R2), [u1, v1] = pt(130, R2);
  const arc2 = `M${u0.toFixed(2)} ${v0.toFixed(2)} A${R2} ${R2} 0 0 1 ${u1.toFixed(2)} ${v1.toFixed(2)}`;
  // rede interna (constelação em árvore)
  const nodes = [[30, 34, 3.6], [46, 25, 2.6], [40, 48, 3.2], [60, 39, 2.4], [27, 61, 2.0]];
  const lan = [57, 59, 7.4]; // lanterna
  const links = [[0, 1], [0, 2], [2, 3], [2, 4]];
  const dotted = (d, w = 2.4, gap = 5.2) =>
    `<path d="${d}" fill="none" stroke="${fg}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="0 ${gap}"/>`;
  let s = `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">`;
  s += dotted(arc, 4.2, 6.6);
  s += dotted(arc2, 2.2, 4.8);
  for (const [a, b] of links) s += dotted(`M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`, 2, 4);
  s += dotted(`M${nodes[2][0]} ${nodes[2][1]} L${lan[0]} ${lan[1]}`, 2, 4);
  for (const [x, y, r] of nodes) s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${fg}"/>`;
  s += `<circle cx="${x0.toFixed(2)}" cy="${y0.toFixed(2)}" r="4.2" fill="${fg}"/>`;
  s += `<circle cx="${x1.toFixed(2)}" cy="${y1.toFixed(2)}" r="4.2" fill="${fg}"/>`;
  // partícula solta
  s += `<circle cx="80" cy="16" r="1.6" fill="${fg}"/>`;
  s += `<circle cx="${lan[0]}" cy="${lan[1]}" r="${lan[2]}" fill="${lit}"${edge ? ` stroke="${edge}" stroke-width="2"` : ''}/>`;
  s += `</svg>`;
  return s;
}

function lockup({ fg, lit, edge, sub = 'CONSULTORIA', size = 56, word = 26 }) {
  return `<div class="lock" style="color:${fg}">
    ${simbolo({ fg, lit, edge, size })}
    <div class="lw"><div class="wm" style="font-size:${word}px">FIREFLIES</div>
    <div class="ds" style="font-size:${Math.round(word * 0.32)}px">${sub}</div></div></div>`;
}

const baseCss = `
${fontCss()}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Plex',Arial,sans-serif;color:${C.ful};background:${C.cal}}
.mono{font-family:'Mono',Consolas,monospace}
.disp{font-family:'Display','Plex',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.04em}
.lock{display:flex;align-items:center;gap:10px}
.lw{display:flex;flex-direction:column;gap:2px}
.wm{font-family:'Display','Plex',sans-serif;font-weight:600;letter-spacing:.06em;line-height:1}
.ds{font-family:'Plex';font-weight:500;letter-spacing:.32em;line-height:1}
.head{display:flex;justify-content:space-between;align-items:flex-end;padding:56px 64px 28px;border-bottom:1px solid ${C.anil}}
.head h1{font-family:'Display','Plex';font-weight:600;font-size:52px;line-height:1;text-transform:uppercase;letter-spacing:.03em;color:${C.anil}}
.head h1 span{display:block;font-family:'Plex';font-weight:400;text-transform:none;letter-spacing:0;font-size:24px;color:${C.ped};margin-top:10px}
.head .meta{text-align:right;font-family:'Mono';font-size:12px;line-height:1.7;color:${C.anil};letter-spacing:.08em;text-transform:uppercase}
.prov{display:inline-block;border:1px solid ${C.rub};color:${C.rub};font-family:'Mono';font-size:11px;padding:3px 8px;letter-spacing:.1em;text-transform:uppercase;margin-top:6px}
.foot{padding:20px 64px 40px;font-family:'Mono';font-size:11px;color:${C.ped};letter-spacing:.06em}
`;

// ---------------------------------------------------------------- 1. MATRIZ DE FUNDOS
function matriz() {
  // foto simulada (sem banco de imagem): formas abstratas
  const fotoClara = `background:
     radial-gradient(ellipse 60% 50% at 75% 70%, #c9c2b4 0%, transparent 70%),
     linear-gradient(160deg,#f4f1ea 0%,#e6e1d6 55%,#cfc6b6 100%)`;
  const fotoEscura = `background:
     radial-gradient(circle at 78% 30%, rgba(242,181,68,.55) 0 3%, transparent 9%),
     radial-gradient(circle at 64% 62%, rgba(230,150,80,.45) 0 2%, transparent 7%),
     radial-gradient(ellipse 70% 60% at 70% 80%, #3a3446 0%, transparent 70%),
     linear-gradient(200deg,#2b2d40 0%,#1b1c2a 60%,#121320 100%)`;

  const tiles = [
    { nome: 'Branco', hex: '#FFFFFF', bg: C.branco, logo: 'Positivo', fg: C.anil, lit: C.ambar, edge: C.anil,
      tit: C.anil, txt: C.ful, sec: C.ped, dest: C.rub, linha: C.fum, ico: C.anil,
      rz: 'Anil 17,10 · Fuligem 13,36 · Rubrica 6,71', nao: 'Âmbar em texto 1,83 · Vermelhão/Céu em texto 3,56' },
    { nome: 'Cal Virgem', hex: '#EDEEEA', bg: C.cal, logo: 'Positivo', fg: C.anil, lit: C.ambar, edge: C.anil,
      tit: C.anil, txt: C.ful, sec: C.ped, dest: C.rub, linha: C.ped, ico: C.anil,
      rz: 'Anil 14,67 · Fuligem 11,46 · Rubrica 5,76', nao: 'Âmbar em texto 1,57 · Fumaça 1,27 · impressão de escritório' },
    { nome: 'Anil de Junho', hex: '#17183A', bg: C.anil, logo: 'Negativo', fg: C.cal, lit: C.ambar, edge: null,
      tit: C.cal, txt: C.cal, sec: C.fum, dest: C.verm, linha: C.ceu, ico: C.cal,
      rz: 'Cal 14,67 · Fumaça 11,54 · Âmbar 9,34 · Vermelhão 4,80 · âmbar só na Lanterna (1 luz)', nao: 'Rubrica 2,55 · Fuligem 1,28 · Pedra-Sabão 2,82' },
    { nome: 'Anil Profundo', hex: '#0F1029', bg: C.prof, logo: 'Negativo', fg: C.cal, lit: C.ambar, edge: null,
      tit: C.cal, txt: C.cal, sec: C.fum, dest: C.verm, linha: C.ceu, ico: C.cal,
      rz: 'Cal 16,00 · Fumaça 12,58 · Vermelhão 5,23 · Céu 5,24', nao: 'Rubrica 2,78 · Anil sobre ele 1,09 · capa inteira' },
    { nome: 'Âmbar · raro', hex: '#F2B544', bg: C.ambar, logo: 'Mono Anil', fg: C.anil, lit: C.anil, edge: null,
      tit: C.anil, txt: C.anil, sec: C.ful, dest: null, linha: 'rgba(23,24,58,.4)', ico: C.anil,
      rz: 'Anil 9,34 · Fuligem 7,29', nao: 'Branco 1,83 · Cal 1,57 · Rubrica pequeno 3,66 · outro acento' },
    { nome: 'Vermelhão de Rubrica', hex: '#A9301F', bg: C.rub, logo: 'Mono Cal', fg: C.cal, lit: C.cal, edge: null,
      tit: C.cal, txt: C.cal, sec: C.fum, dest: null, linha: 'rgba(237,238,234,.5)', ico: C.cal,
      rz: 'Cal 5,76 · Branco 6,71 · Fumaça 4,53', nao: 'Anil 2,55 · Âmbar 3,66 · documento oficial' },
    { nome: 'Foto clara', hex: 'área lisa ou véu Cal 80–90%', bgcss: fotoClara, veu: 'linear-gradient(90deg,rgba(237,238,234,.9) 0 58%,rgba(237,238,234,0) 82%)',
      logo: 'Positivo', fg: C.anil, lit: C.ambar, edge: C.anil,
      tit: C.anil, txt: C.ful, sec: C.ped, dest: C.rub, linha: C.ped, ico: C.anil,
      rz: 'texto só sobre área lisa ou véu Cal', nao: 'texto sobre detalhe · logo Negativo' },
    { nome: 'Foto escura', hex: 'véu Anil 60–80%', bgcss: fotoEscura, veu: 'linear-gradient(90deg,rgba(23,24,58,.82) 0 55%,rgba(23,24,58,0) 85%)',
      logo: 'Negativo', fg: C.cal, lit: C.ambar, edge: null,
      tit: C.cal, txt: C.cal, sec: C.fum, dest: C.verm, linha: C.ceu, ico: C.cal,
      rz: 'Cal ≥ 4,5 medido no ponto mais claro', nao: 'logo sem véu · véu preto, cinza ou blur' },
    { nome: 'Cor de terceiros', hex: 'ex.: parceiro #1F7A7A', bg: C.parceiro, logo: 'Positivo em placa Branco', fg: C.anil, lit: C.ambar, edge: C.anil,
      placa: true, tit: C.branco, txt: C.branco, sec: '#E3EFEF', dest: null, linha: 'rgba(255,255,255,.5)', ico: C.branco,
      rz: 'sem versão ≥ 4,5 → placa Branco com 2X', nao: 'recolorir o logo · roxo · sem fio no co-branding' },
  ];

  const sw = (c, label) => c ? `<span class="sw"><i style="background:${c}"></i>${label}</span>` : '';
  const tile = (t) => {
    const bg = t.bgcss ? t.bgcss : `background:${t.bg}`;
    const logo = t.placa
      ? `<div style="background:#fff;padding:12px 18px;align-self:flex-start;margin-top:22px">${lockup({ fg: t.fg, lit: t.lit, edge: t.edge, size: 56, word: 22 })}</div>`
      : lockup({ fg: t.fg, lit: t.lit, edge: t.edge, size: 64, word: 24 });
    const dest = t.dest ? `<b style="color:${t.dest}">R$ 48.210,00</b>` : `<b>R$ 48.210,00</b>`;
    return `<div class="tile">
      <div class="art" style="${bg}">
        ${t.veu ? `<div class="veu" style="background:${t.veu}"></div>` : ''}
        <div class="in">
          ${logo}
          <div class="ey mono" style="color:${t.dest === C.rub ? t.dest : t.sec}">RELATÓRIO · 03/2026</div>
          <div class="tt disp" style="color:${t.tit}">Inadimplência em 6%</div>
          <div class="bd" style="color:${t.txt}">Três unidades concentram 70% do saldo em aberto: ${dest}.</div>
          <div class="ln" style="border-color:${t.linha}"></div>
          <div class="ic" style="color:${t.ico}">
            ${icon(t.ico)}<span class="mono" style="color:${t.sec}">ícones e linhas</span>
          </div>
        </div>
        <div class="tag mono" style="color:${t.tit};border-color:${t.tit}">${t.logo}</div>
      </div>
      <div class="cap">
        <div class="nm">${t.nome} <span class="mono">${t.hex}</span></div>
        <div class="sws">${sw(t.tit, 'título')}${sw(t.txt, 'texto')}${sw(t.dest, 'destaque')}${t.dest2 ? sw(t.dest2, 'realce') : ''}${sw(t.linha.startsWith('rgba') ? t.ico : t.linha, 'linhas')}${sw(t.lit, 'lanterna')}</div>
        <div class="ok mono">✔ ${t.rz}</div>
        <div class="no mono">✖ ${t.nao}</div>
      </div>
    </div>`;
  };
  function icon(col) {
    // ícone "auditoria" simplificado: lupa com estrela
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="1.5" stroke-linecap="round"><circle cx="10" cy="10" r="6.5"/><path d="M15 15l5.5 5.5" stroke-dasharray="0 3"/><circle cx="10" cy="10" r="1.6" fill="${col}" stroke="none"/></svg>`;
  }
  const css = `${baseCss}
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;padding:36px 64px 12px}
  .tile{background:#fff;border:1px solid ${C.fum}}
  .art{position:relative;height:350px;overflow:hidden}
  .veu{position:absolute;inset:0}
  .in{position:relative;padding:30px 30px 0;display:flex;flex-direction:column;gap:12px;max-width:430px}
  .ey{font-size:11px;letter-spacing:.14em;margin-top:8px}
  .tt{font-size:28px;line-height:1.05}
  .bd{font-size:15px;line-height:1.45;max-width:340px}
  .ln{border-top:1.5px solid;width:120px}
  .ic{display:flex;gap:10px;align-items:center;font-size:11px}
  .tag{position:absolute;right:16px;top:16px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;border:1px solid;padding:3px 7px}
  .cap{padding:16px 18px 18px;border-top:1px solid ${C.fum}}
  .nm{font-weight:600;font-size:17px;color:${C.anil};margin-bottom:10px}
  .nm .mono{font-weight:400;font-size:11px;color:${C.ped};margin-left:6px}
  .sws{display:flex;flex-wrap:wrap;gap:6px 12px;margin-bottom:10px}
  .sw{display:flex;align-items:center;gap:5px;font-size:11px;color:${C.ped}}
  .sw i{width:13px;height:13px;border:1px solid rgba(0,0,0,.18);display:inline-block}
  .ok{font-size:11px;color:${C.ok};line-height:1.5}
  .no{font-size:11px;color:${C.rub};line-height:1.5;margin-top:3px}
  `;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
  <div class="head"><h1>Matriz de fundos<span>Versão do logo, cores de título, texto, destaque, linhas e lanterna em cada fundo</span></h1>
  <div class="meta">Fireflies Consultoria · manual de aplicação v2<br>Contraste WCAG 2.2 · ✔ texto ≥ 4,5 · forma ≥ 3<br><span class="prov">Símbolo e fonte de títulos provisórios</span></div></div>
  <div class="grid">${tiles.map(tile).join('')}</div>
  <div class="foot">SÍMBOLO PROVISÓRIO (ARCO PONTILHADO COM NÓS E LANTERNA) E FONTE DE TÍTULOS PROVISÓRIA: SÓ INDICAM COR E POSIÇÃO. FOTOS SIMULADAS. VER SEÇÃO 2 DO MANUAL.</div>
  </body></html>`;
}

// ---------------------------------------------------------------- 2. DISTRIBUIÇÃO DE COR
function distribuicao() {
  const cols = [
    ['Branco', C.branco], ['Cal Virgem', C.cal], ['Anil', C.anil], ['Texto', C.ful],
    ['Rubrica / Vermelhão', C.rub], ['Apoio (Céu, Fumaça)', C.ceu], ['Âmbar', C.ambar],
  ];
  const rows = [
    ['Apresentação institucional', [40, 10, 35, 8, 3, 3, 1]],
    ['Apresentação de resultado / painel', [60, 10, 10, 10, 3, 6, 1]],
    ['Proposta comercial', [65, 5, 15, 10, 2, 2, 1]],
    ['Relatório de auditoria', [70, 5, 10, 10, 2, 2, 1]],
    ['Papel timbrado / carta', [90, 0, 2, 6, 1, 0.5, 0.5]],
    ['Contrato', [92, 0, 1, 6, 0.5, 0.5, 0]],
    ['Nota técnica / parecer', [90, 0, 2, 6, 1, 0.5, 0.5]],
    ['E-mail (assinatura)', [90, 0, 4, 4, 1, 0.5, 0.5]],
    ['Post (feed)', [0, 25, 60, 8, 3, 3, 1]],
    ['Story', [0, 15, 70, 8, 3, 3, 1]],
    ['Cartão de visita', [45, 0, 45, 5, 2, 2, 1]],
    ['Envelope', [85, 0, 10, 3, 1, 0.5, 0.5]],
    ['Pasta', [10, 0, 75, 5, 3, 5, 2]],
    ['Crachá', [50, 0, 40, 5, 2, 2, 1]],
    ['Certificado Academy', [10, 70, 8, 7, 2, 2, 1]],
    ['Placa / sinalização', [0, 0, 85, 10, 2, 0, 3]],
  ];
  // texto sobre Anil é Cal: no escuro, "Texto" em Cal
  const darkTextRows = new Set(['Post (feed)', 'Story', 'Placa / sinalização', 'Pasta']);
  const bar = (name, v) => {
    const segs = v.map((p, i) => {
      if (!p) return '';
      let col = cols[i][1];
      if (i === 3 && darkTextRows.has(name)) col = C.cal;
      if (i === 4 && darkTextRows.has(name)) col = C.verm;
      let border = (col === C.branco || col === C.cal) ? `box-shadow:inset 0 0 0 1px ${C.fum};` : '';
      if (i === 3) { const base = darkTextRows.has(name) ? C.anil : C.branco; border = `background:repeating-linear-gradient(135deg,${col} 0 3px,${base} 3px 7px)!important;`; }
      const lbl = (p >= 8 && i !== 3) ? `<span style="color:${[C.anil, C.ful, C.rub].includes(col) ? C.cal : C.anil}">${String(p).replace('.', ',')}%</span>` : '';
      return `<div class="seg" style="flex:${p} 0 0;background:${col};${border}">${lbl}</div>`;
    }).join('');
    const small = v.map((p, i) => (p > 0 && (p < 8 || i === 3)) ? `${cols[i][0].split(' ')[0]} ${String(p).replace('.', ',')}` : null).filter(Boolean).join(' · ');
    return `<div class="row"><div class="nm">${name}</div><div class="bar">${segs}</div><div class="sm mono">${small}</div></div>`;
  };

  // miniaturas de peças-tipo
  const mini = (label, inner, w, h) => `<figure><div class="mini" style="width:${w}px;height:${h}px">${inner}</div><figcaption class="mono">${label}</figcaption></figure>`;
  const slideCapa = `<div style="position:absolute;inset:0;background:${C.anil}"></div>
    <div style="position:absolute;left:18px;top:18px;font:500 8px Mono;letter-spacing:.14em;color:${C.verm}">PROPOSTA · 2026</div>
    <div class="disp" style="position:absolute;left:18px;top:62px;font-size:19px;color:${C.cal};line-height:1.05">Auditoria<br>Edifício Aurora</div>
    <div style="position:absolute;left:14px;bottom:12px">${lockup({ fg: C.cal, lit: C.ambar, size: 26, word: 11 })}</div>
    <div style="position:absolute;right:14px;top:20px;opacity:.5">${simbolo({ fg: C.ceu, lit: C.ceu, size: 70 })}</div>`;
  const slideCont = `<div style="position:absolute;inset:0;background:#fff;box-shadow:inset 0 0 0 1px ${C.fum}"></div>
    <div style="position:absolute;left:18px;top:16px;font:500 8px Mono;letter-spacing:.14em;color:${C.rub}">RESULTADO · MARÇO</div>
    <div class="disp" style="position:absolute;left:18px;top:32px;font-size:13px;color:${C.anil}">Inadimplência caiu para 6%</div>
    ${[38, 52, 46, 30, 22].map((h, i) => `<div style="position:absolute;bottom:26px;left:${150 + i * 22}px;width:12px;height:${h}px;background:${i === 4 ? C.ambar : C.anil};${i === 4 ? `box-shadow:0 0 0 1px ${C.anil}` : ''}"></div>`).join('')}
    <div style="position:absolute;left:18px;top:62px;width:110px;font-size:8px;line-height:1.5;color:${C.ful}">Três unidades concentram <b style="color:${C.rub}">70%</b> do saldo.</div>
    <div style="position:absolute;left:18px;right:18px;bottom:10px;border-top:1px solid ${C.fum};padding-top:3px;font:400 6px Mono;color:${C.ped}">FIREFLIES CONSULTORIA · 07 / 24</div>`;
  const a4 = `<div style="position:absolute;inset:0;background:#fff;box-shadow:inset 0 0 0 1px ${C.fum}"></div>
    <div style="position:absolute;left:16px;top:16px">${lockup({ fg: C.anil, lit: C.ambar, edge: C.anil, size: 20, word: 9 })}</div>
    <div style="position:absolute;left:16px;top:56px;font:500 6px Mono;letter-spacing:.14em;color:${C.rub}">PARECER TÉCNICO Nº 012/2026</div>
    <div class="disp" style="position:absolute;left:16px;top:68px;font-size:10px;color:${C.anil}">Rateio de despesas</div>
    ${Array.from({ length: 14 }, (_, i) => `<div style="position:absolute;left:16px;right:${16 + (i % 4 === 3 ? 40 : 0)}px;top:${88 + i * 8}px;height:2.5px;background:${C.ful};opacity:.55"></div>`).join('')}
    <div style="position:absolute;left:16px;bottom:22px;width:12px;border-top:1.5px solid ${C.rub}"></div>
    <div style="position:absolute;left:16px;right:16px;bottom:12px;height:2px;background:${C.ped};opacity:.5"></div>`;
  const post = `<div style="position:absolute;inset:0;background:${C.anil}"></div>
    <div style="position:absolute;inset:0;background-image:radial-gradient(${C.ceu} 1px,transparent 1.4px);background-size:22px 22px;opacity:.35"></div>
    <div style="position:absolute;left:16px;top:18px;font:500 7px Mono;letter-spacing:.14em;color:${C.fum}">CONDOMÍNIOS · 3 SLIDES</div>
    <div class="disp" style="position:absolute;left:16px;top:42px;right:16px;font-size:17px;line-height:1.08;color:${C.cal}">Fundo de reserva não é caixa do mês.</div>
    <div style="position:absolute;left:16px;top:130px;font-size:8px;color:${C.verm};font-weight:600">Entenda em 3 slides →</div>
    <div style="position:absolute;right:12px;bottom:10px">${simbolo({ fg: C.cal, lit: C.ambar, size: 28 })}</div>`;
  const cartao = `<div style="position:absolute;left:0;top:0;width:100%;height:50%;background:${C.anil};display:flex;align-items:center;justify-content:center">${lockup({ fg: C.cal, lit: C.ambar, size: 26, word: 11 })}</div>
    <div style="position:absolute;left:0;top:50%;width:100%;height:50%;background:#fff;box-shadow:inset 0 0 0 1px ${C.fum}"></div>
    <div style="position:absolute;left:14px;top:calc(50% + 12px);width:8px;border-top:1.5px solid ${C.rub}"></div>
    <div style="position:absolute;left:14px;top:calc(50% + 18px);font-size:8px;font-weight:600;color:${C.anil}">Gabriel Alvares</div>
    <div style="position:absolute;left:14px;top:calc(50% + 31px);font:400 6px Mono;color:${C.ful};line-height:1.5">Contador responsável<br>+55 11 98245-0527</div>`;
  const cert = `<div style="position:absolute;inset:0;background:${C.cal}"></div>
    <div style="position:absolute;inset:8px;border:2px dashed ${C.anil}"></div>
    <div style="position:absolute;left:0;right:0;top:18px;display:flex;justify-content:center">${lockup({ fg: C.anil, lit: C.ambar, edge: C.anil, sub: 'ACADEMY', size: 20, word: 9 })}</div>
    <div class="disp" style="position:absolute;left:0;right:0;top:52px;text-align:center;font-size:13px;color:${C.anil}">Certificado</div>
    <div class="disp" style="position:absolute;left:0;right:0;top:74px;text-align:center;font-size:10px;color:${C.anil}">Maria da Silva</div>
    <div style="position:absolute;left:0;right:0;top:92px;text-align:center;font-size:7px;color:${C.rub};font-weight:600">Contabilidade para Gestores</div>
    <div style="position:absolute;right:24px;bottom:16px;width:28px;height:28px;border-radius:50%;border:1.5px solid ${C.anil};display:flex;align-items:center;justify-content:center"><i style="width:7px;height:7px;border-radius:50%;background:${C.ambar};box-shadow:0 0 0 1px ${C.anil}"></i></div>`;

  const legend = cols.map(([n, c], i) => `<span class="lg"><i style="background:${i === 3 ? `repeating-linear-gradient(135deg,${C.ful} 0 3px,#fff 3px 7px)` : c};${(c === C.branco || c === C.cal) ? `box-shadow:inset 0 0 0 1px ${C.fum}` : ''}"></i>${n}${i === 3 ? ' <em>(hachura · Fuligem/Pedra no claro, Cal/Fumaça no escuro)</em>' : ''}${i === 4 ? ' <em>(Vermelhão no escuro)</em>' : ''}</span>`).join('');

  const css = `${baseCss}
  .wrap{padding:28px 64px 8px}
  .legend{display:flex;flex-wrap:wrap;gap:8px 22px;margin-bottom:22px;font-size:13px;color:${C.ful}}
  .lg{display:flex;align-items:center;gap:7px}.lg i{width:16px;height:16px;display:inline-block}.lg em{color:${C.ped};font-style:normal;font-size:11px}
  .row{display:grid;grid-template-columns:280px 1fr 330px;gap:18px;align-items:center;padding:7px 0;border-bottom:1px solid ${C.fum}}
  .row .nm{font-size:15px;font-weight:500;color:${C.anil}}
  .bar{display:flex;height:30px;background:#fff}
  .seg{display:flex;align-items:center;justify-content:center;font:500 11px Mono;min-width:2px}
  .sm{font-size:10.5px;color:${C.ped};line-height:1.35}
  h2{font-family:'Display','Plex';font-weight:600;text-transform:uppercase;letter-spacing:.04em;font-size:22px;color:${C.anil};margin:34px 0 6px}
  .sub{font-size:13px;color:${C.ped};margin-bottom:18px}
  .minis{display:flex;gap:26px;flex-wrap:wrap;align-items:flex-end}
  figure{display:flex;flex-direction:column;gap:8px}
  .mini{position:relative;overflow:hidden}
  figcaption{font-size:10.5px;color:${C.ped};letter-spacing:.06em;text-transform:uppercase}
  .rules{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:30px}
  .rule{background:#fff;border-left:3px solid ${C.rub};padding:14px 16px;font-size:13px;line-height:1.5;color:${C.ful}}
  .rule b{color:${C.anil}}
  `;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
  <div class="head"><h1>Distribuição de cor<span>Percentual aproximado da área de cada peça</span></h1>
  <div class="meta">Fireflies Consultoria · manual de aplicação v2<br>Seção 4 · Âmbar é sempre a menor fatia<br><span class="prov">Símbolo e fonte de títulos provisórios</span></div></div>
  <div class="wrap">
    <div class="legend">${legend}</div>
    ${rows.map(([n, v]) => bar(n, v)).join('')}
    <div class="row"><div class="nm">Brindes</div><div class="bar" style="background:transparent;font-size:13px;align-items:center;color:${C.ful}">Cor do objeto + 1 cor de marca (Mono) · 2 cores: Anil + Âmbar só na Lanterna</div><div class="sm mono">Âmbar 0 em 1 cor · ≤ 5 em 2 cores</div></div>
    <h2>Como isso fica na peça</h2>
    <div class="sub">Mesma família de cores, proporções diferentes: impacto em Anil, trabalho em Branco, uma luz e a Rubrica sempre presente.</div>
    <div class="minis">
      ${mini('Apresentação · capa', slideCapa, 320, 180)}
      ${mini('Apresentação · dados', slideCont, 320, 180)}
      ${mini('Parecer · A4', a4, 160, 226)}
      ${mini('Post 4:5', post, 168, 210)}
      ${mini('Cartão · frente e verso', cartao, 180, 200)}
      ${mini('Certificado Academy', cert, 226, 160)}
    </div>
    <div class="rules">
      <div class="rule"><b>Uma luz por composição.</b> Se o logo está visível, a Lanterna dele é a luz. O destaque do texto vai em Rubrica (claro) ou Vermelhão (escuro).</div>
      <div class="rule"><b>Rubrica sempre presente.</b> Fio de rodapé, eyebrow, link ou número-chave. Sem ela, a peça vira "marinho e dourado de banco".</div>
      <div class="rule"><b>Impresso no escritório = Branco.</b> Contrato, parecer, ata e timbrado ficam ≥ 90% Branco. Anil só no logo e no título.</div>
    </div>
  </div>
  <div class="foot">SÍMBOLO PROVISÓRIO E FONTE DE TÍTULOS PROVISÓRIA: SÓ INDICAM COR E POSIÇÃO.</div>
  </body></html>`;
}

// ---------------------------------------------------------------- 3. ÁRVORE CLARO / ESCURO
function arvore() {
  // nós: q = pergunta, r = resultado
  const W = 1800;
  const Q = (id, x, y, w, txt) => ({ id, x, y, w, h: 74, txt, t: 'q' });
  const R = (id, x, y, w, fundo, txt, ex) => ({ id, x, y, w, h: 128, fundo, txt, ex, t: 'r' });
  const n = [
    Q('q1', 640, 40, 520, 'A peça vai ser impressa no escritório, assinada ou arquivada?'),
    R('r1', 40, 196, 420, 'branco', 'BRANCO', 'Contrato · parecer · ata · carta · timbrado · miolo de relatório e proposta. Capa: faixa Anil ≤ 25%.'),
    Q('q2', 900, 210, 420, 'Vai ser projetada?'),
    Q('q3', 160, 400, 440, 'Sala clara, projetor fraco ou desconhecido?'),
    R('r2', 40, 580, 380, 'branco', 'BRANCO + ANIL', 'Conteúdo em Branco, corpo ≥ 24 pt. Anil só em capa, divisor e encerramento. Assembleia, aula.'),
    R('r3', 440, 580, 320, 'anil', 'ANIL DE JUNHO', 'Auditório escuro, telão LED, evento.'),
    Q('q4', 1100, 400, 420, 'Que tipo de peça é?'),
  ];
  const leaves = [
    R('r4', 820, 580, 300, 'cal', 'CAL OU BRANCO', 'Tela de leitura longa: painel, PDF digital, site (conteúdo).'),
    R('r5', 1140, 580, 300, 'anil', 'ANIL DE JUNHO', 'Redes, capa, OG, vídeo, avatar. 1 em cada 3 posts em Cal.'),
    R('r6', 1460, 580, 320, 'branco', 'SEM FUNDO', 'Assinatura de e-mail: logo Positivo transparente; testar dark mode.'),
    R('r7', 820, 790, 300, 'anil', 'ANIL (+ EXCEÇÃO)', 'Campanha. Âmbar ou Rubrica só em ≤ 1 de cada 10 peças.'),
    R('r8', 1140, 790, 640, 'split', 'FRENTE ANIL · VERSO BRANCO/CAL', 'Impresso de gráfica: cartão, pasta, capa de relatório e proposta, envelope. Exceção: certificado Academy é CAL inteiro.'),
  ];
  const all = [...n, ...leaves];
  const by = Object.fromEntries(all.map(o => [o.id, o]));
  const edges = [
    ['q1', 'r1', 'SIM'], ['q1', 'q2', 'NÃO'], ['q2', 'q3', 'SIM'], ['q2', 'q4', 'NÃO'],
    ['q3', 'r2', 'SIM'], ['q3', 'r3', 'NÃO'],
    ['q4', 'r4', 'painel / leitura'], ['q4', 'r5', 'rede / capa'], ['q4', 'r6', 'e-mail'], ['q4', 'r7', 'campanha'],
    ['q4', 'r8', 'impresso de gráfica'],
  ];
  const fundoCss = (f) => ({
    branco: `background:#fff;color:${C.anil};box-shadow:inset 0 0 0 1px ${C.fum}`,
    cal: `background:${C.cal};color:${C.anil};box-shadow:inset 0 0 0 1px ${C.ped}`,
    anil: `background:${C.anil};color:${C.cal}`,
    split: `background:linear-gradient(90deg,${C.anil} 0 22%,#fff 22% 100%);color:${C.anil};box-shadow:inset 0 0 0 1px ${C.fum}`,
  })[f];
  const H = 940;
  // linhas ortogonais
  let labels = '';
  let svg = `<svg class="ed" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  for (const [a, b, lab] of edges) {
    const A = by[a], B = by[b];
    let x1 = A.x + A.w / 2, y1 = A.y + A.h, x2 = B.x + B.w / 2, y2 = B.y;
    let d, lx, ly;
    if (a === 'q4' && (b === 'r7' || b === 'r8')) {
      d = `M${x1} ${y1} V527 H790 V750 H${x2} V${y2}`; lx = x2; ly = 750;
    } else {
      const my = y1 + (y2 - y1) / 2;
      d = `M${x1} ${y1} V${my} H${x2} V${y2}`; lx = x2; ly = my;
    }
    svg += `<path d="${d}" fill="none" stroke="${C.anil}" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="0 6"/>`;
    svg += `<circle cx="${(d.match(/(-?[\d.]+) (-?[\d.]+)$/) ? 0 : 0)}" cy="0" r="0"/>`;
    const tw = lab.length * 7.4 + 16;
    labels += `<g><rect x="${lx - tw / 2}" y="${ly - 11}" width="${tw}" height="22" fill="${C.cal}"/><text x="${lx}" y="${ly + 4}" text-anchor="middle" font-family="Mono" font-size="11.5" letter-spacing="1" fill="${lab === 'SIM' ? C.ok : lab === 'NÃO' ? C.rub : C.ped}">${lab.toUpperCase()}</text></g>`;
  }
  svg += labels;
  // pontas: estrela no destino
  for (const [, b] of edges) { const B = by[b]; svg += `<circle cx="${B.x + B.w / 2}" cy="${B.y}" r="3.6" fill="${C.anil}"/>`; }
  svg += `</svg>`;
  const nodes = all.map(o => o.t === 'q'
    ? `<div class="q" style="left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px">${o.txt}</div>`
    : `<div class="r" style="left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px;${fundoCss(o.fundo)}">
        <div class="rt disp" ${o.fundo === 'split' ? `style="padding-left:${Math.round(o.w * 0.22) + 18}px"` : ''}>${o.txt}</div>
        <div class="rx" ${o.fundo === 'split' ? `style="padding-left:${Math.round(o.w * 0.22) + 18}px;color:${C.ful}"` : o.fundo === 'anil' ? `style="color:${C.fum}"` : `style="color:${C.ful}"`}>${o.ex}</div>
        ${o.fundo === 'split' ? `<div style="position:absolute;left:34px;top:28px">${simbolo({ fg: C.cal, lit: C.ambar, size: 72 })}</div>` : ''}
      </div>`).join('');
  const ctx = [
    ['Impressão em escritório', 'Branco', C.branco],
    ['Documento oficial', 'Branco', C.branco],
    ['Projetor · sala clara', 'Branco + Anil', C.branco],
    ['Projetor · sala escura', 'Anil', C.anil],
    ['Tela de leitura', 'Cal / Branco', C.cal],
    ['Campanha e redes', 'Anil', C.anil],
    ['Assinatura de e-mail', 'Sem fundo', C.branco],
    ['Papelaria de gráfica', 'Anil + Branco', C.anil],
  ];
  const css = `${baseCss}
  .stage{position:relative;width:${W}px;height:${H}px;margin:24px auto 0}
  .ed{position:absolute;left:0;top:0}
  .q{position:absolute;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 22px;background:${C.anil};color:${C.cal};font-size:17px;font-weight:500;line-height:1.3;border-radius:37px}
  .r{position:absolute;padding:20px 22px;display:flex;flex-direction:column;gap:8px}
  .rt{font-size:20px;line-height:1}
  .rx{font-size:13.5px;line-height:1.45}
  .ctx{display:grid;grid-template-columns:repeat(8,1fr);gap:12px;padding:10px 64px 0}
  .c{border-top:3px solid ${C.anil};padding-top:10px}
  .c .k{font-family:Mono;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:${C.ped}}
  .c .v{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:${C.anil};margin-top:6px}
  .c .v i{width:18px;height:18px;box-shadow:inset 0 0 0 1px ${C.ped}}
  `;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
  <div class="head"><h1>Claro ou escuro?<span>Árvore de decisão do fundo por tipo de peça e contexto</span></h1>
  <div class="meta">Fireflies Consultoria · manual de aplicação v2<br>Seção 3 · Anil manda, Branco trabalha<br><span class="prov">Símbolo e fonte de títulos provisórios</span></div></div>
  <div class="stage">${svg}${nodes}</div>
  <div class="ctx">${ctx.map(([k, v, c]) => `<div class="c"><div class="k">${k}</div><div class="v"><i style="background:${c}"></i>${v}</div></div>`).join('')}</div>
  <div class="foot">REGRA CURTA: TUDO QUE É LIDO POR MUITO TEMPO, IMPRESSO OU ASSINADO VAI NO BRANCO. TUDO QUE PRECISA DE IMPACTO VAI NO ANIL DE JUNHO. CAL VIRGEM É O CLARO DE MARCA, NUNCA DE IMPRESSORA DE ESCRITÓRIO.</div>
  </body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const jobs = [['matriz-de-fundos', matriz(), 1800], ['distribuicao-de-cor', distribuicao(), 1800], ['arvore-claro-escuro', arvore(), 1928]];
  for (const [name, html, width] of jobs) {
    const f = path.join(__dirname, `${name}.html`);
    fs.writeFileSync(f, html);
    const page = await browser.newPage({ viewport: { width, height: 800 }, deviceScaleFactor: 1.5 });
    await page.goto('file://' + f);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
    await page.close();
    console.log('ok', name);
  }
  await browser.close();
})();
