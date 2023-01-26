<?php

function render_navigation_header($block_attributes, $content) { ?>
    <?php ob_start(); ?>
        <nav class="site-nav">
            <button class="site-nav__toggle" aria-controls="primary-navigation" aria-expanded="false">
                <span class="visually-hidden"><?php echo __('Menu', 'kotisivu-block-theme'); ?></span>
				<svg fill="var(--button-color)" viewBox="0 0 100 100" width="50" aria-hidden="true">
					<rect className="line top" width="80" height="10" x="10" y="25" rx="5">
					</rect>
					<rect className="line middle" width="80" height="10" x="10" y="45" rx="5">
					</rect>
					<rect className="line bottom" width="80" height="10" x="10" y="65" rx="5">
					</rect>
				</svg>
			</button>
            <?php if (has_nav_menu('primary-navigation')) : ?>
                <?php wp_nav_menu(array(
                'theme_location' => 'primary-navigation',
                'container' => '',
                'menu_class' => 'site-nav__menu',
                'menu_id' => 'primary-navigation'
                )); ?>
            <?php endif; ?>
        </nav>
    <?php return ob_get_clean(); ?>
<?php } ?>