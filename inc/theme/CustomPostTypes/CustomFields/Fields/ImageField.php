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
class ImageField extends CustomField implements CustomFieldInterface {
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
				<?php $img_src = wp_get_attachment_image_src( get_post_meta( $this->post->ID, $this->id, true ), 'full' ); ?>
				<div class="image-uploader">
					<input class="image-uploader__input" id="<?php echo $this->id; ?>" type="hidden" name="<?php echo $this->id; ?>" value="<?php echo $this->get_value(); ?>" />
					<img src="<?php echo $img_src[0]; ?>" style="width: 300px;" alt="" class="image-uploader__preview<?php echo false === $img_src ? ' hide-image-uploader' : ''; ?>" />
					<div class="image-uploader__buttons">
						<button class="image-uploader__button image-uploader__button--choose<?php echo false === $img_src ? '' : ' hide-image-uploader'; ?>"><?php _e( 'Choose image', 'kotisivu-block-theme' ); ?></button>
						<button class="image-uploader__button image-uploader__button--remove<?php echo false === $img_src ? ' hide-image-uploader' : ''; ?>"><?php _e( 'Remove Image', 'kotisivu-block-theme' ); ?></button>
					</div>
				</div>
			</td>
		</tr>

		<?php
		return ob_get_clean();
	}
}
