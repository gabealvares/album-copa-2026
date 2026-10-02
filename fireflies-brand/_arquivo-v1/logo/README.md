# Fireflies Consultoria: sistema de logo

Todos os SVGs têm o texto convertido em curvas e não dependem de nenhuma fonte instalada. O wordmark é Bricolage Grotesque 700 (opsz 36) e o descritor é JetBrains Mono 500. Os PNGs têm 2000 px de largura e fundo transparente.

## Arquivos
- `svg/fireflies_logo_{versao}_{cor}.svg`
  - versões: horizontal, vertical, simbolo, wordmark, assinatura, academy-horizontal, condominios-horizontal, favicon
  - cores: positivo (fundo claro), negativo (fundo Noite), mono-noite, mono-branco
- `png/`: o mesmo conjunto em 2000 px
- `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon-180.png`, `avatar-redes-1080.png`
- `construcao.svg`: grid, malha triangular, órbita e área de proteção

## Área de proteção
- **Lockups (horizontal, vertical e sub-marcas), wordmark e assinatura:** 1 X em todos os lados. X é a altura-x de "Fireflies", cerca de 0,72 da altura das ascendentes.
- **Símbolo isolado:** 1/4 da altura do símbolo em todos os lados.

## Tamanhos mínimos
| Versão | Digital | Impresso |
|---|---|---|
| Horizontal / sub-marcas | 180 px de largura | 40 mm |
| Vertical | 110 px de largura | 25 mm |
| Wordmark / assinatura "Fireflies." | 72 px de largura | 18 mm |
| Símbolo | 32 px | 8 mm |
| Abaixo de 32 px | use `favicon.svg` (versão reduzida: 2 nós, vagalume e órbita) | n/a |

## Cores usadas
| Nome | HEX | Onde |
|---|---|---|
| Noite | `#06262B` | positivo: tudo, menos o miolo do vagalume. Fundo do favicon e do avatar |
| Vagalume | `#D9F24A` | nó aceso. Ponto da assinatura no negativo |
| Oliva | `#5E6E00` | ponto da assinatura no positivo (lima some no claro) |
| Papel | `#F3F5F7` | negativo: órbita, nós e wordmark |
| Névoa | `#9DB9B7` | negativo: linhas da constelação e descritor |
| Branco | `#FFFFFF` | mono-branco |

**No positivo**, o nó aceso é Vagalume com contorno Noite de 1,5 u. Assim a cor-assinatura da marca se mantém e o contorno garante a borda sobre fundo claro.

**No mono**, o nó aceso se distingue pela forma: é um disco maior com 4 raios diagonais.

**Não fazer:**
- gradiente, brilho/blur ou sombra
- recolorir nós individuais
- rotacionar ou distorcer
- usar Brasa (`#F5A524`) no logo
