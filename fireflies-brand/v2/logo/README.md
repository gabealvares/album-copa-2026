# Fireflies: sistema de logo final, "Órbita do vagalume"

Uma **órbita constelada** envolve o nome.
- A metade de trás da órbita é **constelação**: um fio finíssimo, frio (anil ou cal), com 8 estrelas de 3 magnitudes enfiadas nele.
- Sem quebra, o mesmo fio engrossa e esquenta (anil → rubrica → vermelhão → âmbar) até o **vagalume aceso** na ponta: a luz com brilho e duas asas em fio.
- O vagalume fica logo acima do **E de luz** do wordmark, então as duas luzes da marca conversam.

A versão curta é o **F de luz** na **mesma órbita**, com escala 0,1 e a mesma inclinação, excentricidade, direção de voo, trechos e vagalume.

O wordmark é o aprovado, sem alteração:
- nome: Sora 620, caixa alta, "E de luz";
- descritor: Sora 300, versal de 0,30 X e tracking de 0,97 em.

## Versões (`svg/` e `png/`)
Os arquivos seguem o padrão `fireflies_{versao}_{cor}.svg|png`. Os PNGs têm 2000 px no lado maior e fundo transparente.

| versão | uso |
|---|---|
| `horizontal` | **principal**: site, documentos, propostas, assinatura de e-mail, fachada |
| `vertical` | órbita curta com o vagalume sobre o nome: capas, redes, peças quadradas e verticais |
| `simbolo` | F de luz em órbita, a partir de 40 px: avatar, app, selo, carimbo |
| `simbolo-pequeno` | de 24 a 39 px: mesma composição, com fio grosso e constante, sem estrelas e sem asas |
| `favicon` | 16 px (também usado no .ico até 48 px): só o F de luz e o vagalume aceso, no mesmo lugar em relação ao braço de luz |
| `wordmark` | quando a órbita já aparece na peça, ou em espaços muito baixos |
| `condominios-horizontal` | linha de auditoria de condomínios (descritor CONDOMÍNIOS) |
| `academy-horizontal` | Fireflies Academy (descritor ACADEMY) |

| cor | composição | fundo |
|---|---|---|
| `digital` | **principal em tela.** Gradiente no fio (anil → rubrica → vermelhão → âmbar), estrelas e nome em Anil, braço do E em Vermelhão, vagalume com brilho radial | Branco, Cal |
| `digital-negativo` | igual ao digital, com o frio em Cal/Céu de Anil, o nome em Cal e o braço do E e a luz em Âmbar | Anil |
| `chapado` | **2 cores:** Anil (nome, estrelas, asas) + Vermelhão (órbita, braço do E, luz). Sem gradiente e sem brilho | Branco, Cal |
| `chapado-negativo` | 2 cores: Cal + Âmbar | Anil |
| `mono-anil`, `mono-preto` | 1 cor. O E de luz e o braço do F continuam se lendo pelo respiro | claro |
| `mono-branco` | 1 cor branca | escuro ou foto com véu |

Outros arquivos:
- `favicon.ico` (16/32/48, sobre um quadrado Anil arredondado);
- `apple-touch-icon-180.png`;
- `android-192.png` e `android-512.png` (símbolo dentro da zona segura de 80 %);
- `avatar-1080.png` (F em órbita sobre Anil, dentro do círculo);
- `og-base-1200x630.png`;
- `construcao.svg`;
- `prancha-sistema.png`.

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

**Símbolo:**
- a mesma órbita × 0,1;
- F de luz com altura de 0,2 × a largura da órbita;
- F posicionado sob a luz, um pouco à esquerda do centro, como o E de luz no nome.

## Área de proteção
- Nos lockups (`horizontal`, `vertical`, `condominios`, `academy`): **X/2** em volta da caixa da órbita, incluindo o vagalume.
- No símbolo: **¼ da largura da órbita**.
- O nome nunca encosta na órbita. A folga mínima entre órbita e letra é 0,25 X.

## Tamanhos mínimos
| peça | digital | impresso |
|---|---|---|
| horizontal (com descritor e asas) | 240 px de largura; as asas se leem a partir de 360 px | 45 mm |
| horizontal abaixo disso | use o `wordmark` | 30 mm |
| vertical | 160 px de largura | 30 mm |
| simbolo | 40 px | 12 mm |
| simbolo-pequeno | 24 a 39 px | 7 a 12 mm |
| favicon | 16 a 48 px | — |

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
- Cruzar letras com a órbita, mudar a inclinação ou fechar a órbita.
- Trocar a direção do voo, ou tirar o vagalume da ponta ou de cima do E.
- Engrossar o fio da constelação, ou usar gradiente na versão chapada.
- Usar o âmbar como texto sobre fundo claro.
- Aplicar sombra, glow extra ou estrela de 4 pontas.

As versões anteriores ("Rastro que acende", R4) estão em `../_arquivo/logo-rastro-r4/`.
