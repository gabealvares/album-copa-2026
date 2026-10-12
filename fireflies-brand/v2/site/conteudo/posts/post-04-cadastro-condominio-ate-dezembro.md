# Post 04 · O que o condomínio precisa fazer até dezembro (começando pelo cadastro)

```yaml
post_type: post
titulo: "Reforma tributária no condomínio: o que fazer até dezembro, começando pelo cadastro"
slug: reforma-tributaria-condominio-o-que-fazer-ate-dezembro
url: /blog/reforma-tributaria-condominio-o-que-fazer-ate-dezembro/
status: publish
data: 2026-10-07
autor: gabriel-alvares
categoria_principal: reforma-tributaria
categorias: [reforma-tributaria, condominios]
tags: [nfs-e, cib, iptu, cadastro-de-condominos, administradoras, lc-214-2025]
meta:
  _ff_tempo_leitura: 10
  _ff_eyebrow: "Reforma Tributária · Condomínios · O que fazer até 01/12/2026"
resumo (excerpt): "A partir de 01/12/2026, cada cobrança do condomínio sai em NFS-e, com o imóvel e o condômino identificados. Antes de pensar em sistema, o trabalho é de cadastro: inscrição de IPTU, código CIB e nome e CPF corretos de cada proprietário."
seo:
  palavra_chave: cadastro de condôminos NFS-e
  secundarias: [CIB condomínio, IPTU unidade CIB, CPF condômino nota fiscal, reforma tributária condomínio dezembro 2026]
  title: "Condomínio até dezembro: IPTU, CIB e CPF dos condôminos | Fireflies Consultoria"
  meta: "A NFS-e do condomínio começa em 01/12/2026. Por que o cadastro vem primeiro: inscrição de IPTU, código CIB e nome e CPF corretos de cada proprietário."
```

---

Em **01/12/2026**, o condomínio edilício passa a emitir NFS-e sobre as taxas e demais valores que cobra. A data está no Ato Conjunto RFB/CGIBS nº 4/2026, e o leiaute da nota foi publicado em 01/10/2026, com o código próprio **99.05.01** (explicamos tudo no artigo [Novidades da Receita em 01/10/2026](/blog/nfse-condominios-codigo-99-05-01/)).

Muita administradora está olhando primeiro para o sistema emissor. A nossa recomendação é começar por outro lugar: **o cadastro**. A nota de condomínio identifica o imóvel e a pessoa cobrada. Se esses dados estiverem errados, nenhum sistema resolve, e o erro se repete em cada unidade, todo mês.

[bloco: destaque-numeros]
| Rótulo | Número | Nome | Descrição |
|---|---|---|---|
| Início da obrigatoriedade | **01/12** | de 2026 | **55** dias a partir da data deste artigo (07/10/2026). |
| Notas por ano, por unidade | **12** | Uma por vencimento | Na nossa leitura, cada cota mensal gera uma nota em nome do condômino. Um erro de cadastro se repete 12 vezes. |
| Código do imóvel | **CIB** | AAAAAAA-D | O "CPF do imóvel": 7 caracteres e um dígito verificador. |

[bloco: aviso-informativo]
Conteúdo informativo, baseado nas normas e na documentação técnica publicadas até 07/10/2026. Não substitui a análise do contador ou do advogado de cada condomínio.

[bloco: sumario] **Neste artigo**

---

## 01 · Por que o cadastro virou assunto fiscal {#s01}

Até agora, o cadastro do condomínio servia para emitir boleto e cobrar. Com a NFS-e, ele passa a alimentar um **documento fiscal**, que vai para o Ambiente Nacional da NFS-e e fica disponível para a Receita Federal, para o Comitê Gestor do IBS e para a prefeitura.

Cada nota de operação condominial leva dois conjuntos de dados que vêm direto do cadastro:

[bloco: tabela] (responsiva: no celular vira cartões)
| Grupo da nota | O que leva | De onde vem |
|---|---|---|
| Imóvel | Município, unidade, inscrição imobiliária (a do IPTU), código CIB e endereço | Cadastro das unidades e carnê de IPTU |
| Tomador | CPF ou CNPJ e nome de quem é cobrado | Cadastro de condôminos |

[bloco: consulte-na-integra] **Consulte na íntegra:**
Nota Técnica SE/CGNFS-e nº 009, v1.01, itens 2.6 e 2.15 · Anexo VI, v1.04.01 (grupo imovel).

