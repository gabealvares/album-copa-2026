<?php
/**
 * Title: Abertura clara (Cal)
 * Slug: fireflies/hero-cal
 * Categories: fireflies
 * Description: Abertura de página em Cal Virgem com trilha de navegação, título, fio de rubrica e emblema do serviço.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","className":"is-style-cal ff-hero ff-hero\u002d\u002dcal","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group is-style-cal ff-hero ff-hero--cal alignfull" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">
<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60","top":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"width":"62%"} -->
<div class="wp-block-column" style="flex-basis:62%">
<!-- wp:paragraph {"className":"ff-trilha","textColor":"pedra","fontSize":"nota","fontFamily":"plex-mono"} -->
<p class="ff-trilha has-pedra-color has-text-color has-nota-font-size has-plex-mono-font-family"><a href="<?php echo fireflies_url( '/' ); ?>">Início</a> / <a href="<?php echo fireflies_url( '/servicos/' ); ?>">Serviços</a> / Auditoria de condomínios</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":1,"className":"is-style-versal"} -->
<h1 class="wp-block-heading is-style-versal">Auditoria de condomínios</h1>
<!-- /wp:heading -->
<!-- wp:separator {"className":"is-style-fio-rubrica"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-fio-rubrica"/>
<!-- /wp:separator -->
<!-- wp:paragraph {"className":"is-style-abertura"} -->
<p class="is-style-abertura">A gente confere a prestação de contas do seu condomínio, linha por linha, e entrega um relatório que o conselho lê em uma reunião.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--40)">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo fireflies_url( '/contato/?assunto=auditoria-de-condominios' ); ?>">Pedir uma proposta</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:column -->
<!-- wp:column {"verticalAlignment":"center","className":"ff-hero__lado"} -->
<div class="wp-block-column is-vertically-aligned-center ff-hero__lado">
<!-- wp:image {"sizeSlug":"full","linkDestination":"none","width":"240px","className":"is-style-emblema aligncenter"} -->
<figure class="wp-block-image size-full is-resized is-style-emblema aligncenter"><img src="<?php echo fireflies_asset( 'img/constelacoes/claro/auditoria-sem-letras.svg' ); ?>" alt="Constelação Auditoria, emblema do serviço" style="width:240px"/></figure>
<!-- /wp:image -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</section>
<!-- /wp:group -->
