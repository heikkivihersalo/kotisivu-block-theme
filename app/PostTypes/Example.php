<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme\PostTypes;

use HeikkiVihersalo\CustomPostTypes\PostType;
use HeikkiVihersalo\CustomPostTypes\Interfaces\PostTypeInterface;

/**
 * Example
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */
class Example extends PostType implements PostTypeInterface {
	/**
	 * @inheritDoc
	 */
	public function register(): void {
		$this->register_custom_post_type();
	}
}
