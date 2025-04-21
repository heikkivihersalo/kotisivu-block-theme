/**
 * Convert value to WordPress variable
 * @param {string} val Spacing value
 * @param {Array<{ value: number; label: string }>} marks Spacing marks
 * @return {string} WordPress spacing variable formatted string
 */
function convertValueToSpacingVariable(
	val: number | undefined,
	marks: Array<{
		value: number;
		label: string;
	}>
): string | undefined {
	if (!val) {
		return undefined;
	}

	return (
		'var(--wp--preset--spacing--' +
		marks.find((mark) => mark.value === val)?.label +
		')'
	);
}

/**
 * Convert variable to value
 * @param {string} variable WordPress spacing variable formatted string
 * @param {Array<{ value: number; label: string }>} marks Spacing marks
 * @return {number|undefined} Spacing value
 */
function convertVariableToValue(
	variable: string | undefined,
	marks: Array<{ value: number; label: string }>
): number | undefined {
	if (!variable) {
		return undefined;
	}

	return marks.find(
		(mark) => mark.label === parseInt(variable.split('--')[4]).toString()
	)?.value;
}

export { convertValueToSpacingVariable, convertVariableToValue };
