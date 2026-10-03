<?php
/**
 * Componentes editoriais de post (os mesmos do documento NFS-e para condomínios).
 */

require_once __DIR__ . '/secoes.php';

function u( string $p ): string {
	return '{{U}}' . $p;
}

function nossa_leitura( string $texto, string $titulo = 'Nossa leitura' ): string {
	return grupo( rotulo( $titulo ) . p( $texto ), array( 'class' => 'is-style-nossa-leitura' ) );
}
function em_aberto( string $titulo, string $texto ): string {
	return grupo( rotulo( 'Em aberto' ) . h( 4, $titulo ) . p( $texto ), array( 'class' => 'is-style-em-aberto' ) );
}
/** $itens: [titulo, url, detalhe] */
function consulte( array $itens, string $titulo = 'Consulte na íntegra' ): string {
	$li = array();
	foreach ( $itens as [ $t, $url, $det ] ) {
		$li[] = '<a href="' . $url . '">' . $t . '</a>' . ( $det ? '<br><span class="ff-meta">' . $det . '</span>' : '' );
	}
	return grupo( rotulo( $titulo ) . lista( $li, array( 'ordered' => true, 'class' => 'is-style-fontes' ) ), array( 'class' => 'ff-consulte' ) );
}
/** $itens: [titulo, texto] */
function passos_checklist( array $itens ): string {
	$li = array();
	foreach ( $itens as [ $t, $x ] ) {
		$li[] = "<strong>{$t}</strong>{$x}";
	}
	return lista( $li, array( 'ordered' => true, 'class' => 'is-style-checklist' ) );
}
function voce_sabe( string $pergunta, string $texto, string $rot = 'Você sabe o que significa?' ): string {
	return grupo( rotulo( $rot ) . h( 4, $pergunta ) . p( $texto ), array( 'class' => 'is-style-voce-sabe' ) );
}
function nota_margem( string $texto ): string {
	return p( $texto, array( 'class' => 'is-style-nota-margem' ) );
}
