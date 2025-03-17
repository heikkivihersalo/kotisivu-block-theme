import { StyleAttributes, BlockStyles } from '@utils';

/**
 * Check if the style object has grid alignment properties
 * @param {Object} style - Current block styles
 * @return {boolean} True if the style object has grid alignment properties
 */
function checkGridAlignment(style: StyleAttributes): boolean {
	const hasGridAlignment =
		style?.justifyItems ||
		style?.alignItems ||
		style?.alignContent ||
		style?.justifyContent;

	return hasGridAlignment !== undefined;
}

/**
 * Convert vertical bar syntax to CSS variable
 * @param {string} string - Vertical bar syntax string
 * @return {string|undefined} CSS variable or undefined
 */
function convertVerticalBarSyntaxToCSS(string: string): string | undefined {
	if (string === '0') return undefined;
	const val = string.split(':')[1].trim();
	return `var(--wp--${val.replaceAll('|', '--')})`;
}

/**
 * Get and convert the block styles to correct object
 * @param {StyleAttributes} style - Current block styles
 * @return {BlockStyle} Block styles object
 */
function getBlockStyles(style: StyleAttributes): BlockStyles {
	return {
		background: style?.backgroundColor,
		marginTop:
			style?.spacing?.margin?.top &&
			convertVerticalBarSyntaxToCSS(style.spacing.margin.top),
		marginBottom:
			style?.spacing?.margin?.bottom &&
			convertVerticalBarSyntaxToCSS(style.spacing.margin.bottom),
		paddingTop:
			style?.spacing?.padding?.top &&
			convertVerticalBarSyntaxToCSS(style.spacing.padding.top),
		paddingBottom:
			style?.spacing?.padding?.bottom &&
			convertVerticalBarSyntaxToCSS(style.spacing.padding.bottom),
		paddingLeft:
			style?.spacing?.padding?.left &&
			convertVerticalBarSyntaxToCSS(style.spacing.padding.left),
		paddingRight:
			style?.spacing?.padding?.right &&
			convertVerticalBarSyntaxToCSS(style.spacing.padding.right),
		width: style?.width,
		height: style?.height,
		display: checkGridAlignment(style) ? 'grid' : undefined,
		justifyItems: style?.justifyItems,
		alignItems: style?.alignItems,
		alignContent: style?.alignContent,
		gap: style?.gap,
	};
}

export { getBlockStyles };
