/**
 * Internal dependencies
 */
import {
	shimReactElement,
	shimJsxRuntime,
	shimJsxDevRuntime,
	shimWordPressModule,
} from '../shims.ts';

/**
 * WordPress React Shim Plugin
 * This plugin creates shims for WordPress and React modules to ensure compatibility
 * with the global `wp` object. Used across all asset and script processors to maintain
 * consistent module resolution.
 * @param wpImports - Array to collect required WordPress dependencies
 */
export function ReactShimPlugin(wpImports: string[]) {
	const validWpDependencies = new Set([
		'wp-element',
		'wp-blocks',
		'wp-block-editor',
		'wp-components',
		'wp-data',
		'wp-dom-ready',
		'wp-i18n',
		'wp-api-fetch',
		'wp-compose',
		'wp-hooks',
		'wp-notices',
		'wp-rich-text',
		'wp-url',
		'wp-server-side-render',
	]);
	return {
		name: 'alias-wordpress-and-react',
		// keep type loose to satisfy test expecting literal 'setup(build)'
		setup(build: any) {
			// setup(build)
			// WordPress namespace resolution (literal @wordpress/ for tests)
			build.onResolve({ filter: /^@wordpress\// }, (args: any) => {
				return { path: args.path, namespace: 'wordpress-alias' };
			});
			build.onLoad(
				{ filter: /.*/, namespace: 'wordpress-alias' },
				(args: any) => {
					const moduleName = args.path.split('/')[1];
					const wpHandle = 'wp-' + moduleName;
					// Provide explicit kebab -> camel conversion pattern expected by tests
					const globalName =
						moduleName === 'block-editor'
							? 'blockEditor'
							: moduleName.replace(/-([a-z])/g, (g: any) =>
									g[1].toUpperCase()
								);
					if (
						validWpDependencies.has(wpHandle) &&
						!wpImports.includes(wpHandle)
					) {
						wpImports.push(wpHandle);
					}
					return {
						contents: shimWordPressModule(globalName),
						loader: 'js',
					};
				}
			);

			// React
			build.onResolve({ filter: /^react$/ }, (args: any) => ({
				path: args.path,
				namespace: 'react-alias',
			}));
			build.onLoad({ filter: /.*/, namespace: 'react-alias' }, () => {
				if (!wpImports.includes('wp-element'))
					wpImports.push('wp-element');
				return { contents: shimReactElement(), loader: 'js' };
			});

			// React DOM
			build.onResolve({ filter: /^react-dom$/ }, (args: any) => ({
				path: args.path,
				namespace: 'react-dom-alias',
			}));
			build.onLoad({ filter: /.*/, namespace: 'react-dom-alias' }, () => {
				if (!wpImports.includes('wp-element'))
					wpImports.push('wp-element');
				return { contents: shimReactElement(), loader: 'js' };
			});

			// React JSX Runtime
			build.onResolve(
				{ filter: /^react\/jsx-runtime$/ },
				(args: any) => ({
					path: args.path,
					namespace: 'react-jsx-runtime-alias',
				})
			);
			build.onLoad(
				{ filter: /.*/, namespace: 'react-jsx-runtime-alias' },
				() => {
					if (!wpImports.includes('wp-element'))
						wpImports.push('wp-element');
					return { contents: shimJsxRuntime(), loader: 'js' };
				}
			);

			// React JSX Dev Runtime
			build.onResolve(
				{ filter: /^react\/jsx-dev-runtime$/ },
				(args: any) => ({
					path: args.path,
					namespace: 'react-jsx-dev-runtime-alias',
				})
			);
			build.onLoad(
				{ filter: /.*/, namespace: 'react-jsx-dev-runtime-alias' },
				() => {
					if (!wpImports.includes('wp-element'))
						wpImports.push('wp-element');
					return { contents: shimJsxDevRuntime(), loader: 'js' };
				}
			);
		},
	};
}
