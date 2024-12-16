<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme\Theme\CustomPostTypes\PostTypes;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\CustomPostTypes\PostType;

/**
 * Create new custom post type
 *
 * @package Kotisivu\BlockTheme
 */
class Example extends PostType {
	/**
	 * Register post type
	 *
	 * @return void
	 */
	public function register() {
		$this->register_custom_post_type();
	}
}
