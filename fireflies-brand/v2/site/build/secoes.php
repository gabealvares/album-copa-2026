<?php
/**
 * Seções da Fireflies (os "patterns" parametrizados).
 * Cada função devolve marcação de blocos. Ver lib.php.
 */

require_once __DIR__ . '/lib.php';

/** Hero Anil. $lado: html de blocos da coluna direita (constelação, ficha ou emblema). */
function s_hero_anil( array $d ): string {
	$d += array( 'rotulo' => '', 'h1' => '', 'lead' => '', 'botoes' => array(), 'nota' => '', 'lado' => '', 'padrao' => 'reticula', 'versal' => true, 'lockup' => '' );
	$esq  = '';
	if ( $d['lockup'] ) {
		$esq .= img( "{{A}}img/logo/fireflies_{$d['lockup']}-horizontal_digital-negativo.svg", 'Fireflies ' . ucfirst( $d['lockup'] ), array( 'w' => '300px', 'class' => 'ff-lockup' ) );
	}
	if ( $d['rotulo'] ) {
		$esq .= rotulo( $d['rotulo'] );
	}
	$esq .= h( 1, $d['h1'], array( 'class' => $d['versal'] ? 'is-style-versal' : '', 'size' => 'display' ) );
	$esq .= abertura( $d['lead'] );
	if ( $d['botoes'] ) {
		$esq .= botoes( $d['botoes'], array( 'mar' => array( 'top' => sp( '50' ) ) ) );
	}
	if ( $d['nota'] ) {
		$esq .= nota( $d['nota'], array( 'text' => 'fumaca' ) );
	}
	$cls = 'ff-hero ff-padrao' . ( 'reticula' !== $d['padrao'] ? ' ff-padrao--' . $d['padrao'] : '' );
	$in  = $d['lado']
		? colunas( array( array( 'html' => $esq, 'w' => '58%' ), array( 'html' => $d['lado'], 'va' => 'center', 'class' => 'ff-hero__lado' ) ), array( 'va' => 'center', 'gap' => sp( '60' ) ) )
		: estreito( $esq, '860px' );
	return secao( $in, 'noite', array( 'class' => $cls, 'pad' => array( 'top' => sp( '70' ), 'bottom' => sp( '70' ) ) ) );
}

/** Abertura clara de página (Cal), com trilha, título e emblema opcional. */
function s_hero_cal( array $d ): string {
	$d += array( 'trilha' => array(), 'rotulo' => '', 'h1' => '', 'lead' => '', 'botoes' => array(), 'nota' => '', 'lado' => '', 'versal' => true );
	$esq = '';
	if ( $d['trilha'] ) {
		$links = array();
		foreach ( $d['trilha'] as [ $t, $u ] ) {
			$links[] = $u ? '<a href="' . $u . '">' . $t . '</a>' : $t;
		}
		$esq .= nota( implode( ' / ', $links ), array( 'class' => 'ff-trilha' ) );
	}
	if ( $d['rotulo'] ) {
		$esq .= rotulo( $d['rotulo'] );
	}
	$esq .= h( 1, $d['h1'], array( 'class' => $d['versal'] ? 'is-style-versal' : '' ) );
	$esq .= sep( 'fio-rubrica' );
	$esq .= abertura( $d['lead'] );
	if ( $d['botoes'] ) {
		$esq .= botoes( $d['botoes'], array( 'mar' => array( 'top' => sp( '40' ) ) ) );
	}
	if ( $d['nota'] ) {
		$esq .= nota( $d['nota'] );
	}
	$in = $d['lado']
		? colunas( array( array( 'html' => $esq, 'w' => '62%' ), array( 'html' => $d['lado'], 'va' => 'center', 'class' => 'ff-hero__lado' ) ), array( 'va' => 'center', 'gap' => sp( '60' ) ) )
		: estreito( $esq, '820px' );
	return secao( $in, 'cal', array( 'class' => 'ff-hero ff-hero--cal', 'pad' => array( 'top' => sp( '60' ), 'bottom' => sp( '60' ) ) ) );
}

