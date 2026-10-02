# Fireflies v2 · Sistema iconográfico "Carta do Lume"

O vagalume é **o que** se desenha. A carta celeste é **como** se desenha. A iconografia usa essa gramática em quatro camadas: estrelas de magnitudes diferentes, traço de constelação pontilhado, retícula e graduação. O âmbar aparece uma única vez em cada peça, como **lanterna**.

| Camada | Onde | Quantidade |
|---|---|---|
| 1. Ícones de linha | `icones/svg/*.svg`, `icones/sprite.svg`, `icones/prancha.png` | 79 |
| 2. Constelações dos serviços | `constelacoes/svg/*.svg` (com e sem letras de Bayer), `constelacoes/prancha.png` | 8 (16 arquivos) |
| 3. Ornamentos de carta celeste | `ornamentos/svg/*.svg`, `ornamentos/prancha.png` | 21 |
| 4. Padrões repetíveis | `padroes/*.svg`, `padroes/prancha.png` | 4 × claro/escuro = 8 |
| Geradores | `_build/` | |

---

## Gramática comum

| Elemento | Construção | Regra |
|---|---|---|
| **Estrela** | círculo cheio, `fill="currentColor"` | Marca os nós que importam: vértice, junção, origem, ponto de decisão. Não serve de enfeite. |
| **Ponto** | círculo cheio menor | É a magnitude baixa: janelas, grades, marcas de leitura. |
| **Lanterna** | círculo maior, `class="lit"`, `fill: var(--ff-lit, currentColor)` | **No máximo 1 por peça.** Marca o ponto de luz: o resultado, a decisão, o responsável. |
| **Traço de constelação** | `stroke-dasharray="0 N"` + ponta redonda = pontos redondos | Nos ícones, **no máximo 1 linha** pontilhada. O passo é recalculado para fechar exatamente nas pontas. |

A lanterna é uma estrela, nunca uma lâmpada: não tem raios, halo nem brilho.

## 1. Ícones de linha (grid 24)

- O grid é 24 com área viva de 20 (2–22). Traço de 1,5, `stroke-linecap` e `stroke-linejoin` redondos, tudo em `currentColor`.
- Medidas: estrela r 1,25; ponto r 0,8; lanterna r 1,6–3 (padrão 2,1). No claro, a lanterna leva contorno de 0,75 via `--ff-lit-edge`.
- Pontilhado: pontos de 1,5 com passo de ≈ 3.
- Categorias:

| Categoria | Qtd. | Ícones |
|---|---|---|
| Serviços | 8 | auditoria, contabil, fiscal, financeira, processos, sindicancia, condominios, academy |
| Contabilidade e finanças | 20 | balancete, dre, conciliacao, nota-fiscal, guia-imposto, folha, fluxo-caixa, orcamento, rateio, inadimplencia, fundo-reserva, conferencia, parecer, livro-razao, carimbo, assinatura, prazo, cofre, investimento, custo |
| Condomínio | 10 | predio, assembleia, sindico, portaria, manutencao, agua, energia, gas, elevador, prestacao-contas |
| Processos e tecnologia | 10 | painel-mensal, fluxograma, checklist, planilha, banco-de-dados, sincronia, api, automacao, seguranca, indicador |
| Pessoas e comunicação | 10 | responsavel, equipe, reuniao, conversa, email, telefone, endereco, apresentacao, atendimento, credencial |
| Academy | 6 | aula, certificado, trilha, video-aula, apostila, turma |
| Interface | 15 | seta-direita/esquerda/cima/baixo, check, fechar, mais, menos, busca, menu, download, link, info, alerta, calendario |

- **Desenhos de ofício** no lugar de metáforas de banco de imagens:
  - **contábil** é o razonete (conta T);
  - **livro-razão** traz um T na capa;
  - **fluxo de caixa** é o diagrama de setas da matemática financeira;
  - **guia de imposto** tem canhoto picotado e um "%" formado por duas estrelas;
  - **DRE** é uma cascata;
  - **inadimplência** e **prazo** são círculos que ficam pontilhados no trecho que falta;
  - **trilha** (Academy) é o voo em J do *Photinus*, que acende na subida.
- **Setas:** a cauda pontilhada indica a trajetória. Os demais itens de interface ficam limpos, para não poluir formulários.
- **Uso no código:**

```html
<svg width="24" height="24"><use href="sprite.svg#ff-auditoria"/></svg>
```

```css
.on-light { color:#17183A; --ff-lit:#F2B544; --ff-lit-edge:#17183A; }
.on-dark  { color:#EDEEEA; --ff-lit:#F2B544; --ff-lit-edge:none; }
```

Sem as variáveis, a lanterna herda `currentColor` e o ícone fica em 1 cor, ainda legível, porque a lanterna é o maior círculo.

