<?php
/**
 * Leitura dos .md de conteudo/ e conversão para blocos.
 */

require_once __DIR__ . '/editorial.php';

// ------------------------------------------------------------ front matter

function md_frontmatter( string $src ): array {
	if ( ! preg_match( '/```yaml\n(.*?)\n```/s', $src, $m ) ) {
		return array( array(), $src );
	}
	$corpo = substr( $src, strpos( $src, $m[0] ) + strlen( $m[0] ) );
	$out   = array();
	$pai   = null;
	foreach ( explode( "\n", $m[1] ) as $l ) {
		if ( '' === trim( $l ) ) {
			continue;
		}
		$l = preg_replace( '/\s+#\s.*$/', '', $l );
		if ( ! preg_match( '/^(\s*)([^:]+?):\s*(.*)$/', $l, $x ) ) {
			continue;
		}
		$v = yaml_valor( $x[3] );
		if ( '' === $x[1] ) {
			$pai           = $x[2];
			$out[ $x[2] ]  = '' === $x[3] ? array() : $v;
		} elseif ( $pai && is_array( $out[ $pai ] ) ) {
			$out[ $pai ][ trim( $x[2] ) ] = $v;
		}
	}
	return array( $out, $corpo );
}
function yaml_valor( string $v ) {
	$v = trim( $v );
	if ( preg_match( '/^\[(.*)\]$/', $v, $m ) ) {
		return array_map( fn( $x ) => trim( $x, " \"'" ), array_filter( explode( ',', $m[1] ), 'strlen' ) );
	}
	if ( preg_match( '/^"(.*)"$/', $v, $m ) || preg_match( "/^'(.*)'$/", $v, $m ) ) {
		return $m[1];
	}
	return $v;
}

// ------------------------------------------------------------ inline

/** Markdown inline → HTML (negrito, código, links "texto → `url`", [t](u)). */
function md_in( string $t ): string {
	$t = trim( $t );
	$t = preg_replace( '/\s*\{#[\w-]+\}\s*$/', '', $t );
	$t = str_replace( array( '&', '<', '>' ), array( '&amp;', '&lt;', '&gt;' ), $t );
	$t = preg_replace( '/\[([^\]]+)\]\(([^)]+)\)/', '<a href="$2">$1</a>', $t );
	$t = preg_replace( '/\*\*(.+?)\*\*/', '<strong>$1</strong>', $t );
	$t = preg_replace( '/`([^`]+)`/', '<code>$1</code>', $t );
	$t = str_replace( '&amp;nbsp;', '&nbsp;', $t );
	return $t;
}
/** "Texto → `url`" → [texto, url] */
function md_link( string $t ): ?array {
	if ( preg_match( '/^(.*?)\s*→\s*`([^`]+)`/u', trim( $t ), $m ) ) {
		$url = $m[2];
		if ( str_starts_with( $url, '[' ) ) {
			return null;
		}
		return array( trim( preg_replace( '/\*\*/', '', $m[1] ) ), url_md( $url ) );
	}
	return null;
}
function url_md( string $u ): string {
	if ( str_starts_with( $u, '/' ) ) {
		return '{{U}}' . $u;
	}
	return str_replace( ' ', '%20', $u );
}
/** Vários botões: "A → `u` · B → `u2`" */
function md_botoes( string $t, bool $primeiro_cheio = true ): array {
	$bs = array();
	foreach ( preg_split( '/\s+·\s+(?=[^`]*→)/u', $t ) as $i => $parte ) {
		if ( $l = md_link( $parte ) ) {
			$bs[] = array( $l[0], $l[1], ( $i > 0 || ! $primeiro_cheio ) ? 'outline' : '' );
		}
	}
	return $bs;
}
function sem_md( string $t ): string {
	return trim( preg_replace( array( '/\*\*/', '/`/' ), '', $t ) );
}

// ------------------------------------------------------------ seção → campos

/**
 * Lê os campos de uma seção de página.
 */
