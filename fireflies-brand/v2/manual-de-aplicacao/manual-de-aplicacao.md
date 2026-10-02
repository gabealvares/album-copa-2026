# Manual de aplicação · Fireflies Consultoria v2

> **Para que serve:** dizer **onde** e **como** aplicar a identidade: que fundo usar, que cor vai em cada elemento e como montar cada material (apresentações, documentos, papel timbrado, e-mail, redes, papelaria, Academy, sinalização e brindes).
>
> **Base:** sistema de logo final "Órbita do vagalume" (`../logo/README.md`, `../logo/prancha-sistema.png`), paleta "Noite de São João" (`../cores/tokens.json`, contrastes em `../cores/_matriz.md`), plataforma de marca v2 (`../estrategia/plataforma-de-marca-v2.md`), sistema iconográfico "Carta do Lume" (`../iconografia/README.md`) e as medidas técnicas que continuam válidas do guia v1 (`../../estrategia/guia-de-aplicacoes-e-rollout.md`).
>
> **Logo e tipografia: finais.** O logo é a **Órbita do vagalume**. Uma órbita fina envolve FIREFLIES/CONSULTORIA. A metade de trás é constelação, e a frente é luz que esquenta até o **vagalume aceso**, logo acima do **E de luz**. A versão curta é o **F de luz** na mesma órbita. Os arquivos ficam em `../logo/svg/fireflies_{versao}_{cor}.svg` (e `png/`, com 2000 px). Títulos em **Sora**, texto corrido em **IBM Plex Sans** e dados em **IBM Plex Mono**.
>
> **Pranchas:** `pranchas/versoes-do-logo-por-fundo.png`, `pranchas/matriz-de-fundos.png`, `pranchas/distribuicao-de-cor.png` e `pranchas/arvore-claro-escuro.png`, geradas com os SVGs finais (`pranchas/_build/pranchas.js`).

---

## 0. Referência rápida

### Paleta

| Papel | Nome | HEX | CMYK (FOGRA39) | Pantone ≈ |
|---|---|---|---|---|
| Escuro de base | **Anil de Junho** | #17183A | 95 85 40 50 | 2768 C |
| Escuro de fundo (mais fundo) | **Anil Profundo** | #0F1029 | 95 88 45 62 | 2765 C |
| Claro de base | **Cal Virgem** | #EDEEEA | 5 3 6 0 | 663 C |
| Papel | **Branco** | #FFFFFF | 0 0 0 0 | — |
| A luz (único âmbar) | **Âmbar de Vagalume** | #F2B544 | 0 32 82 0 | 7409 C |
| Quente (formas, escuro) | **Vermelhão** | #E65A3E | 5 85 90 0 | 7417 C |
| Quente (texto, claro) | **Vermelhão de Rubrica** | #A9301F | 15 90 100 15 | 484 C |
| Frio de apoio | **Céu de Anil** | #6E89B4 | 62 45 8 0 | 2124 C |
| Texto no claro | **Fuligem** | #2A2F3D | 75 65 45 45 | 7546 C |
| Texto secundário no claro | **Pedra-Sabão** | #5E6271 | 55 45 30 15 | 431 C |
| Divisórias / texto claro secundário no escuro | **Fumaça** | #D2D4DA | 15 10 6 0 | 7541 C |
| Semânticas | **Folha de Bananeira** #2D7550 · **Rapadura** #9A5A06 · **Carmim** #A51C45 | | | |

### Tipografia

| Papel | Fonte | Pesos | Fallback Office | Fallback Google |
|---|---|---|---|---|
| **Fonte de títulos (display)** | **Sora** (sans geométrica; **caixa alta nos títulos curtos**, até ~6 palavras; títulos longos em caixa alta e baixa) | 600 / 700 | Century Gothic Bold | Sora (nativa no Google Fonts) |
| **Texto** | IBM Plex Sans | 400, 500, 600 (itálico 400) | Arial | IBM Plex Sans (nativa) |
| **Dados** | IBM Plex Mono | 400, 500, números tabulares | Consolas | IBM Plex Mono (nativa) |

### Versões do logo (arquivos finais)

Padrão de arquivo: `fireflies_{versao}_{cor}.svg`. Os PNGs têm 2000 px no lado maior e fundo transparente.

| Versão (`versao`) | O que é | Onde usar |
|---|---|---|
| `horizontal` | **Principal.** Órbita em volta de FIREFLIES / CONSULTORIA | Site, documentos, propostas, timbrado, assinatura de e-mail, fachada, capas |
| `vertical` | Órbita curta com o vagalume sobre o nome | Capas, redes, peças quadradas e verticais, frente de cartão, crachá |
| `simbolo` | **F de luz** na mesma órbita (versão curta), a partir de 40 px | Avatar, app, selo, carimbo, rodapé de slide |
| `simbolo-pequeno` | F de luz de 24 a 39 px, com fio grosso e constante, sem estrelas e sem asas | Ícones pequenos, cabeçalho de documento, bordado |
| `favicon` | **Só o F de luz e o vagalume aceso** | Favicon a 16 px e `.ico` até 48 px. Nunca em peça impressa |
| `wordmark` | Nome + descritor, sem órbita | Quando a órbita já aparece na peça, em espaços muito baixos ou quando o horizontal ficaria abaixo de 240 px / 45 mm |
| `condominios-horizontal` | Lockup com descritor CONDOMÍNIOS | Auditoria de condomínios: relatório, assembleia, anúncios para síndicos |
| `academy-horizontal` | Lockup com descritor ACADEMY | Certificados, slides de aula, capas de turma |

| Cor (`cor`) | Composição | Fundo | Meio |
|---|---|---|---|
| `digital` | Fio em gradiente (anil → rubrica → vermelhão → âmbar), nome e estrelas em Anil, braço do E em Vermelhão, vagalume com brilho | Branco, Cal Virgem, foto clara | **Tela e projetor** (site, redes, slides, PDF, vídeo) |
| `digital-negativo` | Frio em Cal/Céu de Anil, nome em Cal, braço do E e luz em Âmbar | Anil de Junho, Anil Profundo, foto escura com véu | **Tela e projetor** |
| `chapado` | 2 cores: Anil (nome, estrelas, asas) + Vermelhão (órbita, braço do E, luz). Sem gradiente e sem brilho | Branco, Cal Virgem | **Impressão** de escritório e de gráfica, Pantone, serigrafia, vinil, sinalização |
| `chapado-negativo` | 2 cores: Cal + Âmbar | Anil | **Impressão** sobre Anil: cartão, pasta, placa, capa sangrada |
| `mono-anil` | 1 cor Anil | Âmbar, claros, P&B | **Carimbo, gravação, hot stamping, bordado**, cópia P&B |
| `mono-preto` | 1 cor preta | Branco | Jornal, fax, carimbo de tinta preta, documento 100% P&B |
| `mono-branco` | 1 cor branca | Rubrica, Vermelhão, foto com véu, cor de terceiros escura | Gravação em objeto escuro, bordado em tecido escuro, vinil branco |

**Digital, chapado ou mono: regra por meio**

| Meio | Versão de cor |
|---|---|
| Tela, projetor, PDF, vídeo, redes, e-mail | `digital` / `digital-negativo` |
| Impressão de escritório (laser/jato, cor) | `chapado` (o gradiente vira mancha em impressora de escritório) |
| Impressão em P&B | `mono-preto` (ou `mono-anil` se o arquivo também for usado em cor) |
| Gráfica (offset, digital, Pantone, serigrafia, vinil, sinalização) | `chapado` / `chapado-negativo` |
| Gráfica em 4 cores de alta qualidade (capa de relatório, pasta) | `chapado` como padrão; `digital` só depois de aprovar a prova de cor |
| Carimbo, gravação a laser, hot stamping, bordado, marca-d'água | `mono-anil`, `mono-preto` ou `mono-branco` |

**Área de proteção** (X = altura da versal de FIREFLIES):
- Lockups (`horizontal`, `vertical`, `condominios-horizontal`, `academy-horizontal`): **X/2** em volta da caixa da órbita, **incluindo o vagalume**.
- `simbolo` e `simbolo-pequeno`: **¼ da largura da órbita** em volta.
- `wordmark`: X/2.
- Co-branding: 1 X entre o logo e o fio separador.

**Tamanho mínimo:**

| Versão | Digital | Impresso |
|---|---|---|
| `horizontal` e lockups Condomínios/Academy | **240 px** de largura (as asas do vagalume se leem a partir de 360 px) | **45 mm** |
| Abaixo disso | use o `wordmark` (até 160 px) | `wordmark` até 30 mm |
| `vertical` | 160 px | 30 mm |
| `simbolo` | 40 px | 12 mm |
| `simbolo-pequeno` | 24 a 39 px | 7 a 12 mm |
| `favicon` | 16 a 48 px | não se aplica |
| Bordado (`horizontal` mono) | — | 60 mm |

