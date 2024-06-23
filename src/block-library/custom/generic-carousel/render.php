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

?>

<div class="generic-carousel">
	<script>
		document.addEventListener('DOMContentLoaded', function() {
			var splide = new Splide('#splide-generic-carousel', {
				type: 'loop',
				perPage: 1,
				height: '600px',
				width: "min(100%, 1920px)",
				arrows: true,
				pagination: false,
				breakpoints: {
					800: {
						height: '400px',
					},
					600: {
						height: '300px',
					}
				}
			});
			splide.mount();
		});
	</script>
	<div id="splide-generic-carousel" class="splide" role="group">
		<div class="splide__track generic-carousel__track">
			<?php echo $content; ?>
		</div>
	</div>
</div>
