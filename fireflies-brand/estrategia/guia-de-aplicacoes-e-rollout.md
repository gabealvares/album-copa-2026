# 03 — Marketing & Aplicações da Marca · Fireflies Consultoria

> **Premissa (declarada):** o site fireflies.com.br está bloqueado nesta rede e a busca na web só trouxe resultados da Fireflies.ai (app de notas de reunião, sem relação com a consultoria). Por isso assumimos que a **Fireflies Consultoria é uma consultoria B2B brasileira de gestão, estratégia e dados para PMEs e médias empresas**, com atuação principal em **LinkedIn, site, e-mail, Instagram, WhatsApp Business e eventos/palestras**. Se a premissa não se confirmar, ajuste as prioridades da seção 1 (as especificações técnicas continuam valendo).
>
> **Atenção ao nome:** "Fireflies" é também uma marca global de software (fireflies.ai). Use sempre **"Fireflies Consultoria"** em handles, títulos de página e anúncios, para evitar confusão e disputa de SEO.

Legenda de prioridade: **P0** = lançamento (dia 1) · **P1** = até 30 dias · **P2** = até 90 dias / sob demanda.

---

## 1. Inventário de materiais com especificações

### 1.1 Digital / site (cor: **sRGB**, 72 ppi nominal; exportar em 2x para telas retina)

| Prio | Peça | Dimensão | Formato | Observações |
|---|---|---|---|---|
| P0 | Favicon | 16×16, 32×32, 48×48 px | `favicon.ico` (multi-tamanho) + `favicon.svg` | Só o **símbolo**, simplificado (menos nós/linhas). Testar legibilidade em 16 px. |
| P0 | Apple touch icon | 180×180 px | PNG, sem transparência | Fundo sólido (marinho ou branco), símbolo com ~15% de margem. |
| P0 | Android / PWA | 192×192 e 512×512 px (+ 512 maskable) | PNG + `site.webmanifest` | Maskable: símbolo dentro do círculo central de 80%. |
| P0 | OG image (link preview) | 1200×630 px (1.91:1) | JPG/PNG < 1 MB | Logo + frase-chave; texto fora dos 60 px das bordas. Uma genérica + uma por página-chave. |
| P0 | Logo no header do site | SVG (altura ~40–48 px desktop / 32 px mobile) | SVG inline | Versão horizontal; negativa se header escuro. |
| P1 | Hero / banners do site | 1920×1080 px (desktop), 750×1000 px (mobile) | WebP/AVIF + JPG fallback, < 300 KB | |
| P1 | Imagens de blog/artigo | 1200×675 px (16:9) | WebP/JPG | Reaproveita como imagem de post LinkedIn. |
| P1 | Google Business Profile — logo | 720×720 px (mín. 250×250) | JPG/PNG < 5 MB | Símbolo ou logo vertical sobre fundo sólido. |
| P1 | Google Business Profile — capa | 1024×576 px (16:9) | JPG/PNG | Foto real da equipe/escritório performa melhor que arte. |
| P2 | Ícone de WhatsApp Business | 640×640 px (exibido em círculo) | JPG/PNG | Símbolo centralizado, margem de segurança circular. |

### 1.2 LinkedIn (canal nº 1 para B2B) — sRGB

| Prio | Peça | Dimensão | Formato | Observações |
|---|---|---|---|---|
| P0 | Logo da Página da empresa | 400×400 px (exibido pequeno/quadrado) | PNG | **Símbolo** ou logo vertical — wordmark horizontal fica ilegível. |
| P0 | Capa da Página da empresa | **1128×191 px** (mínimo); recomendado **4200×700 px** (mesma proporção 6:1) | PNG/JPG < 3 MB | Desktop corta lateral; mobile corta topo/base. Manter texto no centro e longe do canto inferior esquerdo (logo sobrepõe). |
| P0 | Capa de perfil pessoal (sócios/consultores) | 1584×396 px (4:1) | JPG/PNG < 8 MB | Template padrão para toda a equipe; foto do perfil cobre o canto inferior esquerdo. |
| P1 | Post imagem única | 1200×1200 px (1:1) ou 1080×1350 px (4:5) | JPG/PNG | 4:5 ocupa mais tela no feed mobile. |
| P1 | Post link | 1200×627 px | JPG/PNG | Usa a OG image do site. |
| P1 | Carrossel (documento) | 1080×1350 px por página (4:5) ou 1080×1080 | **PDF** < 100 MB, até 300 páginas (ideal 6–12) | Formato com maior alcance orgânico em B2B. |
| P2 | Capa de evento LinkedIn | 1776×444 px (4:1) | JPG/PNG | |
| P2 | Capa de newsletter LinkedIn | 1920×1080 px | JPG/PNG | |

