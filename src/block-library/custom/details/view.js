/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * On DOM ready
 */
domReady(() => {
	const details = document.querySelectorAll('details');

	details.forEach((detail) => {
		detail.addEventListener('toggle', (event) => {
			if (event.target.open) {
				event.target.setAttribute('aria-expanded', 'true');
			} else {
				event.target.setAttribute('aria-expanded', 'false');
			}
		});
	});
});
