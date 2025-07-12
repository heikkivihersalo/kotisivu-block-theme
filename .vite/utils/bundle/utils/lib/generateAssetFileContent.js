/**
 * Generates WordPress asset file content
 * @param {string[]} dependencies - Array of WordPress dependencies
 * @param {string} version - Version hash for the file
 * @returns {string} PHP asset file content
 */
export function generateAssetFileContent(dependencies, version) {
	const depsString = dependencies.map((dep) => `'${dep}'`).join(', ');
	return `<?php return array('dependencies' => array(${depsString}), 'version' => '${version}');`;
}
