<?php
/**
 * The Gutenberg class.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Common\Loader;

use Kotisivu\BlockTheme\Gutenberg\AllowedBlocks;
use Kotisivu\BlockTheme\Gutenberg\Categories;
use Kotisivu\BlockTheme\Gutenberg\Enqueue\Core as CoreEnqueue;
use Kotisivu\BlockTheme\Gutenberg\Enqueue\Store as StoreEnqueue;
use Kotisivu\BlockTheme\Gutenberg\Patterns;

use Kotisivu\BlockTheme\Gutenberg\BlockTypes\BlockCustom;
use Kotisivu\BlockTheme\Gutenberg\BlockTypes\BlockPageTemplate;
use Kotisivu\BlockTheme\Gutenberg\BlockTypes\BlockPart;

use Kotisivu\BlockTheme\Gutenberg\Traits\FilePathFix;

/**
 * The Gutenberg class.
 *
 * This class defines all code necessary to register custom blocks
 * and customizations for the Gutenberg editor.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Gutenberg {
	use FilePathFix;

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
	 * Constructor
	 *
	 * @since    2.0.0
	 * @access   public
	 */
	public function __construct() {
		$this->version     = defined( 'KOTISIVU_BLOCK_THEME_VERSION' ) ? KOTISIVU_BLOCK_THEME_VERSION : '2.0.0';
		$this->api_version = defined( 'KOTISIVU_BLOCK_THEME_API_VERSION' ) ? KOTISIVU_BLOCK_THEME_API_VERSION : '2';
		$this->theme_name  = 'kotisivu-block-theme';

		$this->set_loader();

		$this->set_allowed_blocks();
		$this->set_scripts_and_styles();
		$this->set_block_categories();
		$this->set_block_patterns();

		$this->set_separate_core_block_assets();
		$this->fix_file_paths();
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
	 * Register all of the hooks related to the allowed blocks.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_allowed_blocks(): void {
		$allowed_blocks = new AllowedBlocks( $this->loader, $this->theme_name, $this->version );
		$allowed_blocks->register_hooks();
	}

	/**
	 * Register all of the hooks related to the scripts and styles.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_scripts_and_styles(): void {
		$store = new StoreEnqueue( $this->theme_name, $this->version );
		$this->loader->add_action( 'wp_enqueue_scripts', $store, 'enqueue_scripts_and_styles' );

		$core = new CoreEnqueue( $this->theme_name, $this->version );
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
	 * Register all of the hooks related to the block categories.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_block_categories(): void {
		$categories = new Categories( $this->loader, $this->theme_name, $this->version );
		$categories->register_hooks();
	}

	/**
	 * Register all of the hooks related to the block patterns.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_block_patterns(): void {
		$patterns = new Patterns( $this->loader, $this->theme_name, $this->version );
		$patterns->register_hooks();
	}

	/**
	 * Sets editor to load separate core block assets
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_separate_core_block_assets(): void {
		$this->loader->add_action( 'should_load_separate_core_block_assets', $this, '__return_true' );
	}

	/**
	 * Fix file paths to get blocks working in theme context
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function fix_file_paths(): void {
		$this->loader->add_filter( 'plugins_url', $this, 'fix_block_file_path', 10, 3 );
	}

	/**
	 * Run the loader to execute all of the custom hooks related to Gutenberg.
	 *
	 * @since    2.0.0
	 * @access   public
	 * @return   void
	 */
	public function run(): void {
		$this->loader->run();
	}

	/**
	 * The name of the theme used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     2.0.0
	 * @access    public
	 * @return    string    The name of the theme.
	 */
	public function get_theme_name(): string {
		return $this->theme_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the theme.
	 *
	 * @since     2.0.0
	 * @access    public
	 * @return    Loader    Orchestrates the hooks of the theme.
	 */
	public function get_loader(): Loader {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the theme.
	 *
	 * @since     2.0.0
	 * @access    public
	 * @return    string    The version number of the theme.
	 */
	public function get_version(): string {
		return $this->version;
	}
}
