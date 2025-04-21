<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

use Kotisivu\BlockTheme\Theme\Navigation\Walkers\MenuWalker;

?>
<nav id="header-menu" class="site-header__nav">
	<button id="header-dialog-btn--open" class="site-header__toggle site-header__toggle--open" aria-label="<?php _e('Open Menu', 'kotisivu-block-theme'); ?>">
		<svg class="site-header__toggle__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
			<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" style="fill: var(--_icon-color);" />
		</svg>
	</button>
	<div role="dialog" id="header-dialog-container" class="site-header__dialog" aria-label="<?php _e('Main Menu', 'kotisivu-block-theme'); ?>" aria-modal="false">
		<button id="header-dialog-btn--close" class="site-header__toggle site-header__toggle--close" aria-label="<?php _e('Close Menu', 'kotisivu-block-theme'); ?>">
			<svg class="site-header__toggle__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" aria-hidden="true"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
				<path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" style="fill: var(--_icon-color);" />
			</svg>
		</button>
		<?php if (has_nav_menu('header-nav')) : ?>
			<?php
            wp_nav_menu(
                [
                    'theme_location' => 'header-nav',
                    'container'      => '',
                    'menu_class'     => 'site-header__menu',
                    'menu_id'        => 'header-nav',
                    'walker'         => new MenuWalker(),
                ]
            );
		    ?>
		<?php endif; ?>
		<div id="user-preferences" class="site-header__preferences">
			<?php echo do_blocks('<!-- wp:ksd/part-language-picker /-->'); ?>
			<?php echo do_blocks('<!-- wp:ksd/part-dark-mode-toggle /-->'); ?>
		</div>
	</div>
</nav>
