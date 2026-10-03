# Fireflies: sistema de logo final, "Órbita do vagalume"

Uma **órbita constelada** envolve o nome.
- A metade de trás da órbita é **constelação**: um fio finíssimo, frio (anil ou cal), com 8 estrelas de 3 magnitudes enfiadas nele.
- Sem quebra, o mesmo fio engrossa e esquenta (anil → rubrica → vermelhão → âmbar) até o **vagalume aceso** na ponta: a luz com brilho e duas asas em fio.
- O vagalume fica logo acima do **E de luz** do wordmark, então as duas luzes da marca conversam.

A versão curta é o **F em órbita**: **a mesma órbita do nome, vista de frente**. No nome, a órbita aparece de lado e por isso é achatada. No símbolo, é vista de frente e fica redonda. A direção do voo, os trechos (constelação e luz), as 8 estrelas e o vagalume são os mesmos. O F é inteiro e de uma cor só: no símbolo, a única luz é o vagalume.

O favicon é o próprio **vagalume com um rastro curto**, sem o F.

Tudo neste sistema (símbolo, símbolo pequeno, favicons, ícones, construções e prancha) é gerado por `_build/gerar.js`, com os parâmetros aprovados em `_build/parametros.js` (rodada 5, 03/10/2026). O histórico da decisão fica em `../_decisao/rodada5-simbolo-redondo/`.

O wordmark é o aprovado, sem alteração:
- nome: Sora 620, caixa alta, "E de luz";
- descritor: Sora 300, versal de 0,30 X e tracking de 0,97 em.

## Versões (`svg/` e `png/`)
Os arquivos seguem o padrão `fireflies_{versao}_{cor}.svg|png`. Os PNGs têm 2000 px no lado maior e fundo transparente.

| versão | uso |
|---|---|
| `horizontal` | **principal**: site, documentos, propostas, assinatura de e-mail, fachada |
| `vertical` | órbita curta com o vagalume sobre o nome: capas, redes, peças quadradas e verticais |
| `simbolo` | F em órbita (órbita redonda), a partir de 40 px: avatar, app, selo, carimbo, rodapé de slide |
| `simbolo-pequeno` | de 24 a 39 px (7 a 12 mm): círculo mais fechado (330°), F maior, fio grosso e constante, sem estrelas e sem asas |
| `favicon` | **favicon principal (Arco)**: o vagalume com asas e um rastro curto em arco, que é o fim do voo. A partir de 32 px |
| `favicon-16` | o mesmo Arco desenhado para 16 a 31 px: sem asas, com o rastro mais grosso e sem esmaecer. Só SVG |
| `favicon-diagonal`, `favicon-diagonal-16` | **guardado** para outros usos: rastro quase reto, subindo. Lê rápido e combina com movimento (vídeo, animação, indicador de carregamento) |
| `favicon-laco`, `favicon-laco-16` | **guardado** para outros usos: rastro de 260°, quase fechando o círculo. Mais próximo do símbolo (ícone de recurso, selo pequeno) |
| `wordmark` | quando a órbita já aparece na peça, ou em espaços muito baixos |
| `condominios-horizontal` | linha de auditoria de condomínios (descritor CONDOMÍNIOS) |
| `academy-horizontal` | Fireflies Academy (descritor ACADEMY) |

| cor | composição | fundo |
|---|---|---|
| `digital` | **principal em tela.** Gradiente no fio (anil → rubrica → vermelhão → âmbar), estrelas e nome em Anil, braço do E em Vermelhão, vagalume com brilho radial | Branco, Cal |
| `digital-negativo` | igual ao digital, com o frio em Cal/Céu de Anil, o nome em Cal e o braço do E e a luz em Âmbar | Anil |
| `chapado` | **2 cores:** Anil (nome, estrelas, asas) + Vermelhão (órbita, braço do E, luz). Sem gradiente e sem brilho | Branco, Cal |
| `chapado-negativo` | 2 cores: Cal + Âmbar | Anil |
| `mono-anil`, `mono-preto` | 1 cor. O E de luz continua se lendo pelo respiro | claro |
| `mono-branco` | 1 cor branca | escuro ou foto com véu |

Outros arquivos:
- `favicon.ico`: vagalume com rastro (Arco) sobre um quadrado Anil arredondado. Em 16 px usa o desenho de 16; em 32 e 48 px, o desenho com asas;
- `favicon.svg`: favicon do site (desenho de 16 px, em cores que funcionam em aba clara e escura);
- `apple-touch-icon-180.png`;
- `android-192.png` e `android-512.png` (símbolo dentro da zona segura de 80 %);
- `avatar-1080.png` (F em órbita sobre Anil, dentro do círculo de 70 %);
- `og-base-1200x630.png`;
- `construcao.svg` (lockup horizontal) e `construcao-simbolo.svg` (F em órbita);
- `prancha-sistema.png`;
- `_build/`: gerador (`node gerar.js`; precisa de `npm ci` em `../aplicacoes/_build`).

