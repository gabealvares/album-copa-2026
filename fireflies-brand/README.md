# Fireflies Consultoria: identidade de marca 1.0

Pacote completo para produzir material da Fireflies Consultoria (consultoria financeira, contábil e fiscal · São Paulo).

**Comece pelo manual:** abra `manual/index.html` no navegador.

| Pasta | O que tem |
|---|---|
| `manual/` | Manual de marca navegável: marca, logo, cores, tipografia, ícones, elementos, voz, aplicações e arquivos |
| `estrategia/` | `plataforma-de-marca.md` (propósito, posicionamento, arquétipo, tagline, voz, mensagens, pilares de conteúdo) e `guia-de-aplicacoes-e-rollout.md` (medidas de cada peça, nomenclatura, regras do logo, checklist de lançamento, textos de bio e assinatura) |
| `logo/` | 29 SVGs com o texto em curvas e 29 PNGs de 2000 px. São 8 versões × 4 cores: horizontal, vertical, símbolo, wordmark, assinatura "Fireflies.", Academy, Condomínios e favicon; em positivo, negativo, mono-noite e mono-branco. Inclui também favicon.ico, apple-touch, avatar e diagrama de construção |
| `cores/` | `tokens.css`, `tokens.json`, paleta Adobe `.ase`, GIMP `.gpl` e tabela HEX/RGB/CMYK/Pantone com contraste WCAG |
| `tipografia/` | Bricolage Grotesque, Instrument Sans e JetBrains Mono (Google Fonts), com escala, regras e fallbacks para Office |
| `icones/` | 36 ícones SVG (grid 24, traço 1,5, um ponto aceso), `sprite.svg` e prancha |
| `aplicacoes/` | Modelos editáveis (HTML) exportados em PNG/PDF: redes (Instagram, LinkedIn, story, carrossel), OG image, assinatura de e-mail, cartão de visita, timbrado, capa de relatório de auditoria, certificado Academy e slides-mestre |
| `logo-original.webp` | Logo anterior, como referência |

## Decisões principais
- **Ideia:** "Nada trabalha sozinho". Cada serviço é um vagalume; em sincronia, eles viram um único fechamento.
- **Tagline:** "Precisão que ilumina decisões." **Campanha:** "Números em sincronia."
- **Símbolo:** cinco nós (os serviços), um nó aceso (o contador responsável) e uma órbita (proteção). Mantém a lógica do logo anterior e é produzível em 1 cor, a 32 px e em bordado.
- **Cores:** Noite `#06262B` + Vagalume `#D9F24A`. No claro, a luz é Oliva `#5E6E00`. Brasa `#F5A524` só para alertas em dados.
- **Arquitetura:** marca única. As linhas Condomínios e Academy mudam só o descritor.

## Pendências do cliente
- Número do **CRC-SP** e **CNPJ** (aparecem como "a confirmar" nos modelos)
- Handle **@firefliesconsultoria**: confirmar disponibilidade
- Rota de verificação do certificado da Academy
- Prova de cor na gráfica antes da primeira impressão: o Vagalume é sensível em CMYK

## Regerar
- Manual: `python3 manual/_build/build.py`
- Aplicações: `cd aplicacoes/_build && npm install && node render.js`
