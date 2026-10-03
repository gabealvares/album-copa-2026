<?php
/**
 * Post .md (com [bloco: …]) → marcação de blocos.
 */

require_once __DIR__ . '/paginas.php';

function mark( string $cor, string $t ): string {
	return '<mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-' . $cor . '-color">' . $t . '</mark>';
}
function novo( string $t ): string {
	return preg_replace( '/\s*·\s*<strong>NOVO<\/strong>|\s*·\s*NOVO\b/u', ' ' . mark( 'rubrica', 'NOVO' ), $t );
}
/** Linhas de tabela markdown → [cab, rows] (com md_in) */
function md_tabela( array $ls ): array {
	$rows = array();
	foreach ( $ls as $l ) {
		if ( str_starts_with( ltrim( $l ), '|' ) && ! preg_match( '/^[\s|:-]+$/', $l ) ) {
			$rows[] = array_map( 'trim', explode( '|', trim( trim( $l ), '|' ) ) );
		}
	}
	$cab = array_shift( $rows ) ?? array();
	return array( $cab, $rows );
}
function md_numerados( array $ls ): array {
	$o = array();
	foreach ( $ls as $l ) {
		if ( preg_match( '/^\d+\.\s+\*\*(.+?)\*\*\s*[—–-]?\s*(.*)$/u', $l, $m ) ) {
			$o[] = array( md_in( rtrim( $m[1], '.' ) ), md_in( $m[2] ) );
		} elseif ( preg_match( '/^\d+\.\s+(.*)$/u', $l, $m ) ) {
			$o[] = array( md_in( $m[1] ), '' );
		}
	}
	return $o;
}
function md_campos_bloco( array $ls ): array {
	$f = array();
	foreach ( $ls as $l ) {
		if ( preg_match( '/^- \*\*([^*]+?):\*\*\s*(.*)$/u', $l, $m ) ) {
			$f[ mb_strtolower( trim( $m[1] ) ) ] = $m[2];
		}
	}
	return $f;
}

