/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import General from './pages/General';
import Analytics from './pages/Analytics';
import Contact from './pages/Contact';
import Social from './pages/Social';

import './style.css';

/**
 * Main component
 * @return {JSX.Element} Main component
 */
const Main = (): JSX.Element => {
	/**
	 * Get current page
	 * - WordPress adds page query parameter to the URL when navigating between pages (e.g. page=kotisivu-settings-general)
	 * - We can use this to determine which page to display
	 */
	const currentPage = window.location.search.split('page=ksd-settings-')[1];

	/**
	 * Admin pages
	 * - To make things easier, we can create an object with the page name as the key and the component as the value
	 * - This way we can load pages dynamically based on the query parameter
	 */
	const PAGES = {
		general: <General />,
		analytics: <Analytics />,
		contact: <Contact />,
		'social-media': <Social />,
	} as { [key: string]: JSX.Element };

	/**
	 * Render the component
	 */
	return (
		<>
			<header>
				<h1>{__('Theme Settings', 'kotisivu-block-theme')}</h1>
			</header>
			{PAGES[currentPage]}
		</>
	);
};

/**
 * Render app
 */
domReady(() => {
	const container = document.getElementById('ksd-settings');
	if (container) {
		createRoot(container).render(<Main />);
	}
});
