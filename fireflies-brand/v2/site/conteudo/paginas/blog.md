# Blog

```yaml
titulo: Blog
slug: blog
url: /blog/
parent: null
template: home            # página de posts (Configurações > Leitura); o FSE usa templates/home.html
ordem_menu: 5
seo:
  palavra_chave: blog contabilidade condomínio e reforma tributária
  secundarias: [notícias reforma tributária condomínio, dicas para síndico, gestão financeira empresa]
  title: "Blog: condomínios, fiscal e Reforma Tributária | Fireflies Consultoria"
  meta: "O que mudou na lei e o que fazer: artigos sobre condomínios, Reforma Tributária, fiscal, contabilidade e gestão financeira, com base legal citada."
  schema: [Blog, CollectionPage, BreadcrumbList]
```

---

## 1. Abertura
[pattern: hero-claro]

- **Breadcrumb:** Início / Blog
- **Eyebrow:** BLOG · FIREFLIES CONSULTORIA
- **H1:** O que mudou e o que fazer.
- **Lead:** Artigos sobre condomínios, Reforma Tributária, fiscal, contabilidade e gestão financeira. Cada texto cita a norma de origem, separa o que está definido do que ainda está em aberto e termina com um passo prático.
- **Nota (mono, com fio):** Conteúdo informativo. Não substitui a análise do contador ou do advogado do seu caso.

## 2. Filtro de categorias
[pattern: filtro-categorias]

Linha de links em mono, separados por fio (sem pílulas): TODOS · REFORMA TRIBUTÁRIA · CONDOMÍNIOS · FISCAL · CONTÁBIL · GESTÃO FINANCEIRA · ACADEMY

## 3. Destaque
[pattern: post-destaque]

- Consulta: post fixo (sticky) mais recente; na falta, o post mais recente.
- Exibe: categoria (mono), título em Sora, resumo, autor, data e tempo de leitura (meta `_ff_tempo_leitura` do plugin `fireflies-core`).

## 4. Lista de posts
[pattern: posts-lista]

- Consulta: query loop principal, 9 por página, sem o destaque.
- Cada linha: data (mono) · título · categoria · tempo de leitura. Fio fino entre linhas, sem cards.
- Paginação numerada.

## 5. Newsletter ou WhatsApp
[pattern: cta-whatsapp]

- **H2:** Receba as atualizações da Reforma Tributária para condomínios.
- **Texto:** Quando sair norma nova, a gente avisa com o resumo e o que fazer. [a confirmar: newsletter por e-mail ou lista de transmissão no WhatsApp]
- **Botão:** Quero receber pelo WhatsApp → `https://wa.me/5511982450527?text=Quero%20receber%20as%20atualiza%C3%A7%C3%B5es%20do%20blog`

---

### Textos de arquivo (templates `category.html`, `tag.html`, `author.html`, `search.html`)

- **Categoria:** H1 = nome da categoria; lead = descrição da categoria (ver `arquitetura.md`, seção 4.3).
- **Tag:** H1 = "Tag: {nome}"; lead = "Todos os artigos marcados com {nome}."
- **Autor:** H1 = nome; lead = biografia do usuário. Bio de Gabriel Alvares: "Fundador e contador responsável da Fireflies Consultoria, CRC-SP [a confirmar]. Mais de 8 anos em contabilidade, auditoria e gestão financeira, com foco em condomínios."
- **Busca:** H1 = "Resultados para “{termo}”"; sem resultados: "Nada encontrado para essa busca. Tente outro termo ou pergunte direto pelo WhatsApp."
- **404:** H1 = "Esta página saiu de órbita."; texto = "O endereço pode ter mudado. Tente a busca ou volte para o início." Botões: Ir para o início · Ver serviços.