function bloco_post( string $nome, string $cabecalho, array $ls, array &$meta ): string {
	$cab_txt = trim( preg_replace( '/^\(.*?\)\s*/', '', $cabecalho ) );
	$opcoes  = $cabecalho;
	$cab_txt = preg_replace( '/\s*\{#[\w-]+\}\s*/', '', $cab_txt );
	$cab_txt = preg_replace( '/\s*\((estilo|variante|cada|três|duas|acordeão|lista|números|campo|fundo|responsiva|status|exemplo|2|3)[^)]*\)\s*$/u', '', $cab_txt );
	$f       = md_campos_bloco( $ls );
	switch ( $nome ) {
		case 'cabecalho-post':
			return '';

		case 'aviso-informativo':
			return p( md_in( implode( ' ', $ls ) ), array( 'class' => 'is-style-aviso' ) );

		case 'nota':
			return nota( md_in( implode( ' ', $ls ) ), array( 'font' => '', 'size' => 'pequeno' ) );

		case 'sumario':
			return ff_v( 'fireflies/indice' );

		case 'destaque-numeros':
			[ , $rows ] = md_tabela( $ls );
			$cols       = array();
			foreach ( $rows as $r ) {
				$h  = rotulo( novo( md_in( $r[0] ) ) );
				$h .= p( sem_md( $r[1] ), array( 'class' => 'ff-numero-post' ) );
				if ( '—' !== $r[2] ) {
					$h .= p( '<strong>' . md_in( $r[2] ) . '</strong>' );
				}
				$h     .= p( md_in( $r[3] ), array( 'size' => 'pequeno', 'text' => 'fumaca' ) );
				$cols[] = array( 'html' => $h );
			}
			return colunas( $cols, array( 'class' => 'ff-numeros-post' ) );

		case 'citacao-norma':
			$q = array();
			foreach ( $ls as $l ) {
				if ( str_starts_with( $l, '>' ) ) {
					$q[] = trim( substr( $l, 1 ) );
				}
			}
			return ff_b( 'quote', array( 'className' => 'is-style-norma' ), '<blockquote class="wp-block-quote is-style-norma">' . p( md_in( implode( ' ', $q ) ) ) . '<cite>' . sem_md( $cab_txt ?: ( $ls[0] ?? '' ) ) . '</cite></blockquote>' );

		case 'citacao-destaque':
			$q    = array();
			$cite = '';
			foreach ( $ls as $l ) {
				$l = trim( ltrim( $l, '>' ) );
				if ( preg_match( '/^[—–]\s*(.*)$/u', $l, $m ) ) {
					$cite = $m[1];
				} elseif ( '' !== $l ) {
					$q[] = $l;
				}
			}
			return ff_b( 'quote', array( 'className' => 'is-style-destaque' ), '<blockquote class="wp-block-quote is-style-destaque">' . p( md_in( implode( ' ', $q ) ) ) . ( $cite ? '<cite>' . md_in( $cite ) . '</cite>' : '' ) . '</blockquote>' );

		case 'tabela':
			[ $cab, $rows ] = md_tabela( $ls );
			$estilo         = str_contains( $opcoes, 'codigos' ) ? 'is-style-codigos' : '';
			$rows           = array_map( fn( $r ) => array_map( fn( $x ) => novo( md_in( $x ) ), $r ), $rows );
			return tabela( array_map( 'md_in', $cab ), $rows, array( 'class' => $estilo ) );

		case 'lista-codigos':
		case 'lista-codigos-busca':
			[ , $rows ] = md_tabela( $ls );
			$its        = array_map( fn( $r ) => '<strong>' . md_in( $r[0] ) . '</strong>' . md_in( $r[1] ), $rows );
			$cls        = 'is-style-codigos' . ( str_contains( $opcoes, '3 colunas' ) ? ' ff-3col' : '' ) . ( 'lista-codigos-busca' === $nome ? ' ff-buscavel' : '' );
			return lista( $its, array( 'class' => $cls ) );

		case 'consulte-na-integra':
			$ref = trim( implode( ' ', array_filter( $ls, fn( $l ) => '' !== trim( $l ) ) ) );
			return p( '<strong>Consulte na íntegra:</strong> ' . md_in( $ref ), array( 'class' => 'ff-consulte-nota' ) );

		case 'em-aberto':
			$titulo = '';
			if ( preg_match( '/^\*\*(.+?)\*\*/u', $cab_txt, $m ) ) {
				$titulo = $m[1];
			}
			$in = rotulo( 'Em aberto' );
			if ( $titulo ) {
				$in .= h( 4, md_in( $titulo ) );
			}
			$its = array();
			$par = array();
			foreach ( $ls as $l ) {
				if ( preg_match( '/^- \*\*(.+?)\*\*\s*[—–-]?\s*(.*)$/u', $l, $m ) ) {
					$its[] = '<strong>' . md_in( $m[1] ) . '.</strong> ' . md_in( $m[2] );
				} elseif ( '' !== trim( $l ) ) {
					$par[] = $l;
				}
			}
			if ( $par ) {
				$in .= p( md_in( implode( ' ', $par ) ) );
			}
			if ( $its ) {
				$in .= lista( $its, array( 'class' => 'is-style-estrelas' ) );
			}
			return grupo( $in, array( 'class' => 'is-style-em-aberto' ) );

		case 'trio-cadastros':
			[ , $rows ] = md_tabela( $ls );
			$cols       = array();
			foreach ( $rows as $r ) {
				$cols[] = array( 'html' => p( sem_md( $r[0] ), array( 'class' => 'ff-sigla' ) ) . p( md_in( $r[1] ) ) );
			}
			return colunas( $cols, array( 'class' => 'ff-trio-cadastros', 'stack' => false ) );

		case 'trio-sinais':
			[ , $rows ] = md_tabela( $ls );
			$cols       = array();
			foreach ( $rows as $r ) {
				$cols[] = array( 'html' => rotulo( sem_md( $r[0] ) ) . p( md_in( $r[1] ) ) );
			}
			return colunas( $cols, array( 'class' => 'ff-trio-sinais' ) );

		case 'lista-estrelas':
			$its = array();
			foreach ( $ls as $l ) {
				if ( preg_match( '/^- (.*)$/', $l, $m ) ) {
					$its[] = md_in( $m[1] );
				}
			}
			return lista( $its, array( 'class' => 'is-style-estrelas' ) );

		case 'base-legal':
			$rot = sem_md( $cab_txt ) ?: 'Base legal';
			$in  = rotulo( $rot );
			foreach ( $ls as $l ) {
				if ( preg_match( '/^-?\s*\*\*(.+?)\*\*\s*[—–:]?\s*(.*)$/u', $l, $m ) ) {
					$in .= h( 4, md_in( rtrim( $m[1], ':' ) ) ) . citacao( md_in( $m[2] ) );
				}
			}
			return grupo( $in, array( 'class' => 'is-style-base-legal' ) );

		case 'info':
			$in = rotulo( 'Informação' );
			if ( preg_match( '/^\*\*(.+?)\*\*/u', $cab_txt, $m ) ) {
				$in .= h( 4, md_in( $m[1] ) );
			}
			$in .= p( md_in( implode( ' ', $ls ) ) );
			return grupo( $in, array( 'class' => 'is-style-info' ) );

		case 'nossa-leitura':
			$rot = 'Nossa leitura';
			$in  = '';
			if ( isset( $f['destaque'] ) ) {
				$in .= p( md_in( $f['destaque'] ), array( 'class' => 'ff-leitura-destaque' ) );
				if ( isset( $f['complemento'] ) ) {
					$in .= p( md_in( $f['complemento'] ), array( 'size' => 'pequeno' ) );
				}
			} else {
				$txt = implode( ' ', array_filter( $ls, fn( $l ) => '' !== trim( $l ) ) );
				if ( preg_match( '/^\*\*(Nossa [^:*]+):\*\*\s*(.*)$/u', $txt, $m ) ) {
					$rot = $m[1];
					$txt = mb_strtoupper( mb_substr( $m[2], 0, 1 ) ) . mb_substr( $m[2], 1 );
				}
				$in .= p( md_in( $txt ) );
			}
			return grupo( rotulo( $rot ) . $in, array( 'class' => 'is-style-nossa-leitura' ) );

		case 'linha-do-tempo':
			$its = array_map( fn( $x ) => '<strong>' . $x[0] . '</strong>' . $x[1], md_numerados( $ls ) );
			return lista( $its, array( 'ordered' => true, 'class' => 'is-style-linha-tempo' ) );

		case 'comparacao-neq':
			[ $cab, $rows ] = md_tabela( $ls );
			$r              = $rows[0] ?? array( '', '', '' );
			return colunas(
				array(
					array( 'html' => h( 4, md_in( $cab[0] ) ) . p( md_in( $r[0] ) ) ),
					array( 'html' => p( '≠' ), 'class' => 'ff-neq__sinal' ),
					array( 'html' => h( 4, md_in( $cab[2] ) ) . p( md_in( $r[2] ) ) ),
				),
				array( 'class' => 'ff-neq' )
			);

		case 'matriz-situacao':
			[ $cab, $rows ] = md_tabela( $ls );
			$fmt            = function ( string $x ): string {
				$x     = md_in( $x );
				$parts = preg_split( '/\s+—\s+/u', $x, 2 );
				$x     = $parts[0];
				$cor   = str_starts_with( $x, '●' ) ? 'anil' : ( str_starts_with( $x, '◐' ) ? 'alerta' : ( str_starts_with( $x, '○' ) ? 'pedra' : '' ) );
				if ( $cor ) {
					$x = mark( $cor, $x );
				}
				return $x . ( isset( $parts[1] ) ? '<br>' . $parts[1] : '' );
			};
			return tabela( array_map( 'md_in', $cab ), array_map( fn( $r ) => array_map( $fmt, $r ), $rows ), array( 'class' => 'is-style-matriz' ) );

		case 'passos':
			$its = array_map( fn( $x ) => '<strong>' . $x[0] . '</strong>' . $x[1], md_numerados( $ls ) );
			$out = '';
			if ( preg_match( '/^\*\*(.+?)\*\*/u', $cab_txt, $m ) ) {
				$out .= h( 3, md_in( $m[1] ) );
			}
			return $out . lista( $its, array( 'ordered' => true, 'class' => 'is-style-checklist ff-com-progresso' ) );

		case 'fontes':
			$its = array_map( fn( $x ) => $x[0] . ( $x[1] ? ' ' . $x[1] : '' ), md_numerados( $ls ) );
			return lista( $its, array( 'ordered' => true, 'class' => 'is-style-fontes' ) );

		case 'voce-sabe':
			$g = voce_sabe( md_in( $f['título'] ?? '' ), md_in( $f['texto'] ?? '' ), sem_md( $f['rótulo'] ?? 'Você sabe?' ) );
			if ( preg_match( '/\{#([\w-]+)\}/', $cabecalho, $m ) ) {
				$g = preg_replace( '/^<!-- wp:group \{/', '<!-- wp:group {"anchor":"' . $m[1] . '",', $g, 1 );
				$g = preg_replace( '/<div class="wp-block-group/', '<div id="' . $m[1] . '" class="wp-block-group', $g, 1 );
			}
			return $g;

		case 'nfse-exemplo':
			[ $cab, $rows ] = md_tabela( $ls );
			$topo           = sem_md( $f['cabeçalho'] ?? '' );
			$in             = grupo( p( '<strong>' . str_replace( ' · rótulo EXEMPLO ILUSTRATIVO', '', $topo ) . '</strong>' ) . p( 'Exemplo ilustrativo', array( 'size' => 'nota', 'font' => 'plex-mono' ) ), array( 'class' => 'ff-nfse__cab', 'layout' => array( 'type' => 'flex', 'flexWrap' => 'wrap', 'justifyContent' => 'space-between' ) ) );
			foreach ( $rows as $i => $r ) {
				$linhas = array();
				foreach ( array_map( 'trim', explode( ' / ', $r[2] ) ) as $x ) {
					$ps       = array_map( 'trim', explode( ' · ', $x ) );
					$val      = count( $ps ) > 1 ? array_pop( $ps ) : '';
					$linhas[] = array( md_in( implode( ' · ', $ps ) ), md_in( $val ) );
				}
				$corpo  = ff_b( 'table', array( 'hasFixedLayout' => false ), '<figure class="wp-block-table"><table><tbody>' . implode( '', array_map( fn( $l ) => '<tr><td>' . $l[0] . '</td><td>' . $l[1] . '</td></tr>', $linhas ) ) . '</tbody></table></figure>' );
				$corpo .= p( md_in( $r[3] ), array( 'size' => 'pequeno' ) );
				$a      = 0 === $i ? array( 'showContent' => true ) : array();
				$in    .= ff_b( 'details', $a, '<details class="wp-block-details"' . ( 0 === $i ? ' open' : '' ) . '><summary>' . md_in( $r[0] ) . ' · ' . md_in( $r[1] ) . '</summary>' . $corpo . '</details>' );
			}
			if ( isset( $f['total'] ) && preg_match( '/^(.*?)\s*·\s*\*\*(.+?)\*\*/u', $f['total'], $m ) ) {
				$in .= grupo( p( md_in( $m[1] ), array( 'class' => 'is-style-rotulo' ) ) . p( $m[2], array( 'class' => 'ff-valor' ) ), array( 'class' => 'ff-nfse__total' ) );
			}
			return grupo( $in, array( 'class' => 'ff-nfse' ) );

		case 'cta-post':
			$bs = array();
			if ( isset( $f['botões'] ) ) {
				$bs = md_botoes( $f['botões'] );
			} else {
				foreach ( array( 'botão primário', 'botão secundário' ) as $k ) {
					if ( isset( $f[ $k ] ) && ( $l = md_link( $f[ $k ] ) ) ) {
						$bs[] = array( $l[0], $l[1], $bs ? 'outline' : '' );
					}
				}
			}
			$in = rotulo( sem_md( $f['eyebrow'] ?? '' ) ) . h( 2, md_in( $f['h2'] ?? '' ), array( 'size' => 'titulo-2' ) );
			if ( isset( $f['texto'] ) ) {
				$in .= p( md_in( $f['texto'] ), array( 'size' => 'lead' ) );
			}
			$in .= botoes( $bs, array( 'mar' => array( 'top' => sp( '40' ) ) ) );
			return secao( estreito( $in, '760px' ), 'noite', array( 'class' => 'ff-cta-post', 'pad' => array( 'top' => sp( '60' ), 'bottom' => sp( '60' ) ) ) );
	}
	fwrite( STDERR, "bloco sem mapeamento: {$nome}\n" );
	return '';
}

