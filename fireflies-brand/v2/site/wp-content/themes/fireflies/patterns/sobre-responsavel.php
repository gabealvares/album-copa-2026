<?php
/**
 * Title: Responsável técnico
 * Slug: fireflies/sobre-responsavel
 * Categories: fireflies
 * Description: Quem conduz: retrato, nome, cargo em mono, fio de rubrica e áreas.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","className":"is-style-cal ff-responsavel","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group is-style-cal ff-responsavel alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60","top":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns">
<!-- wp:column {"width":"34%"} -->
<div class="wp-block-column" style="flex-basis:34%">
<!-- wp:image {"sizeSlug":"full","linkDestination":"none","className":"ff-retrato"} -->
<figure class="wp-block-image size-full ff-retrato"><img src="<?php echo fireflies_asset( 'img/retrato-placeholder.svg' ); ?>" alt="Espaço para o retrato de Gabriel Alvares (foto real a inserir)"/></figure>
<!-- /wp:image -->
<!-- wp:group {"className":"ff-ficha","style":{"spacing":{"blockGap":"0"}}} -->
<div class="wp-block-group ff-ficha">
<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"0.25rem"}}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"is-style-rotulo"} -->
<p class="is-style-rotulo">Áreas</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Contabilidade gerencial<br>Auditoria<br>Planejamento tributário<br>Gestão de projetos e processos<br>ERP e tecnologia<br>Treinamento empresarial</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"66%"} -->
<div class="wp-block-column" style="flex-basis:66%">
<!-- wp:heading {"fontSize":"titulo-1"} -->
<h2 class="wp-block-heading has-titulo-1-font-size">Gabriel Alvares</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"textColor":"pedra","fontSize":"nota","fontFamily":"plex-mono"} -->
<p class="has-pedra-color has-text-color has-nota-font-size has-plex-mono-font-family">Fundador e contador responsável. CRC-SP [a confirmar]</p>
<!-- /wp:paragraph -->
<!-- wp:separator {"className":"is-style-fio-rubrica"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-fio-rubrica"/>
<!-- /wp:separator -->
<!-- wp:paragraph {"fontSize":"lead"} -->
<p class="has-lead-font-size">São mais de 8 anos em contabilidade, auditoria e gestão financeira. Gabriel fundou a Fireflies para que todo cliente tivesse o que costuma faltar: alguém que assina o número e explica o que ele quer dizer.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p><a href="<?php echo fireflies_url( '/sobre/' ); ?>">Conhecer a Fireflies</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</section>
<!-- /wp:group -->