**Versão curta, F de luz:** é a assinatura sem nome. Serve para **avatar** (redes, WhatsApp, Google), **ícone de app**, **selo**, **carimbo** e **rodapé de slide**. Ela só aparece sozinha quando o nome Fireflies Consultoria já está na peça ou no contexto (perfil, aba do navegador, handle). Escolha pelo tamanho de exibição: `simbolo` a partir de 40 px, `simbolo-pequeno` entre 24 e 39 px e `favicon` abaixo de 24 px.

**Regra do favicon de 16 px:** use só o `favicon`, com o F de luz e o vagalume aceso, sem órbita, sem estrelas e sem asas. No `.ico` (16/32/48) e nos ícones de app, ele vai sobre um quadrado Anil arredondado. Já existem `favicon.ico`, `apple-touch-icon-180.png`, `android-192/512.png` e `avatar-1080.png` em `../logo/`. Não reduza o `simbolo` para 16 px, e não use o `favicon` acima de 48 px.

Nunca cruze as letras com a órbita, nunca mude a inclinação ou a direção do voo, nunca tire o vagalume de cima do E e nunca use gradiente na versão chapada.

---|---|---|
| **Positivo** | Símbolo e lettering em Anil, Lanterna âmbar **com contorno Anil colado** | Branco, Cal Virgem, foto clara limpa |
| **Negativo** | Símbolo e lettering em Cal Virgem, Lanterna âmbar pura | Anil de Junho, Anil Profundo, foto escura com véu |
| **Mono Anil** | Tudo em Anil; a Lanterna é a maior estrela | Âmbar, P&B, carimbo, gravação, fax/cópia |
| **Mono Cal** | Tudo em Cal Virgem (ou Branco) | Vermelhão, Rubrica, fotos, cores de terceiros escuras |
| **Transição quente** *(se aprovada no redesenho)* | Arco em âmbar → vermelhão | Só digital e impressão em 4 cores, sobre Anil; nunca em 1–2 cores |

**Área de proteção:** X = diâmetro da Lanterna. Livre de **2X** em volta dos lockups e **1X** em volta do Símbolo em avatares. Se o desenho final indicar outra medida, use a altura da letra "F" do lettering.

**Tamanho mínimo:**

| Versão | Digital | Impresso |
|---|---|---|
| Logo principal (horizontal) e lockups Condomínios/Academy | 120 px de largura | 30 mm |
| Logo vertical | 80 px | 20 mm |
| Símbolo | 24 px | 7 mm |
| Símbolo reduzido (favicon, carimbo) | 16 px | 5 mm |

Abaixo do mínimo, troque de versão em vez de reduzir. Linhas do traço de constelação no impresso: no mínimo **0,25 pt**.

---

## 1. Princípios de aplicação: 5 regras de ouro

1. **Uma luz por peça.** A luz aparece **uma vez** por composição (página, slide, post): no **vagalume aceso** do logo (com o E de luz que conversa com ele) **ou** num único ponto de destaque âmbar. Se o logo está visível, ele já é a luz, e o destaque do texto vai em Rubrica (claro) ou Vermelhão (escuro). Âmbar nunca é texto sobre fundo claro (1,83:1 no Branco, 1,57:1 na Cal).
2. **Anil manda, Branco trabalha.** Anil de Junho é o fundo de **impacto** (capas, divisores, redes, cartão, sinalização). Branco é o fundo de **trabalho** (tudo que é lido por muito tempo, impresso no escritório ou assinado). Cal Virgem é o claro **institucional** (peças de marca que não vão para a impressora do escritório).
3. **A rubrica está sempre lá.** Toda peça institucional tem um toque de **Vermelhão de Rubrica** (no claro) ou **Vermelhão** (no escuro): um link, um número-chave, o fio de rodapé, o eyebrow. É isso que impede a marca de virar "azul-marinho e dourado de banco".
4. **Contraste antes de gosto.** Texto corrido só com razão **≥ 4,5:1**; títulos grandes (≥ 24 px ou 18,5 px em negrito) e formas com **≥ 3:1**. Se a combinação não está marcada com ✔ na matriz da seção 2, ela não existe.
5. **Grafismo é pontuação, não papel de parede.** No máximo **1 emblema de constelação, 1 padrão e 3 ornamentos** por composição. Estrelas são círculos. Sem glow, sem brilho, sem degradê fora do arco do logo, sem ✦.

---

## 2. Matriz de fundos

Razões de contraste WCAG 2.2, calculadas sobre os HEX oficiais. ✔ = texto (≥ 4,5) · ◐ = só título grande ou forma (≥ 3) · ✖ = não usar.

### 2.1 Fundos oficiais

| Fundo | Versão do logo (tela · impresso) | Órbita · vagalume · E de luz | Título | Texto | Destaque | Linhas e ícones | Proibido |
|---|---|---|---|---|---|---|---|
| **Branco** #FFFFFF | `digital` · `chapado` | Nome Anil (17,10 ✔); órbita em gradiente (chapado: Vermelhão); E de luz Vermelhão | Anil de Junho (17,10 ✔) | Fuligem (13,36 ✔); secundário Pedra-Sabão (6,07 ✔) | Rubrica (6,71 ✔) em texto, link e número-chave; âmbar só como forma com contorno | Ícones Anil; linhas Fumaça (divisória) ou Anil 20–45%; retícula Pedra-Sabão | Âmbar em texto (1,83 ✖); Vermelhão em texto pequeno (3,56 ◐); Céu de Anil em texto (3,56 ◐); Cal sobre Branco (1,17 ✖) |
| **Cal Virgem** #EDEEEA | `digital` · `chapado` | Nome Anil (14,67 ✔); órbita em gradiente (chapado: Vermelhão); E de luz Vermelhão | Anil (14,67 ✔) | Fuligem (11,46 ✔); secundário Pedra-Sabão (5,21 ✔) | Rubrica (5,76 ✔); âmbar só como forma com contorno | Ícones Anil; linhas Pedra-Sabão ou Anil 20–45% | Âmbar em texto (1,57 ✖); Vermelhão e Céu em texto (3,06 / 3,05 ◐); Fumaça (1,27 ✖); usar Cal em documento que vai para impressora de escritório |
| **Anil de Junho** #17183A | `digital-negativo` · `chapado-negativo` | Nome Cal (14,67 ✔); constelação Cal/Céu; luz e E de luz Âmbar (9,34 ✔) | Cal Virgem (14,67 ✔) ou Branco (17,10 ✔) | Cal (14,67 ✔); secundário Fumaça (11,54 ✔) | Âmbar (9,34 ✔) **uma vez**; Vermelhão (4,80 ✔) para realce e alerta | Ícones Cal; linhas e retícula Céu de Anil (4,80 ✔) | Rubrica (2,55 ✖); Fuligem (1,28 ✖); Pedra-Sabão em texto (2,82 ✖); Carmim (2,32 ✖); logo `digital`/`chapado` (de fundo claro) |
| **Anil Profundo** #0F1029 | `digital-negativo` · `chapado-negativo` | Nome Cal (16,00 ✔); luz e E de luz Âmbar (10,18 ✔) | Cal (16,00 ✔) ou Branco (18,64 ✔) | Cal (16,00 ✔); secundário Fumaça (12,58 ✔) | Âmbar (10,18 ✔); Vermelhão (5,23 ✔) | Ícones Cal; linhas Céu de Anil (5,24 ✔) | Rubrica (2,78 ✖); Fuligem (1,40 ✖); Anil sobre Anil Profundo (1,09: não separa áreas; use fio Céu); usar como fundo de capa (é fundo de rodapé, faixa e véu) |
| **Âmbar de Vagalume** #F2B544 *(raro)* | `mono-anil` (tela e impresso) | Tudo Anil; o vagalume e o E de luz se leem pela forma e pelo respiro | Anil (9,34 ✔) | Anil ou Fuligem (7,29 ✔) | **Nenhum** outro acento | Anil; linhas Anil 40% | Branco/Cal (1,83 / 1,57 ✖); Rubrica em texto pequeno (3,66 ◐); Vermelhão (1,94 ✖); logo `digital` (o vagalume âmbar some); mais de 1 bloco âmbar por peça; âmbar como fundo de página inteira de documento |
| **Vermelhão de Rubrica** #A9301F *(campanha, pontual)* | `mono-branco` (tela e impresso) | Tudo branco | Cal (5,76 ✔) ou Branco (6,71 ✔) | Cal ou Branco; secundário Fumaça (4,53 ✔) | **Nenhum** | Cal; linhas Cal 50% | Anil em texto (2,55 ✖); Âmbar (3,66 ◐, e briga com a luz do logo); logo `digital` ou `chapado` (o Vermelhão da órbita some); Vermelhão sobre Rubrica (1,88 ✖); usar em documento oficial, relatório ou contrato |
| **Vermelhão** #E65A3E *(só formas e faixas)* | `mono-anil` (Anil 4,80 ✔) | Tudo Anil | Anil (4,80 ✔, só título ≥ 24 px) | **Não** é fundo de texto corrido | Nenhum | Anil | Cal/Branco em texto (3,06 / 3,56 ◐); usar como fundo de página |