/**
 * @return array{0:string,1:array}
 */
function post_md( string $arquivo ): array {
	[ $fm, $corpo ] = md_frontmatter( file_get_contents( $arquivo ) );
	$corpo          = preg_split( '/^### (Linkagem interna|Leituras relacionadas)/m', $corpo )[0];
	$linhas         = explode( "\n", $corpo );
	// blocos de linhas separados por linha em branco
	$chunks = array();
	$atual  = array();
	foreach ( $linhas as $l ) {
		if ( '' === trim( $l ) ) {
			if ( $atual ) {
				$chunks[] = $atual;
				$atual    = array();
			}
			continue;
		}
		$atual[] = rtrim( $l );
	}
	if ( $atual ) {
		$chunks[] = $atual;
	}
	$out  = '';
	$meta = array();
	$n    = count( $chunks );
	for ( $i = 0; $i < $n; $i++ ) {
		$ch = $chunks[ $i ];
		$l0 = $ch[0];
		if ( preg_match( '/^>\s*(Fonte:|Nota editorial|Conferência legal|\*\*Nota)/u', $l0 ) || '---' === $l0 ) {
			continue;
		}
		if ( preg_match( '/^\[bloco: ([a-z-]+)\]\s*(.*)$/u', $l0, $m ) ) {
			$nome = $m[1];
			$cab  = $m[2];
			$ls   = array_slice( $ch, 1 );
			// continua enquanto o próximo bloco é tabela, lista, citação ou campo
			while ( $i + 1 < $n ) {
				$prox = $chunks[ $i + 1 ][0];
				$cont = preg_match( '/^(\||- |>|\d+\.\s)/', $prox ) || ( preg_match( '/^\*\*/', $prox ) && ! preg_match( '/^\*\*[^*]+\*\*\s*$/u', $prox ) );
				if ( in_array( $nome, array( 'aviso-informativo', 'nota', 'sumario', 'consulte-na-integra', 'info' ), true ) && ! preg_match( '/^(\||- |\d+\.\s)/', $prox ) ) {
					$cont = false;
				}
				if ( ! $cont ) {
					break;
				}
				$ls = array_merge( $ls, array( '' ), $chunks[ ++$i ] );
			}
			if ( 'sumario' === $nome ) {
				// a lista do sumário é gerada pelo bloco
				$ls = array();
			}
			$out .= bloco_post( $nome, $cab, $ls, $meta );
			continue;
		}
		if ( preg_match( '/^\*\*([^*]+)\*\*\s*$/u', $l0 ) && 1 === count( $ch ) ) {
			$out .= h( 4, md_in( trim( $l0, '*' ) ) );
			continue;
		}
		$out .= md_blocos( implode( "\n", $ch ), array( 'ancora' => true ) );
	}
	return array( $out, $fm );
}

