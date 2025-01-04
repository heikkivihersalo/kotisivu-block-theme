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
class UrlField extends CustomField implements CustomFieldInterface {
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
				<input id="<?php echo $this->id; ?>" type="url" class="regular-text" name="<?php echo $this->id; ?>" value="<?php echo $this->get_value(); ?>">
			</td>
		</tr>

		<?php
		return ob_get_clean();
	}

	/**
	 * @inheritDoc
	 */
	public function sanitize( string $value ): string {
		return sanitize_url( $value );
	}
}
