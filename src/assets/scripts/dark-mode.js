import '../styles/inline/dark-mode.css';

const cookies = document.cookie.split(';');
/**
 * Set color scheme to dark
 */
if (cookies.some((e) => e.includes('color-scheme=dark'))) {
	document
		.getElementsByTagName('html')[0]
		.setAttribute('color-scheme', 'dark');
}

/**
 * Set color scheme to dark
 */
if (cookies.some((e) => e.includes('color-scheme=light'))) {
	document
		.getElementsByTagName('html')[0]
		.setAttribute('color-scheme', 'light');
}
