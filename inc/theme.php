<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * 
 * @package Kotisivu\BlockTheme 
 */
class Theme {
    /**
     * Theme name
     * @var string|false
     */
    protected $name;

    /**
     * Theme version
     * @var string|false
     */
    protected $version;

    /**
     * Theme textdomain
     * @var string|false
     */
    protected $textdomain;

    /**
     * Theme options database table
     * @var array|false
     */
    protected $options;

    /**
     * Theme analytics options database table
     * @var array|false
     */
    protected $analytics;

    /**
     * Theme config file. File is saved on cache and loaded if found. Returns array if success, false on failure.
     * @var mixed|false
     */
    protected $config;

    /**
     * Path to stylesheet directory of the current theme. Searches in the stylesheet directory before the template directory so themes which inherit from a parent theme can just override one file.
     * @var string
     */
    protected $path;

    /**
     * Stylesheet directory URI of the current theme. Searches in the stylesheet directory before the template directory so themes which inherit from a parent theme can just override one file.
     * @var string
     */
    protected $uri;

    /**
     * Path to parent theme directory
     * @var string
     */
    protected $parent_path;

    /**
     * URI of the parent theme directory
     * @var string
     */
    protected $parent_uri;

    /**
     * Theme constructor
     * @return void 
     */
    public function __construct() {
        /**
         * Get current theme object
         */
        $theme = wp_get_theme();

        /**
         * Set theme attributes
         */
        $this->name = $theme->get('Name');
        $this->version = $theme->get('Version');
        $this->textdomain = $theme->get('TextDomain');
        $this->path = get_theme_file_path();
        $this->uri = get_theme_file_uri();
        $this->parent_path = get_parent_theme_file_path();
        $this->parent_uri = get_parent_theme_file_uri();
        $this->options = $this->get_options_file('site-options');
        $this->analytics = $this->get_options_file('site-analytics');
        $this->config = $this->get_config_file('theme_config', 'config.json');

        /**
         * Load class files
         */
        $this->load_classes();
    }


    /**
     * Require classes related to the theme
     * @return void 
     */
    private function load_classes(): void {
        foreach (glob(dirname(__FILE__) . '/theme/*.php') as $class)
            require_once $class;
    }


    /**
     * Get config file and store it to cache
     * @param string $slug 
     * @param string $file_name 
     * @return mixed 
     * TODO: Check for better cache solutions (WP Object Cache vs Transients)
     */
    public function get_config_file(string $slug, string $file_name): mixed {
        /**
         * Check config file for cache. If config file is not found from cache, load it from file
         */
        $cache = wp_cache_get('kotisivu-block-theme_' . $slug);

        if ($cache === false) :
            /* Get config file */
            $config_file = file_get_contents($this->path . '/' . $file_name);

            /* Fallback if config.json is not found from child theme */
            if (!$config_file) :
                $config_file = file_get_contents($this->parent_path . '/' . $file_name);
            endif;

            /* Encode and set cache */
            $cache = json_decode($config_file, true);
            wp_cache_set('kotisivu-block-theme_' . $slug, $cache);
        endif;

        return $cache;
    }

    /**
     * Get site options from database and store it to cache
     * @param string $slug 
     * @return mixed
     */
    public function get_options_file(string $slug): mixed {
        /**
         * Check options for cache. If not found, load it from database
         */
        $cache = wp_cache_get('kotisivu-block-theme_' . $slug);

        if ($cache === false) {
            get_option('kotisivu-block-theme_' . $slug);
            $cache = get_option('kotisivu-block-theme_' . $slug);
            wp_cache_set('kotisivu-block-theme_' . $slug, $cache);
        }

        return $cache;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init() {
        $support = new ThemeSupport();
        $support->init();

        $filters = new Filters();
        $filters->init();

        $post_types = new CustomPostType($this->config);
        $post_types->init();

        $enqueue = new Enqueue();
        $enqueue->init();

        $wp_head = new WP_Head();
        $wp_head->init();

        $cleanup = new Cleanup();
        $cleanup->init();

        $options = new Options();
        $options->init();
    }
}
