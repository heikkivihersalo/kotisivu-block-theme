<?php

/**
 * Render global contact email callback
 * @param mixed $block_attributes 
 * @param mixed $content 
 * @return string|false 
 */
function render_site_email($block_attributes, $content) { ?>
    <?php $contact = array(
        'email' => $block_attributes["options"]['contact-email'],
        'icon' => 'fas fa-envelope',
        'title' => 'Email',
        'slug' => 'email',
        'aria-label' => __('Email', 'kotisivu-block-theme')
    ); ?>
    <?php ob_start(); ?>
    <a class="site-contact site-contact--email" href="mailto:<?php echo $contact['email'] ?>" target="_blank" rel="noopener noreferrer" title="<?php echo __($contact['title'], 'kotisivu-block-theme'); ?>" aria-label="<?php echo __($contact['aria-label'], 'kotisivu-block-theme'); ?>" data-track="true" data-type="email" data-label="Email">
        <div class="site-contact__icon is-square-icon" aria-hidden="true" tabindex="-1" style="background-color: var(--_icon-background)">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="var(--_icon-color)" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
        </div>
        <span class="site-contact__text"><?php echo $contact['email'] ?></span>
    </a>
    <?php return ob_get_clean(); ?>
<?php } ?>