/** Ficha (linhas com fio), usada no hero e em dados institucionais. */
function ficha( array $linhas, bool $escura = false ): string {
	$in = '';
	foreach ( $linhas as [ $r, $t ] ) {
		$in .= grupo( rotulo( $r ) . p( $t ), array( 'gap' => '0.25rem', 'layout' => array( 'type' => 'flex', 'orientation' => 'vertical' ) ) );
	}
	return grupo( $in, array( 'class' => 'ff-ficha' . ( $escura ? ' ff-ficha--escura' : '' ), 'gap' => '0' ) );
}

/** Números de destaque em livro-razão (sem cards). */
function s_numeros( array $itens, string $v = '', array $o = array() ): string {
	$cols = array();
	foreach ( $itens as [ $grande, $rot ] ) {
		$cols[] = array( 'html' => p( $grande, array( 'class' => 'is-style-numero ff-numero--palavra', 'size' => 'titulo-1' ) ) . nota( $rot ) );
	}
	return secao( colunas( $cols, array( 'class' => 'is-style-livro-razao' ) ), $v, $o + array( 'pad' => array( 'top' => sp( '60' ), 'bottom' => sp( '40' ) ) ) );
}

/** Cabeçalho de seção: título + texto empilhados (sem split-header). */
function cab( string $h2, string $texto = '', array $o = array() ): string {
	$in = '';
	if ( ! empty( $o['rotulo'] ) ) {
		$in .= rotulo( $o['rotulo'] );
	}
	$in .= h( 2, $h2, array( 'class' => ! empty( $o['versal'] ) ? 'is-style-versal' : '', 'anchor' => $o['anchor'] ?? '' ) );
	if ( $texto ) {
		$in .= p( $texto, array( 'size' => 'lead' ) );
	}
	return estreito( $in, $o['largura'] ?? '720px', array( 'mar' => array( 'bottom' => sp( '50' ) ) ) );
}

/**
 * Lista editorial de serviços: o primeiro (especialidade) ganha emblema; os demais em linhas de índice.
 * $itens: [nome, frase, url, entregaveis?, para_quem?]
 */
function s_servicos( array $d, string $v = '' ): string {
	$d += array( 'h2' => '', 'texto' => '', 'itens' => array(), 'link' => null, 'rotulo' => '', 'destaque' => true, 'emblema' => 'condominios' );
	$in    = cab( $d['h2'], $d['texto'], array( 'rotulo' => $d['rotulo'], 'versal' => true ) );
	$itens = $d['itens'];
	if ( $d['destaque'] && $itens ) {
		$f    = array_shift( $itens );
		$txt  = rotulo( 'Especialidade' ) . h( 3, $f[2] ? '<a href="' . $f[2] . '">' . $f[0] . '</a>' : $f[0], array( 'size' => 'titulo-2', 'class' => 'is-style-versal' ) ) . p( $f[1], array( 'size' => 'lead' ) );
		if ( ! empty( $f[4] ) ) {
			$txt .= p( $f[4], array( 'text' => 'pedra' ) );
		}
		if ( ! empty( $f[3] ) ) {
			$txt .= nota( $f[3] );
		}
		if ( $f[2] ) {
			$txt .= p( '<a href="' . $f[2] . '">Ver o serviço</a>', array( 'class' => 'ff-ir-destaque' ) );
		}
		$in .= colunas(
			array(
				array( 'html' => constelacao( $d['emblema'], 'claro', array( 'w' => '200px' ) ), 'w' => '22%', 'va' => 'center' ),
				array( 'html' => $txt ),
			),
			array( 'class' => 'ff-servico-destaque', 'gap' => sp( '50' ), 'pad' => array( 'top' => sp( '40' ), 'bottom' => sp( '50' ) ) )
		);
	}
	$linhas = '';
	foreach ( $itens as $i ) {
		$nome   = $i[2] ? '<a href="' . $i[2] . '">' . $i[0] . '</a>' : $i[0];
		$meio   = p( $i[1] );
		if ( ! empty( $i[4] ) ) {
			$meio = p( $i[4], array( 'text' => 'pedra', 'size' => 'pequeno' ) ) . $meio;
		}
		if ( ! empty( $i[3] ) ) {
			$meio .= nota( $i[3] );
		}
		$linhas .= colunas(
			array(
				array( 'html' => h( 3, $nome ), 'w' => '34%' ),
				array( 'html' => $meio, 'w' => '50%' ),
				array( 'html' => $i[2] ? p( '<a href="' . $i[2] . '" aria-hidden="true" tabindex="-1">Ver</a>', array( 'class' => 'ff-ir' ) ) : '', 'w' => '16%' ),
			),
			array( 'class' => 'is-style-linha-indice' )
		);
	}
	$in .= grupo( $linhas, array( 'class' => 'ff-indice', 'gap' => '0' ) );
	if ( $d['link'] ) {
		$in .= p( '<a href="' . $d['link'][1] . '">' . $d['link'][0] . '</a>', array( 'mar' => array( 'top' => sp( '40' ) ) ) );
	}
	return secao( $in, $v );
}

