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
    public function __construct(string $slug, string $parent_path, string $path, array $config) {
        parent::__construct($path, $parent_path, $config);
        $this->slug = $slug;
    }


    /**
     * Set translated strings for a script.
     * @return void 
     */
    public function set_translation(): void {
        wp_set_script_translations(
            'ksd-' . $this->slug . '-editor-script',
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
    private function fix_translation_location(string $file, string $handle, string $domain): string {
        if (strpos($handle, 'ksd-' . $this->slug . '-editor-script') !== false && 'kotisivu-block-theme' === $domain) {
            $file = str_replace(WP_LANG_DIR . '/plugins', plugin_dir_path(__FILE__) . 'languages', $file);
        }

        return $file;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        add_action('init', [$this, 'set_translation']);
        add_filter('load_script_translation_file', [$this, 'fix_translation_location'], 10, 3);
    }
}
