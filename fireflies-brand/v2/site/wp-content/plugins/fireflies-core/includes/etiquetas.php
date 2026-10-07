<?php
/**
 * Nomes legíveis para as tags do blog ("lc-214-2025" → "LC 214/2025").
 * Roda uma vez e só troca o nome quando ele ainda é igual ao slug (não mexe no que foi editado à mão).
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

const FIREFLIES_CORE_ETIQUETAS = array(
	'administradoras'        => 'Administradoras',
	'auditoria'              => 'Auditoria',
	'cadastro-de-condominos' => 'Cadastro de condôminos',
	'cib'                    => 'CIB',
	'efd-reinf'              => 'EFD-Reinf',
	'codigo-civil'           => 'Código Civil',
	'conselho-fiscal'        => 'Conselho fiscal',
	'fundo-de-reserva'       => 'Fundo de reserva',
	'ibs-cbs'                => 'IBS e CBS',
	'inadimplencia'          => 'Inadimplência',
	'inss'                   => 'INSS',
	'iptu'                   => 'IPTU',
	'irrf'                   => 'IRRF',
	'iss'                    => 'ISS',
	'lc-214-2025'            => 'LC 214/2025',
	'lei-do-inquilinato'     => 'Lei do Inquilinato',
	'nfs-e'                  => 'NFS-e',
	'pcc'                    => 'PCC',
	'prestacao-de-contas'    => 'Prestação de contas',
	'previsao-orcamentaria'  => 'Previsão orçamentária',
	'retencoes'              => 'Retenções',
	'sindico'                => 'Síndico',
);

add_action( 'init', 'fireflies_core_etiquetas', 97 );

function fireflies_core_etiquetas(): void {
	if ( get_option( 'fireflies_etiquetas_v2' ) || wp_installing() || wp_doing_ajax() || wp_doing_cron() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
		return;
	}
	foreach ( FIREFLIES_CORE_ETIQUETAS as $slug => $nome ) {
		$t = get_term_by( 'slug', $slug, 'post_tag' );
		if ( $t && $t->name === $slug ) {
			wp_update_term( $t->term_id, 'post_tag', array( 'name' => $nome ) );
		}
	}
	update_option( 'fireflies_etiquetas_v2', gmdate( 'c' ), false );
}
