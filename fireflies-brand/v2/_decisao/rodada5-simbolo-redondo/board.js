// Monta a prancha de aprovação: board.html
const fs = require('fs');
const { simbolo, construcao, favicon, rastro } = require('./simbolo');
const FAV = require('./favicons');
const O = require('./opcoes');
const R5 = O.r5;
const RS = (o, cor, px, x = {}) => rastro(o, cor, { id: 'rs' + (n++), ...x }).replace(/<title>.*?<\/title>/, '').replace('<svg ', `<svg width="${px}" height="${px}" aria-hidden="true" `);
const FV = (cor, px, fUnico) => favicon(cor, { fUnico, id: 'fv' + (n++) }).replace(/<title>.*?<\/title>/, '').replace('<svg ', `<svg width="${px}" height="${px}" aria-hidden="true" `);
const LOGO = '/home/user/album-copa-2026/fireflies-brand/v2/logo/svg/';
const rd = f => fs.readFileSync(LOGO + f, 'utf8').replace(/<title>.*?<\/title>/, '');
let n = 0;
const S = (o, cor, px, extra = {}) => simbolo(o, cor, { id: 'k' + (n++), ...extra })
  .replace(/<title>.*?<\/title>/, '').replace('<svg ', `<svg width="${px}" height="${px}" aria-hidden="true" `);
const atual = (cor, px) => rd(`fireflies_simbolo_${cor}.svg`).replace(/ff-sb-/g, 'at' + (n++) + '-').replace('<svg ', `<svg width="${px}" height="${px}" aria-hidden="true" `);
const atualP = (px) => rd('fireflies_simbolo-pequeno_digital.svg').replace(/ff-sp-/g, 'ap' + (n++) + '-').replace('<svg ', `<svg width="${px}" height="${px}" aria-hidden="true" `);
const hz = rd('fireflies_horizontal_digital.svg').replace('<svg ', '<svg class="hz" aria-hidden="true" ');
const hzN = rd('fireflies_horizontal_digital-negativo.svg').replace('<svg ', '<svg class="hz" aria-hidden="true" ');

const TXT = {
  A: {
    tese: 'A mesma órbita do logo horizontal, vista de frente: um círculo perfeito com a abertura centrada no alto. O vagalume fica às 11 horas, sobre a haste do F, que agora tem uma cor só.',
    pros: ['É a mais equilibrada: o peso fica no centro e o círculo preenche o avatar e o ícone de app.', 'Com o F numa cor só, o olho vai direto para o vagalume, que passa a ser a única luz do símbolo.', 'Mantém o sentido: voo horário, constelação atrás, luz na frente, 8 estrelas e vagalume com asas.'],
    contras: ['Perde a inclinação de −5° que era compartilhada com o horizontal.'],
  },
  C: {
    tese: 'Um círculo mais justo, com 330° de voo e abertura mínima. O F é 10 % maior e o fio de luz mais grosso. Funciona como um selo.',
    pros: ['Tem a melhor leitura entre 24 e 48 px. O F inteiro, numa cor só, fica ainda mais firme pequeno.', 'É muito sólido em carimbo, bordado, gravação e ícone de app.'],
    contras: ['É a mais fechada: a sensação de voo diminui.', 'Fica mais pesado ao lado do horizontal, que é leve.'],
  },
};

