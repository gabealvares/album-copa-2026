<?php
/**
 * Title: Blog: lista
 * Slug: fireflies/blog-lista
 * Categories: fireflies
 * Description: Lista de posts em linhas com fio: data e categoria à esquerda, título, resumo e tempo de leitura.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:query {"queryId":40,"query":{"perPage":9,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"className":"ff-lista-posts"} -->
<div class="wp-block-query ff-lista-posts">
<!-- wp:post-template -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|40","top":"var:preset|spacing|40"}}}} -->
<div class="wp-block-columns">
<!-- wp:column {"width":"22%"} -->
<div class="wp-block-column" style="flex-basis:22%">
<!-- wp:post-date {"format":"d/m/Y"} /-->
<!-- wp:post-terms {"term":"category"} /-->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"78%"} -->
<div class="wp-block-column" style="flex-basis:78%">
<!-- wp:post-title {"level":2,"isLink":true} /-->
<!-- wp:post-excerpt {"excerptLength":30} /-->
<!-- wp:fireflies/tempo-leitura {"className":"ff-meta"} /-->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- /wp:post-template -->
<!-- wp:query-pagination {"paginationArrow":"none","layout":{"type":"flex","justifyContent":"space-between"}} -->
<!-- wp:query-pagination-previous {"label":"Anteriores"} /-->
<!-- wp:query-pagination-numbers /-->
<!-- wp:query-pagination-next {"label":"Próximos"} /-->

<!-- /wp:query-pagination -->
</div>
<!-- /wp:query -->
</section>
<!-- /wp:group -->
