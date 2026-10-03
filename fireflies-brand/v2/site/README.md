# Site Fireflies Consultoria · WordPress

> **Atenção na instalação:** no WordPress, envie só os arquivos de `dist/`, cada um no seu lugar:
> - `dist/fireflies-core.zip` em **Plugins → Adicionar novo → Enviar plugin**
> - `dist/fireflies-tema.zip` em **Aparência → Temas → Adicionar novo → Enviar tema**
> - `fireflies-conteudo.xml` em **Ferramentas → Importar → WordPress**
> - **Formulário de contato:** instale e ative o **Contact Form 7** (Plugins → Adicionar novo). Ao abrir o painel, o Fireflies Core (1.0.2+) cria sozinho o formulário "Diagnóstico gratuito" e a página de contato passa a exibi-lo. Não é preciso importar nada. Sem o CF7, a página mostra WhatsApp e e-mail.
> - **Na importação do XML**, em "Atribuir autores", escolha **atribuir os posts a um usuário existente** (o seu). Se escolher "criar novo usuário" com um login que já existe, o WordPress mostra "Falha ao criar novo usuário", o que é inofensivo: os posts ficam com o seu usuário.
> - **Imagem de compartilhamento:** já vem dentro do plugin, e não é preciso importar mídia. Para usá-la como imagem de destaque de um post, envie `midia/og-fireflies-consultoria.png` em Mídia.
>
> O pacote geral (com README, previews e conteúdo) **não é um tema**. Enviado como tema, o WordPress responde "o tema não possui uma folha de estilos style.css".


Tema de blocos **Fireflies** + plugin **Fireflies Core** + conteúdo pronto para importar (WXR).
Identidade v2 "Carta do Lume": Anil de Junho, Cal Virgem, um único Âmbar de luz, Vermelhão de Rubrica; Sora, IBM Plex Sans e IBM Plex Mono locais.

| Pasta / arquivo | O que é |
|---|---|
| `dist/fireflies-tema.zip` | Tema, instalável em Aparência › Temas › Adicionar › Enviar |
| `dist/fireflies-core.zip` | Plugin, instalável em Plugins › Adicionar › Enviar |
| `fireflies-conteudo.xml` | WXR: 16 páginas, 3 posts publicados + 9 rascunhos da pauta, 6 cursos, categorias, trilhas, tags, 6 navegações, formulário do Contact Form 7, imagem OG |
| `midia/` | Imagem OG padrão usada como destaque do post NFS-e (subir à Biblioteca se o importador não baixar) |
| `wp-content/` | Código-fonte do tema e do plugin |
| `build/` | Scripts que montam o conteúdo a partir de `conteudo/*.md` (wp-cli) e regeram os padrões |
| `conteudo/` | Textos finais, arquitetura e `wxr-spec.json` |
| `previews/` | Capturas 1440 e 390 px, editor do site e `prancha-site.png` |

## 1. Requisitos

- WordPress **6.6 ou superior** (testado no 7.1.2) e PHP **8.1+**.
- Instalação na **raiz do domínio** (`https://fireflies.com.br/`). O conteúdo usa caminhos relativos à raiz para imagens do tema (`/wp-content/themes/fireflies/assets/…`) e links internos.
- Idioma pt_BR, fuso America/Sao_Paulo.

## 2. Instalação

