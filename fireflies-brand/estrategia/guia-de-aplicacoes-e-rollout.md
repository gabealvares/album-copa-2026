# Guia de aplicações e rollout · Fireflies Consultoria

> **Base (rodada 2):** fatos reais de fireflies.com.br (02/10/2026), `plataforma-de-marca.md`, `../cores/README.md` e `../tipografia/README.md`.
>
> **Quem é:** consultoria financeira, contábil e fiscal em São Paulo (SP), especializada em **auditoria de condomínios**. O fundador e contador responsável é **Gabriel Alvares** ([CRC-SP nº a confirmar]). Atendimento pelo WhatsApp **+55 11 98245-0527** e pelo e-mail **contato@fireflies.com.br**, de segunda a sexta, das 8h às 18h.
>
> **Arquitetura:** a marca mãe é **Fireflies Consultoria**, com as linhas **Fireflies Condomínios** e **Fireflies Academy**. Só muda o descritor do lockup. Não criar handles nem CNPJs separados.
>
> **Assinaturas:**
> - Tagline do logo: **"Precisão que ilumina decisões."**
> - Slogan e campanhas: **"Números em sincronia."** (modular, por exemplo: "Condomínio em sincronia.")
>
> **Nome:** use sempre **"Fireflies Consultoria"** em handles, títulos de página, anúncios e assinaturas, para não confundir com a Fireflies.ai. Nunca use roxo.

**Prioridades:**
- **P0:** dia do lançamento.
- **P1:** até 30 dias.
- **P2:** até 90 dias ou sob demanda.

**Público de cada peça:**
- **[S]** síndicos, conselhos e administradoras.
- **[E]** empresas (PMEs, consolidadas, grupos).
- **[A]** Academy.
- **[T]** todos.

### Paleta e fontes usadas nas peças

**Cores** (HEX, CMYK e Pantone completos em `../cores/README.md`):
- **Fundos:** Noite #06262B, Noite Funda #041C20, Maré #104048 (superfícies sobre Noite), Papel #F3F5F7 (fundo claro), Branco.
- **Luz:** **Vagalume #D9F24A**, só sobre fundo escuro. No claro, a luz é **Oliva #5E6E00**.
- **Texto:** Tinta #0E1726 sobre claro. Para texto secundário, Névoa #9DB9B7 sobre Noite e Pedra #5A6570 sobre Papel.
- **Bordas:** Linha #D5DBE1.
- **Alerta em dados (máx. 2%):** Brasa #F5A524. Sobre claro, em texto, Brasa Escura #B54708. Brasa nunca entra no logo.
- **Proporção:** 60% Noite ou Papel, 30% neutros, 8% Vagalume ou Oliva, 2% Brasa.
- **Sem gradientes, brilhos ou blur.**

**Fontes** (todas do Google Fonts, licença OFL):
- **Bricolage Grotesque** 600–800: títulos e números de destaque.
- **Instrument Sans** 400–600: corpo e interface.
- **JetBrains Mono** 400–500: valores, tabelas e eyebrows em caixa alta, precedidos de ●.
- **Fallback no Office:** Arial Bold, Calibri e Consolas. Em PPTX e PDF, **incorporar as fontes**.

**Recursos gráficos:**
- Gráficos em **matriz de pontos**.
- Padrão de **constelação** no fundo.
- **Órbita** como moldura.
- Em cada peça, **um único ponto aceso**.

---

## 1. Inventário de materiais com especificações

