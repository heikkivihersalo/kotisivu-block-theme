<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme\Gutenberg;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Common\Loader;

/**
 *
 * @package Kotisivu\BlockTheme
 */
class Patterns {
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
	 * Patterns
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var      array     $patterns Array of patterns
	 */
	private array $patterns = array(
		array(
			'slug'       => 'generic-two-column',
			'title'      => __( 'Generic Two Column', 'kotisivu-block-theme' ),
			'categories' => array( 'columns', 'sections' ),
		),
	);


	/**
	 * Categories
	 *
	 * @since    2.0.0
	 * @access   private
	 * @var      array     $categories Array of categories
	 */
	private array $categories = array(
		array(
			'slug'  => 'pages',
			'label' => __( 'Pages', 'kotisivu-block-theme' ),
		),
		array(
			'slug'  => 'sections',
			'label' => __( 'Sections', 'kotisivu-block-theme' ),
		),
		array(
			'slug'  => 'heros',
			'label' => __( 'Heros', 'kotisivu-block-theme' ),
		),
		array(
			'slug'  => 'banners',
			'label' => __( 'Banners', 'kotisivu-block-theme' ),
		),
	);

	/**
	 * Define the core functionality of the theme.
	 *
	 * Set the theme name and the theme version that can be used throughout the theme.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    2.0.0
	 */
	public function __construct( Loader $loader, string $theme_name, string $version ) {
		$this->loader     = $loader;
		$this->theme_name = $theme_name;
		$this->version    = $version;
	}

	/**
	 * Get Pattern Content.
	 *
	 * @param string $name Pattern name.
	 * @return string
	 */
	public function get_pattern_content( string $name ): string {
		$path = SITE_PATH . '/inc/Blocks/BlockPatterns/' . $name . '.php';
		if ( file_exists( $path ) ) {
			ob_start();
			require $path;
			return ob_get_clean();
		} else {
			add_action(
				'admin_notices',
				function () use ( $name ) {
					?>
				<div class="notice notice-error">
						<p><?php _e( 'Following block pattern content files is missing: ', 'kotisivu-block-theme' ); ?><?php echo $name; ?></p>
				</div>
					<?php
				}
			);
			return '';
		}
	}

	/**
	 * Remove and unregister patterns from core, Dotcom, remote and plugins.
	 *
	 * @param mixed           $dispatch_result Dispatch result to return or pass to the next handler.
	 * @param WP_REST_Request $request Request used to generate the response.
	 * @param string          $route Route matched for the request.
	 * @return mixed
	 *
	 * @see https://github.com/Automattic/jetpack/blob/d032fbb807e9cd69891e4fcbc0904a05508a1c67/projects/packages/jetpack-mu-wpcom/src/features/block-patterns/block-patterns.php#L107
	 * @see https://developer.wordpress.org/themes/features/block-patterns/#disabling-remote-patterns
	 */
	public function remove_default_block_patterns( $dispatch_result, $request, $route ) {
		$is_patterns_request = preg_match( '/^\/wp\/v2\/block\-patterns\/patterns$/', $route );

		if ( $is_patterns_request ) {
			// For the request route /wp/v2/block-patterns/patterns
			$patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();

			if ( ! empty( $patterns ) ) {
				// Remove theme support for all patterns from Dotcom, and plugins. See https://developer.wordpress.org/themes/features/block-patterns/#unregistering-block-patterns
				foreach ( $patterns as $pattern ) {
					unregister_block_pattern( $pattern['name'] );
				}
				// Remove theme support for core patterns from the Dotorg pattern directory. See https://developer.wordpress.org/themes/features/block-patterns/#removing-core-patterns
				remove_theme_support( 'core-block-patterns' );
			}
		}

		return $dispatch_result;
	}

	/**
	 * Register block patterns
	 * @return void
	 */
	public function register_block_pattern_categories(): void {
		foreach ( $this->categories as $category ) {
			register_block_pattern_category(
				$category['slug'],
				array( 'label' => $category['label'] )
			);
		}
	}

	/**
	 * Register block patterns
	 * @return void
	 */
	public function register_block_patterns(): void {
		foreach ( $this->patterns as $pattern ) {
			/**
			 * If slug is not set, continue
			 */
			if ( ! isset( $pattern['slug'] ) ) {
				continue;
			}

			/**
			 * Get all required args
			 */
			$args = array(
				// If title is not set, use the slug as title and capitalize each word.
				'title'       => isset( $pattern['title'] ) ? $pattern['title'] : ucwords( str_replace( '-', ' ', $pattern['slug'] ) ),
				// If description is not set, use an empty string.
				'description' => isset( $pattern['description'] ) ? $pattern['description'] : '',
				// If categories is not set or not an array, use an empty array.
				'categories'  => isset( $pattern['categories'] ) && null !== $pattern['categories'] && is_array( $pattern['categories'] ) ? $pattern['categories'] : array(),
				// If keywords is not set or not an array, use an empty array.
				'keywords'    => isset( $pattern['keywords'] ) && null !== $pattern['keywords'] && is_array( $pattern['keywords'] ) ? $pattern['keywords'] : array(),
				'content'     => $this->get_pattern_content( $pattern['slug'] ),
			);

			/**
			 * If page_template is set to true, use it as a page level template
			 */
			if ( isset( $pattern['page_template'] ) && true === $pattern['page_template'] ) :
				$args['blockTypes'] = array( 'core/post-content' );
			endif;

			/**
			 * Register block pattern
			 */
			register_block_pattern(
				'kotisivu-block-theme/' . $pattern['slug'],
				$args
			);
		}
	}

	/**
	 * Register hooks
	 *
	 * @since 2.0.0
	 * @access public
	 * @return void
	 */
	public function register_hooks() {
		$this->loader->add_action( 'init', $this, 'register_block_pattern_categories' );
		$this->loader->add_action( 'init', $this, 'register_block_patterns' );

		$this->loader->add_filter( 'block_pattern_categories_all', $this, '__return_empty_array' );
		$this->loader->add_filter( 'should_load_remote_block_patterns', $this, '__return_false' );
		$this->loader->add_filter( 'rest_dispatch_request', $this, 'remove_default_block_patterns', 12, 3 );
	}
}
