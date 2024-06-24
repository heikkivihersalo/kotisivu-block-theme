<?php

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */
class RadioGroupField extends MetaboxField implements MetaboxFieldInterface {
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
				<label for="<?php echo $this->id; ?>"><?php echo $this->get_label(); ?></label>
			</th>
			<td>
				<fieldset>
					<legend class="screen-reader-text">
						<span><?php echo $this->get_label(); ?></span>
					</legend>
					<?php if ( ! $this->options ) : ?>
						<p><?php _e( 'No options', 'kotisivu-block-theme' ); ?></p>
					<?php else : ?>
						<?php foreach ( $this->options as $option ) : ?>
							<label for="<?php echo $this->id . '_' . $option['value']; ?>">
								<input id="<?php echo $this->id . '_' . $option['value']; ?>" type="radio" class="regular-text" name="<?php echo $this->id; ?>" value="<?php echo $option['value']; ?>" <?php checked( $this->get_value(), $option['value'] ); ?>>
								<?php echo $option['label']; ?>
							</label>
						<?php endforeach; ?>
					<?php endif; ?>
				</fieldset>
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
