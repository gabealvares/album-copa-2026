<?php
/**
 * Blocos dinâmicos (sem etapa de build): tempo de leitura, WhatsApp, índice e ficha do curso.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	static function (): void {
		wp_register_script(
			'fireflies-core-blocos',
			FIREFLIES_CORE_URL . 'blocks/editor.js',
			array( 'wp-blocks', 'wp-element', 'wp-server-side-render', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
			FIREFLIES_CORE_VERSION,
			true
		);

		$comum = array(
			'api_version'   => 3,
			'category'      => 'widgets',
			'editor_script' => 'fireflies-core-blocos',
			'uses_context'  => array( 'postId', 'postType' ),
			'supports'      => array( 'html' => false ),
		);

		register_block_type(
			'fireflies/tempo-leitura',
			$comum + array(
				'title'           => 'Tempo de leitura',
				'render_callback' => static function ( array $a, string $c, WP_Block $b ): string {
					$html = fireflies_core_html_leitura( (int) ( $b->context['postId'] ?? get_the_ID() ) );
					return $html ? '<p ' . get_block_wrapper_attributes() . '>' . $html . '</p>' : '';
				},
			)
		);

		register_block_type(
			'fireflies/whatsapp',
			array_merge(
				$comum,
				array(
					'title'           => 'Botão de WhatsApp',
					'attributes'      => array(
						'texto'    => array( 'type' => 'string', 'default' => 'Conversar no WhatsApp' ),
						'mensagem' => array( 'type' => 'string', 'default' => 'Olá! Vim pelo site da Fireflies Consultoria e quero agendar um diagnóstico.' ),
						'estilo'   => array( 'type' => 'string', 'default' => 'botao' ),
					),
					'render_callback' => static fn( array $a ) => fireflies_core_whatsapp( $a ),
				)
			)
		);

		register_block_type(
			'fireflies/indice',
			$comum + array(
				'title'           => 'Índice do post',
				'render_callback' => static fn() => fireflies_core_indice(),
			)
		);

		register_block_type(
			'fireflies/curso-ficha',
			array_merge(
				$comum,
				array(
					'title'           => 'Ficha do curso',
					'attributes'      => array( 'compacta' => array( 'type' => 'boolean', 'default' => false ) ),
					'render_callback' => static function ( array $a, string $c, WP_Block $b ): string {
						$id = (int) ( $b->context['postId'] ?? get_the_ID() );
						return $id ? fireflies_core_ficha_curso( $id, ! empty( $a['compacta'] ) ) : '';
					},
				)
			)
		);
	}
);