A diferença em relação ao boleto é que **a nota é validada na emissão**. Um CPF com dígito errado no boleto passa despercebido. Na NFS-e, a nota é rejeitada.

---

## 02 · IPTU: a inscrição de cada unidade {#s02}

A inscrição imobiliária é o número com que a prefeitura identifica cada unidade para cobrar o IPTU. Em São Paulo, é o **número do contribuinte (SQL)**, que aparece na notificação de lançamento. Na nota, esse campo é opcional, mas ele é a chave para tudo o que vem depois: é a partir do cadastro de IPTU que a prefeitura envia o imóvel ao Sinter e que o CIB é gerado.

O que conferir em cada unidade:

[bloco: lista-estrelas]
- **Se a unidade já tem inscrição própria.** Em prédios recém-entregues, o IPTU às vezes ainda é lançado sobre o terreno inteiro, sem o desdobro por unidade. Sem inscrição individual, a unidade dificilmente terá CIB individual.
- **Se o número no seu cadastro é o mesmo do carnê.** Inscrições digitadas à mão, com dígito faltando ou trocado, são comuns em cadastros antigos.
- **Em nome de quem está o IPTU.** É frequente o imposto continuar no nome da construtora ou do antigo dono anos depois da venda. Isso não muda quem deve ao condomínio, mas é um sinal de que o cadastro do condomínio também pode estar desatualizado.
- **O endereço completo.** CEP, logradouro e número. A nota pede o endereço do imóvel quando informa a unidade.

[bloco: nossa-leitura]
**Nossa recomendação:** monte uma planilha única por condomínio, com uma linha por unidade: identificação (bloco, torre, número), inscrição de IPTU, endereço completo e, quando houver, CIB. É a base de tudo o que vem a seguir, e o sistema emissor vai precisar dela de qualquer forma.

---

## 03 · CIB: o "CPF do imóvel" {#s03}

[bloco: trio-cadastros] (três colunas; CIB destacado)
| Cadastro | De quem |
|---|---|
| CPF | pessoas |
| CNPJ | empresas e entidades |
| **CIB** | imóveis |

O **Cadastro Imobiliário Brasileiro** dá a cada imóvel do país, urbano ou rural, um código único no formato **AAAAAAA-D**: sete letras e números e um dígito verificador. Foi instituído pela LC 214/2025, faz parte do Sinter (Sistema Nacional de Gestão de Informações Territoriais), é administrado pela Receita Federal e foi regulamentado pela Instrução Normativa RFB nº 2.275/2025.

[bloco: lista-estrelas]
- **Ninguém pede o código.** Quando a prefeitura envia os dados do imóvel ao Sinter, o sistema cria o CIB. Segundo a Receita, o que cabe ao proprietário é manter o cadastro do imóvel atualizado na prefeitura.
- **A adoção é escalonada.** Em 2026, a obrigação vale para os imóveis urbanos das capitais e do Distrito Federal. Os demais municípios entram em janeiro de 2027. Em uma capital como São Paulo, as unidades já devem estar recebendo o código. No interior, é normal ainda não haver CIB.
- **Já aparece em documentos.** Porto Alegre, por exemplo, passou a imprimir o CIB nas guias do IPTU 2026.
- **Dá para consultar.** A consulta é feita na Plataforma Sinter (cadastroimobiliario.economia.gov.br), com login gov.br.

**E na nota do condomínio?** O leiaute torna o CIB obrigatório sempre que a unidade é informada. O que a Nota Técnica ainda não deixa claro é se informar a unidade será obrigatório nas notas de condomínio.

[bloco: em-aberto] **CIB nas notas de condomínio** · EM ABERTO
Se o grupo de unidades for exigido, cada nota precisará do CIB da unidade, e unidades de municípios que ainda não aderiram ao Sinter não terão o código. Esse ponto depende das regras de negócio do Anexo VI e de orientação da Receita e do Comitê Gestor.

[bloco: nossa-leitura]
**Nossa recomendação:** nas capitais, levante o CIB de cada unidade agora, enquanto há tempo de pedir correção à prefeitura se algo estiver errado. Nos outros municípios, deixe a inscrição de IPTU e o endereço prontos: é com eles que o CIB será localizado quando chegar.

[bloco: base-legal] **Base legal · LC nº 214/2025, art. 265**
**Art. 265, caput (trecho):** "Art. 265. Os bens imóveis urbanos e rurais de que trata esta Seção deverão ser inscritos no CIB, integrante do Sinter (...)."

