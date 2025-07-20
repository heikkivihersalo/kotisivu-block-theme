/**
 * Generate a PHP asset file with dependencies and version hash.
 *
 * @param {Set<string> | string[]} dependencies - Set or array of dependencies.
 * @param {string} [hash=''] - Version hash for the asset.
 * @return {string} PHP code as a string that returns an array with dependencies and version
 */
export const generatePhpAssetFile = (
	dependencies: Set<string> | string[] = [],
	hash = ''
) => {
	return `<?php return ["dependencies" => ${JSON.stringify(Array.from(dependencies))}, "version" => "${hash}"];`;
};