### 2.2 Fundos variáveis

| Fundo | Versão do logo (tela · impresso) | Órbita · vagalume · E de luz | Título | Texto | Destaque | Linhas e ícones | Proibido |
|---|---|---|---|---|---|---|---|
| **Foto clara** (parede, céu claro, papel) | `digital` sobre área lisa e clara; `mono-anil` se a área tiver textura | Como no Branco | Anil | Fuligem, só sobre área lisa ou sobre **véu Cal Virgem 80–90%** | Rubrica | Anil | Texto sobre detalhe da foto; logo negativo; véu branco "lavado" abaixo de 80% (o contraste cai) |
| **Foto escura** (noite, interior, retrato em contraluz) | `digital-negativo` ou `mono-branco`, sempre sobre **véu Anil de Junho 60–80%** no terço do logo/texto; Anil Profundo 80% se a foto for movimentada | Como no Anil | Cal | Cal / Fumaça, sempre sobre véu | Âmbar (uma vez) ou Vermelhão | Cal; linhas Céu de Anil | Logo sem véu; véu preto, cinza ou com blur; foto com muito verde-limão ou amarelo (compete com a luz do logo: use `mono-branco`) |
| **Cor de terceiros / parceiros** (administradora, evento, cliente) | **Nunca recolorir.** Claro → `digital`/`chapado`; escuro → `digital-negativo`/`chapado-negativo`; saturado ou médio → `mono-anil` ou `mono-branco`, o que der ≥ 4,5:1; se nenhum der, aplicar o logo dentro de uma **placa Branco ou Anil** com margem X/2 | Conforme a versão | Cor do parceiro | Cor do parceiro | Nenhum acento Fireflies | Do parceiro | Mudar a cor do logo para a do parceiro; colocar o logo sobre roxo (confusão com Fireflies.ai); co-branding sem fio separador; logo Fireflies maior que o do anfitrião em material do anfitrião |

**Co-branding:** fio vertical de 0,5 pt (Fumaça no claro, Céu de Anil no escuro), distância de 1 X de cada lado, medida da caixa da órbita, e alturas **ópticas** iguais (a versal de FIREFLIES com a mesma altura da caixa alta do parceiro).

Prancha: `pranchas/matriz-de-fundos.png`.

---

## 3. Quando usar fundo claro e quando usar escuro

### 3.1 Árvore de decisão

```
A peça vai ser IMPRESSA em impressora de escritório, assinada ou arquivada?
├── SIM → BRANCO (sem sangria, sem fundos chapados). Capa pode ter faixa Anil ≤ 25% da página.
│         Ex.: contrato, parecer, ata, carta, timbrado, relatório (miolo), proposta (miolo).
└── NÃO → Vai ser PROJETADA?
          ├── SIM → Sala clara, projetor fraco ou desconhecido (assembleia, salão de festas, sala de aula)?
          │         ├── SIM → CLARO: Branco no conteúdo; Anil só na capa, divisores e encerramento.
          │         └── NÃO (auditório escuro, telão LED, evento) → ESCURO: Anil de Junho.
          └── NÃO → É TELA?
                    ├── Painel/relatório lido por muito tempo, tabelas densas → CLARO (Branco ou Cal).
                    ├── Rede social, capa, OG image, vídeo, avatar → ESCURO (Anil). Alternar 1 em cada 3 posts em Cal.
                    ├── Assinatura de e-mail → TRANSPARENTE/Branco, logo `horizontal_digital` (testar dark mode).
                    └── Peça de CAMPANHA (lançamento, convite, Academy, evento)?
                              → ESCURO (Anil) como padrão; Âmbar ou Rubrica só como peça de exceção, ≤ 1 em cada 10.
            Impresso de marca em gráfica (cartão, pasta, capa de relatório, certificado, envelope)?
                    → Frente/capa ESCURO (Anil) + verso/miolo CLARO (Branco ou Cal).
                      Exceção: certificado Academy → CLARO (Cal), porque é preenchido, assinado e emoldurado.
```

### 3.2 Tabela de decisão por contexto

| Contexto | Fundo | Por quê |
|---|---|---|
| Impressão em escritório (laser/jato, P&B ou cor) | **Branco** | Fundo chapado sai manchado, gasta toner e esconde rubrica e carimbo. |
| Documento oficial (contrato, parecer, relatório, ata) | **Branco** | É lido, anotado, assinado e arquivado. Precisa ser fiel em P&B e em cópia. |
| Projetor em sala clara | **Branco** (conteúdo) + Anil (capa/divisor) | Projetor não projeta preto: Anil vira cinza-azulado e o texto Cal perde contraste. |
| Projetor em sala escura / telão LED | **Anil de Junho** | Menos ofuscamento e mais presença. |
| Tela (site, PDF digital, painel) | **Cal Virgem** ou Branco no conteúdo; Anil no topo e hero | Leitura longa no claro; marca no escuro. |
| Peça de campanha | **Anil de Junho** | É a cor-assinatura. |
| Assinatura de e-mail | **Sem fundo** (Branco) | O cliente de e-mail decide o fundo; PNG com fundo vira "caixa". |
| Papelaria de gráfica | **Anil** na frente, **Branco/Cal** no verso | Impacto + espaço para escrever. |

Prancha: `pranchas/arvore-claro-escuro.png`.

---

## 4. Distribuição de cor por peça

Percentual **aproximado da área** da peça. "Texto" = Fuligem e Pedra-Sabão no claro, Cal e Fumaça no escuro. "Apoio" = Céu de Anil e Fumaça em linhas, retícula e gráficos. Âmbar é sempre a menor fatia.

| Peça | Branco | Cal Virgem | Anil (+ Profundo) | Texto | Rubrica / Vermelhão | Apoio (Céu, Fumaça) | Âmbar |
|---|---|---|---|---|---|---|---|
| Apresentação institucional | 40 | 10 | 35 | 8 | 3 | 3 | 1 |
| Apresentação de resultado / painel | 60 | 10 | 10 | 10 | 3 | 6 | 1 |
| Proposta comercial (capa + miolo) | 65 | 5 | 15 | 10 | 2 | 2 | 1 |
| Relatório de auditoria | 70 | 5 | 10 | 10 | 2 | 2 | 1 |
| Papel timbrado / carta | 90 | — | 2 | 6 | 1 | 0,5 | 0,5 |
| Contrato | 92 | — | 1 | 6 | 0,5 | 0,5 | (só no vagalume do logo) |
| Nota técnica / parecer | 90 | — | 2 | 6 | 1 | 0,5 | 0,5 |
| E-mail (assinatura) | 90 | — | 4 | 4 | 1 | 0,5 | 0,5 |
| Post (feed) | — | 25 | 60 | 8 | 3 | 3 | 1 |
| Story | — | 15 | 70 | 8 | 3 | 3 | 1 |
| Cartão de visita (frente Anil + verso Branco) | 45 | — | 45 | 5 | 2 | 2 | 1 |
| Envelope | 85 | — | 10 | 3 | 1 | 0,5 | 0,5 |
| Pasta | 10 | — | 75 | 5 | 3 | 5 | 2 |
| Crachá | 50 | — | 40 | 5 | 2 | 2 | 1 |
| Certificado Academy | 10 | 70 | 8 | 7 | 2 | 2 | 1 |
| Placa / sinalização | — | — | 85 | 10 (Cal) | 2 | — | 3 |
| Brindes | (cor do objeto) | | 1 cor de marca | — | — | — | 0 em 1 cor; ≤ 5 em 2 cores |

Regras:
- **Brindes:** objeto Anil, Branco, Cal ou natural (algodão cru, kraft, madeira). Gravação em **1 cor** (`mono-branco` sobre objeto escuro, `mono-anil` sobre claro) ou **2 cores** (`chapado`: Anil + Vermelhão; `chapado-negativo`: Cal + Âmbar).
- **Âmbar** só passa de 1% na pasta e na placa, porque nelas o vagalume e a órbita de luz são grandes e são o único ponto de luz da superfície.
- Se uma peça claro fica sem Rubrica, falta a assinatura quente: acrescente o fio de rodapé ou o eyebrow em Rubrica.

Prancha: `pranchas/distribuicao-de-cor.png`.

---

## 5. Fichas por material

