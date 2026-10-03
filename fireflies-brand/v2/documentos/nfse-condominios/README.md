# NFS-e para condomínios · artigo no design system Fireflies v2

Recriação do artigo "Novidades da Receita em 01/10/2026: condomínios ganham código próprio na NFS-e". O original era um PDF de 18 páginas com a marca Winker Pro. O conteúdo foi mantido integralmente e na mesma ordem: seções 01–07, tabelas, as 37 linhas de tpDetCobranca, citações, base legal, os 10 passos e as fontes oficiais. Nenhum fato, data, código ou citação foi alterado.

## Arquivos
| arquivo | o que é |
|---|---|
| `index.html` | artigo web interativo e autocontido: CSS, JS, sprite de ícones e SVGs do logo inline. As fontes vêm do Google Fonts, com cópia local em `assets/fonts/` |
| `nfse-condominios.pdf` | **versão impressa editorial**, com 17 páginas A4 compostas à mão e sangria total (`_build/impresso.html`) |
| `previews/` | `impresso-p01…p17.png` (todas as páginas) e `impresso-spread.png` (prancha com as miniaturas) |
| `assets/` | cópias do que foi usado: `logo/` (sistema final), `icones/`, `condominios-sem-letras.svg` (constelação Domus) e `fonts/` |
| `_build/fonte.html` | fonte editável, com marcadores `<!--SPRITE-->`, `<!--LOGO-->` etc. |
| `_build/montar.js` | monta o `index.html` (versão web) |
| `_build/impresso.html` | fonte da versão impressa: cada `<section class="page">` é uma página A4 fixa (210 × 297 mm, `overflow:hidden`) |
| `_build/impresso.js` | injeta ícones, logo e constelações, numera as páginas e o sumário, alinha as notas da NFS-e, gera o PDF, os PNGs e a prancha. Também imprime um relatório de colisões por página |

## Como regerar
```bash
cd fireflies-brand/v2/documentos/nfse-condominios
node _build/montar.js     # index.html (web)
node _build/impresso.js   # nfse-condominios.pdf + previews/impresso-pNN.png + impresso-spread.png
```
- **Web:** edite `_build/fonte.html`, nunca o `index.html`.
- **Impresso:** edite `_build/impresso.html`. Ao mudar um texto, confira se a página ainda cabe: o conteúdo de cada página é composto à mão e o excedente é cortado, não flui para a seguinte.
- **PDF:** sai com Playwright (`/opt/node22/lib/node_modules/playwright`), usando `page.pdf({ width:'210mm', height:'297mm', printBackground:true, margin:0, preferCSSPageSize:true })`. Os PNGs saem com `pdftoppm` (poppler).
- O `@media print` do `index.html` continua lá, para quem imprimir o artigo direto do navegador, mas o PDF oficial é o paginado.

## Troca de marca
- **Logo:** sai o Winker Pro e entra o sistema final "Órbita do vagalume", copiado de `../../logo/svg/`:
  - `fireflies_horizontal_digital-negativo.svg` no hero (320 px na tela e 66 mm no PDF; o mínimo é 240 px / 45 mm);
  - `fireflies_horizontal_digital.svg` na assinatura do rodapé, sobre Branco;
  - `fireflies_simbolo_digital-negativo.svg` (F em órbita) no avatar.
  - Os provisórios L1 · Órbita do scratchpad foram usados só no primeiro rascunho e já foram substituídos.
- **Autor:** "Gabriel Alvares · Fundador & Contador Responsável · Fireflies Consultoria" (no original: "Product Owner & Contador · Winker").
- **CTA:**
  - "Fale com nossos especialistas" leva a https://wa.me/5511982450527 (botão primário Âmbar com texto Anil);
  - "Assistir à live completa" é o botão secundário, em contorno.
- **Tipografia:**
  - Sora 600/700 nos títulos: títulos curtos em CAIXA ALTA (03, 05, 07) e títulos longos em caixa alta e baixa, conforme `tipografia/README.md`;
  - IBM Plex Sans no texto;
  - IBM Plex Mono em códigos, valores em R$, eyebrows e rótulos.
