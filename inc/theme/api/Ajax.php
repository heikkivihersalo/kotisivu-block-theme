<?php
/**
 * Class for handling AJAX functionality in the theme.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Api\Ajax
 */

namespace Kotisivu\BlockTheme\Theme\Api;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Api\Ajax\BlogAjax;

/**
 * Class for handling AJAX functionality in the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Api\Ajax
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Ajax {
	/**
	 * Register the AJAX actions
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'wp_ajax_nopriv_get_next_page', 'Kotisivu\BlockTheme\Api\Ajax\BlogAjax::get_next_page' );
		add_action( 'wp_ajax_get_next_page', 'Kotisivu\BlockTheme\Api\Ajax\BlogAjax::get_next_page' );
	}
}