## Digital, chapado ou mono?
- **Digital:** tudo que é tela, como site, redes, apresentação, PDF, vídeo, e também impressão em 4 cores de boa qualidade. É a única versão com gradiente e brilho.
- **Chapado:** impressão em 2 cores (Pantone), serigrafia, vinil, sinalização e papelaria econômica.
- **Mono:** carimbo, gravação a laser, hot stamping, bordado, documentos P&B, jornal e marca-d'água.
- Bordado: use `simbolo-pequeno` ou `horizontal` em mono. O horizontal precisa de no mínimo 60 mm de largura, para que o fio e as estrelas não fechem.
- Sobre foto, use `digital-negativo` ou `mono-branco`, sempre com véu Anil de 60–80 %.

## Construção (ver `construcao.svg`)
**X** é a altura da versal de FIREFLIES.

**Órbita:**
- elipse com a = 5,6 X e b = 1,85 X (b/a = 0,33);
- inclinação de −5°;
- centro no centro do bloco nome + descritor;
- voo no sentido horário: começa no alto à direita (−40°) e termina no alto, sobre o E de luz (−96°).

**Trechos:**
- de 0 a 40 % do voo, constelação: fio de 0,013 X com 8 estrelas, em ritmo que acelera 0,86;
- de 40 a 100 %, luz: o fio vai de 0,013 X a 0,085 X.

**Vagalume:**
- núcleo de 0,07 X;
- halo de 0,46 X;
- asas de 0,4 X, em fio de 0,023 X, abertas ±26° para trás do voo.

**Símbolo (ver `construcao-simbolo.svg`):**
- a mesma órbita, vista de frente: um círculo de diâmetro **D**;
- voo horário de 300°: começa por volta de 1 h (−54°) e termina às 11 h (−114°), com a abertura centrada no alto;
- trechos iguais aos do nome: de 0 a 40 % é constelação (fio fino com 8 estrelas, ritmo 0,86) e de 40 a 100 % é luz (o fio engrossa até o vagalume);
- F da Sora, inteiro e de uma cor só, com altura de 0,46 D, centrado na órbita e deslocado 0,015 D para a direita (compensação óptica).

**Símbolo pequeno:** círculo de 330°, F com 0,55 D, fio grosso e constante, núcleo maior, sem estrelas e sem asas.

**Favicon (Arco):** os últimos 150° de um círculo, que é o fim do voo, com o rastro afinando para trás e o vagalume na ponta, subindo à direita. As asas aparecem a partir de 32 px.

## Área de proteção
- Nos lockups (`horizontal`, `vertical`, `condominios`, `academy`): **X/2** em volta da caixa da órbita, incluindo o vagalume.
- No símbolo: **¼ D** (um quarto do diâmetro da órbita).
- O nome nunca encosta na órbita. A folga mínima entre órbita e letra é 0,25 X.

## Tamanhos mínimos
| peça | digital | impresso |
|---|---|---|
| horizontal (com descritor e asas) | 240 px de largura; as asas se leem a partir de 360 px | 45 mm |
| horizontal abaixo disso | use o `wordmark` | 30 mm |
| vertical | 160 px de largura | 30 mm |
| simbolo | 40 px | 12 mm |
| simbolo-pequeno | 24 a 39 px | 7 a 12 mm |
| favicon | 32 px ou mais (abaixo disso, `favicon-16`, a partir de 16 px) | — |

## Cores
| nome | HEX | papel |
|---|---|---|
| Anil | #17183A | nome, estrelas, fundo escuro |
| Cal Virgem | #EDEEEA | fundo claro, tinta no negativo |
| Branco | #FFFFFF | papel |
| Âmbar | #F2B544 | a luz (vagalume), E de luz no escuro |
| Vermelhão | #E65A3E | E de luz no claro, órbita no chapado |
| Rubrica | #A9301F | transição do gradiente |
| Céu de Anil | #6E89B4 | transição fria no negativo |

## Não fazer
- Cruzar letras com a órbita, mudar a inclinação do lockup ou fechar a órbita.
- Achatar a órbita do símbolo (ele é sempre redondo) ou pintar o braço do F com outra cor.
- Trocar a direção do voo, ou tirar o vagalume da ponta (no nome, ele fica sobre o E de luz; no símbolo, sobre a haste do F).
- Engrossar o fio da constelação, ou usar gradiente na versão chapada.
- Usar o âmbar como texto sobre fundo claro.
- Aplicar sombra, glow extra ou estrela de 4 pontas.

As versões anteriores ("Rastro que acende", R4) estão em `../_arquivo/logo-rastro-r4/`.
