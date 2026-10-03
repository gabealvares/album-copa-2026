<?php
/**
 * Monta o site a partir de conteudo/ (wxr-spec.json + .md).
 * Uso: wp eval-file build/conteudo.php
 *
 * Idempotente: apaga e recria páginas, posts, cursos e navegações da Fireflies.
 */

require_once __DIR__ . '/posts.php';

$C    = dirname( __DIR__ ) . '/conteudo/';
$spec = json_decode( file_get_contents( $C . 'wxr-spec.json' ), true );

/** {{U}} → caminho relativo à raiz; {{A}} → assets do tema (raiz). */
function resolver( string $m ): string {
	$m = str_replace( '{{A}}', '/wp-content/themes/fireflies/assets/', $m );
	$m = preg_replace( '/\{\{U\}\}(?=["\'\s<])/', '/', $m );
	return str_replace( '{{U}}', '', $m );
}
function log_( string $s ): void {
	WP_CLI::log( $s );
}

// ---------------------------------------------------------------- limpeza
foreach ( get_posts( array( 'post_type' => 'attachment', 'post_status' => 'any', 'numberposts' => -1 ) ) as $a ) {
	wp_delete_attachment( $a->ID, true );
}
foreach ( get_posts( array( 'post_type' => array( 'post', 'page', 'curso', 'wp_navigation' ), 'post_status' => 'any', 'numberposts' => -1 ) ) as $p ) {
	wp_delete_post( $p->ID, true );
}

// ---------------------------------------------------------------- opções
$site = $spec['site'];
update_option( 'blogname', $site['blogname'] );
update_option( 'blogdescription', $site['blogdescription'] );
update_option( 'timezone_string', $site['timezone'] );
update_option( 'date_format', $site['date_format'] );
update_option( 'time_format', $site['time_format'] );
update_option( 'posts_per_page', $site['posts_per_page'] );
update_option( 'default_comment_status', 'closed' );
update_option( 'default_ping_status', 'closed' );
update_option( 'category_base', $site['category_base'] );
update_option( 'tag_base', $site['tag_base'] );

// ---------------------------------------------------------------- autor
$autor = $spec['autores'][0];
$uid   = username_exists( $autor['login'] );
if ( ! $uid ) {
	$uid = wp_insert_user(
		array(
			'user_login'   => $autor['login'],
			'user_pass'    => wp_generate_password( 24 ),
			'user_email'   => 'gabriel@fireflies.com.br',
			'display_name' => $autor['display_name'],
			'first_name'   => 'Gabriel',
			'last_name'    => 'Alvares',
			'user_nicename' => $autor['nicename'],
			'role'         => 'author',
		)
	);
}
update_user_meta( $uid, 'description', $autor['descricao'] );
wp_update_user( array( 'ID' => $uid, 'display_name' => $autor['display_name'] ) );

// ---------------------------------------------------------------- taxonomias
$termos = array();
foreach ( array( 'category', 'trilha' ) as $tax ) {
	foreach ( $spec['taxonomias'][ $tax ]['termos'] as $t ) {
		$ex = get_term_by( 'slug', $t['slug'], $tax );
		$id = $ex ? $ex->term_id : wp_insert_term( $t['nome'], $tax, array( 'slug' => $t['slug'] ) )['term_id'];
		wp_update_term( $id, $tax, array( 'name' => $t['nome'], 'description' => $t['descricao'] ) );
		$termos[ $tax ][ $t['slug'] ] = $id;
	}
}
update_option( 'default_category', $termos['category'][ $site['default_category'] ] );
$sem = get_term_by( 'slug', 'sem-categoria', 'category' ) ?: get_term_by( 'slug', 'uncategorized', 'category' );
if ( $sem && (int) $sem->term_id !== (int) get_option( 'default_category' ) ) {
	wp_delete_term( $sem->term_id, 'category' );
}

