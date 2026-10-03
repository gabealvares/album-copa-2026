<?php
/**
 * Title: Serviços em índice editorial
 * Slug: fireflies/servicos-lista
 * Categories: fireflies
 * Description: A especialidade em destaque com emblema e os demais serviços em linhas de índice com fios. Nada de cards iguais.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:group {"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}},"layout":{"type":"constrained","contentSize":"720px","justifyContent":"left"}} -->
<div class="wp-block-group" style="margin-bottom:var(--wp--preset--spacing--50)">
<!-- wp:heading {"className":"is-style-versal"} -->
<h2 class="wp-block-heading is-style-versal">Nada trabalha sozinho.</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"fontSize":"lead"} -->
<p class="has-lead-font-size">Contábil, fiscal, financeiro e auditoria conversam entre si. Quando uma área muda, a gente olha o efeito nas outras antes de você precisar perguntar.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
<!-- wp:columns {"className":"ff-servico-destaque","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|50","top":"var:preset|spacing|50"},"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|50"}}}} -->
<div class="wp-block-columns ff-servico-destaque" style="padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--50)">
<!-- wp:column {"verticalAlignment":"center","width":"22%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:22%">
<!-- wp:image {"sizeSlug":"full","linkDestination":"none","width":"200px","className":"is-style-emblema"} -->
<figure class="wp-block-image size-full is-resized is-style-emblema"><img src="<?php echo fireflies_asset( 'img/constelacoes/claro/condominios-sem-letras.svg' ); ?>" alt="Constelação Condomínios, emblema do serviço" style="width:200px"/></figure>
<!-- /wp:image -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:paragraph {"className":"is-style-rotulo"} -->
<p class="is-style-rotulo">Especialidade</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3,"className":"is-style-versal","fontSize":"titulo-2"} -->
<h3 class="wp-block-heading is-style-versal has-titulo-2-font-size"><a href="<?php echo fireflies_url( '/servicos/auditoria-de-condominios/' ); ?>">Auditoria de condomínios</a></h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"fontSize":"lead"} -->
<p class="has-lead-font-size">Prestação de contas conferida, com relatório executivo que síndico, conselho e administradora entendem.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"ff-ir-destaque"} -->
<p class="ff-ir-destaque"><a href="<?php echo fireflies_url( '/servicos/auditoria-de-condominios/' ); ?>">Ver o serviço</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:group {"className":"ff-indice","style":{"spacing":{"blockGap":"0"}}} -->
<div class="wp-block-group ff-indice">
<!-- wp:columns {"className":"is-style-linha-indice"} -->
<div class="wp-block-columns is-style-linha-indice">
<!-- wp:column {"width":"34%"} -->
<div class="wp-block-column" style="flex-basis:34%">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><a href="<?php echo fireflies_url( '/servicos/consultoria-contabil/' ); ?>">Consultoria contábil</a></h3>
<!-- /wp:heading -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%">
<!-- wp:paragraph -->
<p>Fechamento mensal no prazo, plano de contas que faz sentido e a DRE explicada em reunião.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"16%"} -->
<div class="wp-block-column" style="flex-basis:16%">
<!-- wp:paragraph {"className":"ff-ir"} -->
<p class="ff-ir"><a href="<?php echo fireflies_url( '/servicos/consultoria-contabil/' ); ?>" aria-hidden="true" tabindex="-1">Ver</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:columns {"className":"is-style-linha-indice"} -->
<div class="wp-block-columns is-style-linha-indice">
<!-- wp:column {"width":"34%"} -->
<div class="wp-block-column" style="flex-basis:34%">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><a href="<?php echo fireflies_url( '/servicos/consultoria-fiscal/' ); ?>">Consultoria fiscal</a></h3>
<!-- /wp:heading -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%">
<!-- wp:paragraph -->
<p>Regime tributário revisado, guias conferidas e planejamento tributário dentro da lei.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"16%"} -->
<div class="wp-block-column" style="flex-basis:16%">
<!-- wp:paragraph {"className":"ff-ir"} -->
<p class="ff-ir"><a href="<?php echo fireflies_url( '/servicos/consultoria-fiscal/' ); ?>" aria-hidden="true" tabindex="-1">Ver</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:columns {"className":"is-style-linha-indice"} -->
<div class="wp-block-columns is-style-linha-indice">
<!-- wp:column {"width":"34%"} -->
<div class="wp-block-column" style="flex-basis:34%">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><a href="<?php echo fireflies_url( '/servicos/consultoria-financeira/' ); ?>">Consultoria financeira</a></h3>
<!-- /wp:heading -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%">
<!-- wp:paragraph -->
<p>Fluxo de caixa, orçamento e indicadores para decidir com o número do mês.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"16%"} -->
<div class="wp-block-column" style="flex-basis:16%">
<!-- wp:paragraph {"className":"ff-ir"} -->
<p class="ff-ir"><a href="<?php echo fireflies_url( '/servicos/consultoria-financeira/' ); ?>" aria-hidden="true" tabindex="-1">Ver</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:columns {"className":"is-style-linha-indice"} -->
<div class="wp-block-columns is-style-linha-indice">
<!-- wp:column {"width":"34%"} -->
<div class="wp-block-column" style="flex-basis:34%">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><a href="<?php echo fireflies_url( '/servicos/gestao-de-projetos-e-processos/' ); ?>">Gestão de projetos e processos</a></h3>
<!-- /wp:heading -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%">
<!-- wp:paragraph -->
<p>Rotinas, ERP e automação, para que o controle continue funcionando depois do projeto.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"16%"} -->
<div class="wp-block-column" style="flex-basis:16%">
<!-- wp:paragraph {"className":"ff-ir"} -->
<p class="ff-ir"><a href="<?php echo fireflies_url( '/servicos/gestao-de-projetos-e-processos/' ); ?>" aria-hidden="true" tabindex="-1">Ver</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:columns {"className":"is-style-linha-indice"} -->
<div class="wp-block-columns is-style-linha-indice">
<!-- wp:column {"width":"34%"} -->
<div class="wp-block-column" style="flex-basis:34%">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><a href="<?php echo fireflies_url( '/servicos/sindicancia/' ); ?>">Sindicância</a></h3>
<!-- /wp:heading -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%">
<!-- wp:paragraph -->
<p>Apuração independente de fatos, com documentos, cronologia e relatório técnico.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"16%"} -->
<div class="wp-block-column" style="flex-basis:16%">
<!-- wp:paragraph {"className":"ff-ir"} -->
<p class="ff-ir"><a href="<?php echo fireflies_url( '/servicos/sindicancia/' ); ?>" aria-hidden="true" tabindex="-1">Ver</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->
<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}}} -->
<p style="margin-top:var(--wp--preset--spacing--40)"><a href="<?php echo fireflies_url( '/servicos/' ); ?>">Ver todos os serviços</a></p>
<!-- /wp:paragraph -->
</section>
<!-- /wp:group -->
