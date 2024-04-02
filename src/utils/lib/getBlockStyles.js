/**
 * Check if the style object has grid alignment properties
 * @param {Object} style - Current block styles
 * @return {boolean} True if the style object has grid alignment properties
 */
function checkGridAlignment(style) {
    return style?.justifyContent || style?.justifyItems || style?.alignItems || style?.alignContent;
}

/**
 * Get and convert the block styles to correct object
 * @param {Object} style - Current block styles
 * @return {Object} Block style object
 */
function getBlockStyles(style) {
    const convertVerticalBarSyntaxToCSS = (string) => {
        if (string === "0") return undefined;
        const val = string.split(":")[1].trim();
        return `var(--wp--${val.replaceAll("|", "--")})`;
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
        display: checkGridAlignment(style) ? 'grid' : undefined,
        justifyItems: style?.justifyItems,
        alignItems: style?.alignItems,
        alignContent: style?.alignContent,
        gap: style?.gap
    }
}

export { getBlockStyles }