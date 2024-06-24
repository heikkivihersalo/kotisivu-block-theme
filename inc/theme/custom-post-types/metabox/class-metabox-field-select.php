<?php

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */
class SelectField extends MetaboxField implements MetaboxFieldInterface {
	/**
	 * @inheritDoc
	 */
	public function get_html(): string {
		if ( empty( $this->id ) ) {
			return __( 'ID is required', 'kotisivu-block-theme' );
		}

		ob_start();
		?>

		<tr>
			<th scope="row">
				<label for="<?php echo $this->id; ?>">
					<?php echo $this->get_label(); ?>
				</label>
			</th>
			<td>
				<select name="<?php echo $this->id; ?>" id="<?php echo $this->id; ?>">
					<?php foreach ( $this->options as $option ) : ?>
						<option value="<?php echo $option['value']; ?>" <?php echo selected( $this->get_value(), $option['value'] ); ?>>
							<?php echo $option['label']; ?>
						</option>
					<?php endforeach; ?>
				</select>
			</td>
		</tr>

		<?php
		return ob_get_clean();
	}

	/**
	 * @inheritDoc
	 */
	public function sanitize( string $value ): string {
		return sanitize_text_field( $value );
	}
}