/** Frase grande (manifesto). */
function s_manifesto( array $d, string $v = 'cal' ): string {
	$d += array( 'rotulo' => '', 'frase' => '', 'texto' => array(), 'nota' => '', 'assinatura' => '' );
	$in = '';
	if ( $d['rotulo'] ) {
		$in .= rotulo( $d['rotulo'] );
	}
	$in .= p( $d['frase'], array( 'class' => 'ff-manifesto' ) );
	$corpo = '';
	foreach ( (array) $d['texto'] as $t ) {
		$corpo .= p( $t, array( 'size' => 'lead' ) );
	}
	if ( $d['nota'] ) {
		$corpo .= p( $d['nota'], array( 'class' => 'is-style-nota-margem' ) );
	}
	if ( $d['assinatura'] ) {
		$corpo .= p( $d['assinatura'], array( 'class' => 'ff-assinatura-texto' ) );
	}
	$in .= colunas( array( array( 'html' => '', 'w' => '33%' ), array( 'html' => $corpo, 'w' => '67%' ) ), array( 'class' => 'ff-manifesto__corpo' ) );
	return secao( estreito( $in, '1040px' ), $v, array( 'class' => 'ff-secao-manifesto' ) );
}

/** Painel mensal com matriz de pontos e estados. */
function s_painel( array $d, string $v = '' ): string {
	$d += array( 'rotulo' => '', 'h2' => '', 'texto' => '', 'alertas' => array(), 'colunas' => array() );
	$esq = '';
	if ( $d['rotulo'] ) {
		$esq .= rotulo( $d['rotulo'] );
	}
	$esq .= h( 2, $d['h2'] ) . p( $d['texto'], array( 'size' => 'lead' ) );
	foreach ( $d['alertas'] as [ $tipo, $txt ] ) {
		$esq .= p( $txt, array( 'class' => "is-style-estado-{$tipo}" ) );
	}
	$in = colunas(
		array(
			array( 'html' => $esq, 'w' => '42%' ),
			array( 'html' => grupo( html( svg_painel() ), array( 'class' => 'ff-painel-figura' ) ), 'w' => '58%' ),
		),
		array( 'gap' => sp( '60' ) )
	);
	if ( $d['colunas'] ) {
		$cols = array();
		foreach ( $d['colunas'] as [ $t, $x ] ) {
			$cols[] = array( 'html' => h( 3, $t ) . p( $x ) );
		}
		$in .= colunas( $cols, array( 'class' => 'is-style-livro-razao', 'mar' => array( 'top' => sp( '60' ) ) ) );
	}
	return secao( $in, $v );
}

/** CTA raio-X do condomínio (noite, emblema Domus). */
function s_raio_x( array $d ): string {
	$d += array( 'rotulo' => '', 'h2' => 'Raio-X do seu condomínio.', 'texto' => '', 'itens' => array(), 'nota' => '', 'botoes' => array() );
	$esq = '';
	if ( $d['rotulo'] ) {
		$esq .= rotulo( $d['rotulo'] );
	}
	$esq .= h( 2, $d['h2'], array( 'class' => 'is-style-versal', 'size' => 'titulo-1' ) ) . p( $d['texto'], array( 'size' => 'lead' ) );
	if ( $d['itens'] ) {
		$esq .= lista( $d['itens'], array( 'class' => 'is-style-estrelas' ) );
	}
	if ( $d['botoes'] ) {
		$esq .= botoes( $d['botoes'], array( 'mar' => array( 'top' => sp( '40' ) ) ) );
	}
	if ( $d['nota'] ) {
		$esq .= nota( $d['nota'], array( 'text' => 'fumaca' ) );
	}
	$in = colunas(
		array(
			array( 'html' => $esq, 'w' => '60%' ),
			array( 'html' => constelacao( 'condominios', 'escuro', array( 'w' => '300px', 'class' => 'is-style-emblema aligncenter' ) ), 'va' => 'center' ),
		),
		array( 'va' => 'center', 'gap' => sp( '60' ) )
	);
	return secao( $in, 'noite', array( 'class' => 'ff-raio-x' ) );
}

