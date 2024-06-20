<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * 
 * 
 * @package Kotisivu\BlockTheme 
 */

class CheckboxGroupField extends MetaboxField implements MetaboxFieldInterface {
    /**
     * @inheritDoc
     */
    public function get_html(): string { ?>
        <?php if (empty($this->id)) {
            return __('ID is required', 'kotisivu-block-theme');
        } ?>

        <?php ob_start(); ?>

        <tr>
            <th scope="row">
                <label for="<?php echo $this->id; ?>"><?php echo $this->get_label(); ?></label>
            </th>
            <td>
                <fieldset>
                    <legend class="screen-reader-text">
                        <span><?php echo $this->get_label(); ?></span>
                    </legend>
                    <?php if (!$this->options) : ?>
                        <p><?php _e('No options', 'kotisivu-block-theme'); ?></p>
                    <?php else : ?>
                        <?php foreach ($this->options as $option) : ?>
                            <label for="<?php echo $this->id . '_' . $option['value']; ?>">
                                <input id="<?php echo $this->id . '_' . $option['value']; ?>" type="checkbox" class="regular-text" name="<?php echo $this->id . '_' .  $option['value']; ?>" value="1" <?php checked(1, get_post_meta($this->post->ID, $this->id . '_' . $option['value'], true)); ?>>
                                <?php echo $option['label']; ?>
                            </label>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </fieldset>
            </td>
        </tr>

        <?php return ob_get_clean(); ?>
<?php }

    /**
     * @inheritDoc
     */
    public function save(int $post_id, array $options = []): void {
        foreach ($options as $option) {
            if (isset($_POST[$this->id . '_' . $option['value']])) {
                update_post_meta($post_id, $this->id . '_' . $option['value'], '1');
            } else {
                delete_post_meta($post_id, $this->id . '_' . $option['value']);
            }
        }
    }
}
