/**
 * Clean spaces in string
 * @param {string} str
 * @return {string} cleaned string
 */
function cleanSpaces(str: string): string {
	return str.replace(/\s+/g, ' ').trim();
}

/**
 * Add modifier to DOM element
 * @param {Function} setAttributes Function to set attributes
 * @param {string}  attributeKey   Block attribute key
 * @param {boolean} attributeValue Block attribute value
 * @param {string}  modifier       String (html class) you want to add to DOM element
 * @param {string}  elementName    Current class name where modifier will be added
 * @param {Object}  elementVal     Current class value
 */
function addModifiers(
	setAttributes: Function,
	attributeKey: string,
	attributeValue: boolean,
	modifier: string,
	elementName: string,
	elementVal: string
): void {
	let arr = elementVal.split(' ');

	setAttributes({ [attributeKey]: !attributeValue });

	if (attributeValue) {
		arr = arr.filter((item) => item !== modifier);
	} else {
		arr.push(modifier);
	}

	setAttributes({ [elementName]: cleanSpaces(arr.join(' ')) });
}

export { addModifiers };
