<?php

declare(strict_types=1);

namespace Kotisivu\BlockTheme;

use Vihersalo\BlockThemeCore\Application;

require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-base.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-direct.php';

/**
 * Bind the loader to the application.
 */
return Application::configure()
	->boot();
