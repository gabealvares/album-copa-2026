# Site Fireflies Consultoria · arquitetura de informação, conteúdo e SEO

> Versão 1.0 · 03/10/2026 · Base: `wp/00-briefing-site.md`, `v2/estrategia/plataforma-de-marca-v2.md`, `_arquivo-v1/estrategia/guia-de-aplicacoes-e-rollout.md`, textos do site antigo e o artigo NFS-e.
> Arquivos irmãos: `paginas/*.md` (texto final por seção), `cursos/*.md`, `posts/*.md` e `wxr-spec.json` (dados para gerar o WXR).

**Regras que valem para todo o conteúdo**
- O nome é sempre **Fireflies Consultoria** em títulos, metas e schema, para não confundir com a Fireflies.ai. Âncora local em toda página: "São Paulo · SP".
- A voz é exata, serena e próxima. Usamos "a gente" no site, e "nós" ou "a Fireflies" nas páginas legais e no texto para grandes grupos.
- Uma frase de luz por página, no máximo. A assinatura "Precisão que ilumina decisões." vive no rodapé global.
- **Sem cases nem depoimentos.** Os do site antigo eram "Ilustrativos" e não são publicados. As provas usadas são verificáveis: CRC (a confirmar), 8+ anos, responsável nomeado, método de 30 dias e base legal citada.
- Demonstrações (painel mensal, raio-X) levam sempre o rótulo **DADOS DE EXEMPLO** ou **Simulação ilustrativa**.
- Dados pendentes aparecem como ****: CRC, CNPJ, razão social, endereço, foto, carga horária, percentuais do raio-X e link da live.

---

## 1. Sitemap final

```
/                                         Início (front page)
├── /servicos/                            Serviços
│   ├── /servicos/auditoria-de-condominios/
│   ├── /servicos/consultoria-contabil/
│   ├── /servicos/consultoria-fiscal/
│   ├── /servicos/consultoria-financeira/
│   ├── /servicos/gestao-de-projetos-e-processos/
│   └── /servicos/sindicancia/
├── /condominios/                         Landing Fireflies Condomínios
├── /como-trabalhamos/                    30 dias até a primeira luz + painel mensal
├── /academy/                             Fireflies Academy (página)
│   ├── /academy/cursos/                  arquivo do CPT curso (lista; pode redirecionar 301 para /academy/)
│   │   ├── /academy/cursos/contabilidade-para-gestores/
│   │   ├── /academy/cursos/planejamento-tributario-na-pratica/
│   │   ├── /academy/cursos/erp-do-basico-ao-avancado/
│   │   ├── /academy/cursos/gestao-financeira-de-condominios/
│   │   ├── /academy/cursos/auditoria-interna-fundamentos/
│   │   └── /academy/cursos/analise-de-demonstracoes-financeiras/
│   └── /academy/trilha/{slug}/           arquivo da taxonomia trilha (6 termos)
├── /sobre/                               Gabriel Alvares e a Fireflies
├── /blog/                                Página de posts
│   ├── /blog/{post-slug}/                posts
│   ├── /blog/categoria/{slug}/           6 categorias
│   ├── /blog/tag/{slug}/                 tags (noindex)
│   └── /blog/autor/gabriel-alvares/      autor
├── /contato/                             Diagnóstico gratuito + WhatsApp
├── /politica-de-privacidade/
├── /termos-de-uso/
├── /?s={termo}                           busca (noindex)
└── 404
```

**Decisões**
- `/condominios/` e `/servicos/auditoria-de-condominios/` convivem sem canibalizar. A landing mira o público ("consultoria para condomínios em São Paulo") e recebe tráfego de anúncio, QR e WhatsApp. A página de serviço mira a palavra-chave transacional "auditoria de condomínio São Paulo". As duas se linkam no primeiro terço da página.
- Posts em `/blog/{slug}/` e categorias em `/blog/categoria/{slug}/`. O prefixo `/blog/` separa o conteúdo editorial das páginas comerciais no Search Console e nos relatórios.
- O CPT `curso` vive em `/academy/cursos/{slug}/`. A página `/academy/` é a vitrine editável. O arquivo `/academy/cursos/` pode listar os cursos ou redirecionar para `/academy/#cursos`; o tema decide, mas sem duplicar conteúdo indexável.
- Fica para depois (P2), fora do WXR: `/academy/verificar/` (verificação de certificado) e a página de verificação do selo datado "Prestação de contas auditada".

---

## 2. Menus

**Menu principal (header)**
1. Serviços ▾ (Auditoria de Condomínios · Consultoria Contábil · Consultoria Fiscal · Consultoria Financeira · Gestão de Projetos e Processos · Sindicância · Todos os serviços)
2. Condomínios
3. Como trabalhamos
4. Academy
5. Blog
6. Sobre

