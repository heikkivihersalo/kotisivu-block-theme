<?php
/**
 * General theme defaults and properties
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Common\Traits
 */

namespace Kotisivu\BlockTheme\Theme\Common\Traits;

use Kotisivu\BlockTheme\Theme\Common\Loader;

/**
 * General theme defaults and properties
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Common\Traits
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
trait ThemeDefaults {
	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      Loader    $loader    Maintains and registers all hooks for the theme.
	 */
	protected Loader $loader;

	/**
	 * The unique identifier of this theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $theme_name    The string used to uniquely identify this theme.
	 */
	protected string $theme_name;

	/**
	 * The current version of the theme.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the theme.
	 */
	protected string $version;

	/**
	 * The current version of the API.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $api_version    The current version of the API.
	 */
	protected string $api_version;

	/**
	 * The reference to the class that orchestrates the hooks with the theme.
	 *
	 * @since     2.0.0
	 * @return    Loader    Orchestrates the hooks of the theme.
	 */
	public function get_loader(): Loader {
		return $this->loader;
	}

	/**
	 * The name of the theme used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     2.0.0
	 * @return    string    The name of the theme.
	 */
	public function get_theme_name(): string {
		return $this->theme_name;
	}

	/**
	 * Retrieve the version number of the theme.
	 *
	 * @since     2.0.0
	 * @return    string    The version number of the theme.
	 */
	public function get_version(): string {
		return $this->version;
	}

	/**
	 * Retrieve the API version number of the theme.
	 *
	 * @since     2.0.0
	 * @return    string    The API version number of the theme.
	 */
	public function get_api_version(): string {
		return $this->api_version;
	}
}
