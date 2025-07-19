<?php

declare(strict_types=1);

/**
 * Load all theme related files and classes
 *
 * !Do not remove these lines!
 */

require_once __DIR__ . '/bootstrap/vendor.php';
require_once __DIR__ . '/bootstrap/theme.php';

/**
 * Add your custom code here if needed or use the app folder (app/) for more organized code.
 */
add_action('init', function () {
    register_block_type(__DIR__ . '/build/kotisivu-block-theme/section');
});