**CTA do header:** botão "Agendar diagnóstico" → `/contato/`. Fica fora do menu, à direita, com estilo `is-style-cta`.

**CTA fixo no celular** (abaixo de 782 px): barra inferior com "WhatsApp" (`wa.me/5511982450527`, bloco do `fireflies-core`) e "Diagnóstico gratuito" (`/contato/`). Ela some quando o pattern `cta-diagnostico` está na tela, para não duplicar.

**Rodapé**
| Coluna | Itens |
|---|---|
| Marca | Logo horizontal, "Precisão que ilumina decisões.", "Consultoria financeira, contábil e fiscal · São Paulo" |
| SERVIÇOS | os 6 serviços |
| FIREFLIES | Condomínios · Como trabalhamos · Academy · Blog · Sobre · Contato |
| CONTATO | WhatsApp +55 11 98245-0527 · contato@fireflies.com.br · Seg–sex, 8h–18h · São Paulo · SP |
| CREDENCIAIS (mono) | Responsável técnico: Gabriel Alvares · CNPJ |
| Linha final | © 2026 Fireflies Consultoria · Política de Privacidade · Termos de Uso · Preferências de cookies |

---

## 3. Jornada por público

### 3.1 Síndico, conselho ou administradora
| Etapa | Onde entra | O que encontra | Próximo passo |
|---|---|---|---|
| Descoberta | Busca "auditoria de condomínio São Paulo", "fundo de reserva condomínio", "NFS-e condomínio"; QR de cartaz ou indicação da administradora | Post do blog (categoria Condomínios) ou `/condominios/` | Link no post para `/servicos/auditoria-de-condominios/` |
| Consideração | `/condominios/` | Raio-X (simulação), o que a gente faz, calendário do condomínio, base legal, FAQ ("vocês substituem a administradora?") | `/servicos/auditoria-de-condominios/` ou o WhatsApp |
| Decisão | `/servicos/auditoria-de-condominios/` | Escopo, entregáveis, etapas até a assembleia | `/contato/?assunto=auditoria-de-condominios` ou WhatsApp |
| Pós-contato | WhatsApp | Saudação, pedido de tamanho do condomínio e período | Proposta |
| Retenção | Blog e Academy | Posts para o conselho; curso Gestão Financeira de Condomínios | Nova auditoria no próximo exercício |

Tom: protetor e didático. Fala de taxa, reserva e assembleia. Nunca de medo ("seu condomínio pode estar sendo roubado").

### 3.2 PME e startup
| Etapa | Onde entra | O que encontra | Próximo passo |
|---|---|---|---|
| Descoberta | Busca "consultoria contábil SP", "como ler DRE", "lucro não é caixa"; LinkedIn do Gabriel | Post (Contábil, Gestão Financeira) ou Início | Início → "O que você recebe" (painel) |
| Consideração | Início, `/servicos/consultoria-financeira/`, `/servicos/consultoria-contabil/` | Painel mensal (dados de exemplo), "30 dias até a primeira luz", FAQ sobre troca de contador | `/como-trabalhamos/` |
| Decisão | `/como-trabalhamos/` | Etapas, o que você precisa fazer, quem responde | Triagem de 3 perguntas → WhatsApp, ou `/contato/` |
| Retenção | Painel e reunião mensal; blog | Posts fiscais na época de revisão de regime (dezembro) | Consultoria fiscal |

Tom: direto e prático, focado em caixa e tempo.

### 3.3 Empresa consolidada ou grande grupo
| Etapa | Onde entra | O que encontra | Próximo passo |
|---|---|---|---|
| Descoberta | Indicação, LinkedIn da página, busca por "consultoria fiscal e tributária SP", "mapeamento de processos financeiros" | Página de serviço | `/servicos/` (bloco "Para quem") |
| Consideração | `/servicos/consultoria-fiscal/`, `/servicos/gestao-de-projetos-e-processos/`, `/servicos/sindicancia/`, `/sobre/` | Escopo técnico, limites (planejamento dentro da lei, sindicância sem julgamento), responsável e credenciais | `/sobre/` (dados institucionais) |
| Decisão | `/contato/` (perfil "Grande empresa ou grupo") | Formulário com reserva; e-mail | Reunião e proposta formal ("nós") |

Tom: técnico e sóbrio. "Compliance" só aparece aqui, se necessário.

### 3.4 Aluno ou comprador da Academy
| Etapa | Onde entra | O que encontra | Próximo passo |
|---|---|---|---|
| Descoberta | Busca "treinamento in company contabilidade", "curso gestão financeira de condomínios"; post da categoria Academy | `/academy/` ou a página do curso | Página do curso |
| Consideração | `/academy/cursos/{curso}/` | Descrição, público, programa, formato, trilha e "continue na trilha" | Outro curso da trilha |
| Decisão | `/contato/?assunto=academy&curso={slug}` | Formulário com o curso pré-selecionado | Proposta com programa |
| Pós-curso | Certificado (Selo de Carta, código de verificação) | `/academy/verificar/` (P2) | Serviço relacionado (ex.: ERP → Processos) |

