<?php
/**
 * Configuração inicial do site depois da importação do conteúdo (WXR):
 * página inicial estática ("Início"), página de posts ("Blog") e links permanentes.
 * Roda uma vez, em qualquer carregamento (painel ou site), assim que a página "Início" existir.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'fireflies_core_configuracao_inicial', 99 );
add_action( 'admin_notices', 'fireflies_core_configuracao_aviso' );

/**
 * Procura a página importada pelo slug ou pelo título. Se houver mais de uma (ex.: uma "Início" vazia
 * criada antes da importação e a nossa como "inicio-2"), fica com a que tem conteúdo.
 */
function fireflies_core_pagina( string $slug, string $titulo ): ?WP_Post {
	$candidatas = get_posts(
		array(
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'title'          => $titulo,
			'posts_per_page' => 20,
			'orderby'        => 'ID',
			'order'          => 'ASC',
		)
	);
	$pelo_slug = get_page_by_path( $slug );
	if ( $pelo_slug && 'publish' === $pelo_slug->post_status ) {
		array_unshift( $candidatas, $pelo_slug );
	}
	if ( ! $candidatas ) {
		return null;
	}
	usort(
		$candidatas,
		static function ( WP_Post $a, WP_Post $b ): int {
			return strlen( $b->post_content ) <=> strlen( $a->post_content );
		}
	);
	return $candidatas[0];
}

/**
 * Se o slug "inicio" está ocupado por uma página quase vazia e a nossa ficou "inicio-2",
 * a vazia vira rascunho ("inicio-antiga") e a nossa assume o slug. Nada é apagado.
 */
function fireflies_core_liberar_slug( WP_Post $nossa, string $slug ): void {
	if ( $nossa->post_name === $slug ) {
		return;
	}
	$ocupante = get_page_by_path( $slug );
	if ( $ocupante && $ocupante->ID !== $nossa->ID ) {
		if ( strlen( trim( wp_strip_all_tags( $ocupante->post_content ) ) ) > 200 ) {
			return; // A outra página tem conteúdo de verdade: não mexe.
		}
		wp_update_post(
			array(
				'ID'          => $ocupante->ID,
				'post_status' => 'draft',
				'post_name'   => $slug . '-antiga',
			)
		);
	}
	wp_update_post(
		array(
			'ID'        => $nossa->ID,
			'post_name' => $slug,
		)
	);
}

function fireflies_core_configuracao_inicial(): void {
	if ( get_option( 'fireflies_configuracao_inicial_v2' ) || wp_installing() || wp_doing_ajax() || wp_doing_cron() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
		return;
	}

	$inicio = fireflies_core_pagina( 'inicio', 'Início' );
	if ( ! $inicio ) {
		return; // Conteúdo ainda não importado: tenta de novo no próximo carregamento.
	}
	$blog = fireflies_core_pagina( 'blog', 'Blog' );
	fireflies_core_liberar_slug( $inicio, 'inicio' );
	if ( $blog ) {
		fireflies_core_liberar_slug( $blog, 'blog' );
	}

	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $inicio->ID );
	if ( $blog ) {
		update_option( 'page_for_posts', $blog->ID );
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
	// As bases novas só valem no próximo carregamento: apaga as regras para que sejam refeitas nele.
	delete_option( 'rewrite_rules' );

	update_option( 'fireflies_configuracao_inicial_v2', gmdate( 'c' ), false );
	fireflies_core_limpar_caches();

	// No site, recarrega a página já com a configuração nova (evita regras de URL montadas com a base antiga).
	if ( ! is_admin() && ! headers_sent() && isset( $_SERVER['REQUEST_URI'] ) ) {
		nocache_headers();
		wp_safe_redirect( home_url( wp_unslash( $_SERVER['REQUEST_URI'] ) ), 302 );
		exit;
	}
}

/** Limpa os plugins de cache mais comuns em hospedagens brasileiras; sem eles, não faz nada. */
function fireflies_core_limpar_caches(): void {
	wp_cache_flush();
	do_action( 'litespeed_purge_all' );
	if ( function_exists( 'rocket_clean_domain' ) ) {
		rocket_clean_domain();
	}
	if ( function_exists( 'w3tc_flush_all' ) ) {
		w3tc_flush_all();
	}
	if ( function_exists( 'wp_cache_clear_cache' ) ) {
		wp_cache_clear_cache();
	}
	if ( function_exists( 'sg_cachepress_purge_cache' ) ) {
		sg_cachepress_purge_cache();
	}
	do_action( 'breeze_clear_all_cache' );
}

/** Mostra no painel o que está valendo, para conferir sem procurar nas configurações. */
function fireflies_core_configuracao_aviso(): void {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$tela = get_current_screen();
	if ( ! $tela || ! in_array( $tela->id, array( 'dashboard', 'plugins', 'options-reading', 'options-permalink' ), true ) ) {
		return;
	}
	$inicio = fireflies_core_pagina( 'inicio', 'Início' );
	if ( ! $inicio ) {
		echo '<div class="notice notice-warning"><p><strong>Fireflies:</strong> a página "Início" não foi encontrada. Importe o arquivo <code>fireflies-conteudo.xml</code> em Ferramentas › Importar › WordPress.</p></div>';
		return;
	}
	$ok = 'page' === get_option( 'show_on_front' ) && (int) get_option( 'page_on_front' ) === $inicio->ID;
	if ( $ok ) {
		printf(
			'<div class="notice notice-success"><p><strong>Fireflies:</strong> página inicial = Início · links permanentes = <code>%s</code>. <a href="%s" target="_blank">Ver o site</a></p></div>',
			esc_html( (string) get_option( 'permalink_structure' ) ),
			esc_url( home_url( '/' ) )
		);
	} else {
		printf(
			'<div class="notice notice-warning"><p><strong>Fireflies:</strong> a página inicial não é a "Início". Ajuste em <a href="%s">Configurações › Leitura</a> (Uma página estática › Início / Blog).</p></div>',
			esc_url( admin_url( 'options-reading.php' ) )
		);
	}
}