**Padrões técnicos (valem para todas as fichas):**
- **Digital:** sRGB, exportado em 2× para telas retina.
- **Impresso:** CMYK Coated FOGRA39, 300 dpi, PDF/X-4, **sangria de 3 mm**, marcas de corte e texto a pelo menos **3 mm do corte** (5 mm em cartão).
- **Prova de cor obrigatória** no primeiro lote: o Anil pode "fechar" em preto e o Âmbar pode puxar para o laranja. Em peças-chave (cartão, pasta, fachada), avaliar Pantone 2768 C + 7409 C.
- **Documentos para o cliente:** PDF/A, fontes incorporadas.

### 5.1 Apresentações 16:9

**Formato:** 1920×1080 px · 33,867×19,05 cm (padrão "Widescreen" do PowerPoint e do Google Slides). Versão 4:3 (1440×1080) só para projetores antigos de condomínio.

**Grid:** 12 colunas · margens laterais **96 px** (1,7 cm) · topo **80 px** · base **72 px** · gutter **24 px**. Linha de base de 8 px. Zona do rodapé: os 48 px de baixo.

**Logo:**
- Capa e encerramento: `horizontal_digital-negativo` com **480 px** de largura (≈ 8,5 cm; as asas se leem a partir de 360 px), canto inferior esquerdo, alinhado à margem com X/2 de respiro.
- Slides internos: **F de luz** (`simbolo`) com **48 px** de largura no canto inferior direito, ou nada. Nunca o lockup completo em todos os slides.
- Slide impresso: troque para `chapado` (fundo claro) ou `mono-preto` (P&B).

**Hierarquia tipográfica (pt no PowerPoint/Google; px a 1920):**

| Nível | Fonte | Tela (pt / px) | Projetor em sala clara (mínimo) |
|---|---|---|---|
| Título de capa | Sora Bold, caixa alta, tracking +2% | 54 pt / 72 px | 54 pt |
| Título de divisor | Sora Bold, caixa alta | 44 pt / 58 px | 44 pt |
| Título de slide | Sora SemiBold, caixa alta | 28 pt / 38 px | 32 pt |
| Eyebrow / rótulo | IBM Plex Mono Medium, caixa alta, tracking +12% | 11 pt / 15 px | 14 pt |
| Corpo | IBM Plex Sans Regular, entrelinha 1,35 | 18 pt / 24 px | **24 pt** |
| Destaque no corpo | IBM Plex Sans SemiBold, em Rubrica (claro) ou Âmbar/Vermelhão (escuro) | — | — |
| Número-chave (KPI) | Sora Bold, números tabulares | 96 pt / 128 px | 96 pt |
| Dados de tabela | IBM Plex Mono Regular | 14 pt / 19 px | 18 pt |
| Citação | IBM Plex Sans Light/Regular itálico | 28 pt / 38 px | 32 pt |
| Rodapé | IBM Plex Mono Regular | 9 pt / 12 px | 11 pt |

**Layouts:**

| Layout | Fundo | Composição | Grafismo |
|---|---|---|---|
| **Capa** | Anil de Junho | Eyebrow (linha + tipo de documento) no topo; título nas colunas 1–8, terço inferior; cliente, data e "Luz medida." abaixo; logo no canto inferior esquerdo | 1 padrão (campo de estrelas ou retícula, Céu de Anil 30–50%) **ou** 1 emblema de constelação do serviço nas colunas 9–12. Lanterna do logo = a luz |
| **Divisor** | Anil de Junho | Número da seção em Plex Mono ("02 / 05") + título de divisor | Emblema da constelação do serviço, 320–480 px, colunas 8–12. Se o emblema tem lanterna âmbar, o F de luz do rodapé vai em `mono-branco` |
| **Conteúdo** | Branco (projetor/impresso) ou Cal (tela) | Eyebrow + título no topo; corpo nas colunas 1–7; imagem, ícones ou lista nas 8–12 | Até 3 ícones de linha; marcadores-estrela |
| **Dados** | Branco | Título que **diz a conclusão** ("Inadimplência caiu para 6%"); gráfico em 8–12 colunas; nota de fonte em Mono 9 pt | Matriz de pontos ou retícula na área do gráfico; 1 destaque âmbar com contorno (a Lanterna do gráfico) |
| **Citação** | Cal Virgem ou Anil | Citação em 1–3 linhas, colunas 2–10; autor em Mono caixa alta | Linha-de-chamada ou nada |
| **Encerramento** | Anil de Junho | "Luz medida." ou próximo passo; contato (WhatsApp, e-mail, site) em Plex Sans; responsável e CRC em Mono | Trilha do Photinus terminando na lanterna, ou nada (o vagalume do logo já é a luz) |

**Rodapé e numeração:** em todos os slides, exceto capa e divisor: à esquerda, "FIREFLIES CONSULTORIA · [TÍTULO CURTO]" em Plex Mono 9 pt, Pedra-Sabão (claro) ou Fumaça (escuro); à direita, "07 / 24".

**Slides impressos:** usar a variante **"Impressão"** do template. Todos os fundos Anil viram Branco com uma faixa Anil de **12 mm** no topo (ou só o título em Anil). Remove padrões e campo de estrelas. Corpo mínimo de 14 pt. Duas por página A4 paisagem, nunca seis. Testar em P&B: o destaque em Rubrica precisa continuar visível (sai como cinza médio; somar negrito).

**Projetor:** sala clara = conteúdo Branco, corpo **≥ 24 pt**, nada abaixo de 14 pt, no máximo 1 número-chave e 6 linhas por slide. Não usar Céu de Anil nem Pedra-Sabão para informação (somem no projetor): use Anil e Rubrica. Levar sempre o PDF e testar no projetor do local.

| Faça | Não faça |
|---|---|
| Título que afirma a conclusão do slide | Título genérico ("Resultados") |
| Capa, divisor e encerramento em Anil; conteúdo em Branco | Todo o deck em Anil num salão de festas iluminado |
| 1 luz por slide: o vagalume do logo **ou** 1 destaque âmbar | Âmbar em texto, marcadores e linhas |
| Rubrica para o número que importa no claro | Vermelho-padrão do PowerPoint para alerta |
| Ícones da biblioteca Carta do Lume | Ícones do Office, Lucide ou clip-art |

### 5.2 Documentos A4

**Formato:** A4 retrato, 210×297 mm. Painel mensal e certificado em A4 paisagem.

**Margens (todos os documentos):** superior **25 mm** · inferior **22 mm** · esquerda **25 mm** (para encadernação e furação) · direita **20 mm**. Cabeçalho a **12 mm** da borda superior; rodapé a **10 mm** da borda inferior. Coluna de texto de 165 mm; em documentos longos, 2 colunas de 79,5 mm com gutter de 6 mm só em anexos.

**Hierarquia tipográfica:**

| Nível | Fonte | Tamanho / entrelinha | Cor (Branco) |
|---|---|---|---|
| Título de capa | Sora Bold, caixa alta | 32 pt / 36 pt | Cal (sobre capa Anil) ou Anil |
| Título do documento (1ª página interna) | Sora Bold, caixa alta | 20 pt / 24 pt | Anil |
| H1 (seção) | Sora SemiBold, caixa alta, tracking +2% | 14 pt / 18 pt, 18 pt antes | Anil |
| H2 | IBM Plex Sans SemiBold | 12 pt / 16 pt, 12 pt antes | Anil |
| H3 | IBM Plex Sans SemiBold | 10,5 pt / 14 pt | Fuligem |
| Eyebrow / rótulo | IBM Plex Mono Medium, caixa alta, tracking +10% | 8 pt | Rubrica |
| Corpo | IBM Plex Sans Regular | **10 pt / 14,5 pt**, 6 pt depois; contrato 10,5 pt / 15 pt | Fuligem |
| Tabela (texto) | IBM Plex Sans Regular | 9 pt / 12 pt | Fuligem |
| Tabela (números) | IBM Plex Mono Regular, tabular, alinhado à direita | 9 pt | Fuligem; total em Mono Medium Anil |
| Nota, fonte, legenda | IBM Plex Sans Regular | 8 pt / 11 pt | Pedra-Sabão |
| Cabeçalho e rodapé | IBM Plex Mono Regular | 7,5 pt | Pedra-Sabão |

**Cabeçalho (páginas internas):** à esquerda, F de luz (`simbolo-pequeno_chapado`) com **10 mm** de largura + tipo do documento em Mono 7,5 pt caixa alta ("RELATÓRIO DE AUDITORIA"); à direita, cliente e referência. Fio Fumaça de 0,5 pt a 4 mm abaixo. A 1ª página interna leva o `horizontal_chapado` com **45 mm** de largura (o mínimo impresso) no lugar do F de luz. No PDF enviado por e-mail, pode-se usar `digital`.

