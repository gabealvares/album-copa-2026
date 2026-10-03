<?php
/**
 * Schema.org básico, só quando Rank Math e Yoast estão inativos.
 *
 * @package fireflies-core
 */

defined( 'ABSPATH' ) || exit;

function fireflies_core_tem_plugin_seo(): bool {
	return defined( 'RANK_MATH_VERSION' ) || class_exists( 'RankMath' ) || defined( 'WPSEO_VERSION' ) || defined( 'AIOSEO_VERSION' ) || defined( 'SEOPRESS_VERSION' );
}

function fireflies_core_organizacao(): array {
	$home = home_url( '/' );
	return array(
		'@type'        => array( 'Organization', 'AccountingService' ),
		'@id'          => $home . '#organizacao',
		'name'         => 'Fireflies Consultoria',
		'legalName'    => 'Fireflies Consultoria LTDA',
		'taxID'        => '66.630.305/0001-95',
		'identifier'   => array(
			'@type'      => 'PropertyValue',
			'propertyID' => 'CRC-SP',
			'value'      => '2SP053069',
		),
		'slogan'       => 'Precisão que ilumina decisões.',
		'description'  => 'Consultoria financeira, contábil e fiscal em São Paulo, especialista em auditoria de condomínios.',
		'url'          => $home,
		'logo'         => array(
			'@type' => 'ImageObject',
			'url'   => FIREFLIES_CORE_URL . 'assets/android-512.png',
			'width' => 512,
			'height' => 512,
		),
		'image'        => FIREFLIES_CORE_URL . 'assets/og-base-1200x630.png',
		'email'        => fireflies_core_opcao( 'email' ),
		'telephone'    => '+' . fireflies_core_opcao( 'whatsapp' ),
		'address'      => array(
			'@type'           => 'PostalAddress',
			'addressLocality' => 'São Paulo',
			'addressRegion'   => 'SP',
			'addressCountry'  => 'BR',
		),
		'areaServed'   => 'BR',
		'openingHoursSpecification' => array(
			'@type'     => 'OpeningHoursSpecification',
			'dayOfWeek' => array( 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ),
			'opens'     => '08:00',
			'closes'    => '18:00',
		),
		'founder'      => array(
			'@type'    => 'Person',
			'name'     => 'Gabriel Alvares',
			'jobTitle' => 'Contador responsável',
			'image'    => get_theme_file_uri( 'assets/img/gabriel-alvares.jpg' ),
		),
		'knowsAbout'   => array( 'Auditoria de condomínios', 'Contabilidade', 'Planejamento tributário', 'Consultoria financeira', 'Reforma tributária' ),
	);
}

add_action(
	'wp_head',
	static function (): void {
		if ( fireflies_core_tem_plugin_seo() || ! apply_filters( 'fireflies_core_schema', true ) ) {
			return;
		}
		$grafo = array( fireflies_core_organizacao() );

		if ( is_singular( 'post' ) ) {
			$post   = get_queried_object();
			$imagem = get_the_post_thumbnail_url( $post, 'full' ) ?: FIREFLIES_CORE_URL . 'assets/og-base-1200x630.png';
			$grafo[] = array(
				'@type'            => 'Article',
				'headline'         => wp_strip_all_tags( get_the_title( $post ) ),
				'description'      => wp_strip_all_tags( get_the_excerpt( $post ) ),
				'datePublished'    => get_post_time( 'c', true, $post ),
				'dateModified'     => get_post_modified_time( 'c', true, $post ),
				'author'           => array(
					'@type' => 'Person',
					'name'  => get_the_author_meta( 'display_name', (int) $post->post_author ),
					'url'   => get_author_posts_url( (int) $post->post_author ),
				),
				'publisher'        => array( '@id' => home_url( '/' ) . '#organizacao' ),
				'image'            => $imagem,
				'mainEntityOfPage' => get_permalink( $post ),
				'inLanguage'       => 'pt-BR',
				'timeRequired'     => 'PT' . fireflies_core_tempo_leitura( $post->ID ) . 'M',
			);
		} elseif ( is_singular( 'curso' ) ) {
			$post    = get_queried_object();
			$grafo[] = array(
				'@type'       => 'Course',
				'name'        => wp_strip_all_tags( get_the_title( $post ) ),
				'description' => wp_strip_all_tags( get_the_excerpt( $post ) ),
				'url'         => get_permalink( $post ),
				'provider'    => array( '@id' => home_url( '/' ) . '#organizacao' ),
				'inLanguage'  => 'pt-BR',
			);
		}

		echo '<script type="application/ld+json">' . wp_json_encode( array( '@context' => 'https://schema.org', '@graph' => $grafo ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "</script>\n";

		// Open Graph mínimo para quem ainda não instalou um plugin de SEO.
		$titulo = wp_get_document_title();
		$desc   = is_singular() ? wp_strip_all_tags( get_the_excerpt() ) : get_bloginfo( 'description' );
		$img    = ( is_singular() && has_post_thumbnail() ) ? get_the_post_thumbnail_url( null, 'full' ) : FIREFLIES_CORE_URL . 'assets/og-base-1200x630.png';
		printf( '<meta property="og:type" content="%s">' . "\n", is_singular( 'post' ) ? 'article' : 'website' );
		printf( '<meta property="og:title" content="%s">' . "\n", esc_attr( $titulo ) );
		if ( $desc ) {
			printf( '<meta name="description" content="%1$s">' . "\n" . '<meta property="og:description" content="%1$s">' . "\n", esc_attr( $desc ) );
		}
		printf( '<meta property="og:image" content="%s">' . "\n", esc_url( $img ) );
		printf( '<meta property="og:locale" content="pt_BR">' . "\n" . '<meta property="og:site_name" content="Fireflies Consultoria">' . "\n" . '<meta name="twitter:card" content="summary_large_image">' . "\n" );
	},
	5
);
