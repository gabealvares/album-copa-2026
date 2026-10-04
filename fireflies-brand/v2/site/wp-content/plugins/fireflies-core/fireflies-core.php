<?php
/**
 * Plugin Name:       Fireflies Core
 * Plugin URI:        https://fireflies.com.br
 * Description:       Funções da Fireflies Consultoria que sobrevivem à troca de tema: cursos da Academy (CPT curso + trilha), tempo de leitura, botão de WhatsApp, índice do post, posts relacionados, slot de formulário, schema.org básico e ícones do site.
 * Version:           1.0.7
 * Requires at least: 6.6
 * Requires PHP:      8.1
 * Author:            Fireflies Consultoria
 * License:           GPL-2.0-or-later
 * Text Domain:       fireflies-core
 *
 * @package fireflies-core
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const FIREFLIES_CORE_VERSION = '1.0.7';
define( 'FIREFLIES_CORE_DIR', plugin_dir_path( __FILE__ ) );
define( 'FIREFLIES_CORE_URL', plugin_dir_url( __FILE__ ) );

require_once FIREFLIES_CORE_DIR . 'includes/opcoes.php';
require_once FIREFLIES_CORE_DIR . 'includes/cursos.php';
require_once FIREFLIES_CORE_DIR . 'includes/leitura.php';
require_once FIREFLIES_CORE_DIR . 'includes/whatsapp.php';
require_once FIREFLIES_CORE_DIR . 'includes/editorial.php';
require_once FIREFLIES_CORE_DIR . 'includes/formulario-cf7.php';
require_once FIREFLIES_CORE_DIR . 'includes/configuracao-inicial.php';
require_once FIREFLIES_CORE_DIR . 'includes/dados-empresa.php';
require_once FIREFLIES_CORE_DIR . 'includes/estilos.php';
require_once FIREFLIES_CORE_DIR . 'includes/raio-x.php';
require_once FIREFLIES_CORE_DIR . 'includes/blocos.php';
require_once FIREFLIES_CORE_DIR . 'includes/schema.php';
require_once FIREFLIES_CORE_DIR . 'includes/icones.php';

register_activation_hook(
	__FILE__,
	static function (): void {
		fireflies_core_register_cursos();
		flush_rewrite_rules();
	}
);
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
