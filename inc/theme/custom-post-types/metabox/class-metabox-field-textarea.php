<?php

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */
class TextAreaField extends MetaboxField implements MetaboxFieldInterface {
	/**
	 * @inheritDoc
	 */
	public function get_html(): string {
		ob_start();
		?>

		<tr>
			<th scope="row">
				<label for="<?php echo $this->id; ?>"><?php echo $this->label; ?></label>
			</th>
			<td>
				<input id="<?php echo $this->id; ?>" type="textarea" class="regular-text" name="<?php echo $this->id; ?>" value="<?php echo $this->get_value(); ?>">
			</td>
		</tr>

		<?php
		return ob_get_clean();
	}

	/**
	 * @inheritDoc
	 */
	public function sanitize( string $value ): string {
		return sanitize_textarea_field( $value );
	}
}
