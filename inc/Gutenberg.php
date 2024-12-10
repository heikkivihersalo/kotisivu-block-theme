<?php
/**
 * The core block class.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme
 */

namespace Kotisivu\BlockTheme;

use Kotisivu\BlockTheme\Blocks\Types\BlockCustom;
use Kotisivu\BlockTheme\Blocks\Types\BlockPageTemplate;
use Kotisivu\BlockTheme\Blocks\Types\BlockPart;
use Kotisivu\BlockTheme\Common\Loader;
use Kotisivu\BlockTheme\Gutenberg\DataStore;
use Kotisivu\BlockTheme\Gutenberg\Scripts\Core;
use Kotisivu\BlockTheme\Gutenberg\Traits\AllowedBlocks;
use Kotisivu\BlockTheme\Gutenberg\Traits\BlockPatterns;
use Kotisivu\BlockTheme\Gutenberg\Traits\BlockCategories;
use Kotisivu\BlockTheme\Gutenberg\Traits\FilePathFix;
use Kotisivu\BlockTheme\Gutenberg\Traits\RemoveDefaultPatterns;

/**
 * The core theme class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this theme as well as the current
 * version of the theme.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Gutenberg {
	use AllowedBlocks;
	use RemoveDefaultPatterns;
	use BlockPatterns;
	use FilePathFix;
	use BlockCategories;

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      Loader    $loader    Maintains and registers all hooks for the theme.
	 */
	protected $loader;

	/**
	 * The unique identifier of this theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $theme_name    The string used to uniquely identify this theme.
	 */
	protected $theme_name;

	/**
	 * The current version of the theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the theme.
	 */
	protected $version;

	/**
	 * The current version of the API.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $api_version    The current version of the API.
	 */
	protected $api_version;

	/**
	 * Define the core functionality of the theme.
	 *
	 * Set the theme name and the theme version that can be used throughout the theme.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    2.0.0
	 */
	public function __construct() {
		$this->version     = defined( 'KOTISIVU_BLOCK_THEME_VERSION' ) ? KOTISIVU_BLOCK_THEME_VERSION : '2.0.0';
		$this->api_version = defined( 'KOTISIVU_BLOCK_THEME_API_VERSION' ) ? KOTISIVU_BLOCK_THEME_API_VERSION : '2';
		$this->theme_name  = 'kotisivu-block-theme';

		$this->set_loader();

		$this->set_scripts_and_styles();
		$this->set_separate_core_block_assets();

		$this->remove_default_block_patterns_and_categories();

		$this->set_block_patterns_and_categories();

		$this->fix_file_paths();

		$this->set_allowed_blocks();
	}

	/**
	 * Initialize the loader to execute all hooks with WordPress.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_loader() {
		$this->loader = new Loader();
	}

	/**
	 * Register all of the hooks related to the scripts and styles.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function set_scripts_and_styles() {
		$store = new DataStore( $this->theme_name, $this->version );
		$this->loader->add_action( 'wp_enqueue_scripts', $store, 'enqueue_scripts_and_styles' );

		$core = new Core( $this->theme_name, $this->version );
		$this->loader->add_action( 'wp_enqueue_scripts', $core, 'enqueue_scripts_and_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $core, 'enqueue_scripts_and_styles' );

		$custom = new BlockCustom( $this->theme_name, $this->version );
		$this->loader->add_action( 'init', $custom, 'register_block' );

		$page_template = new BlockPageTemplate( $this->theme_name, $this->version );
		$this->loader->add_action( 'init', $page_template, 'register_block' );

		$part = new BlockPart( $this->theme_name, $this->version );
		$this->loader->add_action( 'init', $part, 'register_block' );
	}


	/**
	 * Sets separate core block assets.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function set_separate_core_block_assets() {
		$this->loader->add_action( 'should_load_separate_core_block_assets', $this, '__return_true' );
	}

	/**
	 * Remove default block categories.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function remove_default_block_patterns_and_categories() {
		$this->loader->add_filter( 'block_pattern_categories_all', $this, '__return_empty_array' );
		$this->loader->add_filter( 'should_load_remote_block_patterns', $this, '__return_false' );
		$this->loader->add_filter( 'rest_dispatch_request', $this, 'remove_default_block_patterns', 12, 3 );
	}

	/**
	 * Register block patterns and categories.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function set_block_patterns_and_categories() {
		$this->loader->add_action( 'init', $this, 'register_block_pattern_categories' );
		$this->loader->add_action( 'init', $this, 'register_block_patterns' );
		$this->loader->add_action( 'init', $this, 'register_custom_block_categories' );
	}

	/**
	 * Fix file paths to get blocks working in theme context
	 * @return void
	 */
	private function fix_file_paths() {
		$this->loader->add_filter( 'plugins_url', $this, 'fix_block_file_path', 10, 3 );
	}

	/**
	 * Set allowed blocks
	 * @return void
	 */
	private function set_allowed_blocks() {
		$this->loader->add_filter( 'allowed_block_types_all', $this, 'filter_allowed_blocks', 10, 2 );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    2.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the theme used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     2.0.0
	 * @return    string    The name of the theme.
	 */
	public function get_theme_name() {
		return $this->theme_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the theme.
	 *
	 * @since     2.0.0
	 * @return    Loader    Orchestrates the hooks of the theme.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the theme.
	 *
	 * @since     2.0.0
	 * @return    string    The version number of the theme.
	 */
	public function get_version() {
		return $this->version;
	}
}
