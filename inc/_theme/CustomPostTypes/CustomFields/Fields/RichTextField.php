<?php

namespace Kotisivu\BlockTheme\Theme\CustomPostTypes\CustomFields\Fields;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\CustomPostTypes\CustomFields\CustomField;
use Kotisivu\BlockTheme\Theme\CustomPostTypes\Interfaces\CustomFieldInterface;

/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */
class RichTextField extends CustomField implements CustomFieldInterface {
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
				<?php wp_editor( $this->get_value(), $this->id, array( 'media_buttons' => false ) ); ?>
			</td>
		</tr>

		<?php
		return ob_get_clean();
	}

	/**
	 * @inheritDoc
	 */
	public function get_value(): string {
		return get_post_meta( get_the_ID(), $this->id, true );
	}

	/**
	 * @inheritDoc
	 */
	public function sanitize( string $value ): string {
		return wp_kses_post( $value );
	}
}
