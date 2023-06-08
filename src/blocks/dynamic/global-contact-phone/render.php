<?php

/**
 * Format phone number to Finnish format
 * @param mixed $num 
 * @return string 
 */
function format_phone_num($num): string {
    return sprintf(
        "%s-%s-%s",
        '0' . substr($num, 4, 2),
        substr($num, 6, 3),
        substr($num, 9)
    );
}

/**
 * Render global contact phone block
 * @param array $block_attributes 
 * @param string $content 
 * @return string 
 */
function render_global_contact_phone($block_attributes, $content) { ?>
    <?php $contact = array(
        'phone' => $block_attributes["options"]['contact-phone'],
        'icon' => 'fas fa-phone',
        'title' => __('Phone', 'kotisivu-block-theme'),
        'slug' => 'phone',
        'aria-label' => __('Phone', 'kotisivu-block-theme')
    ); ?>
    <?php ob_start(); ?>
    <a class="global-contact global-contact--phone" href="tel:<?php echo $contact['phone'] ?>" target="_blank" rel="noopener noreferrer" title="<?php echo __($contact['title'], 'kotisivu-block-theme'); ?>" aria-label="<?php echo __($contact['aria-label'], 'kotisivu-block-theme'); ?>" data-track="true" data-type="phone" data-label="Phone">
        <i class="global-contact__icon <?php echo $contact['icon'] ?>" aria-hidden="true"></i>
        <span class="global-contact__text"><?php echo format_phone_num($contact['phone']) ?></span>
    </a>
    <?php return ob_get_clean(); ?>
<?php } ?>