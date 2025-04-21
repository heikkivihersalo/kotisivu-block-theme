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
			const target = event.target as HTMLDetailsElement;
			if (target && target.open) {
				target.setAttribute('aria-expanded', 'true');
			} else if (target) {
				target.setAttribute('aria-expanded', 'false');
			}
		});
	});
});
