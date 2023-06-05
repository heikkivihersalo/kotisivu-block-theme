/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/assets/styles/theme.css":
/*!*************************************!*\
  !*** ./src/assets/styles/theme.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/core/image/utils/index.js":
/*!**********************************************!*\
  !*** ./src/blocks/core/image/utils/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBlockSizeClass": () => (/* reexport safe */ _lib_getBlockSizeClass__WEBPACK_IMPORTED_MODULE_0__.getBlockSizeClass),
/* harmony export */   "initBlockStyles": () => (/* reexport safe */ _lib_initBlockStyles__WEBPACK_IMPORTED_MODULE_2__.initBlockStyles),
/* harmony export */   "updateBlockMarkup": () => (/* reexport safe */ _lib_updateBlockMarkup__WEBPACK_IMPORTED_MODULE_1__.updateBlockMarkup)
/* harmony export */ });
/* harmony import */ var _lib_getBlockSizeClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/getBlockSizeClass */ "./src/blocks/core/image/utils/lib/getBlockSizeClass.js");
/* harmony import */ var _lib_updateBlockMarkup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/updateBlockMarkup */ "./src/blocks/core/image/utils/lib/updateBlockMarkup.js");
/* harmony import */ var _lib_initBlockStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/initBlockStyles */ "./src/blocks/core/image/utils/lib/initBlockStyles.js");




/***/ }),

/***/ "./src/blocks/core/image/utils/lib/getBlockSizeClass.js":
/*!**************************************************************!*\
  !*** ./src/blocks/core/image/utils/lib/getBlockSizeClass.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBlockSizeClass": () => (/* binding */ getBlockSizeClass)
/* harmony export */ });
/**
 * Returns the block size class name.
 * @param {string} slug
 */
function getBlockSizeClass(slug) {
    switch (slug) {
        case 'full':
            return 'size-full';
        case 'large':
            return 'size-large';
        case 'medium_large':
            return 'size-medium_large';
        case 'medium':
            return 'size-medium';
        case 'thumbnail':
            return 'size-thumbnail';
        default:
            return '';
    }
};



/***/ }),

/***/ "./src/blocks/core/image/utils/lib/initBlockStyles.js":
/*!************************************************************!*\
  !*** ./src/blocks/core/image/utils/lib/initBlockStyles.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initBlockStyles": () => (/* binding */ initBlockStyles)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Init block styles, unregister default styles and register custom styles
 * @return {void}
 */
function initBlockStyles(styles = []) {
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unregisterBlockStyle)('core/image', 'default');
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unregisterBlockStyle)('core/image', 'rounded');

    styles.forEach((style) => {
        (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockStyle)('core/image', style);
    });
}




/***/ }),

/***/ "./src/blocks/core/image/utils/lib/updateBlockMarkup.js":
/*!**************************************************************!*\
  !*** ./src/blocks/core/image/utils/lib/updateBlockMarkup.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateBlockMarkup": () => (/* binding */ updateBlockMarkup)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./src/blocks/core/image/utils/index.js");
/**
 * WordPress dependencies
 */



/**
 * Custom dependencies
 */



/**
 * Update block markup
 *
 * @param {*} element
 * @param {*} blockType
 * @param {*} attributes
 * @return {*} 
 */
function updateBlockMarkup(element, blockType, attributes) {
    /**
     * Guard clauses
     */
    if (!element || blockType.name !== 'core/image') return element;
    if (!element?.props?.children?.props?.children[0]) return element;
    if (attributes.caption || attributes?.href) return element;

    /** 
     * Get the image props
     */
    const { props: {
        className,
        src,
        title,
        alt,
        height,
        width,
        style
    } } = element.props.children.props.children[0];

    /** 
     * If image doesn't have figcaption, create image element
     */
    const imageBlock = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('wp-block-image', className, (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getBlockSizeClass)(attributes?.sizeSlug)),
        src,
        title,
        alt,
        height,
        width,
        style
    });

    /**
     * Return image block
     */
    return imageBlock;
}



/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "./src/blocks/core/buttons/styles.json":
/*!*********************************************!*\
  !*** ./src/blocks/core/buttons/styles.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"default","label":"Default","isDefault":true},{"name":"secondary","label":"Secondary"}]');

/***/ }),

/***/ "./src/blocks/core/image/styles.json":
/*!*******************************************!*\
  !*** ./src/blocks/core/image/styles.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"default","label":"Default","isDefault":true}]');

/***/ }),

/***/ "./src/blocks/core/list/styles.json":
/*!******************************************!*\
  !*** ./src/blocks/core/list/styles.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"default","label":"Default","isDefault":true}]');

/***/ }),

/***/ "./src/blocks/core/separator/styles.json":
/*!***********************************************!*\
  !*** ./src/blocks/core/separator/styles.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"default","label":"Default","isDefault":true}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./src/assets/scripts/theme.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_theme_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/theme.css */ "./src/assets/styles/theme.css");


})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./src/blocks/core/buttons/index.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.json */ "./src/blocks/core/buttons/styles.json");
/**
 * WordPress dependencies
 */



/**
 * Other dependencies
 */


/**
 * Run on DOM ready
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
    /**
     * Unregister default button styles
     */
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.unregisterBlockStyle)('core/button', 'outline');
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.unregisterBlockStyle)('core/button', 'fill');

    console.log(_styles_json__WEBPACK_IMPORTED_MODULE_2__);

    /**
     * Register custom button styles
     */
    _styles_json__WEBPACK_IMPORTED_MODULE_2__.forEach((style) => {
        (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockStyle)('core/button', style);
    });
});
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./src/blocks/core/image/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/blocks/core/image/utils/index.js");
/* harmony import */ var _styles_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.json */ "./src/blocks/core/image/styles.json");

/**
 * WordPress dependencies
 */



/**
 * Other dependencies
 */




/**
 * Filters
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)(
    'blocks.getSaveElement',
    'ksd/image',
    _utils__WEBPACK_IMPORTED_MODULE_2__.updateBlockMarkup
);

/**
 * Run on DOM ready
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.initBlockStyles)(_styles_json__WEBPACK_IMPORTED_MODULE_3__);
});

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!***************************************!*\
  !*** ./src/blocks/core/list/index.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.json */ "./src/blocks/core/list/styles.json");
/**
 * WordPress dependencies
 */



/**
 * Other dependencies
 */


/**
 * Run on DOM ready
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
    /**
     * Register custom button styles
     */
    _styles_json__WEBPACK_IMPORTED_MODULE_2__.forEach((style) => {
        (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockStyle)('core/list', style);
    });
});
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************************!*\
  !*** ./src/blocks/core/separator/index.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.json */ "./src/blocks/core/separator/styles.json");



/**
 * Other dependencies
 */


/**
 * Run on DOM ready
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
    /**
     * Unregister default button styles
     */
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.unregisterBlockStyle)('core/separator', 'default');
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.unregisterBlockStyle)('core/separator', 'wide');
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.unregisterBlockStyle)('core/separator', 'dots');

    /**
     * Register custom button styles
     */
    _styles_json__WEBPACK_IMPORTED_MODULE_2__.forEach((style) => {
        (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockStyle)('core/separator', style);
    });
});
})();

/******/ })()
;
//# sourceMappingURL=theme.js.map