**Rodapé:** fio **Rubrica de 0,75 pt** com 12 mm de largura alinhado à margem esquerda (a assinatura quente). Linha 1: "Fireflies Consultoria · CNPJ [a confirmar] · São Paulo/SP · fireflies.com.br". Linha 2: "Responsável técnico: Gabriel Alvares, CRC-SP [nº a confirmar] · [referência] · Confidencial". À direita: **"Página X de Y"** em Mono.

**Tabelas:** cabeçalho em Plex Mono Medium 8 pt caixa alta, Anil, com fio Anil de 0,75 pt abaixo; linhas separadas por fio Fumaça 0,5 pt (sem grade vertical); zebra opcional em Cal Virgem; linha de total com fio Anil de 0,75 pt acima e valor em Mono Medium. Números à direita, texto à esquerda. Unidade no cabeçalho ("VALOR (R$)"), não em cada célula.

**Gráficos:** ver seção 6. Largura da coluna de texto (165 mm) ou meia coluna. Título que afirma a conclusão; fonte em nota 8 pt.

| Documento | Capa | Miolo | Particularidades |
|---|---|---|---|
| **Proposta comercial** | Anil de Junho, sangrada, com `horizontal_chapado-negativo` (gráfica) ou `digital-negativo` (PDF) de 60 mm, título, cliente, número "PRO-2026-000", data e validade. Emblema da constelação do serviço. | Branco | Seções: diagnóstico · escopo · "30 dias até a primeira luz" (Trilha do Photinus com 4 etapas) · entregáveis · investimento (Mono, tabela) · responsável. Frase de apoio "Precisão que ilumina decisões." na 1ª página interna. Tom "nós". |
| **Relatório de auditoria** | Anil de Junho, lockup `condominios-horizontal_chapado-negativo` (ou `digital-negativo` no PDF), eyebrow "RELATÓRIO DE AUDITORIA", condomínio, período, emissão, responsável técnico. Selo de Carta opcional. | Branco | Pág. 1 = "Resumo para o conselho": 3 a 5 achados com marcador + rótulo de estado (ver 6.2). Achados numerados "A-01". Anexos em Mono. Versão para impressão em escritório: capa Branco com faixa Anil de 60 mm. |
| **Parecer / nota técnica** | **Sem capa.** 1ª página com `horizontal_chapado` de 45 mm, eyebrow "PARECER TÉCNICO Nº 000/2026", título, destinatário, data | Branco | Ementa em caixa com fundo Cal Virgem e fio Anil à esquerda (3 pt). Conclusão destacada com fio Rubrica. Assinatura, nome, CRC e data no fim. Nenhum grafismo. |
| **Contrato** | **Sem capa.** `horizontal_chapado` de 45 mm no topo da 1ª página (`mono-preto` se for impresso em P&B) | Branco | Corpo 10,5 pt; cláusulas numeradas "CLÁUSULA 1ª" em Plex Sans SemiBold; parágrafos "§ 1º". Campo de rubrica (12×12 mm, fio Fumaça) no canto inferior direito de cada página. Sem cores além de Anil, Fuligem e o fio Rubrica do rodapé. Nenhum grafismo. |
| **Ata** | Sem capa | Branco | Cabeçalho com tabela-resumo (data, local, participantes, pauta) em Mono 9 pt. Deliberações numeradas. Encaminhamentos em tabela: item · responsável · prazo. Assinaturas ao fim. |

| Faça | Não faça |
|---|---|
| Fundo Branco em tudo que é impresso no escritório | Miolo em Cal Virgem ou Anil |
| Rodapé com responsável técnico, CRC e "Página X de Y" | Rodapé só com "www" |
| Números em Plex Mono, alinhados à direita | Números em fonte proporcional centralizados |
| Uma só fonte de títulos (Sora) em caixa alta | Títulos em caixa alta e baixa ou em negrito da Plex "para variar" |
| Contrato e parecer limpos | Padrão, constelação ou marca-d'água em documento jurídico |

### 5.3 Papel timbrado e envelopes

| Item | Papel timbrado | Envelope DL | Envelope saco |
|---|---|---|---|
| **Formato** | A4, 210×297 mm | 220×110 mm, aba no verso | 240×340 mm (cabe A4 sem dobrar e a pasta) |
| **Impressão** | Digital (.docx/.dotx e Google Docs) e gráfica (offset 2 cores: Anil + Âmbar, ou 4 cores) em offset 90 g | Offset 2 cores, papel 90 g | Offset 1–2 cores, kraft ou branco 120 g |
| **Margens** | Iguais aos documentos (25/22/25/20 mm) | 12 mm | 20 mm |
| **Logo** | `horizontal_chapado` (Word e gráfica), **50 mm** de largura, a 15 mm do topo e alinhado à margem esquerda | `horizontal_chapado`, **45 mm**, canto superior esquerdo a 12 mm das bordas | `horizontal_chapado` (branco) ou Mono Anil (kraft), **70 mm**, canto superior esquerdo a 20 mm |
| **Dados** | Rodapé em Plex Mono 7,5 pt Pedra-Sabão: razão social, CNPJ, endereço, telefone/WhatsApp, e-mail, site, responsável técnico + CRC | Abaixo do logo, Plex Mono 7 pt: endereço de remetente | Na aba: endereço em Plex Mono 8 pt |
| **Cor** | Fio Rubrica 0,75 pt × 12 mm no rodapé | Fio Rubrica 0,75 pt × 10 mm acima do remetente | Faixa Anil de 15 mm na base (opcional) |
| **Grafismo** | Nenhum no corpo. Opcional: retícula Fumaça a 8% só na margem esquerda (25 mm), versão gráfica | Interno da aba: padrão constelação contínua Anil (versão gráfica) | Nenhum na frente; padrão no verso opcional |

**Janela do envelope DL:** padrão 100×35 mm a 20 mm da esquerda e 15 mm da base. No timbrado, o bloco de destinatário fica a 50 mm do topo e 20 mm da esquerda, para cair na janela com dobra em 3.

| Faça | Não faça |
|---|---|
| Timbrado com área útil totalmente branca | Marca-d'água do F de luz atrás do texto |
| Template Word com cabeçalho/rodapé **travados** | Colar o logo como imagem solta em cada carta |
| Logo vetorial (EMF/SVG) no Word | PNG de 300 px esticado |

### 5.4 Cartão de visita

- **Formato:** 90×50 mm, arquivo de **96×56 mm** (sangria 3 mm). Segurança de **5 mm**.
- **Papel:** couché ou supremo 350 g com laminação fosca; ou Pantone 2768 C + 7409 C; acabamento opcional de hot stamping âmbar **só no vagalume e no E de luz** (versão `chapado-negativo`).

| Lado | Fundo | Conteúdo |
|---|---|---|
| **Frente** | Anil de Junho, sangrado | `vertical_chapado-negativo` centralizado, **34 mm** de largura (mínimo 30 mm), ou `horizontal_chapado-negativo` com 50 mm. Opcional: campo de estrelas Céu de Anil a 25% no terço inferior. |
| **Verso** | Branco | Nome em Plex Sans SemiBold **9 pt** Anil; cargo em Plex Sans Regular 7 pt Pedra-Sabão ("Contador responsável · CRC-SP [nº]"); dados em Plex Mono **7 pt** Fuligem (WhatsApp, e-mail, site); QR para o WhatsApp, **mínimo 15×15 mm**, Anil; fio Rubrica 0,75 pt × 8 mm sobre o nome. F de luz `simbolo-pequeno_chapado` com 10 mm no canto. |

- **Corpo mínimo:** 6,5 pt (Mono) e 7 pt (Sans).
- **Não faça:** texto a menos de 5 mm do corte; Âmbar na frente além do vagalume e do E de luz; logo `digital` com gradiente em cartão de gráfica; verso em Cal (some na luz quente) ou em Anil (sem espaço para anotar).

### 5.5 Assinatura de e-mail

- **Largura:** até **600 px**; conteúdo de 400–500 px. HTML com tabelas e estilos inline, < 50 KB.
- **Logo:** `horizontal_digital`, PNG 2× (**480 px**) exibido a **240 px** de largura (o mínimo digital), hospedado em HTTPS, **com fundo transparente**. Se o dark mode do Gmail/Outlook apagar o Anil, use o PNG com placa Branca arredondada (X/2 de respiro).
- **Fontes:** `'IBM Plex Sans', Arial, Helvetica, sans-serif` (a maioria dos clientes de e-mail mostra Arial). Nunca a fonte de títulos em texto vivo.

