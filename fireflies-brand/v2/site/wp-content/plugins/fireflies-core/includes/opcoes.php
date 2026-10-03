<?php
/**
 * Opções em Configurações > Geral: WhatsApp, e-mail, formulário e newsletter.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

/**
 * Lê uma opção do plugin com padrão.
 */
function fireflies_core_opcao( string $chave ): string {
	$padroes = array(
		'whatsapp'   => '5511982450527',
		'email'      => 'contato@fireflies.com.br',
		'horario'    => 'Segunda a sexta, 8h às 18h',
		'form'       => '',
		'newsletter' => '',
	);
	$valor = get_option( 'fireflies_' . $chave, '' );
	return '' !== $valor ? (string) $valor : ( $padroes[ $chave ] ?? '' );
}

add_action(
	'admin_init',
	static function (): void {
		add_settings_section( 'fireflies_core', 'Fireflies Consultoria', '__return_null', 'general' );
		$campos = array(
			'whatsapp'   => array( 'WhatsApp (só números, com DDI)', 'fireflies_core_sanitize_numero' ),
			'email'      => array( 'E-mail de contato', 'sanitize_email' ),
			'horario'    => array( 'Horário de atendimento', 'sanitize_text_field' ),
			'form'       => array( 'Shortcode do formulário de contato (ex.: [contact-form-7 id="123"])', 'fireflies_core_sanitize_shortcode' ),
			'newsletter' => array( 'Shortcode da newsletter (opcional)', 'fireflies_core_sanitize_shortcode' ),
		);
		foreach ( $campos as $chave => [ $rotulo, $sanitize ] ) {
			register_setting( 'general', 'fireflies_' . $chave, array( 'type' => 'string', 'sanitize_callback' => $sanitize ) );
			add_settings_field(
				'fireflies_' . $chave,
				esc_html( $rotulo ),
				static function () use ( $chave ): void {
					printf(
						'<input type="text" class="regular-text" name="%1$s" id="%1$s" value="%2$s">',
						esc_attr( 'fireflies_' . $chave ),
						esc_attr( (string) get_option( 'fireflies_' . $chave, '' ) )
					);
				},
				'general',
				'fireflies_core',
				array( 'label_for' => 'fireflies_' . $chave )
			);
		}
	}
);

function fireflies_core_sanitize_numero( $valor ): string {
	return preg_replace( '/\D+/', '', (string) $valor );
}

function fireflies_core_sanitize_shortcode( $valor ): string {
	$valor = trim( wp_unslash( (string) $valor ) );
	return preg_match( '/^\[[a-z0-9_\-]+[^\]]*\]$/i', $valor ) ? $valor : '';
}
