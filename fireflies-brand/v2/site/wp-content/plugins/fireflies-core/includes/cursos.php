<?php
/**
 * CPT curso (Academy) e taxonomia trilha.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

const FIREFLIES_CURSO_METAS = array(
	'_ff_carga_horaria'  => 'Carga horária',
	'_ff_formato'        => 'Formato',
	'_ff_nivel'          => 'Nível',
	'_ff_publico'        => 'Para quem',
	'_ff_pre_requisito'  => 'Pré-requisito',
	'_ff_certificado'    => 'Certificado',
	'_ff_observacao'     => 'Observação',
);

function fireflies_core_register_cursos(): void {
	register_post_type(
		'curso',
		array(
			'labels'        => array(
				'name'               => 'Cursos',
				'singular_name'      => 'Curso',
				'menu_name'          => 'Academy',
				'add_new'            => 'Novo curso',
				'add_new_item'       => 'Adicionar curso',
				'edit_item'          => 'Editar curso',
				'new_item'           => 'Novo curso',
				'view_item'          => 'Ver curso',
				'view_items'         => 'Ver cursos',
				'search_items'       => 'Buscar cursos',
				'not_found'          => 'Nenhum curso encontrado.',
				'all_items'          => 'Todos os cursos',
				'archives'           => 'Cursos da Academy',
			),
			'public'        => true,
			'show_in_rest'  => true,
			'menu_icon'     => 'dashicons-welcome-learn-more',
			'menu_position' => 21,
			'has_archive'   => 'academy/cursos',
			'rewrite'       => array( 'slug' => 'academy/cursos', 'with_front' => false ),
			'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'revisions', 'page-attributes' ),
			'taxonomies'    => array( 'trilha' ),
		)
	);

	register_taxonomy(
		'trilha',
		array( 'curso' ),
		array(
			'labels'            => array(
				'name'          => 'Trilhas',
				'singular_name' => 'Trilha',
				'add_new_item'  => 'Adicionar trilha',
				'edit_item'     => 'Editar trilha',
				'all_items'     => 'Todas as trilhas',
			),
			'hierarchical'      => true,
			'show_in_rest'      => true,
			'show_admin_column' => true,
			'rewrite'           => array( 'slug' => 'academy/trilha', 'with_front' => false ),
		)
	);

	foreach ( FIREFLIES_CURSO_METAS as $meta => $rotulo ) {
		register_post_meta(
			'curso',
			$meta,
			array(
				'type'              => '_ff_certificado' === $meta ? 'boolean' : 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => '_ff_certificado' === $meta ? 'rest_sanitize_boolean' : 'sanitize_text_field',
				'auth_callback'     => static fn() => current_user_can( 'edit_posts' ),
			)
		);
	}
}
add_action( 'init', 'fireflies_core_register_cursos' );

/**
 * Cursos ordenados pela ordem do menu (atributos da página) no arquivo.
 */
add_action(
	'pre_get_posts',
	static function ( WP_Query $q ): void {
		if ( ! is_admin() && $q->is_main_query() && ( $q->is_post_type_archive( 'curso' ) || $q->is_tax( 'trilha' ) ) ) {
			$q->set( 'orderby', array( 'menu_order' => 'ASC', 'title' => 'ASC' ) );
			$q->set( 'posts_per_page', 24 );
		}
	}
);

/**
 * Ficha do curso (trilha, carga horária, formato, nível, público, certificado).
 */
function fireflies_core_ficha_curso( int $post_id, bool $compacta = false ): string {
	$itens = array();
	if ( ! $compacta ) {
		$trilha = get_the_terms( $post_id, 'trilha' );
		if ( $trilha && ! is_wp_error( $trilha ) ) {
			$itens['Trilha'] = esc_html( implode( ', ', wp_list_pluck( $trilha, 'name' ) ) );
		}
	}
	$campos = $compacta ? array( '_ff_formato', '_ff_nivel' ) : array( '_ff_carga_horaria', '_ff_formato', '_ff_nivel', '_ff_publico', '_ff_pre_requisito', '_ff_certificado' );
	foreach ( $campos as $meta ) {
		$valor = get_post_meta( $post_id, $meta, true );
		if ( '_ff_certificado' === $meta ) {
			$valor = $valor ? 'Fireflies Academy' : '';
		}
		$valor = (string) $valor;
		if ( '' !== $valor ) {
			$itens[ FIREFLIES_CURSO_METAS[ $meta ] ] = esc_html( $valor );
		}
	}
	if ( ! $itens ) {
		return '';
	}
	$html = '';
	foreach ( $itens as $rotulo => $valor ) {
		$html .= '<div><dt>' . esc_html( $rotulo ) . '</dt><dd>' . $valor . '</dd></div>';
	}
	return '<dl class="ff-ficha-curso' . ( $compacta ? ' ff-ficha-curso--compacta' : '' ) . '">' . $html . '</dl>';
}

/**
 * Lista de trilhas: [fireflies_trilhas]
 */
add_shortcode(
	'fireflies_trilhas',
	static function (): string {
		$termos = get_terms( array( 'taxonomy' => 'trilha', 'hide_empty' => true ) );
		if ( ! $termos || is_wp_error( $termos ) ) {
			return '';
		}
		$atual = is_tax( 'trilha' ) ? get_queried_object_id() : 0;
		$li    = '<li' . ( is_post_type_archive( 'curso' ) ? ' class="current-cat"' : '' ) . '><a href="' . esc_url( (string) get_post_type_archive_link( 'curso' ) ) . '">Todas</a></li>';
		foreach ( $termos as $t ) {
			$li .= '<li' . ( $atual === $t->term_id ? ' class="current-cat"' : '' ) . '><a href="' . esc_url( get_term_link( $t ) ) . '">' . esc_html( $t->name ) . '</a></li>';
		}
		return '<nav aria-label="Trilhas da Academy"><ul class="ff-categorias">' . $li . '</ul></nav>';
	}
);
