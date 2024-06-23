<?php

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */
class DateField extends MetaboxField implements MetaboxFieldInterface {
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
				<input id="<?php echo $this->id; ?>" type="date" class="regular-text" name="<?php echo $this->id; ?>" value="<?php echo $this->get_value(); ?>">
			</td>
		</tr>

		<?php
		return ob_get_clean();
	}
}
