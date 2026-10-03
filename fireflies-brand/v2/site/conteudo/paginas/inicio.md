# Início

```yaml
titulo: Início
slug: inicio            # definida como "Página inicial" em Configurações > Leitura
url: /
parent: null
template: front-page
ordem_menu: 0
seo:
  palavra_chave: consultoria contábil SP
  secundarias: [consultoria financeira contábil e fiscal São Paulo, auditoria de condomínio São Paulo]
  title: "Fireflies Consultoria · Consultoria contábil e fiscal em SP"
  meta: "Consultoria financeira, contábil e fiscal em São Paulo, especialista em auditoria de condomínios. Painel mensal explicado e um contador que assina."
  schema: [Organization, AccountingService, WebSite (SearchAction)]
```

> Convenções deste arquivo: `[pattern: …]` é o pattern do tema `fireflies` que abre a seção. Texto entre `[a confirmar]` depende de dado real. Rótulos em `MONO` são eyebrows em IBM Plex Mono caixa alta. Nenhum case ou depoimento é usado: o site antigo tinha cases "Ilustrativos" que não podem ser publicados.

---

## 1. Hero
[pattern: hero-anil]

- **Eyebrow (mono):** CONSULTORIA FINANCEIRA, CONTÁBIL E FISCAL · SÃO PAULO
- **H1:** Números em sincronia.
- **Lead:** Notas, contas, balancetes e rateios chegam dispersos. A gente coloca cada número no lugar, com origem e responsável, e o que era ruído vira decisão.
- **Botão primário:** Agendar diagnóstico gratuito → `/contato/`
- **Botão secundário (texto):** Conversar no WhatsApp → `https://wa.me/5511982450527`
- **Nota sob os botões (mono):** Diagnóstico gratuito · Seg–sex, 8h–18h
- **Grafismo:** constelação dos serviços à direita, um único ponto âmbar aceso.

## 2. Faixa de provas
[pattern: faixa-provas]

Quatro colunas separadas por fio fino. Número ou palavra grande em Sora, rótulo em mono.

| Grande | Rótulo |
|---|---|
| CRC ativo | Contador responsável em todo projeto · CRC-SP [a confirmar] |
| 8+ anos | De contabilidade, auditoria e gestão financeira |
| 30 dias | Até o primeiro painel mensal |
| São Paulo | Empresas e condomínios |

## 3. Serviços
[pattern: servicos-lista]

- **Eyebrow:** 01 · SERVIÇOS
- **H2:** Nada trabalha sozinho.
- **Intro:** Contábil, fiscal, financeiro e auditoria conversam entre si. Quando uma área muda, a gente olha o efeito nas outras antes de você precisar perguntar.

Lista em linhas com fio (número mono, nome, uma frase, seta):

1. **Auditoria de Condomínios** · ESPECIALIDADE — Prestação de contas conferida, com relatório executivo que síndico, conselho e administradora entendem. → `/servicos/auditoria-de-condominios/`
2. **Consultoria Contábil** — Fechamento mensal no prazo, plano de contas que faz sentido e a DRE explicada em reunião. → `/servicos/consultoria-contabil/`
3. **Consultoria Fiscal** — Regime tributário revisado, guias conferidas e planejamento tributário dentro da lei. → `/servicos/consultoria-fiscal/`
4. **Consultoria Financeira** — Fluxo de caixa, orçamento e indicadores para decidir com o número do mês. → `/servicos/consultoria-financeira/`
5. **Gestão de Projetos e Processos** — Rotinas, ERP e automação, para que o controle continue funcionando depois do projeto. → `/servicos/gestao-de-projetos-e-processos/`
6. **Sindicância** — Apuração independente de fatos, com documentos, cronologia e relatório técnico. → `/servicos/sindicancia/`

- **Link ao fim:** Ver todos os serviços → `/servicos/`

## 4. Sincronia (posicionamento)
[pattern: texto-manifesto]

- **Eyebrow:** SINCRONIA
- **Frase grande (Sora, palavra a palavra):** Enquanto muitos entregam relatórios, nós entregamos controle, clareza e poder de decisão.
- **Texto:** A Fireflies Consultoria conecta contabilidade, fiscal, finanças, processos e tecnologia numa mesma leitura. Cada projeto tem um contador responsável, que conduz do início ao fim, apoiado por especialistas escolhidos para o tamanho do desafio.
- **Nota (mono, com fio):** Sem pacote genérico: primeiro entendemos o negócio, depois propomos o caminho.

## 5. O que você recebe
[pattern: painel-mensal]