- **Tamanhos:** 20 px é o mínimo de uso e foi testado a 1× no claro e no escuro (`_build/review/r20x3.png`). A 16 px os ícones simples funcionam; os densos (fiscal, dre, condominios, turma) devem ficar em 20 px ou mais. Não mude a espessura do traço: aumente o tamanho do ícone.

## 2. Constelações dos serviços (grid 64)

Cada serviço vira uma constelação catalogada:

| Serviço | Constelação |
|---|---|
| Auditoria | *Lens* (lupa) |
| Contábil | *Ratio* (razonete) |
| Fiscal | *Libra Fisci* (balança, com a lanterna no fiel) |
| Financeira | *Ascensio* |
| Processos | *Fluxus* |
| Sindicância | *Oculus* |
| Condomínios | *Domus* (uma janela acesa) |
| Academy | *Liber* (livro aberto, com a luz acima) |

- **Estrelas:** 3 magnitudes, com r 2,6 / 1,8 / 1,1.
- **Lanterna:** r 4,2.
- **Ligações pontilhadas:** traço de 1,4, recuadas 2,2 da borda de cada estrela, como nas cartas gravadas.
- **Limite tracejado:** em degraus, como os limites da IAU, em `--ff-line`.
- **Letras de Bayer:** α é sempre a lanterna, e β/γ ficam nas estrelas mais fortes.
- **Variantes:** `*-sem-letras.svg` para tamanhos de 48–96 px. Abaixo de 48 px, use o ícone de linha do serviço.
- **Uso:** capas, divisórias de seção, posts e abertura de módulos da Academy. **1 emblema por página.**

## 3. Ornamentos (21 peças)

| Grupo | Peças |
|---|---|
| Retículas | reticula-planisferio (projeção ortográfica a cada 15°, eclíptica pontilhada a 23,44°), reticula-plana |
| Medida | regua-graduada, limbo-astrolabio, escala-grafica ("dias até a primeira luz", 0–30) |
| Orientação | rosa-de-pontos (16 rumos do mesmo comprimento: **não** forma estrela de 4 pontas), marca-posicao, etiqueta-coordenada (23°33′S 46°38′O, Praça da Sé) |
| Selos | selo-graduado (centro livre para o símbolo), selo-graduado-texto |
| Vagalume | trilha-photinus: os pontos crescem só na subida e terminam na lanterna |
| Legenda | numerais-magnitude (α, 0–5), linha-de-chamada |
| Listas | marcador-estrela, marcador-estrela-acesa, marcador-ponto |
| Divisores e molduras | divisor-pontilhado, divisor-constelacao, cantoneira-graduada, moldura-carta (neatline alternado de carta topográfica), cartela |

Os textos estão convertidos em curvas (IBM Plex Mono/Sans), então os SVGs não dependem de fonte instalada. As linhas secundárias usam `var(--ff-line, currentColor)`: Céu de Anil #6E89B4 no escuro e Pedra-Sabão #5E6271 ou Anil no claro.

## 4. Padrões (SVG `<pattern>`, sem emenda)

| Padrão | Tile | Construção | Uso |
|---|---|---|---|
| campo-estrelas | 720 | grade com jitter, 4 magnitudes em lei de potência | capas, verso de cartão, fundos de slide |
| reticula-celeste | 480 | meridianos e paralelos a 60 px (15°), graduação a 12 px | páginas, mapas, área de gráfico |
| constelacao-continua | 720 | árvore geradora mínima em métrica periódica: sem ciclos, para ler como figura de constelação e não como "rede neural" | redes sociais, divisórias, envelopes |
| matriz-pontos | 600 | passo 12, guia a cada 60 | painel mensal, tabelas, fundo de dados |

- **Lanterna:** 1 por tile. Isso dá cerca de 1 luz a cada 500–700 px, o que mantém a luz rara.
- **Determinismo:** a semente é 1603, ano da *Uranometria*. Gerar de novo produz o mesmo céu.
- **Bordas:** o que sai por um lado do tile entra pelo outro (desenho replicado nas 9 vizinhanças), então não há emenda.
- **Versões:** `-claro` (Anil sobre Cal Virgem; lanterna com contorno Anil) e `-escuro` (Cal e Céu de Anil sobre Anil; lanterna âmbar pura).
- **Reaproveitamento:** para usar o padrão em outra peça, copie o `<pattern>` de dentro do SVG.

---

## Uso por fundo

| Fundo | Traço/estrelas | Lanterna | Linhas secundárias |
|---|---|---|---|
| Branco #FFF / Cal Virgem #EDEEEA | Anil #17183A | Âmbar #F2B544 **com contorno Anil colado** (âmbar sobre branco tem só 1,8:1) | Anil a 20–45% ou Pedra-Sabão |
| Anil de Junho #17183A | Cal Virgem #EDEEEA | Âmbar puro, sem contorno | Céu de Anil #6E89B4 |
| Âmbar #F2B544 (raro) | Anil | Anil: a lanterna é só a maior estrela | Anil a 40% |
| Vermelhão / Rubrica | Cal | Cal | Cal a 50% |
| 1 cor (carimbo, gravação, bordado) | cor única | `currentColor`: continua sendo a maior estrela | cor única |

