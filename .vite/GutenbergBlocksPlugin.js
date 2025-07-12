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
		editorOutputDir = 'editor',
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

				// Check for editor-specific files
				const editorFiles = [
					'editor.ts',
					'editor.tsx',
					'editor.js',
					'editor.jsx',
				]
					.map((filename) => resolve(blockDir, filename))
					.find((filepath) => existsSync(filepath));

				if (editorFiles) {
					input[`${blockName}/editor`] = editorFiles;
				}

				// Check for editor styles (editor.css)
				const editorCssFile = resolve(blockDir, 'editor.css');
				if (existsSync(editorCssFile)) {
					input[`${blockName}/editor-styles`] = editorCssFile;
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
						format: 'es',
						globals: {
							// WordPress packages
							'@wordpress/blocks': 'wp.blocks',
							'@wordpress/block-editor': 'wp.blockEditor',
							'@wordpress/components': 'wp.components',
							'@wordpress/compose': 'wp.compose',
							'@wordpress/core-data': 'wp.coreData',
							'@wordpress/data': 'wp.data',
							'@wordpress/element': 'wp.element',
							'@wordpress/i18n': 'wp.i18n',
							'@wordpress/notices': 'wp.notices',
							'@wordpress/server-side-render':
								'wp.serverSideRender',
							'@wordpress/api-fetch': 'wp.apiFetch',
							'@wordpress/url': 'wp.url',
							'@wordpress/html-entities': 'wp.htmlEntities',
							'@wordpress/rich-text': 'wp.richText',
							'@wordpress/editor': 'wp.editor',
							'@wordpress/plugins': 'wp.plugins',
							'@wordpress/edit-post': 'wp.editPost',
							'@wordpress/date': 'wp.date',
							'@wordpress/keycodes': 'wp.keycodes',
							'@wordpress/primitives': 'wp.primitives',
							'@wordpress/icons': 'wp.icons',

							// React - provided by WordPress via wp.element
							react: 'wp.element',
							'react-dom': 'wp.element',
							'react/jsx-runtime': 'wp.element',
							'react/jsx-dev-runtime': 'wp.element',

							// Third-party libraries
							lodash: 'lodash',
							moment: 'moment',
							jquery: 'jQuery',
						},
						chunkFileNames: (chunkInfo) => {
							// Helper function to check if a module is used by editor files (same logic as manualChunks)
							const isModuleUsedByEditor = (
								moduleId,
								getModuleInfo,
								visited = new Set()
							) => {
								if (visited.has(moduleId)) return false;
								visited.add(moduleId);

								const moduleInfo = getModuleInfo(moduleId);
								if (!moduleInfo) return false;

								// Direct check - is this directly imported by an editor file?
								const hasDirectEditorImporter =
									moduleInfo.importers?.some(
										(importer) =>
											importer.includes('editor.') ||
											importer.includes('/editor/') ||
											importer.includes('editor-styles')
									);

								if (hasDirectEditorImporter) return true;

								// Recursive check - are any of the importers used by editor files?
								return (
									moduleInfo.importers?.some((importer) =>
										isModuleUsedByEditor(
											importer,
											getModuleInfo,
											visited
										)
									) || false
								);
							};

							// Dynamically check if ANY module in this chunk is used by editor files
							const isEditorChunk = chunkInfo.moduleIds?.some(
								(moduleId) => {
									// Skip if we can't get module info (use a mock function for compatibility)
									try {
										// Create a mock getModuleInfo function for chunkFileNames context
										const mockGetModuleInfo = (id) => {
											// This is a simplified version - in practice, we might not have full access here
											// but we can still do basic path-based checks
											return null;
										};

										// For now, do basic path-based detection since getModuleInfo might not be available
										// Check if module path indicates it's from an editor file or commonly used by editors
										return (
											moduleId.includes('editor.') ||
											moduleId.includes('/editor/') ||
											moduleId.includes(
												'editor-styles'
											) ||
											moduleId.includes('classnames') ||
											moduleId.includes('clsx') ||
											moduleId.includes(
												'@wordpress/block-editor'
											) ||
											moduleId.includes(
												'@wordpress/components'
											) ||
											moduleId.includes(
												'@wordpress/compose'
											) ||
											moduleId.includes(
												'@wordpress/rich-text'
											) ||
											moduleId.includes(
												'@wordpress/editor'
											) ||
											// Check for internal project chunks that might be editor-related
											(moduleId.includes(
												'resources/widgets'
											) &&
												(moduleId.includes('editor') ||
													moduleId.includes(
														'Editor'
													))) ||
											// Check for any shared utility from project that contains editor patterns
											(moduleId.includes(
												'resources/shared'
											) &&
												(moduleId.includes('editor') ||
													moduleId.includes(
														'Editor'
													) ||
													moduleId.includes(
														'block'
													) ||
													moduleId.includes('Block')))
										);
									} catch (e) {
										return false;
									}
								}
							);

							// Check if chunk name suggests it's editor-related
							const isEditorUtilityChunk =
								chunkInfo.name &&
								(chunkInfo.name.includes('variation') ||
									chunkInfo.name.includes('Variation') ||
									chunkInfo.name.includes('innerBlocks') ||
									chunkInfo.name.includes('InnerBlocks') ||
									chunkInfo.name.includes('gapControls') ||
									chunkInfo.name.includes('GapControls') ||
									chunkInfo.name.includes('blockEditor') ||
									chunkInfo.name.includes('BlockEditor') ||
									chunkInfo.name.includes('Appender') ||
									chunkInfo.name.includes('appender') ||
									chunkInfo.name.includes('Picker') ||
									chunkInfo.name.includes('picker') ||
									chunkInfo.name.includes('Controls') ||
									chunkInfo.name.includes('controls') ||
									chunkInfo.name.includes('Metadata') ||
									chunkInfo.name.includes('metadata') ||
									chunkInfo.name.includes('editor') ||
									chunkInfo.name.includes('Editor') ||
									chunkInfo.name.includes('block') ||
									chunkInfo.name.includes('Block'));

							// Check if chunk name already includes editor-deps
							if (
								chunkInfo.name &&
								chunkInfo.name.includes('editor-deps/')
							) {
								return '[name].js';
							}

							// Move editor-related chunks to editor-deps folder
							if (isEditorChunk || isEditorUtilityChunk) {
								return `editor-deps/[name].js`;
							}

							return '[name].js';
						},
						manualChunks: (id, { getModuleInfo }) => {
							// Helper function to check if a module is used by editor files
							const isUsedByEditor = (
								moduleId,
								visited = new Set()
							) => {
								if (visited.has(moduleId)) return false;
								visited.add(moduleId);

								const moduleInfo = getModuleInfo(moduleId);
								if (!moduleInfo) return false;

								// Direct check - is this directly imported by an editor file?
								const hasDirectEditorImporter =
									moduleInfo.importers?.some(
										(importer) =>
											importer.includes('editor.') ||
											importer.includes('/editor/') ||
											importer.includes('editor-styles')
									);

								if (hasDirectEditorImporter) return true;

								// Recursive check - are any of the importers used by editor files?
								return (
									moduleInfo.importers?.some((importer) =>
										isUsedByEditor(importer, visited)
									) || false
								);
							};

							// Group editor-specific WordPress dependencies
							if (
								id.includes('@wordpress/block-editor') ||
								id.includes('@wordpress/components') ||
								id.includes('@wordpress/compose') ||
								id.includes('@wordpress/rich-text') ||
								id.includes('@wordpress/editor')
							) {
								return 'editor-deps/wp-editor';
							}

							// Dynamically detect any dependency used by editor files (anywhere: node_modules or project)
							if (isUsedByEditor(id)) {
								// Skip React dependencies - they should be externalized
								if (id.includes('react')) {
									return null;
								}

								// Categorize WordPress editor-specific packages
								if (
									id.includes('@wordpress/block-editor') ||
									id.includes('@wordpress/components') ||
									id.includes('@wordpress/compose') ||
									id.includes('@wordpress/rich-text') ||
									id.includes('@wordpress/editor')
								) {
									return 'editor-deps/wp-editor';
								}

								// Categorize React DOM utilities used by editor - but only if not externalized
								if (id.includes('react-dom')) {
									return null; // Should be externalized
								}

								// Categorize known utility libraries (both node_modules and project)
								if (
									id.includes('classnames') ||
									id.includes('clsx') ||
									id.includes('lodash') ||
									id.includes('uuid') ||
									id.includes('prop-types') ||
									id.includes('react-transition-group') ||
									id.includes('react-modal') ||
									id.includes('react-select') ||
									id.includes('downshift') ||
									id.includes('reakit') ||
									id.includes('framer-motion') ||
									id.includes('use-')
								) {
									return 'editor-deps/editor-utils';
								}

								// Group project-specific shared utilities used by editor
								if (
									id.includes('resources/shared') ||
									id.includes('resources/app') ||
									id.includes('/shared/') ||
									id.includes('/app/')
								) {
									return 'editor-deps/project-utils';
								}

								// Group any node_modules dependency used by editor (catch-all)
								if (
									id.includes('/node_modules/') &&
									!id.includes('@wordpress/') &&
									!id.includes('react')
								) {
									return 'editor-deps/misc';
								}

								// Group any other project dependency used by editor
								if (!id.includes('/node_modules/')) {
									return 'editor-deps/project-misc';
								}
							}

							// Group common WordPress dependencies (only if NOT externalized)
							if (id.includes('@wordpress/')) {
								return 'wp-deps';
							}

							// React dependencies should be externalized, not bundled
							// If React somehow gets here, it means externalization failed
							if (id.includes('react')) {
								console.warn(
									`React dependency ${id} should be externalized but is being bundled. Check externals config.`
								);
								return null; // Let it be externalized instead of bundled
							}

							return null;
						},
					},
					external: (id) => {
						// WordPress packages - accessed via global wp object
						const wpPackages = [
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
						];

						// Check for WordPress packages
						if (
							wpPackages.some(
								(pkg) => id === pkg || id.startsWith(pkg + '/')
							)
						) {
							return true;
						}

						// React packages - provided by WordPress via wp.element
						if (
							id === 'react' ||
							id === 'react-dom' ||
							id.startsWith('react/') ||
							id.includes('react/jsx-runtime') ||
							id.includes('react/jsx-dev-runtime') ||
							id.includes('node_modules/react/')
						) {
							return true;
						}

						// Third-party libraries provided by WordPress
						if (
							id === 'lodash' ||
							id === 'moment' ||
							id === 'jquery'
						) {
							return true;
						}

						return false;
					},
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