---

## 4. Modelo de conteúdo

### 4.1 Páginas (post type `page`)
| Página | Slug | Parent | Template | Arquivo |
|---|---|---|---|---|
| Início | inicio | — | front-page | paginas/inicio.md |
| Serviços | servicos | — | page-servicos | paginas/servicos.md |
| Auditoria de Condomínios | auditoria-de-condominios | servicos | page-servico | paginas/servicos-auditoria-de-condominios.md |
| Consultoria Contábil | consultoria-contabil | servicos | page-servico | paginas/servicos-consultoria-contabil.md |
| Consultoria Fiscal | consultoria-fiscal | servicos | page-servico | paginas/servicos-consultoria-fiscal.md |
| Consultoria Financeira | consultoria-financeira | servicos | page-servico | paginas/servicos-consultoria-financeira.md |
| Gestão de Projetos e Processos | gestao-de-projetos-e-processos | servicos | page-servico | paginas/servicos-gestao-de-projetos-e-processos.md |
| Sindicância | sindicancia | servicos | page-servico | paginas/servicos-sindicancia.md |
| Condomínios | condominios | — | page-landing | paginas/condominios.md |
| Como trabalhamos | como-trabalhamos | — | page | paginas/como-trabalhamos.md |
| Fireflies Academy | academy | — | page-academy | paginas/academy.md |
| Sobre | sobre | — | page | paginas/sobre.md |
| Blog | blog | — | home (página de posts) | paginas/blog.md |
| Contato | contato | — | page-contato | paginas/contato.md |
| Política de Privacidade | politica-de-privacidade | — | page-legal | paginas/politica-de-privacidade.md |
| Termos de Uso | termos-de-uso | — | page-legal | paginas/termos-de-uso.md |

Templates FSE esperados: `front-page`, `page`, `page-servicos`, `page-servico`, `page-landing`, `page-academy`, `page-contato`, `page-legal`, `home`, `single`, `archive`, `category`, `tag`, `author`, `search`, `404`, `single-curso`, `archive-curso`, `taxonomy-trilha`.

### 4.2 Posts (post type `post`)
- **Campos:** título, slug, excerpt (lead do cabeçalho), categoria principal (a primeira da lista; o Rank Math e o Yoast permitem marcar a principal), categorias secundárias (no máximo 1), tags (de 3 a 6), autor e imagem destacada de 1200×675.
- **Metas do `fireflies-core`:** `_ff_tempo_leitura` (minutos, calculado automaticamente e editável), `_ff_eyebrow` (linha mono acima do H1) e `_ff_atualizado_em` (data de revisão exibida quando difere da publicação).
- **Estrutura editorial padrão:** cabeçalho → aviso informativo com data de corte → corpo com H2 numerados quando houver mais de 4 seções → blocos editoriais → `passos` → `base-legal` → fontes → `cta-post` → leituras relacionadas.
- **Blocos editoriais** (do plugin, para sobreviver à troca de tema): `nossa-leitura` (variantes leitura, recomendação e orientação), `em-aberto`, `base-legal`, `consulte-na-integra`, `passos`, `citacao-norma`, `citacao-destaque`, `aviso-informativo`, `tabela`, `lista-codigos`, `linha-do-tempo`, `matriz-situacao`, `comparacao-neq`, `fontes`, `cta-post`. A lista completa está em `wxr-spec.json` → `blocos_editoriais_fireflies_core`.
- **Comentários:** desativados.

### 4.3 Categorias do blog
| Slug | Nome | Descrição (aparece no arquivo e na meta description da categoria) |
|---|---|---|
| reforma-tributaria | Reforma Tributária | IBS, CBS, Imposto Seletivo, NFS-e e os novos cadastros: cada norma publicada, o que muda e o que fazer, separando o que já está definido do que ainda está em aberto. |
| condominios | Condomínios | Para síndicos, conselhos e administradoras: prestação de contas, orçamento, fundo de reserva, inadimplência e auditoria, sempre com a base legal citada. |
| fiscal | Fiscal | Regimes tributários, apuração, obrigações acessórias e planejamento tributário dentro da lei, explicados para quem decide. |
| contabil | Contábil | Fechamento mensal, conciliação, demonstrações e contabilidade gerencial em linguagem de dono: o que cada número quer dizer. |
| gestao-financeira | Gestão Financeira | Caixa, orçamento, indicadores e painel mensal: como decidir com o número do mês, em empresas e condomínios. |
| academy | Academy | Conteúdo da Fireflies Academy: conceitos explicados, materiais de apoio e novidades das turmas in company e online. |

Categoria padrão: `condominios` (troca de "Sem categoria").

