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
    public function __construct($name, $version, $textdomain, $parent_path, $parent_uri, $path, $uri, $options, $analytics, $config) {
        /**
         * Get classes
         */
        foreach (glob(dirname(__FILE__) . '/theme/*.php') as $theme_class)
            require_once $theme_class;

        /**
         * Set theme attributes
         */
        $this->name = $name;
        $this->version = $version;
        $this->textdomain = $textdomain;
        $this->parent_path = $parent_path;
        $this->parent_uri = $parent_uri;
        $this->path = $path;
        $this->uri = $uri;
        $this->options = $options;
        $this->analytics = $analytics;
        $this->config = $config;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init() {
        /**
         * Theme Support
         */
        $support = new ThemeSupport(
            $this->config
        );
        $support->init();

        /**
         * Filters
         */
        $filters = new Filters(
            $this->config,
            $this->parent_path
        );
        $filters->init();

        /**
         * Rest
         */
        $rest = new Rest();
        $rest->init();

        /**
         * Custom Post Types
         */
        if ($this->config['customPostTypes']['enabled']) {
            $post_types = new CustomPostType(
                $this->config['customPostTypes']['postTypes']
            );
            $post_types->init();
        }

        /**
         * Custom Database Tables
         */
        if ($this->config['customDatabaseTables']['enabled']) {
            $tables = new Database(
                $this->config['customDatabaseTables']['tables']
            );
            $tables->init();
        }

        /**
         * Enqueue styles and scripts
         */
        $enqueue = new Enqueue(
            $this->parent_path,
            $this->parent_uri,
            $this->path,
            $this->uri
        );
        $enqueue->init();

        /**
         * WP Head
         */
        $wp_head = new WP_Head(
            $this->parent_path,
            $this->parent_uri,
            $this->config['settings'],
            $this->analytics
        );
        $wp_head->init();

        /**
         * Clean up WordPress junk
         */
        $cleanup = new Junk(
            $this->config['settings']
        );
        $cleanup->init();

        /**
         * Add option pages to admin panel
         */
        if (is_user_logged_in() && is_admin()) {
            $options = new Options();
            $options->init();
        }
    }
}
