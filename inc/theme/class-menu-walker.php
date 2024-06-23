<?php

namespace Kotisivu\BlockTheme;

use Walker_Nav_Menu;

defined( 'ABSPATH' ) || die();

/**
 * Add custom walker to header menu
 *
 * @package Kotisivu\BlockTheme
 */
class HeaderMenuWalker extends Walker_Nav_Menu {
	/**
	 * Start element
	 *
	 * @param string $output Used to append additional content (passed by reference).
	 * @param object $item Menu item data object.
	 * @param int    $depth Depth of menu item. Used for padding.
	 * @param array  $args An object of wp_nav_menu() arguments.
	 * @param int    $id ID of the current menu item. Default 0.
	 * @return void
	 */
	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		/**
		 * Build indent and caret
		 */
		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
		$caret  = '<svg class="site-header__menu-caret" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>';

		/**
		 * Build class names
		 */
		$class_names = join( ' ', array( 'site-header__menu-item', $item->classes[0] ) );
		$class_names = ' class="' . esc_attr( $class_names ) . '"';

		/**
		 * Build id
		 */
		$id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth );
		$id = ' id="' . esc_attr( $id ) . '"';

		/**
		 * Build attributes
		 */
		$atts                 = array();
		$atts['title']        = ! empty( $item->attr_title ) ? $item->attr_title : '';
		$atts['target']       = ! empty( $item->target ) ? $item->target : '';
		$atts['rel']          = ! empty( $item->xfn ) ? $item->xfn : '';
		$atts['href']         = ! empty( $item->url ) ? $item->url : '';
		$atts['aria-current'] = ! empty( $item->current ) ? 'page' : '';

		$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

		$attributes = '';
		foreach ( $atts as $attr => $value ) {
			if ( ! empty( $value ) ) {
				$value       = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
				$attributes .= ' ' . $attr . '="' . $value . '"';
			}
		}

		/**
		 * Start output
		 */
		$output .= $indent . '<li' . $id . $class_names . '>';

		/**
		 * Build item (link) output
		 */
		$is_link = $item->url && '#' !== $item->url;

		$item_output  = $args->before;
		$item_output .= $is_link ? '<a' . $attributes . '>' : '<a class="site-header__menu-title">';
		$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
		$item_output .= $is_link ? '' : $caret;
		$item_output .= '</a>';
		$item_output .= $args->after;

		/**
		 * Append item output to output
		 */
		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}

	/**
	 * End element
	 *
	 * @param string $output Used to append additional content (passed by reference).
	 * @param object $category Menu item data object.
	 * @param int    $depth Depth of menu item. Used for padding.
	 * @param array  $args An object of wp_nav_menu() arguments.
	 * @return void
	 */
	public function end_el( &$output, $category, $depth = 0, $args = array() ) {
		$output .= "</li>\n";
	}

	/**
	 * Start level
	 *
	 * @param string $output Used to append additional content (passed by reference).
	 * @param int    $depth Depth of menu item. Used for padding.
	 * @param array  $args An object of wp_nav_menu() arguments.
	 * @return void
	 */
	public function start_lvl( &$output, $depth = 0, $args = array() ) {
		$indent = str_repeat( "\t", $depth );

		switch ( $depth ) {
			case 0:
				$output .= "\n$indent<ul class=\"site-header__sub-menu menu-level-0\">\n";
				break;
			case 1:
				$output .= "\n$indent<ul class=\"site-header__sub-menu menu-level-1\">\n";
				break;
			case 2:
				$output .= "\n$indent<ul class=\"site-header__sub-menu menu-level-2\">\n";
				break;
			default:
				$output .= "\n$indent<ul class=\"site-header__sub-menu\">\n";
				break;
		}
	}

	/**
	 * End level
	 *
	 * @param string $output Used to append additional content (passed by reference).
	 * @param int    $depth Depth of menu item. Used for padding.
	 * @param array  $args An object of wp_nav_menu() arguments.
	 * @return void
	 */
	public function end_lvl( &$output, $depth = 0, $args = array() ) {
		$indent  = str_repeat( "\t", $depth );
		$output .= "$indent</ul>\n";
	}
}
