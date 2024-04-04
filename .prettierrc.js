const defaultConfig = require('@wordpress/prettier-config');

/** @type {import("prettier").Config} */
module.exports = {
	...defaultConfig,
	bracketSpacing: true,
	printWidth: 80,
	singleQuote: true,
	trailingComma: 'es5',
};
