<?php
/**
 * Title: Rodapé
 * Slug: fireflies/rodape
 * Categories: fireflies
 * Inserter: no
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"footer","className":"ff-footer is-style-noite","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|50"}}},"backgroundColor":"anil-profundo","textColor":"cal","layout":{"type":"constrained","contentSize":"1240px"}} -->
<footer class="wp-block-group alignfull ff-footer is-style-noite has-cal-color has-anil-profundo-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--50)">

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns">
<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%">
<!-- wp:image {"width":"240px","sizeSlug":"full","linkDestination":"custom","className":"ff-logo"} -->
<figure class="wp-block-image size-full is-resized ff-logo"><a href="<?php echo fireflies_url( '/' ); ?>"><img src="<?php echo fireflies_asset( 'img/logo/fireflies_horizontal_digital-negativo.svg' ); ?>" alt="Fireflies Consultoria, página inicial" style="width:240px"/></a></figure>
<!-- /wp:image -->
<!-- wp:paragraph {"className":"ff-assinatura","style":{"spacing":{"margin":{"top":"var:preset|spacing|50"}}}} -->
<p class="ff-assinatura" style="margin-top:var(--wp--preset--spacing--50)">Luz medida.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"textColor":"fumaca","fontSize":"pequeno","style":{"layout":{"selfStretch":"fit"}}} -->
<p class="has-fumaca-color has-text-color has-pequeno-font-size">Consultoria financeira, contábil e fiscal em São Paulo. Especialista em auditoria de condomínios.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":2,"className":"is-style-rotulo","fontSize":"nota"} -->
<h2 class="wp-block-heading is-style-rotulo has-nota-font-size">Serviços</h2>
<!-- /wp:heading -->
<!-- wp:list {"fontSize":"pequeno"} -->
<ul class="wp-block-list has-pequeno-font-size">
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/servicos/auditoria-de-condominios/' ); ?>">Auditoria de condomínios</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/servicos/consultoria-contabil/' ); ?>">Consultoria contábil</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/servicos/consultoria-fiscal/' ); ?>">Consultoria fiscal</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/servicos/consultoria-financeira/' ); ?>">Consultoria financeira</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/servicos/gestao-de-projetos-e-processos/' ); ?>">Gestão de projetos e processos</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/servicos/sindicancia/' ); ?>">Sindicância</a></li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":2,"className":"is-style-rotulo","fontSize":"nota"} -->
<h2 class="wp-block-heading is-style-rotulo has-nota-font-size">Fireflies</h2>
<!-- /wp:heading -->
<!-- wp:list {"fontSize":"pequeno"} -->
<ul class="wp-block-list has-pequeno-font-size">
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/condominios/' ); ?>">Condomínios</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/como-trabalhamos/' ); ?>">Como trabalhamos</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/academy/' ); ?>">Academy</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/sobre/' ); ?>">Sobre</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/blog/' ); ?>">Blog</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="<?php echo fireflies_url( '/contato/' ); ?>">Contato</a></li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->

<!-- wp:column {"width":"24%"} -->
<div class="wp-block-column" style="flex-basis:24%">
<!-- wp:heading {"level":2,"className":"is-style-rotulo","fontSize":"nota"} -->
<h2 class="wp-block-heading is-style-rotulo has-nota-font-size">Contato</h2>
<!-- /wp:heading -->
<!-- wp:list {"fontSize":"pequeno"} -->
<ul class="wp-block-list has-pequeno-font-size">
<!-- wp:list-item --><li><a href="https://wa.me/5511982450527">WhatsApp +55 11 98245-0527</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="mailto:contato@fireflies.com.br">contato@fireflies.com.br</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Segunda a sexta, 8h às 18h</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>São Paulo/SP</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:separator {"style":{"spacing":{"margin":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|40"}}}} -->
<hr class="wp-block-separator has-alpha-channel-opacity" style="margin-top:var(--wp--preset--spacing--60);margin-bottom:var(--wp--preset--spacing--40)"/>
<!-- /wp:separator -->

<!-- wp:group {"className":"ff-legal","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between","verticalAlignment":"top"},"style":{"spacing":{"blockGap":"1rem 2rem"}}} -->
<div class="wp-block-group ff-legal">
<!-- wp:paragraph -->
<p>© 2026 Fireflies Consultoria. CNPJ [a confirmar]<br>Responsável técnico: Gabriel Alvares, CRC-SP [a confirmar]</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Tratamos dados pessoais conforme a LGPD (Lei 13.709/2018).<br><a href="<?php echo fireflies_url( '/politica-de-privacidade/' ); ?>">Política de privacidade</a>   <a href="<?php echo fireflies_url( '/termos-de-uso/' ); ?>">Termos de uso</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</footer>
<!-- /wp:group -->
