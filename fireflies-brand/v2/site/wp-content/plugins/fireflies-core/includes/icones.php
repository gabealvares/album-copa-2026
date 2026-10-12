<?php
/**
 * Favicon e ícones de app quando o Ícone do site (Personalizar > Identidade) não foi definido.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

/** Ícone definido em Personalizar › Identidade? (sem has_site_icon(), que passa pelo filtro abaixo). */
function fireflies_core_tem_icone_proprio(): bool {
	return (bool) get_option( 'site_icon' );
}

function fireflies_core_icones(): void {
	if ( fireflies_core_tem_icone_proprio() ) {
		return;
	}
	$u = FIREFLIES_CORE_URL . 'assets/';
	$v = '?v=' . FIREFLIES_CORE_VERSION; // muda a cada versão: o navegador não fica preso ao ícone antigo
	printf( '<link rel="icon" href="%s" sizes="48x48">' . "\n", esc_url( $u . 'favicon.ico' . $v ) );
	printf( '<link rel="icon" href="%s" type="image/svg+xml">' . "\n", esc_url( $u . 'favicon.svg' . $v ) );
	printf( '<link rel="icon" href="%s" sizes="192x192">' . "\n", esc_url( $u . 'android-192.png' . $v ) );
	printf( '<link rel="apple-touch-icon" href="%s">' . "\n", esc_url( $u . 'apple-touch-icon-180.png' . $v ) );
	echo '<meta name="theme-color" content="#17183A">' . "\n";
}
add_action( 'wp_head', 'fireflies_core_icones', 2 );
add_action( 'admin_head', 'fireflies_core_icones' );
add_action( 'login_head', 'fireflies_core_icones' );

// /favicon.ico na raiz: sem isto o WordPress redireciona para o "W" cinza (Google, Safari, favoritos).
add_action(
	'do_faviconico',
	static function (): void {
		if ( fireflies_core_tem_icone_proprio() ) {
			return;
		}
		header( 'Content-Type: image/x-icon' );
		header( 'Cache-Control: public, max-age=86400' );
		readfile( FIREFLIES_CORE_DIR . 'assets/favicon.ico' );
		exit;
	}
);

// Onde o WordPress pede o ícone do site (painel, feeds, app): usa o da marca.
add_filter(
	'get_site_icon_url',
	static function ( $url, $size ) {
		if ( fireflies_core_tem_icone_proprio() ) {
			return $url;
		}
		return FIREFLIES_CORE_URL . 'assets/' . ( $size <= 192 ? 'android-192.png' : 'android-512.png' );
	},
	10,
	2
);

// Tela de login com o logo da Fireflies no lugar do logo do WordPress.
add_action(
	'login_head',
	static function (): void {
		printf(
			'<style>#login h1 a{background:url(%s) center/contain no-repeat;width:280px;height:96px;margin-bottom:24px}</style>' . "\n",
			esc_url( FIREFLIES_CORE_URL . 'assets/logo-horizontal.svg' )
		);
	}
);
add_filter( 'login_headerurl', static fn() => home_url( '/' ) );
add_filter( 'login_headertext', static fn() => 'Fireflies Consultoria' );

// Sem ícone próprio, as tags do WordPress repetiriam as nossas (o filtro acima faz has_site_icon() ser verdadeiro).
add_action(
	'init',
	static function (): void {
		if ( ! fireflies_core_tem_icone_proprio() ) {
			remove_action( 'wp_head', 'wp_site_icon', 99 );
			remove_action( 'admin_head', 'wp_site_icon' );
			remove_action( 'login_head', 'wp_site_icon', 99 );
		}
	}
);
