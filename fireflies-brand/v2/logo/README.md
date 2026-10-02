# Fireflies: sistema de logo v2, "Rastro que acende"

O símbolo é a opção **A · Lua-constelação**, escolhida pelo cliente e refinada em 4 rodadas (R4).
- A meia-lua deixou de ser uma lúnula e virou o **rastro de luz do vagalume**.
- O voo começa com 6 piscadas, que viram um traço contínuo que engrossa até a cabeça, onde está o vagalume aceso.
- A constelação no alto à esquerda se liga à luz por uma linha pontilhada: o vagalume "acende a rede".

O wordmark é o aprovado: **Sora 620, caixa alta, "E de luz"**. O descritor é **Sora 300**, com versal de 0,30 da versal do nome e tracking de 0,97 em.

## Versões (`svg/` e `png/`)
Arquivos no formato `fireflies_{versao}_{cor}.svg|png`. Os PNGs têm 2000 px no lado maior e fundo transparente.

| versão | uso |
|---|---|
| `horizontal` | **principal**: site, documentos, assinatura de e-mail, propostas |
| `vertical` | capas, fachada, redes, peças quadradas |
| `simbolo` | de 40 px para cima: avatar, selo, aplicações sem nome |
| `simbolo-pequeno` | de 24 a 39 px: a rede vira filete contínuo, sem pontilhado, e o halo é 1 anel grosso |
| `favicon` | 16 px: só o rastro + a luz |
| `wordmark` | quando o símbolo já aparece na mesma peça |
| `condominios-horizontal` | linha de auditoria de condomínios (descritor CONDOMÍNIOS) |
| `academy-horizontal` | Fireflies Academy (descritor ACADEMY) |

| cor | composição | fundo |
|---|---|---|
| `gradiente` | **principal no digital.** Rastro âmbar #F2B544 → vermelhão #E65A3E no sentido do voo (mais quente na cabeça), rede e nome em anil #17183A, braço do E em vermelhão, lanterna âmbar com contorno anil | Branco, Cal |
| `gradiente-negativo` | rastro em gradiente, rede e nome em Cal #EDEEEA, braço do E e lanterna em âmbar | Anil #17183A |
| `chapado` | 2 cores: tudo em anil e o âmbar só na lanterna (o braço do E fica em anil e o respiro preserva o acento) | Branco, Cal |
| `negativo` | Cal + âmbar (lanterna, anel e braço do E) | Anil |
| `mono-anil` / `mono-preto` / `mono-branco` | 1 cor; a lanterna é a maior estrela, com 1 anel | claro / claro / escuro ou foto |

Outros arquivos:
- `favicon.ico` (16/32/48)
- `apple-touch-icon-180.png`
- `android-192.png` e `android-512.png` (símbolo dentro da zona segura de 62 %)
- `avatar-1080.png` (símbolo sobre Anil)
- `og-base-1200x630.png`
- `construcao.svg`
- `prancha-sistema.png`

## Gradiente ou chapado?
- **Gradiente:** versão principal em tudo que é tela, como site, redes, apresentações, PDF digital, vídeo e impressão em 4 cores de boa qualidade.
- **Chapado (anil + âmbar):** impressão em 2 cores (Pantone), papelaria barata, brindes em serigrafia e sinalização em vinil.
- **1 cor:** carimbo, gravação a laser, bordado, fax, jornal, documentos em preto e branco e marca-d'água.
- No bordado, use `simbolo-pequeno` ou `horizontal` em mono, com no mínimo 25 mm de largura, para que as piscadas e os pontos não fechem.
- Nunca aplique o gradiente sobre foto sem véu anil (60–80 %). Nunca use o gradiente no wordmark.

## Área de proteção
- **X = altura da versal de FIREFLIES.**
- Nos lockups (horizontal, vertical, condomínios, academy), a área de proteção é **½ X** em todos os lados.
- No símbolo isolado, a área de proteção é **¼ da altura do símbolo**.
- Construção do lockup horizontal: símbolo = **2,1 X** de altura, centrado no bloco nome + descritor; respiro entre símbolo e nome = **0,55 X**.

## Tamanhos mínimos
| peça | digital | impresso |
|---|---|---|
| horizontal com descritor | 240 px de largura | 40 mm |
| horizontal abaixo disso | use `wordmark` sem descritor + `simbolo-pequeno` | 25 mm |
| vertical | 120 px de largura | 22 mm |
| simbolo | 40 px | 12 mm |
| simbolo-pequeno | 24 a 39 px | 7 a 12 mm |
| favicon | 16 px | — |

## Cores
| nome | HEX | papel |
|---|---|---|
| Anil de Junho | #17183A | tinta principal, fundo escuro |
| Cal Virgem | #EDEEEA | fundo claro, tinta no negativo |
| Branco | #FFFFFF | papel |
| Âmbar de Vagalume | #F2B544 | a luz (lanterna), início do rastro |
| Vermelhão | #E65A3E | fim do rastro (cabeça), braço do E no claro |

Regras de cor:
- O âmbar nunca é texto sobre fundo claro.
- No claro, a lanterna leva sempre o contorno anil, para garantir 3:1.

## Não fazer
- Redesenhar o rastro como meia-lua simétrica, com as duas pontas finas.
- Aplicar sombra, brilho com blur ou estrela de 4 pontas na lanterna.
- Trocar a fonte, mudar a ordem nome/símbolo ou girar o símbolo.
- Usar o `simbolo` (pontilhado) abaixo de 40 px: use o `simbolo-pequeno`.

## Técnica
- Todos os SVGs usam formas cheias (círculos e paths) e nenhuma `<mask>`.
- O gradiente é um `linearGradient` com id único por arquivo.
- O texto está convertido em curvas.
- Os geradores estão no scratchpad: `v2/logo-A/_build/` (`system.js`, `syspng.js`, `syscons.js` e `sysboard.js`). As rodadas estão em `v2/logo-A/r4-rodada1..4.png`.
