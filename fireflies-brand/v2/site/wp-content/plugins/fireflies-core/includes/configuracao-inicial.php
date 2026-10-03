<?php
/**
 * Configuração inicial do site depois da importação do conteúdo (WXR):
 * página inicial estática ("Início"), página de posts ("Blog") e links permanentes.
 * Roda uma vez, só quando as páginas existem e o site ainda está no padrão do WordPress.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

add_action( 'admin_init', 'fireflies_core_configuracao_inicial' );

function fireflies_core_configuracao_inicial(): void {
	if ( ! current_user_can( 'manage_options' ) || get_option( 'fireflies_configuracao_inicial' ) ) {
		return;
	}

	$inicio = get_page_by_path( 'inicio' );
	$blog   = get_page_by_path( 'blog' );
	if ( ! $inicio ) {
		return; // Conteúdo ainda não importado: tenta de novo na próxima visita ao painel.
	}

	if ( 'page' !== get_option( 'show_on_front' ) || ! get_option( 'page_on_front' ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $inicio->ID );
		if ( $blog ) {
			update_option( 'page_for_posts', $blog->ID );
		}
	}

	// O conteúdo liga os posts em /blog/{slug}/. Ajusta se o site estiver no padrão ou em "Nome do post".
	global $wp_rewrite;
	if ( in_array( (string) get_option( 'permalink_structure' ), array( '', '/%postname%/' ), true ) ) {
		$wp_rewrite->set_permalink_structure( '/blog/%postname%/' );
		if ( '' === (string) get_option( 'category_base' ) ) {
			$wp_rewrite->set_category_base( 'blog/categoria' );
		}
		if ( '' === (string) get_option( 'tag_base' ) ) {
			$wp_rewrite->set_tag_base( 'blog/tag' );
		}
	}
	// As bases de categoria/tag só valem no próximo carregamento: força a regeneração das regras.
	delete_option( 'rewrite_rules' );

	update_option( 'fireflies_configuracao_inicial', gmdate( 'c' ), false );
}
