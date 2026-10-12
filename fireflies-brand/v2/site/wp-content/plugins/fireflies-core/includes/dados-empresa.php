<?php
/**
 * Dados da empresa (razão social, CNPJ, CRC do escritório) e retrato do responsável.
 * Aplica uma vez as trocas de includes/dados-empresa.json no conteúdo já importado
 * (páginas, cursos e partes de modelo editadas no Editor do site). Espera o tema
 * atualizado (com o retrato) para não deixar imagem quebrada.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

const FIREFLIES_CORE_RAZAO_SOCIAL = 'Fireflies Consultoria LTDA';
const FIREFLIES_CORE_CNPJ         = '66.630.305/0001-95';
const FIREFLIES_CORE_CRC          = '2SP053069';

add_action( 'init', 'fireflies_core_dados_empresa', 98 );
add_action( 'admin_notices', 'fireflies_core_dados_empresa_aviso' );

function fireflies_core_dados_empresa_tema_ok(): bool {
	return file_exists( get_theme_root() . '/fireflies/assets/img/gabriel-alvares.jpg' );
}

/** Aplica as regras a um texto. Regras: ["s", busca, troca] (literal) ou ["r", regex, troca]. */
function fireflies_core_dados_empresa_trocar( string $texto ): string {
	static $regras = null;
	if ( null === $regras ) {
		$regras = json_decode( (string) file_get_contents( __DIR__ . '/dados-empresa.json' ), true ) ?: array();
	}
	foreach ( $regras as $r ) {
		$texto = 's' === $r[0]
			? str_replace( $r[1], $r[2], $texto )
			: (string) preg_replace( '~' . $r[1] . '~su', $r[2], $texto );
	}
	return $texto;
}

function fireflies_core_dados_empresa(): void {
	if ( get_option( 'fireflies_dados_empresa_v2' ) || wp_installing() || wp_doing_ajax() || wp_doing_cron() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
		return;
	}
	if ( ! fireflies_core_dados_empresa_tema_ok() || ! get_page_by_path( 'sobre' ) ) {
		return; // Tema antigo ou conteúdo ainda não importado: tenta no próximo carregamento.
	}

	global $wpdb;
	$ids = $wpdb->get_col(
		"SELECT ID FROM {$wpdb->posts} WHERE post_type IN ('page','post','curso','wp_template_part','wp_template','wp_block')
		 AND ( post_content LIKE '%a confirmar%' OR post_content LIKE '%a definir%' OR post_content LIKE '%retrato-placeholder%' OR post_excerpt LIKE '%a confirmar%' )"
	);
	foreach ( $ids as $id ) {
		$post    = get_post( (int) $id );
		$novo    = fireflies_core_dados_empresa_trocar( $post->post_content );
		$resumo  = fireflies_core_dados_empresa_trocar( $post->post_excerpt );
		if ( $novo !== $post->post_content || $resumo !== $post->post_excerpt ) {
			// Direto no banco: wp_update_post passaria pelo filtro de HTML de visitantes sem permissão.
			$wpdb->update( $wpdb->posts, array( 'post_content' => $novo, 'post_excerpt' => $resumo ), array( 'ID' => $post->ID ) );
			clean_post_cache( $post->ID );
		}
	}

	// Campos dos cursos ainda sem valor (ex.: carga horária "[a confirmar] h"): esvazia; a ficha omite campos vazios.
	$metas = $wpdb->get_results( "SELECT meta_id, post_id FROM {$wpdb->postmeta} WHERE meta_key LIKE '_ff%' AND ( meta_value LIKE '%a confirmar%' OR meta_value LIKE '%a definir%' )" );
	foreach ( $metas as $m ) {
		delete_metadata_by_mid( 'post', (int) $m->meta_id );
		clean_post_cache( (int) $m->post_id );
	}

	// Bio do autor (Usuários › Perfil › Informações biográficas), que aparece no fim dos posts.
	foreach ( $wpdb->get_results( "SELECT umeta_id, user_id, meta_value FROM {$wpdb->usermeta} WHERE meta_key = 'description' AND ( meta_value LIKE '%a confirmar%' OR meta_value LIKE '%a definir%' )" ) as $u ) {
		update_user_meta( (int) $u->user_id, 'description', fireflies_core_dados_empresa_trocar( $u->meta_value ) );
	}

	update_option( 'fireflies_dados_empresa_v2', gmdate( 'c' ), false );
	if ( function_exists( 'fireflies_core_limpar_caches' ) ) {
		fireflies_core_limpar_caches();
	}
}

function fireflies_core_dados_empresa_aviso(): void {
	if ( ! current_user_can( 'manage_options' ) || get_option( 'fireflies_dados_empresa_v2' ) || fireflies_core_dados_empresa_tema_ok() ) {
		return;
	}
	echo '<div class="notice notice-warning"><p><strong>Fireflies:</strong> atualize também o tema (Aparência › Temas › Adicionar › Enviar tema › <code>fireflies-tema.zip</code> › Substituir). Assim que o tema novo estiver ativo, o CNPJ, o CRC e a foto entram em todas as páginas.</p></div>';
}