---

## 04 · Nomes e CPFs corretos: o ponto que mais vai dar trabalho {#s04}

Na nossa leitura das normas, a nota de condomínio será emitida contra o **condômino, isto é, o proprietário**, mesmo quando a unidade estiver alugada (os fundamentos estão na seção 04 do [artigo sobre a NFS-e](/blog/nfse-condominios-codigo-99-05-01/)). Isso faz do cadastro de proprietários o ponto mais sensível da preparação.

### O que acontece com um CPF errado

O Ambiente Nacional da NFS-e confere o documento do tomador no momento da emissão. Pelas regras de validação do sistema nacional:

[bloco: tabela] (estilo codigos)
| Situação | O que o sistema faz |
|---|---|
| CPF com dígito verificador errado | Rejeita a nota: "O CPF do cliente é inválido" (E0206) |
| CPF que não existe na base da Receita | Rejeita a nota: "O CPF do cliente não foi encontrado no cadastro da Receita Federal" (E0207) |
| CNPJ inexistente, baixado ou inativo | Rejeita a nota (E0190) |
| Tomador sem nome | Rejeita a nota: o nome é obrigatório (E0234) |

Uma nota rejeitada não sai. Se o erro estiver em 30 unidades de um condomínio, são 30 notas paradas no vencimento, todo mês, até alguém corrigir o cadastro.

Há também o erro que **passa** na validação: o CPF certo de **outra pessoa**. É o caso do inquilino cadastrado no lugar do dono, ou do antigo proprietário que nunca foi trocado. A nota é emitida, mas contra a pessoa errada. Corrigir depois significa cancelar e emitir de novo, e explicar ao condômino por que ele recebeu um documento fiscal que não era dele.

### Os erros mais comuns e como corrigir

[bloco: tabela] (responsiva: no celular vira cartões)
| Situação no cadastro | Risco na nota | Como corrigir |
|---|---|---|
| Unidade ainda em nome da construtora, depois da entrega | Nota contra quem não é mais o dono | Atualizar com a escritura ou o contrato de compra e venda. O promitente comprador é equiparado ao proprietário (Código Civil, art. 1.334, § 2º) |
| Inquilino cadastrado como titular | Nota em nome de quem não deve ao condomínio | Separar os campos: proprietário como titular e inquilino como ocupante |
| Só um dos donos cadastrado (casal, herdeiros, sócios) | Falta de dados se a regra exigir todos os titulares | Registrar todos os titulares, com CPF e participação de cada um |
| Proprietário falecido | Nota contra pessoa falecida, sem responsável identificado | Registrar o espólio e o inventariante. Para a Receita, o espólio continua usando o CPF do falecido até a partilha |
| Nome diferente do que consta no CPF (nome de solteira, abreviações, apelido) | Documento fiscal com nome divergente do da Receita | Usar o nome exatamente como aparece no CPF |
| Unidade de empresa cadastrada com o CPF do sócio | Nota contra a pessoa física errada | Cadastrar o CNPJ e a razão social da empresa dona |
| CPF digitado errado ou faltando | Rejeição na emissão (E0206 ou E0207) | Conferir com documento do condômino |
| Proprietário estrangeiro sem CPF | Tomador sem identificação válida | Pedir o CPF ou, se não houver, o NIF do país de origem com o nome completo |

### Como validar sem sobrecarregar o síndico

[bloco: lista-estrelas]
- **Cruze com os documentos que já existem:** matrícula, escritura, contrato de compra e venda e carnê de IPTU.
- **Faça um recadastramento curto**, com poucos campos: nome completo como no CPF, CPF ou CNPJ, outros titulares e participação, contato e, se houver, dados do inquilino. Explique por que os dados estão sendo pedidos.
- **Peça que o próprio condômino confira o CPF.** A consulta de situação cadastral no site da Receita pede o CPF e a data de nascimento e mostra o nome exatamente como está registrado. Se houver pendência, regularizar leva tempo, e é melhor resolver antes de dezembro.
- **Valide o dígito do CPF no sistema** antes da primeira emissão. Isso pega a maior parte dos erros de digitação de uma vez.

[bloco: info] **E a LGPD?**
Coletar o CPF e o nome do condômino para emitir um documento fiscal exigido por norma tem base legal no cumprimento de obrigação legal ou regulatória (LGPD, art. 7º, II). Informe a finalidade no próprio formulário e guarde os dados com acesso restrito.

