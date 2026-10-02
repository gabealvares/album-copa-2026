# Fireflies Consultoria: aplicações da marca

Peças de redes, web, papelaria e apresentação da Fireflies Consultoria. Cada peça é um HTML editável, com o texto como texto e os gráficos em SVG. Os PNGs e PDFs saem do mesmo HTML via Playwright.

Para uma visão geral, veja `mockups.png`, a prancha-resumo para o manual.

## Peças

| Pasta | Arquivo-fonte (editar) | Saída | Medida |
|---|---|---|---|
| redes | `post-manifesto.html` | `post-manifesto.png` | 1080×1350 (Instagram 4:5) |
| redes | `post-dado.html` | `post-dado.png` | 1080×1350, matriz de pontos, **dados de exemplo** |
| redes | `post-dica-sindico.html` | `post-dica-sindico.png` | 1080×1350, tema claro (Papel + Oliva) |
| redes | `carrossel-01-capa.html` | `carrossel-01-capa.png` | 1080×1350 (1/7) |
| redes | `carrossel-02-interna.html` | `carrossel-02-interna.png` | 1080×1350 (2/7), **dados de exemplo** |
| redes | `story.html` | `story.png` | 1080×1920; 250 px livres no topo e 340 px na base |
| redes | `linkedin-capa.html` | `linkedin-capa.png` | 4200×700; canto inferior esquerdo livre para o logo da página |
| redes | `linkedin-post.html` | `linkedin-post.png` | 1200×1200, **dados de exemplo** |
| redes | (cópia de `../logo/avatar-redes-1080.png`) | `avatar-1080.png` | 1080×1080, exibido em círculo |
| web | `og-image.html` | `og-image.png` | 1200×630, margem de 60 px |
| web | `assinatura-email.html` | `assinatura-email-preview.png` (prévia 2×) | 600 px, tabelas e estilos inline |
| web | `_logo-assinatura.html` | `img/fireflies-logo-assinatura@2x.png` | 360×94 (exibido a 180×47) |
| papelaria | `cartao-visita.html` | `cartao-visita_96x56mm_sangria3mm.pdf` (2 páginas: frente e verso) + `cartao-visita-frente.png` e `-verso.png` | 90×50 mm + 3 mm de sangria |
| papelaria | `papel-timbrado.html` | `papel-timbrado_A4.pdf` + `.png` | A4 210×297 mm, sem sangria (uso digital e impressão em escritório) |
| papelaria | `capa-relatorio-auditoria.html` | `capa-relatorio-auditoria_A4_sangria3mm.pdf` + `.png` | A4 + 3 mm (216×303 mm) |
| papelaria | `certificado-academy.html` | `certificado-academy_A4-paisagem_sangria3mm.pdf` + `.png` | A4 paisagem + 3 mm (303×216 mm) |
| apresentacao | `slides-mestre.html` (4 slides em 1 arquivo) | `slide-01-capa.png`, `slide-02-divisor.png`, `slide-03-conteudo-dado.png`, `slide-04-encerramento.png`, `slides-mestre.pdf` | 1920×1080 |
| (raiz) | `mockups.html` | `mockups.png` | 3200 px de largura |

Nos impressos, os PNGs são provas recortadas na linha de corte, a cerca de 300 dpi. O arquivo de produção é o PDF, que já inclui a sangria.

## Como editar

1. Abra o `.html` da peça e troque o texto direto no HTML. As medidas ficam no `<style>` da própria peça.
2. Os elementos gráficos são desenhados por `_build/elementos.js` a partir de atributos `data-*`:
   - **Constelação:** `<svg data-ff="constelacao" data-seed="11" data-chains="5" data-lit="0.8,0.76" ...>`. Troque `data-seed` para gerar outro desenho. `data-region` e `data-avoid` delimitam onde os nós aparecem. `data-lit` acende **um** nó.
   - **Matriz de pontos:** `<svg data-ff="matriz" data-values="4,5,9" data-on="all" data-alert="2" data-labels="JAN,FEV,MAR">`. `data-alert` pinta a barra em Brasa e só deve ser usado para alerta. `data-track="1"` mostra os pontos apagados.
   - **Órbita:** `<svg data-ff="orbita" data-a0="200" data-a1="292" data-sw="56">`. Os ângulos são em graus (0 = direita, sentido horário).
   - **Grade** (ex.: 30 dias com 1 aceso) e **glifo** (número em pontos, como o "5" do carrossel).