/** Passos em constelação. $passos: [quando, titulo, texto, entregavel] */
function s_passos( array $d, string $v = 'cal' ): string {
	$d += array( 'rotulo' => '', 'h2' => '', 'texto' => '', 'passos' => array(), 'link' => null, 'nota' => '' );
	$in   = cab( $d['h2'], $d['texto'], array( 'rotulo' => $d['rotulo'], 'versal' => true ) );
	$cols = array();
	foreach ( $d['passos'] as $pz ) {
		$c = '';
		if ( $pz[0] ) {
			$c .= nota( $pz[0], array( 'text' => 'noite' === $v ? 'fumaca' : 'pedra' ) );
		}
		$c .= h( 3, $pz[1] ) . p( $pz[2] );
		if ( ! empty( $pz[3] ) ) {
			$c .= p( '<strong>Entregável:</strong> ' . $pz[3], array( 'class' => 'ff-entregavel' ) );
		}
		$cols[] = array( 'html' => $c );
	}
	$in .= colunas( $cols, array( 'class' => 'is-style-passos' ) );
	if ( $d['nota'] ) {
		$in .= nota( $d['nota'], array( 'mar' => array( 'top' => sp( '40' ) ) ) );
	}
	if ( $d['link'] ) {
		$in .= p( '<a href="' . $d['link'][1] . '">' . $d['link'][0] . '</a>', array( 'mar' => array( 'top' => sp( '40' ) ) ) );
	}
	return secao( $in, $v );
}

/** Grade 2×2 com fios (diferenciais, entregáveis). $itens: [titulo, texto] */
function s_grade( array $d, string $v = '' ): string {
	$d += array( 'rotulo' => '', 'h2' => '', 'texto' => '', 'itens' => array(), 'por_linha' => 2 );
	$in   = $d['h2'] ? cab( $d['h2'], $d['texto'], array( 'rotulo' => $d['rotulo'] ) ) : '';
	foreach ( array_chunk( $d['itens'], $d['por_linha'] ) as $par ) {
		$cols = array();
		foreach ( $par as [ $t, $x ] ) {
			$cols[] = array( 'html' => h( 3, $t ) . p( $x ) );
		}
		$in .= colunas( $cols, array( 'class' => 'is-style-livro-razao' ) );
	}
	return secao( $in, $v, array( 'class' => 'ff-grade' ) );
}

/** Lista de sinais (estrelas). */
function s_lista( array $d, string $v = '' ): string {
	$d += array( 'h2' => '', 'texto' => '', 'itens' => array(), 'link' => null, 'lado' => '' );
	$in = h( 2, $d['h2'] ) . ( $d['texto'] ? p( $d['texto'], array( 'size' => 'lead' ) ) : '' ) . lista( $d['itens'], array( 'class' => 'is-style-estrelas' ) );
	if ( $d['link'] ) {
		$in .= p( '<a href="' . $d['link'][1] . '">' . $d['link'][0] . '</a>' );
	}
	return secao( estreito( $in ), $v );
}

/** Tabela editorial com título. */
function s_tabela( array $d, string $v = '' ): string {
	$d += array( 'h2' => '', 'texto' => '', 'cab' => array(), 'linhas' => array(), 'nota' => '', 'estilo' => '', 'foot' => array() );
	$in = h( 2, $d['h2'] ) . ( $d['texto'] ? p( $d['texto'], array( 'size' => 'lead' ) ) : '' );
	$in .= tabela( $d['cab'], $d['linhas'], array( 'class' => $d['estilo'] ? "is-style-{$d['estilo']}" : '', 'foot' => $d['foot'] ) );
	if ( $d['nota'] ) {
		$in .= nota( $d['nota'] );
	}
	return secao( estreito( $in, '960px' ), $v );
}

