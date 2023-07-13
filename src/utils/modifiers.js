/**
 * Clean extra spaces from string
 * @param {string} string 
 * @returns Cleaned string wihout extra spaces
 */
export const cleanSpaces = (string) => {
    return string.replace(/\s+/g, ' ').trim();
}

/**
 * Add modifier to DOM element
 * @param {string} attributeKey Block attribute key
 * @param {boolean} attributeValue Block attribute value
 * @param {string} modifier String (html class) you want to add to DOM element
 * @param {string} elementName Current class name where modifier will be added
 * @param {object} elementVal Current class value
 */
export const addModifiers = (props, attributeKey, attributeValue, modifier, elementName, elementVal) => (event) => {
    let arr = elementVal.split(" ");

    props.setAttributes({ [attributeKey]: !attributeValue });

    attributeValue
        ? arr = arr.filter(item => item != modifier)
        : arr.push(modifier);

    props.setAttributes({ [elementName]: cleanSpaces(arr.join(" ")) });
}

/**
 * Add alignment modifier to DOM element
 * @param {string} attributeKey Block attribute key
 * @param {boolean} attributeValue Block attribute value
 * @param {string} modifier String (html class) you want to add to DOM element
 * @param {string} elementName Current class name where modifier will be added
 * @param {object} elementVal Current class value
 */
export const setLCR = (props, attributeKey = 'alignment', attributeValue, modifier, elementName, elementVal) => (event) => {
    /* Split current card class into an array */
    let arr = elementVal.split(" ");

    props.setAttributes({ [attributeKey]: attributeValue });

    /* Clear previous alignments */
    arr = arr.filter(item => (item != "is-left" && item != "is-center" && item != "is-right"))

    /* Align item */
    arr.push("is-" + modifier);

    props.setAttributes({ [elementName]: cleanSpaces(arr.join(" ")) });

}

export const setReverseAlignment = () => {
    
}

export const convertVerticalBarSyntaxToCSS = (string) => {
    /**
     * Guard clauses
     */
    if (string == "0") return undefined; // Some error in the editor attributes causes string to be 0

    // if (typeof string !== 'string' || !(string instanceof String)) return console.log("Not a string");
    
    let val = string.split(":")[1].trim();
    return "var(--wp--" + val.replaceAll("|", "--") + ")";
}
