<?php
/**
 * Custom REST field
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Api\Traits;

/**
 * Custom REST field
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait CustomRestField {
	/**
	 * Register custom REST field
	 *
	 * @param string   $type The type of the field
	 * @param string   $field The field name
	 * @param callable $callback The callback function
	 * @return void
	 */
	public function register_custom_rest_field( string $type, string $field, callable $callback ): void {
		register_rest_field(
			$type,
			$field,
			array(
				'get_callback' => $callback,
			)
		);
	}
}