/** Metas de SEO para Rank Math e Yoast (importam junto no WXR). */
function seo_meta( int $id, array $seo ): void {
	$map = array(
		'title'         => array( 'rank_math_title', '_yoast_wpseo_title' ),
		'description'   => array( 'rank_math_description', '_yoast_wpseo_metadesc' ),
		'focus_keyword' => array( 'rank_math_focus_keyword', '_yoast_wpseo_focuskw' ),
	);
	foreach ( $map as $k => $metas ) {
		if ( ! empty( $seo[ $k ] ) ) {
			foreach ( $metas as $m ) {
				update_post_meta( $id, $m, $seo[ $k ] );
			}
		}
	}
	if ( isset( $seo['indexar'] ) && 'não' === $seo['indexar'] ) {
		update_post_meta( $id, 'rank_math_robots', array( 'noindex' ) );
	}
}

// ---------------------------------------------------------------- páginas
$ids = array();
foreach ( $spec['paginas'] as $pg ) {
	[ $markup, $fm ] = pagina_md( $C . $pg['fonte'] );
	$tpl             = $pg['template'];
	$primeiro        = preg_match( '/\[pattern: (hero-[a-z]+)\]/', file_get_contents( $C . $pg['fonte'] ), $m ) ? $m[1] : '';
	if ( 'page' === $tpl ) {
		$tpl = 'hero-anil' === $primeiro ? 'page-landing' : 'page-clara';
	}
	if ( in_array( $tpl, array( 'front-page', 'home' ), true ) ) {
		$tpl = '';
	}
	if ( 'blog' === $pg['slug'] ) {
		$markup = p( 'Esta é a página de posts. O conteúdo vem do modelo "Blog" (templates/home.html) no Editor do site.' );
	}
	$id = wp_insert_post(
		array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => $pg['titulo'],
			'post_name'    => $pg['slug'],
			'post_parent'  => $pg['parent'] ? $ids[ $pg['parent'] ] : 0,
			'menu_order'   => $pg['menu_order'],
			'post_excerpt' => $fm['_lead'] ?? '',
			'post_content' => wp_slash( resolver( $markup ) ),
			'post_author'  => 1,
			'comment_status' => 'closed',
			'page_template' => $tpl,
		),
		true
	);
	if ( is_wp_error( $id ) ) {
		WP_CLI::error( $pg['slug'] . ': ' . $id->get_error_message() );
	}
	$ids[ $pg['slug'] ] = $id;
	seo_meta( $id, $pg['seo'] ?? array() );
	log_( sprintf( 'página  %-32s %-14s %6d bytes', $pg['slug'], $tpl ?: '(padrão)', strlen( $markup ) ) );
}
update_option( 'show_on_front', 'page' );
update_option( 'page_on_front', $ids['inicio'] );
update_option( 'page_for_posts', $ids['blog'] );
update_option( 'wp_page_for_privacy_policy', $ids['politica-de-privacidade'] );

// ---------------------------------------------------------------- cursos
foreach ( $spec['cursos'] as $cs ) {
	[ $markup, $fm ] = curso_md( $C . $cs['fonte'] );
	$id              = wp_insert_post(
		array(
			'post_type'    => 'curso',
			'post_status'  => 'publish',
			'post_title'   => $cs['titulo'],
			'post_name'    => $cs['slug'],
			'menu_order'   => $cs['menu_order'],
			'post_excerpt' => $fm['_resumo'],
			'post_content' => wp_slash( resolver( $markup ) ),
			'post_author'  => $uid,
		),
		true
	);
	wp_set_object_terms( $id, array( $termos['trilha'][ $cs['trilha'] ] ), 'trilha' );
	foreach ( $cs['meta'] as $k => $v ) {
		if ( '_ff_formato' === $k ) {
			$v = ucfirst( implode( ' ou ', array_map( fn( $x ) => 'in-company' === $x ? 'in company' : $x, (array) $v ) ) );
		}
		if ( '_ff_certificado' === $k ) {
			$v = (bool) $v;
		}
		update_post_meta( $id, $k, $v );
	}
	seo_meta( $id, $cs['seo'] ?? array() );
	log_( "curso   {$cs['slug']}" );
}