[bloco: base-legal] **Base legal · 2 trechos**
- **Código Civil, art. 1.336, I** — "Art. 1.336. São deveres do condômino: I - contribuir para as despesas do condomínio na proporção das suas frações ideais, salvo disposição em contrário na convenção;"
- **Código Civil, art. 1.334, § 2º** — "§ 2º São equiparados aos proprietários, para os fins deste artigo, salvo disposição em contrário, os promitentes compradores e os cessionários de direitos relativos às unidades autônomas."

---

## 05 · O roteiro até 01/12/2026 {#s05}

Com o cadastro em ordem, o resto da preparação fica mais simples. Marque os passos concluídos: o progresso fica salvo neste navegador.

[bloco: passos] (cada item com eyebrow "Passo N"; checklist com progresso salvo no navegador)
1. **Liste as unidades com a inscrição de IPTU** — Uma linha por unidade, com bloco, número, inscrição e endereço completo. Marque as unidades sem inscrição individual.
2. **Levante o CIB nas capitais** — Consulte a Plataforma Sinter e anote o código de cada unidade. Divergências entre o Sinter e a prefeitura devem ser corrigidas no cadastro municipal.
3. **Abra o recadastramento dos condôminos** — Nome como no CPF, CPF ou CNPJ, todos os titulares e a participação de cada um, e os dados do inquilino em campo separado.
4. **Corrija os casos conhecidos** — Unidades ainda em nome da construtora, inquilinos no lugar de proprietários, espólios e empresas cadastradas com CPF.
5. **Valide CPFs e CNPJs** — Dígito verificador no sistema e conferência da situação cadastral nos casos duvidosos.
6. **Garanta o acesso ao Emissor Nacional** — CNPJ do condomínio regular e acesso ao Emissor Nacional ou integração por API com o Ambiente Nacional da NFS-e.
7. **Separe a composição das cotas** — Ordinária, fundo de reserva, extras, multas e rateios aparecem discriminados na nota. O plano de contas precisa refletir essa separação.
8. **Comunique síndicos, conselhos e condôminos** — A nota sobre a cota não significa, por si só, cobrança de IBS ou CBS. O condomínio que não optou pelo regime regular e respeita o limite dos 80% continua sem tributo a pagar.
9. **Teste a emissão assim que o código estiver disponível** — A Receita e o Comitê Gestor ainda vão divulgar quando o código 99.05.01 estará ativo no ambiente nacional. Comece pelos condomínios com o cadastro mais limpo.

Os passos 6 a 9 estão detalhados no [artigo sobre a NFS-e para condomínios](/blog/nfse-condominios-codigo-99-05-01/).

---

## 06 · Fontes oficiais {#s06}

[bloco: fontes]
1. Ato Conjunto RFB/CGIBS nº 4/2026 (obrigatoriedade da NFS-e de condomínios a partir de 01/12/2026)
2. Ato Técnico Conjunto RFB/CGIBS nº 7/2026 – DOU de 01/10/2026, edição extra
3. Nota Técnica SE/CGNFS-e nº 009, versão 1.01, e Anexo VI – Leiaute e regras de negócio, v1.04.01
4. Lei Complementar nº 214/2025 – arts. 26, 265 e 266
5. Instrução Normativa RFB nº 2.275/2025 – regulamentação do CIB e do Sinter
6. Receita Federal – Perguntas frequentes sobre o Cadastro Imobiliário Brasileiro (gov.br/receitafederal)
7. Plataforma Sinter – consulta de imóveis (cadastroimobiliario.economia.gov.br)
8. Código Civil – arts. 1.334 e 1.336
9. Lei nº 13.709/2018 (LGPD) – art. 7º, II

[bloco: cta-post] (fundo Anil)
- **Eyebrow:** Cadastro em ordem antes de dezembro
- **H2:** Fazemos o levantamento de IPTU, CIB e condôminos da sua carteira e entregamos a base pronta para a emissão.
- **Botão primário:** Fale com nossos especialistas → `https://wa.me/5511982450527`

---

### Linkagem interna a inserir (sem alterar o texto)
- Leituras relacionadas: `/blog/nfse-condominios-codigo-99-05-01/` e `/blog/sinais-auditoria-condominio/`.
- Caixa lateral de serviço: Auditoria de Condomínios → `/servicos/auditoria-de-condominios/`.
