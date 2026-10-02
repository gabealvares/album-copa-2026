# Iconografia Fireflies Consultoria

São 36 ícones de traço, desenhados à mão sobre grid de 24 px. Cada um tem no máximo **1 ponto aceso**, que é o vagalume do ícone.

```
icones/
  svg/{nome}.svg        ícone avulso (36 arquivos)
  sprite.svg            todos os ícones como <symbol id="ff-{nome}">
  prancha-icones.png    prancha de revisão (Papel e Noite, 48/24/16 px)
  _build/               gerador (gerar-icones.js) e prancha (prancha.js)
```
Para regerar: `cd _build && node gerar-icones.js && node prancha.js`. O gerador recusa ícones que tenham mais de 1 ponto aceso.

## Regras de construção
| Regra | Valor |
|---|---|
| Canvas | `viewBox="0 0 24 24"` |
| Área viva | 20 × 20 (margem de 2 px). Nada encosta na borda. |
| Traço | `stroke-width` 1,5 · `stroke-linecap="round"` · `stroke-linejoin="round"` · `fill="none"` · `stroke="currentColor"` |
| Cantos | raio 2 nos retângulos (1 em formas internas pequenas, como o visor da calculadora) |
| Coordenadas | inteiras ou em meios (.5). Arcos circulares puros e ângulos de 0°, 45° e 90° sempre que possível |
| Massa óptica | quadrados ficam em 14–18, círculos em Ø 14–18, formas largas em 18 × 14. Ícones redondos ou triangulares podem ocupar a área viva inteira para compensar |
| Pontinhos secundários | segmento de comprimento zero (`M x y h0`), que gera um Ø 1,5 com o próprio traço (teclas, janelas, matriz de pontos) |

## O ponto aceso
```html
<circle class="lit" cx="…" cy="…" r="1.75" fill="var(--ff-lit, currentColor)" stroke="none"/>
```
- **Use no máximo 1 por ícone.** Ele marca o ponto semântico: o achado da lupa, o total do fechamento, o pico do painel, o alvo do planejamento, a janela acesa do condomínio. Ícones de UI e alguns conceitos (compliance, diagnóstico, e-mail, equipe, fluxo de caixa) não têm ponto aceso, de propósito.
- Mantenha uma folga de ≥ 0,5 px até qualquer traço. A luz não toca a rede.
- A cor vem da variável `--ff-lit`. Sem ela, o ponto herda `currentColor` e o ícone funciona em 1 cor.

## Cores por fundo
| Fundo | Traço (`color`) | Ponto (`--ff-lit`) |
|---|---|---|
| Papel #F3F5F7 / Branco | Tinta #0E1726 | Oliva #5E6E00 |
| Noite #06262B / Noite Funda #041C20 / Maré #104048 | Papel #F3F5F7 | Vagalume #D9F24A |
| Alerta em dados (inadimplência, prazos) | cor do contexto | Brasa #F5A524 no escuro, Brasa Escura #B54708 no claro |
| 1 cor (impressão, carimbo) | a cor única | herda (`currentColor`) |

## Tamanhos
| px | Traço | Uso |
|---|---|---|
| 16 | **2** (`--ff-stroke: 2`) | inline em texto, tabelas, badges. Prefira os ícones mais simples |
| 20 | **2** | botões compactos, menus |
| 24 | 1,5 | tamanho-base: UI, listas, formulários |
| 32 | 1,5 | cards de serviço, cabeçalhos de seção |
| 48 | 1,5 | destaques, slides, site (seção de serviços) |
Acima de 48 px, escale o traço junto (o SVG faz isso sozinho) e não redesenhe.

## Como usar o sprite em HTML
```html
<!-- 1. inclua o sprite uma vez (inline no <body>) ou referencie o arquivo externo (mesma origem) -->
<style>
  .ff-icon { width: 24px; height: 24px; color: #0E1726; --ff-lit: #5E6E00; }
  .tema-noite .ff-icon { color: #F3F5F7; --ff-lit: #D9F24A; }
  .ff-icon--16, .ff-icon--20 { --ff-stroke: 2; }
  .ff-icon--16 { width: 16px; height: 16px; }
  .ff-icon--20 { width: 20px; height: 20px; }
</style>

<svg class="ff-icon" aria-hidden="true"><use href="sprite.svg#ff-auditoria"/></svg>

<!-- ícone com significado próprio (sem texto ao lado): -->
<svg class="ff-icon" role="img" aria-label="Fale no WhatsApp"><use href="sprite.svg#ff-whatsapp-conversa"/></svg>
```
- O traço é controlado por `--ff-stroke` (padrão 1,5), porque variáveis CSS atravessam o `<use>`.
- O SVG avulso (`svg/*.svg`) já traz `stroke-width="1.5"` como atributo. Para sobrescrever, aplique CSS no próprio elemento (`svg { stroke-width: 2 }`).
- Em `<img src="svg/x.svg">` não há `currentColor` nem variáveis: o ícone sai preto. Use inline ou sprite.

## Lista
- **Serviços:** auditoria, contabil, fiscal, financeiro, gestao-processos, sindicancia, academy, condominio
- **Conceitos:** diagnostico, organizacao, fechamento, rotina, painel-mensal, conciliacao, relatorio, indicador, fluxo-de-caixa, imposto, folha-pagamento, inadimplencia, fundo-reserva, planejamento-tributario, erp-tecnologia, compliance, contrato, calendario-prazo
- **Pessoas e contato:** responsavel, equipe, reuniao, whatsapp-conversa, email, telefone, localizacao
- **UI:** seta-direita, check, alerta

## O que não fazer
- Não use mais de 1 ponto aceso nem pinte partes do traço de Vagalume/Oliva.
- Não aplique Vagalume sobre fundo claro (1,25:1). No claro, o ponto é Oliva.
- Não preencha os ícones, não use gradiente, sombra, glow ou blur no ponto.
- Não misture com ícones de bibliotecas (Lucide, Material etc.), porque têm pesos e cantos diferentes. Um ícone novo segue este grid e entra pelo gerador.
- Não use traço 1,5 abaixo de 20 px nem traço 2 acima de 24 px.
- Não distorça, rotacione (exceto a seta, em passos de 90°) nem recorte o ícone.
- Não use o ícone `whatsapp-conversa` como logo do WhatsApp: ele é um balão genérico. Onde a marca oficial for exigida, use o logo oficial.
- Não use Brasa como cor de traço. Ela só entra no ponto, e só para alertas.
