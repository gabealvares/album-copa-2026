<?php
/**
 * Biblioteca de marcação de blocos da Fireflies.
 *
 * Gera HTML de blocos do Gutenberg idêntico ao save() do núcleo, para que o
 * editor abra tudo sem "conteúdo inesperado". É usada por:
 *  - gerar-patterns.php (escreve wp-content/themes/fireflies/patterns/*.php)
 *  - conteudo.php       (cria páginas, posts e cursos via wp eval-file)
 *
 * Marcadores: {{A}} = pasta assets do tema; {{U}}/caminho = URL interna.
 */

// ------------------------------------------------------------------ base

function ff_json( array $a ): string {
	if ( ! $a ) {
		return '';
	}
	$j = json_encode( $a, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
	$j = str_replace( array( '--', '<', '>', '&' ), array( '\\u002d\\u002d', '\\u003c', '\\u003e', '\\u0026' ), $j );
	return ' ' . $j;
}
function ff_b( string $name, array $a, string $html ): string {
	return "<!-- wp:{$name}" . ff_json( $a ) . " -->\n{$html}\n<!-- /wp:{$name} -->\n";
}
function ff_v( string $name, array $a = array() ): string {
	return "<!-- wp:{$name}" . ff_json( $a ) . " /-->\n";
}
function ff_cls( array $c ): string {
	$c = array_values( array_filter( $c ) );
	return $c ? ' class="' . implode( ' ', $c ) . '"' : '';
}
/** Classes e atributos de cor/tamanho (supports) */
function ff_sup( array &$a, array $o ): array {
	$c = array();
	if ( ! empty( $o['class'] ) ) {
		$a['className'] = $o['class'];
		$c[]            = $o['class'];
	}
	if ( ! empty( $o['align'] ) ) {
		$a['align'] = $o['align'];
		$c[]        = 'align' . $o['align'];
	}
	if ( ! empty( $o['text'] ) ) {
		$a['textColor'] = $o['text'];
		$c[]            = "has-{$o['text']}-color";
		$c[]            = 'has-text-color';
	}
	if ( ! empty( $o['bg'] ) ) {
		$a['backgroundColor'] = $o['bg'];
		$c[]                  = "has-{$o['bg']}-background-color";
		$c[]                  = 'has-background';
	}
	if ( ! empty( $o['size'] ) ) {
		$a['fontSize'] = $o['size'];
		$c[]           = "has-{$o['size']}-font-size";
	}
	if ( ! empty( $o['font'] ) ) {
		$a['fontFamily'] = $o['font'];
		$c[]             = "has-{$o['font']}-font-family";
	}
	return $c;
}
/** style.spacing → atributo + inline */
function ff_espaco( array &$a, array $o ): string {
	$css = array();
	foreach ( array( 'pad' => 'padding', 'mar' => 'margin' ) as $k => $prop ) {
		if ( empty( $o[ $k ] ) ) {
			continue;
		}
		foreach ( $o[ $k ] as $lado => $v ) {
			$a['style']['spacing'][ $prop ][ $lado ] = $v;
			$css[] = "{$prop}-{$lado}:" . ff_var( $v );
		}
	}
	return $css ? ' style="' . implode( ';', $css ) . '"' : '';
}
function ff_var( string $v ): string {
	return preg_match( '/^var:preset\|spacing\|(\w+)$/', $v, $m ) ? "var(--wp--preset--spacing--{$m[1]})" : $v;
}
function sp( string $n ): string {
	return "var:preset|spacing|{$n}";
}

// ------------------------------------------------------------------ texto

function p( string $html, array $o = array() ): string {
	$a = array();
	$c = ff_sup( $a, $o );
	if ( ! empty( $o['center'] ) ) {
		$a['align'] = 'center';
		$c[]        = 'has-text-align-center';
	}
	$st = ff_espaco( $a, $o );
	return ff_b( 'paragraph', $a, '<p' . ff_cls( $c ) . $st . ">{$html}</p>" );
}
function rotulo( string $t, array $o = array() ): string {
	$o['class'] = trim( 'is-style-rotulo ' . ( $o['class'] ?? '' ) );
	return p( $t, $o );
}
function abertura( string $t, array $o = array() ): string {
	$o['class'] = trim( 'is-style-abertura ' . ( $o['class'] ?? '' ) );
	return p( $t, $o );
}
function nota( string $t, array $o = array() ): string {
	$o += array( 'size' => 'nota', 'font' => 'plex-mono', 'text' => 'pedra' );
	return p( $t, $o );
}
function h( int $nivel, string $html, array $o = array() ): string {
	$a = array();
	if ( 2 !== $nivel ) {
		$a['level'] = $nivel;
	}
	$c = array_merge( array( 'wp-block-heading' ), ff_sup( $a, $o ) );
	if ( ! empty( $o['center'] ) ) {
		$a['textAlign'] = 'center';
		$c[]            = 'has-text-align-center';
	}
	if ( ! empty( $o['anchor'] ) ) {
		$a['anchor'] = $o['anchor'];
	}
	$st = ff_espaco( $a, $o );
	// a ordem dos atributos JSON do núcleo não importa; o HTML sim.
	$id = ! empty( $o['anchor'] ) ? ' id="' . $o['anchor'] . '"' : '';
	return ff_b( 'heading', $a, "<h{$nivel}{$id}" . ff_cls( $c ) . $st . ">{$html}</h{$nivel}>" );
}
function lista( array $itens, array $o = array() ): string {
	$a   = array();
	$tag = ! empty( $o['ordered'] ) ? 'ol' : 'ul';
	if ( 'ol' === $tag ) {
		$a['ordered'] = true;
	}
	$c   = array_merge( array( 'wp-block-list' ), ff_sup( $a, $o ) );
	$li  = '';
	foreach ( $itens as $i ) {
		$li .= ff_b( 'list-item', array(), "<li>{$i}</li>" );
	}
	return ff_b( 'list', $a, "<{$tag}" . ff_cls( $c ) . ">\n{$li}</{$tag}>" );
}
function sep( string $estilo = '', array $o = array() ): string {
	$a = array();
	$c = array( 'wp-block-separator', 'has-alpha-channel-opacity' );
	if ( $estilo ) {
		$a['className'] = "is-style-{$estilo}";
		$c[]            = "is-style-{$estilo}";
	}
	$st = ff_espaco( $a, $o );
	return ff_b( 'separator', $a, '<hr' . ff_cls( $c ) . $st . '/>' );
}
function citacao( string $texto, string $cite = '', array $o = array() ): string {
	$a = array();
	$c = array_merge( array( 'wp-block-quote' ), ff_sup( $a, $o ) );
	$inner = p( $texto );
	return ff_b( 'quote', $a, '<blockquote' . ff_cls( $c ) . '>' . $inner . ( $cite ? "<cite>{$cite}</cite>" : '' ) . '</blockquote>' );
}
function html( string $raw ): string {
	return ff_b( 'html', array(), $raw );
}
function shortcode( string $sc ): string {
	return ff_b( 'shortcode', array(), $sc );
}

// ------------------------------------------------------------------ mídia

function img( string $src, string $alt, array $o = array() ): string {
	$a = array( 'sizeSlug' => 'full', 'linkDestination' => 'none' );
	$c = array( 'wp-block-image', 'size-full' );
	$imgst = '';
	if ( ! empty( $o['w'] ) ) {
		$a['width'] = $o['w'];
		$c[]        = 'is-resized';
		$imgst      = ' style="width:' . $o['w'] . '"';
	}
	$c   = array_merge( $c, ff_sup( $a, $o ) );
	$cap = ! empty( $o['caption'] ) ? '<figcaption class="wp-element-caption">' . $o['caption'] . '</figcaption>' : '';
	return ff_b( 'image', $a, '<figure' . ff_cls( $c ) . '><img src="' . $src . '" alt="' . $alt . '"' . $imgst . '/>' . $cap . '</figure>' );
}
function constelacao( string $servico, string $fundo = 'escuro', array $o = array() ): string {
	$nomes = array(
		'auditoria'   => 'Auditoria',
		'contabil'    => 'Contábil',
		'fiscal'      => 'Fiscal',
		'financeira'  => 'Financeira',
		'processos'   => 'Processos',
		'sindicancia' => 'Sindicância',
		'condominios' => 'Condomínios',
		'academy'     => 'Academy',
	);
	$o += array( 'w' => '220px', 'class' => 'is-style-emblema' );
	return img( "{{A}}img/constelacoes/{$fundo}/{$servico}-sem-letras.svg", 'Constelação ' . $nomes[ $servico ] . ', emblema do serviço', $o );
}

// ------------------------------------------------------------------ botões

/** @param array<int, array{0:string,1:string,2?:string}> $bs texto, url, 'outline' */
function botoes( array $bs, array $o = array() ): string {
	$a = array();
	$c = array_merge( array( 'wp-block-buttons' ), ff_sup( $a, $o ) );
	if ( ! empty( $o['center'] ) ) {
		$a['layout'] = array( 'type' => 'flex', 'justifyContent' => 'center' );
		$c[]         = 'is-content-justification-center';
	}
	$st = ff_espaco( $a, $o );
	$in = '';
	foreach ( $bs as $b ) {
		$ba = array();
		$bc = array( 'wp-block-button' );
		if ( ! empty( $b[2] ) ) {
			$ba['className'] = 'is-style-outline';
			$bc[]            = 'is-style-outline';
		}
		$ext = str_starts_with( $b[1], 'http' ) ? ' target="_blank" rel="noreferrer noopener"' : '';
		if ( $ext ) {
			$ba['linkTarget'] = '_blank';
			$ba['rel']        = 'noreferrer noopener';
		}
		$in .= ff_b( 'button', $ba, '<div' . ff_cls( $bc ) . '><a class="wp-block-button__link wp-element-button" href="' . $b[1] . '"' . $ext . '>' . $b[0] . '</a></div>' );
	}
	return ff_b( 'buttons', $a, '<div' . ff_cls( $c ) . $st . ">\n{$in}</div>" );
}
function wa( string $msg = '' ): string {
	return 'https://wa.me/5511982450527' . ( $msg ? '?text=' . rawurlencode( $msg ) : '' );
}

// ------------------------------------------------------------------ layout

function grupo( string $inner, array $o = array() ): string {
	$a   = array();
	$tag = $o['tag'] ?? 'div';
	if ( 'div' !== $tag ) {
		$a['tagName'] = $tag;
	}
	$c  = array_merge( array( 'wp-block-group' ), ff_sup( $a, $o ) );
	$st = ff_espaco( $a, $o );
	if ( isset( $o['layout'] ) ) {
		$a['layout'] = $o['layout'];
		if ( 'flex' === ( $o['layout']['type'] ?? '' ) ) {
			// classes de layout flex são geradas no render; nada no HTML salvo.
		}
	}
	if ( isset( $o['gap'] ) ) {
		$a['style']['spacing']['blockGap'] = $o['gap'];
	}
	return ff_b( 'group', $a, "<{$tag}" . ff_cls( $c ) . $st . ">\n{$inner}</{$tag}>" );
}
/**
 * Seção sangrada. $v: '' (branco), 'noite', 'cal'.
 */
function secao( string $inner, string $v = '', array $o = array() ): string {
	$o += array(
		'tag'    => 'section',
		'align'  => 'full',
		'pad'    => array( 'top' => sp( '70' ), 'bottom' => sp( '70' ) ),
		'layout' => array( 'type' => 'constrained', 'contentSize' => '1240px' ),
	);
	$o['class'] = trim( ( $v ? "is-style-{$v} " : '' ) . ( $o['class'] ?? '' ) );
	return grupo( $inner, $o );
}
/** Grupo estreito (coluna de leitura) alinhado à esquerda dentro da seção */
function estreito( string $inner, string $largura = '720px', array $o = array() ): string {
	$o['layout'] = array( 'type' => 'constrained', 'contentSize' => $largura, 'justifyContent' => 'left' );
	return grupo( $inner, $o );
}
/**
 * @param array<int, array{html:string, w?:string, class?:string, va?:string}> $cols
 */
function colunas( array $cols, array $o = array() ): string {
	$a = array();
	$c = array_merge( array( 'wp-block-columns' ), ff_sup( $a, $o ) );
	if ( ! empty( $o['va'] ) ) {
		$a['verticalAlignment'] = $o['va'];
		$c[]                    = 'are-vertically-aligned-' . $o['va'];
	}
	if ( isset( $o['gap'] ) ) {
		$a['style']['spacing']['blockGap'] = array( 'left' => $o['gap'], 'top' => $o['gap'] );
	}
	if ( isset( $o['stack'] ) && false === $o['stack'] ) {
		$a['isStackedOnMobile'] = false;
		$c[]                    = 'is-not-stacked-on-mobile';
	}
	$st = ff_espaco( $a, $o );
	$in = '';
	foreach ( $cols as $col ) {
		$ca = array();
		$cc = array( 'wp-block-column' );
		$cs = '';
		if ( ! empty( $col['va'] ) ) {
			$ca['verticalAlignment'] = $col['va'];
			$cc[]                    = 'is-vertically-aligned-' . $col['va'];
		}
		if ( ! empty( $col['w'] ) ) {
			$ca['width'] = $col['w'];
			$cs          = ' style="flex-basis:' . $col['w'] . '"';
		}
		if ( ! empty( $col['class'] ) ) {
			$ca['className'] = $col['class'];
			$cc[]            = $col['class'];
		}
		$in .= ff_b( 'column', $ca, '<div' . ff_cls( $cc ) . $cs . ">\n{$col['html']}</div>" );
	}
	return ff_b( 'columns', $a, '<div' . ff_cls( $c ) . $st . ">\n{$in}</div>" );
}
function detalhes( string $pergunta, string $resposta ): string {
	return ff_b( 'details', array(), '<details class="wp-block-details"><summary>' . $pergunta . '</summary>' . p( $resposta ) . '</details>' );
}
/**
 * @param string[]   $cab
 * @param string[][] $linhas
 */
function tabela( array $cab, array $linhas, array $o = array() ): string {
	$a = array( 'hasFixedLayout' => false );
	$c = array_merge( array( 'wp-block-table' ), ff_sup( $a, $o ) );
	$t = '<thead><tr>';
	foreach ( $cab as $x ) {
		$t .= "<th>{$x}</th>";
	}
	$t .= '</tr></thead><tbody>';
	foreach ( $linhas as $l ) {
		$t .= '<tr>';
		foreach ( $l as $x ) {
			$t .= "<td>{$x}</td>";
		}
		$t .= '</tr>';
	}
	$t  .= '</tbody>';
	if ( ! empty( $o['foot'] ) ) {
		$t .= '<tfoot><tr>';
		foreach ( $o['foot'] as $x ) {
			$t .= "<td>{$x}</td>";
		}
		$t .= '</tr></tfoot>';
	}
	$cap = ! empty( $o['caption'] ) ? '<figcaption class="wp-element-caption">' . $o['caption'] . '</figcaption>' : '';
	return ff_b( 'table', $a, '<figure' . ff_cls( $c ) . "><table>{$t}</table>{$cap}</figure>" );
}

// ------------------------------------------------------------------ consultas

function consulta_posts( array $q, string $template, array $o = array() ): string {
	$q += array(
		'perPage'  => 3,
		'pages'    => 0,
		'offset'   => 0,
		'postType' => 'post',
		'order'    => 'desc',
		'orderBy'  => 'date',
		'author'   => '',
		'search'   => '',
		'exclude'  => array(),
		'sticky'   => '',
		'inherit'  => false,
	);
	$a = array( 'queryId' => $o['id'] ?? 10, 'query' => $q );
	$c = array_merge( array( 'wp-block-query' ), ff_sup( $a, $o ) );
	if ( isset( $o['layout'] ) ) {
		$a['layout'] = $o['layout'];
	}
	return ff_b( 'query', $a, '<div' . ff_cls( $c ) . ">\n{$template}" . ( $o['extra'] ?? '' ) . '</div>' );
}
function post_template( string $inner, array $layout = array() ): string {
	$a = $layout ? array( 'layout' => $layout ) : array();
	return ff_b( 'post-template', $a, $inner );
}

// ------------------------------------------------------------------ peças da marca

/** Constelação dos serviços (SVG inline, sem âmbar: a luz é do logo e do botão). */
function svg_constelacao_servicos( bool $escuro = true ): string {
	$fg   = $escuro ? '#EDEEEA' : '#17183A';
	$ln   = $escuro ? '#6E89B4' : '#5E6271';
	$lab  = $escuro ? '#D2D4DA' : '#5E6271';
	$nos  = array(
		'auditoria'   => array( 'Auditoria de condomínios', 118, 92, 6.5, 'start' ),
		'contabil'    => array( 'Contábil', 262, 168, 5, 'start' ),
		'fiscal'      => array( 'Fiscal', 404, 104, 4, 'start' ),
		'financeira'  => array( 'Financeira', 352, 292, 4.5, 'start' ),
		'processos'   => array( 'Processos', 470, 232, 3.5, 'end' ),
		'sindicancia' => array( 'Sindicância', 70, 262, 3.5, 'start' ),
	);
	$arestas = array( array( 'auditoria', 'contabil' ), array( 'contabil', 'fiscal' ), array( 'contabil', 'financeira' ), array( 'fiscal', 'processos' ), array( 'auditoria', 'sindicancia' ) );
	$s  = '<svg class="ff-constelacao-servicos" viewBox="0 0 540 360" role="img" aria-labelledby="ffcs-t" xmlns="http://www.w3.org/2000/svg">';
	$s .= '<title id="ffcs-t">Os seis serviços da Fireflies Consultoria como uma constelação: auditoria de condomínios ligada a contábil e sindicância; contábil ligada a fiscal e financeira; fiscal ligada a processos.</title>';
	$s .= '<path d="M20 30H300V12H520V330H210V346H20Z" fill="none" stroke="' . $ln . '" stroke-width=".8" stroke-dasharray="3 4" opacity=".7"/>';
	foreach ( $arestas as [ $x, $y ] ) {
		[ , $x1, $y1, $r1 ] = $nos[ $x ];
		[ , $x2, $y2, $r2 ] = $nos[ $y ];
		$dx  = $x2 - $x1;
		$dy  = $y2 - $y1;
		$len = sqrt( $dx * $dx + $dy * $dy );
		$ux  = $dx / $len;
		$uy  = $dy / $len;
		$ax  = round( $x1 + $ux * ( $r1 + 6 ), 1 );
		$ay  = round( $y1 + $uy * ( $r1 + 6 ), 1 );
		$bx  = round( $x2 - $ux * ( $r2 + 6 ), 1 );
		$by  = round( $y2 - $uy * ( $r2 + 6 ), 1 );
		$s  .= '<path d="M' . $ax . ' ' . $ay . 'L' . $bx . ' ' . $by . '" stroke="' . $fg . '" stroke-width="2" stroke-linecap="round" stroke-dasharray="0 6" opacity=".9"/>';
	}
	foreach ( $nos as [ $nome, $x, $y, $r, $anc ] ) {
		$s .= '<circle cx="' . $x . '" cy="' . $y . '" r="' . $r . '" fill="' . $fg . '"/>';
		$tx = 'end' === $anc ? $x - 12 : $x + 12;
		$s .= '<text x="' . $tx . '" y="' . ( $y + 4 ) . '" text-anchor="' . $anc . '" fill="' . $lab . '" font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="1.3">' . mb_strtoupper( $nome ) . '</text>';
	}
	foreach ( array( array( 200, 60, 1.2 ), array( 480, 60, 1.4 ), array( 300, 330, 1.2 ), array( 160, 210, 1 ), array( 450, 320, 1 ), array( 40, 70, 1.1 ) ) as [ $x, $y, $r ] ) {
		$s .= '<circle cx="' . $x . '" cy="' . $y . '" r="' . $r . '" fill="' . $ln . '"/>';
	}
	$s .= '</svg>';
	return $s;
}

/** Painel mensal em matriz de pontos (SVG inline com dados de exemplo). */
function svg_painel(): string {
	$saldo = array( 61, 58, 66, 70, 64, 72, 77, 74, 81, 86, 90, 96 ); // mil R$
	$meses = array( 'SET', 'OUT', 'NOV', 'DEZ', 'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO' );
	$s  = '<svg class="ff-painel-svg" viewBox="0 0 560 380" role="img" aria-labelledby="ffp-t ffp-d" xmlns="http://www.w3.org/2000/svg">';
	$s .= '<title id="ffp-t">Painel mensal, dados de exemplo</title><desc id="ffp-d">Saldo de caixa dos últimos 12 meses em matriz de pontos, subindo de 61 para 96 mil reais; receita do mês de 46,2 mil reais, margem líquida de 19,5% e 38 dias de caixa.</desc>';
	$s .= '<rect width="560" height="380" fill="#FFFFFF"/>';
	$s .= '<text x="0" y="14" font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="1.4" fill="#5E6271">RELATÓRIO MENSAL · AGOSTO</text>';
	$s .= '<g font-family="IBM Plex Mono, monospace"><rect x="440" y="0" width="120" height="20" fill="none" stroke="#5E6271" stroke-width="1"/><text x="500" y="14" text-anchor="middle" font-size="10" letter-spacing="1.2" fill="#5E6271">DADOS DE EXEMPLO</text></g>';
	$k = array( array( 'R$ 46,2 mil', 'RECEITA DO MÊS', '+8,2% vs. julho' ), array( '19,5%', 'MARGEM LÍQUIDA', '+1,4 p.p.' ), array( '38', 'DIAS DE CAIXA', '−3 dias' ) );
	foreach ( $k as $i => [ $v, $r, $d ] ) {
		$x  = $i * 190;
		$s .= '<line x1="' . $x . '" y1="40" x2="' . ( $x + 170 ) . '" y2="40" stroke="#17183A" stroke-width="1.5"/>';
		$s .= '<text x="' . $x . '" y="60" font-family="IBM Plex Mono, monospace" font-size="10" letter-spacing="1.2" fill="#5E6271">' . $r . '</text>';
		$s .= '<text x="' . $x . '" y="94" font-family="Sora, sans-serif" font-weight="700" font-size="28" fill="#17183A">' . $v . '</text>';
		$s .= '<text x="' . $x . '" y="114" font-family="IBM Plex Mono, monospace" font-size="11" fill="' . ( str_starts_with( $d, '−' ) ? '#A9301F' : '#2A2F3D' ) . '">' . $d . '</text>';
	}
	$s .= '<text x="0" y="158" font-family="IBM Plex Sans, sans-serif" font-weight="600" font-size="14" fill="#17183A">Saldo de caixa subiu pelo 4º mês seguido</text>';
	$s .= '<text x="0" y="176" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">CADA PONTO = R$ 10 MIL</text>';
	$base = 336;
	foreach ( $saldo as $i => $v ) {
		$x   = 18 + $i * 45;
		$n   = (int) round( $v / 10 );
		for ( $j = 0; $j < 10; $j++ ) {
			$y = $base - $j * 15;
			if ( $j < $n ) {
				$last = 11 === $i && $j === $n - 1;
				$s   .= $last
					? '<circle cx="' . $x . '" cy="' . $y . '" r="6" fill="#F2B544" stroke="#17183A" stroke-width="1.5"/>'
					: '<circle cx="' . $x . '" cy="' . $y . '" r="4.2" fill="' . ( 11 === $i ? '#17183A' : '#6E89B4' ) . '"/>';
			} else {
				$s .= '<circle cx="' . $x . '" cy="' . $y . '" r="1.4" fill="#D2D4DA"/>';
			}
		}
		$s .= '<text x="' . $x . '" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="' . ( 11 === $i ? '#17183A' : '#5E6271' ) . '">' . $meses[ $i ] . '</text>';
	}
	$s .= '<text x="540" y="198" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="12" font-weight="500" fill="#17183A">R$ 96,4 mil</text>';
	$s .= '<line x1="0" y1="345" x2="560" y2="345" stroke="#D2D4DA" stroke-width="1"/>';
	$s .= '</svg>';
	return $s;
}
