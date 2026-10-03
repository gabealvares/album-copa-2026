<?php
/**
 * Página .md (com [pattern: …] por seção) → marcação de blocos.
 */

require_once __DIR__ . '/md.php';

const FF_EMBLEMAS = array(
	'auditoria-de-condominios'       => 'auditoria',
	'consultoria-contabil'           => 'contabil',
	'consultoria-fiscal'             => 'fiscal',
	'consultoria-financeira'         => 'financeira',
	'gestao-de-projetos-e-processos' => 'processos',
	'sindicancia'                    => 'sindicancia',
	'condominios'                    => 'condominios',
	'academy'                        => 'academy',
);
const FF_NOMES_SERVICO = array(
	'/servicos/auditoria-de-condominios/'       => 'auditoria',
	'/servicos/consultoria-contabil/'           => 'contabil',
	'/servicos/consultoria-fiscal/'             => 'fiscal',
	'/servicos/consultoria-financeira/'         => 'financeira',
	'/servicos/gestao-de-projetos-e-processos/' => 'processos',
	'/servicos/sindicancia/'                    => 'sindicancia',
);

/** Passos padrão (texto de /como-trabalhamos/). */
function passos_padrao(): array {
	return array(
		array( 'Semana 1', 'Diagnóstico', 'Uma conversa sem custo e a leitura dos números como estão hoje.', 'leitura do cenário atual' ),
		array( 'Semanas 2–3', 'Organização', 'Conciliação, plano de contas, processos e acessos colocados em ordem.', 'base organizada e plano de trabalho' ),
		array( 'Semana 4', 'Primeiro fechamento', 'O primeiro relatório mensal, explicado numa reunião com você.', 'primeiro painel mensal' ),
		array( 'Todo mês', 'Rotina', 'Fechamento, indicadores e alertas, sempre com o mesmo responsável.', 'painel e reunião mensal' ),
	);
}

function f( array $c, string ...$ks ): string {
	foreach ( $ks as $k ) {
		if ( isset( $c['f'][ $k ] ) && '' !== trim( $c['f'][ $k ] ) ) {
			return $c['f'][ $k ];
		}
	}
	return '';
}
function fin( array $c, string ...$ks ): string {
	$v = f( $c, ...$ks );
	return $v ? md_in( $v ) : '';
}
function eyebrow( array $c ): string {
	return sem_md( f( $c, 'eyebrow', 'eyebrow (mono)' ) );
}
/** Botões a partir de "Botão primário/secundário", "Botão" ou "Botões" */
function botoes_de( array $c ): array {
	$bs = array();
	if ( $v = f( $c, 'botão primário' ) ) {
		$bs = array_merge( $bs, md_botoes( $v ) );
	}
	if ( $v = f( $c, 'botão secundário', 'botão secundário (texto)' ) ) {
		$l = md_botoes( $v, false );
		if ( ! $l && preg_match( '/^(.*?)\s*\(âncora `([^`]+)`\)/u', $v, $m ) ) {
			$l = array( array( trim( str_replace( '↓', '', $m[1] ) ), $m[2], 'outline' ) );
		}
		$bs = array_merge( $bs, $l );
	}
	if ( ! $bs && ( $v = f( $c, 'botões', 'botão' ) ) ) {
		$bs = md_botoes( $v );
	}
	// o primeiro botão para fora do site (WhatsApp) fica cheio; os demais, contorno
	foreach ( $bs as $i => $b ) {
		$bs[ $i ][2] = $i > 0 ? 'outline' : '';
	}
	return $bs;
}
function link_de( array $c ): ?array {
	$v = f( $c, 'link', 'link ao fim' );
	return $v ? md_link( $v ) : null;
}
function trilha_de( string $bc ): array {
	$mapa = array( 'Início' => '{{U}}/', 'Serviços' => '{{U}}/servicos/', 'Blog' => '{{U}}/blog/', 'Academy' => '{{U}}/academy/' );
	$t    = array();
	$ps   = array_map( 'trim', explode( '/', $bc ) );
	foreach ( $ps as $i => $x ) {
		$t[] = array( $x, $i < count( $ps ) - 1 ? ( $mapa[ $x ] ?? '' ) : '' );
	}
	return $t;
}
function nota_de( array $c ): string {
	return md_in( f( $c, 'nota (mono)', 'nota (mono, com fio)', 'nota sob os botões (mono)', 'nota', 'linha mono', 'nota obrigatória', 'nota sob o botão (mono)' ) );
}

