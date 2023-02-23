<?php

function render_navigation_footer($block_attributes, $content) { ?>
    <?php ob_start(); ?>
        <nav class="footer-nav">
            <?php if (has_nav_menu('secondary-navigation')) : ?>
                <?php wp_nav_menu(array(
                'theme_location' => 'secondary-navigation',
                'container' => '',
                'menu_class' => 'footer-nav__menu',
                'menu_id' => 'secondary-navigation'
                )); ?>
            <?php endif; ?>
        </nav>
    <?php return ob_get_clean(); ?>

<?php } ?>