### 1.3 Instagram (sRGB)

| Prio | Peça | Dimensão | Formato | Observações |
|---|---|---|---|---|
| P0 | Foto de perfil | 320×320 px (enviar 1080×1080) | PNG/JPG | Exibido em **círculo**: usar só o símbolo. |
| P1 | Post retrato (padrão) | **1080×1350 px (4:5)** | JPG | Formato recomendado para feed. |
| P1 | Post vertical 3:4 | 1080×1440 px | JPG | Grade do perfil passou a recortar em 3:4 (2025); manter conteúdo central em 1080×1350 seguro. |
| P1 | Post quadrado | 1080×1080 px (1:1) | JPG | Ainda aceito; no grid aparece recortado nas laterais. |
| P1 | Stories / Reels | **1080×1920 px (9:16)** | JPG / MP4 H.264 | Zona segura: livre 250 px no topo e 340 px na base. |
| P2 | Capa de Reels | 1080×1920 px (centro 1080×1440 visível no grid) | JPG | |
| P2 | Capas de Destaques | 1080×1920 px (ícone central em círculo ~420 px) | PNG | 4–6 destaques: Serviços, Cases, Conteúdo, Equipe, Contato. |

### 1.4 Apresentações e comercial

| Prio | Peça | Especificação | Formato |
|---|---|---|---|
| P0 | Template de slides institucional | **16:9, 1920×1080 px** (33,867×19,05 cm) | `.pptx`/`.potx` + Google Slides + PDF |
| P0 | Proposta comercial | **A4 (210×297 mm)**, retrato; margens 20 mm; fonte do sistema/embutida | `.docx`/Google Docs template → exportar PDF/A (sRGB) |
| P1 | Apresentação institucional ("credenciais") | 16:9, 10–15 slides | PDF < 10 MB para envio por e-mail/WhatsApp |
| P1 | One-pager / folder de serviços | A4, digital (sRGB) **e** impresso (CMYK, 3 mm sangria) | PDF |
| P1 | Template de case de sucesso | A4 ou 16:9 | PDF |
| P2 | Template de relatório/diagnóstico entregue ao cliente | A4 | `.docx` + PDF |

**Template de slides deve conter layouts:** capa, divisor de seção, título+texto, 2 colunas, gráfico/dado em destaque (paleta de dados derivada do verde→laranja), citação, equipe, cases/logos de clientes, encerramento/contato. Fontes: usar família disponível no Google Fonts para não quebrar em máquinas de clientes.

### 1.5 E-mail (sRGB)

| Prio | Peça | Especificação |
|---|---|---|
| P0 | Assinatura de e-mail | Largura máx. **600 px** (ideal 400–500 px de conteúdo); logo PNG em 2x (ex.: 360×80 px exibido a 180×40); HTML com tabelas e estilos inline; imagem hospedada em URL HTTPS (não anexada); < 50 KB total. Sem texto dentro de imagem. |
| P1 | Template de newsletter / e-mail marketing | Largura **600 px**; header 600×150 px (exportar 1200×300); fundo claro; testar dark mode do Gmail/Outlook (usar logo com contorno ou versão sobre fundo sólido). |
| P2 | Banner de assinatura para campanhas/eventos | 600×100 px (exportar 1200×200) |

### 1.6 Papelaria / impressos (cor: **CMYK FOGRA39 – Coated**, 300 dpi, PDF/X-1a ou PDF/X-4, **sangria 3 mm**, marcas de corte, texto ≥ 3 mm da linha de corte)

| Prio | Peça | Formato final | Observações |
|---|---|---|---|
| P1 | Cartão de visita | **90×50 mm** (padrão Brasil); arquivo 96×56 mm com sangria | Couché 300 g, laminação fosca opcional; frente logo, verso dados + QR code (mín. 15×15 mm). Verde/laranja do gradiente: conferir prova de cor — gradientes neon perdem saturação em CMYK. |
| P1 | Papel timbrado | **A4 210×297 mm** | Versão digital (`.docx`/Google Docs, sRGB) é a mais usada; impressa só se necessário (offset sem sangria ou com 3 mm se a arte vazar). |
| P2 | Envelope | DL 110×220 mm ou saco 240×340 mm (+3 mm sangria) | Só se houver correspondência física. |
| P2 | Pasta institucional | A4 com bolso (faca da gráfica) | Para entregas presenciais de diagnóstico/proposta. |
| P2 | Bloco de anotações | A5 148×210 mm | Brinde em workshops. |
| P2 | Crachá | 54×86 mm (CR80) ou 100×140 mm (evento) | |

