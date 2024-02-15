<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

?>
<button id="color-scheme-toggle" class="dark-mode-toggle" title="<?php _e('Toggles light and dark color scheme', 'kotisivu-block-theme'); ?>" aria-label="auto" aria-live="polite">
    <!-- Light Mode SVG -->
    <svg class="dark-mode-toggle__icon" width="672" height="672" viewBox="0 0 672 672" fill="none" aria-hidden="true">
        <circle class="dark-mode-toggle__icon-circle" cx="336" cy="336" r="150" />
        <circle class="dark-mode-toggle__icon-overlap" cx="336" cy="336" r="150" />
        <line class="dark-mode-toggle__icon-line" x1="120.213" y1="99" x2="187" y2="165.787" />
        <line class="dark-mode-toggle__icon-line" x1="15" y1="321" x2="109.451" y2="321" />
        <line class="dark-mode-toggle__icon-line" x1="99" y1="552.574" x2="165.787" y2="485.787" />
        <line class="dark-mode-toggle__icon-line" x1="321" y1="656.451" x2="321" y2="562" />
        <line class="dark-mode-toggle__icon-line" x1="507.001" y1="485.787" x2="573.787" y2="552.574" />
        <line class="dark-mode-toggle__icon-line" x1="562" y1="321" x2="656.451" y2="321" />
        <line class="dark-mode-toggle__icon-line" x1="485.787" y1="165.787" x2="552.574" y2="99" />
        <line class="dark-mode-toggle__icon-line" x1="321" y1="109.451" x2="321" y2="15" />
    </svg>
</button>