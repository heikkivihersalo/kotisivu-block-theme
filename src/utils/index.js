/**
 * Utility functions
 * =================
 * 
 * 
 * 
 * @author Heikki Vihersalo
 * @link https://www.kotisivu.dev
 */


/**
 * Get and convert the block styles to correct object
 * @param {object} style Block style attributes
 * @returns {object} Block style object
 */
export function getBlockSyles({ style }) {
    const convertVerticalBarSyntaxToCSS = (string) => {
        /**
         * Guard clauses
         */
        if (string == "0") return undefined; // Some error in the editor attributes causes string to be 0

        // if (typeof string !== 'string' || !(string instanceof String)) return console.log("Not a string");

        let val = string.split(":")[1].trim();
        return "var(--wp--" + val.replaceAll("|", "--") + ")";
    }

    return {
        background: style.backgroundColor ? style.backgroundColor : undefined,
        marginTop: style?.spacing?.margin?.top ? convertVerticalBarSyntaxToCSS(style.spacing.margin.top) : undefined,
        marginBottom: style?.spacing?.margin?.bottom ? convertVerticalBarSyntaxToCSS(style.spacing.margin.bottom) : undefined,
        paddingTop: style?.spacing?.padding?.top ? convertVerticalBarSyntaxToCSS(style.spacing.padding.top) : undefined,
        paddingBottom: style?.spacing?.padding?.bottom ? convertVerticalBarSyntaxToCSS(style.spacing.padding.bottom) : undefined,
        paddingLeft: style?.spacing?.padding?.left ? convertVerticalBarSyntaxToCSS(style.spacing.padding.left) : undefined,
        paddingRight: style?.spacing?.padding?.right ? convertVerticalBarSyntaxToCSS(style.spacing.padding.right) : undefined,
        width: style?.width ? style?.width : undefined,
        justifyItems: style?.justifyItems ? style?.justifyItems : undefined,
        alignItems: style?.alignItems ? style?.alignItems : undefined
    }
}

/**
 * Get is-reversed class based on isReversed attribute
 * @param {boolean} isReversed 
 * @returns {string|boolean}
 */
export const getIsReversedClass = (isReversed) => {
    if (isReversed) {
        return 'is-reversed';
    }
    return false;
}