> Para cores especiais em impresso, definir **Pantone** equivalentes do marinho, verde e laranja (seção de cores do manual).

### 1.7 Eventos / palestras (CMYK FOGRA39; resolução efetiva ≥ 100–150 dpi em peças grandes)

| Prio | Peça | Dimensão | Observações |
|---|---|---|---|
| P2 | Banner roll-up | 85×200 cm (arte útil 85×200 + 10 cm extra na base para o mecanismo) | PDF CMYK, 1:1 a 150 dpi ou 1:10 a 1500 dpi. Logo no terço superior (altura dos olhos). |
| P2 | Backdrop / painel de fundo | ex.: 3×2 m | Logo repetido em padrão (step-and-repeat) para fotos. |
| P2 | Slide de abertura de palestra | 1920×1080 px | Também em 4:3 (1440×1080) para projetores antigos. |
| P2 | Fundo virtual para videochamada | **1920×1080 px** | Logo no canto superior direito (o rosto fica no centro; o Zoom/Teams espelha só a sua visão). |
| P2 | Camiseta/brindes | Vetor (PDF/SVG), cores sólidas | **Usar versão monocromática ou chapada** — gradiente não funciona em serigrafia/bordado. |

---

## 2. Arquivos de logo a exportar

### 2.1 Matriz de versões

| Versão | Positiva (cores sobre claro) | Negativa (sobre marinho/escuro) | Mono preta | Mono branca |
|---|---|---|---|---|
| **Horizontal** (símbolo à esquerda + wordmark) — *principal* | ✔ | ✔ | ✔ | ✔ |
| **Vertical** (símbolo acima + wordmark) | ✔ | ✔ | ✔ | ✔ |
| **Símbolo** (constelação/vagalumes) | ✔ | ✔ | ✔ | ✔ |
| **Wordmark** ("FIREFLIES / CONSULTORIA") | ✔ | ✔ | ✔ | ✔ |
| **Símbolo simplificado** (favicon/≤ 32 px: menos nós, linhas mais grossas) | ✔ | ✔ | ✔ | ✔ |

- **Negativa:** "FIREFLIES" em branco, "CONSULTORIA" em verde claro, símbolo mantém gradiente (validar contraste do verde sobre marinho).
- **Mono:** gradiente vira cor chapada; linhas finas podem precisar de espessura mínima maior.
- **Versão sem gradiente (flat, cores sólidas)** em todas as variações para bordado, serigrafia, carimbo, gravação a laser e e-mail.

### 2.2 Formatos por versão

| Formato | Uso | Cor |
|---|---|---|
| **SVG** | Site, apps, mestre digital | sRGB |
| **PNG** transparente @1x, @2x, @4x (ex.: 500, 1000, 2000 px de largura) | Office, Google Docs, redes, e-mail | sRGB |
| **PDF** vetorial (texto convertido em curvas) | Gráfica, fornecedores | CMYK FOGRA39 + versão Pantone |
| **EPS / AI** (opcional) | Fornecedores legados (brindes, sinalização) | CMYK |
| **JPG** fundo branco | Plataformas que não aceitam transparência | sRGB |

### 2.3 Nomenclatura padronizada

Padrão: `fireflies_logo_{versao}_{cor}_{modo}[_{largura}].{ext}` — tudo minúsculo, sem acento, sem espaço, separador `_`.

- `versao`: `horizontal` · `vertical` · `simbolo` · `simbolo-mini` · `wordmark`
- `cor`: `positivo` · `negativo` · `preto` · `branco` · `flat`
- `modo`: `rgb` · `cmyk` · `pantone`
- `largura` (só PNG/JPG): em px, ex.: `1000px`

Exemplos:
```
fireflies_logo_horizontal_positivo_rgb.svg
fireflies_logo_horizontal_positivo_rgb_1000px.png
fireflies_logo_horizontal_negativo_rgb_2000px.png
fireflies_logo_vertical_branco_rgb.svg
fireflies_logo_simbolo_positivo_cmyk.pdf
fireflies_logo_simbolo-mini_positivo_rgb_32px.png
fireflies_logo_wordmark_preto_pantone.pdf
```

