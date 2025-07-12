/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';

/**
 * Shared dependencies
 */
import { ColorSchemeCookie, ThemeColorSchemes } from '@/shared/types/dark-mode';
import type { ColorScheme } from '@/shared/types/dark-mode';

/**
 * Internal dependencies
 */
interface DarkModeToggleProps {
	scheme: ColorScheme;
	cookie: string;
	setDatalayer?: boolean;
	setCookie?: boolean;
}

/**
 *
 * Switch color scheme
 * @param {DarkModeToggleProps} props dark mode toggle props
 * @param {ColorScheme} props.scheme Scheme to switch
 * @param {string} props.cookie Cookie to set
 * @param {boolean} props.setDatalayer Set to dataLayer
 * @param {boolean} props.setCookie Set cookie
 * @return {void}
 */
function switchColorScheme({
	scheme,
	cookie,
	setDatalayer = true,
	setCookie = true,
}: DarkModeToggleProps): void {
	/**
	 * Get html element and buttons
	 */
	const buttons = document.querySelectorAll('.dark-mode-toggle');
	const html = document.getElementsByTagName('html')[0];

	/**
	 * Set color scheme to html element
	 */
	html.setAttribute(cookie, scheme ?? '');

	/**
	 * Set aria-label attribute for button
	 */
	buttons.forEach((btn) => {
		switch (scheme) {
			case ThemeColorSchemes.DARK:
				btn.setAttribute(
					'aria-label',
					__('Switch to light color scheme', 'kotisivu-block-theme')
				);
				break;
			case ThemeColorSchemes.LIGHT:
				btn.setAttribute(
					'aria-label',
					__('Switch to dark color scheme', 'kotisivu-block-theme')
				);
				break;
			default:
				btn.setAttribute(
					'aria-label',
					__('Invalid color scheme', 'kotisivu-block-theme')
				);
		}
	});

	/**
	 * Write to dataLayer
	 */
	if (setDatalayer) {
		writeToDataLayer(scheme);
	}

	/**
	 * Set cookie
	 */
	if (setCookie) {
		setSchemeCookie(scheme, cookie);
	}
}

/**
 * Set document cookie with color scheme
 * @param {ColorScheme} scheme Color scheme to set
 * @param {string} cookie Cookie to set
 * @return {void}
 */
function setSchemeCookie(scheme: ColorScheme, cookie: string): void {
	document.cookie =
		cookie +
		' = ' +
		scheme +
		'; ' +
		'max-age=2592000; path=/; samesite=strict; secure';
}

/**
 * Write to dataLayer
 * @param {ColorScheme} value Value to write to dataLayer
 * @return {void}
 */
function writeToDataLayer(value: ColorScheme): void {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		event: 'button_click',
		category: 'site_preferences',
		action: 'switch_color_scheme',
		value,
	});
}

/**
 * On DOM ready
 */
domReady(function () {
	const html = document.getElementsByTagName('html')[0];
	const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

	/**
	 * Handle color scheme on page load
	 * If user prefers dark mode and no previous cookie is set, set to dark mode
	 */
	if (
		prefersDarkMode.matches &&
		html.getAttribute(ColorSchemeCookie) !== ThemeColorSchemes.LIGHT
	) {
		switchColorScheme({
			scheme: ThemeColorSchemes.DARK,
			cookie: ColorSchemeCookie,
			setCookie: false,
			setDatalayer: false,
		});
	} else {
		switchColorScheme({
			scheme: ThemeColorSchemes.LIGHT,
			cookie: ColorSchemeCookie,
			setCookie: false,
			setDatalayer: false,
		});
	}

	/**
	 * Handle color scheme on button click event
	 */
	const buttons = document.querySelectorAll('.dark-mode-toggle');
	buttons.forEach((btn) => {
		btn.addEventListener('click', () => {
			const currentScheme = html.getAttribute('color-scheme');

			switch (currentScheme) {
				case ThemeColorSchemes.DARK:
					switchColorScheme({
						scheme: ThemeColorSchemes.LIGHT,
						cookie: ColorSchemeCookie,
					});
					break;
				case ThemeColorSchemes.LIGHT:
					switchColorScheme({
						scheme: ThemeColorSchemes.DARK,
						cookie: ColorSchemeCookie,
					});
					break;
				default:
					/**
					 * Handle case where no color scheme is set (e.g. first visit and cookie is null)
					 */
					if (prefersDarkMode.matches) {
						switchColorScheme({
							scheme: ThemeColorSchemes.DARK,
							cookie: ColorSchemeCookie,
						});
					} else {
						switchColorScheme({
							scheme: ThemeColorSchemes.LIGHT,
							cookie: ColorSchemeCookie,
						});
					}
			}
		});
	});
});
