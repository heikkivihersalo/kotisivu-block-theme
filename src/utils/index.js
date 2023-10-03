/**
 * Utility functions
 * ==========================================================
 * 
 * This file contains utility functions that are used to manipulate and convert
 * block styles and attributes. These functions are primarily used in the 
 * block editor for customizing the appearance and behavior of blocks.
 * 
 * @author Heikki Vihersalo
 * @link https://www.kotisivu.dev
 */


/**
 * Get and convert the block styles to correct object
 * @param {object} style Block style attributes
 * @returns {object} Block style object
 */
export const getBlockStyles = ({ style }) => {
    const convertVerticalBarSyntaxToCSS = (string) => {
        if (string === "0") return undefined;
        let val = string.split(":")[1].trim();
        return `var(--wp--${val.replaceAll("|", "--")})`;
    }

    const hasGridAlignment = (style) => {
        return style?.justifyContent || style?.justifyItems || style?.alignItems || style?.alignContent;
    }

    return {
        background: style?.backgroundColor,
        marginTop: style?.spacing?.margin?.top && convertVerticalBarSyntaxToCSS(style.spacing.margin.top),
        marginBottom: style?.spacing?.margin?.bottom && convertVerticalBarSyntaxToCSS(style.spacing.margin.bottom),
        paddingTop: style?.spacing?.padding?.top && convertVerticalBarSyntaxToCSS(style.spacing.padding.top),
        paddingBottom: style?.spacing?.padding?.bottom && convertVerticalBarSyntaxToCSS(style.spacing.padding.bottom),
        paddingLeft: style?.spacing?.padding?.left && convertVerticalBarSyntaxToCSS(style.spacing.padding.left),
        paddingRight: style?.spacing?.padding?.right && convertVerticalBarSyntaxToCSS(style.spacing.padding.right),
        width: style?.width,
        height: style?.height,
        display: hasGridAlignment(style) ? 'grid' : undefined,
        justifyItems: style?.justifyItems,
        alignItems: style?.alignItems,
        alignContent: style?.alignContent,
        gap: style?.gap
    }
}

/**
 * Get is-reversed class based on isReversed attribute
 * @param {boolean} isReversed 
 * @returns {string|undefined}
 */
export const getIsReversedClass = (isReversed) => isReversed ? 'is-reversed' : undefined;
