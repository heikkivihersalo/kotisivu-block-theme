import '../styles/theme.css';

type LinkClickAnalyticsEvent = {
	event: string;
	event_category: string | undefined;
	event_label: string | undefined;
};

(async function trackLinkClicks() {
	/**
	 * Get all links with the `data-track` attribute set to `true`
	 */
	const links = document.querySelectorAll('a[data-track="true"]');

	/**
	 * Make sure the global `dataLayer` array exists
	 */
	window.dataLayer = window.dataLayer || [];

	/**
	 * Add a click event listener to each link
	 */
	links.forEach((link) => {
		link.addEventListener('click', () => {
			const event: LinkClickAnalyticsEvent = {
				event: 'link_click',
				event_category: (link as HTMLAnchorElement).dataset.type,
				event_label: (link as HTMLAnchorElement).dataset.label,
			};

			/**
			 * Push an event to the `dataLayer` array
			 * See: https://developers.google.com/tag-manager/devguide
			 */
			(window.dataLayer as Record<string, unknown>[]).push(event);
		});
	});
})();
