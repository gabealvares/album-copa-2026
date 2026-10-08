Consultoria financeira, contábil e fiscal em São Paulo, especialista em auditoria de condomínios. Território: **Carta do Lume**. O vagalume é *o que* se desenha; a carta celeste é *como* se desenha. Essência: **Luz medida.**

Use este sistema para qualquer peça da Fireflies Consultoria: site e blog (WordPress), posts e carrosséis de LinkedIn, propostas, relatórios e apresentações.

## Princípios

1. **Uma luz por composição.** O Âmbar (`ambar`) aparece uma vez por peça: o botão primário na noite, a lanterna de um ícone, a última estrela dos Passos. Duas luzes na mesma tela é erro.
2. **Precisão antes de ornamento.** Todo número tem origem, posição e responsável. Separe por fio (`fio`, `fio-forte`), nunca por sombra. Não use degradê fora do logo digital.
3. **Cantos retos.** Blocos, tabelas e cartões usam `raio-0`. Só botões e campos levam `raio-controle` (2px).
4. **Nada trabalha sozinho.** Componha em sistema: rótulo, título, abertura, bloco de dados, fontes. O leitor sempre sabe de onde vem cada número.

## Voz e conteúdo

A voz é **exata, serena e próxima**. O tom muda com o público:

| Público | Tom | Exemplo real |
|---|---|---|
| Síndico, conselho, administradora | Protetor e didático, sem jargão | "Sua taxa paga o que deveria? A gente mostra para onde vai cada real e leva o relatório pronto para o conselho." |
| Empresário / PME | Direto, caixa e tempo | "Todo mês você sabe quanto entrou, quanto sobrou e o que preocupa. Em dois minutos." |
| Grande empresa | Técnico e sóbrio, "nós" ou "a Fireflies" | "A Fireflies estrutura conciliação, fechamento e indicadores com um contador responsável." |
| Redes sociais | Leve e curioso, um conceito por post | "Fundo de reserva não é caixa do mês. Entenda em 3 slides." |

- Escreva em português do Brasil, em frases curtas. Trate o leitor por **você**. Use **"a gente"** no site, nas redes e com síndicos; use **"nós"** ou **"a Fireflies"** em proposta, contrato, relatório de auditoria e com grandes grupos.
- Dê número e prazo concretos ("30 dias", "dois minutos", "R$ 1.320,00"). Nomeie o responsável (Gabriel Alvares).
- Traduza o termo técnico na primeira vez: "DRE: o resultado do mês", "CIB: o CPF do imóvel".
- Alerte com calma e solução: "Inadimplência em 9%. Três unidades concentram 70%." Nunca use medo ("Seu condomínio pode estar sendo roubado!").
- Cite a norma pelo nome completo e com artigo: "Lei Complementar nº 214/2025, art. 509". Em conteúdo técnico, separe sempre o que é **Definido**, o que **Falta regulamentar** e o que é **Cenário**.
- Use no máximo uma metáfora de luz ou céu por peça. "Luz medida." não ganha complemento.
- **Palavras proibidas:** mágica/magia, energia, destino, alquimia, brilhar/brilho, horóscopo, signo, "o universo conspira", sagrado, cósmico, sonegar, brecha. Corte também: soluções, inovador, disruptivo, parceiro estratégico, *insights* (use "leitura"), *dashboard* (use "painel").
- Escreva "Fireflies Consultoria" em títulos e assinaturas, nunca "Fireflies" sozinho.
- Sem emoji. Sem ponto de exclamação. Datas em DD/MM/AAAA; dinheiro em `R$ 12.000,00`; percentuais com vírgula (`4,65%`).

**Hierarquia verbal.** Assinatura: **Luz medida.** Frase de apoio: **Precisão que ilumina decisões.** Conceito: **Nada trabalha sozinho.** Provas: "30 dias até a primeira luz.", "Painel mensal, explicado em reunião.", "Um contador responsável, que assina.", "Diagnóstico gratuito." Use uma frase de luz por peça; não empilhe assinatura, apoio e conceito no mesmo bloco.

**Dados da empresa.** Fireflies Consultoria LTDA · CNPJ 66.630.305/0001-95 · CRC-SP 2SP053069 (registro do escritório; não coloque CRC ao lado do nome de Gabriel) · Responsável técnico: Gabriel Alvares. Não publique endereço físico. Contato: WhatsApp `https://wa.me/5511982450527`, contato@fireflies.com.br.

## Cor

A paleta é "Noite de São João". Há dois temas: `claro` (padrão: Branco e Cal) e `noite` (Anil). Use sempre os tokens semânticos; recorra às cores de marca só nos componentes que as fixam (Nossa leitura, Números, CTA).