```
Gabriel Alvares                                  ← Plex Sans/Arial Bold 14 px, Anil #17183A
Contador responsável · CRC-SP [nº a confirmar]   ← 12 px, Pedra-Sabão #5E6271
Fireflies Consultoria                            ← 12 px, Fuligem #2A2F3D
WhatsApp +55 11 98245-0527 · contato@fireflies.com.br · fireflies.com.br
                                                 ← 12 px, links em Rubrica #A9301F, sem sublinhado
Precisão que ilumina decisões.                   ← 12 px itálico, Pedra-Sabão
[horizontal_digital · 240 px]
```

- Rubrica nos links é a única cor quente. Âmbar só no vagalume do logo.
- **Não faça:** banner fixo, logo com fundo branco chapado, frase em Âmbar, ícones de redes coloridos (use texto).

### 5.6 Redes sociais

| Peça | Medida | Área segura | Fundo | Logo | Tipografia |
|---|---|---|---|---|---|
| **Post (feed)** | 1080×1350 px (4:5) | Conteúdo dentro de 1080×1350; texto a 80 px das bordas; para o grid 3:4, manter o essencial nos 1012 px centrais de altura | Anil (2 de 3) · Cal (1 de 3) | F de luz (`simbolo_digital-negativo`) 64 px no canto inferior direito, ou handle em Mono | Título Sora Bold caixa alta **64–80 px**; corpo Plex Sans 32–36 px; eyebrow Mono 22 px |
| **Carrossel** | 1080×1350 px, 6 a 10 cards (LinkedIn: PDF 1080×1350, 6 a 12 páginas) | Igual ao post | Capa Anil; miolo alterna Cal/Anil por bloco, nunca card a card | Capa: `horizontal_digital-negativo` 400 px ou `vertical` 280 px; cards: numeração "03 / 08" em Mono | Capa 80–96 px; miolo 56 px título, 34 px corpo |
| **Story / Reels** | 1080×1920 px | Livre: **250 px no topo e 340 px na base**; laterais 64 px | Anil | F de luz 72 px no topo da área segura | Título 72–88 px; corpo 40 px |
| **Capa do LinkedIn (página)** | 4200×700 px (mín. 1128×191) | Centro de 3000×500; canto inferior esquerdo livre (o avatar cobre ~ 22% da largura no desktop) | Anil + retícula Céu 30% | Não repetir o logo (o avatar já é o logo) | "Luz medida." Sora 160 px, à direita do centro |
| **Capa do LinkedIn (perfil)** | 1584×396 px | Terço esquerdo livre (foto) | Anil | `horizontal_digital-negativo` 400 px, à direita | Frase de apoio em Plex Sans 36 px + "CRC-SP [nº]" em Mono 24 px |
| **Avatar** | 1080×1080 px (exibido em círculo) | F de luz dentro do **círculo de 70%** | Anil de Junho | `simbolo_digital-negativo` (pronto: `../logo/avatar-1080.png`) | — |
| **OG image / link** | 1200×630 px | Margem 60 px | Anil | 1200×630 px | Margem 60 px | Anil | `horizontal_digital-negativo` 400 px (base: `../logo/og-base-1200x630.png`) | Título 64 px |

**Grafismos nas redes:** 1 padrão **ou** 1 emblema por card. Constelação contínua para capas de série; emblema do serviço no card-título. **Uma luz por card**: se o card tem o logo ou o F de luz, o destaque do texto é Vermelhão, não âmbar.

| Faça | Não faça |
|---|---|
| Um conceito por post ("Fundo de reserva não é caixa do mês.") | 5 tópicos num card |
| Texto em Cal sobre Anil, destaque em Âmbar **ou** Vermelhão | Âmbar e Vermelhão na mesma frase |
| Foto real com véu Anil 60–80% | Foto de banco com calculadora |
| Handle @firefliesconsultoria | "Fireflies" sozinho |

### 5.7 Certificado Fireflies Academy

- **Formato:** A4 paisagem, 297×210 mm. PDF preenchível (sRGB) e impressão CMYK com +3 mm de sangria em papel 180–240 g (offset ou couché fosco).
- **Fundo:** **Cal Virgem** (impressão de gráfica) ou Branco (impressão em escritório).
- **Margens:** 15 mm até a **moldura-carta** (neatline alternado, Anil, 3 mm de espessura); conteúdo a 30 mm das bordas.
- **Logo:** `academy-horizontal_chapado` (gráfica) ou `digital` (PDF), **60 mm**, centralizado no topo, a 32 mm da borda.
- **Hierarquia:**

| Elemento | Fonte | Tamanho | Cor |
|---|---|---|---|
| "CERTIFICADO" | Sora Bold, caixa alta, tracking +8% | 36 pt | Anil |
| "Certificamos que" | IBM Plex Sans Regular | 12 pt | Fuligem |
| Nome do participante | Sora SemiBold, caixa alta | 28 pt | Anil |
| Curso, carga horária, período, modalidade | IBM Plex Sans Regular / SemiBold no nome do curso | 12 pt | Fuligem; nome do curso em Rubrica |
| Instrutor e responsável técnico | Plex Sans SemiBold 10 pt + Mono 8 pt (CRC) | | Anil / Pedra-Sabão |
| Código e verificação | IBM Plex Mono | 8 pt | Pedra-Sabão; QR 18 mm |

- **Grafismo:** Selo de Carta (selo-graduado-texto) **40 mm**, Anil, com o F de luz (`simbolo_chapado`, 18 mm) no centro, ao lado das assinaturas. Constelação *Liber* (Academy) opcional, sem letras, 30 mm, no canto superior direito, Anil 40%. Nada mais.
- **Não faça:** fundo Anil (difícil de assinar e de emoldurar), bordas douradas, fitas e louros, escrita cursiva no nome.

### 5.8 Placa, fachada e brindes

**Placa de porta / recepção**
- 400×150 mm (sala comercial) ou 600×200 mm (recepção). ACM ou acrílico 5 mm **Anil de Junho**, com `horizontal_chapado-negativo` em adesivo de recorte Cal + Âmbar (órbita de luz, E de luz e vagalume) ou impressão UV. Logo com 70% da largura da placa, centrado; margem mínima 2X.
- Alternativa sóbria: aço escovado ou vidro com `mono-anil` em recorte, sem âmbar.
- Altura de instalação: centro a 1,60 m do piso.

**Fachada / totem (se houver)**
- Fundo Anil; letra-caixa Cal com o vagalume e o E de luz em âmbar iluminados **por trás** (backlight); a órbita em recorte ou filete metálico, nunca luz colorida ou néon. Legibilidade: 25 mm de altura de letra para cada 10 m de distância.

**Sinalização interna:** Plex Sans SemiBold, Cal sobre Anil ou Anil sobre Cal; ícones de linha Carta do Lume; pictogramas de segurança seguem a NBR, não a marca.

**Selo "Prestação de contas auditada"** (decisão do v1 mantida): adesivo de vinil de 100×100 mm, datado, com QR de verificação; nunca usar "aprovado", "certificado" ou "garantido".

**Brindes**

| Item | Objeto | Aplicação | Versão |
|---|---|---|---|
| Caderno / bloco | Capa Anil ou kraft | Hot stamping ou serigrafia 1 cor | `mono-branco` (Anil) / `mono-anil` (kraft) |
| Caneta | Anil ou metal | Laser ou tampografia, F de luz (`simbolo-pequeno`) ou `wordmark`, 1 cor | `mono-*` |
| Caneca | Branca ou Anil fosco | Serigrafia 2 cores | `chapado` / `chapado-negativo` |
| Ecobag / camiseta | Algodão cru ou Anil | Serigrafia 1–2 cores ou bordado, logo no peito com 80–90 mm (bordado: mínimo 60 mm) | `mono-anil` / `chapado-negativo` / bordado `mono-*` |
| Crachá | PVC 86×54 mm, vertical | Topo Anil 40% com `vertical_chapado-negativo` 34 mm; base Branca com nome Plex Sans SemiBold 14 pt e função Mono 9 pt | `chapado-negativo` |
| Pasta A4 com bolso | 220×310 mm fechada (faca da gráfica), supremo 300 g, laminação fosca | Capa Anil com `horizontal_chapado-negativo` 70 mm (ou `digital-negativo` em 4 cores aprovado em prova) e campo de estrelas; interno Branco; bolso com corte para cartão | `chapado-negativo` |

- Gravação: traço mínimo de **0,3 mm**. Abaixo de 45 mm, troque o `horizontal` pelo `wordmark` (até 30 mm) ou pelo F de luz (`simbolo` ≥ 12 mm; `simbolo-pequeno` de 7 a 12 mm). Bordado: `simbolo-pequeno` ou `horizontal` mono com no mínimo 60 mm.
- **Não faça:** degradê em brinde, Âmbar como cor do objeto, logo em cor do fornecedor, gravação a laser do campo de estrelas (vira sujeira).

---

## 6. Gráficos e tabelas

### 6.1 Ordem das cores em séries