/** Responsável técnico. */
function s_responsavel( array $d, string $v = 'cal' ): string {
	$d += array( 'rotulo' => '', 'nome' => 'Gabriel Alvares', 'cargo' => '', 'textos' => array(), 'areas' => array(), 'link' => null, 'dados' => array() );
	$dir = '';
	if ( $d['rotulo'] ) {
		$dir .= rotulo( $d['rotulo'] );
	}
	$dir .= h( 2, $d['nome'], array( 'size' => 'titulo-1' ) ) . nota( $d['cargo'] ) . sep( 'fio-rubrica' );
	foreach ( $d['textos'] as $t ) {
		$dir .= p( $t, array( 'size' => 'lead' ) );
	}
	if ( $d['link'] ) {
		$dir .= p( '<a href="' . $d['link'][1] . '">' . $d['link'][0] . '</a>' );
	}
	$esq = img( '{{A}}img/retrato-placeholder.svg', 'Espaço para o retrato de Gabriel Alvares (foto real a inserir)', array( 'class' => 'ff-retrato' ) );
	if ( $d['areas'] ) {
		$esq .= ficha( array( array( 'Áreas', implode( '<br>', $d['areas'] ) ) ) );
	}
	$in = colunas( array( array( 'html' => $esq, 'w' => '34%' ), array( 'html' => $dir, 'w' => '66%' ) ), array( 'gap' => sp( '60' ) ) );
	return secao( $in, $v, array( 'class' => 'ff-responsavel' ) );
}

/** Academy: lista de cursos (consulta do CPT). */
function s_academy( array $d, string $v = '' ): string {
	$d += array( 'rotulo' => '', 'h2' => '', 'texto' => '', 'botao' => null, 'anchor' => '', 'qtd' => 6 );
	$in   = cab( $d['h2'], $d['texto'], array( 'rotulo' => $d['rotulo'], 'anchor' => $d['anchor'] ) );
	$tpl  = colunas(
		array(
			array( 'html' => ff_v( 'post-terms', array( 'term' => 'trilha', 'className' => 'is-style-rotulo' ) ), 'w' => '20%' ),
			array( 'html' => ff_v( 'post-title', array( 'level' => 3, 'isLink' => true ) ) . ff_v( 'post-excerpt', array( 'excerptLength' => 24 ) ), 'w' => '52%' ),
			array( 'html' => ff_v( 'fireflies/curso-ficha', array( 'compacta' => true ) ), 'w' => '28%' ),
		),
		array( 'class' => 'is-style-linha-indice ff-linha-curso' )
	);
	$in .= consulta_posts(
		array( 'perPage' => $d['qtd'], 'postType' => 'curso', 'order' => 'asc', 'orderBy' => 'menu_order' ),
		post_template( $tpl ),
		array( 'class' => 'ff-indice ff-cursos', 'id' => 20 )
	);
	if ( $d['botao'] ) {
		$in .= botoes( array( $d['botao'] ), array( 'mar' => array( 'top' => sp( '50' ) ) ) );
	}
	return secao( $in, $v );
}

/** Destaques do blog: 1 grande + 2 menores. $cat: slug opcional. */
function s_blog_destaques( array $d, string $v = '' ): string {
	$d += array( 'rotulo' => '', 'h2' => '', 'texto' => '', 'link' => null, 'cat' => '' );
	$in  = cab( $d['h2'], $d['texto'], array( 'rotulo' => $d['rotulo'] ) );
	$tpl = ff_v( 'post-terms', array( 'term' => 'category' ) )
		. ff_v( 'post-title', array( 'level' => 3, 'isLink' => true ) )
		. ff_v( 'post-excerpt', array( 'excerptLength' => 26 ) )
		. grupo( ff_v( 'post-date', array( 'format' => 'd/m/Y' ) ) . ff_v( 'fireflies/tempo-leitura' ), array( 'class' => 'ff-meta', 'layout' => array( 'type' => 'flex', 'flexWrap' => 'wrap' ), 'gap' => '0.4rem 1.25rem' ) );
	$q   = array( 'perPage' => 3 );
	if ( $d['cat'] ) {
		$q['ffCategoria'] = $d['cat'];
	}
	$in .= consulta_posts( $q, post_template( $tpl, array( 'type' => 'grid', 'columnCount' => 3 ) ), array( 'class' => 'ff-destaques', 'id' => 30 ) );
	if ( $d['link'] ) {
		$in .= p( '<a href="' . $d['link'][1] . '">' . $d['link'][0] . '</a>', array( 'mar' => array( 'top' => sp( '40' ) ) ) );
	}
	return secao( $in, $v );
}

