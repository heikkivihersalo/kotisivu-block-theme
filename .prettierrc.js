const defaultConfig = require('@wordpress/prettier-config');

/** @type {import("prettier").Config} */
module.exports = {
	...defaultConfig,
	bracketSpacing: false,
	printWidth: 80,
	singleQuote: true,
	trailingComma: "es5",
};