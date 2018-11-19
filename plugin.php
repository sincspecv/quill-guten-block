<?php
/**
 * Plugin Name: Quill Block - The Fancy Robot
 * Plugin URI: https://thefancyrobot.com/
 * Description: Guten block that uses the Quill rich text editor
 * Author: Matthew Schroeter
 * Author URI: https://www.mattschroeter.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
