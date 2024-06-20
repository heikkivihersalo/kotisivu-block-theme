<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * 
 * 
 * @package Kotisivu\BlockTheme 
 */

class RichTextField extends MetaboxField implements MetaboxFieldInterface {
    /**
     * @inheritDoc
     */
    public function get_html(): string { ?>
        <?php ob_start(); ?>

        <tr>
            <th scope="row">
                <label for="<?php echo $this->id; ?>"><?php echo $this->label; ?></label>
            </th>
            <td>
                <?php wp_editor($this->get_value(), $this->id, array('media_buttons' => false)); ?>
            </td>
        </tr>

        <?php return ob_get_clean(); ?>
<?php }

    /**
     * @inheritDoc
     */
    public function get_value(): string {
        return get_post_meta(get_the_ID(), $this->id, true);
    }

    /**
     * @inheritDoc
     */
    public function sanitize(string $value): string {
        return wp_kses_post($value);
    }
}
