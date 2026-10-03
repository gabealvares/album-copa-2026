<?php
/**
 * Favicon e ícones de app quando o Ícone do site (Personalizar > Identidade) não foi definido.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

function fireflies_core_icones(): void {
	if ( has_site_icon() ) {
		return;
	}
	$u = FIREFLIES_CORE_URL . 'assets/';
	printf( '<link rel="icon" href="%s" sizes="48x48">' . "\n", esc_url( $u . 'favicon.ico' ) );
	printf( '<link rel="icon" href="%s" type="image/svg+xml">' . "\n", esc_url( $u . 'favicon.svg' ) );
	printf( '<link rel="icon" href="%s" sizes="192x192">' . "\n", esc_url( $u . 'android-192.png' ) );
	printf( '<link rel="apple-touch-icon" href="%s">' . "\n", esc_url( $u . 'apple-touch-icon-180.png' ) );
	echo '<meta name="theme-color" content="#17183A">' . "\n";
}
add_action( 'wp_head', 'fireflies_core_icones', 2 );
add_action( 'admin_head', 'fireflies_core_icones' );
add_action( 'login_head', 'fireflies_core_icones' );