// ---------------------------------------------------------------- posts
$sticky = array();
foreach ( $spec['posts'] as $ps ) {
	[ $markup, $fm ] = post_md( $C . $ps['fonte'] );
	$data            = $ps['data'] . ' 09:00:00';
	$id              = wp_insert_post(
		array(
			'post_type'     => 'post',
			'post_status'   => 'publish',
			'post_title'    => $ps['titulo'],
			'post_name'     => $ps['slug'],
			'post_excerpt'  => $ps['excerpt'],
			'post_content'  => wp_slash( resolver( $markup ) ),
			'post_author'   => $uid,
			'post_date'     => $data,
			'post_date_gmt' => get_gmt_from_date( $data ),
			'comment_status' => 'closed',
			'ping_status'   => 'closed',
			'post_category' => array_map( fn( $s ) => $termos['category'][ $s ], $ps['categorias'] ),
			'tags_input'    => $ps['tags'],
		),
		true
	);
	if ( is_wp_error( $id ) ) {
		WP_CLI::error( $id->get_error_message() );
	}
	foreach ( $ps['meta'] as $k => $v ) {
		update_post_meta( $id, $k, $v );
	}
	update_post_meta( $id, '_ff_tempo_leitura_auto', fireflies_core_calcular_leitura( $markup ) );
	if ( ! empty( $ps['sticky'] ) ) {
		$sticky[] = $id;
	}
	seo_meta( $id, $ps['seo'] ?? array() );
	log_( "post    {$ps['slug']} (" . strlen( $markup ) . ' bytes)' );
}
update_option( 'sticky_posts', $sticky );

foreach ( $spec['rascunhos_pauta'] as $r ) {
	$id = wp_insert_post(
		array(
			'post_type'     => 'post',
			'post_status'   => 'draft',
			'post_title'    => $r['titulo'],
			'post_name'     => $r['slug'],
			'post_excerpt'  => $r['excerpt'],
			'post_content'  => wp_slash(
				p( '<strong>Pauta para ' . date_i18n( 'd/m/Y', strtotime( $r['data_prevista'] ) ) . '.</strong> Palavra-chave: ' . esc_html( $r['palavra_chave'] ) . '.' )
				. p( esc_html( $r['excerpt'] ) )
				. p( 'Use os padrões em Inserir › Padrões › Fireflies: editoriais de post (Nossa leitura, Em aberto, Base legal, Passos com checklist…). Toda afirmação legal com artigo citado.', array( 'class' => 'is-style-aviso' ) )
			),
			'post_author'   => $uid,
			'post_category' => array( $termos['category'][ $r['categoria_principal'] ] ),
		)
	);
	update_post_meta( $id, 'rank_math_focus_keyword', $r['palavra_chave'] );
	update_post_meta( $id, '_ff_data_prevista', $r['data_prevista'] );
}
log_( count( $spec['rascunhos_pauta'] ) . ' rascunhos da pauta' );

