<?php
/**
 * Title: Cabeçalho claro
 * Slug: fireflies/cabecalho-claro
 * Categories: fireflies
 * Inserter: no
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"header","className":"ff-header ff-header--claro","align":"full","style":{"spacing":{"padding":{"top":"0.9rem","bottom":"0.9rem"}}},"backgroundColor":"branco","layout":{"type":"constrained","contentSize":"1240px"}} -->
<header class="wp-block-group alignfull ff-header ff-header--claro has-branco-background-color has-background" style="padding-top:0.9rem;padding-bottom:0.9rem">
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"},"style":{"spacing":{"blockGap":"1.25rem"}}} -->
<div class="wp-block-group">
<!-- wp:image {"width":"232px","sizeSlug":"full","linkDestination":"custom","className":"ff-logo"} -->
<figure class="wp-block-image size-full is-resized ff-logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo fireflies_asset( 'img/logo/fireflies_horizontal_digital.svg' ); ?>" alt="Fireflies Consultoria, página inicial" style="width:232px"/></a></figure>
<!-- /wp:image -->
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"},"style":{"spacing":{"blockGap":"0.75rem"}}} -->
<div class="wp-block-group">
<!-- wp:navigation {"overlayMenu":"mobile","layout":{"type":"flex","justifyContent":"right","flexWrap":"nowrap"},"style":{"spacing":{"blockGap":"0"}},"ariaLabel":"Principal"} -->
<!-- wp:navigation-link {"label":"Serviços","url":"<?php echo fireflies_url( '/servicos/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Condomínios","url":"<?php echo fireflies_url( '/condominios/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Como trabalhamos","url":"<?php echo fireflies_url( '/como-trabalhamos/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Academy","url":"<?php echo fireflies_url( '/academy/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Sobre","url":"<?php echo fireflies_url( '/sobre/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Blog","url":"<?php echo fireflies_url( '/blog/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Contato","url":"<?php echo fireflies_url( '/contato/' ); ?>","kind":"custom"} /-->
<!-- /wp:navigation -->
<!-- wp:buttons {"className":"ff-header__cta"} -->
<div class="wp-block-buttons ff-header__cta"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo fireflies_url( '/contato/' ); ?>">Agendar diagnóstico</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
</header>
<!-- /wp:group -->
