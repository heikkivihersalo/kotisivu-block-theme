<?php
/**
 * The notice class.
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

 namespace Kotisivu\BlockTheme\Theme\Common;

/**
 * The notice class.
 *
 * This class defines all code necessary to display a notice in admin area.
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Notice {
	/**
	 * The message
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      string    $message    The message
	 */
	protected $message;

	/**
	 * Define the plugin notice
	 *
	 * @since    2.0.0
	 * @param string $message The message
	 */
	public function __construct( string $message ) {
		$this->message = $message;
	}

	/**
	 * Get the HTML for the notice
	 *
	 * @return void
	 */
	public function get_html() {
		echo '<div class="notice notice-error"><p>' . esc_html( $this->message ) . '</p></div>';
	}

	/**
	 * Display the notice
	 *
	 * @since    2.0.0
	 */
	public function display() {
		add_action( 'admin_notices', array( $this, 'get_html' ) );
	}
}