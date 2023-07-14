/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/dynamic/site-header/scripts/helpers.js":
/*!***********************************************************!*\
  !*** ./src/blocks/dynamic/site-header/scripts/helpers.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeMobileMenu": () => (/* binding */ closeMobileMenu),
/* harmony export */   "getStickyHeaderPadding": () => (/* binding */ getStickyHeaderPadding),
/* harmony export */   "getStickyHeaderWidth": () => (/* binding */ getStickyHeaderWidth),
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
const getStickyHeaderPadding = scroll => {
  return scroll <= 100 ? 50 - scroll / 4 : 25;
};
const getStickyHeaderWidth = scroll => {
  return scroll <= 100 ? 30 - scroll / 5 : 10;
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
/*!************************************************!*\
  !*** ./src/blocks/dynamic/site-header/view.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/helpers */ "./src/blocks/dynamic/site-header/scripts/helpers.js");


_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  // ========================
  // ====== CONSTANTS =======
  // ========================

  const NAV_CONTAINER = document.getElementsByTagName("header")[0];
  const NAV_MOBILE_TOGGLE = document.getElementsByClassName("header__toggle")[0];
  const NAV_LINKS = document.querySelectorAll(".wp-block-pages-list__item");

  // ========================
  // ====== FUNCTIONS =======
  // ========================

  /**
   * Enable sticky header
   * @return void
   */
  function enableStickyHeader() {
    if (!NAV_CONTAINER) return;
    document.addEventListener("scroll", () => {
      /* Set opacity to 0 to animate sticky transition */
      window.scrollY > 100 ? NAV_CONTAINER.classList.add("sticky-opacity") : NAV_CONTAINER.classList.remove("sticky-opacity");

      /* Set position to 'sticky' for sticky header */
      window.scrollY > 500 ? NAV_CONTAINER.classList.add("sticky-header") : NAV_CONTAINER.classList.remove("sticky-header");
    });
  }

  /**
   * Add listener for opening mobile menu
   * @return void
   */
  function openMobileMenu() {
    if (!NAV_CONTAINER) return;
    NAV_MOBILE_TOGGLE.addEventListener("click", () => {
      const currentState = NAV_MOBILE_TOGGLE.getAttribute("data-state");
      if (!currentState || currentState === "closed") {
        NAV_MOBILE_TOGGLE.setAttribute("data-state", "opened");
        NAV_MOBILE_TOGGLE.setAttribute("aria-expanded", "true");
      } else {
        NAV_MOBILE_TOGGLE.setAttribute("data-state", "closed");
        NAV_MOBILE_TOGGLE.setAttribute("aria-expanded", "false");
      }
      NAV_CONTAINER.classList.toggle("active");
    });
  }

  /**
   * Add listener for closing mobile menu
   * @return void
   */
  function closeMobileMenu() {
    if (!NAV_CONTAINER) return;
    NAV_LINKS.forEach(link => {
      link.addEventListener("click", () => {
        NAV_CONTAINER.classList.remove("active");
        NAV_MOBILE_TOGGLE.classList.remove("active");
      });
    });
  }

  // ========================
  // ========= INIT =========
  // ========================

  (async () => {
    try {
      /**
       * Mobile menu
       */
      enableStickyHeader();
      openMobileMenu();
      closeMobileMenu();
    } catch (err) {
      console.error(err);
    }
  })();
});
})();

/******/ })()
;
//# sourceMappingURL=site-header-view-script.js.map