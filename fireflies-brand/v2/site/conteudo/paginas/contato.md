# Contato

```yaml
titulo: Contato
slug: contato
url: /contato/
parent: null
template: page-contato
ordem_menu: 7          # acessada pelo botão CTA "Agendar diagnóstico"
seo:
  palavra_chave: diagnóstico gratuito consultoria contábil
  secundarias: [contato Fireflies Consultoria, WhatsApp contador São Paulo]
  title: "Contato e diagnóstico gratuito | Fireflies Consultoria"
  meta: "Agende o diagnóstico gratuito com a Fireflies Consultoria: WhatsApp +55 11 98245-0527, contato@fireflies.com.br, de segunda a sexta, das 8h às 18h."
  schema: [ContactPage, AccountingService (contactPoint, openingHoursSpecification Mo-Fr 08:00-18:00), BreadcrumbList]
```

---

## 1. Abertura
[pattern: hero-claro]

- **Breadcrumb:** Início / Contato
- **Eyebrow:** DIAGNÓSTICO GRATUITO
- **H1:** Comece por uma conversa.
- **Lead:** O diagnóstico é sem custo e sem compromisso. Conte em poucas linhas o que você precisa, e a gente responde no mesmo dia útil.

## 2. Canais e formulário
[pattern: contato-form]

**Coluna 1 · Canais (lista mono com fio)**
- WHATSAPP · +55 11 98245-0527 → `https://wa.me/5511982450527` (canal mais rápido)
- E-MAIL · contato@fireflies.com.br → `mailto:contato@fireflies.com.br`
- ATENDIMENTO · Seg–sex, 8h às 18h
- LOCALIZAÇÃO · São Paulo · SP [endereço a confirmar; se o atendimento for só remoto e em visita, manter apenas "São Paulo · SP"]
- RESPONSÁVEL · Gabriel Alvares, CRC-SP [a confirmar]

**Coluna 2 · Formulário** (slot de shortcode do Contact Form 7 ou WPForms; sem plugin, o pattern mostra o botão do WhatsApp)

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Nome | texto | sim | |
| E-mail | e-mail | sim | |
| WhatsApp | telefone | não | rótulo "opcional" |
| Você é | seleção | sim | Síndico ou conselheiro · Administradora · Empresa · Grande empresa ou grupo · Interessado na Academy |
| Assunto | seleção | sim | Auditoria de condomínios · Consultoria contábil · Consultoria fiscal · Consultoria financeira · Gestão de projetos e processos · Sindicância · Fireflies Academy · Outro. Pré-selecionado pelo parâmetro `?assunto=` |
| Como podemos ajudar? | área de texto | sim | placeholder: "Ex.: condomínio com 120 unidades, queremos conferir as contas de 2025 antes da assembleia." |
| Consentimento | caixa de seleção | sim | "Li a Política de Privacidade e autorizo o uso destes dados para retornar o meu contato." (link para `/politica-de-privacidade/`) |
| Honeypot | oculto | — | rótulo "Não preencha" |

- **Botão:** Enviar e agendar diagnóstico
- **Mensagem de sucesso:** Recebido. A gente responde no mesmo dia útil, de segunda a sexta, das 8h às 18h. Se for urgente, chame no WhatsApp.
- **Mensagem de erro:** Não conseguimos enviar agora. Tente de novo ou fale pelo WhatsApp: +55 11 98245-0527.
- **Nota sob o botão (mono):** Seus dados são usados apenas para retornar o contato. Detalhes na Política de Privacidade.

## 3. O que acontece depois
[pattern: passos-30-dias]

Versão compacta, 3 passos:
1. **Resposta** — No mesmo dia útil, pelo canal que você preferir.
2. **Conversa de diagnóstico** — Até uma hora, por vídeo, telefone ou presencial em São Paulo.
3. **Proposta** — Escopo, prazo, investimento e responsável, por escrito.

## 4. Sindicância e assuntos sensíveis
[pattern: nota-destaque]

- **Texto:** Para assuntos que pedem reserva, prefira o WhatsApp ou o e-mail e escreva apenas o necessário para o primeiro contato. Os detalhes ficam para a conversa.