| Ordem | Fundo claro (Branco/Cal) | Fundo escuro (Anil) |
|---|---|---|
| 1ª série (a principal) | **Anil de Junho** #17183A | **Cal Virgem** #EDEEEA |
| 2ª | **Céu de Anil** #6E89B4 | **Céu de Anil** #6E89B4 |
| 3ª | **Vermelhão de Rubrica** #A9301F | **Vermelhão** #E65A3E |
| 4ª | **Pedra-Sabão** #5E6271 | **Fumaça** #D2D4DA a 50% (hachura) |
| Demais | Agrupar em "Outros", Fumaça | Agrupar em "Outros", Pedra-Sabão |
| **Destaque** (1 valor) | Âmbar **com contorno Anil** de 1 pt | Âmbar puro |

Regras:
- **Máximo de 4 séries.** Mais que isso vira tabela ou small multiples.
- O **destaque âmbar** é a lanterna do gráfico: 1 barra, 1 ponto ou 1 fatia, aquilo que o título afirma. O resto fica nas cores da tabela.
- Rótulos direto na série, sem legenda separada quando possível. Toda série distinguível também por **forma, posição ou rótulo** (daltonismo: Vermelhão e Âmbar têm 1,94:1 entre si).
- Gráficos em **matriz de pontos** (estrelas) para quantidades pequenas; barras chapadas e finas (60% da largura da categoria) para o resto. Sem 3D, sem sombra, sem degradê.
- Eixos e grade em Fumaça (claro) ou Céu de Anil 40% (escuro), 0,5 pt; sem borda de gráfico.

### 6.2 Estados (alerta, positivo, negativo)

| Estado | No claro | No escuro | Sempre com |
|---|---|---|---|
| Positivo / em dia | Folha de Bananeira #2D7550 (5,57 no Branco ✔) | Folha de Bananeira só como forma (3,07 ◐) + rótulo Cal | ícone `check` + palavra "Em dia" |
| Atenção | Rapadura #9A5A06 (5,47 ✔) | Rapadura como forma (3,13 ◐) + rótulo Cal | ícone `alerta` + "Atenção" |
| Crítico / risco | Carmim #A51C45 (7,36 ✔) ou Rubrica | **Vermelhão** #E65A3E (4,80 ✔); Carmim é proibido no escuro (2,32 ✖) | ícone `alerta` preenchido + "Crítico" |
| Variação negativa | Rubrica + sinal "−" (nunca parênteses sozinhos) | Vermelhão + "−" | seta-baixo |
| Variação positiva | Anil + sinal "+" (verde só se for estado) | Cal + "+" | seta-cima |

Semáforo nunca só por cor: a ordem **forma → palavra → cor**.

### 6.3 Números

- **IBM Plex Mono** (ou `font-variant-numeric: tabular-nums`) em toda coluna de valores.
- **Alinhados à direita**, com o mesmo número de casas decimais na coluna.
- Moeda: **R$ 1.234.567,89** (espaço fino/não separável depois de R$; ponto de milhar; vírgula decimal). Em tabela, "VALOR (R$)" no cabeçalho e só o número na célula.
- Negativo: **−1.234,56** com sinal de menos real (U+2212) em Rubrica; em contabilidade formal, (1.234,56) é aceito **somado** à cor.
- Percentual: **9,4%** sem espaço; pontos percentuais escritos "p.p.".
- Datas: **dd/mm/aaaa**; períodos **01/2026–12/2026** (meia-risca).
- Números grandes de capa e KPI: Sora Bold; a unidade em Plex Mono a 40% do tamanho.

---

## 7. Uso dos grafismos

| Grafismo | Quando usar | Onde | Máximo por peça |
|---|---|---|---|
| **Constelações dos serviços** (8 emblemas) | Para identificar o serviço do material | Capa, divisor, card-título de post, abertura de módulo Academy, capa de proposta | **1 por página/slide.** Com letras de Bayer ≥ 96 px; sem letras 48–96 px; abaixo de 48 px, use o ícone de linha |
| **Ornamentos** (21) | Como pontuação: medir, numerar, separar, marcar | Divisor-pontilhado entre seções, régua em cronograma, escala-gráfica "dias até a primeira luz", Selo de Carta em relatório e certificado, marcadores-estrela em listas | **3 por composição** (marcadores de lista contam como 1) |
| **Padrões** (campo de estrelas, retícula, constelação contínua, matriz de pontos) | Fundo de peças de impacto | Capa, divisor, story, verso de cartão, pasta, envelope (interno), área de gráfico | **1 por composição**, a 25–50% de opacidade em Céu de Anil (escuro) ou Anil 15–25% (claro); nunca atrás de texto corrido |
| **Retícula** | Peças de dados e precisão | Área de gráfico, painel mensal, capa de relatório | Conta como o padrão da peça |
| **Trilha do Photinus** | Percurso, etapas, prazo, "30 dias" | Cronograma de proposta, encerramento, Academy | 1 por peça |
| **Ícones de linha** (79) | Rotular, navegar, listar | Conteúdo de slide, site, documentos, sinalização | Sem limite funcional; no máximo 6 por slide/card. Mínimo 20 px |

**Onde não usar grafismo nenhum:** contrato, parecer, ata, timbrado (área útil), assinatura de e-mail, tabelas.

**Regra da luz com grafismo:** padrões e emblemas trazem uma lanterna âmbar. Se o logo (com o vagalume aceso) está **na mesma composição e visível**, use o padrão/emblema com a lanterna em `currentColor` (sem âmbar) ou esconda a Lanterna do padrão fora do corte.

---

## 8. Fotografia

**Estilo:** fotos **reais**: Gabriel, reuniões, assembleias, condomínios atendidos (com autorização), mesa de trabalho com papel, régua, caneta. Luz natural ou de fim de tarde, ambientes noturnos com pontos de luz quente. Gente olhando o documento ou explicando, não posando.

**Não usar:** calculadora, gráfico subindo, aperto de mão, pilha de moedas, notas de dinheiro, homem de terno apontando para tela, cidade com bokeh, fogos, céu estrelado de banco de imagem, luz roxa ou ciano, "IA".

**Tratamento:**
- Temperatura levemente fria nas sombras e quente nos pontos de luz (combina Anil + Âmbar).
- Saturação −10 a −20; contraste moderado; preto levantado (as sombras puxam para Anil, não para preto puro).
- Sem filtros, vinheta, grão pesado, desfoque artificial ou duotone fora da paleta.
- Duotone permitido: **Anil de Junho → Cal Virgem** (para fotos de baixa qualidade ou bancos de evento).

**Véu anil sobre foto:**
- **Véu Anil de Junho a 60–80%** de opacidade no terço onde ficam logo e texto, ou na foto inteira se for fundo de texto.
- Foto muito movimentada: **Anil Profundo a 80%**.
- Degradê de véu (Anil 80% → 0%) é o **único degradê permitido** fora do arco do logo, e só na direção do texto para a imagem.
- Texto sobre véu: Cal/Branco, contraste ≥ 4,5:1 medido no ponto mais claro da foto.
- Foto clara sem véu: logo `digital` somente em área lisa; se houver textura, véu Cal Virgem 80–90%.

---

## 9. Office e Google Workspace

### 9.1 Fontes e fallbacks

| Papel | Instalar | Se não houver (Office) | Google Docs/Slides |
|---|---|---|---|
| Títulos | Sora | Century Gothic Bold, caixa alta | Sora |
| Texto | IBM Plex Sans | Arial | IBM Plex Sans |
| Dados | IBM Plex Mono | Consolas | IBM Plex Mono |

- **PowerPoint/Word:** incorporar fontes (Arquivo → Opções → Salvar → "Incorporar fontes no arquivo" → "Incorporar todos os caracteres"). Sempre enviar ao cliente em **PDF**.
- **Templates:** `.potx` (slides) e `.dotx` (documentos) com o tema já aplicado; mais as variantes "Impressão" (slides) e "Escritório" (relatório sem capa sangrada).
- Logos dentro do Office: **SVG** (Office 365) ou **EMF**; PNG 2000 px como último recurso. Nunca copiar e colar do PDF.

### 9.2 Tema de cores (Office e Google, nesta ordem)

