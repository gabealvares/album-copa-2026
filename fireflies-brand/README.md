# Fireflies Consultoria: identidade de marca v2 "Órbita do vagalume"

Este é o pacote completo da nova identidade. Tudo o que vale está em **`v2/`**. A primeira versão (v1) fica guardada em `_arquivo-v1/` apenas como histórico.

**Comece por:** `v2/manual-de-marca/index.html`, o manual navegável.

| Pasta | O que tem | Formatos |
|---|---|---|
| `v2/logo/` | Sistema de logo: horizontal, vertical, F de luz, F de luz pequeno, favicon, wordmark, Condomínios, Academy. Cada um vem em 7 cores: digital, digital-negativo, chapado, chapado-negativo, mono-anil, mono-branco, mono-preto. Inclui também favicon.ico, ícones de app, avatar, OG e construção | 56 SVG + 56 PNG (2000 px, transparente), ICO |
| `v2/cores/` | Paleta "Noite de São João": tokens CSS e JSON, paleta Adobe `.ase`, GIMP `.gpl`, matriz de contraste | CSS, JSON, ASE, GPL |
| `v2/tipografia/` | Sora (títulos), IBM Plex Sans (texto), IBM Plex Mono (dados), com escala e regras. As fontes vêm em `fontes/`, sob licença OFL | TTF |
| `v2/iconografia/` | 79 ícones, 8 constelações dos serviços, 21 ornamentos de carta celeste e 8 padrões | SVG (web e com cor aplicada) + PNG claro, escuro e mono |
| `v2/manual-de-aplicacao/` | Onde e como aplicar: matriz de fundos, árvore claro/escuro, distribuição de cor, versões do logo por fundo e fichas por material | MD + pranchas PNG |
| `v2/aplicacoes/` | 45 peças, em 6 grupos:<br>• apresentação: 8 slides-mestre<br>• documentos: timbrado, proposta, relatório de auditoria, parecer<br>• papelaria: cartão, envelope, pasta, crachá, certificado Academy<br>• digital: e-mail, OG, LinkedIn, avatar, fundo de vídeo<br>• redes: posts, carrossel, story<br>• ambientação: placa, selo, caneca, camiseta | SVG (em curvas) + PNG + PDF, mais HTML editável |
| `v2/documentos/nfse-condominios/` | Artigo "NFS-e para condomínios" no design system: versão web interativa e PDF editorial de 17 páginas | HTML + PDF |
| `v2/estrategia/` | Plataforma de marca v2 (território "Carta do Lume", essência "Luz medida.", voz, glossário) e territórios pesquisados | MD |
| `v2/_decisao/` | Histórico das rodadas e decisões com o cliente | PNG + MD |
| `v2/_arquivo/` | Rodadas superadas do logo | SVG/PNG |

## Decisões principais
- **Símbolo:** uma órbita leve que envolve o nome. Atrás fica uma constelação: fio fino com estrelas, que representam os serviços. Na frente fica a luz, que esquenta até o vagalume aceso, acima do "E de luz" (o contador responsável).
- **Versão curta:** o F de luz na mesma órbita.
- **Wordmark:** Sora 620 em caixa alta, com o "E de luz" (herança do E laranja do logo original) e CONSULTORIA espaçado.
- **Cores:** Anil de Junho #17183A, Cal Virgem #EDEEEA, Âmbar de Vagalume #F2B544 (a luz), Vermelhão #E65A3E e Vermelhão de Rubrica #A9301F.
- **Frases:** a assinatura é "Luz medida."; a frase de apoio é "Precisão que ilumina decisões."; o conceito é "Nada trabalha sozinho.".

## Pendências do cliente
- Número do **CRC-SP** e **CNPJ**, que aparecem como "[a confirmar]" nas peças.
- **Foto do autor** e **link da live** no documento NFS-e.
- Rotas dos QR codes (`/selo/…`, `/academy/verificar`) e disponibilidade do handle `@firefliesconsultoria`.
- **Assinatura de e-mail:** hospedar o PNG em HTTPS e trocar o `src`.
- **Impressão:** pedir prova de cor na gráfica, porque o âmbar é sensível em CMYK.

## Regerar
Os scripts de cada pasta ficam em `_build/`, com instruções nos READMEs. Exemplos:
- aplicações: `v2/aplicacoes/_build/gerar-tudo.sh`
- documento NFS-e: `node v2/documentos/nfse-condominios/_build/impresso.js`
- PNGs da iconografia: `node v2/iconografia/_build/exportar-cores-png.js`
