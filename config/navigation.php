<?php

declare(strict_types=1);

use HeikkiVihersalo\BlockThemeCore\Theme\Navigation\NavigationMenu;

return [
	NavigationMenu::create( 'header-nav', __( 'Header Navigation', 'kotisivu-block-theme' ) ),
	NavigationMenu::create( 'legal-nav', __( 'Legal Navigation', 'kotisivu-block-theme' ) ),
	NavigationMenu::create( 'footer-nav', __( 'Footer Navigation', 'kotisivu-block-theme' ) ),
];