/**
 * @return array{0:string,1:array} [marcação, metadados]
 */
function pagina_md( string $arquivo ): array {
	[ $fm, $corpo ] = md_frontmatter( file_get_contents( $arquivo ) );
	$slug           = $fm['slug'] ?? basename( $arquivo, '.md' );
	$secoes         = preg_split( '/^## /m', $corpo );
	array_shift( $secoes );
	$out   = '';
	$meta  = array( 'lead' => '' );
	$cinza = false; // alterna fundos claros para não repetir
	foreach ( $secoes as $sec ) {
		$linhas = explode( "\n", $sec );
		$titulo = trim( preg_replace( '/^\d+\.\s*/', '', array_shift( $linhas ) ) );
		$txt    = implode( "\n", $linhas );
		if ( ! preg_match( '/\[(pattern|bloco): ([a-z0-9-]+)\]/', $txt, $pm ) ) {
			continue;
		}
		$pat = $pm[2];
		$c   = md_campos( $linhas );
		$out .= secao_md( $pat, $c, $titulo, $txt, $slug, $meta );
	}
	return array( $out, $fm + array( '_lead' => $meta['lead'] ) );
}

function secao_md( string $pat, array $c, string $titulo, string $txt, string $slug, array &$meta ): string {
	static $alterna = 0;
	$h2 = fin( $c, 'h2' );
	switch ( $pat ) {
		case 'hero-anil':
			$meta['lead'] = sem_md( f( $c, 'lead' ) );
			$lado         = '';
			$lockup       = '';
			if ( 'inicio' === $slug ) {
				$lado = html( svg_constelacao_servicos() );
			} elseif ( isset( FF_EMBLEMAS[ $slug ] ) ) {
				$lado   = constelacao( FF_EMBLEMAS[ $slug ], 'escuro', array( 'w' => '280px', 'class' => 'is-style-emblema aligncenter' ) );
				$lockup = f( $c, 'lockup' ) ? $slug : '';
			} elseif ( 'como-trabalhamos' === $slug ) {
				$lado = img( '{{A}}img/ornamentos/escuro/trilha-photinus.svg', '', array( 'w' => '260px', 'class' => 'is-style-emblema aligncenter ff-trilha-photinus' ) );
			}
			return s_hero_anil(
				array(
					'rotulo' => eyebrow( $c ),
					'h1'     => fin( $c, 'h1' ),
					'lead'   => fin( $c, 'lead' ),
					'botoes' => botoes_de( $c ),
					'nota'   => nota_de( $c ),
					'lado'   => $lado,
					'lockup' => $lockup,
					'versal' => mb_strlen( sem_md( f( $c, 'h1' ) ) ) < 40,
				)
			);

		case 'hero-claro':
			$meta['lead'] = sem_md( f( $c, 'lead' ) );
			$lado         = isset( FF_EMBLEMAS[ $slug ] ) ? constelacao( FF_EMBLEMAS[ $slug ], 'claro', array( 'w' => '240px', 'class' => 'is-style-emblema aligncenter' ) ) : '';
			return s_hero_cal(
				array(
					'trilha' => f( $c, 'breadcrumb' ) ? trilha_de( f( $c, 'breadcrumb' ) ) : array(),
					'rotulo' => eyebrow( $c ),
					'h1'     => fin( $c, 'h1' ),
					'lead'   => fin( $c, 'lead' ),
					'botoes' => botoes_de( $c ),
					'nota'   => nota_de( $c ),
					'lado'   => $lado,
					'versal' => mb_strlen( sem_md( f( $c, 'h1' ) ) ) < 34,
				)
			);

		case 'faixa-provas':
			$rows = $c['tabelas'][0] ?? array();
			array_shift( $rows );
			return s_numeros( array_map( fn( $r ) => array( md_in( $r[0] ), md_in( $r[1] ) ), $rows ) );

		case 'servicos-lista':
			$itens = array();
			foreach ( $c['num'] as $n ) {
				$x       = item_num( $n );
				$itens[] = array( $x[0], $x[1], $x[2], '', '', $x[3] );
			}
			foreach ( $c['blocos'] as [ $cab, $corpo, $extra ] ) {
				$nome  = preg_replace( '/^\d+\s*·\s*/', '', $cab );
				$url   = '';
				$ents  = '';
				$linhas = array();
				foreach ( $corpo as $l ) {
					if ( preg_match( '/^→\s*`([^`]+)`/u', $l, $m ) ) {
						$url = url_md( $m[1] );
					} elseif ( preg_match( '/^Entregáveis:\s*(.*)$/u', $l, $m ) ) {
						$ents = mb_strtolower( $m[1] );
					} else {
						$linhas[] = $l;
					}
				}
				$para    = count( $linhas ) > 1 ? md_in( array_shift( $linhas ) ) : '';
				$itens[] = array( $nome, md_in( implode( ' ', $linhas ) ), $url, $ents ? 'Entregáveis: ' . $ents : '', $para, str_contains( $extra, 'ESPECIALIDADE' ) );
			}
			$destaque = ! empty( $itens[0][5] );
			return s_servicos(
				array(
					'rotulo'   => '',
					'h2'       => $h2 ?: md_in( $titulo ),
					'texto'    => fin( $c, 'intro', 'texto' ),
					'itens'    => $itens,
					'link'     => link_de( $c ),
					'destaque' => $destaque,
					'emblema'  => 'condominios',
				)
			);

		case 'constelacao-servicos':
			$esq = rotulo( eyebrow( $c ) ) . h( 2, $h2 ) . p( fin( $c, 'texto' ), array( 'size' => 'lead' ) );
			return secao( colunas( array( array( 'html' => $esq, 'w' => '45%' ), array( 'html' => html( svg_constelacao_servicos( false ) ), 'w' => '55%', 'va' => 'center' ) ), array( 'va' => 'center', 'gap' => sp( '60' ) ) ), 'cal' );

		case 'texto-manifesto':
			$textos = array_filter( array( fin( $c, 'texto' ), fin( $c, 'texto 2' ) ) );
			$frase  = fin( $c, 'frase grande' );
			if ( ! $frase && $textos ) {
				$frase = array_shift( $textos );
			}
			return s_manifesto(
				array(
					'rotulo'     => eyebrow( $c ),
					'frase'      => $frase,
					'texto'      => $textos,
					'nota'       => nota_de( $c ),
					'assinatura' => fin( $c, 'assinatura' ),
				)
			);

		case 'painel-mensal':
			$alertas = array();
			$cols    = array();
			foreach ( $c['sub'] as $s ) {
				if ( preg_match( '/^\*\*(.+?)\*\*\s*[—–-]\s*(.*)$/u', $s, $m ) ) {
					$cols[] = array( md_in( $m[1] ), md_in( $m[2] ) );
				} elseif ( preg_match( '/^(Atenção|Resolvido|Aviso|Crítico)\s*·\s*(.*)$/u', $s, $m ) ) {
					$tipo      = array( 'Atenção' => 'atencao', 'Resolvido' => 'ok', 'Aviso' => 'atencao', 'Crítico' => 'critico' )[ $m[1] ];
					$alertas[] = array( $tipo, '<strong>' . $m[1] . '.</strong> ' . md_in( $m[2] ) );
				}
			}
			return s_painel( array( 'rotulo' => '', 'h2' => $h2, 'texto' => fin( $c, 'texto' ), 'alertas' => $alertas, 'colunas' => $cols ) );

		case 'raio-x-condominio':
			$bs = botoes_de( $c );
			return s_raio_x(
				array(
					'rotulo' => '',
					'h2'     => $h2,
					'texto'  => fin( $c, 'texto' ),
					'itens'  => array( 'Receitas, despesas e contratos conferidos por período', 'Fundo de reserva e inadimplência por unidade', 'Relatório executivo para o conselho e a assembleia' ),
					'botoes' => $bs,
				)
			);

		case 'passos-30-dias':
			$passos = array();
			if ( ! empty( $c['tabelas'][0] ) ) {
				$t   = $c['tabelas'][0];
				$cab = array_map( 'mb_strtolower', array_shift( $t ) );
				foreach ( $t as $r ) {
					$row = array_combine( $cab, array_pad( $r, count( $cab ), '' ) );
					$passos[] = array( md_in( $row['quando'] ?? ( 'Etapa ' . ( $row['nº'] ?? '' ) ) ), md_in( $row['etapa'] ?? '' ), md_in( $row['o que acontece'] ?? '' ), md_in( $row['entregável'] ?? '' ) );
				}
			} elseif ( $c['blocos'] ) {
				foreach ( $c['blocos'] as [ $cab, $corpo ] ) {
					$ps   = array_map( 'trim', explode( '·', $cab ) );
					$ent  = '';
					$txt  = array();
					foreach ( $corpo as $l ) {
						if ( preg_match( '/^Entregável(?: \(mono\))?:\s*(.*)$/u', $l, $m ) ) {
							$ent = mb_strtolower( str_replace( ' · ', ', ', $m[1] ) );
						} else {
							$txt[] = $l;
						}
					}
					$passos[] = array( $ps[1] ?? '', $ps[2] ?? $ps[0], md_in( implode( ' ', $txt ) ), $ent );
				}
			} elseif ( $c['num'] ) {
				foreach ( $c['num'] as $i => $n ) {
					$x        = item_num( $n );
					$passos[] = array( 'Passo ' . ( $i + 1 ), $x[0], $x[1], '' );
				}
			} else {
				$passos = passos_padrao();
			}
			$link = link_de( $c );
			if ( ! $link && 'inicio' !== $slug && 'como-trabalhamos' !== $slug && ! $c['tabelas'] && ! $c['num'] ) {
				$link = array( 'Ver o método em detalhe', '{{U}}/como-trabalhamos/' );
			}
			$h = $h2 ?: ( count( $passos ) === 4 && ! $c['tabelas'] && ! $c['num'] && ! $c['blocos'] ? '30 dias até a primeira luz.' : md_in( $titulo ) );
			return s_passos( array( 'rotulo' => '', 'h2' => $h, 'texto' => fin( $c, 'intro', 'texto' ), 'passos' => $passos, 'link' => $link, 'nota' => nota_de( $c ) ), ( $alterna++ % 2 ) ? '' : 'cal' );

		case 'diferenciais-grid':
		case 'entregaveis-lista':
			$itens = array_map( fn( $b ) => array( md_in( $b[0] ), md_in( $b[1] ) ), $c['bold'] );
			return s_grade( array( 'h2' => $h2 ?: md_in( $titulo ), 'itens' => $itens ) );

		case 'triagem-3-perguntas':
			$ops = array();
			foreach ( $c['sub'] as $s ) {
				if ( preg_match( '/^([A-D])\s*·\s*(.+?)\s*→\s*caminho\s+(\w+)/u', $s, $m ) ) {
					$url   = array( 'Condomínios' => '{{U}}/condominios/', 'Empresas' => '{{U}}/servicos/consultoria-financeira/', 'Grupos' => '{{U}}/como-trabalhamos/' )[ $m[3] ] ?? '{{U}}/contato/';
					$ops[] = array( $m[1], $m[2], 'Caminho ' . $m[3], $url, 'Olá! Sou: ' . $m[2] . '. Quero agendar o diagnóstico gratuito.' );
				}
			}
			return s_triagem(
				array(
					'h2'       => $h2,
					'texto'    => fin( $c, 'texto' ),
					'pergunta' => 'Quem é você nessa história?',
					'opcoes'   => $ops,
					'nota'     => 'O link do WhatsApp abre com a mensagem pronta. Nada é enviado antes de você confirmar.',
				),
				''
			);

		case 'responsavel':
			$textos = array_filter( array_map( 'md_in', explode( "\n", f( $c, 'texto' ) ) ) );
			$areas  = f( $c, 'áreas' ) ? array_map( 'ucfirst', array_map( 'mb_strtolower', array_map( 'trim', explode( '·', sem_md( f( $c, 'áreas' ) ) ) ) ) ) : array();
			$link   = link_de( $c );
			if ( $v = f( $c, 'formação e registros' ) ) {
				$textos[] = '<strong>Formação e registros:</strong> ' . md_in( $v );
			}
			return s_responsavel(
				array(
					'rotulo' => '',
					'nome'   => fin( $c, 'nome' ),
					'cargo'  => str_ireplace( 'crc-sp', 'CRC-SP', mb_strtoupper( mb_substr( mb_strtolower( sem_md( f( $c, 'cargo' ) ) ), 0, 1 ) ) . mb_substr( mb_strtolower( sem_md( f( $c, 'cargo' ) ) ), 1 ) ),
					'textos' => $textos,
					'areas'  => $areas,
					'link'   => $link,
				)
			);

		case 'academy-cursos':
			$b = botoes_de( $c );
			return s_academy( array( 'rotulo' => '', 'h2' => $h2, 'texto' => fin( $c, 'texto' ), 'botao' => $b[0] ?? null, 'anchor' => trim( f( $c, 'âncora' ), '`#' ) ) );

		case 'posts-recentes':
		case 'posts-relacionados':
			$cat = '';
			if ( preg_match( '/categoria `([\w-]+)`/u', $txt, $m ) ) {
				$cat = $m[1];
			}
			return s_blog_destaques( array( 'h2' => $h2 ?: md_in( $titulo ), 'link' => link_de( $c ) ?: array( 'Ir para o blog', '{{U}}/blog/' ), 'cat' => $cat ) );

		case 'faq':
			return s_faq( array( 'rotulo' => '', 'h2' => $h2 ?: 'Perguntas frequentes', 'texto' => fin( $c, 'texto lateral', 'texto' ), 'qas' => array_map( fn( $q ) => array( md_in( $q[0] ), md_in( $q[1] ) ), $c['faq'] ) ), 'cal' );

		case 'cta-diagnostico':
			$bs = botoes_de( $c );
			return s_cta( array( 'rotulo' => '', 'h2' => $h2, 'texto' => fin( $c, 'texto' ), 'botoes' => $bs, 'linha' => md_in( str_replace( ' · ', '   ', f( $c, 'linha mono' ) ) ) ) );

		case 'cta-whatsapp':
			$b   = f( $c, 'botão' );
			$msg = '';
			if ( preg_match( '/text=([^`]+)`/', $b, $m ) ) {
				$msg = rawurldecode( $m[1] );
			}
			return s_cta_whatsapp( array( 'h2' => $h2, 'texto' => md_in( preg_replace( '/\s*\[a confirmar[^\]]*\]/u', '', f( $c, 'texto' ) ) ), 'texto_botao' => md_link( $b )[0] ?? 'Conversar no WhatsApp', 'mensagem' => $msg ) );

		case 'lista-sinais':
			return s_lista( array( 'h2' => $h2 ?: md_in( $titulo ), 'texto' => fin( $c, 'texto' ), 'itens' => array_map( 'md_in', $c['itens'] ), 'link' => link_de( $c ) ), ( $alterna++ % 2 ) ? 'cal' : '' );

		case 'escopo-lista':
			$t   = $c['tabelas'][0] ?? array( array( '', '' ) );
			$cab = array_map( 'md_in', array_shift( $t ) );
			return s_tabela( array( 'h2' => $h2 ?: md_in( $titulo ), 'texto' => fin( $c, 'texto' ), 'cab' => $cab, 'linhas' => array_map( fn( $r ) => array_map( 'md_in', $r ), $t ), 'nota' => nota_de( $c ) ), 'cal' );

		case 'servicos-relacionados':
			$cols = array();
			foreach ( $c['itens'] as $it ) {
				$l = md_link( $it );
				if ( ! $l ) {
					continue;
				}
				$path   = str_replace( '{{U}}', '', $l[1] );
				$em     = FF_NOMES_SERVICO[ $path ] ?? 'auditoria';
				$cols[] = array( 'html' => constelacao( $em, 'claro', array( 'w' => '72px' ) ) . h( 3, '<a href="' . $l[1] . '">' . $l[0] . '</a>', array( 'class' => 'ff-titulo-sora' ) ) );
			}
			return secao( h( 2, md_in( $titulo ), array( 'class' => 'is-style-versal', 'size' => 'titulo-3' ) ) . colunas( $cols, array( 'class' => 'is-style-livro-razao ff-relacionados-servicos' ) ), '', array( 'pad' => array( 'top' => sp( '60' ), 'bottom' => sp( '60' ) ) ) );

		case 'nota-destaque':
			return s_nota_destaque( fin( $c, 'texto' ) ?: md_in( implode( ' ', $c['par'] ) ), 'cal' );

		case 'publicos-colunas':
			$itens = array_map(
				function ( $b ) {
					$x = item_bold( $b );
					return array( $x[0], $x[1], $x[2] );
				},
				$c['bold']
			);
			return s_publicos( array( 'h2' => md_in( $titulo ), 'itens' => $itens ) );

		case 'comparativo-duas-colunas':
			$t   = $c['tabelas'][0];
			$cab = array_shift( $t );
			return s_comparativo( array( 'h2' => md_in( $titulo ), 'a' => array( md_in( $cab[0] ), array_map( fn( $r ) => md_in( $r[0] ), $t ) ), 'b' => array( md_in( $cab[1] ), array_map( fn( $r ) => md_in( $r[1] ), $t ) ), 'nota' => nota_de( $c ) ) );

		case 'linha-do-tempo':
			$its = array();
			foreach ( $c['pares'] as [ $k, $v ] ) {
				if ( 'H2' !== $k ) {
					$its[] = array( md_in( $k ), md_in( $v ) );
				}
			}
			return s_linha_tempo( array( 'h2' => $h2, 'itens' => $its ) );

		case 'destaque-artigo':
			return s_destaque_artigo( array( 'rotulo' => eyebrow( $c ), 'h2' => $h2, 'texto' => fin( $c, 'texto' ), 'link' => link_de( $c ), 'emblema' => 'condominios' ) );

		case 'valores-lista':
			return s_valores( array( 'h2' => md_in( $titulo ), 'itens' => array_map( fn( $b ) => array( md_in( $b[0] ), md_in( $b[1] ) ), $c['bold'] ) ), 'cal' );

		case 'dados-institucionais':
			$linhas = array();
			foreach ( $c['itens'] as $it ) {
				$ps       = array_map( 'trim', explode( ' · ', $it, 2 ) );
				$linhas[] = array( ucfirst( mb_strtolower( $ps[0] ) ), md_in( $ps[1] ?? '' ) );
			}
			return s_dados( $linhas, md_in( $titulo ) );

		case 'contato-form':
			return s_contato();

		case 'base-legal':
			$its = array();
			foreach ( $c['pares'] as [ $k, $v ] ) {
				$its[] = array( md_in( $k ), md_in( $v ) );
			}
			return s_base_legal( $its );

		case 'texto-legal':
			$md = preg_replace( '/^\[pattern:.*$/m', '', $txt );
			$md = preg_replace( '/^### /m', '## ', $md );
			$corpo = md_blocos( $md, array( 'lista' => 'is-style-estrelas' ) );
			$in    = colunas(
				array(
					array( 'html' => grupo( ff_v( 'fireflies/indice' ), array( 'class' => 'ff-sticky' ) ), 'w' => '30%' ),
					array( 'html' => grupo( $corpo, array( 'class' => 'ff-prosa', 'layout' => array( 'type' => 'constrained', 'contentSize' => '720px', 'justifyContent' => 'left' ) ) ), 'w' => '70%' ),
				),
				array( 'gap' => sp( '60' ) )
			);
			return secao( $in, '', array( 'class' => 'ff-texto-legal' ) );

		case 'filtro-categorias':
		case 'post-destaque':
		case 'posts-lista':
			return ''; // a página de posts usa templates/home.html
	}
	fwrite( STDERR, "pattern sem mapeamento: {$pat}\n" );
	return '';
}
