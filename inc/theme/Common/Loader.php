<?php
/**
 * Register all actions and filters for the theme
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Common
 */

namespace Kotisivu\BlockTheme\Theme\Common;

/**
 * Register all actions and filters for the theme.
 *
 * Maintain a list of all hooks that are registered throughout
 * the theme, and register them with the WordPress API. Call the
 * run function to execute the list of actions and filters.
 *
 * @package    Kotisivu\BlockTheme\Common
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class Loader {
	/**
	 * The array of actions registered with WordPress.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      array    $actions    The actions registered with WordPress to fire when the theme loads.
	 */
	protected $actions;

	/**
	 * The array of remove actions registered with WordPress.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      array    $remove_actions    The actions registered with WordPress to remove when the theme loads.
	 */
	protected $remove_actions;

	/**
	 * The array of filters registered with WordPress.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      array    $filters    The filters registered with WordPress to fire when the theme loads.
	 */
	protected $filters;

	/**
	 * The array of remove filters registered with WordPress.
	 *
	 * @since    2.0.0
	 * @access   protected
	 * @var      array    $remove_filters    The filters registered with WordPress to remove when the theme loads.
	 */
	protected $remove_filters;

	/**
	 * Initialize the collections used to maintain the actions and filters.
	 *
	 * @since    2.0.0
	 */
	public function __construct() {
		$this->actions        = array();
		$this->filters        = array();
		$this->remove_actions = array();
		$this->remove_filters = array();
	}

	/**
	 * Add a new action to the collection to be registered with WordPress.
	 *
	 * @since    2.0.0
	 * @param    string      $hook             The name of the WordPress action that is being registered.
	 * @param    object|null $component        A reference to the instance of the object on which the action is defined.
	 * @param    string      $callback         The name of the function definition on the $component.
	 * @param    int         $priority         Optional. The priority at which the function should be fired. Default is 10.
	 * @param    int         $accepted_args    Optional. The number of arguments that should be passed to the $callback. Default is 1.
	 */
	public function add_action( $hook, $component, $callback, $priority = 10, $accepted_args = 1 ) {
		$this->actions = $this->add( $this->actions, $hook, $component, $callback, $priority, $accepted_args );
	}

	/**
	 * Remove an action from the collection to be registered with WordPress.
	 *
	 * @since    2.0.0
	 * @param    string                $hook             The name of the WordPress action that is being removed.
	 * @param    callable|string|array $callback         The name of the function definition on the $component.
	 * @param    int                   $priority         Optional. The priority at which the function should be fired. Default is 10.
	 * @return   void
	 */
	public function remove_action( $hook, $callback, $priority = 10 ) {
		$this->remove_actions = $this->add( $this->remove_actions, $hook, null, $callback, $priority, 0 );
	}

	/**
	 * Add a new filter to the collection to be registered with WordPress.
	 *
	 * @since    2.0.0
	 * @param    string      $hook             The name of the WordPress filter that is being registered.
	 * @param    object|null $component        A reference to the instance of the object on which the filter is defined.
	 * @param    string      $callback         The name of the function definition on the $component.
	 * @param    int         $priority         Optional. The priority at which the function should be fired. Default is 10.
	 * @param    int         $accepted_args    Optional. The number of arguments that should be passed to the $callback. Default is 1
	 */
	public function add_filter( $hook, $component, $callback, $priority = 10, $accepted_args = 1 ) {
		$this->filters = $this->add( $this->filters, $hook, $component, $callback, $priority, $accepted_args );
	}

	/**
	 * Remove a filter from the collection to be registered with WordPress.
	 *
	 * @since    2.0.0
	 * @param    string                $hook             The name of the WordPress filter that is being removed.
	 * @param    callable|string|array $callback         The name of the function definition on the $component.
	 * @param    int                   $priority         Optional. The priority at which the function should be fired. Default is 10.
	 * @return   void
	 */
	public function remove_filter( $hook, $callback, $priority = 10 ) {
		$this->remove_filters = $this->add( $this->remove_filters, $hook, null, $callback, $priority, 0 );
	}

	/**
	 * A utility function that is used to register the actions and hooks into a single
	 * collection.
	 *
	 * @since    2.0.0
	 * @access   private
	 * @param    array       $hooks            The collection of hooks that is being registered (that is, actions or filters).
	 * @param    string      $hook             The name of the WordPress filter that is being registered.
	 * @param    object|null $component        A reference to the instance of the object on which the filter is defined.
	 * @param    string      $callback         The name of the function definition on the $component.
	 * @param    int         $priority         The priority at which the function should be fired.
	 * @param    int         $accepted_args    The number of arguments that should be passed to the $callback.
	 * @return   array                                  The collection of actions and filters registered with WordPress.
	 */
	private function add( $hooks, $hook, $component, $callback, $priority = 10, $accepted_args = 0 ) {
		$hooks[] = array(
			'hook'          => $hook,
			'component'     => $component,
			'callback'      => $callback,
			'priority'      => $priority,
			'accepted_args' => $accepted_args,
		);

		return $hooks;
	}

	/**
	 * Register the filters and actions with WordPress.
	 *
	 * @since    2.0.0
	 */
	public function run() {
		foreach ( $this->remove_filters as $hook ) {
			remove_filter(
				$hook['hook'],
				$hook['component'] !== null ? array( $hook['component'], $hook['callback'] ) : $hook['callback'],
				$hook['priority']
			);
		}

		foreach ( $this->remove_actions as $hook ) {
			remove_action(
				$hook['hook'],
				$hook['component'] !== null ? array( $hook['component'], $hook['callback'] ) : $hook['callback'],
				$hook['priority']
			);
		}

		foreach ( $this->filters as $hook ) {
			add_filter(
				$hook['hook'],
				$hook['component'] !== null ? array( $hook['component'], $hook['callback'] ) : $hook['callback'],
				$hook['priority'],
				$hook['accepted_args']
			);
		}

		foreach ( $this->actions as $hook ) {
			add_action(
				$hook['hook'],
				$hook['component'] !== null ? array( $hook['component'], $hook['callback'] ) : $hook['callback'],
				$hook['priority'],
				$hook['accepted_args']
			);
		}
	}
}
