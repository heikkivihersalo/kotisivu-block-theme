<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Load translations
 * @return void
 */
function load_translations(): void {
    load_theme_textdomain('kotisivu-block-theme', SITE_PATH . '/languages');
}