1. **Plugin primeiro:** Plugins › Adicionar › Enviar plugin › `fireflies-core.zip` › Ativar. Ele registra o tipo `curso`, a taxonomia `trilha`, os blocos e os estilos editoriais; sem ele o WXR importa cursos sem destino.
2. **Tema:** Aparência › Temas › Adicionar › Enviar tema › `fireflies-tema.zip` › Ativar.
3. **Contact Form 7** (recomendado, antes da importação, para o formulário vir junto): instale e ative.
4. **Links permanentes:** a partir da versão 1.0.4, o plugin configura sozinho no primeiro carregamento (site ou painel) depois da importação: estrutura personalizada `/blog/%postname%/`, base de categoria `blog/categoria` e base de tag `blog/tag`. Não use "Nome do post", porque o conteúdo liga os posts em `/blog/{slug}/`. (O autor fica em `/blog/autor/` pelo plugin. Páginas e cursos não levam `/blog/`.)
5. **Importar o conteúdo:** Ferramentas › Importar › WordPress (instale o importador) › `fireflies-conteudo.xml`. Atribua os posts ao usuário `gabriel-alvares` (ou crie-o). Marque "Baixar e importar anexos" só se o domínio antigo estiver no ar; caso contrário suba `midia/og-fireflies-consultoria.png` à mão e defina-a como imagem destacada do post NFS-e.
6. **Configurações › Leitura:** o plugin (1.0.4+) define sozinho a página inicial (**Início**) e a página de posts (**Blog**) quando você abre o painel depois da importação. Se já existia uma página "Início" vazia (criada pela hospedagem ou à mão), a importada vira `inicio-2`. O plugin usa a que tem conteúdo e passa a vazia para rascunho (`inicio-antiga`), sem apagar nada. Se a home ainda aparecer vazia, limpe o cache (SpeedyCache, LiteSpeed etc.) e confira aqui: "Uma página estática", Início / Blog, 9 posts por página.
7. **Configurações › Privacidade:** página = **Política de Privacidade**.
8. **Configurações › Geral › Fireflies Consultoria:** WhatsApp (`5511982450527`), e-mail, horário, shortcode do formulário (`[contact-form-7 id="…" title="Diagnóstico gratuito"]`) e, se houver, da newsletter. Sem formulário configurado, o slot mostra WhatsApp + e-mail.
9. Salve os links permanentes mais uma vez (garante `/academy/cursos/…`).

### Plugins recomendados

| Função | Plugin | Observação |
|---|---|---|
| SEO | **Rank Math** (ou Yoast) | O WXR já traz title, meta e palavra-chave em `rank_math_*` e `_yoast_wpseo_*`. Com um deles ativo, o schema e o OG do Fireflies Core se desligam sozinhos. Tags e busca: noindex. |
| Formulário | **Contact Form 7** | Formulário "Diagnóstico gratuito" já vem no WXR (campos, mensagens, consentimento LGPD). |
| E-mail | **WP Mail SMTP** | Envio autenticado (SPF/DKIM) para contato@fireflies.com.br. |
| Cookies/LGPD | **Complianz** ou **CookieYes** | O rodapé tem o link "Preferências de cookies" (`#preferencias-cookies`); ajuste a âncora conforme o plugin. Carregar o GA4 só após consentimento. |
| Redirecionamentos | **Redirection** (ou o módulo do Rank Math) | Para os 301 do go-live. |

Não use page builder nem plugins que tragam jQuery para o front: o tema não precisa.

## 3. Como editar

### Páginas
- Cada página é feita de **seções** (grupos sangrados em Branco, Cal ou Anil). Abra a página, use a **Visão em lista** (Shift+Alt+O) para navegar pelas seções e edite o texto direto.
- Para acrescentar seções: Inserir (+) › **Padrões › Fireflies: páginas**. Principais: Hero Anil, Abertura clara (Cal), Serviços em índice editorial, Números em destaque, 30 dias até a primeira luz, Painel mensal, Raio-X do condomínio, Responsável técnico, Academy: cursos, Perguntas frequentes, Chamada: diagnóstico, Chamada: WhatsApp, Blog: destaques/lista, Contato, Citação em Anil, Tabela editorial, Manifesto, Diferenciais, Públicos, Linha do tempo, Nota em destaque, Por onde começar, Newsletter.
- Fundo de uma seção: selecione o grupo › Estilos › **Noite (Anil)** ou **Cal Virgem**. Regra da marca: uma luz Âmbar por composição; no claro o destaque é Rubrica.
- Modelos (barra lateral › Modelo): *Página de serviço*, *Serviços (índice)*, *Página composta, abertura em Anil*, *Página composta, abertura clara*, *Academy*, *Contato*, *Texto legal*.
- Cabeçalho, rodapé, menus e modelos do blog: **Aparência › Editor**. O menu principal está dentro do cabeçalho (bloco Navegação).
- Emblemas de serviço (constelações) e logos estão em `wp-content/themes/fireflies/assets/img/`.
- O retrato do Sobre é um provisório (F em órbita sobre Anil): troque a imagem pela foto real do Gabriel.