- **Eyebrow:** 02 · O QUE VOCÊ RECEBE
- **H2:** Todo mês, o seu negócio em uma tela.
- **Texto:** Não é um PDF esquecido na caixa de entrada. É um painel que você lê em dois minutos, com o que mudou, o que preocupa e o que já está resolvido, explicado numa reunião com quem assina.
- **Demonstração:** painel com receita do mês, margem líquida, dias de caixa, saldo de 12 meses e três alertas. **Rótulo obrigatório no canto (mono): DADOS DE EXEMPLO.** Os valores são fictícios e servem só para mostrar o formato.
  - Alertas de exemplo (um por tipo):
    - Atenção · Inadimplência acima da meta definida com você.
    - Resolvido · Impostos do próximo mês provisionados e guias conferidas.
    - Aviso · Contrato de aluguel reajusta no próximo mês. Impacto já projetado.
- **Três colunas com fio:**
  - **O que mudou** — Receita, custos e caixa comparados ao mês anterior.
  - **O que preocupa** — Alertas com causa e proposta, nunca só o número.
  - **O que está resolvido** — Pendências fechadas, com responsável e data.

## 6. Condomínios
[pattern: raio-x-condominio]

- **Eyebrow:** 03 · FIREFLIES CONDOMÍNIOS
- **H2:** Raio-X do seu condomínio.
- **Texto:** Sua taxa paga o que deveria? A gente mostra para onde vai cada real, confere a prestação de contas e leva o relatório pronto para o conselho.
- **Simulador:** três controles (unidades, taxa média, inadimplência) e a distribuição da receita.
  - **Nota obrigatória (mono):** Simulação ilustrativa. Os percentuais de referência são definidos pelo responsável técnico [a confirmar] e não substituem a análise das contas reais do seu condomínio.
- **Bloco de destaque (só aparece quando o saldo simulado é negativo):** Quando o caixa do mês não fecha, o fundo de reserva costuma cobrir a diferença. Sem ajuste, a taxa extra vira rotina.
- **Botões:** Fazer o raio-X com os números reais → `/contato/?assunto=auditoria-de-condominios` · Conhecer a linha Condomínios → `/condominios/`

## 7. Como começamos
[pattern: passos-30-dias]

- **Eyebrow:** 04 · COMO COMEÇAMOS
- **H2:** 30 dias até a primeira luz.
- **Intro:** Do primeiro contato ao primeiro relatório mensal, com o mesmo responsável do começo ao fim.

| Nº | Quando | Etapa | O que acontece | Entregável |
|---|---|---|---|---|
| 01 | Semana 1 | Diagnóstico | Uma conversa sem custo e a leitura dos números como estão hoje. | Leitura do cenário atual |
| 02 | Semanas 2–3 | Organização | Conciliação, plano de contas, processos e acessos colocados em ordem. | Base organizada e plano de trabalho |
| 03 | Semana 4 | Primeiro fechamento | O primeiro relatório mensal, explicado numa reunião com você. | Primeiro painel mensal |
| 04 | Todo mês | Rotina | Fechamento, indicadores e alertas, sempre com o mesmo responsável. | Painel e reunião mensal |

- **Link:** Ver o método em detalhe → `/como-trabalhamos/`

## 8. Por que a Fireflies
[pattern: diferenciais-grid]

Grade 2 × 2 com fios, sem cards nem ícones em círculo.

- **Controle, não só relatórios.** Indicadores que você acompanha e decisões que consegue tomar. O relatório existe, mas vem explicado.
- **Um responsável, vários especialistas.** Um contador responsável conduz o projeto do início ao fim, com um backoffice que se ajusta ao tamanho do desafio.
- **Processo e tecnologia junto.** Rotinas, ERP e automação entram no trabalho para que o controle continue depois que o projeto termina.
- **Sob medida desde o diagnóstico.** Cada proposta nasce de uma conversa sobre o seu negócio. Não existe pacote pronto.

## 9. Por onde começar
[pattern: triagem-3-perguntas]

- **Eyebrow:** 05 · POR ONDE COMEÇAR
- **H2:** Três perguntas, um caminho.
- **Texto:** Leva menos de um minuto e já deixa o seu diagnóstico encaminhado.
- **Pergunta 1 de 3 · Quem é você nessa história?**
  - A · Síndico, conselho ou administradora → caminho Condomínios
  - B · Empresa em crescimento → caminho Empresas
  - C · Empresa consolidada → caminho Empresas
  - D · Grande empresa ou grupo → caminho Grupos
