import { resolve, dirname, basename, extname } from 'path';
import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

/**
 * WordPress Gutenberg Blocks Vite Plugin
 *
 * This plugin scans for block.json files and creates appropriate build entries
 * for WordPress Gutenberg blocks with the correct file naming conventions.
 */
export default function gutenbergBlocksPlugin(options = {}) {
	const {
		blocksDir = 'resources/widgets/block-library',
		outputDir = 'blocks',
		copyBlockJson = true,
	} = options;

	return {
		name: 'gutenberg-blocks',
		config(config) {
			// Find all block.json files
			const blockJsonFiles = glob.sync(`${blocksDir}/**/block.json`);

			if (blockJsonFiles.length === 0) {
				console.warn('No block.json files found in', blocksDir);
				return;
			}

			// Create build entries for each block
			const input = {};

			blockJsonFiles.forEach((blockJsonPath) => {
				const blockDir = dirname(blockJsonPath);
				const blockName = basename(blockDir);

				// Read block.json to understand the structure
				const blockJson = JSON.parse(
					readFileSync(blockJsonPath, 'utf8')
				);

				// Check for main script file (index.ts, index.js, index.tsx, index.jsx)
				const indexFile = [
					'index.ts',
					'index.tsx',
					'index.js',
					'index.jsx',
				]
					.map((filename) => resolve(blockDir, filename))
					.find((filepath) => existsSync(filepath));

				if (indexFile) {
					input[`${blockName}/index`] = indexFile;
				}

				// Check for editor styles (editor.css)
				const editorCssFile = resolve(blockDir, 'editor.css');
				if (existsSync(editorCssFile)) {
					input[`${blockName}/index-editor`] = editorCssFile;
				}

				// Check for frontend styles (style.css)
				const styleCssFile = resolve(blockDir, 'style.css');
				if (existsSync(styleCssFile)) {
					input[`${blockName}/style-index`] = styleCssFile;
				}
			});

			// Update Vite config
			config.build = {
				...config.build,
				rollupOptions: {
					input,
					output: {
						dir: outputDir,
						entryFileNames: '[name].js',
						assetFileNames: '[name].[ext]',
						chunkFileNames: '[name].js',
					},
					external: [
						// WordPress externals
						'@wordpress/blocks',
						'@wordpress/block-editor',
						'@wordpress/components',
						'@wordpress/compose',
						'@wordpress/core-data',
						'@wordpress/data',
						'@wordpress/element',
						'@wordpress/i18n',
						'@wordpress/notices',
						'@wordpress/server-side-render',
						'@wordpress/api-fetch',
						'@wordpress/url',
						'@wordpress/html-entities',
						'@wordpress/rich-text',
						'@wordpress/editor',
						'@wordpress/plugins',
						'@wordpress/edit-post',
						'@wordpress/date',
						'@wordpress/keycodes',
						'@wordpress/primitives',
						'@wordpress/icons',
						'react',
						'react-dom',
						'lodash',
						'moment',
						'jquery',
					],
				},
			};
		},

		generateBundle(options, bundle) {
			if (!copyBlockJson) return;

			// Copy block.json files to output directory
			const blockJsonFiles = glob.sync(`${blocksDir}/**/block.json`);

			blockJsonFiles.forEach((blockJsonPath) => {
				const blockDir = dirname(blockJsonPath);
				const blockName = basename(blockDir);
				const blockJsonContent = readFileSync(blockJsonPath, 'utf8');

				// Add block.json to bundle
				this.emitFile({
					type: 'asset',
					fileName: `${blockName}/block.json`,
					source: blockJsonContent,
				});

				// Copy render.php if it exists
				const renderPhpPath = resolve(blockDir, 'render.php');
				if (existsSync(renderPhpPath)) {
					const renderPhpContent = readFileSync(
						renderPhpPath,
						'utf8'
					);
					this.emitFile({
						type: 'asset',
						fileName: `${blockName}/render.php`,
						source: renderPhpContent,
					});
				}
			});
		},
	};
}
