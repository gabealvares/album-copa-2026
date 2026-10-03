# Fireflies Consultoria v2: aplicações da marca

Este pacote reúne todas as aplicações da identidade "Órbita do vagalume". O resumo visual está em `mockups.png`.

**Formato de cada peça:**
- `.svg`: arte autorada em SVG, com **todo o texto convertido em curvas** (opentype.js) e cores literais. Não usa fonte instalada nem variável CSS, então abre igual no Illustrator, Inkscape, Figma, Affinity e no navegador. O texto original fica no atributo `aria-label` de cada curva, para consulta.
- `.png`: peças digitais em **2×**; impressos a **300 dpi**, recortados na linha de corte (servem de prova, sem sangria).
- `.pdf`: impressos e o deck. Saem do Chromium (`page.pdf`) no tamanho real em mm, com a sangria e `printBackground`. São vetoriais.
- `.html`: versão editável (texto vivo, `contenteditable`) das peças com muito texto.

**Logos avulsos:** os 56 SVG e os 56 PNG (8 versões × 7 cores) estão em `../logo/svg/` e `../logo/png/`. O pacote de app (favicon.ico, apple-touch, android, avatar e OG) está em `../logo/`.

## Peças

| Peça | Medidas | Arquivos | Como editar |
|---|---|---|---|
| **Apresentação**: 8 slides-mestre (capa escura, capa clara, divisor, conteúdo + ícones, dados, citação, tabela, encerramento) | 1920×1080 px (16:9) | `apresentacao/slide-01…08.svg` + `.png` (3840×2160) · `fireflies-apresentacao-template.pdf` (8 p.) · `editavel/apresentacao-editavel.html` | Para texto, use o HTML editável: clique e digite, depois Ctrl/Cmd+P → PDF, sem margens. Para dados do gráfico, cores e posições, edite `_build/apresentacao.js` |
| **Papel timbrado**, versão gráfica | A4 + 3 mm de sangria (216×303 mm) | `documentos/papel-timbrado_A4-sangria3mm.svg/.png/.pdf` | Arte de gráfica (offset). Retícula na margem esquerda |
| **Papel timbrado**, versão escritório | A4 210×297 mm, sem sangria | `documentos/papel-timbrado_A4-escritorio.svg/.png/.pdf` · `editavel/papel-timbrado.html` (carta de exemplo) | Use o PDF ou o SVG como fundo de página no Word/Docs, ou edite a carta no HTML. Destinatário a 50/20 mm (janela do DL) |
| **Proposta comercial**: capa + página interna | A4 + 3 mm | `documentos/proposta-comercial_01-capa` e `_02-interna` (`.svg/.png`) · `proposta-comercial_A4-sangria3mm.pdf` (2 p.) · `editavel/proposta-comercial.html` | Edite o texto no HTML, ou em `_build/documentos.js` e regenere |
| **Relatório de auditoria**: capa (gráfica e escritório) + resumo para o conselho | A4 + 3 mm; capa escritório A4 | `documentos/relatorio-auditoria_01-capa`, `_01-capa-escritorio`, `_02-interna` (`.svg/.png`) · `relatorio-auditoria_A4-sangria3mm.pdf` · `relatorio-auditoria_01-capa-escritorio.pdf` · `editavel/relatorio-auditoria.html` | Mesmo processo da proposta |
| **Parecer / nota técnica** (modelo) | A4, sem capa nem grafismo | `documentos/parecer-tecnico_A4.svg/.png/.pdf` · `editavel/parecer-tecnico.html` | Edite no HTML. Conteúdo jurídico de exemplo: revisar antes de usar |
| **Cartão de visita**, frente e verso | 90×50 mm (arquivo 96×56, sangria 3 mm, segurança 5 mm) | `papelaria/cartao-visita_frente`, `_verso` (`.svg/.png`) · `cartao-visita_90x50mm_sangria3mm.pdf` (2 p.) | `_build/papelaria.js`. QR → wa.me/5511982450527 |
| **Envelope DL**: frente + verso com aba | 220×110 mm | `papelaria/envelope-dl_frente`, `_verso-aba` (`.svg/.png`) · `envelope-dl_220x110mm.pdf` | A janela de 100×35 mm é faca do fornecedor e não vai impressa |
| **Pasta A4**, frente | 220×310 mm fechada (arquivo 226×316) | `papelaria/pasta-A4_frente.svg/.png/.pdf` | Encaixar na faca da gráfica (bolso e corte para cartão) |
| **Crachá** PVC vertical | 54×86 mm (arquivo 60×92) | `papelaria/cracha_54x86mm.svg/.png/.pdf` | Nome e função em `_build/papelaria.js`. O contorno do furo do cordão é indicação de faca |
| **Certificado Fireflies Academy** | A4 paisagem + 3 mm (303×216 mm) | `papelaria/certificado-academy_A4-paisagem.svg/.png/.pdf` | Nome, curso, datas e código em `_build/papelaria.js`. O logo é **chapado**, então a única luz âmbar é a do Selo de Carta |
| **Assinatura de e-mail** | 600 px máx.; logo exibido a 184 px | `digital/assinatura-email.html` · `digital/img/fireflies-logo-assinatura@2x.png` (e `-placa@2x` para dark mode) · `assinatura-email_preview.svg/.png` | Copie a tabela do HTML para o Gmail/Outlook. Hospede o PNG em HTTPS e troque o `src` |
| **OG image** | 1200×630 px | `digital/og-image_1200x630.svg/.png` (2×) | `_build/digital.js` |
| **Capa do LinkedIn** (página) | 4200×700 px e 1128×191 px | `digital/linkedin-capa_4200x700.svg/.png` (1×, já é o tamanho máximo) · `linkedin-capa_1128x191.svg/.png` (2×) | Texto dentro do centro seguro de 3000×500 |
| **Avatar** (F em órbita) | 1080×1080 px | `digital/avatar_1080.svg/.png` (2160 px) | Símbolo dentro do círculo de 70% |
| **Fundo de Zoom / Meet / Teams** | 1920×1080 px | `digital/fundo-videochamada_1920x1080.svg/.png` (1×, o limite das plataformas) | Centro livre para a pessoa e logo no canto superior direito |
| **Instagram**: manifesto, dado e dica para síndico | 1080×1350 px | `redes/instagram_01-manifesto`, `_02-dado`, `_03-dica-sindico` (`.svg/.png` 2×) | `_build/redes.js` |
| **Carrossel**: capa + 2 internas | 1080×1350 px | `redes/carrossel_01-capa`, `_02-interna`, `_03-interna` | Numeração "0X / 08". Para as outras 5 internas, use o mesmo molde |
| **Story** | 1080×1920 px (seguro: 250 no topo, 340 na base) | `redes/story_1080x1920.svg/.png` | `_build/redes.js` |
| **Post LinkedIn** | 1200×1200 e 1200×627 px | `redes/linkedin-post_1200x1200`, `_1200x627` | `_build/redes.js` |
| **Placa de fachada / porta** | 600×300 mm + 3 mm | `ambientacao/placa-fachada_600x300mm.svg/.png/.pdf` | ACM Anil com recorte em Cal e Âmbar (logo `chapado-negativo` a 70% da largura) |
| **Selo "Prestação de contas 2026 auditada por Fireflies Consultoria"** | vinil Ø100 mm (faca circular, 3 mm de sangria) + digital 1080 | `ambientacao/selo-contas-auditadas_vinil-100mm.svg/.png/.pdf` · `selo-contas-auditadas_digital-1080.svg/.png` | Ano, referência e QR (`fireflies.com.br/selo/AUD-2026-031`, **rota a confirmar**) em `_build/ambientacao.js`. Emitir só com autorização do conselho |
| **Caneca** e **camiseta** (mockup chapado) | 1600×900 e 1800×1060 px | `ambientacao/mockup-caneca`, `mockup-camiseta` (`.svg/.png`) | Os mockups mostram a regra: serigrafia em 2 cores (chapado) ou em 1 cor (mono) |
| **Prancha-resumo** | 3200 px de largura | `mockups.png` | `node _build/mockups.js` |

