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
 *
 */
const Main = () => {
	const PAGES = {
		'kotisivu-settings-general': {
			name: __('General', 'kotisivu-block-theme'),
			component: <General />,
		},
		'kotisivu-settings-analytics': {
			name: __('Analytics', 'kotisivu-block-theme'),
			component: <Analytics />,
		},
		'kotisivu-settings-contact': {
			name: __('Contact Information', 'kotisivu-block-theme'),
			component: <Contact />,
		},
		'kotisivu-settings-social-media': {
			name: __('Social Media Accounts', 'kotisivu-block-theme'),
			component: <Social />,
		},
	};

	return (
		<>
			<header>
				<h1>{__('Theme Settings', 'kotisivu-block-theme')}</h1>
			</header>
			{PAGES[window.location.search.split('page=')[1]].component}
		</>
	);
};

/**
 * Render app
 */
domReady(() => {
	createRoot(document.getElementById('ksd-settings')).render(<Main />);
});
