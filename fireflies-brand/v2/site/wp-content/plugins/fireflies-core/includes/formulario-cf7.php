<?php
/**
 * Cria o formulário "Diagnóstico gratuito" no Contact Form 7, se o CF7 estiver ativo
 * e o formulário ainda não existir. Dispensa importar o formulário por XML.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

const FIREFLIES_CORE_CF7_TITULO = 'Diagnóstico gratuito';

add_action( 'admin_init', 'fireflies_core_cf7_criar_formulario' );

function fireflies_core_cf7_criar_formulario(): void {
	if ( ! class_exists( 'WPCF7_ContactForm' ) || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	if ( '' !== fireflies_core_cf7_padrao() ) {
		return; // Já existe.
	}

	$host      = wp_parse_url( home_url(), PHP_URL_HOST ) ?: 'fireflies.com.br';
	$remetente = 'wordpress@' . preg_replace( '/^www\./', '', $host );
	$email     = fireflies_core_opcao( 'email' );
	$whatsapp  = fireflies_core_opcao( 'whatsapp' );
	$whats_fmt = preg_replace( '/^55(\d{2})(\d{5})(\d{4})$/', '+55 $1 $2-$3', $whatsapp );

	$form = <<<CF7
<label>Nome [text* nome autocomplete:name]</label>
<label>E-mail [email* email autocomplete:email]</label>
<label>WhatsApp <span class="ff-opcional">(opcional)</span> [tel whatsapp autocomplete:tel]</label>
<label>Você é [select* perfil include_blank "Síndico ou conselheiro" "Administradora" "Empresa" "Grande empresa ou grupo" "Interessado na Academy"]</label>
<label>Assunto [select* assunto default:get include_blank "Auditoria de condomínios|auditoria-de-condominios" "Consultoria contábil|consultoria-contabil" "Consultoria fiscal|consultoria-fiscal" "Consultoria financeira|consultoria-financeira" "Gestão de projetos e processos|gestao-de-projetos-e-processos" "Sindicância|sindicancia" "Fireflies Academy|academy" "Outro|outro"]</label>
<label>Como podemos ajudar? [textarea* mensagem x4 placeholder "Ex.: condomínio com 120 unidades, queremos conferir as contas de 2025 antes da assembleia."]</label>
[acceptance consentimento] Li a <a href="/politica-de-privacidade/">Política de Privacidade</a> e autorizo o uso destes dados para retornar o meu contato. [/acceptance]
[submit "Enviar e agendar diagnóstico"]
CF7;

	$cf = WPCF7_ContactForm::get_template(
		array(
			'title'  => FIREFLIES_CORE_CF7_TITULO,
			'locale' => 'pt_BR',
		)
	);
	$mensagens                 = $cf->prop( 'messages' );
	$mensagens['mail_sent_ok'] = 'Recebido. A gente responde no mesmo dia útil, de segunda a sexta, das 8h às 18h. Se for urgente, chame no WhatsApp.';
	$mensagens['mail_sent_ng'] = 'Não conseguimos enviar agora. Tente de novo ou fale pelo WhatsApp: ' . $whats_fmt . '.';
	$mensagens['validation_error'] = 'Confira os campos marcados e tente de novo.';
	$mensagens['invalid_required'] = 'Preencha este campo.';

	$cf->set_properties(
		array(
			'form'     => $form,
			'mail'     => array(
				'active'             => true,
				'subject'            => '[Site] Diagnóstico: [assunto] · [nome]',
				'sender'             => 'Site Fireflies <' . $remetente . '>',
				'recipient'          => $email,
				'body'               => "Nome: [nome]\nE-mail: [email]\nWhatsApp: [whatsapp]\nPerfil: [perfil]\nAssunto: [assunto]\n\n[mensagem]",
				'additional_headers' => 'Reply-To: [email]',
				'attachments'        => '',
				'use_html'           => false,
				'exclude_blank'      => true,
			),
			'mail_2'   => array( 'active' => false ),
			'messages' => $mensagens,
		)
	);
	$cf->save();
}