| Slot do Office | Slot do Google | Cor | HEX |
|---|---|---|---|
| Texto/Fundo – Escuro 1 | Escuro 1 | Fuligem | #2A2F3D |
| Texto/Fundo – Claro 1 | Claro 1 | Branco | #FFFFFF |
| Texto/Fundo – Escuro 2 | Escuro 2 | Anil de Junho | #17183A |
| Texto/Fundo – Claro 2 | Claro 2 | Cal Virgem | #EDEEEA |
| **Ênfase 1** | **Destaque 1** | **Anil de Junho** | **#17183A** |
| **Ênfase 2** | **Destaque 2** | **Céu de Anil** | **#6E89B4** |
| **Ênfase 3** | **Destaque 3** | **Vermelhão de Rubrica** | **#A9301F** |
| **Ênfase 4** | **Destaque 4** | **Pedra-Sabão** | **#5E6271** |
| **Ênfase 5** | **Destaque 5** | **Âmbar de Vagalume** | **#F2B544** |
| **Ênfase 6** | **Destaque 6** | **Vermelhão** | **#E65A3E** |
| Hiperlink | Link | Vermelhão de Rubrica | #A9301F |
| Hiperlink seguido | — | Pedra-Sabão | #5E6271 |

**Por que essa ordem:** o Office e o Google pintam gráficos na ordem das Ênfases. Com Ênfase 1–4 = Anil, Céu, Rubrica, Pedra, todo gráfico novo já sai na ordem da seção 6.1. Âmbar fica na 5ª posição para **não entrar** sozinho em gráficos de até 4 séries: aplique-o à mão no valor de destaque. No tema do slide escuro, troque a série 1 para Cal Virgem manualmente (ou use o layout "Dados · escuro" do template).

Nomeie o tema **"Fireflies 2026"** (arquivo `Fireflies 2026.thmx`) e as fontes do tema: Títulos = Sora, Corpo = IBM Plex Sans.

### 9.3 Estilos de parágrafo (Word e Google Docs)

| Estilo | Base | Fonte | Tamanho / entrelinha | Espaço antes/depois | Cor | Outros |
|---|---|---|---|---|---|---|
| **Normal** | — | IBM Plex Sans | 10 pt / 14,5 pt (exato) | 0 / 6 pt | Fuligem | Justificação à esquerda; hifenização desligada |
| **Título** | — | Sora Bold, caixa alta | 20 pt / 24 pt | 0 / 12 pt | Anil | — |
| **Subtítulo** | — | IBM Plex Sans | 12 pt / 16 pt | 0 / 18 pt | Pedra-Sabão | — |
| **Título 1** | Normal | Sora SemiBold, caixa alta, +2% | 14 pt / 18 pt | 18 / 6 pt | Anil | Manter com o próximo; numeração "1." opcional |
| **Título 2** | Normal | IBM Plex Sans SemiBold | 12 pt / 16 pt | 12 / 4 pt | Anil | Manter com o próximo |
| **Título 3** | Normal | IBM Plex Sans SemiBold | 10,5 pt / 14 pt | 10 / 2 pt | Fuligem | — |
| **Eyebrow** | Normal | IBM Plex Mono Medium, caixa alta, +10% | 8 pt | 0 / 4 pt | Rubrica | — |
| **Lista** | Normal | IBM Plex Sans | 10 pt | 0 / 3 pt | Fuligem | Marcador: círculo cheio Anil (●) 6 pt; recuo 5 mm |
| **Citação / destaque** | Normal | IBM Plex Sans Itálico | 11 pt / 16 pt | 12 / 12 pt | Anil | Borda esquerda 3 pt Rubrica, recuo 6 mm |
| **Tabela – cabeçalho** | — | IBM Plex Mono Medium, caixa alta | 8 pt | 3 / 3 pt | Anil | Borda inferior 0,75 pt Anil |
| **Tabela – texto** | — | IBM Plex Sans | 9 pt / 12 pt | 3 / 3 pt | Fuligem | Borda inferior 0,5 pt Fumaça |
| **Tabela – número** | Tabela – texto | IBM Plex Mono | 9 pt | 3 / 3 pt | Fuligem | Alinhado à direita |
| **Legenda / nota** | Normal | IBM Plex Sans | 8 pt / 11 pt | 4 / 8 pt | Pedra-Sabão | — |
| **Cabeçalho / Rodapé** | — | IBM Plex Mono | 7,5 pt | 0 / 0 | Pedra-Sabão | — |

No Google Docs, os slots são "Título", "Subtítulo", "Título 1–6" e "Texto normal": configure e use **"Salvar como meus estilos padrão"**, mas distribua o template como cópia de um Doc-modelo (os estilos padrão não vão junto).

**Estilo de tabela no Word:** "Fireflies – Dados": sem bordas verticais, cabeçalho como acima, faixas de linha alternadas em Cal Virgem (opcional), linha de total com borda superior 0,75 pt Anil.

---

## 10. Checklist de aprovação (antes de enviar qualquer peça)

**Marca**
- [ ] O fundo segue a árvore da seção 3 (impresso no escritório = Branco).
- [ ] A versão do logo é a da matriz da seção 2 para esse fundo, e a cor é a do meio: `digital` na tela, `chapado` na impressão, `mono` em carimbo e bordado. Arquivo vetorial ou PNG ≥ 2×.
- [ ] Área de proteção de X/2 (lockups) ou ¼ da órbita (F de luz), e tamanho acima do mínimo (horizontal ≥ 240 px / 45 mm).
- [ ] **Uma** luz âmbar na composição, e ela não está em texto.
- [ ] Tem Rubrica (ou Vermelhão no escuro) em algum ponto da peça institucional.
- [ ] Nada de cor fora da paleta, nem roxo.

**Texto**
- [ ] "Fireflies Consultoria" por extenso na primeira menção, nos títulos e nos handles.
- [ ] Nenhuma palavra proibida (mágica, energia, destino, alquimia, brilho/brilhar).
- [ ] Uma frase de luz por peça; "Luz medida." sem complemento.
- [ ] Responsável técnico, CRC e CNPJ **confirmados** (sem "[a confirmar]" em peça final).
- [ ] Tom certo: "nós" em proposta, contrato e relatório; "a gente" em redes e WhatsApp.

**Tipografia e dados**
- [ ] Títulos em Sora caixa alta; texto em Plex Sans; números em Plex Mono à direita.
- [ ] Corpo ≥ 10 pt (documento), ≥ 18 pt (slide de tela), ≥ 24 pt (projetor em sala clara).
- [ ] Todo texto com contraste ≥ 4,5:1 (conferir na seção 2).
- [ ] Gráfico com ≤ 4 séries, título que afirma, estado com forma + palavra + cor.
- [ ] R$, datas e percentuais no padrão da seção 6.3.

**Produção**
- [ ] Grafismos dentro do limite: 1 emblema, 1 padrão, 3 ornamentos.
- [ ] Peça impressa: CMYK FOGRA39, 3 mm de sangria, texto a 3 mm (5 mm no cartão) do corte, fontes incorporadas.
- [ ] Teste em P&B (handout, timbrado, relatório) e, se projetado, teste no projetor.
- [ ] PDF final < 5 MB (WhatsApp) / < 10 MB (e-mail), com nome de arquivo no padrão.
- [ ] Fotos reais, autorizadas, com véu quando há texto por cima.

---

## 11. Erros comuns

1. **Âmbar em texto** sobre Branco ou Cal (1,83 e 1,57:1): título, link ou número "dourado" ilegível.
2. **Duas luzes:** vagalume do logo + ícone âmbar + número âmbar na mesma composição.
3. **Logo de fundo claro sobre Anil** (ou `-negativo` sobre Branco), ou **`digital` com gradiente** mandado para a gráfica ou para a impressora do escritório em vez do `chapado`.
4. **Logo abaixo do mínimo:** `horizontal` com menos de 240 px / 45 mm (as estrelas e o descritor somem), ou `simbolo` reduzido a 16 px em vez do `favicon`.
5. **Relatório ou contrato com miolo em Cal ou Anil**: mancha na impressora do síndico e some na cópia.
6. **Deck inteiro em Anil projetado num salão de festas**: vira cinza lavado.
7. **Rubrica sobre Anil** (2,55:1) para "dar calor" ao slide escuro. No escuro o quente é o Vermelhão.
8. **Esquecer a Rubrica** e entregar uma peça só Anil + Âmbar: "banco marinho e dourado".
9. **Fonte de títulos em caixa alta e baixa** ou trocada por Arial Black quando falta a fonte. Use o fallback do tema.
10. **Números em fonte proporcional, centralizados**, com casas decimais diferentes na mesma coluna.
11. **Semáforo só por cor** (verde/amarelo/vermelho sem forma nem palavra).
12. **Papel de parede de grafismo:** padrão + emblema + rosa de pontos + moldura na mesma página.
13. **Foto com texto por cima sem véu**, ou véu cinza/preto em vez de Anil.
14. **Logo recolorido** na cor do parceiro, ou esticado para caber num banner.
15. **Ícones misturados** (Office, Lucide, emoji) com a biblioteca Carta do Lume, ou ✦ no lugar de estrela.

---

*Versão 1.1 · outubro de 2026 · Logo "Órbita do vagalume" e Sora finais. Pendências: CRC e CNPJ.*