### 4.4 Tags
São livres, mas seguem uma lista controlada para não pulverizar: `nfs-e`, `ibs-cbs`, `lc-214-2025`, `codigo-civil`, `lei-do-inquilinato`, `cib`, `emissor-nacional`, `administradoras`, `sindico`, `conselho-fiscal`, `prestacao-de-contas`, `fundo-de-reserva`, `previsao-orcamentaria`, `inadimplencia`, `auditoria`, `dre`, `fluxo-de-caixa`, `conciliacao-bancaria`, `regime-tributario`, `simples-nacional`, `treinamento`. Os arquivos de tag ficam com **noindex, follow**.

### 4.5 CPT `curso` e taxonomia `trilha` (plugin `fireflies-core`)
- **`curso`:**
  - rewrite `academy/cursos` (with_front false), arquivo em `academy/cursos`, `show_in_rest`;
  - supports: title, editor, excerpt, thumbnail, page-attributes (ordem) e custom-fields;
  - metas: `_ff_carga_horaria` (), `_ff_formato` (in-company e/ou online), `_ff_nivel`, `_ff_publico`, `_ff_pre_requisito`, `_ff_certificado` (bool), `_ff_observacao`.
- **`trilha`:** hierárquica, rewrite `academy/trilha`. Termos e descrições:

| Slug | Nome | Descrição | Curso |
|---|---|---|---|
| contabil | Contábil | Ler e usar a contabilidade para decidir: balanço, DRE, fluxo de caixa e fechamento. | Contabilidade para Gestores |
| fiscal | Fiscal | Regimes, apuração e planejamento tributário dentro da lei, com a transição da Reforma Tributária. | Planejamento Tributário na Prática |
| financeiro | Financeiro | Análise de demonstrações, indicadores, caixa e capital de giro. | Análise de Demonstrações Financeiras |
| auditoria | Auditoria | Riscos, controles, testes e relatórios que a diretoria e o conselho usam. | Auditoria Interna: Fundamentos |
| condominios | Condomínios | Gestão financeira, prestação de contas e conferência para síndicos, conselheiros e administradoras. | Gestão Financeira de Condomínios |
| tecnologia | Tecnologia | ERP e automação a serviço do controle: cadastros, rotinas e fechamento dentro do sistema. | ERP: do Básico ao Avançado |

As trilhas espelham os rótulos do site antigo. Hoje cada uma tem um curso; a taxonomia existe para crescer sem mudar URL.

### 4.6 Patterns
Os nomes usados em `paginas/*.md` (`hero-anil`, `hero-claro`, `faixa-provas`, `servicos-lista`, `constelacao-servicos`, `texto-manifesto`, `painel-mensal`, `raio-x-condominio`, `passos-30-dias`, `diferenciais-grid`, `triagem-3-perguntas`, `responsavel`, `academy-cursos`, `posts-recentes`, `posts-relacionados`, `faq`, `cta-diagnostico`, `cta-whatsapp`, `lista-sinais`, `escopo-lista`, `entregaveis-lista`, `servicos-relacionados`, `nota-destaque`, `publicos-colunas`, `comparativo-duas-colunas`, `linha-do-tempo`, `destaque-artigo`, `valores-lista`, `dados-institucionais`, `contato-form`, `texto-legal`, `filtro-categorias`, `post-destaque`, `posts-lista`, `curso-cabecalho`, `texto-curso`, `programa-modulos`) estão descritos em `wxr-spec.json` → `patterns`. A regra visual vale para todos: fios finos, mono para rótulos e números grandes em Sora. Nada de cards arredondados, pílulas ou ícones em círculo.

---

## 5. Estratégia de SEO

### 5.1 Princípios
- **Foco local e de nicho.** Prioridade: "auditoria de condomínio São Paulo" e "consultoria contábil SP", conforme a plataforma de marca. A concorrência local nessas buscas é formada sobretudo por pequenos escritórios e anúncios em diretórios. Um conteúdo editorial com base legal citada é o diferencial que eles não têm.
- **Desambiguação.** "Fireflies Consultoria" aparece em todo title, no schema `Organization.name` e no `alternateName` "Fireflies Consultoria Contábil". O `sameAs` aponta para o LinkedIn, o Instagram @firefliesconsultoria e o Google Business Profile.
- **Uma intenção por URL.** Página de serviço para a intenção transacional, post para a informacional e landing para o público.
- **E-E-A-T:** autor real com bio e CRC, data de corte do conteúdo, base legal literal, aviso informativo e "Consulte na íntegra".

### 5.2 Palavra-chave, title, meta description, slug e schema por URL
Titles com até cerca de 60 caracteres e metas com até 155 caracteres (contagem entre parênteses, conferida por script). O slug está na URL.