### Posts (blog)
1. Posts › Adicionar. Título, **Resumo** (vira a abertura do cabeçalho Anil), categoria principal primeiro, 3 a 6 tags, imagem destacada 1200×675.
2. Painel **Fireflies: cabeçalho do post** (barra lateral): eyebrow (linha mono acima do título), tempo de leitura (calculado ao salvar; se você mudar, o seu valor vale) e data de atualização.
3. Componentes: Inserir › **Padrões › Fireflies: editoriais de post**:
   - **Nossa leitura** (interpretação/recomendação, Anil), **Em aberto** (o que a norma não definiu), **Base legal** (fonte em mono + citação literal), **Consulte na íntegra** (fontes numeradas), **Passos com checklist** (o leitor marca e o progresso fica no navegador quando a lista tem a classe `ff-com-progresso`), **Você sabe?**, **Nota de margem**, **Índice do post**.
   - Também como estilos de bloco: parágrafo *Aviso informativo*, *Estado: em dia/atenção/crítico*; lista *Estrelas*, *Códigos em colunas*, *Linha do tempo*, *Fontes numeradas*; citação *Citação de norma* e *Citação em destaque (Anil)*; tabela *Códigos*, *Matriz de situação*, *Números à direita*.
4. Títulos H2 viram o índice automaticamente. Posts relacionados (mesma categoria) e a chamada de diagnóstico entram pelo modelo.
5. O post **NFS-e para condomínios** é a referência de uso de todos os componentes. Os 9 posts da pauta (out–dez) estão como rascunho, com palavra-chave e resumo.

### Cursos (Academy)
Academy › Adicionar curso: título, resumo, conteúdo (Descrição, Para quem é, Programa com lista *Fontes numeradas*, Formato), trilha e o painel **Fireflies: ficha do curso** (carga horária, formato, nível, público, pré-requisito, certificado). Ordem pelo campo "Ordem" (atributos). Lista em `/academy/` e `/academy/cursos/`, trilhas em `/academy/trilha/{slug}/`.

### Shortcodes e blocos do plugin
`[fireflies_whatsapp texto="…" mensagem="…" estilo="botao|contorno|link"]` (também bloco *Botão de WhatsApp*), `[fireflies_formulario]`, `[fireflies_newsletter]`, `[fireflies_raio_x]` (simulador ilustrativo; percentuais no filtro `fireflies_raio_x_referencias`), `[fireflies_indice]`, `[fireflies_tempo_leitura]`, `[fireflies_trilhas]`; blocos *Tempo de leitura*, *Eyebrow do post*, *Índice do post*, *Ficha do curso*.

### Mapa dos patterns do conteúdo
Os nomes citados em `conteudo/paginas/*.md` foram mapeados assim: `hero-claro` → *hero-cal*; `faixa-provas` → *numeros-destaque*; `texto-manifesto` → *manifesto*; `raio-x-condominio` → *condominios-raio-x* (com o simulador do plugin); `diferenciais-grid` e `entregaveis-lista` → *diferenciais*; `triagem-3-perguntas` → *por-onde-comecar* (sem JS: 4 caminhos com mensagem pronta no WhatsApp); `responsavel` → *sobre-responsavel*; `posts-recentes`/`posts-relacionados` → *blog-destaques* (filtro por categoria via `"ffCategoria"` na consulta); `posts-lista`/`post-destaque`/`filtro-categorias` → modelo *home*; `escopo-lista` → *tabela-editorial*; `lista-sinais` → lista *Estrelas*; `publicos-colunas` → *publicos*; `contato-form` → *contato*; `texto-legal` → modelo *Texto legal* com índice lateral; `curso-cabecalho`, `texto-curso`, `programa-modulos` → modelo *single-curso*; `constelacao-servicos` → diagrama SVG estático (sem interação); `servicos-relacionados` → linha com 3 emblemas. Blocos editoriais (`nossa-leitura`, `em-aberto` etc.) → estilos de bloco do Fireflies Core.

## 4. Checklist de go-live

