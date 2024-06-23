<?php
/**
 * 
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 *
 *
 * @package Kotisivu\BlockTheme
 */

class ImageField extends MetaboxField implements MetaboxFieldInterface {
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
					<input class="metabox__input-field metabox__input-field--image image-uploader__input-field" id="<?php echo $this->id; ?>" type="hidden" name="<?php echo $this->id; ?>" value="<?php echo $this->get_value(); ?>" />
					<img src="<?php echo $img_src[0]; ?>" style="width: 300px;" alt="" class="image-uploader__preview<?php echo is_array( $img_src ) == '' ? ' is-visually-hidden--no-tag' : ''; ?>" />
					<div class="image-uploader__buttons">
						<button class="image-uploader__button image-uploader__button--choose<?php echo is_array( $img_src ) == '' ? ' ' : ' is-visually-hidden--no-tag'; ?>">Choose image</button>
						<button class="image-uploader__button image-uploader__button--remove<?php echo is_array( $img_src ) == '' ? ' is-visually-hidden--no-tag' : ''; ?>">Remove Image</button>
					</div>
				</div>
			</td>
		</tr>
		
		<?php
		return ob_get_clean();
	}
}