/** Lista de posts em linhas (data, categoria, título, resumo). */
function blog_lista_template(): string {
	return colunas(
		array(
			array( 'html' => ff_v( 'post-date', array( 'format' => 'd/m/Y' ) ) . ff_v( 'post-terms', array( 'term' => 'category' ) ), 'w' => '22%' ),
			array( 'html' => ff_v( 'post-title', array( 'level' => 2, 'isLink' => true ) ) . ff_v( 'post-excerpt', array( 'excerptLength' => 30 ) ) . ff_v( 'fireflies/tempo-leitura', array( 'className' => 'ff-meta' ) ), 'w' => '78%' ),
		),
		array( 'gap' => sp( '40' ) )
	);
}

/** FAQ com core/details. */
function s_faq( array $d, string $v = '' ): string {
	$d += array( 'rotulo' => '', 'h2' => 'Perguntas frequentes', 'texto' => '', 'qas' => array(), 'wa' => true );
	$esq = ( $d['rotulo'] ? rotulo( $d['rotulo'] ) : '' ) . h( 2, $d['h2'], array( 'class' => 'is-style-versal' ) );
	if ( $d['texto'] ) {
		$esq .= p( $d['texto'] );
	}
	if ( $d['wa'] ) {
		$esq .= shortcode( '[fireflies_whatsapp texto="Perguntar no WhatsApp" estilo="contorno"]' );
	}
	$qas = '';
	foreach ( $d['qas'] as [ $q, $r ] ) {
		$qas .= detalhes( $q, $r );
	}
	$in = colunas( array( array( 'html' => $esq, 'w' => '34%' ), array( 'html' => grupo( $qas, array( 'class' => 'ff-faq', 'gap' => '0' ) ), 'w' => '66%' ) ), array( 'gap' => sp( '60' ) ) );
	return secao( $in, $v );
}

/** CTA final (noite, padrão de estrelas). */
function s_cta( array $d ): string {
	$d += array( 'rotulo' => '', 'h2' => 'Comece pelo diagnóstico.', 'texto' => '', 'botoes' => array(), 'linha' => '' );
	$in = ( $d['rotulo'] ? rotulo( $d['rotulo'] ) : '' ) . h( 2, $d['h2'], array( 'size' => 'titulo-1' ) );
	if ( $d['texto'] ) {
		$in .= p( $d['texto'], array( 'size' => 'lead' ) );
	}
	$in .= botoes( $d['botoes'], array( 'mar' => array( 'top' => sp( '40' ) ) ) );
	if ( $d['linha'] ) {
		$in .= nota( $d['linha'], array( 'text' => 'fumaca' ) );
	}
	return secao( estreito( $in, '760px' ), 'noite', array( 'class' => 'ff-cta ff-padrao ff-padrao--estrelas' ) );
}

/** CTA WhatsApp compacto (claro). */
function s_cta_whatsapp( array $d, string $v = 'cal' ): string {
	$d += array( 'h2' => '', 'texto' => '', 'texto_botao' => 'Conversar no WhatsApp', 'mensagem' => '' );
	$sc  = '[fireflies_whatsapp texto="' . $d['texto_botao'] . '"' . ( $d['mensagem'] ? ' mensagem="' . $d['mensagem'] . '"' : '' ) . ']';
	$in  = colunas(
		array(
			array( 'html' => h( 2, $d['h2'], array( 'size' => 'titulo-3' ) ) . p( $d['texto'] ), 'w' => '64%' ),
			array( 'html' => shortcode( $sc ), 'va' => 'center' ),
		),
		array( 'va' => 'center', 'gap' => sp( '50' ) )
	);
	return secao( $in, $v, array( 'class' => 'ff-cta-whatsapp', 'pad' => array( 'top' => sp( '60' ), 'bottom' => sp( '60' ) ) ) );
}

/** Nota em destaque (frase com fio de rubrica). */
function s_nota_destaque( string $texto, string $v = '' ): string {
	return secao( estreito( sep( 'fio-rubrica' ) . p( $texto, array( 'class' => 'ff-nota-destaque' ) ), '860px' ), $v, array( 'pad' => array( 'top' => sp( '60' ), 'bottom' => sp( '60' ) ) ) );
}

