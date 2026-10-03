<?php
/**
 * Editorial: âncoras nos H2, índice do post, relacionados, formulário e newsletter.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

/**
 * Âncora estável para um título.
 */
function fireflies_core_ancora( string $texto ): string {
	return sanitize_title( wp_strip_all_tags( $texto ) );
}

/**
 * Coloca id nos H2 dos posts que não têm âncora (para o índice).
 */
add_filter(
	'render_block_core/heading',
	static function ( string $html, array $block ): string {
		if ( ! is_singular() || ! empty( $block['attrs']['anchor'] ) || ( $block['attrs']['level'] ?? 2 ) !== 2 ) {
			return $html;
		}
		if ( str_contains( $html, ' id=' ) ) {
			return $html;
		}
		$id = fireflies_core_ancora( $html );
		return $id ? preg_replace( '/<h2\b/', '<h2 id="' . esc_attr( $id ) . '"', $html, 1 ) : $html;
	},
	10,
	2
);

/**
 * Lista dos H2 de um post.
 *
 * @return array<int, array{id:string, texto:string}>
 */
function fireflies_core_titulos( int $post_id ): array {
	$itens  = array();
	$blocos = parse_blocks( (string) get_post_field( 'post_content', $post_id ) );
	$planos = array();
	$andar  = static function ( array $lista ) use ( &$andar, &$planos ): void {
		foreach ( $lista as $b ) {
			$planos[] = $b;
			if ( ! empty( $b['innerBlocks'] ) ) {
				$andar( $b['innerBlocks'] );
			}
		}
	};
	$andar( $blocos );
	foreach ( $planos as $bloco ) {
		if ( 'core/heading' !== $bloco['blockName'] || ( $bloco['attrs']['level'] ?? 2 ) !== 2 ) {
			continue;
		}
		$texto = trim( preg_replace( '/^\d+\s*·\s*/u', '', trim( html_entity_decode( wp_strip_all_tags( $bloco['innerHTML'] ) ) ) ) );
		if ( '' === $texto ) {
			continue;
		}
		$itens[] = array(
			'id'    => $bloco['attrs']['anchor'] ?? fireflies_core_ancora( $bloco['innerHTML'] ),
			'texto' => $texto,
		);
	}
	return $itens;
}

function fireflies_core_indice( array $atts = array() ): string {
	$post_id = get_the_ID();
	$itens   = $post_id ? fireflies_core_titulos( $post_id ) : array();
	if ( count( $itens ) < 2 ) {
		return '';
	}
	$titulo = $atts['titulo'] ?? 'Neste artigo';
	$li     = '';
	foreach ( $itens as $item ) {
		$li .= '<li><a href="#' . esc_attr( $item['id'] ) . '">' . esc_html( $item['texto'] ) . '</a></li>';
	}
	return '<nav class="ff-indice-post" aria-label="' . esc_attr( $titulo ) . '"><p class="is-style-rotulo">' . esc_html( $titulo ) . '</p><ol>' . $li . '</ol></nav>';
}
add_shortcode( 'fireflies_indice', 'fireflies_core_indice' );

/**
 * Consultas: "ffCategoria": "slug" filtra por categoria (portável entre instalações);
 * Relacionados: um bloco Consulta com "ffRelacionados": true dentro de query
 * mostra posts da mesma categoria, sem o atual.
 */
add_filter(
	'query_loop_block_query_vars',
	static function ( array $query, WP_Block $block ): array {
		$q = $block->context['query'] ?? array();
		if ( ! empty( $q['ffCategoria'] ) ) {
			$query['category_name'] = sanitize_title( $q['ffCategoria'] );
		}
		if ( empty( $q['ffRelacionados'] ) || ! is_singular() ) {
			return $query;
		}
		$atual                  = get_queried_object_id();
		$query['post__not_in']  = array( $atual );
		$query['ignore_sticky_posts'] = true;
		$cats = wp_get_post_categories( $atual );
		if ( $cats ) {
			$query['category__in'] = $cats;
		}
		return $query;
	},
	10,
	2
);

/**
 * Slot de formulário: usa o shortcode configurado (Contact Form 7, WPForms…)
 * ou cai para WhatsApp + e-mail.
 */
