<?php
/**
 * Title: Página 404
 * Slug: fireflies/pagina-404
 * Categories: fireflies
 * Description: Página não encontrada, com busca e atalhos.
 * Inserter: no
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","className":"is-style-noite ff-404 ff-padrao ff-padrao\u002d\u002dconstelacao","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group is-style-noite ff-404 ff-padrao ff-padrao--constelacao alignfull" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
<!-- wp:group {"layout":{"type":"constrained","contentSize":"760px","justifyContent":"left"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"ff-404-num"} -->
<p class="ff-404-num">404</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":1,"fontSize":"titulo-1"} -->
<h1 class="wp-block-heading has-titulo-1-font-size">Esta página saiu de órbita.</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"fontSize":"lead"} -->
<p class="has-lead-font-size">O endereço pode ter mudado. Tente a busca ou volte para o início.</p>
<!-- /wp:paragraph -->
<!-- wp:search {"label":"Buscar no site","showLabel":false,"placeholder":"Buscar artigos, serviços e cursos","buttonText":"Buscar","className":"ff-busca-404"} /-->
<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"var:preset|spacing|50"}}}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--50)">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo fireflies_url( '/' ); ?>">Ir para o início</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="<?php echo fireflies_url( '/servicos/' ); ?>">Ver serviços</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</section>
<!-- /wp:group -->
