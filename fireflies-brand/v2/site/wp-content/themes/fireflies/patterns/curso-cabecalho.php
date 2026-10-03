<?php
/**
 * Title: Cabeçalho do curso
 * Slug: fireflies/curso-cabecalho
 * Categories: fireflies
 * Description: Trilha, título, resumo e ficha do curso sobre Anil, com o emblema Liber.
 * Inserter: no
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"header","className":"is-style-noite ff-hero ff-cabecalho-curso","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<header class="wp-block-group is-style-noite ff-hero ff-cabecalho-curso alignfull" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">
<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60","top":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns are-vertically-aligned-center">
<!-- wp:column {"width":"66%"} -->
<div class="wp-block-column" style="flex-basis:66%">
<!-- wp:paragraph {"className":"ff-trilha","textColor":"fumaca","fontSize":"nota","fontFamily":"plex-mono"} -->
<p class="ff-trilha has-fumaca-color has-text-color has-nota-font-size has-plex-mono-font-family"><a href="<?php echo fireflies_url( '/academy/' ); ?>">Fireflies Academy</a> / <a href="<?php echo fireflies_url( '/academy/cursos/' ); ?>">Cursos</a></p>
<!-- /wp:paragraph -->
<!-- wp:fireflies/eyebrow /-->
<!-- wp:post-title {"level":1,"fontSize":"titulo-1"} /-->
<!-- wp:post-excerpt {"className":"is-style-abertura"} /-->
<!-- wp:fireflies/curso-ficha /-->
</div>
<!-- /wp:column -->
<!-- wp:column {"verticalAlignment":"center","className":"ff-hero__lado"} -->
<div class="wp-block-column is-vertically-aligned-center ff-hero__lado">
<!-- wp:image {"sizeSlug":"full","linkDestination":"none","width":"240px","className":"is-style-emblema aligncenter"} -->
<figure class="wp-block-image size-full is-resized is-style-emblema aligncenter"><img src="<?php echo fireflies_asset( 'img/constelacoes/escuro/academy-sem-letras.svg' ); ?>" alt="Constelação Academy, emblema do serviço" style="width:240px"/></figure>
<!-- /wp:image -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</header>
<!-- /wp:group -->