**Antes de publicar**
- [ ] Resolver todos os **[a confirmar]** (lista abaixo). Buscar no painel por "a confirmar".
- [ ] Revisão jurídica da Política de Privacidade e dos Termos de Uso.
- [ ] Contact Form 7: enviar um teste; WP Mail SMTP configurado; e-mail chega em contato@.
- [ ] Testar os links do WhatsApp no celular.
- [ ] Usuário admin com senha forte; remover `admin/admin` se a base local for reaproveitada.

**Redirecionamentos 301** (site antigo era página única com âncoras; preservar `/`)
- [ ] Levantar as URLs indexadas do site atual (Search Console › Páginas, ou `site:fireflies.com.br`).
- [ ] Mapear no Redirection, por exemplo: `/servicos` → `/servicos/`; `/condominios` → `/condominios/`; `/sobre` → `/sobre/`; `/academy` → `/academy/`; `/contato` → `/contato/`; `/entregavel` → `/como-trabalhamos/`; `/como-comecamos` → `/como-trabalhamos/`; `/faq` → `/#perguntas-frequentes` ou `/`; `/privacidade` → `/politica-de-privacidade/`; posts antigos, se existirem → `/blog/{slug}/`. Âncoras (`/#servicos`) não precisam de 301.
- [ ] Opcional: `/academy/cursos/` → `/academy/#cursos` (decisão da arquitetura; o tema já tem o arquivo pronto).

**SEO e medição**
- [ ] Rank Math: assistente, sitemap (páginas, posts, cursos, categorias, trilhas; sem tags), noindex em tags/busca, schema Organization/AccountingService com NAP do rodapé.
- [ ] Google Search Console: verificar domínio (DNS), enviar `sitemap_index.xml`, inspecionar `/`, `/condominios/`, `/servicos/auditoria-de-condominios/` e o post NFS-e.
- [ ] GA4: propriedade + fluxo web; instalar via Site Kit ou GTM **condicionado ao consentimento** do plugin de cookies; eventos de clique em `wa.me` e envio do formulário (`wpcf7mailsent`).
- [ ] Google Business Profile com a mesma NAP do rodapé.

**Marca**
- [ ] Favicon: o plugin já serve `favicon.ico`, SVG e ícones de app; para definitivo, em Aparência › Editor › Estilos/Identidade › Ícone do site, envie `v2/logo/android-512.png` (o plugin se desliga quando há ícone do site).
- [ ] OG: imagem padrão `og-base-1200x630` (plugin) até o Rank Math assumir; gerar `og-condominios`, `og-academy` e `og-nfse-condominios` (ver `wxr-spec.json › midia_necessaria`) e testar no depurador do Facebook/LinkedIn.
- [ ] PageSpeed: fontes já em woff2 locais com preload; conferir cache de página e compressão no servidor.

## 5. Pendências [a confirmar]

CRC-SP do responsável · CNPJ e razão social · endereço · foto real do Gabriel · link da live do post 01 · carga horária dos cursos · percentuais de referência do raio-X (filtro `fireflies_raio_x_referencias` no plugin) · encarregado LGPD e e-mail de privacidade · ferramentas usadas (hospedagem, formulário, analytics) na Política · revisão jurídica de privacidade e termos · escopo de sindicância · URLs do site antigo para os 301 · data de "última atualização" da Política · ERPs atendidos no curso de ERP · URL do LinkedIn do Gabriel.

## 6. Ambiente de teste e regeneração

Montado com WordPress 7.1.2 + SQLite Database Integration + wp-cli, em `http://127.0.0.1:8080` (`php -S 127.0.0.1:8080 -t wordpress router.php`).

```bash
php build/gerar-patterns.php                       # regenera patterns do tema a partir de build/secoes.php
wp eval-file build/conteudo.php                    # recria páginas, posts, cursos, menus e formulário a partir de conteudo/
wp export --filename_format=fireflies-conteudo.xml # WXR
```

Validado: todas as 25 entradas (páginas, posts, cursos) abrem no editor de blocos sem nenhum bloco inválido; Editor do site carrega modelos e padrões (`previews/site-editor*.png`); tema e plugin instalados a partir dos zips via wp-cli sem erros.
