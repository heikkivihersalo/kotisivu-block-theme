/**
 * Creates manual chunks configuration for Rollup
 * @returns {Function} Manual chunks function for Rollup configuration
 */
export function createManualChunks() {
	return (id, { getModuleInfo }) => {
		// Disable chunking - let WordPress handle dependencies in registration process
		// All dependencies should be bundled into the respective index.js files
		return null;
	};
}
