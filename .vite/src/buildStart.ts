import type { EmittedAsset } from './generateBundle.js';
import type { WordpressBlockJson } from './transform.js';
import {
	generateFileHash,
	generatePhpAssetFile,
	extractFilenameWithoutExtension,
} from './utils.js';
import { build as esBuild } from 'esbuild';
import { resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

const normaliseArray = (source: unknown) =>
	Array.isArray(source) ? source : [source];

/**
 * Find the actual file path considering different extensions
 * Supports .js, .jsx, .ts, .tsx extensions
 */
const findActualFilePath = (basePath: string, fileName: string) => {
	// If the file exists as specified, return it
	const originalPath = resolve(basePath, fileName);
	if (existsSync(originalPath)) {
		return originalPath;
	}

	// Try different extensions
	const extensions = ['.js', '.jsx', '.ts', '.tsx'];
	const nameWithoutExt = fileName.replace(/\.(js|jsx|ts|tsx)$/, '');

	for (const ext of extensions) {
		const testPath = resolve(basePath, nameWithoutExt + ext);
		if (existsSync(testPath)) {
			return testPath;
		}
	}

	return null;
};

/**
 * Find the actual style file path considering different extensions and filename patterns
 * Supports .css, .scss, .sass, .less extensions
 */
const findActualStylePath = (basePath: string, fileName: string) => {
	// If the file exists as specified, return it
	const originalPath = resolve(basePath, fileName);
	if (existsSync(originalPath)) {
		return originalPath;
	}

	// Try different extensions on the original filename
	const extensions = ['.css', '.scss', '.sass', '.less'];
	const nameWithoutExt = fileName.replace(/\.(css|scss|sass|less)$/, '');

	for (const ext of extensions) {
		const testPath = resolve(basePath, nameWithoutExt + ext);
		if (existsSync(testPath)) {
			return testPath;
		}
	}

	// Try common WordPress block filename patterns
	const commonPatterns = [];

	// If looking for index.css, try multiple alternatives
	if (fileName === 'index.css') {
		commonPatterns.push('editor', 'style', 'index');
	}

	// If looking for style-index.css, try multiple alternatives
	if (fileName === 'style-index.css') {
		commonPatterns.push('style', 'style-index', 'index');
	}

	// Try the common patterns with all extensions
	for (const pattern of commonPatterns) {
		for (const ext of extensions) {
			const testPath = resolve(basePath, pattern + ext);
			if (existsSync(testPath)) {
				return testPath;
			}
		}
	}

	return null;
};

export async function sideload(
	blockJson: WordpressBlockJson,
	outputDirectory: string,
	blockPath?: string,
	blockName?: string,
	customOutputPath?: string
) {
	// Default to PWD/src if no blockPath is provided (for backward compatibility)
	const basePath = blockPath || `${process.env.PWD}/src`;

	// Use custom output path if provided, otherwise use block name or default
	const outputPath = customOutputPath || blockName;
	const blockOutputDir = customOutputPath
		? resolve(process.env.PWD || process.cwd(), 'build', customOutputPath)
		: outputPath
			? resolve(outputDirectory, '..', outputPath)
			: outputDirectory;

	// Load all script and style assets from block.json
	const viewScript = blockJson?.viewScript ?? [];
	const standardScript = blockJson?.script ?? [];
	const editorScript = blockJson?.editorScript ?? [];
	const editorStyle = blockJson?.editorStyle ?? [];
	const style = blockJson?.style ?? [];
	const viewStyle = blockJson?.viewStyle ?? [];

	// Normalise into arrays
	const standardScripts = normaliseArray(standardScript);
	const viewScripts = normaliseArray(viewScript);
	const editorScripts = normaliseArray(editorScript);
	const editorStyles = normaliseArray(editorStyle);
	const styles = normaliseArray(style);
	const viewStyles = normaliseArray(viewStyle);

	// Combine all script files
	const concatScripts = viewScripts
		.concat(standardScripts)
		.concat(editorScripts)
		.filter((script) => script.startsWith('file'))
		.map((script) => {
			return script.replace('file:./', '');
		});

	// Combine all style files
	const concatStyles = editorStyles
		.concat(styles)
		.concat(viewStyles)
		.filter((style) => style.startsWith('file'))
		.map((style) => {
			return style.replace('file:./', '');
		});

	for (const script of concatScripts) {
		const actualScriptPath = findActualFilePath(basePath, script);

		if (!actualScriptPath) {
			console.warn(
				`Warning: Script file not found: ${script} (tried .js, .jsx, .ts, .tsx extensions in ${basePath})`
			);
			continue;
		}

		// Vite won't track this file for watching, so we'll add a manual watcher
		this.addWatchFile(actualScriptPath);
		const wpImports: string[] = [];
		// Build the script as a sideloaded file that isn't injected into the main bundle
		const result = await esBuild({
			entryPoints: [actualScriptPath],
			outfile: blockOutputDir + '/' + script,
			platform: 'browser',
			bundle: true,
			write: false,
			metafile: true,
			loader: {
				'.js': 'jsx',
				'.jsx': 'jsx',
				'.ts': 'tsx',
				'.tsx': 'tsx',
			},
			target: 'es2020',
			jsx: 'transform',
			jsxFactory: 'wp.element.createElement',
			jsxFragment: 'wp.element.Fragment',
			plugins: [
				{
					name: 'alias-wordpress',
					setup(build) {
						// Intercept @wordpress/* paths
						build.onResolve({ filter: /^@wordpress\// }, (args) => {
							return {
								path: args.path,
								namespace: 'wordpress-alias',
							};
						});

						// Generate a shim for @wordpress/* imports
						build.onLoad(
							{ filter: /.*/, namespace: 'wordpress-alias' },
							(args) => {
								const moduleName = args.path.split('/')[1];

								// Skip @wordpress/icons as it's not a WordPress core dependency
								// Icons should be bundled with the block or handled separately
								if (moduleName === 'icons') {
									return {
										contents: `
											console.warn('@wordpress/icons should be bundled with your block or replaced with individual icon imports');
											exports.default = {};
										`,
										loader: 'js',
									};
								}

								// Convert kebab-case to camelCase for WordPress globals
								const globalName = moduleName.replace(
									/-./g,
									(x) => x[1].toUpperCase()
								);
								wpImports.push('wp-' + moduleName);
								return {
									contents: `
                const wpModule = window.wp.${globalName};
                for (const key in wpModule) {
                  if (Object.prototype.hasOwnProperty.call(wpModule, key)) {
                    exports[key] = wpModule[key];
                  }
                }
              `,
									loader: 'js',
								};
							}
						);
					},
				},
			],
		});

		const bundledDependencies = Object.keys(result.metafile.inputs).filter(
			(dep) => {
				if (dep === 'src/' + script) return false;
				if (/:/.test(dep)) return false;
				else return true;
			}
		);

		bundledDependencies.forEach((dep) => {
			this.addWatchFile(dep);
		});

		result.outputFiles.forEach((file) => {
			const hash = generateFileHash(file.text);
			const filename = extractFilenameWithoutExtension(script);

			// Create block-specific file paths
			const assetFileName = outputPath
				? `${outputPath}/${filename}.asset.php`
				: `${filename}.asset.php`;
			const scriptFileName = outputPath
				? `${outputPath}/${script}`
				: script;

			this.emitFile({
				type: 'asset',
				fileName: assetFileName,
				source: generatePhpAssetFile(wpImports, hash),
			} satisfies EmittedAsset);
			this.emitFile({
				type: 'asset',
				fileName: scriptFileName,
				source: file.contents,
			} satisfies EmittedAsset);
		});
	}

	// Process style files
	for (const styleFile of concatStyles) {
		const actualStylePath = findActualStylePath(basePath, styleFile);

		if (!actualStylePath) {
			console.warn(
				`Warning: Style file not found: ${styleFile} (tried .css, .scss, .sass, .less extensions in ${basePath})`
			);
			continue;
		}

		// Vite won't track this file for watching, so we'll add a manual watcher
		this.addWatchFile(actualStylePath);

		try {
			// For CSS files, we can read them directly and emit them
			const cssContent = readFileSync(actualStylePath, 'utf-8');

			// Create block-specific file path
			const styleFileName = outputPath
				? `${outputPath}/${styleFile}`
				: styleFile;

			this.emitFile({
				type: 'asset',
				fileName: styleFileName,
				source: cssContent,
			} satisfies EmittedAsset);
		} catch (error) {
			console.warn(
				`Warning: Could not process style file ${actualStylePath}:`,
				error
			);
		}
	}

	return true;
}
