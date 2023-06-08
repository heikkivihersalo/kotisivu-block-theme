<?php
/**
 * Render global contact company address callback
 * @param mixed $block_attributes 
 * @param mixed $content 
 * @return string|false 
 */
function render_global_contact_address($block_attributes, $content) { ?>
    <?php ob_start(); ?>
    <div class="global-contact global-contact--address">
        <?php echo $block_attributes['contact-address']; ?>
    </div>
    <?php return ob_get_clean(); ?>
<?php } ?>