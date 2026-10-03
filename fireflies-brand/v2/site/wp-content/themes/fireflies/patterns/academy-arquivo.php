<?php
/**
 * Title: Arquivo de cursos
 * Slug: fireflies/academy-arquivo
 * Categories: fireflies
 * Description: Cabeçalho Anil com as trilhas e a lista dos cursos (arquivo e trilha).
 * Inserter: no
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"header","className":"is-style-noite ff-hero ff-padrao","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<header class="wp-block-group is-style-noite ff-hero ff-padrao alignfull" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">
<!-- wp:group {"layout":{"type":"constrained","contentSize":"860px","justifyContent":"left"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"ff-trilha","textColor":"fumaca","fontSize":"nota","fontFamily":"plex-mono"} -->
<p class="ff-trilha has-fumaca-color has-text-color has-nota-font-size has-plex-mono-font-family"><a href="<?php echo fireflies_url( '/academy/' ); ?>">Fireflies Academy</a></p>
<!-- /wp:paragraph -->
<!-- wp:query-title {"type":"archive","showPrefix":false,"level":1,"className":"is-style-versal"} /-->
<!-- wp:term-description {"className":"is-style-abertura"} /-->
<!-- wp:shortcode -->
[fireflies_trilhas]
<!-- /wp:shortcode -->
</div>
<!-- /wp:group -->
</header>
<!-- /wp:group -->
<!-- wp:group {"tagName":"section","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:query {"queryId":2,"query":{"inherit":true},"className":"ff-indice ff-cursos"} -->
<div class="wp-block-query ff-indice ff-cursos">
<!-- wp:post-template -->
<!-- wp:columns {"className":"is-style-linha-indice ff-linha-curso"} -->
<div class="wp-block-columns is-style-linha-indice ff-linha-curso">
<!-- wp:column {"width":"20%"} -->
<div class="wp-block-column" style="flex-basis:20%">
<!-- wp:post-terms {"term":"trilha","className":"is-style-rotulo"} /-->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"52%"} -->
<div class="wp-block-column" style="flex-basis:52%">
<!-- wp:post-title {"level":2,"isLink":true,"fontSize":"titulo-3"} /-->
<!-- wp:post-excerpt {"excerptLength":30} /-->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"28%"} -->
<div class="wp-block-column" style="flex-basis:28%">
<!-- wp:fireflies/curso-ficha {"compacta":true} /-->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- /wp:post-template -->
</div>
<!-- /wp:query -->
</section>
<!-- /wp:group -->
