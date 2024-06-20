<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * 
 * 
 * @package Kotisivu\BlockTheme 
 */

class TextField extends MetaboxField implements MetaboxFieldInterface {
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
                <input id="<?php echo $this->id; ?>" type="text" class="regular-text" name="<?php echo $this->id; ?>" value="<?php echo $this->get_value(); ?>">
            </td>
        </tr>

        <?php return ob_get_clean(); ?>
<?php }
}