function md_campos( array $linhas ): array {
	$c = array( 'f' => array(), 'pares' => array(), 'itens' => array(), 'bold' => array(), 'num' => array(), 'tabelas' => array(), 'faq' => array(), 'par' => array(), 'sub' => array(), 'blocos' => array() );
	$n = count( $linhas );
	for ( $i = 0; $i < $n; $i++ ) {
		$l = rtrim( $linhas[ $i ] );
		if ( '' === trim( $l ) ) {
			continue;
		}
		if ( str_starts_with( ltrim( $l ), '|' ) ) {
			$tab = array();
			while ( $i < $n && str_starts_with( ltrim( $linhas[ $i ] ), '|' ) ) {
				$row = array_map( 'trim', explode( '|', trim( trim( $linhas[ $i ] ), '|' ) ) );
				if ( ! preg_match( '/^[\s|:-]+$/', $linhas[ $i ] ) ) {
					$tab[] = $row;
				}
				$i++;
			}
			$i--;
			$c['tabelas'][] = $tab;
			continue;
		}
		if ( preg_match( '/^\s{2,}- (.*)$/', $l, $m ) ) {
			$c['sub'][] = $m[1];
			continue;
		}
		if ( preg_match( '/^- \*\*([^*]+?):\*\*\s*(.*)$/u', $l, $m ) ) {
			$k = mb_strtolower( trim( preg_replace( '/\s*\(.*\)\s*$/', '', $m[1] ) ) );
			$v = $m[2];
			// continuação em linhas indentadas sem "-"
			while ( $i + 1 < $n && preg_match( '/^\s{2,}(?!- )(\S.*)$/', $linhas[ $i + 1 ], $mm ) ) {
				$v .= "\n" . $mm[1];
				$i++;
			}
			$c['f'][ $k ]   = $v;
			$c['pares'][]   = array( $m[1], $v );
			continue;
		}
		if ( preg_match( '/^- \*\*(.+?)\*\*\s*(.*)$/u', $l, $m ) ) {
			$c['bold'][] = array( rtrim( $m[1], '.' ), ltrim( $m[2], " —–-·" ), $m[1] );
			continue;
		}
		if ( preg_match( '/^- (.*)$/', $l, $m ) ) {
			$c['itens'][] = $m[1];
			continue;
		}
		if ( preg_match( '/^\d+\.\s+(.*)$/', $l, $m ) ) {
			$c['num'][] = $m[1];
			continue;
		}
		if ( preg_match( '/^\*\*(.+?)\*\*\s*$/u', $l, $m ) ) {
			// bloco em negrito: pergunta de FAQ ou cabeçalho de item
			$corpo = array();
			while ( $i + 1 < $n && '' !== trim( $linhas[ $i + 1 ] ) && ! str_starts_with( $linhas[ $i + 1 ], '**' ) ) {
				$corpo[] = trim( $linhas[ ++$i ] );
			}
			if ( str_ends_with( $m[1], '?' ) && $corpo ) {
				$c['faq'][] = array( $m[1], implode( ' ', $corpo ) );
			} else {
				$c['blocos'][] = array( $m[1], $corpo, '' );
			}
			continue;
		}
		if ( preg_match( '/^\*\*(.+?)\*\*\s*(·.*)$/u', $l, $m ) ) {
			$corpo = array();
			while ( $i + 1 < $n && '' !== trim( $linhas[ $i + 1 ] ) && ! str_starts_with( $linhas[ $i + 1 ], '**' ) ) {
				$corpo[] = trim( $linhas[ ++$i ] );
			}
			$c['blocos'][] = array( $m[1], $corpo, trim( $m[2], ' ·' ) );
			continue;
		}
		if ( str_starts_with( $l, '>' ) || str_starts_with( $l, '[pattern' ) || str_starts_with( $l, '[bloco' ) ) {
			continue;
		}
		$c['par'][] = trim( $l );
	}
	return $c;
}

/** "**T.** texto → `url`" ou "**T** — texto" → [t, texto, url] */
function item_bold( array $b ): array {
	$texto = $b[1];
	$url   = '';
	if ( preg_match( '/^(.*?)\s*→\s*`([^`]+)`\s*$/u', $texto, $m ) ) {
		$texto = $m[1];
		$url   = url_md( $m[2] );
	}
	return array( md_in( $b[0] ), md_in( $texto ), $url );
}
/** "**Nome** · ESPECIALIDADE — frase → `url`" (lista numerada) */
function item_num( string $t ): array {
	$url = '';
	if ( preg_match( '/^(.*?)\s*→\s*`([^`]+)`\s*$/u', $t, $m ) ) {
		$t   = $m[1];
		$url = url_md( $m[2] );
	}
	$esp = (bool) preg_match( '/ESPECIALIDADE/u', $t );
	$t   = preg_replace( '/\s*·\s*ESPECIALIDADE/u', '', $t );
	if ( preg_match( '/^\*\*(.+?)\*\*\s*[—–-]?\s*(.*)$/u', $t, $m ) ) {
		return array( rtrim( $m[1], '.' ), md_in( $m[2] ), $url, $esp );
	}
	return array( md_in( $t ), '', $url, $esp );
}

