<?php
/**
 * Title: Raio-X do condomínio (chamada)
 * Slug: fireflies/condominios-raio-x
 * Categories: fireflies
 * Description: Chamada em Anil para a linha Fireflies Condomínios, com o emblema Domus.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","className":"is-style-noite ff-raio-x","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group is-style-noite ff-raio-x alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60","top":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"width":"66%"} -->
<div class="wp-block-column" style="flex-basis:66%">
<!-- wp:heading {"className":"is-style-versal","fontSize":"titulo-1"} -->
<h2 class="wp-block-heading is-style-versal has-titulo-1-font-size">Raio-X do seu condomínio.</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"fontSize":"lead"} -->
<p class="has-lead-font-size">Sua taxa paga o que deveria? A gente mostra para onde vai cada real, confere a prestação de contas e leva o relatório pronto para o conselho.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"verticalAlignment":"center","className":"ff-hero__lado"} -->
<div class="wp-block-column is-vertically-aligned-center ff-hero__lado">
<!-- wp:image {"sizeSlug":"full","linkDestination":"none","width":"170px","className":"is-style-emblema aligncenter"} -->
<figure class="wp-block-image size-full is-resized is-style-emblema aligncenter"><img src="<?php echo fireflies_asset( 'img/constelacoes/escuro/condominios-sem-letras.svg' ); ?>" alt="Constelação Condomínios, emblema do serviço" style="width:170px"/></figure>
<!-- /wp:image -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:group {"className":"ff-raio-x__sim","style":{"spacing":{"margin":{"top":"var:preset|spacing|50"}}}} -->
<div class="wp-block-group ff-raio-x__sim" style="margin-top:var(--wp--preset--spacing--50)">
<!-- wp:shortcode -->
[fireflies_raio_x]
<!-- /wp:shortcode -->
</div>
<!-- /wp:group -->
<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--40)">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo fireflies_url( '/contato/?assunto=auditoria-de-condominios' ); ?>">Fazer o raio-X com os números reais</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="<?php echo fireflies_url( '/condominios/' ); ?>">Conhecer a linha Condomínios</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</section>
<!-- /wp:group -->
