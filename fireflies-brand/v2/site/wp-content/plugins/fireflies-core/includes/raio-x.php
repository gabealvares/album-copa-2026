<?php
/**
 * Raio-X do condomínio: simulador ilustrativo [fireflies_raio_x].
 * Os percentuais de referência ficam no filtro "fireflies_raio_x_referencias"
 * e devem ser definidos pelo responsável técnico antes do go-live.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

function fireflies_core_raio_x_refs(): array {
	// Percentuais sobre a receita potencial (estimativas de mercado).
	return apply_filters(
		'fireflies_raio_x_referencias',
		array(
			array( 'Pessoal e portaria', 38.0 ),
			array( 'Contratos e manutenção', 22.0 ),
			array( 'Água, luz e gás', 15.0 ),
			array( 'Administração e seguros', 8.0 ),
			array( 'Fundo de reserva', 8.75 ),
		)
	);
}

function fireflies_core_brl( float $v ): string {
	$s = number_format( abs( $v ) / 1000, 1, ',', '.' );
	return ( $v < 0 ? '−' : '' ) . 'R$ ' . $s . ' mil';
}

add_shortcode(
	'fireflies_raio_x',
	static function (): string {
		$u    = 120;
		$taxa = 780;
		$inad = 12;
		$refs = fireflies_core_raio_x_refs();
		$pot  = $u * $taxa;
		$rows = array( array( 'Inadimplência', -$pot * $inad / 100, 'inad' ) );
		foreach ( $refs as $i => [ $nome, $pct ] ) {
			$rows[] = array( $nome, -$pot * $pct / 100, 'r' . $i );
		}
		$saldo = $pot + array_sum( array_column( $rows, 1 ) );

		wp_enqueue_script( 'fireflies-core-raio-x', FIREFLIES_CORE_URL . 'assets/raio-x.js', array(), FIREFLIES_CORE_VERSION, array( 'in_footer' => true, 'strategy' => 'defer' ) );

		$campo = static function ( string $id, string $rot, int $min, int $max, int $step, int $val, string $fmt ): string {
			return sprintf(
				'<div class="ff-rx__campo"><label for="%1$s">%2$s</label><output for="%1$s" data-fmt="%7$s">%8$s</output><input type="range" id="%1$s" name="%1$s" min="%3$d" max="%4$d" step="%5$d" value="%6$d"></div>',
				esc_attr( $id ),
				esc_html( $rot ),
				$min,
				$max,
				$step,
				$val,
				esc_attr( $fmt ),
				esc_html( 'brl' === $fmt ? 'R$ ' . $val : ( 'pct' === $fmt ? $val . '%' : (string) $val ) )
			);
		};

		$h  = '<div class="ff-rx" data-refs="' . esc_attr( wp_json_encode( $refs ) ) . '">';
		$h .= '<form class="ff-rx__controles" aria-label="Dados do condomínio (simulação)">';
		$h .= $campo( 'ff-rx-unidades', 'Unidades', 10, 600, 10, $u, 'int' );
		$h .= $campo( 'ff-rx-taxa', 'Taxa média', 200, 3000, 20, $taxa, 'brl' );
		$h .= $campo( 'ff-rx-inad', 'Inadimplência', 0, 40, 1, $inad, 'pct' );
		$h .= '</form>';
		$h .= '<div class="ff-rx__resultado"><p class="ff-rx__titulo">Para onde vai a receita, por mês <span>Simulação</span></p><dl aria-live="polite">';
		$h .= '<div class="ff-rx__pot"><dt>Receita potencial</dt><dd data-k="pot">' . esc_html( fireflies_core_brl( $pot ) ) . '</dd></div>';
		foreach ( $rows as [ $nome, $v, $k ] ) {
			$h .= '<div><dt>' . esc_html( $nome ) . '</dt><dd data-k="' . esc_attr( $k ) . '">' . esc_html( fireflies_core_brl( $v ) ) . '</dd></div>';
		}
		$h .= '<div class="ff-rx__saldo' . ( $saldo < 0 ? ' is-neg' : '' ) . '"><dt>Saldo do mês</dt><dd data-k="saldo">' . esc_html( fireflies_core_brl( $saldo ) ) . '</dd></div>';
		$h .= '</dl><p class="ff-rx__alerta"' . ( $saldo < 0 ? '' : ' hidden' ) . '><strong>Atenção.</strong> Quando o caixa do mês não fecha, o fundo de reserva costuma cobrir a diferença. Sem ajuste, a taxa extra vira rotina.</p></div>';
		$h .= '</div>';
		return $h;
	}
);