// ------------------------------------------------------------ markdown genérico → blocos

/**
 * Converte markdown simples em blocos. $o: ['lista' => estilo de ul, 'h' => deslocamento de nível]
 */
function md_blocos( string $md, array $o = array() ): string {
	$o     += array( 'lista' => '', 'num' => '', 'h' => 0, 'ancora' => true );
	$linhas = explode( "\n", $md );
	$out    = '';
	$n      = count( $linhas );
	for ( $i = 0; $i < $n; $i++ ) {
		$l = rtrim( $linhas[ $i ] );
		if ( '' === trim( $l ) || '---' === trim( $l ) ) {
			continue;
		}
		if ( preg_match( '/^(#{2,4})\s+(.*)$/', $l, $m ) ) {
			$nivel = strlen( $m[1] ) + $o['h'];
			$anc   = '';
			if ( preg_match( '/\{#([\w-]+)\}/', $m[2], $a ) ) {
				$anc = $a[1];
			} elseif ( $o['ancora'] && 2 === $nivel ) {
				$anc = slug( sem_md( $m[2] ) );
			}
			$out .= h( $nivel, md_in( $m[2] ), array( 'anchor' => $anc ) );
			continue;
		}
		if ( str_starts_with( ltrim( $l ), '|' ) ) {
			$rows = array();
			while ( $i < $n && str_starts_with( ltrim( $linhas[ $i ] ), '|' ) ) {
				if ( ! preg_match( '/^[\s|:-]+$/', $linhas[ $i ] ) ) {
					$rows[] = array_map( 'md_in', array_map( 'trim', explode( '|', trim( trim( $linhas[ $i ] ), '|' ) ) ) );
				}
				$i++;
			}
			$i--;
			$cab  = array_shift( $rows );
			$out .= tabela( $cab, $rows, array( 'class' => $o['tabela'] ?? '' ) );
			continue;
		}
		if ( preg_match( '/^- /', $l ) ) {
			$its = array();
			while ( $i < $n && preg_match( '/^- (.*)$/', rtrim( $linhas[ $i ] ), $m ) ) {
				$its[] = md_in( $m[1] );
				$i++;
			}
			$i--;
			$out .= lista( $its, array( 'class' => $o['lista'] ) );
			continue;
		}
		if ( preg_match( '/^\d+\.\s/', $l ) ) {
			$its = array();
			while ( $i < $n && preg_match( '/^\d+\.\s+(.*)$/', rtrim( $linhas[ $i ] ), $m ) ) {
				$its[] = md_in( $m[1] );
				$i++;
			}
			$i--;
			$out .= lista( $its, array( 'ordered' => true, 'class' => $o['num'] ) );
			continue;
		}
		if ( str_starts_with( $l, '>' ) ) {
			$q = array();
			while ( $i < $n && str_starts_with( $linhas[ $i ], '>' ) ) {
				$q[] = trim( substr( $linhas[ $i ], 1 ) );
				$i++;
			}
			$i--;
			$out .= citacao( md_in( implode( ' ', array_filter( $q ) ) ) );
			continue;
		}
		$par = array( trim( $l ) );
		while ( $i + 1 < $n && '' !== trim( $linhas[ $i + 1 ] ) && ! preg_match( '/^(#|\||- |\d+\.\s|>|---)/', ltrim( $linhas[ $i + 1 ] ) ) ) {
			$par[] = trim( $linhas[ ++$i ] );
		}
		$out .= p( md_in( implode( ' ', $par ) ) );
	}
	return $out;
}

function slug( string $t ): string {
	$t = iconv( 'UTF-8', 'ASCII//TRANSLIT', $t );
	return trim( preg_replace( '/[^a-z0-9]+/', '-', strtolower( $t ) ), '-' );
}
