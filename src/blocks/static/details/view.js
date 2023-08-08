import { __ } from "@wordpress/i18n";
import domReady from '@wordpress/dom-ready';

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