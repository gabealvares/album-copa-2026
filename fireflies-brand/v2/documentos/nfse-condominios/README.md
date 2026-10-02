# NFS-e para condomínios · artigo no design system Fireflies v2

Recriação do artigo "Novidades da Receita em 01/10/2026: condomínios ganham código próprio na NFS-e". O original era um PDF de 18 páginas com a marca Winker Pro. O conteúdo foi mantido integralmente e na mesma ordem: seções 01–07, tabelas, as 37 linhas de tpDetCobranca, citações, base legal, os 10 passos e as fontes oficiais. Nenhum fato, data, código ou citação foi alterado.

## Arquivos
| arquivo | o que é |
|---|---|
| `index.html` | artigo web interativo e autocontido: CSS, JS, sprite de ícones e SVGs do logo inline. As fontes vêm do Google Fonts, com cópia local em `assets/fonts/` |
| `nfse-condominios.pdf` | versão A4 gerada do mesmo HTML (CSS `@media print`), com 16 páginas |
| `previews/` | PNG das páginas 1, 2, 4 e da última |
| `assets/` | cópias do que foi usado: `logo/` (sistema final), `icones/`, `condominios-sem-letras.svg` (constelação Domus) e `fonts/` |
| `_build/fonte.html` | fonte editável, com marcadores `<!--SPRITE-->`, `<!--LOGO-->` etc. |
| `_build/montar.js` | monta o `index.html` e gera o PDF e os previews |

## Como regerar
```bash
cd fireflies-brand/v2/documentos/nfse-condominios
node _build/montar.js            # index.html + nfse-condominios.pdf + previews/
node _build/montar.js --sem-pdf  # só o index.html
```
Edite sempre o `_build/fonte.html`, não o `index.html`.

O script usa Playwright (`/opt/node22/lib/node_modules/playwright`): `page.emulateMedia({media:'print'})` e depois `page.pdf({format:'A4', printBackground:true, preferCSSPageSize:true})`. Os previews saem com `pdftoppm` (poppler).

Para gerar pelo navegador, use Imprimir → Salvar como PDF → A4, com "Gráficos de fundo" ligado. As margens e o rodapé vêm do CSS.

## Troca de marca
- **Logo:** sai o Winker Pro e entra o sistema final "Órbita do vagalume", copiado de `../../logo/svg/`:
  - `fireflies_horizontal_digital-negativo.svg` no hero (320 px na tela e 66 mm no PDF; o mínimo é 240 px / 45 mm);
  - `fireflies_horizontal_digital.svg` na assinatura do rodapé, sobre Branco;
  - `fireflies_simbolo_digital-negativo.svg` (F de luz em órbita) no avatar.
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

## Impressão (A4)
- Margens do manual: superior 25, inferior 22, esquerda 25 e direita 20 mm.
- Rodapé em Mono 7,5 pt: fio Rubrica de 12 mm, "Fireflies Consultoria · Precisão que ilumina decisões." e "Página X de Y" (margin boxes do `@page`).
- Acordeões abertos, busca e barra de progresso escondidas, caixas de checklist visíveis.
- Cards, linhas de tabela, callouts e passos com `break-inside: avoid`. A seção 06 começa em página nova.

## Placeholders e pendências
- **Foto do autor:** não estava disponível. O avatar usa o símbolo final (F de luz em órbita) dentro de um círculo Anil Profundo, marcado com `data-placeholder="foto-do-autor"` e com um comentário no HTML. Troque o `<span class="avatar">` por `<img>` quando houver foto.
- **Link da live:** `href="#"` com `<!-- TODO: link da live -->`. O original apontava para um vídeo do YouTube da Winker, que não foi reaproveitado.
- **Fontes oficiais:** o PDF original não tinha os links dessas referências, então elas aparecem como lista sem link. Acrescente as URLs quando houver.
- O "60 dias, ou 9 semanas, a partir de hoje" é texto fixo, como no original (referência: 02/10/2026).
- No manual, o rodapé de documento formal pede CNPJ e CRC. Como isto é um artigo, e não um parecer, eles não foram incluídos.
