<?php
/**
 * Class for registering individual custom post type
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\CustomPostTypes\PostTypes\Example
 */

namespace Kotisivu\BlockTheme\Theme\CustomPostTypes\PostTypes;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\CustomPostTypes\PostType;

/**
 * Class for registering individual custom post type
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\CustomPostTypes\PostTypes\Example
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Example extends PostType {
	/**
	 * Register post type
	 *
	 * @since 2.0.0
	 * @access protected
	 * @return void
	 */
	protected function register(): void {
		$this->register_custom_post_type();
	}
}
