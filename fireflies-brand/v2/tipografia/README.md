# Tipografia: Fireflies v2

Três famílias gratuitas (SIL Open Font License), todas no Google Fonts. Funcionam também no Google Slides e no Google Docs.

| Papel | Família | Pesos | Uso |
|---|---|---|---|
| **Nome e títulos** | **Sora** | 600 · 700 (wordmark: 620, em curvas) | Wordmark, títulos de capa e de seção, números de destaque. **Sempre em caixa alta** nos títulos curtos, com tracking de +0,04 a +0,08 em |
| **Texto** | **IBM Plex Sans** | 300 · 400 · 500 · 600 | Corpo de propostas, relatórios e slides, interface, descritores (CONSULTORIA em 300, com tracking amplo) |
| **Dados** | **IBM Plex Mono** | 400 · 500 | Tabelas, valores em R$, rótulos técnicos, eyebrows, coordenadas. Números tabulares |

**Fallback no Office** (quando as fontes não estiverem instaladas):
- Títulos → **Century Gothic Bold**
- Texto → **Arial**
- Dados → **Consolas**

Instale as fontes a partir de fonts.google.com: Sora, IBM Plex Sans e IBM Plex Mono.

## Escala

| Estilo | Fonte | Digital (px) | Impresso (pt) | Entrelinha | Tracking |
|---|---|---|---|---|---|
| Display | Sora 700, CAIXA ALTA | 64–96 | 36–48 | 1,0 | +0,02 em |
| Título 1 | Sora 600, CAIXA ALTA | 40 | 24 | 1,1 | +0,04 em |
| Título 2 | Sora 600 | 28 | 16 | 1,2 | +0,01 em |
| Título 3 | IBM Plex Sans 600 | 20 | 12 | 1,3 | 0 |
| Corpo | IBM Plex Sans 400 | 16 | 10–10,5 | 1,55 | 0 |
| Legenda | IBM Plex Sans 400 | 13 | 8 | 1,4 | 0 |
| Eyebrow | IBM Plex Mono 500, CAIXA ALTA | 12 | 7,5 | 1,3 | +0,14 em |
| Dado | IBM Plex Mono 400–500 | 14–48 | 9–24 | 1,2 | 0, tabular |

## Regras
- Títulos curtos em caixa alta Sora. Títulos longos (mais de 6 palavras) em Sora 600 com caixa alta e baixa.
- O **E de Luz** pertence só ao wordmark. Não reproduza esse efeito em títulos.
- Uma palavra de destaque por título, em Vermelhão de Rubrica (no claro) ou Âmbar (no escuro).
- Valores monetários em Plex Mono, alinhados à direita: `R$ 48.210,00`.
- Máximo de 3 pesos por peça. Não usar itálico sintético nem contorno em texto.

## CSS
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```
- Arquivos TTF (licença SIL OFL 1.1, livre para uso e redistribuição) em `fontes/`.