3. As cores vêm de `../cores/tokens.css`, pelas classes de tema `.noite` e `.papel` em `_build/base.css`. Não escreva HEX solto nas peças.
4. Os logos são sempre os arquivos finais de `../logo/svg/` (com o texto em curvas). Não redesenhe nem recolora. As larguras usadas respeitam os mínimos: horizontal ≥ 180 px / 40 mm e assinatura ≥ 72 px / 18 mm.
5. Exporte:
   ```bash
   cd aplicacoes/_build
   npm install            # só na primeira vez (instala o qrcode)
   node gerar-qr.js       # se mudar algum destino de QR
   node render.js         # exporta tudo
   node render.js story   # exporta só as peças cujo caminho contém "story"
   ```
   O `render.js` usa o Playwright em `/opt/node22/lib/node_modules/playwright`. Se ele estiver em outro lugar, ajuste o `require` na primeira linha.

## Assinatura de e-mail

`web/assinatura-email.html` aponta para o logo por caminho **relativo**: `img/fireflies-logo-assinatura@2x.png`. Assim ela funciona para prévia local, mas **um cliente de e-mail não carrega caminho relativo**. Antes de instalar:

1. Publique `web/img/fireflies-logo-assinatura@2x.png` em uma URL HTTPS pública e estável (ex.: `https://fireflies.com.br/assinatura/fireflies-logo-assinatura@2x.png`).
2. No HTML, troque o `src` do `<img>` por essa URL absoluta. Mantenha `width="180" height="47"`.
3. Copie o trecho entre `INÍCIO DA ASSINATURA` e `FIM` e cole no Gmail ou no Outlook. Abrir o HTML no navegador, selecionar e colar também funciona.

O PNG tem 2× (360×94) para telas retina. O spec previa exibição a 180×40, mas o lockup horizontal tem proporção 3,8:1, e a 180 px de largura (o mínimo digital) ele fica com 47 px de altura. O texto usa Arial/Helvetica, o fallback seguro de e-mail. O logo positivo funciona no claro e no modo escuro do Gmail.

## Decisões e pendências

- **CRC:** aparece como "CRC-SP [a confirmar]" em todas as peças. Troque pelo número real antes de imprimir.
- **Números:** todos os números de inadimplência, receita, margem e diferença bancária são fictícios e trazem o selo "Dados de exemplo". Não remova o selo se os números não forem reais e aprovados.
- **Certificado:** o código `FA-2026-0001` e a URL de verificação (`fireflies.com.br/academy/verificar?c=...`, em `_build/gerar-qr.js`) são exemplos. Confirme a rota no site antes de emitir.
- **Instagram:** o handle `@firefliesconsultoria` segue a plataforma de marca. Confirme se o handle está registrado.
- **Impressão:** os PDFs são gerados em RGB pelo Chromium, e as fontes são incorporadas como Type 3. Na gráfica, converta para CMYK FOGRA39 (PDF/X-4) e faça **prova de cor**, porque o Vagalume perde brilho no CMYK. Para o cartão, avalie Pantone 380 C. Se a gráfica recusar Type 3, converta o texto em curvas no Illustrator ou no Acrobat. Marcas de corte não estão incluídas: o PDF tem o tamanho com sangria (área de corte a 3 mm de cada borda).
- **Um ponto aceso:** cada constelação tem no máximo 1 nó aceso. Brasa aparece só em dado de alerta (post de dado, slide 3 e o alerta do painel no LinkedIn).

## Estrutura

```
aplicacoes/
  _build/        base.css, elementos.js, render.js, gerar-qr.js, fonts/ (OFL), qr/
  redes/  web/  papelaria/  apresentacao/
  mockups.html   mockups.png
```
