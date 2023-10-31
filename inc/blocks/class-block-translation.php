<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

class BlockTranslation extends Blocks {
    /**
     * Block slug
     * @var string
     */
    private $slug;

    /**
     * 
     */
    protected $parent_path;

    /**
     * 
     */
    protected $path;

    /**
     * 
     */
    protected $config;

    /**
     * Constructor
     * @return void 
     */
    public function __construct(string $slug) {
        parent::__construct();
        $this->slug = $slug;
    }


    /**
     * Set translated strings for a view scripts.
     * @return void 
     */
    public function set_translation_for_view_scripts(): void {
        wp_set_script_translations(
            'ksd-' . $this->slug . '-view-script',
            'kotisivu-block-theme',
            $this->parent_path . '/languages'
        );
    }

    /**
     * Set translated strings
     * @return void 
     */
    public function set_static_translation(): void {
        wp_set_script_translations(
            'ksd-' . $this->slug,
            'kotisivu-block-theme',
            $this->parent_path . '/languages'
        );
    }

    /**
     * Load theme textdomain.
     * @return void 
     */
    public static function load_textdomain(): void {
        load_theme_textdomain('kotisivu-block-theme', false, basename(dirname(__FILE__)) . '/languages/');
    }

    /**
     * Fix loading translation location
     * TODO: Might need to change this in the future when WordPress gets a proper fix
     * https://awhitepixel.com/blog/how-to-translate-custom-gutenberg-blocks-with-block-json/
     * @param string $file 
     * @param string $handle 
     * @param string $domain 
     * @return string 
     */
    public function fix_view_script_translation_location(string $file, string $handle, string $domain): string {
        if (strpos($handle, 'ksd-' . $this->slug . '-view-script') !== false && 'kotisivu-block-theme' === $domain) {
            $file = str_replace(WP_LANG_DIR . '/themes', $this->parent_path . '/languages', $file);
        }

        return $file;
    }

        /**
     * Fix loading translation location
     * TODO: Might need to change this in the future when WordPress gets a proper fix
     * https://awhitepixel.com/blog/how-to-translate-custom-gutenberg-blocks-with-block-json/
     * @param string $file 
     * @param string $handle 
     * @param string $domain 
     * @return string 
     */
    public function fix_static_script_translation_location(string $file, string $handle, string $domain): string {
        if (strpos($handle, 'ksd-' . $this->slug) !== false && 'kotisivu-block-theme' === $domain) {
            $file = str_replace(WP_LANG_DIR . '/themes', $this->parent_path . '/languages', $file);
        }

        return $file;
    }

    public function translate_dynamic_blocks() {
        add_action('init', [$this, 'set_translation_for_view_scripts']);
        add_filter('load_script_translation_file', [$this, 'fix_view_script_translation_location'], 10, 3);
    }

    public function translate_static_blocks() {
        add_action('init', [$this, 'set_static_translation']);
        add_filter('load_script_translation_file', [$this, 'fix_static_script_translation_location'], 10, 3);
    }
}