| URL | Palavra-chave principal | Title (car.) | Meta description (car.) | Schema |
|---|---|---|---|---|
| `/` | consultoria contábil SP | Fireflies Consultoria · Consultoria contábil e fiscal em SP (59) | Consultoria financeira, contábil e fiscal em São Paulo, especialista em auditoria de condomínios. Painel mensal explicado e um contador que assina. (147) | [Organization, AccountingService, WebSite (SearchAction)] |
| `/servicos/` | consultoria contábil e fiscal para empresas | Serviços de consultoria contábil e fiscal | Fireflies Consultoria (65) | Auditoria de condomínios, consultoria contábil, fiscal e financeira, processos e sindicância em São Paulo, com um contador responsável do início ao fim. (152) | [CollectionPage, ItemList (Service × 6), BreadcrumbList] |
| `/servicos/auditoria-de-condominios/` | auditoria de condomínio São Paulo | Auditoria de condomínio em São Paulo | Fireflies Consultoria (60) | Auditoria da prestação de contas do condomínio em SP: receitas, despesas, contratos e fundo de reserva, com relatório executivo para o conselho. (144) | [Service (serviceType "Auditoria de condomínio", provider AccountingService, areaServed São Paulo), FAQPage, BreadcrumbList] |
| `/servicos/consultoria-contabil/` | consultoria contábil SP | Consultoria contábil em São Paulo | Fireflies Consultoria (57) | Consultoria contábil em SP: fechamento mensal no prazo, plano de contas revisado, DRE explicada em reunião e troca de contabilidade sem ruptura. (144) | [Service (serviceType "Consultoria contábil"), FAQPage, BreadcrumbList] |
| `/servicos/consultoria-fiscal/` | consultoria fiscal e tributária SP | Consultoria fiscal e tributária em SP | Fireflies Consultoria (61) | Consultoria fiscal em São Paulo: revisão de regime, conferência de guias, planejamento tributário dentro da lei e preparação para a Reforma Tributária. (151) | [Service (serviceType "Consultoria fiscal"), FAQPage, BreadcrumbList] |
| `/servicos/consultoria-financeira/` | consultoria financeira para empresas SP | Consultoria financeira para empresas | Fireflies Consultoria (60) | Consultoria financeira em São Paulo: fluxo de caixa, orçamento, indicadores e painel mensal explicado em reunião por um contador responsável. (141) | [Service (serviceType "Consultoria financeira"), FAQPage, BreadcrumbList] |
| `/servicos/gestao-de-projetos-e-processos/` | mapeamento de processos financeiros | Gestão de projetos e processos financeiros | Fireflies Consultoria (66) | Mapeamento de processos financeiros, implantação e revisão de ERP e automação de rotinas, para que o controle continue depois do projeto. (137) | [Service (serviceType "Consultoria em processos e ERP"), FAQPage, BreadcrumbList] |
| `/servicos/sindicancia/` | sindicância em condomínio | Sindicância em condomínios e empresas | Fireflies Consultoria (61) | Sindicância em condomínios e empresas em SP: apuração independente de fatos com análise documental, cronologia e relatório técnico assinado. (140) | [Service (serviceType "Sindicância"), FAQPage, BreadcrumbList] |
| `/condominios/` | consultoria para condomínios em São Paulo | Consultoria para condomínios em São Paulo | Fireflies Consultoria (65) | Fireflies Condomínios: auditoria, conferência de contas e relatório para o conselho em São Paulo. Para síndicos, conselhos e administradoras. (141) | [WebPage, Service (audience: síndicos), FAQPage, BreadcrumbList] |
| `/como-trabalhamos/` | diagnóstico financeiro gratuito | Como trabalhamos: 30 dias até a primeira luz | Fireflies Consultoria (68) | Diagnóstico gratuito, organização, primeiro fechamento em 30 dias e painel mensal explicado em reunião, com o mesmo contador responsável. (137) | [WebPage, HowTo (4 etapas), BreadcrumbList] |
| `/academy/` | treinamento in company contabilidade | Fireflies Academy · Treinamentos in company e online (52) | Treinamentos in company e online em contabilidade, fiscal, finanças, auditoria, ERP e condomínios, com certificado da Fireflies Academy. (136) | [CollectionPage, ItemList (Course × 6), BreadcrumbList] |
| `/sobre/` | Gabriel Alvares contador | Sobre a Fireflies Consultoria e Gabriel Alvares (47) | A Fireflies Consultoria é conduzida por Gabriel Alvares, contador responsável com mais de 8 anos em contabilidade, auditoria e gestão financeira. (145) | [AboutPage, Person (Gabriel Alvares, jobTitle, worksFor), Organization, BreadcrumbList] |
| `/blog/` | blog contabilidade condomínio e reforma tributária | Blog: condomínios, fiscal e Reforma Tributária | Fireflies Consultoria (70) | O que mudou na lei e o que fazer: artigos sobre condomínios, Reforma Tributária, fiscal, contabilidade e gestão financeira, com base legal citada. (146) | [Blog, CollectionPage, BreadcrumbList] |
| `/contato/` | diagnóstico gratuito consultoria contábil | Contato e diagnóstico gratuito | Fireflies Consultoria (54) | Agende o diagnóstico gratuito com a Fireflies Consultoria: WhatsApp +55 11 98245-0527, contato@fireflies.com.br, de segunda a sexta, das 8h às 18h. (147) | [ContactPage, AccountingService (contactPoint, openingHoursSpecification Mo-Fr 08:00-18:00), BreadcrumbList] |
| `/politica-de-privacidade/` | política de privacidade Fireflies Consultoria | Política de Privacidade | Fireflies Consultoria (47) | Como a Fireflies Consultoria trata dados pessoais no site, no atendimento, nos serviços contábeis e na Academy, conforme a LGPD (Lei 13.709/2018). (146) | [WebPage, BreadcrumbList] |
| `/termos-de-uso/` | termos de uso Fireflies Consultoria | Termos de Uso | Fireflies Consultoria (37) | Regras de uso do site da Fireflies Consultoria: conteúdo informativo, ferramentas ilustrativas, propriedade intelectual e responsabilidade. (139) | [WebPage, BreadcrumbList] |
| `/academy/cursos/analise-de-demonstracoes-financeiras/` | curso análise de demonstrações financeiras | Análise de Demonstrações Financeiras · curso | Fireflies Academy (64) | Curso de análise de balanço, DRE e fluxo de caixa: análise vertical e horizontal, indicadores de liquidez, rentabilidade e endividamento. (137) | Course, BreadcrumbList |
| `/academy/cursos/auditoria-interna-fundamentos/` | curso de auditoria interna | Auditoria Interna: Fundamentos · curso | Fireflies Academy (58) | Curso de fundamentos de auditoria interna: riscos, controles, amostragem, papéis de trabalho e relatório, com exercícios práticos. (130) | Course, BreadcrumbList |
| `/academy/cursos/contabilidade-para-gestores/` | curso contabilidade para gestores | Contabilidade para Gestores · in company | Fireflies Academy (60) | Curso in company ou online para gestores sem formação contábil: balanço, DRE, fluxo de caixa e indicadores, com exemplos da sua empresa. (136) | Course, BreadcrumbList |
| `/academy/cursos/erp-do-basico-ao-avancado/` | treinamento ERP financeiro | ERP: do Básico ao Avançado · treinamento | Fireflies Academy (60) | Treinamento de ERP para equipes financeiras: cadastros, compras, contas a pagar e a receber, fechamento, relatórios e integração com a contabilidade. (149) | Course, BreadcrumbList |
| `/academy/cursos/gestao-financeira-de-condominios/` | curso gestão financeira de condomínios | Curso de Gestão Financeira de Condomínios | Fireflies Academy (61) | Curso para síndicos e conselheiros: previsão orçamentária, prestação de contas, fundo de reserva, inadimplência e leitura do balancete. (135) | Course, BreadcrumbList |
| `/academy/cursos/planejamento-tributario-na-pratica/` | curso planejamento tributário | Planejamento Tributário na Prática | Fireflies Academy (54) | Curso de planejamento tributário dentro da lei: regimes, comparação com números reais, documentação, riscos e a transição para IBS e CBS. (137) | Course, BreadcrumbList |
| `/blog/nfse-condominios-codigo-99-05-01/` | NFS-e condomínio | NFS-e para condomínios: o código 99.05.01 | Fireflies Consultoria (65) | Ato Técnico Conjunto nº 7: condomínios ganham o código 99.05.01 na NFS-e. O que muda, o que está em aberto e 10 passos até 01/12/2026. (134) | [BlogPosting (author Person Gabriel Alvares, publisher Organization, datePublished 2026-10-02, dateModified), BreadcrumbList] |
| `/blog/fundo-de-reserva-nao-e-caixa-do-mes/` | fundo de reserva condomínio | Fundo de reserva do condomínio não é caixa do mês | Fireflies (61) | Fundo de reserva não é caixa do mês: o que dizem a convenção, o Código Civil e a Lei do Inquilinato, quem paga a reposição e 5 passos para o síndico. (149) | [BlogPosting, BreadcrumbList] |
| `/blog/sinais-auditoria-condominio/` | quando fazer auditoria no condomínio | 5 sinais de que o condomínio precisa de auditoria | Fireflies (61) | Prestação de contas sem documento, saldo que não bate, fundo de reserva pagando o mês: 5 sinais de que é hora de auditar, com a base legal. (139) | [BlogPosting, ItemList (5 sinais), BreadcrumbList] |