function opcao(k) {
  const o = O[k], t = TXT[k];
  const cores = [['chapado', 'cal'], ['chapado-negativo', 'anil'], ['mono-anil', 'branco'], ['mono-branco', 'anil2']];
  return `<section class="op" id="opcao-${k.toLowerCase()}">
  <header class="op-h"><span class="tag">Opção ${k}</span><h2>${o.nome}</h2></header>
  <p class="tese">${t.tese}</p>
  <div class="hero">
    <figure class="f-claro"><div class="stage">${S(o, 'digital', 300)}<div class="guia">${construcao(o)}</div></div><figcaption>digital · Branco</figcaption></figure>
    <figure class="f-anil"><div class="stage">${S(o, 'digital-negativo', 300)}<div class="guia">${construcao(o, '#7FB2FF')}</div></div><figcaption>digital-negativo · Anil</figcaption></figure>
  </div>
  <div class="cores">${cores.map(([c, f]) => `<figure class="f-${f}">${S(o, c, 120)}<figcaption>${c}</figcaption></figure>`).join('')}</div>
  <h3>Em uso</h3>
  <div class="usos">
    <figure><div class="avatar">${S(o, 'digital-negativo', 104)}</div><figcaption>Avatar (corte circular)</figcaption></figure>
    <figure><div class="app">${S(o, 'digital-negativo', 74)}</div><figcaption>Ícone de app</figcaption></figure>
    <figure><div class="tams">${[64, 40].map(p => `<span>${S(o, 'digital', p)}<i>${p}</i></span>`).join('')}${[32, 24].map(p => `<span>${S(o, 'digital', p, { pequeno: true })}<i>${p}</i></span>`).join('')}</div><figcaption>Tamanhos (32 e 24 px no símbolo pequeno)</figcaption></figure>
  </div>
  <div class="dupla f-claro"><div class="d-hz">${hz.replace(/ff-hz-/g, 'h' + (n++) + '-')}</div><span class="sep"></span>${S(o, 'digital', 96)}</div>
  <div class="pc"><div><h4>A favor</h4><ul>${t.pros.map(x => `<li>${x}</li>`).join('')}</ul></div><div><h4>Atenção</h4><ul>${t.contras.map(x => `<li>${x}</li>`).join('')}</ul></div></div>
</section>`;
}