**Padrões técnicos:**
- **Digital:** sRGB, exportado em 2× para retina.
- **Impresso:** CMYK **Coated FOGRA39**, 300 dpi, PDF/X-4 (ou X-1a), **sangria de 3 mm**, marcas de corte e texto a pelo menos 3 mm do corte. Fazer **prova de cor obrigatória**, porque o Vagalume (#D9F24A ≈ C18 M0 Y80 K0) perde brilho no CMYK. Em peças-chave, avaliar Pantone 380 C como 5ª cor.

### 1.1 Prioridades por frente do negócio

| Frente | Canais e peças críticas | Prio |
|---|---|---|
| **Condomínios [S]** | WhatsApp Business, Instagram, **capa e template do relatório executivo de auditoria**, **apresentação em assembleia** (projetada e impressa), one-pager impresso para o conselho | P0/P1 |
| **Empresas [E]** | LinkedIn (página + perfil do Gabriel), **proposta comercial**, **template do painel mensal**, apresentação institucional | P0/P1 |
| **Academy [A]** | **Certificado de treinamento**, **slides de aula**, capa de turma para Instagram e LinkedIn | P1 |
| **Base [T]** | Site (favicon, OG), assinatura de e-mail, Google Business Profile, cartão de visita, papel timbrado digital | P0/P1 |

### 1.2 Digital e site [T] (sRGB)

| Prio | Peça | Dimensão | Formato | Observações |
|---|---|---|---|---|
| P0 | Favicon | 16, 32 e 48 px | `favicon.ico` multi + `favicon.svg` | Versão `favicon`: quadrado arredondado Noite com o nó Vagalume. Testar a 16 px. |
| P0 | Apple touch icon | 180×180 px | PNG sem transparência | Fundo Noite e símbolo negativo com cerca de 15% de margem. |
| P0 | Android / PWA | 192, 512 e 512 maskable | PNG + `site.webmanifest` | `theme_color` #06262B. No maskable, o símbolo fica nos 80% centrais. |
| P0 | OG image (preview de link e WhatsApp) | 1200×630 px | JPG/PNG < 1 MB | Fundo Noite, "Números em sincronia." e lockup negativo. Deixar 60 px de margem. Fazer uma genérica, uma para Condomínios e uma para Academy. |
| P0 | Logo no header | SVG, altura de 40–48 px no desktop e 32 px no mobile | SVG inline | Horizontal negativo no header Noite e positivo no tema claro. |
| P1 | Hero e banners | 1920×1080 (desktop) e 750×1000 (mobile) | WebP/AVIF + JPG, < 300 KB | |
| P1 | Imagem de artigo | 1200×675 px | WebP/JPG | Reaproveitar no LinkedIn. |
| P1 | Google Business Profile: logo | 720×720 px | JPG/PNG | Símbolo negativo sobre Noite. Categoria: "Consultor contábil" ou "Serviço de auditoria". |
| P1 | Google Business Profile: capa | 1024×576 px | JPG | Foto real do Gabriel ou de uma reunião, nunca de banco de imagem. |

### 1.3 WhatsApp Business [S][E] (o principal canal de atendimento)

| Prio | Peça | Dimensão | Formato | Observações |
|---|---|---|---|---|
| P0 | Foto de perfil | 640×640 px, exibida em círculo | JPG/PNG | Símbolo negativo centralizado sobre Noite, dentro de um círculo seguro de 70%. |
| P0 | Perfil comercial | Texto | | Nome: "Fireflies Consultoria". Categoria: Serviços financeiros. Horário: seg–sex, 8h–18h. Site e e-mail preenchidos. |
| P0 | Mensagens de saudação e de ausência + respostas rápidas | Texto | | Ver seção 5. Respostas rápidas: /diagnostico, /auditoria, /academy, /documentos. |
| P1 | Catálogo de serviços | 1080×1080 px por item | JPG | Itens: Auditoria em Condomínios, Contábil, Fiscal, Financeira, Processos, Sindicância, Academy. |
| P1 | Cards para envio a síndicos | 1080×1350 px | JPG | Usar "Checklist da assembleia" e "5 sinais de que é hora de auditar". |
| P1 | PDFs enviados pelo WhatsApp | | PDF < 5 MB | Comprimir. Na primeira página, ter visual legível na miniatura do chat. |

### 1.4 Instagram [S] (foco em síndicos)

| Prio | Peça | Dimensão | Formato | Observações |
|---|---|---|---|---|
| P0 | Foto de perfil | Enviar 1080×1080 (exibido em 320, em círculo) | PNG/JPG | Só o símbolo negativo sobre Noite. |
| P0 | Post retrato (padrão) | **1080×1350 px (4:5)** | JPG | Carrosséis didáticos de 6 a 10 cards. |
| P1 | Post 3:4 | 1080×1440 px | JPG | Desde 2025 o grid do perfil recorta em 3:4. Manter o conteúdo dentro de 1080×1350. |
| P1 | Post quadrado | 1080×1080 px | JPG | Só quando necessário, porque o grid recorta as laterais. |
| P0 | Stories e Reels | **1080×1920 px** | JPG / MP4 H.264 | Área segura: deixar livres 250 px no topo e 340 px na base. |
| P1 | Capa de Reels | 1080×1920 px (centro 1080×1440 visível no grid) | JPG | Título em Bricolage sobre Noite. |
| P1 | Capas de destaques | 1080×1920 px, ícone em círculo de cerca de 420 px | PNG | Destaques: Condomínios, Serviços, Academy, Método 30 dias, Contato. Ícones no grid 24 com 1 ponto aceso. |

### 1.5 LinkedIn [E] (página + perfil do Gabriel)

| Prio | Peça | Dimensão | Formato | Observações |
|---|---|---|---|---|
| P0 | Logo da página | 400×400 px | PNG | Símbolo negativo sobre Noite. |
| P0 | Capa da página | 1128×191 px (mínimo); **4200×700 px recomendado** | PNG/JPG < 3 MB | Fundo Noite + constelação + "Números em sincronia." centralizado. O canto inferior esquerdo fica livre por causa do logo. |
| P0 | Capa do perfil do Gabriel | 1584×396 px | JPG/PNG | Template replicável para a equipe. Incluir "Precisão que ilumina decisões." e "CRC-SP [nº]". |
| P1 | Post de imagem | 1080×1350 (4:5) ou 1200×1200 | JPG/PNG | |
| P1 | Carrossel (documento) | 1080×1350 px por página | PDF, ideal com 6 a 12 páginas | Formato de maior alcance. Pilares "Fiscal sem susto" e "Quem assina". |
| P1 | Post de link | 1200×627 px | JPG | Usa a OG image. |
| P2 | Capa de newsletter e de evento | 1920×1080 e 1776×444 px | JPG | Por exemplo, um webinar da Academy. |

### 1.6 Condomínios [S]: relatório, assembleia e impressos

| Prio | Peça | Especificação | Formato | Observações |
|---|---|---|---|---|
| P0 | **Capa do relatório de auditoria** | A4 retrato, 210×297 mm | PDF digital (sRGB) e impresso (CMYK, +3 mm de sangria) | Fundo Noite com lockup **Fireflies Condomínios** negativo e eyebrow "● RELATÓRIO DE AUDITORIA". Campos: nome do condomínio, período auditado, data de emissão e responsável técnico "Gabriel Alvares · [CRC-SP nº a confirmar]". |
| P0 | **Template do relatório executivo** (miolo) | A4 retrato, margens de 20 mm, corpo Instrument Sans de 10–11 pt | `.docx` / Google Docs → PDF/A | Página 1 é o "Resumo para o conselho": 3 a 5 achados, semáforo (Oliva = ok, Brasa Escura = atenção) e números em JetBrains Mono. Rodapé com responsável técnico, CRC e paginação. |
| P0 | **Apresentação em assembleia** (projetada) | 16:9, 1920×1080 px | `.pptx` + PDF | Tema **claro (Papel)**, porque salões de festa são claros e os projetores são fracos. Corpo com no mínimo 28 pt, título com 40 pt ou mais e no máximo 1 número por slide. Também em 4:3 (1440×1080) para projetores antigos. |
| P1 | Resumo impresso para assembleia (handout) | A4, frente e verso | PDF CMYK; ou impressão em escritório (P&B) | **Precisa funcionar em P&B**: testar em escala de cinza, sem informação só por cor e com o logo em `mono-noite`. Distribuído aos condôminos. |
| P1 | One-pager "Auditoria em Condomínios" | A4 | PDF digital + CMYK | Para administradoras e conselhos. Conteúdo: método em 4 etapas, entregáveis e CTA de WhatsApp com QR. |
| P1 | Cartaz para mural ou elevador (convocação, palestra) | A3, 297×420 mm | PDF CMYK, +3 mm | QR de no mínimo 25 mm. |
| P2 | **Selo / placa "Condomínio auditado"** | Ver avaliação abaixo | | **Faz sentido, com condições.** |

**Avaliação da placa ou adesivo "Condomínio auditado pela Fireflies"**

O selo tem valor. Ele dá prova social e visibilidade na portaria, e o síndico ganha um argumento de transparência na assembleia. Há, porém, riscos para uma marca cujo valor central é **precisão**:

1. Um selo permanente sugere uma garantia contínua que a auditoria não oferece, já que ela cobre um **período**.
2. Um selo exibido depois de um parecer com ressalvas induz o condômino a erro.
3. O Código de Ética do contador (CFC) exige publicidade moderada, sem promessa de resultado.

**Decisão:** não fazer placa permanente. Usar um **selo datado** com as regras abaixo:
- **Texto:** "Prestação de contas [2026] auditada por Fireflies Consultoria" + QR de verificação (que leva a uma página com o período e o responsável técnico).
- **Nunca usar** as palavras "aprovado", "certificado" ou "garantido".
- **Quando é emitido:** só com autorização formal do conselho e só após a conclusão do trabalho.
- **Validade:** vence com o próximo exercício.

**Formatos:**
- Adesivo de vinil de 100×100 mm para o quadro de avisos ou a portaria (CMYK, corte especial em círculo).
- Versão digital de 1080×1080 px para os informativos do condomínio.

**Prioridade:** P2. Validar o texto com o jurídico e fazer um piloto com 2 ou 3 clientes.

### 1.7 Empresas [E]: comercial e entrega mensal

| Prio | Peça | Especificação | Formato | Observações |
|---|---|---|---|---|
| P0 | **Proposta comercial** | A4 retrato, margens de 20 mm | `.docx` / Google Docs → PDF/A (sRGB) | Capa Noite e miolo Papel/Branco. Seções: diagnóstico, escopo, "30 dias até a primeira luz" (4 etapas), entregáveis, investimento (valores em JetBrains Mono), responsável. Tom formal-cordial ("nós"). |
| P0 | **Template do painel mensal** (PDF) | A4 **paisagem**, 297×210 mm; versão de tela 16:9, 1920×1080 | PDF (exportado do painel ou do template) | "Todo mês, o seu negócio em uma tela." Página 1 é uma tela com 4 a 6 KPIs (Bricolage para o número, Mono para o rótulo), gráficos em matriz de pontos e alertas em Brasa. Página 2 traz "O que mudou · o que preocupa · o que está resolvido". É o arquivo de registro da reunião mensal. Também precisa funcionar em P&B. |
| P0 | Template de slides institucional | 16:9, 1920×1080 px (33,867×19,05 cm) | `.pptx` / `.potx` + Google Slides | Layouts: capa Noite, divisor, título + texto, 2 colunas, número em destaque, gráfico em pontos, citação, método em 4 etapas, equipe/responsável, encerramento com WhatsApp. Paleta de dados: Noite, Maré, Névoa e Oliva (escuro) ou Vagalume; Brasa só para alerta. |
| P1 | Apresentação de credenciais | 16:9, de 10 a 15 slides | PDF < 10 MB | Para envio pelo WhatsApp ou e-mail. |
| P1 | One-pager por serviço | A4 | PDF | Contábil, Fiscal, Financeira, Processos e Sindicância, com o mesmo template. |
| P2 | Template de case (apenas reais e aprovados) | A4 ou 16:9 | PDF | Não usar cases "Ilustrativos" do site. |

### 1.8 Academy [A]

| Prio | Peça | Especificação | Formato | Observações |
|---|---|---|---|---|
| P1 | **Certificado de treinamento** | **A4 paisagem, 297×210 mm** | PDF digital preenchível (sRGB); impresso em CMYK com +3 mm de sangria, papel de 180–240 g | Lockup **Fireflies Academy**. Campos: participante, curso, carga horária, período, modalidade (in company/online), instrutor e responsável técnico (Gabriel Alvares · [CRC-SP nº a confirmar]) e **código/QR de verificação**. Fundo Papel com moldura em órbita fina Noite e um ponto Oliva. Gerar em lote (mala direta ou script). |
| P1 | **Slides de aula** | 16:9, 1920×1080 px | `.pptx` + Google Slides + PDF | Derivado do template institucional, com layouts extras: objetivo da aula, conceito, exemplo numérico (Mono), exercício, "pausa para perguntas" e resumo. Tema claro para sala e escuro para gravação. |
| P1 | Capa de turma / curso | 1080×1350 (IG), 1200×627 (LI), 1920×1080 (EAD) | JPG | |
| P2 | Apostila / material do aluno | A4 retrato | PDF | |
| P2 | Fundo para videochamada / aula online | 1920×1080 px | JPG | Logo no canto superior direito. |

### 1.9 E-mail [T] (sRGB)

| Prio | Peça | Especificação |
|---|---|---|
| P0 | Assinatura de e-mail | Máximo de **600 px** (conteúdo entre 400 e 500 px). Logo PNG 2× (360×80 exibido a 180×40), hospedado em HTTPS. HTML com tabelas e estilos inline, < 50 KB. Texto em Arial ou Helvetica (fallback de Instrument Sans). Usar o logo **positivo** com o nó em Oliva, que funciona no claro e no dark mode do Gmail. |
| P1 | Template de newsletter | 600 px; header de 600×150 (exportar 1200×300) em Noite com logo negativo. Testar no dark mode do Gmail e do Outlook. |

### 1.10 Papelaria [T] (CMYK FOGRA39, sangria de 3 mm)

| Prio | Peça | Formato | Observações |
|---|---|---|---|
| P1 | Cartão de visita | **90×50 mm** (arquivo de 96×56 mm) | Frente com fundo Noite e símbolo negativo, nó Vagalume; avaliar Pantone 380 C ou hot stamping. Verso Papel com nome, "Contador responsável · CRC-SP [nº]", WhatsApp, e-mail e QR para o WhatsApp (mínimo de 15×15 mm). Couché de 300 g com laminação fosca. |
| P0 | Papel timbrado digital | A4 | `.docx` / Google Docs (sRGB). A versão impressa é P2. Usar para pareceres, cartas e contratos. |
| P2 | Pasta A4 com bolso | Faca da gráfica | Para entregar o relatório de auditoria em mãos ao conselho. |
| P2 | Envelope saco | 240×340 mm | Só se houver envio físico de relatórios. |

### 1.11 Eventos e palestras [S][A] (CMYK, ≥ 100–150 dpi efetivos)

| Prio | Peça | Dimensão | Observações |
|---|---|---|---|
| P2 | Banner roll-up | 85×200 cm (+10 cm na base) | Fundo Noite com "Condomínio em sincronia." e lockup no terço superior. |
| P2 | Brindes (bloco, caneca, camiseta) | Vetor | Usar logo **mono** (`mono-noite` ou `mono-branco`) ou 2 cores chapadas. Nada de efeitos. |

---

## 2. Arquivos de logo a exportar

### 2.1 Versões × cores

**Padrão do arquivo mestre:** `fireflies_logo_{versao}_{cor}.svg` (minúsculas, sem acento, separador `_`). Texto convertido em curvas, sem dependência de fonte.

| `versao` | O que é | positivo | negativo | mono-noite | mono-branco |
|---|---|---|---|---|---|
| `horizontal` | Símbolo + "Fireflies" + descritor CONSULTORIA (principal) | ✔ | ✔ | ✔ | ✔ |
| `vertical` | Símbolo acima e lettering abaixo | ✔ | ✔ | ✔ | ✔ |
| `simbolo` | Constelação + órbita + 1 nó aceso | ✔ | ✔ | ✔ | ✔ |
| `wordmark` | "Fireflies" + descritor, sem símbolo | ✔ | ✔ | ✔ | ✔ |
| `assinatura` | Assinatura curta "Fireflies." com ponto aceso (digital e redes) | ✔ | ✔ | ✔ | ✔ |
| `favicon` | Símbolo simplificado para 16–48 px, em quadrado arredondado | ✔ | ✔ | ✔ | ✔ |
| `academy-horizontal` | Lockup com descritor ACADEMY | ✔ | ✔ | ✔ | ✔ |
| `condominios-horizontal` | Lockup com descritor CONDOMÍNIOS | ✔ | ✔ | ✔ | ✔ |

**Definição das cores:**
- **`positivo`** (sobre Papel ou Branco): lettering em Noite e linhas e órbita em Noite. O nó aceso segue a decisão do logo (**Oliva**, ou Vagalume com contorno Noite). Nunca Vagalume puro sobre claro.
- **`negativo`** (sobre Noite ou Noite Funda): lettering em Papel, linhas em Maré ou Papel e nó em **Vagalume**.
- **`mono-noite`**: tudo em #06262B. O nó aceso se distingue **pela forma** (anel), não pela cor. Serve para P&B, carimbo, gravação e handout de assembleia.
- **`mono-branco`**: tudo em Branco, sobre fotos e fundos escuros não oficiais.

### 2.2 Derivados (mesmo nome-base)

| Formato | Regra de nome | Uso |
|---|---|---|
| SVG (mestre) | `fireflies_logo_horizontal_positivo.svg` | Site e mestre digital |
| PNG transparente | `+ _{largura}px` → `fireflies_logo_horizontal_negativo_1000px.png` (500, 1000 e 2000 px) | Office, Docs, redes, e-mail |
| PDF de impressão | `+ _cmyk` → `fireflies_logo_condominios-horizontal_positivo_cmyk.pdf` (FOGRA39; variante `_pantone` com 380 C e 5463 C) | Gráfica |
| Ícones web | Nomes padrão da web: `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png` | Raiz do site |

### 2.3 Estrutura do kit (`fireflies-brand-kit_v1.0_2026-10.zip`)
```
00_LEIA-ME.pdf        (versões, área de proteção, usos incorretos)
01_logo/{svg,png,pdf}/
02_cores/             (tokens.css, tokens.json, fireflies.ase, fireflies.gpl, README)
03_tipografia/        (links Google Fonts + escala)
04_templates/         (slides, slides-aula, proposta, relatorio-auditoria, painel-mensal, certificado, assembleia, timbrado, assinatura-email, redes)
05_icones-web/
```

---

## 3. Regras de uso do logo

### 3.1 Área de proteção
- **X = diâmetro do nó aceso** do símbolo. Se o desenho final indicar outra medida, usar a altura-x do "F" de Fireflies.
- Margem livre: **2X** em volta dos lockups e **1X** em volta do símbolo em avatares.
- **Co-branding** (por exemplo, com uma administradora): fio vertical Linha ou Maré, com 3X de distância e alturas óticas iguais.

### 3.2 Tamanho mínimo

| Versão | Digital | Impresso |
|---|---|---|
| `horizontal` e sub-marcas | 120 px de largura | 30 mm |
| `vertical` | 80 px | 20 mm |
| `wordmark` / `assinatura` | 80 px | 20 mm |
| `simbolo` | 24 px | 7 mm |
| `favicon` | 16 px | Não se aplica |

Abaixo do mínimo, o descritor (CONSULTORIA, CONDOMÍNIOS, ACADEMY) fica ilegível. Nesse caso, use `simbolo` ou `assinatura`. No impresso, as linhas da constelação precisam ter pelo menos 0,25 pt.

### 3.3 Usos incorretos
1. Distorcer, esticar ou comprimir.
2. Usar Vagalume sobre fundo claro (some, com contraste de 1,25:1) ou colocar Brasa em qualquer parte do logo.
3. Acender mais de um nó ou mudar a posição do nó aceso.
4. Aplicar gradiente, brilho, glow, sombra, blur ou partículas. A luz é chapada.
5. Girar ou inclinar o símbolo, ou separar a órbita da constelação.
6. Recriar o wordmark com outra fonte, em CAIXA ALTA ou com o "E" quebrado do logo antigo.
7. Usar o `positivo` sobre Noite ou o `negativo` sobre Papel.
8. Aplicar sobre fotos ou fundos poluídos sem overlay. Usar roxo ou outras cores fora da paleta.
9. Criar sub-marcas novas ("Fireflies Fiscal", "Fireflies Audit") ou usar "Fireflies" sozinho em handles.
10. Usar print de tela, PNG pixelado ou JPG com fundo branco sobre cor.

### 3.4 Sobre fotos
- Escolher áreas lisas, como parede ou céu. Em foto escura, usar `negativo`. Em foto clara, usar `positivo` ou `mono-noite`.
- Quando o fundo competir com o logo, aplicar **overlay Noite de 60–80%** no terço onde fica o logo.
- Contraste do lettering de no mínimo 4,5:1.
- Em fotos com muito verde-limão, usar `mono-branco`.
- Usar fotos reais (Gabriel, reuniões, condomínios atendidos com autorização), em tons frios e com pouca saturação. Evitar calculadoras e fotos de banco de imagem.

---

## 4. Checklist de rollout (em ordem)

**Fase 0: preparação (D-15 a D-1)**
- [ ] Aprovar o logo final (incluindo a solução do nó no positivo), a paleta e as fontes. Confirmar o **número do CRC** e o **CNPJ**.
- [ ] Exportar o kit (seção 2) para uma pasta compartilhada única, somente leitura.
- [ ] Produzir os templates P0: proposta, capa e miolo do relatório de auditoria, painel mensal, slides institucionais, apresentação em assembleia, timbrado digital, assinatura de e-mail, avatares, capas e OG images.
- [ ] Inventariar onde o logo antigo (navy, verde e laranja) aparece: site, redes, WhatsApp, assinaturas, propostas e relatórios em uso, contratos, Google Business Profile, diretórios, administradoras parceiras e o sistema de notas fiscais.
- [ ] Garantir handles **@firefliesconsultoria** (Instagram, LinkedIn, YouTube).
- [ ] Fazer a prova de cor do cartão e da capa do relatório.

**Fase 1: D0, nesta ordem**
1. [ ] **Site:** logo, favicon, apple-touch, manifest e OG images. Limpar o cache/CDN e testar os previews (WhatsApp, LinkedIn Post Inspector).
2. [ ] **WhatsApp Business:** foto, perfil, saudação, ausência e respostas rápidas.
3. [ ] **Instagram:** foto, bio, destaques e post + stories de lançamento ("Números em sincronia.").
4. [ ] **LinkedIn:** página (logo, capa, tagline, Sobre) e perfil do Gabriel (capa, headline). Publicar o post de lançamento.
5. [ ] **Assinaturas de e-mail** de toda a equipe.
6. [ ] **Google Business Profile:** logo, capa, descrição e horário. A aprovação pode levar dias.
7. [ ] **Comunicado** para clientes ativos e administradoras parceiras, por e-mail e WhatsApp.

**Fase 2: até 30 dias**
- [ ] Trocar **todos** os modelos em uso: proposta, relatório de auditoria, painel mensal, contratos e pareceres. Arquivar os antigos.
- [ ] Academy: certificado (com sistema de verificação) e slides de aula.
- [ ] Apresentação em assembleia e handout P&B testados num projetor real.
- [ ] Cartões de visita impressos. Perfis secundários atualizados: Google/Teams, agenda, CRM, emissor de NF e e-mail marketing.
- [ ] Pedir a administradoras e clientes que exibem o logo que troquem o arquivo.

**Fase 3: até 90 dias**
- [ ] Papelaria restante, pasta, roll-up e brindes.
- [ ] Piloto do **selo datado** "Prestação de contas auditada", depois de validar o texto com o jurídico.
- [ ] Auditoria de marca: buscar o logo antigo (busca reversa, pastas e parceiros) e publicar o guia v1.1.

---

## 5. Templates de copy

> Voz precisa, clara e próxima. Usar "a gente" nas redes e no WhatsApp e "nós" em proposta e relatório. Confirmar antes de publicar: **[CRC-SP nº a confirmar]** e **[CNPJ a confirmar]**.

**Bio do Instagram** (≤ 150 caracteres)
```
Auditoria de condomínios e consultoria contábil, fiscal e financeira em SP.
Precisão que ilumina decisões.
Diagnóstico gratuito ↓ WhatsApp
```
Link na bio: `wa.me/5511982450527` ou página de links com WhatsApp, site e Academy.

**Tagline da página no LinkedIn** (≤ 120 caracteres)
```
Consultoria financeira, contábil e fiscal em São Paulo · Auditoria de condomínios · Precisão que ilumina decisões.
```

**"Sobre" da página no LinkedIn** (curto)
```
A Fireflies Consultoria coloca os números da sua empresa ou do seu condomínio em sincronia. Contábil, fiscal, financeiro e auditoria trabalham juntos, conduzidos por um contador responsável — Gabriel Alvares, CRC-SP [nº a confirmar] — com um backoffice de especialistas.
Em vez de relatórios soltos, você recebe um painel mensal explicado em reunião. Primeira entrega em 30 dias.
Serviços: Auditoria em Condomínios · Consultoria Contábil · Fiscal · Financeira · Gestão de Projetos & Processos · Sindicância · Fireflies Academy.
Diagnóstico gratuito: WhatsApp +55 11 98245-0527 · contato@fireflies.com.br
```

**Headline do Gabriel no LinkedIn**
```
Contador responsável e fundador da Fireflies Consultoria · Auditoria de condomínios e consultoria contábil, fiscal e financeira em SP · CRC-SP [nº a confirmar]
```

**Saudação no WhatsApp Business**
```
Olá! Aqui é a Fireflies Consultoria. Conte em uma frase o que você precisa — auditoria de condomínio, contábil, fiscal, financeiro ou Academy — e a gente responde ainda hoje (seg–sex, 8h–18h).
```

**Assinatura de e-mail**
```
Gabriel Alvares
Contador responsável · CRC-SP [nº a confirmar]
Fireflies Consultoria — Consultoria financeira, contábil e fiscal · São Paulo
WhatsApp +55 11 98245-0527 · contato@fireflies.com.br
fireflies.com.br
Precisão que ilumina decisões.
[logo horizontal positivo · 180×40 px]
```
Regras:
- Nome em negrito Tinta, cargo em Pedra e tagline em Oliva.
- Telefone com link `https://wa.me/5511982450527` e e-mail com `mailto:`.
- Sem banners fixos.
- Para outros membros da equipe, trocar nome, cargo e e-mail (o CRC só aparece para quem tem registro).

**Rodapé da proposta comercial**
```
Fireflies Consultoria · CNPJ [a confirmar] · São Paulo/SP · fireflies.com.br · contato@fireflies.com.br · WhatsApp +55 11 98245-0527
Responsável técnico: Gabriel Alvares, CRC-SP [nº a confirmar] · Proposta [PRO-2026-000] · Válida até [dd/mm/aaaa] · Confidencial — uso exclusivo de [Cliente] · Página X de Y
```

**Rodapé do relatório de auditoria / certificado Academy**
```
Fireflies Condomínios · Relatório de auditoria · [Condomínio] · Período [mm/aaaa–mm/aaaa] · Responsável técnico: Gabriel Alvares, CRC-SP [nº a confirmar] · Página X de Y
Fireflies Academy · Certificado nº [ACD-2026-0000] · Verifique em fireflies.com.br/academy/verificar
```

---

### Fontes das especificações de redes (consultadas em 10/2026)
- Capa do LinkedIn: 1128×191 (mínimo) e 4200×700 (recomendado), proporção 6:1. https://www.zeliq.com/blog/linkedin-banner-size · https://linearity.io/blog/linkedin-size-guide/
- Instagram: 4:5 em 1080×1350 e formato 3:4 a partir de 2025. https://postfa.st/sizes/instagram/feed · https://ruche-pollen.com/instagram-format-34/
