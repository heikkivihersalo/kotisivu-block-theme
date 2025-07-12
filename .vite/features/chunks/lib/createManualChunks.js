import {
	isReactModule,
	isWordPressEditorModule,
	isEditorFile,
	isSharedEditorUtility,
	isModuleUsedByEditor,
} from '../helpers.js';

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

		// Handle React packages - these should go to build root
		if (isReactModule(id)) {
			return 'react-runtime';
		}

		// Handle shared editor utilities - these should go to editor directory
		if (isSharedEditorUtility(id)) {
			return 'editor-dependencies';
		}

		// Handle WordPress editor packages
		if (isWordPressEditorModule(id)) {
			return 'wp-editor';
		}

		// Dynamically detect any dependency used by editor files
		if (isUsedByEditor(id)) {
			// Skip React dependencies - they should be externalized, but if bundled put in root
			if (id.includes('react')) {
				return 'react-runtime';
			}

			// WordPress editor packages
			if (isWordPressEditorModule(id)) {
				return 'wp-editor';
			}

			// Everything else used by editors goes into a general editor dependencies chunk
			return 'editor-dependencies';
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
			return 'react-runtime';
		}

		return null;
	};
}