const css = fs.readFileSync(__dirname + '/board.css', 'utf8');
const html = `<title>Revisão do F de luz</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>${css}</style>
<main>
<header class="capa">
  <p class="eyebrow">Fireflies Consultoria · Identidade v2 · Rodadas 5b e 5c · 03/10/2026</p>
  <h1>F de luz: órbita redonda, F numa cor só</h1>
  <p class="lead">As opções A e C seguem, agora sem a segunda cor no F. O braço laranja disputava atenção com o vagalume. Sem ele, o vagalume passa a ser a única luz do símbolo.</p>
  <nav class="saltos"><a href="#mudanca">O que mudou</a><a href="#opcao-a">Opção A</a><a href="#opcao-c">Opção C</a><a href="#favicon">Favicon com rastro</a><a href="#comparativo">Comparativo</a><a href="#decidir">Para decidir</a></nav>
</header>

<section id="mudanca" class="mud">
  <h2>O que mudou</h2>
  <div class="antes-depois">
    ${['A', 'C'].map(k => `<figure class="f-claro">${S(R5[k], 'digital', 150)}<figcaption>${k} · rodada 5 (F bicolor)</figcaption></figure><span class="seta" aria-hidden="true">→</span><figure class="f-claro">${S(O[k], 'digital', 150)}<figcaption>${k} · agora (F numa cor)</figcaption></figure>`).join('<span class="gap"></span>')}
  </div>
  <div class="mud-txt">
    <h3>Como o F ficou numa cor só</h3>
    <p>Testamos duas formas. Na primeira, o braço do meio continua separado da haste por um respiro, como já acontece nas versões mono. Na segunda, o F vira um desenho inteiro.</p>
    <div class="fforma">
      <figure class="f-claro">${S({ ...O.A, fJunto: false }, 'digital', 120)}<figcaption>Com respiro</figcaption></figure>
      <figure class="f-claro rec-fig">${S(O.A, 'digital', 120)}<figcaption>F inteiro · adotado</figcaption></figure>
      <figure class="f-anil">${S({ ...O.A, fJunto: false }, 'digital-negativo', 120)}<figcaption>Com respiro</figcaption></figure>
      <figure class="f-anil rec-fig">${S(O.A, 'digital-negativo', 120)}<figcaption>F inteiro · adotado</figcaption></figure>
    </div>
    <p>Adotamos o <b>F inteiro</b>. Sem a cor, o respiro parece uma falha de desenho.</p>
  </div>
</section>

<div class="guia-tgl"><button type="button" id="tgl" aria-pressed="false">Mostrar construção</button><span>Sobrepõe a órbita completa, os eixos e a caixa do F nas peças grandes.</span></div>

${['A', 'C'].map(opcao).join('\n')}

<section id="favicon" class="fav">
  <p class="tag">Rodada 5c</p>
  <h2>Favicon: o vagalume com rastro</h2>
  <p>O favicon deixa de ser o F com um ponto e passa a ser o próprio vagalume com um trecho curto do voo. O F continua no símbolo e no app. No favicon, que aparece ao lado do nome na aba, quem assina é a luz.</p>
  <div class="fav-row"><figure class="f-claro">${FV('digital', 96, true)}<figcaption>Favicon da rodada 5b</figcaption></figure><figure class="f-anil">${FV('digital-negativo', 96, true)}<figcaption>Favicon da rodada 5b</figcaption></figure></div>
  ${Object.entries(FAV).map(([k, o]) => `
  <div class="fv-op">
    <header class="op-h"><span class="tag">Favicon · ${o.nome}</span>${k === 'arco' ? '<span class="rec">Recomendado</span>' : ''}</header>
    <p>${{ arco: 'Um arco de 150°: é literalmente o fim da órbita do símbolo, recortado. O vagalume sobe à direita, no mesmo sentido de voo.', diagonal: 'Um rastro quase reto, subindo na diagonal. É a forma mais rápida de ler, mas se aproxima de uma estrela cadente genérica.', laco: 'Um rastro de 260° que quase fecha o círculo. É o que mais lembra o símbolo, mas em 16 px pode ser lido como a letra C.' }[k]}</p>
    <div class="fv-grid">
      ${[['digital', 'f-claro'], ['digital-negativo', 'f-anil'], ['chapado', 'f-cal'], ['mono-anil', 'f-branco']].map(([c, f]) => `<figure class="${f}">${RS(o, c, 104, { asas: true })}<figcaption>${c}</figcaption></figure>`).join('')}
      <figure><div class="app-fv">${RS(o, 'digital-negativo', 96, { fundo: true, asas: true })}</div><figcaption>.ico / app</figcaption></figure>
    </div>
    <div class="fv-tams">
      ${[48, 32, 16].map(px => `<span class="t-claro">${RS(o, 'digital', px, { asas: px >= 32, micro: px < 32 })}<i>${px}</i></span><span class="t-escuro">${RS(o, 'digital-negativo', px, { asas: px >= 32, micro: px < 32 })}<i>${px}</i></span><span class="t-anil">${RS(o, 'digital-negativo', px, { fundo: true, asas: px >= 32, micro: px < 32 })}<i>${px}</i></span>`).join('')}
    </div>
    <div class="abas">
      <div class="aba claro">${RS(o, 'digital', 16, { micro: true })}<span>Fireflies Consultoria</span><b>×</b></div>
      <div class="aba escuro">${RS(o, 'digital-negativo', 16, { micro: true })}<span>Fireflies Consultoria</span><b>×</b></div>
    </div>
  </div>`).join('')}
  <p class="nota">Em 16 px o desenho é próprio: as asas saem e o rastro fica mais grosso e sem esmaecer, para não sumir na aba. A partir de 32 px as asas voltam. Recomendo o <b>Arco</b>: ele conta a mesma história do símbolo, o fim do voo chegando aceso, e não se confunde com uma estrela cadente nem com uma letra.</p>
</section>

<section id="comparativo" class="comp">
  <h2>Comparativo</h2>
  <div class="tbl"><table>
    <thead><tr><th></th><th>Atual</th><th>A · De frente</th><th>C · Selo</th></tr></thead>
    <tbody>
      <tr><th>Proporção da órbita (b/a)</th><td>0,33</td><td>1,00</td><td>1,00</td></tr>
      <tr><th>Voo (varredura)</th><td>304°</td><td>300°</td><td>330°</td></tr>
      <tr><th>Altura do F / largura da órbita</th><td>0,20</td><td>0,46</td><td>0,55</td></tr>
      <tr><th>Cores no F</th><td>2</td><td>1</td><td>1</td></tr>
      <tr><th>Preenche avatar e app</th><td>Fraco</td><td>Ótimo</td><td>Ótimo</td></tr>
      <tr><th>Leitura em 24 px</th><td>Fraca</td><td>Boa</td><td>Ótima</td></tr>
      <tr><th>Sensação de voo</th><td>Forte</td><td>Forte</td><td>Média</td></tr>
    </tbody>
  </table></div>
  <div class="lado">
    <figure class="f-claro">${atual('digital', 120)}<figcaption>Atual</figcaption></figure>
    ${['A', 'C'].map(k => `<figure class="f-claro">${S(O[k], 'digital', 120)}<figcaption>${k}</figcaption></figure>`).join('')}
    <figure class="f-claro">${S(O.A, 'digital', 64)}${S(O.C, 'digital', 32, { pequeno: true })}<figcaption>A + C pequeno</figcaption></figure>
  </div>
</section>

<section id="decidir" class="decidir">
  <h2>Para decidir</h2>
  <ol>
    <li><b>Favicon.</b> Arco, Diagonal ou Laço (recomendo o Arco).</li>
    <li><b>A, C ou as duas juntas.</b> A sugestão é usar A como símbolo, a partir de 40 px, e o desenho de C como símbolo pequeno, entre 24 e 39 px. Cada uma fica no tamanho em que funciona melhor.</li>
    <li><b>O "E de luz" no nome.</b> O braço laranja do E no wordmark tem a mesma lógica do braço do F. Ele fica como está, ou sai também para manter a coerência?</li>
  </ol>
</section>

<section id="depois" class="depois">
  <h2>Depois da aprovação</h2>
  <p>Com a opção escolhida, gero de novo, a partir de um script versionado em <code>v2/logo/_build/</code>:</p>
  <ul>
    <li><b>Logo:</b> <code>simbolo</code>, <code>simbolo-pequeno</code> e <code>favicon</code> nas 7 cores (21 SVG + 21 PNG de 2000 px), além de <code>favicon.ico</code>, avatar, ícones de app (Apple e Android), <code>construcao.svg</code> e a prancha do sistema.</li>
    <li><b>Manual de marca:</b> as seções "O símbolo" e "Logo" (construção, área de proteção e mínimos), além das imagens do símbolo.</li>
    <li><b>Manual de aplicação:</b> as pranchas "versões do logo por fundo" e "matriz de fundos".</li>
    <li><b>Aplicações</b> que usam o símbolo: slides, posts, carrossel, story, LinkedIn, avatar, cartão, crachá, timbrado e selo. Todas são regeneradas em SVG, PNG e PDF.</li>
    <li><b>README do logo:</b> a regra nova de construção ("a mesma órbita, vista de frente") e os novos tamanhos mínimos.</li>
  </ul>
  <p class="nota">As versões com o nome só mudam se o "E de luz" também perder a segunda cor.</p>
</section>
</main>
<script>
(() => {
  const b = document.getElementById('tgl');
  b.addEventListener('click', () => {
    const on = document.body.classList.toggle('mostra-guia');
    b.setAttribute('aria-pressed', on); b.textContent = on ? 'Esconder construção' : 'Mostrar construção';
  });
})();
</script>`;
fs.writeFileSync(__dirname + '/board.html', html);
console.log('board.html', (html.length / 1024).toFixed(0) + ' KB');
