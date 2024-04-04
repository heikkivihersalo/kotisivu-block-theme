/**
 * Clean spaces in string
 * @param {string} str
 * @return {string} cleaned string
 */
function cleanSpaces(str) {
	return str.replace(/\s+/g, ' ').trim();
}

/**
 * Add modifier to DOM element
 * @param {Object}  props          Current block properties
 * @param {string}  attributeKey   Block attribute key
 * @param {boolean} attributeValue Block attribute value
 * @param {string}  modifier       String (html class) you want to add to DOM element
 * @param {string}  elementName    Current class name where modifier will be added
 * @param {Object}  elementVal     Current class value
 */
function addModifiers(
	props,
	attributeKey,
	attributeValue,
	modifier,
	elementName,
	elementVal
) {
	let arr = elementVal.split(' ');

	props.setAttributes({ [attributeKey]: !attributeValue });

	if (attributeValue) {
		arr = arr.filter((item) => item !== modifier);
	} else {
		arr.push(modifier);
	}

	props.setAttributes({ [elementName]: cleanSpaces(arr.join(' ')) });
}

export { addModifiers };
