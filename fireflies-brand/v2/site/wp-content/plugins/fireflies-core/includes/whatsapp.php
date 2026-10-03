<?php
/**
 * Botão de WhatsApp: shortcode [fireflies_whatsapp] e bloco fireflies/whatsapp.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

function fireflies_core_whatsapp_url( string $mensagem = '' ): string {
	$url = 'https://wa.me/' . fireflies_core_opcao( 'whatsapp' );
	return $mensagem ? add_query_arg( 'text', rawurlencode( $mensagem ), $url ) : $url;
}

function fireflies_core_numero_legivel(): string {
	$n = fireflies_core_opcao( 'whatsapp' );
	if ( preg_match( '/^55(\d{2})(\d{4,5})(\d{4})$/', $n, $m ) ) {
		return "+55 {$m[1]} {$m[2]}-{$m[3]}";
	}
	return '+' . $n;
}

/**
 * HTML do botão. Estilo: "botao" (padrão), "contorno" ou "link".
 */
function fireflies_core_whatsapp( array $atts = array() ): string {
	$atts = shortcode_atts(
		array(
			'texto'    => 'Conversar no WhatsApp',
			'mensagem' => 'Olá! Vim pelo site da Fireflies Consultoria e quero agendar um diagnóstico.',
			'estilo'   => 'botao',
			'numero'   => 'nao',
		),
		$atts,
		'fireflies_whatsapp'
	);

	$icone = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 4.5h15A1.5 1.5 0 0 1 21 6v9a1.5 1.5 0 0 1-1.5 1.5H11L6.5 20v-3.5h-2A1.5 1.5 0 0 1 3 15V6a1.5 1.5 0 0 1 1.5-1.5z"/><path d="M7 9h10"/><path d="M7 12.25 13.02 12.25" stroke-dasharray="0 3"/></svg>';
	$texto = esc_html( $atts['texto'] );
	if ( 'sim' === $atts['numero'] ) {
		$texto .= ' <span class="ff-mono">' . esc_html( fireflies_core_numero_legivel() ) . '</span>';
	}
	$link = sprintf(
		'<a class="%1$s" href="%2$s" target="_blank" rel="noopener">%3$s<span>%4$s</span><span class="screen-reader-text"> (abre o WhatsApp em nova aba)</span></a>',
		'link' === $atts['estilo'] ? 'ff-whatsapp' : 'ff-whatsapp wp-block-button__link wp-element-button',
		esc_url( fireflies_core_whatsapp_url( $atts['mensagem'] ) ),
		$icone,
		$texto
	);
	if ( 'link' === $atts['estilo'] ) {
		return $link;
	}
	$classe = 'contorno' === $atts['estilo'] ? 'wp-block-button is-style-outline' : 'wp-block-button';
	return '<div class="wp-block-buttons ff-whatsapp-wrap"><div class="' . $classe . '">' . $link . '</div></div>';
}

add_shortcode( 'fireflies_whatsapp', 'fireflies_core_whatsapp' );
