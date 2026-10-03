<?php
/**
 * Title: Newsletter (slot)
 * Slug: fireflies/newsletter
 * Categories: fireflies
 * Description: Slot para o shortcode da newsletter (Configurações › Geral); sem ele, oferece a lista do WhatsApp.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","className":"is-style-cal","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group is-style-cal alignfull" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">
<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|50","top":"var:preset|spacing|50"}}}} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"width":"55%"} -->
<div class="wp-block-column" style="flex-basis:55%">
<!-- wp:heading {"fontSize":"titulo-3"} -->
<h2 class="wp-block-heading has-titulo-3-font-size">Uma leitura por mês, sem ruído.</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>O resumo do que mudou na lei e o que fazer, com a norma citada.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center">
<!-- wp:shortcode -->
[fireflies_newsletter]
<!-- /wp:shortcode -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</section>
<!-- /wp:group -->