/**
 * Curso .md → [marcação, metadados].
 */
function curso_md( string $arquivo ): array {
	[ $fm, $corpo ] = md_frontmatter( file_get_contents( $arquivo ) );
	$resumo         = '';
	if ( preg_match( '/- \*\*Resumo:\*\*\s*(.*)$/mu', $corpo, $m ) ) {
		$resumo = sem_md( $m[1] );
	}
	$secoes = preg_split( '/^## /m', $corpo );
	array_shift( $secoes );
	$out = '';
	foreach ( $secoes as $sec ) {
		$ls     = explode( "\n", $sec );
		$titulo = trim( array_shift( $ls ) );
		$txt    = preg_replace( '/^\[pattern:[^\]]*\].*$/m', '', implode( "\n", $ls ) );
		if ( 'Programa' === $titulo ) {
			$its = array_map( fn( $x ) => '<strong>' . $x[0] . '.</strong> ' . $x[1], md_numerados( explode( "\n", $txt ) ) );
			$out .= h( 2, 'Programa', array( 'anchor' => 'programa' ) ) . lista( $its, array( 'ordered' => true, 'class' => 'is-style-fontes ff-1col ff-programa' ) );
			continue;
		}
		if ( 'Continue na trilha' === $titulo ) {
			$its = array();
			foreach ( explode( "\n", $txt ) as $l ) {
				if ( preg_match( '/^- (.*)$/', $l, $m ) && ( $k = md_link( $m[1] ) ) ) {
					$its[] = '<a href="' . $k[1] . '">' . $k[0] . '</a>';
				}
			}
			$out .= h( 2, $titulo ) . lista( $its, array( 'class' => 'is-style-estrelas' ) );
			continue;
		}
		$out .= h( 2, md_in( $titulo ), array( 'anchor' => slug( $titulo ) ) ) . md_blocos( $txt, array( 'lista' => 'is-style-estrelas' ) );
	}
	return array( $out, $fm + array( '_resumo' => $resumo ) );
}