## Regras aplicadas (manual v2)
- **Uma luz por composição.** Quando o logo digital (com o vagalume âmbar) está na peça, emblemas, padrões e ícones usam a Lanterna na cor da linha. O âmbar só aparece fora do logo onde ele é a única luz: a barra de destaque do gráfico, o emblema do divisor e o Selo do certificado.
- **No claro:** logo digital ou chapado, texto em Fuligem, destaque em Rubrica, âmbar só em formas (com contorno Anil). **No escuro:** logo digital-negativo, texto em Cal e Fumaça, destaque em Vermelhão.
- **Tipografia:** títulos em Sora 600/700, caixa alta nos curtos; texto em IBM Plex Sans; dados em IBM Plex Mono, com números alinhados à direita.
- **Documentos:** margens de 25/22/25/20 mm, cabeçalho a 12 mm e rodapé a 10 mm, com fio Rubrica de 12 mm, responsável técnico e "Página X de Y".
- **Números fictícios** levam o selo "DADOS DE EXEMPLO". Razão social, CNPJ e CRC-SP do escritório já aplicados (`_build/documentos.js`, `papelaria.js`, `html.js`).

## Regenerar (`_build/`)
```bash
cd _build && ./gerar-tudo.sh      # tudo: SVG → PNG/PDF → HTML editáveis → mockups.png
node redes.js && node render.js redes   # só um grupo
```
- **Requisitos:** Node 22, Playwright (`/opt/node22/lib/node_modules/playwright`), `opentype.js` e `qrcode` (em `_build/node_modules`).
- **Fontes OFL** em `_build/fonts/`: Sora 600/700, IBM Plex Sans 400/500/600/itálico e IBM Plex Mono 400/500.
- **Biblioteca (`lib.js`):**
  - `t()` e `para()`: texto em curvas, com quebra de linha e `**destaque**`;
  - `tArc()`: texto em arco;
  - `logo()`: posiciona pela caixa da arte, sem a área de proteção;
  - `icon()`, `emb()`, `orn()` e `padrao()`: iconografia v2, com `currentColor` e as variáveis resolvidas em cores literais;
  - `qr()`.
- **Exportação:** `render.js` lê `manifesto/*.json`.
