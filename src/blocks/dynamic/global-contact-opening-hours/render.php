<?php
/**
 * Render global contact company opening hours callback
 * @param mixed $block_attributes 
 * @param mixed $content 
 * @return string|false 
 */
function render_global_contact_opening_hours($block_attributes, $content) { ?>
    <?php ob_start(); ?>
    <div class="global-contact global-contact--opening-hours">
        <?php echo $block_attributes['contact-opening-hours']; ?>
    </div>
    <?php return ob_get_clean(); ?>
<?php } ?>