- **Cor:**
  - fundo de trabalho Branco, com Anil no hero, nos cards-chave, na citação, nos callouts "Nossa leitura/recomendação/orientação" e no CTA;
  - Rubrica nos números de seção, eyebrows e fio de rodapé;
  - o Âmbar nunca é texto sobre fundo claro.

## Componentes: original → Fireflies
| original (Winker) | agora (Fireflies) |
|---|---|
| Hero azul-petróleo com verde-lima | Hero Anil com logo negativo, eyebrow em Mono e ponto âmbar, e título em Sora (trecho regular em Cal 600; destaque em Branco 700, sem um segundo âmbar, pela regra "uma luz") |
| Ícones FontAwesome | Biblioteca "Carta do Lume": calendario, prazo (relógio e ampulheta), fiscal (balança/base legal), info, alerta, endereco (pino), nota-fiscal (documento), credencial (inquilino), equipe (pessoas), painel-mensal, guia-imposto, busca, mais/menos, conversa, video-aula. No claro, a lanterna dos ícones fica na cor do traço |
| Cards 99.05.01 / 01/12/2026 | Bloco Anil com números em Sora 700, badge "NOVO" em Âmbar sobre Anil e "60" em Vermelhão |
| Tabelas | Cabeçalho Anil com Mono caixa alta em Cal, zebra Branco/Cal e códigos em Plex Mono. No celular, a tabela vira cartões |
| Exemplo da NFS-e | Acordeão acessível (`aria-expanded`), com total de R$ 935,00 em Mono. Na tela abre em "Vencimento"; no PDF todos os painéis saem abertos |
| tpDetCobranca | Lista em 2 colunas com busca funcional (ignora acentos) e contador. O "?" do 006 leva ao callout CMM |
| Callouts | info em Céu claro; "EM ABERTO" em Rapadura sobre âmbar muito claro; "Você sabe…?" com borda tracejada âmbar; leitura, recomendação e orientação em Anil; base legal em Cal com a balança |
| Citação da NT | Bloco Anil com aspas em Âmbar |
| Linha do tempo dos 4 sinais | Números em círculos Anil, ligados por pontilhado Céu de Anil (traço de constelação) |
| "Qual é a situação…" | Status por forma, palavra e cor: ✔ círculo cheio Folha de Bananeira = Sim; meio círculo Rapadura = Sim (tendência); círculo com traço Pedra-Sabão = Não / Sem tributo |
| Checklist dos 10 passos | Interativo, com progresso "x de 10" salvo em `localStorage` (protegido por try/catch). No PDF as caixas aparecem vazias |
| Grafismo | 1 constelação Condomínios (Domus) no hero, com a lanterna em `currentColor` |

## Versão impressa editorial (v2, depois do feedback do cliente)
O cliente pediu página inteira com fundos e cores, caixas e tabelas sem quebra e menos "cara de IA". O PDF virou uma peça paginada à mão, 17 páginas:

