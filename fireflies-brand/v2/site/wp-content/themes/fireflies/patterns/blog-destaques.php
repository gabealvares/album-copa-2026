<?php
/**
 * Title: Blog: destaques
 * Slug: fireflies/blog-destaques
 * Categories: fireflies
 * Description: Três posts recentes em grade assimétrica (um maior), com categoria, data e tempo de leitura.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:group {"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}},"layout":{"type":"constrained","contentSize":"720px","justifyContent":"left"}} -->
<div class="wp-block-group" style="margin-bottom:var(--wp--preset--spacing--50)">
<!-- wp:heading -->
<h2 class="wp-block-heading">O que mudou e o que fazer.</h2>
<!-- /wp:heading -->
</div>
<!-- /wp:group -->
<!-- wp:query {"queryId":30,"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"className":"ff-destaques"} -->
<div class="wp-block-query ff-destaques">
<!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
<!-- wp:post-terms {"term":"category"} /-->
<!-- wp:post-title {"level":3,"isLink":true} /-->
<!-- wp:post-excerpt {"excerptLength":26} /-->
<!-- wp:group {"className":"ff-meta","layout":{"type":"flex","flexWrap":"wrap"},"style":{"spacing":{"blockGap":"0.4rem 1.25rem"}}} -->
<div class="wp-block-group ff-meta">
<!-- wp:post-date {"format":"d/m/Y"} /-->
<!-- wp:fireflies/tempo-leitura /-->
</div>
<!-- /wp:group -->

<!-- /wp:post-template -->
</div>
<!-- /wp:query -->
<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}}} -->
<p style="margin-top:var(--wp--preset--spacing--40)"><a href="<?php echo fireflies_url( '/blog/' ); ?>">Ir para o blog</a></p>
<!-- /wp:paragraph -->
</section>
<!-- /wp:group -->
