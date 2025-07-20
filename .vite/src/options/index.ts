import type { InputOptions, ExternalOption, OutputOptions } from 'rollup';
import { WORDPRESS_MATCH, EXTERNALS, NS } from '../../constants.ts';

/**
 * Returns a custom global resolver that maps external libraries and objects to their `window` counterparts
 *
 * @param options - The Rollup input options to modify
 * @return A function that resolves global identifiers for external libraries
 */
export function options(options: InputOptions) {
	if (Array.isArray(options.external) === false) {
		// If string, RegExp or function
		options.external = [options.external].filter(Boolean) as ExternalOption;
	}

	if (Array.isArray(options.external)) {
		options.external = options.external.concat(Object.keys(EXTERNALS));
		options.external.push(WORDPRESS_MATCH);
	}

	return options;
}

/**
 * Returns a custom global resolver that maps external libraries and objects to their `window` counterparts
 *
 * @param outputOptions - The Rollup output options to modify
 * @return A function that resolves global identifiers for external libraries
 */
export function outputOptions(outputOptions: OutputOptions) {
	// Save the original resolver so we can use it for files we're not interested in
	const configGlobals = outputOptions.globals;

	const resolveGlobals = (id: string) => {
		// options.globals is an object - defer to it
		if (
			typeof configGlobals === 'object' &&
			configGlobals.hasOwnProperty(id) &&
			configGlobals[id]
		) {
			return configGlobals[id];
		}

		// options.globals is a function - defer to it
		if (typeof configGlobals === 'function') {
			const configGlobalId = configGlobals(id);

			if (configGlobalId && configGlobalId !== id) {
				return configGlobalId;
			}
		}

		// see if it's a static wp external
		if (EXTERNALS.hasOwnProperty(id) && EXTERNALS[id]) {
			return EXTERNALS[id];
		}

		if (WORDPRESS_MATCH.test(id)) {
			// convert @namespace/component-name to namespace.componentName
			return id
				.replace(new RegExp(`^${NS}`), 'wp.')
				.replace(/\//g, '.')
				.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
		}

		return '';
	};

	outputOptions.globals = resolveGlobals;
}
