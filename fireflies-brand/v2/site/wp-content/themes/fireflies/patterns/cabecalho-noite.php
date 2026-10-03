<?php
/**
 * Title: Cabeçalho noite
 * Slug: fireflies/cabecalho-noite
 * Categories: fireflies
 * Inserter: no
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"header","className":"ff-header ff-header--noite is-style-noite","align":"full","style":{"spacing":{"padding":{"top":"0.9rem","bottom":"0.9rem"}}},"backgroundColor":"anil","textColor":"cal","layout":{"type":"constrained","contentSize":"1240px"}} -->
<header class="wp-block-group alignfull ff-header ff-header--noite is-style-noite has-cal-color has-anil-background-color has-text-color has-background" style="padding-top:0.9rem;padding-bottom:0.9rem">
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"},"style":{"spacing":{"blockGap":"1.25rem"}}} -->
<div class="wp-block-group">
<!-- wp:image {"sizeSlug":"full","linkDestination":"custom","className":"ff-logo"} -->
<figure class="wp-block-image size-full ff-logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo fireflies_asset( 'img/logo/fireflies_horizontal_digital-negativo.svg' ); ?>" alt="Fireflies Consultoria, página inicial"/></a></figure>
<!-- /wp:image -->
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"},"style":{"spacing":{"blockGap":"0.75rem"}}} -->
<div class="wp-block-group">
<!-- wp:navigation {"overlayMenu":"mobile","layout":{"type":"flex","justifyContent":"right","flexWrap":"nowrap"},"style":{"spacing":{"blockGap":"0"}},"ariaLabel":"Principal"} -->
<!-- wp:navigation-submenu {"label":"Serviços","url":"<?php echo fireflies_url( '/servicos/' ); ?>","kind":"custom"} -->
<!-- wp:navigation-link {"label":"Auditoria de condomínios","url":"<?php echo fireflies_url( '/servicos/auditoria-de-condominios/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Consultoria contábil","url":"<?php echo fireflies_url( '/servicos/consultoria-contabil/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Consultoria fiscal","url":"<?php echo fireflies_url( '/servicos/consultoria-fiscal/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Consultoria financeira","url":"<?php echo fireflies_url( '/servicos/consultoria-financeira/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Gestão de projetos e processos","url":"<?php echo fireflies_url( '/servicos/gestao-de-projetos-e-processos/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Sindicância","url":"<?php echo fireflies_url( '/servicos/sindicancia/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Todos os serviços","url":"<?php echo fireflies_url( '/servicos/' ); ?>","kind":"custom"} /-->
<!-- /wp:navigation-submenu -->
<!-- wp:navigation-link {"label":"Condomínios","url":"<?php echo fireflies_url( '/condominios/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Como trabalhamos","url":"<?php echo fireflies_url( '/como-trabalhamos/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Academy","url":"<?php echo fireflies_url( '/academy/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Blog","url":"<?php echo fireflies_url( '/blog/' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Sobre","url":"<?php echo fireflies_url( '/sobre/' ); ?>","kind":"custom"} /-->
<!-- /wp:navigation -->
<!-- wp:buttons {"className":"ff-header__cta"} -->
<div class="wp-block-buttons ff-header__cta"><!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="<?php echo fireflies_url( '/contato/' ); ?>">Agendar diagnóstico</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
</header>
<!-- /wp:group -->