- Fundo: `fundo`; faixas alternadas: `fundo-alt`. Texto corrido em `texto`, títulos e negritos em `texto-forte`, legendas e metadados em `texto-suave`.
- Rótulo, palavra realçada e numeração: `quente` (Rubrica no claro, Vermelhão na noite). Links: `link`.
- **Âmbar nunca é texto no claro** (1,8:1). No claro, Âmbar só aparece como preenchimento com contorno Anil (lanterna). Vermelhão também não é texto no claro: use Rubrica.
- Céu (`ceu`) é fio pontilhado, borda e traço secundário. No claro não serve para texto (3,6:1).
- Estados usam `sucesso`, `alerta` e `erro`, **sempre com ícone e palavra** (componente Estado). Nunca comunique estado só pela cor.
- Proporção típica de uma peça clara: 70% Branco/Cal, 20% Anil, 8% Fuligem e Pedra, 2% quente; Âmbar uma vez, ou nenhuma.

| Fundo | Texto | Realce | Luz |
|---|---|---|---|
| Branco / Cal | Fuligem, Anil | Rubrica | Âmbar só como forma com contorno Anil |
| Anil / Anil Profundo | Cal, Branco, Fumaça | Vermelhão | Âmbar (texto, link, botão) |

## Tipografia

Três famílias, no máximo três pesos por peça.

- **Sora** (`sora`): títulos. Use `display` e `titulo-1` em **caixa alta** (+0,02em), `titulo-2` em caixa normal. Destaque **uma palavra** por título com `quente`. O "E de luz" é exclusivo do wordmark: nunca o recrie em títulos.
- **IBM Plex Sans** (`sans`): texto. `corpo` 17px/1,62 com até 62 caracteres por linha; `abertura` para o lead; `titulo-3` e `titulo-4` em 600.
- **IBM Plex Mono** (`mono`): dados. `rotulo` (eyebrow, caixa alta, +0,14em), `cabecalho-tabela`, `legenda` e `dado`. Dinheiro e percentuais sempre em Plex Mono, algarismos tabulares, **alinhados à direita**.
- Substitutas no Office: Century Gothic Bold (títulos), Arial (texto), Consolas (dados).

## Espaço, fios e layout

- Coluna de leitura `largura-conteudo` (720px); seções largas `largura-larga` (1240px); margem lateral `margem-lateral`.
- Espaçamento pela escala `espaco-10` … `espaco-80`. Blocos editoriais usam padding de 1,25–1,75rem; seções, `espaco-60`.
- Fios: `fio` (1px, cor `linha`) entre linhas; `fio-forte` (1,5px, `texto-forte`) abre índices, fichas e tabelas; `fio-lateral` (3px) marca Nossa leitura, Em aberto e Info.
- Sem sombras. Sem cantos arredondados em blocos. Sem cartões com borda colorida à esquerda além dos três blocos editoriais acima.
- Movimento: nenhum além de transições de 0,2s em hover. Respeite `prefers-reduced-motion`.

## Foco e interação

- Foco de teclado: contorno sólido de 2px em `foco` com 3px de afastamento (Rubrica no claro, Âmbar na noite; ambos acima de 6:1).
- Links: sublinhado de 1px com afastamento de 0,18em; 2px no hover.
- Botão primário em `acao`/`acao-texto`, uma vez por tela. O secundário é o contorno.

## Logo

Use os arquivos de **Logos**; nunca redesenhe a marca.

- `fireflies_horizontal_digital.svg` é a versão principal (site, documentos, e-mail). Mínimo de 240px de largura em tela. Sobre Anil, `…_digital-negativo.svg`.
- `vertical` para capas e peças quadradas; `simbolo` (F em órbita) a partir de 40px; `simbolo-pequeno` de 24 a 39px.
- **Favicon é o vagalume com rastro** (`favicon`, a partir de 32px; `favicon-16` de 16 a 31px), nunca o F.
- `chapado` para impressão em 2 cores; `mono-anil`/`mono-branco` para carimbo, gravação e marca-d'água.
- Sobre foto, use `digital-negativo` ou `mono-branco`, com véu Anil de 60–80%.
- Não aplique o Âmbar em mais nada quando o logo digital estiver na peça: o vagalume do logo já é a luz.

## Iconografia

Use os **Ícones** da marca (grid 24, traço 1,5, pontas redondas, Anil `#17183A`). Cada ícone pode ter uma **lanterna** (círculo Âmbar com contorno Anil): no máximo uma lanterna acesa por peça. Mínimo de 20px; ícones densos (fiscal, dre, condominios, turma) a partir de 20px. Não mude a espessura do traço: aumente o ícone. Não use emoji nem ícones de outras bibliotecas.

- **Constelações** (64px de grid): emblema de cada serviço, um por página, em capas e aberturas. Abaixo de 48px, use o ícone do serviço.
- **Ornamentos**: divisores, marcadores, réguas e selos de carta celeste.
- **Padrões**: campo de estrelas, retícula celeste, constelação contínua e matriz de pontos, em versões claro e escuro. Um padrão por composição, nunca atrás de texto corrido.

## Fotografia

Retratos reais da equipe, luz natural, sem banco de imagem. Recorte em 4:5 ou quadrado. Sobre foto, véu Anil de 60–80% antes de qualquer texto ou logo.

## Componentes

Os componentes reproduzem os blocos do site (tema `fireflies` + plugin `fireflies-core`) como HTML e CSS: envolva a página em `.ff` e use as classes `ff-*` de `components/bundle.css`. Para uma seção escura dentro de uma página clara, use `.ff-noite`. Cada componente tem as regras de uso no seu README.
