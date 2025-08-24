export const shimReactElement = () =>
	`const wpElement = window.wp.element;\nmodule.exports = wpElement;`;
export const shimJsxRuntime = () =>
	`const wpElement = window.wp.element;\nmodule.exports = {\n  jsx: wpElement.createElement,\n  jsxs: wpElement.createElement,\n  Fragment: wpElement.Fragment\n};`;
export const shimJsxDevRuntime = () =>
	`const wpElement = window.wp.element;\nmodule.exports = {\n  jsxDEV: wpElement.createElement,\n  Fragment: wpElement.Fragment\n};`;
export const shimWordPressModule = (globalName: string) =>
	`const wpModule = window.wp.${globalName};\nfor (const key in wpModule) {\n  if (Object.prototype.hasOwnProperty.call(wpModule, key)) {\n    exports[key] = wpModule[key];\n  }\n}`;
