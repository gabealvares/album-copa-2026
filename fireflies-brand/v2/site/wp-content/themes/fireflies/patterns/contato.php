<?php
/**
 * Title: Contato: canais e formulário
 * Slug: fireflies/contato
 * Categories: fireflies
 * Description: Canais em ficha (WhatsApp, e-mail, horário, local, responsável) e o slot do formulário [fireflies_formulario].
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60","top":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns">
<!-- wp:column {"width":"38%"} -->
<div class="wp-block-column" style="flex-basis:38%">
<!-- wp:group {"className":"ff-ficha","style":{"spacing":{"blockGap":"0"}}} -->
<div class="wp-block-group ff-ficha">
<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"0.25rem"}}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"is-style-rotulo"} -->
<p class="is-style-rotulo">WhatsApp</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p><a href="https://wa.me/5511982450527">+55 11 98245-0527</a> (o canal mais rápido)</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"0.25rem"}}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"is-style-rotulo"} -->
<p class="is-style-rotulo">E-mail</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p><a href="mailto:contato@fireflies.com.br">contato@fireflies.com.br</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"0.25rem"}}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"is-style-rotulo"} -->
<p class="is-style-rotulo">Atendimento</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Segunda a sexta, das 8h às 18h</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"0.25rem"}}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"is-style-rotulo"} -->
<p class="is-style-rotulo">Localização</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>São Paulo/SP</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"0.25rem"}}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"is-style-rotulo"} -->
<p class="is-style-rotulo">Responsável</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Gabriel Alvares, CRC-SP [a confirmar]</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
<!-- wp:shortcode -->
[fireflies_whatsapp texto="Conversar no WhatsApp"]
<!-- /wp:shortcode -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"62%"} -->
<div class="wp-block-column" style="flex-basis:62%">
<!-- wp:heading {"fontSize":"titulo-3"} -->
<h2 class="wp-block-heading has-titulo-3-font-size">Conte o que você precisa</h2>
<!-- /wp:heading -->
<!-- wp:shortcode -->
[fireflies_formulario]
<!-- /wp:shortcode -->
<!-- wp:paragraph {"textColor":"pedra","fontSize":"nota","fontFamily":"plex-mono"} -->
<p class="has-pedra-color has-text-color has-nota-font-size has-plex-mono-font-family">Seus dados são usados apenas para retornar o contato. Detalhes na <a href="<?php echo fireflies_url( '/politica-de-privacidade/' ); ?>">Política de privacidade</a>.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</section>
<!-- /wp:group -->
