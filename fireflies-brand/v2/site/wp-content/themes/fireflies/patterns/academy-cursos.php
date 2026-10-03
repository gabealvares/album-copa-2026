<?php
/**
 * Title: Academy: cursos
 * Slug: fireflies/academy-cursos
 * Categories: fireflies
 * Description: Lista dos cursos (consulta do tipo curso) em linhas: trilha, nome, resumo e ficha compacta.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:group {"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}},"layout":{"type":"constrained","contentSize":"720px","justifyContent":"left"}} -->
<div class="wp-block-group" style="margin-bottom:var(--wp--preset--spacing--50)">
<!-- wp:heading -->
<h2 class="wp-block-heading">Capacitação para quem lida com o número todo dia.</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"fontSize":"lead"} -->
<p class="has-lead-font-size">Treinamentos em contabilidade, fiscal, finanças, auditoria e ERP, in company ou online.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
<!-- wp:query {"queryId":20,"query":{"perPage":6,"postType":"curso","order":"asc","orderBy":"menu_order","pages":0,"offset":0,"author":"","search":"","exclude":[],"sticky":"","inherit":false},"className":"ff-indice ff-cursos"} -->
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
<!-- wp:post-title {"level":3,"isLink":true} /-->
<!-- wp:post-excerpt {"excerptLength":24} /-->
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
<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"var:preset|spacing|50"}}}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--50)">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo fireflies_url( '/contato/?assunto=academy' ); ?>">Montar um treinamento</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</section>
<!-- /wp:group -->
