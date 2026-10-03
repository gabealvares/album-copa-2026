<?php
/**
 * Title: Tabela editorial
 * Slug: fireflies/tabela-editorial
 * Categories: fireflies
 * Description: Tabela com cabeçalho em mono, fios finos, números em mono à direita e linha de total.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:group {"layout":{"type":"constrained","contentSize":"960px","justifyContent":"left"}} -->
<div class="wp-block-group">
<!-- wp:heading -->
<h2 class="wp-block-heading">Para onde vai a taxa (exemplo)</h2>
<!-- /wp:heading -->
<!-- wp:table {"hasFixedLayout":false,"className":"is-style-numeros"} -->
<figure class="wp-block-table is-style-numeros"><table><thead><tr><th>Item</th><th>Valor (R$)</th><th>% da receita</th></tr></thead><tbody><tr><td>Pessoal e portaria</td><td>35.600,00</td><td>38,0%</td></tr><tr><td>Contratos e manutenção</td><td>20.600,00</td><td>22,0%</td></tr><tr><td>Água, luz e gás</td><td>14.000,00</td><td>15,0%</td></tr><tr><td>Fundo de reserva</td><td>8.200,00</td><td>8,8%</td></tr></tbody><tfoot><tr><td>Total</td><td>78.400,00</td><td>83,8%</td></tr></tfoot></table></figure>
<!-- /wp:table -->
<!-- wp:paragraph {"textColor":"pedra","fontSize":"nota","fontFamily":"plex-mono"} -->
<p class="has-pedra-color has-text-color has-nota-font-size has-plex-mono-font-family">Dados de exemplo.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</section>
<!-- /wp:group -->
