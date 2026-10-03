// Monta a prancha de aprovação: board.html
const fs = require('fs');
const { simbolo, construcao } = require('./simbolo');
const O = require('./opcoes');
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
    tese: 'A mesma órbita do logo horizontal, agora vista de frente. Vira um círculo perfeito, com a abertura centrada no alto e o vagalume às 11 horas, sobre a haste do F.',
    pros: ['O mais equilibrado: o peso fica no centro e o círculo preenche o avatar e o ícone de app.', 'Narrativa simples para o manual: no nome a órbita aparece de lado, no símbolo aparece de frente.', 'Mantém tudo que dá sentido: voo horário, 40 % constelação e 60 % luz, 8 estrelas, vagalume com asas.'],
    contras: ['Perde a inclinação de −5°, que era um traço compartilhado com o horizontal.'],
  },
  B: {
    tese: 'A órbita fica quase redonda (proporção 0,80) e mantém uma inclinação de −12°. Ainda se lê como uma órbita vista em perspectiva, como no horizontal, só que bem menos achatada.',
    pros: ['É a mais próxima do símbolo atual. A família com o horizontal fica evidente.', 'A inclinação dá mais movimento do que um círculo perfeito.'],
    contras: ['Ocupa um pouco menos o quadrado e o círculo do avatar.', 'Em 24 px a elipse inclinada fica ambígua e pode parecer um erro de desenho.'],
  },
  C: {
    tese: 'Um círculo mais justo, com 330° de voo e a abertura mínima. O F fica maior e o fio de luz mais grosso. Funciona como um selo.',
    pros: ['A melhor leitura em tamanhos pequenos (24–48 px), com o F 10 % maior que em A.', 'Muito sólido em carimbo, bordado, gravação e favicon de app.'],
    contras: ['É a mais fechada: a órbita se aproxima de um "C" e a sensação de voo diminui.', 'Fica mais pesado ao lado do horizontal, que é leve e aéreo.'],
  },
};

