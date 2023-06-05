<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Create options page
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
class Options extends Theme {
    /**
     * Default theme values
     * @var array
     */
    private $default_values;

    /**
     * Slug for the database
     * @var string
     */
    private $database_slug;
    
    /**
     * Name for the settings group
     * @var string
     */
    private $settings_group_name;

    /**
     * Combined array of default and user defined values
     * @var array
     */
    private $settings_attributes;

    public function __construct() {
        parent::__construct();

        $this->default_values = [
            'gtm_active'    => '',
            'gtm_id'        => '',
            'gtm_url'       => 'https://www.googletagmanager.com',
            'gtm_timeout'   => '1500',
            'fa_all'        => '',
            'fa_brands'     => '',
            'fa_regular'    => '',
            'fa_solid'      => '',
            'jquery'        => 'normal',
            'branding'      => '',
            'dark_mode'     => ''
        ];

        $this->database_slug = 'theme_options_' . $this->textdomain;
        $this->settings_group_name = $this->textdomain . '_settings';
        $this->settings_attributes = shortcode_atts($this->default_values, $this->options);
    }

    /**
     * Register options page
     */
    public function register_options_page() {
        add_options_page(
            __('Kotisivu Block Theme Settings', $this->textdomain), // Page Title
            __('Theme Settings', $this->textdomain), // Menu Title
            'manage_options', // Capability
            $this->textdomain,  // Menu Slug
            [$this, 'settings_page_callback'] // Callback function
        );
    }

    /**
     * Register settings group
     */
    public function settings_page_group() {
        register_setting($this->settings_group_name, $this->database_slug);
    }


    /**
     * Settings page callback function
     */
    public function settings_page_callback() {
        if (!current_user_can('manage_options')) :
            wp_die('You do not have sufficient permissions to access this page');
        endif;

?>

        <div class=<?php echo $this->textdomain ?>>
            <h1 class="theme-settings__heading"><?php echo __("Kotisivu Block Theme Settings", $this->textdomain); ?></h1>
            <p class="theme-settings__description"><?php echo __('You can access theme options in here.', $this->textdomain); ?></p>

            <form class="theme-settings" method="post" action="options.php">
                <?php settings_fields($this->settings_group_name); ?>
                <!--- ==================  --->
                <!--- GOOGLE TAG MANAGER  --->
                <!--- ==================  --->
                <div class="theme-settings--tag-manager theme-settings__container">
                    <h2 class="theme-settings__heading"><?php echo __('Google Tag Manager', $this->textdomain); ?></h2>
                    <p class="theme-settings__description">
                        <?php echo __('Set Tag Manager settings here. Tag Manager is optimized to work with Kotisivu Theme so it is highly recommended.', $this->textdomain); ?>
                    </p>
                    <div class="theme-settings__fields">
                        <!-- ACTIVATE TAG MANAGER --->
                        <div class="theme-settings__input-wrapper">
                            <label>
                                <input class="theme-settings__input theme-settings__input--checkbox" type="checkbox" id="<?php echo $this->database_slug . '[gtm_active]' ?>" name="<?php echo $this->database_slug . '[gtm_active]' ?>" value="1" <?php checked(1, $this->settings_attributes['gtm_active']); ?>> <?php echo __('Activate Tag Manager', $this->textdomain); ?>
                            </label>
                        </div>
                        <div class="theme-settings__input-group">
                            <!-- TAG MANAGER ID --->
                            <div class="theme-settings__input-wrapper">
                                <label class="is-bold" for="<?php echo $this->database_slug . '[gtm_id]' ?>">
                                    <?php echo __('ID', $this->textdomain); ?>
                                </label>
                                <input class="theme-settings__input theme-settings__input--text" type="text" id="<?php echo $this->database_slug . '[gtm_id]' ?>" name="<?php echo $this->database_slug . '[gtm_id]' ?>" placeholder="GTM-XXXXXX" value="<?php echo esc_attr($this->settings_attributes['gtm_id']) ?>" />
                            </div>
                            <!-- TAG MANAGER URL --->
                            <div class="theme-settings__input-wrapper">
                                <label class="is-bold" for="<?php echo $this->database_slug . '[gtm_url]' ?>">
                                    <?php echo __('URL', $this->textdomain); ?>
                                </label>
                                <input class="theme-settings__input theme-settings__input--text" type="text" id="<?php echo $this->database_slug . '[gtm_url]' ?>" name="<?php echo $this->database_slug . '[gtm_url]' ?>" placeholder="https://www.googletagmanager.com" value="<?php echo esc_attr($this->settings_attributes['gtm_url']) ?>" />
                            </div>
                            <!-- TAG MANAGER TIMEOUT --->
                            <div class="theme-settings__input-wrapper">
                                <label class="is-bold" for="<?php echo $this->database_slug . '[gtm_timeout]' ?>">
                                    <?php echo __('Timeout', $this->textdomain); ?>
                                </label>
                                <input class="theme-settings__input theme-settings__input--text" type="text" id="<?php echo $this->database_slug . '[gtm_timeout]' ?>" name="<?php echo $this->database_slug . '[gtm_timeout]' ?>" value="<?php echo esc_attr($this->settings_attributes['gtm_timeout']) ?>" />
                            </div>
                        </div>
                    </div>
                </div>
                <?php submit_button('Save'); ?>
            </form>
        </div>
<?php }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        add_action('admin_menu', [$this, 'register_options_page']);

        if (!empty($GLOBALS['pagenow']) && ('options-general.php' === $GLOBALS['pagenow'] || 'options.php' === $GLOBALS['pagenow'])) :
            add_action('admin_init', [$this, 'settings_page_group']);
        endif;
    }
}