/** Citação em Anil. */
function s_citacao( string $texto, string $cite ): string {
	return secao( estreito( citacao( $texto, $cite ), '900px' ), 'noite', array( 'class' => 'ff-citacao' ) );
}

/** Base legal como seção. $itens: [fonte, texto] */
function base_legal( array $itens, string $titulo = 'Base legal' ): string {
	$in = rotulo( $titulo );
	foreach ( $itens as [ $f, $t ] ) {
		$in .= h( 4, $f, array( 'class' => 'ff-fonte-legal' ) ) . citacao( $t );
	}
	return grupo( $in, array( 'class' => 'is-style-base-legal' ) );
}
function s_base_legal( array $itens, string $v = '' ): string {
	return secao( estreito( base_legal( $itens ) ), $v, array( 'pad' => array( 'top' => sp( '40' ), 'bottom' => sp( '60' ) ) ) );
}

/** Públicos / frentes em 3 colunas com fio. $itens: [titulo, texto, url?] */
function s_publicos( array $d, string $v = '' ): string {
	$d += array( 'rotulo' => '', 'h2' => '', 'texto' => '', 'itens' => array() );
	$in   = $d['h2'] ? cab( $d['h2'], $d['texto'], array( 'rotulo' => $d['rotulo'] ) ) : '';
	$cols = array();
	foreach ( $d['itens'] as $i ) {
		$c = h( 3, $i[0], array( 'class' => 'ff-titulo-sora' ) ) . p( $i[1] );
		if ( ! empty( $i[2] ) ) {
			$c .= p( '<a href="' . $i[2] . '">' . ( $i[3] ?? 'Saiba mais' ) . '</a>' );
		}
		$cols[] = array( 'html' => $c );
	}
	$in .= colunas( $cols, array( 'class' => 'is-style-livro-razao' ) );
	return secao( $in, $v );
}

/** Linha do tempo em ficha (quando → o quê). */
function s_linha_tempo( array $d, string $v = '' ): string {
	$d += array( 'h2' => '', 'texto' => '', 'itens' => array() );
	$rows = '';
	foreach ( $d['itens'] as [ $q, $t ] ) {
		$rows .= colunas( array( array( 'html' => p( $q, array( 'class' => 'ff-tempo-quando' ) ), 'w' => '34%' ), array( 'html' => p( $t ), 'w' => '66%' ) ), array( 'class' => 'is-style-linha-indice' ) );
	}
	$in = cab( $d['h2'], $d['texto'] ) . grupo( $rows, array( 'class' => 'ff-indice', 'gap' => '0' ) );
	return secao( $in, $v );
}

/** Destaque de artigo (chamada para um post). */
function s_destaque_artigo( array $d, string $v = 'cal' ): string {
	$d += array( 'rotulo' => '', 'h2' => '', 'texto' => '', 'link' => null, 'emblema' => '' );
	$txt = rotulo( $d['rotulo'] ) . h( 2, $d['h2'] ) . p( $d['texto'], array( 'size' => 'lead' ) );
	if ( $d['link'] ) {
		$txt .= botoes( array( array( $d['link'][0], $d['link'][1], 'outline' ) ) );
	}
	$cols = array( array( 'html' => $txt, 'w' => '70%' ) );
	$cols[] = array( 'html' => $d['emblema'] ? constelacao( $d['emblema'], 'claro', array( 'w' => '180px', 'class' => 'is-style-emblema aligncenter' ) ) : '', 'va' => 'center' );
	return secao( colunas( $cols, array( 'va' => 'center', 'class' => 'ff-destaque-artigo' ) ), $v );
}

/** Valores em linhas de índice (palavra em Sora + frase). */
function s_valores( array $d, string $v = '' ): string {
	$d += array( 'h2' => '', 'itens' => array() );
	$rows = '';
	foreach ( $d['itens'] as [ $t, $x ] ) {
		$rows .= colunas( array( array( 'html' => h( 3, $t ), 'w' => '34%' ), array( 'html' => p( $x, array( 'size' => 'lead' ) ), 'w' => '66%' ) ), array( 'class' => 'is-style-linha-indice' ) );
	}
	return secao( cab( $d['h2'] ) . grupo( $rows, array( 'class' => 'ff-indice', 'gap' => '0' ) ), $v );
}

