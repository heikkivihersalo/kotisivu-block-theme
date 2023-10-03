<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add filters to modify the theme behavior
 * 
 * Inherits following attributes
 * * name
 * * version
 * * textdomain
 * * options
 * * config
 * * path
 * * uri
 * * parent_path
 * * parent_uri
 * 
 * @package Kotisivu\BlockTheme 
 */
class SiteGeneralOptions extends Theme {
    /**
     * 
     */
    public function create_general_options_page() {
        add_menu_page(
            __('Kotisivu Theme Options', 'kotisivu-block-theme'), // Page Title
            __('Kotisivu Theme', 'kotisivu-block-theme'), // Menu Title
            'manage_options', // Capability
            'kotisivu_theme_settings',  // Menu Slug
            [$this, 'site_settings_page'], // Callback function
            '', // Icon
            50
        );

        if (
            !empty($GLOBALS['pagenow']) &&
            ('options-general.php' === $GLOBALS['pagenow'] || 'options.php' === $GLOBALS['pagenow'])
        ) {
            add_action('admin_init', [$this, 'create_settings']);
        }
    }

    /**
     * 
     */
    public function create_settings() {
        register_setting('general_settings_group', 'general_settings');
    }

    public function header_section() { ?>
        <?php ob_start(); ?>
        <div class="settings-page-wrapper">
            <h1><?php echo __('Theme settings', 'kotisivu-block-theme'); ?></h1>
            <p><?php echo __('You can access theme options in here.', 'kotisivu-block-theme'); ?></p>
        </div>
        <?php return ob_get_clean(); ?>
    <?php }

    // Purge all the transients associated with our plugin.
    public function purge_transient_cache() {

        global $wpdb;

        $prefix = esc_sql($this->textdomain);

        $options = $wpdb->options;

        $t  = esc_sql("_transient_timeout_$prefix%");

        $sql = $wpdb->prepare(
            "
        SELECT option_name
        FROM $options
        WHERE option_name LIKE '%s'
      ",
            $t
        );

        $transients = $wpdb->get_col($sql);

        // For each transient...
        foreach ($transients as $transient) {

            // Strip away the WordPress prefix in order to arrive at the transient key.
            $key = str_replace('_transient_timeout_', '', $transient);

            // Now that we have the key, use WordPress core to the delete the transient.
            delete_transient($key);
        }

        // But guess what?  Sometimes transients are not in the DB, so we have to do this too:
        wp_cache_flush();
    }

    public function cache_section() { ?>
        <?php ob_start(); ?>
        <?php
            if (isset($_POST['purge_cache'])) {
                $this->purge_transient_cache();
            }
        ?>
        <div class="settings-page-wrapper">
            <h2><?php echo __('Theme Cache Settings', 'kotisivu-block-theme'); ?></h2>
            <p><?php echo __('Manage theme generated transients here. Please note that this does not handle transients or cache that is generated by other plugins.', 'kotisivu-block-theme'); ?></p>
            <form method="post" action="">
                <input type="hidden" name="purge_cache" value="1">
                <button type="submit"><?php echo __('Purge Cache', 'kotisivu-block-theme'); ?></button>
            </form>
        </div>
        <?php return ob_get_clean(); ?>
<?php }

    /**
     * 
     */
    public function site_settings_page() {
        if (!current_user_can('manage_options')) {
            wp_die('You do not have sufficient permissions to access this page');
        }

        echo $this->header_section();
        echo $this->cache_section();
    }

    public function init() {
        $this->create_general_options_page();
    }
}
