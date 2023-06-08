/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/dynamic/navigation-header/scripts/helpers.js":
/*!*****************************************************************!*\
  !*** ./src/blocks/dynamic/navigation-header/scripts/helpers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeMobileMenu": () => (/* binding */ closeMobileMenu),
/* harmony export */   "openMobileMenu": () => (/* binding */ openMobileMenu),
/* harmony export */   "setStickyHeader": () => (/* binding */ setStickyHeader)
/* harmony export */ });
/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
1.0 Mobile Menu Toggle
  1.1 Add listener for opening mobile menu
  1.2 Add listener for closing mobile menu
2.0 Sticky Header
  2.1 Set class for sticky header
3.0 Exports
--------------------------------------------------------------*/

/*--------------------------------------------------------------
  1.0 Mobile Toggle
--------------------------------------------------------------*/
/**
 * Add listener for opening mobile menu
 * @param {*} { container, toggle }
 * @return void
 */
const openMobileMenu = _ref => {
  let {
    header,
    toggle
  } = _ref;
  const currentState = toggle.getAttribute("data-state");
  if (!currentState || currentState === "closed") {
    toggle.setAttribute("data-state", "opened");
    toggle.setAttribute("aria-expanded", "true");
  } else {
    toggle.setAttribute("data-state", "closed");
    toggle.setAttribute("aria-expanded", "false");
  }
  header.classList.toggle("active");
};

/**
 * Add listener for closing mobile menu
 * @param {*} { container, toggle, links }
 * @return void
 */
const closeMobileMenu = _ref2 => {
  let {
    header,
    toggle,
    links
  } = _ref2;
  links.forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("active");
      toggle.classList.remove("active");
    });
  });
};

/*--------------------------------------------------------------
  2.0 Sticky Header
--------------------------------------------------------------*/
/**
 * Set class for sticky header
 * @return void
 */
const setStickyHeader = elements => {
  const {
    target,
    isIntersecting
  } = elements[0];
  if (isIntersecting) {
    target.classList.remove("sticky");
  } else {
    target.classList.add("sticky");
  }
};

/*--------------------------------------------------------------
  3.0 Exports
--------------------------------------------------------------*/



/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************************************!*\
  !*** ./src/blocks/dynamic/navigation-header/view.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/helpers */ "./src/blocks/dynamic/navigation-header/scripts/helpers.js");


_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  /**
   * Get DOM elements
   */
  const elements = {
    header: document.getElementsByTagName("header")[0],
    toggle: document.getElementsByClassName("site-nav__toggle")[0],
    links: document.querySelectorAll(".site-nav__menu a"),
    stickyOptions: {
      threshold: 1.0,
      rootMargin: '200px'
    }
  };

  /** 
   * Set listener for opening mobile menu
   */
  elements.toggle.addEventListener("click", () => {
    (0,_scripts_helpers__WEBPACK_IMPORTED_MODULE_1__.openMobileMenu)(elements);
  });

  /** 
   * Set listener for closing mobile menu
   */
  elements.links.forEach(link => {
    link.addEventListener("click", () => {
      (0,_scripts_helpers__WEBPACK_IMPORTED_MODULE_1__.closeMobileMenu)(elements);
    });
  });

  /**
   * Set observer for sticky header
   */
  let stickyThreshold = elements.stickyOptions.threshold;
  let stickyMargin = elements.stickyOptions.rootMargin;
  const headerObserver = new IntersectionObserver(elements => {
    (0,_scripts_helpers__WEBPACK_IMPORTED_MODULE_1__.setStickyHeader)(elements);
  }, {
    threshold: stickyThreshold,
    rootMargin: stickyMargin
  });
  headerObserver.observe(elements.header);
});
})();

/******/ })()
;
//# sourceMappingURL=navigation-header-view-script.js.map