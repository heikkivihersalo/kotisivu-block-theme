<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * Template file will be wrapped with `template-main` block.
 * It is used to keep the same structure for all templates and to avoid code duplication.
 * CSS classes can be passed in WordPress HTML -template which will be added to content area.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

the_content();
