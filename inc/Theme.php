<?php
/**
 * The core theme class.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;
use Kotisivu\BlockTheme\Theme\Common\Traits\CreateLoader;
use Kotisivu\BlockTheme\Theme\Common\Traits\ThemeDefaults;

use Kotisivu\BlockTheme\Theme\Admin;
use Kotisivu\BlockTheme\Theme\Api;
use Kotisivu\BlockTheme\Theme\Cleanup;
use Kotisivu\BlockTheme\Theme\CustomPostTypes;
use Kotisivu\BlockTheme\Theme\Dequeue;
use Kotisivu\BlockTheme\Theme\Enqueue;
use Kotisivu\BlockTheme\Theme\Excerpt;
use Kotisivu\BlockTheme\Theme\Translations;
use Kotisivu\BlockTheme\Theme\Image;
use Kotisivu\BlockTheme\Theme\Meta;
use Kotisivu\BlockTheme\Theme\Navigation;
use Kotisivu\BlockTheme\Theme\Security;
use Kotisivu\BlockTheme\Theme\Uploads;

/**
 * The core theme class.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Theme {
	use CreateLoader;
	use ThemeDefaults;

	/**
	 * Constructor
	 *
	 * @since    2.0.0
	 * @access   public
	 */
	public function __construct() {
		$this->theme_name  = defined( 'SITE_NAME' ) ? SITE_NAME : 'kotisivu-block-theme';
		$this->version     = defined( 'SITE_VERSION' ) ? SITE_VERSION : '2.0.0';
		$this->api_version = defined( 'SITE_API_VERSION' ) ? SITE_API_VERSION : '2';

		$this->create_loader();

		$this->set_admin();
		$this->set_api();
		$this->set_cleanup();
		$this->set_custom_post_types();
		$this->set_dequeue();
		$this->set_enqueue();
		$this->set_custom_excerpt();
		$this->set_i18n();
		$this->set_custom_image();
		$this->set_meta();
		$this->set_security();
		$this->set_navigation();
		$this->set_uploads();
	}

	/**
	 * Register all of the hooks related to the admin area
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_admin() {
		$admin = new Admin( $this->loader, $this->theme_name, $this->version );
		$admin->register_hooks();
	}

	/**
	 * Register all of the hooks related to the API for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_api() {
		$api = new Api( $this->loader, $this->theme_name, $this->version, $this->api_version );
		$api->register_hooks();
	}

	/**
	 * Register all of the hooks related to junk cleanup for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_cleanup() {
		$cleanup = new Cleanup( $this->loader, $this->theme_name, $this->version );
		$cleanup->register_hooks();
	}

	/**
	 * Register all of the hooks related to custom post types for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_custom_post_types() {
		$cpt = new CustomPostTypes( $this->loader, $this->theme_name, $this->version );
		$cpt->register_hooks();
	}

	/**
	 * Register all of the hooks related to dequeeing scripts and styles for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_dequeue() {
		$dequeue = new Dequeue( $this->loader, $this->theme_name, $this->version );
		$dequeue->register_hooks();
	}

	/**
	 * Register all of the hooks related to the scripts and styles.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function set_enqueue() {
		$enqueue = new Enqueue( $this->loader, $this->theme_name, $this->version );
		$enqueue->register_hooks();
	}

	/**
	 * Register all of the hooks related to the custom excerpt
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_custom_excerpt() {
		$excerpt = new Excerpt( $this->loader, $this->theme_name, $this->version );
		$excerpt->register_hooks();
	}

	/**
	 * Define the locale for this theme for internationalization.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_i18n() {
		$i18n = new Translations();
		$this->loader->add_action( 'themes_loaded', $i18n, 'load_textdomain' );
	}

	/**
	 * Register all of the hooks related to the custom image sizes for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_custom_image() {
		$image = new Image( $this->loader, $this->theme_name, $this->version );
		$image->register_hooks();
	}

	/**
	 * Register all of the hooks related to the meta for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_meta() {
		$meta = new Meta( $this->loader, $this->theme_name, $this->version );
		$meta->register_hooks();
	}

	/**
	 * Register all of the hooks related to security enhancements for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_security() {
		$security = new Security( $this->loader, $this->theme_name, $this->version );
		$security->register_hooks();
	}

	/**
	 * Register all of the hooks related to navigation menus for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_navigation() {
		$navigation = new Navigation( $this->loader, $this->theme_name, $this->version );
		$navigation->register_hooks();
	}

	/**
	 * Register all of the hooks related to uploads for the theme
	 *
	 * @since    2.0.0
	 * @access   private
	 * @return   void
	 */
	private function set_uploads() {
		$uploads = new Uploads( $this->loader, $this->theme_name, $this->version );
		$uploads->register_hooks();
	}
}