**Arquivos de taxonomia**
- **Categoria:** title "{Categoria} · Blog | Fireflies Consultoria"; a meta é a descrição da categoria (seção 4.3), cortada em 155 caracteres.
- **Trilha:** title "Trilha {nome} · Fireflies Academy"; a meta é a descrição da trilha.
- **Autor:** title "Gabriel Alvares, contador responsável | Fireflies Consultoria", com schema `ProfilePage` + `Person`.
- **Tag, busca e paginação acima de 1:** noindex, follow.

### 5.3 Schema (via Rank Math/Yoast; o `fireflies-core` gera o básico se nenhum plugin estiver ativo)
- **Global:**
  - `Organization` + `AccountingService` (subtipo de LocalBusiness), com name "Fireflies Consultoria", url, logo, telephone +55-11-98245-0527, email, `areaServed` "São Paulo, SP", `openingHoursSpecification` seg–sex 08:00–18:00, `address` e `founder` → Person Gabriel Alvares;
  - `WebSite` com `SearchAction`.
- **Serviços:** `Service` com `provider` → AccountingService, `serviceType` e `areaServed`. O `FAQPage` só quando houver FAQ visível; desde 2023 o Google limita o resultado rico de FAQ, mas a marcação continua válida.
- **Posts:** `BlogPosting` com `author` (Person, url `/blog/autor/gabriel-alvares/`), `datePublished`, `dateModified`, `publisher` e `image`.
- **Cursos:** `Course` com `provider` e `hasCourseInstance` (`courseMode`: "onsite" e "online"). Sem `offers` enquanto não houver preço público.
- **Em todas as páginas internas:** `BreadcrumbList`.