Vermelhão #E65A3E e Rubrica #A9301F servem para estado: o ícone `alerta` vai em Rubrica no claro e em Vermelhão no escuro, sempre com rótulo de texto. Nunca use só a cor para diferenciar.

## O que não fazer

- Mais de 1 lanterna por peça, ou lanterna sem motivo. Ela marca o resultado, a decisão ou o responsável.
- Âmbar como cor de traço ou de texto. Âmbar só existe na lanterna.
- Âmbar sem contorno sobre fundo claro em tamanhos de ícone.
- Brilho, glow, halo, raios ou degradê na lanterna. Lâmpada nunca.
- Estrela de 4 pontas ✦ ou qualquer "sparkle". Uma estrela aqui é sempre um círculo.
- Ligar tudo com tudo: rede com ciclos de nós ciano e roxo é o "look de IA" que esta marca recusa. Constelação é árvore, com asterismos separados.
- Mais de 1 linha pontilhada em ícone de 24, ou pontilhado em ícone abaixo de 20 px.
- Misturar estes ícones com Lucide, Heroicons ou Material. Se faltar um ícone, desenhe com `_build/icones.js` e as primitivas `st`, `pt`, `lit`, `dot`.
- Alterar o traço (1,5) para "dar peso". Use o tamanho.
- Cruzeiro do Sul em qualquer constelação, padrão ou ornamento.
- Aplicar sobre foto sem véu Anil de 60–80%.
- Encher a página: no máximo 1 emblema e 1 padrão por composição. Os ornamentos funcionam como pontuação, não como papel de parede.

## Regenerar

```bash
cd _build
node icones.js --inspecao   # svg/, sprite.svg, prancha.png e review/inspecao-icones.png (96 px com grade)
node review20.js            # review/r20x3.png: todos os ícones a 20 px, 1×, ampliados 3×
node constelacoes.js
node ornamentos.js
node padroes.js
```

As dependências são Playwright (`/opt/node22/lib/node_modules/playwright`) e opentype.js. O `lib.js` procura primeiro um `opentype.js` local e, se não achar, o do scratchpad da equipe de tipografia. As fontes (Cormorant Garamond, IBM Plex Sans e Mono, OFL) estão em `_build/fonts/`.

O `icones.js` valida as regras a cada geração: acusa mais de 1 lanterna, mais de 1 pontilhado e geometria perto da borda da área viva.

## Revisão (3 rodadas, registradas em `_build/review/`)

1. **Rodada 1:**
   - a DRE em barras soltas ficou ilegível e virou cascata;
   - a conciliação em "X" virou duas colunas casadas;
   - o pote de fundo de reserva lia como frasco de poção ("alquimia" é palavra proibida);
   - a assembleia em arco lia como sol nascente e virou urna com voto;
   - sincronia em triângulo lia como "alerta/pirâmide" e virou anéis entrelaçados;
   - o último ponto dos pontilhados curtos sumia, e o comprimento foi compensado.
2. **Rodada 2:**
   - a reunião em mesa redonda vista de cima lia como sol e virou duas pessoas ligadas por pontilhado;
   - a portaria foi redesenhada;
   - a balança-constelação lia como "boneco": a lanterna saiu do topo para o fiel, a base ficou reta e os pratos ficaram largos;
   - a ligação diagonal do edifício-constelação foi corrigida;
   - a rosa de pontos com cardeais longos lia como sparkle e passou a ter raios iguais;
   - um bug de NaN no texto em curvas foi corrigido.
3. **Rodada 3:**
   - o fundo de reserva com tampa lia como lixeira e virou pote de boca larga com nível pontilhado;
   - a lanterna dos padrões ficou mais rara (tiles de 480–720);
   - os ornamentos pequenos ganharam escala na prancha.

## Arquivos com cores aplicadas (para Illustrator, PowerPoint, Canva, Figma)

Os SVGs originais (`svg/`) usam `currentColor` e variáveis CSS, o que é ideal para web. Para programas de design e Office, use as versões com cor já aplicada:

| Pasta | Uso | Traço | Linhas secundárias | Lanterna |
|---|---|---|---|---|
| `*/svg-claro/` e `*/png-claro/` | fundos Branco e Cal | Anil | Pedra-Sabão | Âmbar com contorno Anil |
| `*/svg-escuro/` e `*/png-escuro/` | fundo Anil | Cal | Céu de Anil | Âmbar |
| `*/svg-mono-anil/` e `*/png-mono-anil/` | 1 cor, carimbo, gravação | Anil | Anil | Anil (a maior estrela) |

- Os PNGs têm fundo transparente: ícones em 512 px, constelações e ornamentos em 1024 px de largura.
- Os padrões ficam em `padroes/png/*-2000.png` (2000 × 2000 px, repetíveis).
- Para regerar: `node _build/exportar-cores-png.js`.
