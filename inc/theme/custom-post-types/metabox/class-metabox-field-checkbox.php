<?php

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */
class CheckboxField extends MetaboxField implements MetaboxFieldInterface {
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
				<fieldset>
					<legend class="screen-reader-text">
						<span><?php echo $this->label; ?></span>
					</legend>
					<label for="<?php echo $this->id; ?>">
						<input id="<?php echo $this->id; ?>" type="checkbox" class="regular-text" name="<?php echo $this->id; ?>" value="1" <?php checked( 1, $this->get_value() ); ?>>
						<?php echo $this->label; ?>
					</label>
				</fieldset>
			</td>
		</tr>

		<?php
		return ob_get_clean();
	}

	/**
	 * @inheritDoc
	 */
	public function save( int $post_id, array $options = array() ): void {
		// Nonce verification is done in the parent class so we can safely ignore it here.
		if ( isset( $_POST[ $this->id ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
			update_post_meta( $post_id, $this->id, '1' );
		} else {
			delete_post_meta( $post_id, $this->id );
		}
	}
}