### 5.4 Linkagem interna
| De | Para | Âncora sugerida |
|---|---|---|
| Início (servicos-lista) | as 6 páginas de serviço | nome do serviço |
| Início (raio-x) | /condominios/, /contato/?assunto=auditoria-de-condominios | "Conhecer a linha Condomínios", "Fazer o raio-X com os números reais" |
| /condominios/ | /servicos/auditoria-de-condominios/ | "auditoria da prestação de contas" |
| /condominios/ | post NFS-e, curso Gestão Financeira de Condomínios, /servicos/sindicancia/ | título do post / do curso |
| /servicos/auditoria-de-condominios/ | post 03 (5 sinais), /condominios/, /servicos/sindicancia/ | "5 sinais de que as contas do condomínio pedem auditoria" |
| Cada serviço | 3 serviços relacionados + posts da categoria | nome do serviço |
| Post 01 (NFS-e) | posts 02 e 03, /servicos/auditoria-de-condominios/ | título |
| Post 02 (fundo de reserva) | post 03, post 01, curso de condomínios | título |
| Post 03 (5 sinais) | post 02, /servicos/auditoria-de-condominios/, /servicos/sindicancia/ | "Fundo de reserva não é caixa do mês", "auditoria" |
| Posts Contábil/Gestão Financeira | /servicos/consultoria-contabil/ ou /servicos/consultoria-financeira/, /como-trabalhamos/ | "painel mensal", "fechamento mensal" |
| Posts Fiscal/Reforma | /servicos/consultoria-fiscal/ | "consultoria fiscal" |
| Cursos | curso seguinte da trilha + serviço relacionado | nome do curso |
| /academy/ | os 6 cursos | nome do curso |
| Rodapé (global) | 6 serviços + páginas institucionais | nome |

Regra: todo post tem pelo menos 1 link para uma página de serviço e 2 para posts. Toda página de serviço recebe pelo menos 3 links internos de posts nos três primeiros meses.

### 5.5 Técnico
- Sitemap XML do plugin de SEO com páginas, posts, cursos, categorias e trilhas; tags excluídas.
- Canonical autorreferente. A paginação do blog usa `/blog/page/N/`.
- OG images: genérica, Condomínios e Academy (ver `midia_necessaria` no JSON).
- Google Business Profile: categoria "Consultor contábil" ou "Serviço de auditoria", com a mesma NAP do rodapé assim que o endereço for confirmado.
- 301 das URLs do site antigo. O site antigo era uma página única com âncoras, então o principal é preservar `/`.

---

## 6. Pauta editorial · outubro a dezembro de 2026 (12 posts)

Cadência semanal, às sextas. Os 3 primeiros já estão escritos em `posts/`; os 9 seguintes vão no WXR como **rascunhos** (título, slug, categoria, palavra-chave e resumo), para o Gabriel completar. Regra de pauta: nenhum número de mercado sem fonte, toda afirmação legal com artigo citado e conferida no texto compilado do Planalto na véspera da publicação.