// ---------------------------------------------------------------- navegações (wp_navigation, exportadas no WXR)
function nav_link( string $t, string $u ): string {
	return '<!-- wp:navigation-link ' . wp_json_encode( array( 'label' => $t, 'url' => $u, 'kind' => 'custom' ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) . ' /-->';
}
foreach ( $spec['menus'] as $chave => $menu ) {
	$html = '';
	foreach ( $menu['itens'] as $it ) {
		if ( ! empty( $it['filhos'] ) ) {
			$html .= '<!-- wp:navigation-submenu ' . wp_json_encode( array( 'label' => $it['titulo'], 'url' => $it['url'], 'kind' => 'custom' ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) . ' -->';
			foreach ( $it['filhos'] as $f ) {
				$html .= nav_link( $f['titulo'], $f['url'] );
			}
			$html .= '<!-- /wp:navigation-submenu -->';
		} else {
			$html .= nav_link( $it['titulo'], $it['url'] );
		}
	}
	wp_insert_post(
		array(
			'post_type'    => 'wp_navigation',
			'post_status'  => 'publish',
			'post_title'   => 'Menu ' . str_replace( '_', ' ', $chave ),
			'post_name'    => 'menu-' . str_replace( '_', '-', $chave ),
			'post_content' => $html,
		)
	);
}
log_( count( $spec['menus'] ) . ' navegações' );

// ---------------------------------------------------------------- mídia (imagem de OG padrão)
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
$og = WP_PLUGIN_DIR . '/fireflies-core/assets/og-base-1200x630.png';
if ( file_exists( $og ) ) {
	$tmp = wp_tempnam( 'og' );
	copy( $og, $tmp );
	$att = media_handle_sideload( array( 'name' => 'og-fireflies-consultoria.png', 'tmp_name' => $tmp ), 0, 'Fireflies Consultoria · Precisão que ilumina decisões.' );
	if ( ! is_wp_error( $att ) ) {
		update_post_meta( $att, '_wp_attachment_image_alt', 'Fireflies Consultoria: Precisão que ilumina decisões.' );
		foreach ( $sticky as $pid ) {
			set_post_thumbnail( $pid, $att );
		}
	}
}


// ---------------------------------------------------------------- formulário (Contact Form 7, se ativo)
if ( class_exists( 'WPCF7_ContactForm' ) ) {
	foreach ( get_posts( array( 'post_type' => 'wpcf7_contact_form', 'numberposts' => -1 ) ) as $f ) {
		wp_delete_post( $f->ID, true );
	}
	$form = <<<'CF7'
<label>Nome [text* nome autocomplete:name]</label>
<label>E-mail [email* email autocomplete:email]</label>
<label>WhatsApp <span class="ff-opcional">(opcional)</span> [tel whatsapp autocomplete:tel]</label>
<label>Você é [select* perfil include_blank "Síndico ou conselheiro" "Administradora" "Empresa" "Grande empresa ou grupo" "Interessado na Academy"]</label>
<label>Assunto [select* assunto default:get include_blank "Auditoria de condomínios|auditoria-de-condominios" "Consultoria contábil|consultoria-contabil" "Consultoria fiscal|consultoria-fiscal" "Consultoria financeira|consultoria-financeira" "Gestão de projetos e processos|gestao-de-projetos-e-processos" "Sindicância|sindicancia" "Fireflies Academy|academy" "Outro|outro"]</label>
<label>Como podemos ajudar? [textarea* mensagem x4 placeholder "Ex.: condomínio com 120 unidades, queremos conferir as contas de 2025 antes da assembleia."]</label>
[acceptance consentimento] Li a <a href="/politica-de-privacidade/">Política de Privacidade</a> e autorizo o uso destes dados para retornar o meu contato. [/acceptance]
[submit "Enviar e agendar diagnóstico"]
CF7;
	$cf = WPCF7_ContactForm::get_template( array( 'title' => 'Diagnóstico gratuito' ) );
	$cf->set_properties(
		array(
			'form'     => $form,
			'mail'     => array(
				'subject'            => '[Site] Diagnóstico: [assunto] · [nome]',
				'sender'             => 'Site Fireflies <wordpress@fireflies.com.br>',
				'recipient'          => 'contato@fireflies.com.br',
				'body'               => "Nome: [nome]\nE-mail: [email]\nWhatsApp: [whatsapp]\nPerfil: [perfil]\nAssunto: [assunto]\n\n[mensagem]",
				'additional_headers' => 'Reply-To: [email]',
				'attachments'        => '',
				'use_html'           => false,
				'exclude_blank'      => true,
				'active'             => true,
			),
			'messages' => array_merge(
				WPCF7_ContactForm::get_template()->prop( 'messages' ),
				array(
					'mail_sent_ok'     => 'Recebido. A gente responde no mesmo dia útil, de segunda a sexta, das 8h às 18h. Se for urgente, chame no WhatsApp.',
					'mail_sent_ng'     => 'Não conseguimos enviar agora. Tente de novo ou fale pelo WhatsApp: +55 11 98245-0527.',
					'validation_error' => 'Confira os campos marcados e tente de novo.',
				)
			),
		)
	);
	$cf->save();
	update_option( 'fireflies_form', '[contact-form-7 id="' . $cf->hash() . '" title="Diagnóstico gratuito"]' );
	log_( 'formulário CF7 criado' );
}

flush_rewrite_rules();
WP_CLI::success( 'Conteúdo montado.' );
