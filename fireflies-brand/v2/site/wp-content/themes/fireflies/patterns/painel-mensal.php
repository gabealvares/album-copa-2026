<?php
/**
 * Title: Painel mensal (matriz de pontos)
 * Slug: fireflies/painel-mensal
 * Categories: fireflies
 * Description: Explica o painel mensal com estados (forma + palavra + cor) e um gráfico em matriz de pontos com dados de exemplo.
 *
 * @package fireflies
 */
?>
<!-- wp:group {"tagName":"section","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained","contentSize":"1240px"}} -->
<section class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"var:preset|spacing|60","top":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns">
<!-- wp:column {"width":"42%"} -->
<div class="wp-block-column" style="flex-basis:42%">
<!-- wp:heading -->
<h2 class="wp-block-heading">Todo mês, o seu negócio em uma tela.</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"fontSize":"lead"} -->
<p class="has-lead-font-size">Um painel que você lê em dois minutos, com o que mudou, o que preocupa e o que já está resolvido, explicado numa reunião com quem assina.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"is-style-estado-atencao"} -->
<p class="is-style-estado-atencao"><strong>Atenção.</strong> Inadimplência acima da meta definida com você.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"is-style-estado-ok"} -->
<p class="is-style-estado-ok"><strong>Resolvido.</strong> Impostos do próximo mês provisionados e guias conferidas.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"is-style-estado-critico"} -->
<p class="is-style-estado-critico"><strong>Aviso.</strong> Contrato de aluguel reajusta no próximo mês. Impacto já projetado.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"58%"} -->
<div class="wp-block-column" style="flex-basis:58%">
<!-- wp:group {"className":"ff-painel-figura"} -->
<div class="wp-block-group ff-painel-figura">
<!-- wp:html -->
<svg class="ff-painel-svg" viewBox="0 0 560 380" role="img" aria-labelledby="ffp-t ffp-d" xmlns="http://www.w3.org/2000/svg"><title id="ffp-t">Painel mensal, dados de exemplo</title><desc id="ffp-d">Saldo de caixa dos últimos 12 meses em matriz de pontos, subindo de 61 para 96 mil reais; receita do mês de 46,2 mil reais, margem líquida de 19,5% e 38 dias de caixa.</desc><rect width="560" height="380" fill="#FFFFFF"/><text x="0" y="14" font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="1.4" fill="#5E6271">RELATÓRIO MENSAL · AGOSTO</text><g font-family="IBM Plex Mono, monospace"><rect x="428" y="0" width="132" height="20" fill="none" stroke="#5E6271" stroke-width="1"/><text x="494" y="14" text-anchor="middle" font-size="10" letter-spacing="1.2" fill="#5E6271">DADOS DE EXEMPLO</text></g><line x1="0" y1="40" x2="170" y2="40" stroke="#17183A" stroke-width="1.5"/><text x="0" y="60" font-family="IBM Plex Mono, monospace" font-size="10" letter-spacing="1.2" fill="#5E6271">RECEITA DO MÊS</text><text x="0" y="94" font-family="Sora, sans-serif" font-weight="700" font-size="28" fill="#17183A">R$ 46,2 mil</text><text x="0" y="114" font-family="IBM Plex Mono, monospace" font-size="11" fill="#2A2F3D">+8,2% vs. julho</text><line x1="190" y1="40" x2="360" y2="40" stroke="#17183A" stroke-width="1.5"/><text x="190" y="60" font-family="IBM Plex Mono, monospace" font-size="10" letter-spacing="1.2" fill="#5E6271">MARGEM LÍQUIDA</text><text x="190" y="94" font-family="Sora, sans-serif" font-weight="700" font-size="28" fill="#17183A">19,5%</text><text x="190" y="114" font-family="IBM Plex Mono, monospace" font-size="11" fill="#2A2F3D">+1,4 p.p.</text><line x1="380" y1="40" x2="550" y2="40" stroke="#17183A" stroke-width="1.5"/><text x="380" y="60" font-family="IBM Plex Mono, monospace" font-size="10" letter-spacing="1.2" fill="#5E6271">DIAS DE CAIXA</text><text x="380" y="94" font-family="Sora, sans-serif" font-weight="700" font-size="28" fill="#17183A">38</text><text x="380" y="114" font-family="IBM Plex Mono, monospace" font-size="11" fill="#A9301F">−3 dias</text><text x="0" y="158" font-family="IBM Plex Sans, sans-serif" font-weight="600" font-size="14" fill="#17183A">Saldo de caixa subiu pelo 4º mês seguido</text><text x="0" y="176" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">CADA PONTO = R$ 10 MIL</text><circle cx="18" cy="336" r="4.2" fill="#6E89B4"/><circle cx="18" cy="321" r="4.2" fill="#6E89B4"/><circle cx="18" cy="306" r="4.2" fill="#6E89B4"/><circle cx="18" cy="291" r="4.2" fill="#6E89B4"/><circle cx="18" cy="276" r="4.2" fill="#6E89B4"/><circle cx="18" cy="261" r="4.2" fill="#6E89B4"/><circle cx="18" cy="246" r="1.4" fill="#D2D4DA"/><circle cx="18" cy="231" r="1.4" fill="#D2D4DA"/><circle cx="18" cy="216" r="1.4" fill="#D2D4DA"/><circle cx="18" cy="201" r="1.4" fill="#D2D4DA"/><text x="18" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">SET</text><circle cx="63" cy="336" r="4.2" fill="#6E89B4"/><circle cx="63" cy="321" r="4.2" fill="#6E89B4"/><circle cx="63" cy="306" r="4.2" fill="#6E89B4"/><circle cx="63" cy="291" r="4.2" fill="#6E89B4"/><circle cx="63" cy="276" r="4.2" fill="#6E89B4"/><circle cx="63" cy="261" r="4.2" fill="#6E89B4"/><circle cx="63" cy="246" r="1.4" fill="#D2D4DA"/><circle cx="63" cy="231" r="1.4" fill="#D2D4DA"/><circle cx="63" cy="216" r="1.4" fill="#D2D4DA"/><circle cx="63" cy="201" r="1.4" fill="#D2D4DA"/><text x="63" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">OUT</text><circle cx="108" cy="336" r="4.2" fill="#6E89B4"/><circle cx="108" cy="321" r="4.2" fill="#6E89B4"/><circle cx="108" cy="306" r="4.2" fill="#6E89B4"/><circle cx="108" cy="291" r="4.2" fill="#6E89B4"/><circle cx="108" cy="276" r="4.2" fill="#6E89B4"/><circle cx="108" cy="261" r="4.2" fill="#6E89B4"/><circle cx="108" cy="246" r="4.2" fill="#6E89B4"/><circle cx="108" cy="231" r="1.4" fill="#D2D4DA"/><circle cx="108" cy="216" r="1.4" fill="#D2D4DA"/><circle cx="108" cy="201" r="1.4" fill="#D2D4DA"/><text x="108" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">NOV</text><circle cx="153" cy="336" r="4.2" fill="#6E89B4"/><circle cx="153" cy="321" r="4.2" fill="#6E89B4"/><circle cx="153" cy="306" r="4.2" fill="#6E89B4"/><circle cx="153" cy="291" r="4.2" fill="#6E89B4"/><circle cx="153" cy="276" r="4.2" fill="#6E89B4"/><circle cx="153" cy="261" r="4.2" fill="#6E89B4"/><circle cx="153" cy="246" r="4.2" fill="#6E89B4"/><circle cx="153" cy="231" r="1.4" fill="#D2D4DA"/><circle cx="153" cy="216" r="1.4" fill="#D2D4DA"/><circle cx="153" cy="201" r="1.4" fill="#D2D4DA"/><text x="153" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">DEZ</text><circle cx="198" cy="336" r="4.2" fill="#6E89B4"/><circle cx="198" cy="321" r="4.2" fill="#6E89B4"/><circle cx="198" cy="306" r="4.2" fill="#6E89B4"/><circle cx="198" cy="291" r="4.2" fill="#6E89B4"/><circle cx="198" cy="276" r="4.2" fill="#6E89B4"/><circle cx="198" cy="261" r="4.2" fill="#6E89B4"/><circle cx="198" cy="246" r="1.4" fill="#D2D4DA"/><circle cx="198" cy="231" r="1.4" fill="#D2D4DA"/><circle cx="198" cy="216" r="1.4" fill="#D2D4DA"/><circle cx="198" cy="201" r="1.4" fill="#D2D4DA"/><text x="198" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">JAN</text><circle cx="243" cy="336" r="4.2" fill="#6E89B4"/><circle cx="243" cy="321" r="4.2" fill="#6E89B4"/><circle cx="243" cy="306" r="4.2" fill="#6E89B4"/><circle cx="243" cy="291" r="4.2" fill="#6E89B4"/><circle cx="243" cy="276" r="4.2" fill="#6E89B4"/><circle cx="243" cy="261" r="4.2" fill="#6E89B4"/><circle cx="243" cy="246" r="4.2" fill="#6E89B4"/><circle cx="243" cy="231" r="1.4" fill="#D2D4DA"/><circle cx="243" cy="216" r="1.4" fill="#D2D4DA"/><circle cx="243" cy="201" r="1.4" fill="#D2D4DA"/><text x="243" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">FEV</text><circle cx="288" cy="336" r="4.2" fill="#6E89B4"/><circle cx="288" cy="321" r="4.2" fill="#6E89B4"/><circle cx="288" cy="306" r="4.2" fill="#6E89B4"/><circle cx="288" cy="291" r="4.2" fill="#6E89B4"/><circle cx="288" cy="276" r="4.2" fill="#6E89B4"/><circle cx="288" cy="261" r="4.2" fill="#6E89B4"/><circle cx="288" cy="246" r="4.2" fill="#6E89B4"/><circle cx="288" cy="231" r="4.2" fill="#6E89B4"/><circle cx="288" cy="216" r="1.4" fill="#D2D4DA"/><circle cx="288" cy="201" r="1.4" fill="#D2D4DA"/><text x="288" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">MAR</text><circle cx="333" cy="336" r="4.2" fill="#6E89B4"/><circle cx="333" cy="321" r="4.2" fill="#6E89B4"/><circle cx="333" cy="306" r="4.2" fill="#6E89B4"/><circle cx="333" cy="291" r="4.2" fill="#6E89B4"/><circle cx="333" cy="276" r="4.2" fill="#6E89B4"/><circle cx="333" cy="261" r="4.2" fill="#6E89B4"/><circle cx="333" cy="246" r="4.2" fill="#6E89B4"/><circle cx="333" cy="231" r="1.4" fill="#D2D4DA"/><circle cx="333" cy="216" r="1.4" fill="#D2D4DA"/><circle cx="333" cy="201" r="1.4" fill="#D2D4DA"/><text x="333" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">ABR</text><circle cx="378" cy="336" r="4.2" fill="#6E89B4"/><circle cx="378" cy="321" r="4.2" fill="#6E89B4"/><circle cx="378" cy="306" r="4.2" fill="#6E89B4"/><circle cx="378" cy="291" r="4.2" fill="#6E89B4"/><circle cx="378" cy="276" r="4.2" fill="#6E89B4"/><circle cx="378" cy="261" r="4.2" fill="#6E89B4"/><circle cx="378" cy="246" r="4.2" fill="#6E89B4"/><circle cx="378" cy="231" r="4.2" fill="#6E89B4"/><circle cx="378" cy="216" r="1.4" fill="#D2D4DA"/><circle cx="378" cy="201" r="1.4" fill="#D2D4DA"/><text x="378" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">MAI</text><circle cx="423" cy="336" r="4.2" fill="#6E89B4"/><circle cx="423" cy="321" r="4.2" fill="#6E89B4"/><circle cx="423" cy="306" r="4.2" fill="#6E89B4"/><circle cx="423" cy="291" r="4.2" fill="#6E89B4"/><circle cx="423" cy="276" r="4.2" fill="#6E89B4"/><circle cx="423" cy="261" r="4.2" fill="#6E89B4"/><circle cx="423" cy="246" r="4.2" fill="#6E89B4"/><circle cx="423" cy="231" r="4.2" fill="#6E89B4"/><circle cx="423" cy="216" r="4.2" fill="#6E89B4"/><circle cx="423" cy="201" r="1.4" fill="#D2D4DA"/><text x="423" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">JUN</text><circle cx="468" cy="336" r="4.2" fill="#6E89B4"/><circle cx="468" cy="321" r="4.2" fill="#6E89B4"/><circle cx="468" cy="306" r="4.2" fill="#6E89B4"/><circle cx="468" cy="291" r="4.2" fill="#6E89B4"/><circle cx="468" cy="276" r="4.2" fill="#6E89B4"/><circle cx="468" cy="261" r="4.2" fill="#6E89B4"/><circle cx="468" cy="246" r="4.2" fill="#6E89B4"/><circle cx="468" cy="231" r="4.2" fill="#6E89B4"/><circle cx="468" cy="216" r="4.2" fill="#6E89B4"/><circle cx="468" cy="201" r="1.4" fill="#D2D4DA"/><text x="468" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#5E6271">JUL</text><circle cx="513" cy="336" r="4.2" fill="#17183A"/><circle cx="513" cy="321" r="4.2" fill="#17183A"/><circle cx="513" cy="306" r="4.2" fill="#17183A"/><circle cx="513" cy="291" r="4.2" fill="#17183A"/><circle cx="513" cy="276" r="4.2" fill="#17183A"/><circle cx="513" cy="261" r="4.2" fill="#17183A"/><circle cx="513" cy="246" r="4.2" fill="#17183A"/><circle cx="513" cy="231" r="4.2" fill="#17183A"/><circle cx="513" cy="216" r="4.2" fill="#17183A"/><circle cx="513" cy="201" r="6" fill="#F2B544" stroke="#17183A" stroke-width="1.5"/><text x="513" y="364" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10" fill="#17183A">AGO</text><text x="498" y="205" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="12" font-weight="500" fill="#17183A">R$ 96,4 mil</text><line x1="0" y1="345" x2="560" y2="345" stroke="#D2D4DA" stroke-width="1"/></svg>
<!-- /wp:html -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:columns {"className":"is-style-livro-razao","style":{"spacing":{"margin":{"top":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns is-style-livro-razao" style="margin-top:var(--wp--preset--spacing--60)">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">O que mudou</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Receita, custos e caixa comparados ao mês anterior.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">O que preocupa</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Alertas com causa e proposta, nunca só o número.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">O que está resolvido</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Pendências fechadas, com responsável e data.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</section>
<!-- /wp:group -->
