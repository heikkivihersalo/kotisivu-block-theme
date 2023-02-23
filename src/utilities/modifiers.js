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