function opcao(k) {
  const o = O[k], t = TXT[k];
  const cores = [['chapado', 'cal'], ['chapado-negativo', 'anil'], ['mono-anil', 'branco'], ['mono-branco', 'anil2']];
  return `<section class="op" id="opcao-${k.toLowerCase()}">
  <header class="op-h"><span class="tag">Opção ${k}</span><h2>${o.nome}</h2>${k === 'A' ? '<span class="rec">Recomendada</span>' : ''}</header>
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
  <p class="eyebrow">Fireflies Consultoria · Identidade v2 · Rodada 5 · 03/10/2026</p>
  <h1>F de luz: a órbita redonda</h1>
  <p class="lead">Três opções para redesenhar a órbita da versão reduzida. Em todas, o símbolo fica redondo e equilibrado e mantém o que dá sentido à marca: voo horário, constelação atrás, luz na frente e o vagalume aceso sobre o F.</p>
  <nav class="saltos"><a href="#diagnostico">Diagnóstico</a><a href="#opcao-a">Opção A</a><a href="#opcao-b">Opção B</a><a href="#opcao-c">Opção C</a><a href="#comparativo">Comparativo</a><a href="#depois">Depois da aprovação</a></nav>
</header>

<section id="diagnostico" class="diag">
  <div class="diag-fig">
    <figure class="f-claro"><div class="stage stage-q">${atual('digital', 260)}</div><figcaption>Atual · no quadrado</figcaption></figure>
    <figure><div class="avatar">${atual('digital-negativo', 104)}</div><figcaption>Atual · avatar</figcaption></figure>
  </div>
  <div class="diag-txt">
    <h2>Por que mexer</h2>
    <p>A regra atual diz que o símbolo é "a mesma órbita do horizontal × 0,1". Só que a órbita do horizontal foi desenhada para abraçar uma palavra longa. Por isso ela é muito achatada, com eixo menor de apenas 0,33 do maior.</p>
    <ul class="num">
      <li><b>3 : 1.</b> Em formatos quadrados ou circulares, o símbolo ocupa só um terço da altura. Sobra vazio em cima e embaixo.</li>
      <li><b>F pequeno.</b> O F tem 20 % da largura da órbita. No avatar ele vira um detalhe.</li>
      <li><b>Peso deslocado.</b> O F e o vagalume ficam à esquerda e a cauda de estrelas à direita. O conjunto parece cair para um lado.</li>
    </ul>
    <p class="nota">A proposta troca a regra por <b>"a mesma órbita, vista de frente"</b>. No nome, a órbita aparece de lado e por isso é achatada. No símbolo, olhamos de frente e ela fica redonda. Voo, trechos, estrelas e vagalume seguem iguais.</p>
  </div>
</section>

<div class="guia-tgl"><button type="button" id="tgl" aria-pressed="false">Mostrar construção</button><span>Sobrepõe a órbita completa, os eixos e a caixa do F nas peças grandes.</span></div>

${['A', 'B', 'C'].map(opcao).join('\n')}

<section id="comparativo" class="comp">
  <h2>Comparativo</h2>
  <div class="tbl"><table>
    <thead><tr><th></th><th>Atual</th><th>A · De frente</th><th>B · Três quartos</th><th>C · Selo</th></tr></thead>
    <tbody>
      <tr><th>Proporção da órbita (b/a)</th><td>0,33</td><td>1,00</td><td>0,80</td><td>1,00</td></tr>
      <tr><th>Inclinação</th><td>−5°</td><td>0°</td><td>−12°</td><td>0°</td></tr>
      <tr><th>Voo (varredura)</th><td>304°</td><td>300°</td><td>300°</td><td>330°</td></tr>
      <tr><th>Altura do F / largura da órbita</th><td>0,20</td><td>0,46</td><td>0,39</td><td>0,55</td></tr>
      <tr><th>Preenche avatar e app</th><td>Fraco</td><td>Ótimo</td><td>Bom</td><td>Ótimo</td></tr>
      <tr><th>Leitura em 24 px</th><td>Fraca</td><td>Boa</td><td>Regular</td><td>Ótima</td></tr>
      <tr><th>Parentesco visível com o horizontal</th><td>Literal</td><td>Por conceito</td><td>Forte</td><td>Por conceito</td></tr>
    </tbody>
  </table></div>
  <div class="lado">
    <figure class="f-claro">${atual('digital', 120)}<figcaption>Atual</figcaption></figure>
    ${['A', 'B', 'C'].map(k => `<figure class="f-claro">${S(O[k], 'digital', 120)}<figcaption>${k}</figcaption></figure>`).join('')}
  </div>
  <p class="rec-txt"><b>Recomendação: Opção A.</b> É a que melhor resolve o pedido, redonda e equilibrada, e a explicação cabe numa frase do manual. Se quiserem mais movimento, a B é o caminho. Se a prioridade for uso pequeno, como app, carimbo e bordado, a C. Também dá para combinar: A como símbolo e o desenho de C como símbolo pequeno.</p>
</section>

<section id="depois" class="depois">
  <h2>Depois da aprovação</h2>
  <p>Com a opção escolhida, gero de novo, a partir de um script versionado em <code>v2/logo/_build/</code>:</p>
  <ul>
    <li><b>Logo:</b> <code>simbolo</code> e <code>simbolo-pequeno</code> nas 7 cores (14 SVG + 14 PNG de 2000 px), além de avatar, ícones de app (Apple e Android), <code>construcao.svg</code> e a prancha do sistema.</li>
    <li><b>Manual de marca:</b> as seções "O símbolo" e "Logo" (construção, área de proteção e mínimos), além das imagens do símbolo.</li>
    <li><b>Manual de aplicação:</b> as pranchas "versões do logo por fundo" e "matriz de fundos".</li>
    <li><b>Aplicações</b> que usam o símbolo: slides, posts, carrossel, story, LinkedIn, avatar, cartão, crachá, timbrado e selo. Todas são regeneradas em SVG, PNG e PDF.</li>
    <li><b>README do logo:</b> a regra nova de construção ("a mesma órbita, vista de frente") e os novos tamanhos mínimos.</li>
  </ul>
  <p class="nota">O favicon (só F + luz) e as versões com o nome não mudam.</p>
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
