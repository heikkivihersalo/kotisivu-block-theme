const DEFAULT_EXPORT_FUNCTIONS = ['domReady', 'apiFetch'];

export const shimReactElement = () =>
	`const wpElement = window.wp.element;\nmodule.exports = wpElement;`;
export const shimJsxRuntime = () =>
	`const wpElement = window.wp.element;\nmodule.exports = {\n  jsx: wpElement.createElement,\n  jsxs: wpElement.createElement,\n  Fragment: wpElement.Fragment\n};`;
export const shimJsxDevRuntime = () =>
	`const wpElement = window.wp.element;\nmodule.exports = {\n  jsxDEV: wpElement.createElement,\n  Fragment: wpElement.Fragment\n};`;
export const shimWordPressModule = (globalName: string) => {
	// Special handling for domReady which exports the function as default
	if (DEFAULT_EXPORT_FUNCTIONS.includes(globalName)) {
		return `const wpModule = window.wp.${globalName};\nmodule.exports = wpModule;\nmodule.exports.default = wpModule;`;
	}

	return `const wpModule = window.wp.${globalName};\nfor (const key in wpModule) {\n  if (Object.prototype.hasOwnProperty.call(wpModule, key)) {\n    exports[key] = wpModule[key];\n  }\n}`;
};