| # | Data | Título | Categoria | Palavra-chave | Resumo | Status |
|---|---|---|---|---|---|---|
| 1 | 02/10 | Novidades da Receita em 01/10/2026: condomínios ganham código próprio na NFS-e | reforma-tributaria | NFS-e condomínio | O Ato Técnico Conjunto nº 7 cria o código 99.05.01 e um grupo próprio para as cobranças do condomínio. O que muda, o que está em aberto e 10 passos até 01/12/2026. | escrito · posts/post-01-nfse-condominios.md |
| 2 | 09/10 | Fundo de reserva não é caixa do mês | condominios | fundo de reserva condomínio | Para que serve o fundo, como identificar quando ele está pagando despesa ordinária e quem paga a reposição segundo a Lei do Inquilinato. | escrito · posts/post-02-fundo-de-reserva.md |
| 3 | 16/10 | 5 sinais de que as contas do condomínio pedem auditoria | condominios | quando fazer auditoria no condomínio | Prestação de contas sem documento, saldo que não bate, fundo pagando o mês, orçamento x realizado e inadimplência sem relatório, com a base legal do Código Civil. | escrito · posts/post-03-sinais-auditoria-condominio.md |
| 4 | 23/10 | DRE em linguagem de dono: como ler o resultado do mês em dois minutos | contabil | como ler DRE | As cinco linhas que importam na DRE, a diferença entre margem bruta e líquida e as três perguntas para fazer ao contador todo mês. | pauta |
| 5 | 30/10 | Prestação de contas do síndico: o que a lei exige e o que o conselho deve conferir | condominios | prestação de contas condomínio | O que dizem os arts. 1.348, 1.350 e 1.356 do Código Civil, o que deve vir na pasta de prestação de contas e um roteiro de conferência para o conselho. | pauta |
| 6 | 06/11 | Reforma Tributária: o que já vale em 2026 e o que muda em 2027 para a sua empresa | reforma-tributaria | reforma tributária 2027 CBS empresas | O calendário de transição da EC 132/2023 e da LC 214/2025 em linguagem prática: notas, cadastros, preço e caixa. Conferir cada data na norma antes de publicar. | pauta |
| 7 | 13/11 | Conciliação bancária: por que o saldo do extrato não bate com o contábil | contabil | conciliação bancária | As causas mais comuns de diferença (lançamento duplicado, tarifa sem registro, recebimento em trânsito) e uma rotina mensal de conciliação. | pauta |
| 8 | 20/11 | Previsão orçamentária do condomínio: como montar para a assembleia | condominios | previsão orçamentária condomínio | Do realizado ao orçado: como projetar despesas, inadimplência e fundo de reserva e apresentar o orçamento para aprovação (CC, arts. 1.348, VI, e 1.350). | pauta |
| 9 | 27/11 | Lucro não é caixa: por que a empresa lucra e o dinheiro falta | gestao-financeira | lucro x fluxo de caixa | Competência x caixa, prazos de recebimento e pagamento, estoque e investimentos: onde o lucro fica preso e como o fluxo de caixa projetado mostra isso antes. | pauta |
| 10 | 04/12 | Atraso na taxa de condomínio: multa, juros e correção depois da Lei 14.905/2024 | condominios | juros condomínio atraso | O que mudou no art. 1.336, § 1º, do Código Civil: multa de até 2%, juros convencionados ou os do art. 406 e correção monetária. Como conferir o cálculo no boleto. | pauta |
| 11 | 11/12 | Simples, Presumido ou Real: revise o regime antes de janeiro | fiscal | qual regime tributário escolher | Por que a revisão precisa acontecer antes do prazo de opção no início do ano, quais números levar e como comparar regimes com dados reais, dentro da lei. | pauta |
| 12 | 18/12 | Contabilidade para quem não é contador: 10 termos que todo gestor precisa conhecer | academy | termos contábeis para gestores | Competência, provisão, depreciação, EBITDA, capital de giro e outros termos explicados em uma frase cada, com link para o curso Contabilidade para Gestores. | pauta |

**Pauta reativa (fora da contagem):** "Atualização: cronograma de implantação do código 99.05.01", assim que a Receita e o Comitê Gestor publicarem a data. O post 01 promete essa atualização.

**Distribuição:** Condomínios 5 · Reforma Tributária 2 · Contábil 2 · Gestão Financeira 1 · Fiscal 1 · Academy 1. O peso em Condomínios segue a especialidade e a prioridade de SEO.

---

## 7. Pendências antes de publicar
1. CRC-SP do Gabriel, razão social, CNPJ e endereço (rodapé, Sobre, Contato, schema e páginas legais).
2. Foto real do Gabriel. Sem banco de imagem.
3. Percentuais de referência do raio-X, definidos pelo responsável técnico.
4. Carga horária, formato de turmas abertas e instrutores dos cursos.
5. Link da live citada no post 01.
6. Revisão jurídica da Política de Privacidade, dos Termos de Uso e do escopo de Sindicância. Indicação do encarregado de dados.
7. Ferramentas reais (hospedagem, formulário, analytics, plugin de cookies), para completar a política.