Estrutura do pacote (`fireflies-brand-kit_v1.0_2026-10.zip`):
```
01_logo/{svg,png,pdf,eps}/
02_cores/  (paleta .ase, .txt com HEX/RGB/CMYK/Pantone)
03_tipografia/  (links/licenças)
04_templates/  (slides, proposta, timbrado, assinatura, redes)
05_icones-web/  (favicon.ico, favicon.svg, apple-touch-icon.png, android-*.png, site.webmanifest)
00_LEIA-ME.pdf  (mini manual: versões, área de proteção, usos incorretos)
```

---

## 3. Regras de uso do logo

### 3.1 Área de proteção
- Unidade **X = altura da letra "F" de FIREFLIES** (cap-height do wordmark).
- Margem livre mínima de **1X em todos os lados** (horizontal e vertical); **0,5X** para o símbolo isolado em ícones/avatares.
- Nenhum texto, borda, foto recortada ou outro logo dentro dessa área. Em co-branding: separar com fio vertical e 2X de distância, logos com alturas óticas equivalentes.

### 3.2 Tamanho mínimo

| Versão | Digital | Impresso |
|---|---|---|
| Horizontal | **120 px** de largura | **30 mm** de largura |
| Vertical | **80 px** de largura | **20 mm** de largura |
| Wordmark | 100 px | 25 mm |
| Símbolo (completo) | 32 px | 8 mm |
| Símbolo simplificado | 16 px | 5 mm |

Abaixo de 30 mm/120 px, "CONSULTORIA" fica ilegível → usar **símbolo** ou só wordmark "FIREFLIES". Linhas da constelação: espessura mínima 0,25 pt no impresso.

### 3.3 Usos incorretos (não fazer)
1. Distorcer, esticar ou comprimir (sempre escalar proporcionalmente, com Shift).
2. Trocar as cores, inverter o gradiente (laranja→verde) ou recolorir os nós.
3. Aplicar sombra, brilho, contorno, chanfro, 3D ou outros efeitos.
4. Girar ou inclinar o logo (inclusive o arco crescente).
5. Reorganizar elementos: mudar posição/escala do símbolo vs. wordmark, separar "FIREFLIES" de "CONSULTORIA" ou recriar com outra fonte.
6. Usar a versão positiva sobre fundo escuro (marinho some) ou a negativa sobre fundo claro.
7. Aplicar sobre fundos com baixo contraste ou poluídos (foto sem tratamento, padrões, cores próximas do verde/laranja).
8. Colocar o logo dentro de formas (círculo, caixa) não previstas — exceto avatares, que usam o símbolo.
9. Usar abaixo do tamanho mínimo ou invadir a área de proteção.
10. Usar PNG pixelado/print de tela ou JPG com fundo branco sobre fundo colorido.

### 3.4 Logo sobre fotos
- Preferir áreas de **céu/parede/espaço negativo** com pouca textura.
- **Foto escura** → versão negativa; **foto clara** → positiva. Na dúvida, mono branca.
- Se o fundo competir: aplicar **overlay marinho a 60–80%** ou degradê marinho→transparente no terço onde fica o logo.
- Nunca colocar o símbolo colorido sobre fotos com verdes/laranjas vivos (gradiente desaparece) → usar mono branca.
- Contraste mínimo do wordmark com o fundo: **4,5:1** (WCAG AA).
- Posição padrão em fotos/posts: canto inferior ou superior esquerdo, respeitando 1X de margem + zona segura da rede.

---

## 4. Checklist de rollout (em ordem)

**Fase 0 — Preparação (D-15 a D-1)**
- [ ] Aprovar versões finais do logo + paleta (HEX/RGB/CMYK/Pantone) + tipografia.
- [ ] Exportar o kit completo (seção 2) e publicar em pasta compartilhada única (Drive/SharePoint), com permissão só-leitura.
- [ ] Produzir templates P0: slides, proposta, timbrado digital, assinatura de e-mail, OG image, avatares, capas.
- [ ] Inventariar onde o logo antigo aparece (site, redes, assinaturas, documentos, perfis em diretórios, parceiros, CNPJ/notas fiscais, contratos padrão).
- [ ] Reservar/conferir handles consistentes (ex.: `@firefliesconsultoria`) em LinkedIn, Instagram, YouTube.
- [ ] Preparar comunicado de lançamento (post + e-mail para base de clientes).