function fireflies_core_formulario( array $atts = array() ): string {
	$sc = fireflies_core_opcao( 'form' );
	if ( $sc && preg_match( '/^\[([a-z0-9_\-]+)/i', $sc, $m ) && shortcode_exists( $m[1] ) ) {
		return '<div class="ff-form">' . do_shortcode( $sc ) . '</div>';
	}
	$email = fireflies_core_opcao( 'email' );
	return '<div class="ff-form-fallback">'
		. '<p>Conte em poucas linhas o que você precisa, pelo WhatsApp ou por e-mail. A gente responde no mesmo dia útil, de segunda a sexta, das 8h às 18h.</p>'
		. fireflies_core_whatsapp( array( 'texto' => 'Agendar pelo WhatsApp' ) )
		. '<p><a href="mailto:' . esc_attr( antispambot( $email ) ) . '">' . esc_html( antispambot( $email ) ) . '</a></p>'
		. '</div>';
}
add_shortcode( 'fireflies_formulario', 'fireflies_core_formulario' );

function fireflies_core_newsletter(): string {
	$sc = fireflies_core_opcao( 'newsletter' );
	if ( $sc && preg_match( '/^\[([a-z0-9_\-]+)/i', $sc, $m ) && shortcode_exists( $m[1] ) ) {
		return '<div class="ff-form">' . do_shortcode( $sc ) . '</div>';
	}
	if ( current_user_can( 'manage_options' ) ) {
		return '<p class="ff-meta">Slot de newsletter: configure o shortcode em Configurações › Geral › Fireflies Consultoria. Só administradores veem este aviso.</p>';
	}
	return fireflies_core_whatsapp(
		array(
			'texto'    => 'Receber pelo WhatsApp',
			'mensagem' => 'Quero receber os próximos artigos da Fireflies Consultoria.',
			'estilo'   => 'contorno',
		)
	);
}
add_shortcode( 'fireflies_newsletter', 'fireflies_core_newsletter' );

/**
 * Blog sem comentários (decisão de arquitetura) e autor em /blog/autor/.
 */
add_filter( 'comments_open', '__return_false', 20 );
add_filter( 'pings_open', '__return_false', 20 );
add_filter( 'comments_array', '__return_empty_array', 20 );
add_action(
	'init',
	static function (): void {
		global $wp_rewrite;
		$wp_rewrite->author_base = 'blog/autor';
	}
);

/**
 * Eyebrow do post: meta _ff_eyebrow ou, na falta, a categoria principal.
 */
function fireflies_core_eyebrow( int $post_id ): string {
	$txt = (string) get_post_meta( $post_id, '_ff_eyebrow', true );
	if ( '' === $txt ) {
		$cats = get_the_category( $post_id );
		$txt  = $cats ? $cats[0]->name : '';
	}
	if ( 'curso' === get_post_type( $post_id ) ) {
		$t   = get_the_terms( $post_id, 'trilha' );
		$txt = 'Fireflies Academy' . ( $t && ! is_wp_error( $t ) ? ' · Trilha ' . $t[0]->name : '' );
	}
	return $txt;
}

/**
 * Seção de relacionados some quando não há posts para mostrar.
 */
add_filter(
	'render_block_core/group',
	static function ( string $html, array $block ): string {
		$cls = $block['attrs']['className'] ?? '';
		if ( str_contains( $cls, 'ff-secao-relacionados' ) && ! str_contains( $html, 'wp-block-post ' ) ) {
			return '';
		}
		return $html;
	},
	10,
	2
);

/**
 * Shortcodes dentro de blocos Shortcode em modelos e padrões do tema
 * (o núcleo só os processa no conteúdo do post).
 */
add_filter(
	'render_block_core/shortcode',
	static function ( string $html, array $block ): string {
		$raw = trim( (string) ( $block['innerHTML'] ?? '' ) );
		// Só um shortcode no bloco: renderiza sem o <p> do wpautop (evita <div> dentro de <p>).
		if ( preg_match( '/^\[[^\]]+\](?:.*\[\/[^\]]+\])?$/s', $raw ) ) {
			return do_shortcode( $raw );
		}
		return str_contains( $html, '[' ) ? do_shortcode( $html ) : $html;
	},
	10,
	2
);
