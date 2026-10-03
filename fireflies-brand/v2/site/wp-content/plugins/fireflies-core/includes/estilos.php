<?php
/**
 * Estilos de bloco editoriais + CSS/JS (ficam com o plugin, não com o tema).
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	static function (): void {
		$estilos = array(
			'core/group'     => array(
				'nossa-leitura' => 'Nossa leitura',
				'em-aberto'     => 'Em aberto',
				'base-legal'    => 'Base legal',
				'voce-sabe'     => 'Você sabe?',
				'info'          => 'Informação',
			),
			'core/paragraph' => array(
				'nota-margem'    => 'Nota de margem',
				'aviso'          => 'Aviso informativo',
				'estado-ok'      => 'Estado: em dia',
				'estado-atencao' => 'Estado: atenção',
				'estado-critico' => 'Estado: crítico',
			),
			'core/list'      => array(
				'estrelas'     => 'Estrelas',
				'checklist'    => 'Passos com checklist',
				'fontes'       => 'Fontes numeradas',
				'linha-tempo'  => 'Linha do tempo',
				'codigos'      => 'Códigos em colunas',
			),
			'core/quote'     => array(
				'norma'    => 'Citação de norma',
				'destaque' => 'Citação em destaque (Anil)',
			),
			'core/table'     => array(
				'codigos' => 'Códigos',
				'matriz'  => 'Matriz de situação',
			),
		);
		foreach ( $estilos as $bloco => $lista ) {
			foreach ( $lista as $nome => $rotulo ) {
				register_block_style( $bloco, array( 'name' => $nome, 'label' => $rotulo ) );
			}
		}
	}
);

add_action(
	'wp_enqueue_scripts',
	static function (): void {
		wp_enqueue_style( 'fireflies-core-editorial', FIREFLIES_CORE_URL . 'assets/editorial.css', array(), FIREFLIES_CORE_VERSION );
		if ( is_singular() ) {
			$c = (string) get_post_field( 'post_content', get_queried_object_id() );
			if ( str_contains( $c, 'ff-com-progresso' ) || str_contains( $c, 'ff-buscavel' ) ) {
				wp_enqueue_script( 'fireflies-core-editorial', FIREFLIES_CORE_URL . 'assets/editorial.js', array(), FIREFLIES_CORE_VERSION, array( 'in_footer' => true, 'strategy' => 'defer' ) );
			}
		}
	}
);

add_action(
	'enqueue_block_assets',
	static function (): void {
		// Mesmo CSS dentro do editor de blocos (iframe).
		if ( is_admin() ) {
			wp_enqueue_style( 'fireflies-core-editorial', FIREFLIES_CORE_URL . 'assets/editorial.css', array(), FIREFLIES_CORE_VERSION );
		}
	}
);
