<?php
/**
 * Render global contact email callback
 * @param mixed $block_attributes 
 * @param mixed $content 
 * @return string|false 
 */
function render_global_contact_email($block_attributes, $content) { ?>
    <?php $contact = array(
        'email' => $block_attributes["options"]['contact-email'],
        'icon' => 'fas fa-envelope',
        'title' => 'Email',
        'slug' => 'email',
        'aria-label' => __('Email', 'kotisivu-block-theme')
    ); ?>
    <?php ob_start(); ?>
    <a class="global-contact global-contact--email" href="mailto:<?php echo $contact['email'] ?>" target="_blank" rel="noopener noreferrer" title="<?php echo __($contact['title'], 'kotisivu-block-theme'); ?>" aria-label="<?php echo __($contact['aria-label'], 'kotisivu-block-theme'); ?>" data-track="true" data-type="email" data-label="Email">
        <i class="global-contact__icon <?php echo $contact['icon'] ?>" aria-hidden="true"></i>
        <span class="global-contact__text"><?php echo $contact['email'] ?></span>
    </a>
    <?php return ob_get_clean(); ?>
<?php } ?>