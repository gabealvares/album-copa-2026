# Cores — Fireflies Consultoria

CMYK ajustado manualmente para Coated FOGRA39 e Pantone por aproximação visual — ambos são **referências iniciais** — valide com guia Pantone físico e prova de cor (perfil Coated FOGRA39) antes de imprimir.

| Nome | HEX | RGB | CMYK aprox. | Pantone aprox. | Uso | Contraste s/ Papel | s/ Noite |
|---|---|---|---|---|---|---|---|
| **Noite** | `#06262B` | 6, 38, 43 | 90 / 58 / 55 / 68 | Pantone 5463 C | Primária escura · fundos principais, símbolo | 14.56 | 1 |
| **Noite Funda** | `#041C20` | 4, 28, 32 | 90 / 60 / 58 / 80 | Pantone 5467 C | Fundos alternativos, rodapés | 16.12 | 1.11 |
| **Maré** | `#104048` | 16, 64, 72 | 88 / 48 / 48 / 38 | Pantone 5473 C | Superfícies sobre Noite, linhas no negativo | 10.39 | 1.4 |
| **Vagalume** | `#D9F24A` | 217, 242, 74 | 18 / 0 / 80 / 0 | Pantone 380 C | Assinatura · a luz. Só sobre fundos escuros | 1.15 | 12.69 |
| **Oliva** | `#5E6E00` | 94, 110, 0 | 55 / 32 / 100 / 38 | Pantone 7742 C | Luz sobre fundos claros · links, destaques | 5.18 | 2.81 |
| **Brasa** | `#F5A524` | 245, 165, 36 | 0 / 40 / 90 / 0 | Pantone 1375 C | Alerta/atenção em dados (≤2%). Nunca no logo | 1.87 | 7.8 |
| **Brasa Escura** | `#B54708` | 181, 71, 8 | 15 / 80 / 100 / 5 | Pantone 7580 C | Texto de alerta sobre fundo claro | 4.97 | 2.93 |
| **Tinta** | `#0E1726` | 14, 23, 38 | 88 / 72 / 48 / 72 | Pantone 5395 C | Texto sobre fundo claro | 16.43 | 1.13 |
| **Papel** | `#F3F5F7` | 243, 245, 247 | 3 / 1 / 1 / 0 | Pantone 663 C | Fundo claro padrão | 1 | 14.56 |
| **Névoa** | `#9DB9B7` | 157, 185, 183 | 40 / 14 / 28 / 0 | Pantone 5523 C | Texto secundário sobre Noite | 1.91 | 7.62 |
| **Pedra** | `#5A6570` | 90, 101, 112 | 62 / 46 / 36 / 28 | Pantone 431 C | Texto secundário sobre Papel | 5.44 | 2.67 |
| **Linha** | `#D5DBE1` | 213, 219, 225 | 15 / 8 / 6 / 0 | Pantone 7541 C | Bordas e divisórias no claro | 1.28 | 11.4 |
| **Branco** | `#FFFFFF` | 255, 255, 255 | 0 / 0 / 0 / 0 | — |  | 1.09 | 15.91 |

## Proporção
60% Noite ou Papel · 30% neutros (Tinta, Névoa, Pedra, Linha, Maré) · 8% Vagalume/Oliva · 2% Brasa.

## Regras de contraste (WCAG 2.2)
- Texto normal exige 4,5:1; texto grande e elementos gráficos 3:1.
- **Vagalume nunca é texto nem ícone sobre fundo claro** (1,25:1 sobre branco). No claro, a "luz" é **Oliva**.
- Botão Vagalume leva texto **Noite** (12,69:1).
- Brasa é cor de alerta em dados. Sobre claro, texto em **Brasa Escura**.

## Arquivos
- `tokens.css` — variáveis CSS (com tema claro/escuro e escalas 50–900)
- `tokens.json` — tokens para Figma Tokens / devs
- `fireflies.ase` — paleta Adobe (Illustrator, InDesign, Photoshop)
- `fireflies.gpl` — paleta GIMP/Inkscape
