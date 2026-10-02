# Tipografia: Fireflies Consultoria

Três famílias, todas gratuitas no Google Fonts (licença SIL Open Font License) e já usadas no site.

| Papel | Família | Pesos | Download |
|---|---|---|---|
| **Display**: títulos, números de destaque, base do wordmark | **Bricolage Grotesque** | 600 · 700 · 800 | https://fonts.google.com/specimen/Bricolage+Grotesque |
| **Texto**: corpo, interface, propostas | **Instrument Sans** | 400 · 500 · 600 | https://fonts.google.com/specimen/Instrument+Sans |
| **Dados**: números em tabela, rótulos, eyebrows, legendas técnicas | **JetBrains Mono** | 400 · 500 | https://fonts.google.com/specimen/JetBrains+Mono |

**Fallback no Office** (PowerPoint/Word sem as fontes instaladas):
- Display → Arial Black / Arial Bold
- Texto → Calibri
- Dados → Consolas

## Escala (base 16 px · razão ~1,25)

| Estilo | Família | Tamanho / entrelinha | Peso | Tracking | Uso |
|---|---|---|---|---|---|
| Display XL | Bricolage | 72 / 0,94 | 700 | −0,035 em | capa, hero |
| Display | Bricolage | 56 / 1,0 | 700 | −0,03 em | títulos de seção |
| H1 | Bricolage | 40 / 1,08 | 700 | −0,02 em | |
| H2 | Bricolage | 32 / 1,15 | 600 | −0,015 em | |
| H3 | Bricolage | 24 / 1,25 | 600 | −0,01 em | |
| Lead | Instrument Sans | 20 / 1,5 | 400 | 0 | parágrafo de abertura |
| Corpo | Instrument Sans | 16 / 1,6 | 400 | 0 | texto corrido (máx. 65 caracteres por linha) |
| Pequeno | Instrument Sans | 14 / 1,5 | 500 | 0 | notas, UI |
| Eyebrow | JetBrains Mono | 12 / 1,3 | 500 | +0,12 em, CAIXA ALTA | rótulo de seção, precedido de ● |
| Dado | JetBrains Mono | 14–48 | 400–500 | 0 | valores, tabelas (números tabulares) |

Em impressão, converta para pt: Display 36–48 pt, H1 24 pt, corpo 10–11 pt, legenda 7,5–8 pt.

## Regras
- Títulos em **caixa alta e baixa**, curtos e com quebra equilibrada. Destaque **uma palavra** em Vagalume (no escuro) ou Oliva (no claro), como em "Números em **sincronia.**".
- O **ponto final** de títulos curtos é parte da voz da marca ("Nada trabalha sozinho.").
- Valores monetários sempre em mono com números tabulares e alinhados à direita: `R$ 18.200,00`.
- Nunca use mais de 3 pesos na mesma peça. Não use itálico sintético e não aplique contorno em texto.
- Bricolage não deve ser usada em corpo de texto, e Instrument Sans não deve ser usada em títulos gigantes.

## CSS
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Instrument+Sans:wght@400..600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
As variáveis `--ff-font-display`, `--ff-font-body` e `--ff-font-mono` estão em `../cores/tokens.css`.
