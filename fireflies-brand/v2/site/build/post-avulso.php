<?php
/**
 * Cria ou atualiza UM post da spec, sem mexer no resto do site.
 * Uso: wp eval-file build/post-avulso.php <slug>
 */

require_once __DIR__ . '/posts.php';

$C    = dirname( __DIR__ ) . '/conteudo/';
$spec = json_decode( file_get_contents( $C . 'wxr-spec.json' ), true );
$slug = $args[0] ?? '';
$ps   = current( array_filter( $spec['posts'], fn( $p ) => $p['slug'] === $slug ) );
if ( ! $ps ) {
	WP_CLI::error( "slug não encontrado na spec: {$slug}" );
}

[ $markup, ] = post_md( $C . $ps['fonte'] );
$markup      = str_replace( '{{A}}', '/wp-content/themes/fireflies/assets/', $markup );
$markup      = preg_replace( '/\{\{U\}\}(?=["\'\s<])/', '/', $markup );
$markup      = str_replace( '{{U}}', '', $markup );

$autor = get_user_by( 'slug', $ps['autor'] ) ?: get_user_by( 'id', 1 );
$cats  = array();
foreach ( $ps['categorias'] as $c ) {
	$t = get_term_by( 'slug', $c, 'category' );
	if ( $t ) {
		$cats[] = $t->term_id;
	}
}
foreach ( $ps['tags'] as $t ) {
	if ( ! get_term_by( 'slug', $t, 'post_tag' ) ) {
		wp_insert_term( defined( 'FIREFLIES_CORE_ETIQUETAS' ) ? ( FIREFLIES_CORE_ETIQUETAS[ $t ] ?? $t ) : $t, 'post_tag', array( 'slug' => $t ) );
	}
}
$data   = ( getenv( 'FF_DATA' ) ?: $ps['data'] ) . ' 09:00:00';
$existe = get_page_by_path( $ps['slug'], OBJECT, 'post' );
$id     = wp_insert_post(
	array(
		'ID'             => $existe ? $existe->ID : 0,
		'post_type'      => 'post',
		'post_status'    => getenv( 'FF_STATUS' ) ?: $ps['status'],
		'post_title'     => $ps['titulo'],
		'post_name'      => $ps['slug'],
		'post_excerpt'   => $ps['excerpt'],
		'post_content'   => wp_slash( $markup ),
		'post_author'    => $autor->ID,
		'post_date'      => $data,
		'post_date_gmt'  => get_gmt_from_date( $data ),
		'comment_status' => 'closed',
		'ping_status'    => 'closed',
		'post_category'  => $cats,
		'tags_input'     => $ps['tags'],
	),
	true
);
if ( is_wp_error( $id ) ) {
	WP_CLI::error( $id->get_error_message() );
}
foreach ( $ps['meta'] as $k => $v ) {
	update_post_meta( $id, $k, $v );
}
update_post_meta( $id, '_ff_tempo_leitura_auto', fireflies_core_calcular_leitura( $markup ) );
foreach ( array( 'title' => array( 'rank_math_title', '_yoast_wpseo_title' ), 'description' => array( 'rank_math_description', '_yoast_wpseo_metadesc' ), 'focus_keyword' => array( 'rank_math_focus_keyword', '_yoast_wpseo_focuskw' ) ) as $k => $ms ) {
	foreach ( $ms as $m ) {
		if ( ! empty( $ps['seo'][ $k ] ) ) {
			update_post_meta( $id, $m, $ps['seo'][ $k ] );
		}
	}
}
WP_CLI::success( "post {$ps['slug']} → ID {$id} (" . strlen( $markup ) . ' bytes)' );
