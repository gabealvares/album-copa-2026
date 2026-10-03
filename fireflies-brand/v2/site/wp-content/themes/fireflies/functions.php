<?php
/**
 * Fireflies: suporte do tema, padrões, estilos de bloco e fontes.
 *
 * @package fireflies
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const FIREFLIES_VERSION = '1.0.0';

/**
 * Suporte do tema.
 */
function fireflies_setup(): void {
	load_theme_textdomain( 'fireflies', get_template_directory() . '/languages' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'post-thumbnails' );
	add_editor_style( 'assets/css/editorial.css' );
	// Os padrões do núcleo não são da marca.
	remove_theme_support( 'core-block-patterns' );
}
add_action( 'after_setup_theme', 'fireflies_setup' );

add_filter( 'should_load_remote_block_patterns', '__return_false' );

/**
 * CSS editorial (componentes que o theme.json não descreve).
 */
function fireflies_enqueue(): void {
	wp_enqueue_style(
		'fireflies-editorial',
		get_theme_file_uri( 'assets/css/editorial.css' ),
		array(),
		FIREFLIES_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'fireflies_enqueue' );

/**
 * Pré-carrega as duas fontes que aparecem acima da dobra.
 */
function fireflies_preload_fonts(): void {
	foreach ( array( 'Sora-700-normal', 'IBMPlexSans-400-normal' ) as $font ) {
		printf(
			'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
			esc_url( get_theme_file_uri( "assets/fonts/{$font}.woff2" ) )
		);
	}
}
add_action( 'wp_head', 'fireflies_preload_fonts', 1 );

/**
 * Sem script de emoji: o site não usa emoji.
 */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

/**
 * Categorias de padrões e estilos de bloco.
 */
function fireflies_register_blocks(): void {
	register_block_pattern_category( 'fireflies', array( 'label' => __( 'Fireflies: páginas', 'fireflies' ) ) );
	register_block_pattern_category( 'fireflies-editorial', array( 'label' => __( 'Fireflies: editoriais de post', 'fireflies' ) ) );

	$styles = array(
		'core/paragraph' => array(
			'rotulo'      => __( 'Rótulo (mono)', 'fireflies' ),
			'abertura'    => __( 'Abertura', 'fireflies' ),
			'nota-margem' => __( 'Nota de margem', 'fireflies' ),
			'numero'      => __( 'Número de destaque', 'fireflies' ),
			'estado-ok'      => __( 'Estado: em dia', 'fireflies' ),
			'estado-atencao' => __( 'Estado: atenção', 'fireflies' ),
			'estado-critico' => __( 'Estado: crítico', 'fireflies' ),
		),
		'core/heading'   => array(
			'versal' => __( 'Caixa alta (títulos curtos)', 'fireflies' ),
		),
		'core/separator' => array(
			'fio'         => __( 'Fio', 'fireflies' ),
			'fio-rubrica' => __( 'Fio de rubrica', 'fireflies' ),
			'pontilhado'  => __( 'Pontilhado', 'fireflies' ),
		),
		'core/list'      => array(
			'estrelas'  => __( 'Estrelas', 'fireflies' ),
			'checklist' => __( 'Passos com checklist', 'fireflies' ),
			'fontes'    => __( 'Fontes numeradas', 'fireflies' ),
		),
		'core/table'     => array(
			'numeros' => __( 'Números à direita', 'fireflies' ),
		),
		'core/group'     => array(
			'nossa-leitura' => __( 'Nossa leitura', 'fireflies' ),
			'em-aberto'     => __( 'Em aberto', 'fireflies' ),
			'base-legal'    => __( 'Base legal', 'fireflies' ),
			'voce-sabe'     => __( 'Você sabe?', 'fireflies' ),
		),
		'core/columns'   => array(
			'livro-razao' => __( 'Livro-razão (colunas com fios)', 'fireflies' ),
			'passos'      => __( 'Passos em constelação', 'fireflies' ),
			'linha-indice' => __( 'Linha de índice', 'fireflies' ),
		),
		'core/image'     => array(
			'emblema' => __( 'Emblema (sem moldura)', 'fireflies' ),
		),
	);

	foreach ( $styles as $block => $variations ) {
		foreach ( $variations as $name => $label ) {
			register_block_style( $block, array( 'name' => $name, 'label' => $label ) );
		}
	}
}
add_action( 'init', 'fireflies_register_blocks' );

/**
 * Helper para os padrões: URL de um arquivo do tema.
 */
function fireflies_asset( string $path ): string {
	return esc_url( get_theme_file_uri( 'assets/' . ltrim( $path, '/' ) ) );
}
