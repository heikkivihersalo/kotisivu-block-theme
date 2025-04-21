const ThemeColorSchemes = {
	DARK: 'dark',
	LIGHT: 'light',
} as const;

const ColorSchemeCookie = 'color-scheme';

type ColorScheme =
	| (typeof ThemeColorSchemes)[keyof typeof ThemeColorSchemes]
	| null;

export { ThemeColorSchemes, ColorSchemeCookie, ColorScheme };
