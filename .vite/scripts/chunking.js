/**
 * Checks if a module is used by editor files
 * @param {string} moduleId - Module ID to check
 * @param {Function} getModuleInfo - Function to get module information
 * @param {Set} visited - Set of already visited modules to prevent infinite recursion
 * @returns {boolean} True if module is used by editor files
 */
export function isModuleUsedByEditor(
	moduleId,
	getModuleInfo,
	visited = new Set()
) {
	if (visited.has(moduleId)) return false;
	visited.add(moduleId);

	const moduleInfo = getModuleInfo(moduleId);
	if (!moduleInfo) return false;

	// Direct check - is this directly imported by an editor file?
	const hasDirectEditorImporter = moduleInfo.importers?.some(
		(importer) =>
			importer.includes('editor.') ||
			importer.includes('/editor/') ||
			importer.includes('editor-styles')
	);

	if (hasDirectEditorImporter) return true;

	// Recursive check - are any of the importers used by editor files?
	return (
		moduleInfo.importers?.some((importer) =>
			isModuleUsedByEditor(importer, getModuleInfo, visited)
		) || false
	);
}

/**
 * Creates manual chunks configuration for Rollup
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} editorOutputDir - Output directory for editor dependencies
 * @returns {Function} Manual chunks function for Rollup configuration
 */
/**
 * Creates manual chunks configuration for Rollup
 * @returns {Function} Manual chunks function for Rollup configuration
 */
export function createManualChunks() {
	return (id, { getModuleInfo }) => {
		// Helper function to check if a module is used by editor files
		const isUsedByEditor = (moduleId, visited = new Set()) => {
			return isModuleUsedByEditor(moduleId, getModuleInfo, visited);
		};

		// Special handling for React and root files - these should go to build root
		if (
			id.includes('jsx-dev-runtime') ||
			id.includes('jsx-runtime') ||
			id.includes('react/index')
		) {
			return 'root-assets/react-runtime';
		}

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
			// Skip React dependencies - they should be externalized, but if bundled put in root
			if (id.includes('react')) {
				return 'root-assets/react-runtime';
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
				return 'root-assets/react-runtime';
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
			return 'root-assets/react-runtime';
		}

		return null;
	};
}

/**
 * Creates chunk file names configuration for Rollup
 * @returns {Function} Chunk file names function for Rollup configuration
 */
export function createChunkFileNames() {
	return (chunkInfo) => {
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
			const hasDirectEditorImporter = moduleInfo.importers?.some(
				(importer) =>
					importer.includes('editor.') ||
					importer.includes('/editor/') ||
					importer.includes('editor-styles')
			);

			if (hasDirectEditorImporter) return true;

			// Recursive check - are any of the importers used by editor files?
			return (
				moduleInfo.importers?.some((importer) =>
					isModuleUsedByEditor(importer, getModuleInfo, visited)
				) || false
			);
		};

		// Dynamically check if ANY module in this chunk is used by editor files
		const isEditorChunk = chunkInfo.moduleIds?.some((moduleId) => {
			// Skip if we can't get module info (use a mock function for compatibility)
			try {
				// For now, do basic path-based detection since getModuleInfo might not be available
				// Check if module path indicates it's from an editor file or commonly used by editors
				return (
					moduleId.includes('editor.') ||
					moduleId.includes('/editor/') ||
					moduleId.includes('editor-styles') ||
					moduleId.includes('classnames') ||
					moduleId.includes('clsx') ||
					moduleId.includes('@wordpress/block-editor') ||
					moduleId.includes('@wordpress/components') ||
					moduleId.includes('@wordpress/compose') ||
					moduleId.includes('@wordpress/rich-text') ||
					moduleId.includes('@wordpress/editor') ||
					// Check for internal project chunks that might be editor-related
					(moduleId.includes('resources/widgets') &&
						(moduleId.includes('editor') ||
							moduleId.includes('Editor'))) ||
					// Check for any shared utility from project that contains editor patterns
					(moduleId.includes('resources/shared') &&
						(moduleId.includes('editor') ||
							moduleId.includes('Editor') ||
							moduleId.includes('block') ||
							moduleId.includes('Block')))
				);
			} catch (e) {
				return false;
			}
		});

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

		// Check if this is a root asset that should go to build root
		if (
			chunkInfo.name &&
			(chunkInfo.name.includes('root-assets') ||
				chunkInfo.name.includes('react-runtime') ||
				chunkInfo.name.includes('jsx-dev-runtime') ||
				chunkInfo.name.includes('jsx-runtime'))
		) {
			return '[name].js';
		}

		// Check if chunk name already includes editor paths
		if (
			chunkInfo.name &&
			(chunkInfo.name.includes('wp-editor') ||
				chunkInfo.name.includes('editor-utils') ||
				chunkInfo.name.includes('project-utils') ||
				chunkInfo.name.includes('project-misc') ||
				chunkInfo.name.includes('misc'))
		) {
			return '[name].js';
		}

		// Move editor-related chunks to editor-deps folder
		if (isEditorChunk || isEditorUtilityChunk) {
			return 'editor-deps/[name].js';
		}

		return '[name].js';
	};
}
