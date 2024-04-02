/**
 * Add modifier to DOM element
 * @param           props
 * @param {string}  attributeKey   Block attribute key
 * @param {boolean} attributeValue Block attribute value
 * @param {string}  modifier       String (html class) you want to add to DOM element
 * @param {string}  elementName    Current class name where modifier will be added
 * @param {Object}  elementVal     Current class value
 */
export const addModifiers = (props, attributeKey, attributeValue, modifier, elementName, elementVal) => (event) => {
    let arr = elementVal.split(" ");

    props.setAttributes({ [attributeKey]: !attributeValue });

    attributeValue
        ? arr = arr.filter(item => item !== modifier)
        : arr.push(modifier);

    props.setAttributes({ [elementName]: cleanSpaces(arr.join(" ")) });
}