**Fase 1 — Dia do lançamento (D0), nesta ordem**
1. [ ] **Site:** logo do header/footer, favicon + apple-touch + manifest, OG images, página "Sobre". Limpar cache/CDN e testar previews (LinkedIn Post Inspector, debugger do Facebook/WhatsApp).
2. [ ] **LinkedIn:** logo da página, capa, descrição; capas dos perfis pessoais da equipe; post de lançamento.
3. [ ] **Instagram:** foto de perfil, bio, capas de destaques; post + stories de lançamento.
4. [ ] **Assinaturas de e-mail** de toda a equipe (enviar HTML pronto + passo a passo Gmail/Outlook).
5. [ ] **Google Business Profile:** logo, capa, fotos, descrição (pode levar alguns dias para aprovação).
6. [ ] **WhatsApp Business:** foto, descrição, catálogo/mensagem de saudação.
7. [ ] E-mail/comunicado para clientes e parceiros.

**Fase 2 — Até 30 dias**
- [ ] Substituir templates internos: propostas, contratos, relatórios, apresentações em uso (arquivar os antigos para evitar reuso).
- [ ] Atualizar perfis secundários: YouTube, Google Meet/Teams (foto da conta), Calendly, CRM, ferramentas de faturamento/notas fiscais, plataformas de e-mail marketing.
- [ ] Atualizar diretórios e parceiros (associações, Sebrae/marketplaces de consultores, portais de clientes, sites de parceiros que exibem o logo).
- [ ] Pedir a clientes atuais que usam o logo em "parceiros/fornecedores" que troquem o arquivo.
- [ ] Imprimir cartões de visita (após prova de cor).

**Fase 3 — Até 90 dias**
- [ ] Papelaria restante, materiais de evento, brindes.
- [ ] Auditoria: buscar logo antigo (Google Imagens, busca reversa, pastas compartilhadas) e corrigir.
- [ ] Revisar manual com dúvidas que surgiram e publicar v1.1.

---

## 5. Templates de copy

> Ajustar `[colchetes]`. Tom: claro, direto, consultivo, sem jargão.

**Bio Instagram (≤ 150 caracteres)**
```
Fireflies Consultoria 🔆
Estratégia, gestão e dados para PMEs que querem crescer com clareza.
📍 [Cidade] · Atendimento em todo o Brasil
👇 Agende um diagnóstico
```
*(Variante sem emoji: "Consultoria de estratégia, gestão e dados para PMEs. Conectamos pontos para iluminar decisões. Diagnóstico gratuito ↓")*

**Tagline da Página LinkedIn (≤ 120 caracteres)**
```
Consultoria de estratégia, gestão e dados para PMEs e médias empresas | Conectamos os pontos que iluminam suas decisões
```

**"Sobre" LinkedIn (versão curta)**
```
A Fireflies Consultoria ajuda pequenas e médias empresas a tomar decisões melhores com estratégia, gestão e dados. Como vagalumes que, juntos, iluminam o caminho, conectamos informações, pessoas e processos para gerar resultados mensuráveis.
Serviços: planejamento estratégico · gestão por indicadores · BI e análise de dados · processos e eficiência.
Fale com a gente: [site] · [e-mail]
```

**Headline de consultor no LinkedIn**
```
[Cargo] na Fireflies Consultoria | Estratégia e dados para PMEs
```

**Assinatura de e-mail**
```
[Nome Sobrenome]
[Cargo] | Fireflies Consultoria
[+55 (11) 9XXXX-XXXX] · [nome@fireflies.com.br]
fireflies.com.br · LinkedIn
[logo horizontal positivo, 180×40 px exibido]
```
Regras: sem citações, sem banners fixos, sem imagem de fundo; telefone com link `tel:`; aviso legal (se houver) em 1 linha cinza, 10 px.

**Rodapé de proposta comercial**
```
Fireflies Consultoria · [Razão Social] · CNPJ [00.000.000/0001-00]
[Endereço] · [Cidade/UF] · fireflies.com.br · [e-mail] · [telefone]
Proposta [nº PRO-AAAA-000] · Válida até [dd/mm/aaaa] · Documento confidencial — uso exclusivo de [Cliente].   Página X de Y
```

---

### Fontes consultadas
- LinkedIn banner 2026 (1128×191 mínimo, 4200×700 recomendado, 6:1): https://www.zeliq.com/blog/linkedin-banner-size · https://linearity.io/blog/linkedin-size-guide/
- Instagram 2026 (4:5 1080×1350; formato 3:4 desde 2025): https://postfa.st/sizes/instagram/feed · https://ruche-pollen.com/instagram-format-34/
- Busca "Fireflies Consultoria": sem resultado sobre a empresa (apenas fireflies.ai) → premissa declarada no topo.