- **Pergunta 2 de 3 (Condomínios) · O que mais preocupa hoje?** Prestação de contas · Inadimplência · Taxa extra frequente · Troca de administradora ou de síndico
- **Pergunta 2 de 3 (Empresas e Grupos) · O que mais preocupa hoje?** Caixa apertado · Impostos · Fechamento atrasado · Processos e ERP
- **Pergunta 3 de 3 · Como prefere conversar?** WhatsApp · E-mail · Reunião por vídeo
- **Resultado:** "Seu caminho: [serviço sugerido]. O próximo passo é o diagnóstico gratuito." Botão Enviar pelo WhatsApp (mensagem pré-preenchida com as três respostas) e link Preencher o formulário → `/contato/`.
- **Nota (mono):** As respostas só montam a mensagem. Nada é gravado antes de você enviar.

## 10. Quem conduz
[pattern: responsavel]

- **Eyebrow:** 06 · QUEM CONDUZ
- **Nome:** Gabriel Alvares
- **Cargo (mono):** FUNDADOR E CONTADOR RESPONSÁVEL · CRC-SP [a confirmar]
- **Texto:** São mais de 8 anos em contabilidade, auditoria e gestão financeira. Gabriel fundou a Fireflies para que todo cliente tivesse o que costuma faltar: alguém que assina o número e explica o que ele quer dizer.
- **Foto:** retrato real [a confirmar]. Sem foto de banco de imagem.
- **Link:** Conhecer a Fireflies → `/sobre/`

## 11. Fireflies Academy
[pattern: academy-cursos]

- **Eyebrow:** 07 · FIREFLIES ACADEMY
- **H2:** Capacitação para quem lida com o número todo dia.
- **Texto:** Treinamentos em contabilidade, fiscal, finanças, auditoria e ERP, in company ou online.
- **Lista (consulta dinâmica do CPT `curso`, 6 itens, nome + trilha em mono):**
  - Contabilidade para Gestores · CONTÁBIL
  - Planejamento Tributário na Prática · FISCAL
  - ERP: do Básico ao Avançado · TECNOLOGIA
  - Gestão Financeira de Condomínios · CONDOMÍNIOS
  - Auditoria Interna: Fundamentos · AUDITORIA
  - Análise de Demonstrações Financeiras · FINANCEIRO
- **Botão:** Montar um treinamento → `/academy/`

## 12. Do blog
[pattern: posts-recentes]

- **Eyebrow:** 08 · LEITURAS
- **H2:** O que mudou e o que fazer.
- **Consulta:** 3 posts mais recentes (título, categoria em mono, data, tempo de leitura).
- **Link:** Ir para o blog → `/blog/`

## 13. Perguntas frequentes
[pattern: faq]

- **Eyebrow:** 09 · PERGUNTAS FREQUENTES
- **H2:** Antes de conversar.
- **Texto lateral:** Não encontrou o que procurava? Pergunte direto pelo WhatsApp.

**Quais empresas a Fireflies atende?**
Condomínios residenciais e comerciais, startups, pequenas e médias empresas, empresas consolidadas e grupos. O ponto em comum é querer números organizados, conformidade e crescimento com controle.

**Como funciona o diagnóstico gratuito?**
É uma conversa sem custo. A gente entende a situação atual, lê os números como estão e aponta os principais riscos e oportunidades. A partir dela, enviamos uma proposta com escopo, prazo e responsável.

**A Fireflies assume a contabilidade da minha empresa?**
Sim. A troca de contabilidade é feita de forma organizada, com transição planejada para que nenhuma obrigação fiscal ou contábil fique para trás.

**Como funciona a auditoria de condomínios?**
A gente confere a prestação de contas de um período definido (receitas, despesas, contratos, encargos e fundo de reserva) e entrega um relatório executivo com achados e recomendações, que pode ser apresentado ao conselho e à assembleia.

**Vocês substituem a administradora do condomínio?**
Não. A auditoria dá segurança ao síndico e ao conselho e trabalha em parceria com a administradora.

**O que é a Fireflies Academy?**
É a frente de treinamentos da Fireflies Consultoria: cursos em contabilidade, fiscal, finanças, auditoria e ERP, in company ou online.

## 14. Próximo passo
[pattern: cta-diagnostico]

- **Eyebrow:** PRÓXIMO PASSO
- **H2:** Comece pelo diagnóstico.
- **Texto:** Uma conversa sem custo e sem compromisso para entender o que está travando os seus números.
- **Botão primário:** Conversar no WhatsApp → `https://wa.me/5511982450527`
- **Botão secundário:** Agendar pelo formulário → `/contato/`
- **Linha mono:** contato@fireflies.com.br · Seg–sex, 8h–18h · São Paulo · SP