| pág. | composição |
|---|---|
| 01 | Capa Anil sangrada, com retícula celeste a 38 %, constelação Domus grande saindo da página, logo negativo, título em Sora 700, autor (símbolo como avatar provisório), data e leitura |
| 02 | Abertura em Branco: introdução; aviso em nota de margem; 99.05.01, 01/12/2026 e 60 como peças tipográficas, sem caixa; citação do Ato Conjunto nº 4 com fio Anil; sumário com nº de página |
| 03, 06, 08, 10, 12, 14, 16 | Aberturas das seções 01–07: faixa ou meia página Anil sangrada, número enorme em contorno fino Céu de Anil, título em Sora 700 caixa alta e a constelação do tema (Libra Fisci, Domus, Ascensio, Ratio, Lens, Fluxus, Liber) |
| 04 | A NFS-e como "documento dentro do documento" sobre Cal: folha branca com campos rotulados A–F, fios pontilhados de preenchimento, total de R$ 935,00 e as exigências como notas de margem alinhadas a cada grupo |
| 05 | tpCobranca em 2 colunas; os 37 tpDetCobranca em 3 colunas numa página; tabela das siglas |
| 06 | A pergunta do CMM fecha a seção 01 no alto da abertura da 02 |
| 07 | Cal: "Em aberto" em fundo chapado; CPF / CNPJ / CIB tipográficos; base legal numa faixa branca |
| 09 | Meios de pagamento e citação da NT em bloco Anil de 2/3 de página, com aspas âmbar |
| 10–11 | "Nossa leitura" em faixa Anil com fio Vermelhão; pontos em aberto em linhas com fio; base legal (3 trechos) em faixa Cal |
| 12–13 | Linha do tempo pontilhada; Emitir ≠ Pagar em faixa Cal; matriz 3 × 4 com ● Sim / ◐ Sim (tendência) / ○ Não + palavra; pendências; "Nossa orientação" em faixa Anil |
| 14–15 | Checklist de 2 colunas com caixa quadrada e número grande em Sora |
| 16–17 | Fontes numeradas (sem links: o original não trazia URLs); contracapa Anil sem fólio, com CTA, WhatsApp e a órbita do logo |

Regras aplicadas:
- **Grid:** 12 colunas sobre as margens do manual (25/22/25/20 mm). O texto ocupa 8 colunas e as notas de margem (Consulte na íntegra, aviso, base legal curta) ficam em Plex Mono 7 pt com fio Anil.
- **Forma:** sem cantos arredondados, cards, pílulas ou ícones em círculo. Rótulos (NOVO, OBRIGATÓRIO, EM ABERTO) em Mono caixa alta com marcador de ponto.
- **Cabeçalho e fólio:** cabeçalho corrido "NFS-e · Condomínios" e fólio "● NN / 17" com ponto âmbar em todas as páginas internas.
- **Cor:** âmbar só na lanterna (logo ou constelação) e em 1 ou 2 marcadores por página. Rubrica e Vermelhão como acento quente.
- **Paginação:** todas as tabelas e listas ficam inteiras numa página.

## Impressão a partir do navegador (`index.html`, `@media print`)
- Margens do manual: superior 25, inferior 22, esquerda 25 e direita 20 mm.
- Rodapé em Mono 7,5 pt: fio Rubrica de 12 mm, "Fireflies Consultoria · Precisão que ilumina decisões." e "Página X de Y" (margin boxes do `@page`).
- Acordeões abertos, busca e barra de progresso escondidas, caixas de checklist visíveis.
- Cards, linhas de tabela, callouts e passos com `break-inside: avoid`. A seção 06 começa em página nova.

## Placeholders e pendências
- **Foto do autor:** não estava disponível. O avatar usa o símbolo final (F em órbita) dentro de um círculo Anil Profundo, marcado com `data-placeholder="foto-do-autor"` e com um comentário no HTML. Troque o `<span class="avatar">` por `<img>` quando houver foto.
- **Link da live:** `href="#"` com `<!-- TODO: link da live -->`. O original apontava para um vídeo do YouTube da Winker, que não foi reaproveitado.
- **Fontes oficiais:** o PDF original não tinha os links dessas referências, então elas aparecem como lista sem link. Acrescente as URLs quando houver.
- O "60 dias, ou 9 semanas, a partir de hoje" é texto fixo, como no original (referência: 02/10/2026).
- No manual, o rodapé de documento formal pede CNPJ e CRC. Como isto é um artigo, e não um parecer, eles não foram incluídos.
- **Impresso:** na capa, o avatar do autor também é o símbolo (comentário `PLACEHOLDER` no `impresso.html`). Na contracapa, "Assistir à live completa" aparece sem endereço (`<!-- TODO: link da live -->`). A nota de margem da pág. 03 ("Na versão impressa, o exemplo aparece aberto…") e os rótulos de seção ("Seção 01 · Leiaute" etc.) são textos de navegação da versão impressa, não conteúdo do artigo.
