<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Require dependencies
 */
if (!class_exists('RationalOptionPages')) {
    require_once(dirname(__DIR__, 2) . '/lib/rational-option-pages/RationalOptionPages.php');
}

/**
 * Purge WordPress transient cache related to Kotisivu Block Theme
 * @return void
 */
function purge_transient_cache(): void {
    global $wpdb;

    $prefix = esc_sql('kotisivu-block-theme');
    $options = $wpdb->options;

    $sql = $wpdb->prepare("SELECT option_name FROM $options WHERE option_name LIKE '%s'", esc_sql("_transient_timeout_$prefix%"));

    $transients = $wpdb->get_col($sql);

    foreach ($transients as $transient) {
        $key = str_replace('_transient_timeout_', '', $transient);
        delete_transient($key);
    }

    wp_cache_flush();
}

/**
 * Get theme menu HTML
 * @return string
 */
function get_theme_menu_html() {
    if (!current_user_can('manage_options')) {
        wp_die('You do not have sufficient permissions to access this page');
    }

    if (isset($_POST['purge_cache'])) {
        purge_transient_cache();
    }

    ob_start(); ?>
    <div class="settings-page-wrapper">
        <h1><?php echo __('Theme settings', 'kotisivu-block-theme'); ?></h1>
        <p><?php echo __('You can access theme options in here.', 'kotisivu-block-theme'); ?></p>
    </div>
    <div class="settings-page-wrapper">
        <h2><?php echo __('Theme Cache Settings', 'kotisivu-block-theme'); ?></h2>
        <p><?php echo __('Manage theme generated transients here. Please note that this does not handle transients or cache that is generated by other plugins.', 'kotisivu-block-theme'); ?></p>
        <form method="post" action="">
            <input type="hidden" name="purge_cache" value="1">
            <button type="submit"><?php echo __('Purge Cache', 'kotisivu-block-theme'); ?></button>
        </form>
    </div>
<?php echo ob_get_clean();
}

/**
 * Setup theme options
 * @return void
 */
function setup_theme_options(): void {
    /**
     * Create initial menu page
     */
    add_menu_page(
        __('Kotisivu Theme Options', 'kotisivu-block-theme'), // Page Title
        __('Kotisivu Theme', 'kotisivu-block-theme'), // Menu Title
        'manage_options', // Capability
        'kotisivu_theme_settings',  // Menu Slug
        __NAMESPACE__ . '\get_theme_menu_html', // Callback function
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTUyIDE3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjk1NjIyNywwLDAsMC45NTYyMjcsLTgxMi42NDgsLTI2MjguNzgpIj4KICAgICAgICA8cGF0aCBmaWxsPSJibGFjayIgZD0iTTkyOC44NzQsMjc0OS4xMUwxMDA3LjksMjc5NC43NEwxMDA3LjksMjg4NS45OUw5MjguODc0LDI5MzEuNjFMODQ5Ljg0OCwyODg1Ljk5TDg0OS44NDgsMjc5NC43NEw5MjguODc0LDI3NDkuMTFaTTk4OS4wMTEsMjg0OC4xM0w5ODkuMDExLDI4MzIuNTlMOTUyLjEzNSwyODAwLjk5TDk1Mi4xMzUsMjgxOC43M0w5NzUuODYzLDI4MzkuMzdMOTc1Ljg2MywyODQxLjM2TDk1Mi4xMzUsMjg2MS45OUw5NTIuMTM1LDI4NzkuNzNMOTg5LjAxMSwyODQ4LjEzWk04NjguNzM3LDI4MzIuNTlMODY4LjczNywyODQ4LjEzTDkwNS42MTMsMjg3OS43M0w5MDUuNjEzLDI4NjEuOTlMODgxLjg4NSwyODQxLjM2TDg4MS44ODUsMjgzOS4zN0w5MDUuNjEzLDI4MTguNzNMOTA1LjYxMywyODAwLjk5TDg2OC43MzcsMjgzMi41OVpNOTI0LjM4MywyODk5LjMzTDk1MS4xMjQsMjc4MS4zOUw5MzQuMjIxLDI3ODEuMzlMOTA3LjQ4LDI4OTkuMzNMOTI0LjM4MywyODk5LjMzWiIgLz4KICAgIDwvZz4KPC9zdmc+Cg==', // Icon
        50
    );
}