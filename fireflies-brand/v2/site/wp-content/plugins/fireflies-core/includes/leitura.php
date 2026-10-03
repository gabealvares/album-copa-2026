<?php
/**
 * Tempo de leitura: meta calculada ao salvar + shortcode [fireflies_tempo_leitura].
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

const FIREFLIES_LEITURA_META = '_ff_tempo_leitura';

add_action(
	'init',
	static function (): void {
		$metas = array(
			FIREFLIES_LEITURA_META => array( 'integer', 'Minutos de leitura (calculado ao salvar; pode ser editado).' ),
			'_ff_eyebrow'          => array( 'string', 'Linha em mono acima do título.' ),
			'_ff_atualizado_em'    => array( 'string', 'Data de revisão (AAAA-MM-DD), exibida quando difere da publicação.' ),
		);
		foreach ( $metas as $chave => [ $tipo, $desc ] ) {
			register_post_meta(
				'post',
				$chave,
				array(
					'type'          => $tipo,
					'single'        => true,
					'show_in_rest'  => true,
					'description'   => $desc,
					'auth_callback' => static fn() => current_user_can( 'edit_posts' ),
				)
			);
		}
	}
);

/**
 * Minutos de leitura a 200 palavras por minuto (texto técnico em português).
 */
function fireflies_core_calcular_leitura( string $conteudo ): int {
	$texto    = wp_strip_all_tags( strip_shortcodes( $conteudo ) );
	$palavras = count( preg_split( '/\s+/u', trim( $texto ), -1, PREG_SPLIT_NO_EMPTY ) );
	return max( 1, (int) ceil( $palavras / 200 ) );
}

add_action(
	'wp_after_insert_post',
	static function ( int $post_id, WP_Post $post ): void {
		if ( 'post' !== $post->post_type || wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}
		// Recalcula só se o valor atual ainda é o automático (ou está vazio): a edição manual prevalece.
		$atual = (int) get_post_meta( $post_id, FIREFLIES_LEITURA_META, true );
		$auto  = (int) get_post_meta( $post_id, '_ff_tempo_leitura_auto', true );
		$novo  = fireflies_core_calcular_leitura( $post->post_content );
		if ( ! $atual || $atual === $auto ) {
			update_post_meta( $post_id, FIREFLIES_LEITURA_META, $novo );
		}
		update_post_meta( $post_id, '_ff_tempo_leitura_auto', $novo );
	},
	10,
	2
);

function fireflies_core_tempo_leitura( ?int $post_id = null ): int {
	$post_id = $post_id ?: get_the_ID();
	if ( ! $post_id ) {
		return 0;
	}
	$min = (int) get_post_meta( $post_id, FIREFLIES_LEITURA_META, true );
	if ( ! $min ) {
		$min = fireflies_core_calcular_leitura( (string) get_post_field( 'post_content', $post_id ) );
	}
	return $min;
}

function fireflies_core_html_leitura( ?int $post_id = null ): string {
	$min = fireflies_core_tempo_leitura( $post_id );
	if ( ! $min ) {
		return '';
	}
	/* translators: %d: minutos */
	return '<span class="ff-leitura">' . esc_html( sprintf( _n( 'Leitura de %d minuto', 'Leitura de %d minutos', $min, 'fireflies-core' ), $min ) ) . '</span>';
}

add_shortcode( 'fireflies_tempo_leitura', static fn() => fireflies_core_html_leitura() );