/** Comparativo em duas colunas. */
function s_comparativo( array $d, string $v = '' ): string {
	$d += array( 'h2' => '', 'a' => array( '', array() ), 'b' => array( '', array() ), 'nota' => '' );
	$cols = array();
	foreach ( array( $d['a'], $d['b'] ) as [ $t, $its ] ) {
		$cols[] = array( 'html' => h( 3, $t, array( 'class' => 'ff-titulo-sora' ) ) . lista( $its, array( 'class' => 'is-style-estrelas' ) ) );
	}
	$in = cab( $d['h2'] ) . colunas( $cols, array( 'class' => 'is-style-livro-razao' ) );
	if ( $d['nota'] ) {
		$in .= nota( $d['nota'], array( 'mar' => array( 'top' => sp( '30' ) ) ) );
	}
	return secao( $in, $v );
}

/** Contato: canais + slot de formulário. */
function s_contato( array $d = array(), string $v = '' ): string {
	$d += array(
		'canais' => array(
			array( 'WhatsApp', '<a href="' . wa() . '">+55 11 98245-0527</a> (o canal mais rápido)' ),
			array( 'E-mail', '<a href="mailto:contato@fireflies.com.br">contato@fireflies.com.br</a>' ),
			array( 'Atendimento', 'Segunda a sexta, das 8h às 18h' ),
			array( 'Localização', 'São Paulo/SP' ),
			array( 'Responsável', 'Gabriel Alvares, CRC-SP [a confirmar]' ),
		),
		'h2'     => 'Conte o que você precisa',
	);
	$esq = ficha( $d['canais'] ) . shortcode( '[fireflies_whatsapp texto="Conversar no WhatsApp"]' );
	$dir = h( 2, $d['h2'], array( 'size' => 'titulo-3' ) ) . shortcode( '[fireflies_formulario]' ) . nota( 'Seus dados são usados apenas para retornar o contato. Detalhes na <a href="{{U}}/politica-de-privacidade/">Política de privacidade</a>.' );
	return secao( colunas( array( array( 'html' => $esq, 'w' => '38%' ), array( 'html' => $dir, 'w' => '62%' ) ), array( 'gap' => sp( '60' ) ) ), $v );
}

/** Dados institucionais em duas colunas de ficha. */
function s_dados( array $linhas, string $h2 = 'Dados da empresa', string $v = '' ): string {
	$metade = (int) ceil( count( $linhas ) / 2 );
	$in     = cab( $h2 ) . colunas( array( array( 'html' => ficha( array_slice( $linhas, 0, $metade ) ) ), array( 'html' => ficha( array_slice( $linhas, $metade ) ) ) ), array( 'gap' => sp( '50' ) ) );
	return secao( $in, $v );
}

/** Triagem sem JavaScript: quatro caminhos com mensagem pronta no WhatsApp. */
function s_triagem( array $d, string $v = '' ): string {
	$d += array( 'rotulo' => '', 'h2' => '', 'texto' => '', 'pergunta' => '', 'opcoes' => array(), 'nota' => '' );
	$rows = '';
	foreach ( $d['opcoes'] as [ $letra, $quem, $caminho, $url, $msg ] ) {
		$rows .= colunas(
			array(
				array( 'html' => p( $letra, array( 'class' => 'ff-letra' ) ), 'w' => '8%' ),
				array( 'html' => h( 3, $quem ) . p( $caminho, array( 'text' => 'pedra', 'size' => 'pequeno' ) ), 'w' => '56%' ),
				array( 'html' => p( '<a href="' . $url . '">Ver o caminho</a>   <a href="' . wa( $msg ) . '">Enviar no WhatsApp</a>', array( 'class' => 'ff-ir' ) ), 'w' => '36%' ),
			),
			array( 'class' => 'is-style-linha-indice' )
		);
	}
	$in = cab( $d['h2'], $d['texto'], array( 'rotulo' => $d['rotulo'] ) ) . h( 3, $d['pergunta'], array( 'class' => 'ff-pergunta' ) ) . grupo( $rows, array( 'class' => 'ff-indice ff-triagem', 'gap' => '0' ) );
	if ( $d['nota'] ) {
		$in .= nota( $d['nota'], array( 'mar' => array( 'top' => sp( '30' ) ) ) );
	}
	return secao( $in, $v );
}
