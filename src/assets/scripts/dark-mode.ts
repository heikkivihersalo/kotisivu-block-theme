/**
 * Internal dependencies
 */
import '../styles/inline/dark-mode.css';
import { ThemeColorSchemes, ColorSchemeCookie } from '../../../types/dark-mode';
import type { ColorScheme } from '../../../types/dark-mode';

/**
 * Get cookies
 */
const cookies: string[] = document.cookie.split(';');

/**
 * Check what color scheme is set and apply it
 */
Object.values(ThemeColorSchemes).forEach((scheme: ColorScheme) => {
	if (
		cookies.some((cookie: string) =>
			cookie.includes(ColorSchemeCookie + '=' + scheme)
		)
	) {
		document
			.getElementsByTagName('html')[0]
			.setAttribute(ColorSchemeCookie, scheme ?? '');
	}
});
