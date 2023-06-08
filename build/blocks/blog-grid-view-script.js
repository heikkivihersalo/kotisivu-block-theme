/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/dynamic/blog-grid/scripts/helpers.js":
/*!*********************************************************!*\
  !*** ./src/blocks/dynamic/blog-grid/scripts/helpers.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createErrorNode": () => (/* binding */ createErrorNode),
/* harmony export */   "createPostCardNode": () => (/* binding */ createPostCardNode),
/* harmony export */   "getPosts": () => (/* binding */ getPosts)
/* harmony export */ });
/**
 * Creates DOM element from given html string
 * @param {string} string 
 * @returns Given html string as a DOM element
 */
const createPostCardNode = string => {
  let element = document.createElement('div'); // Create temporary 'div' -element
  element.innerHTML = string;
  return element.firstChild.nextSibling; // exclude temporary div from return statement
};

/**
 * Creates DOM element from given string
 * @param {string} errorMessage 
 */
const createErrorNode = errorMessage => {
  let element = document.createElement('div');
  element.className = "blog-post-list__error-message";
  element.innerHTML = `<p>${errorMessage}</p>`;
  return element;
};

/**
 * Fetches posts from ajax
 * @param {*} { url, data, headers }
 * @return {*} 
 */
const getPosts = async _ref => {
  let {
    url,
    data,
    headers
  } = _ref;
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams(data).toString()
  });
  const posts = await response.json();
  return {
    posts: posts.posts,
    postCount: posts.post_count
  };
};

/**
 * Handle user requests about loading more blog posts
 * @return void
 */
function loadMoreBlogPosts() {
  /**
   * Helper functions
   */

  /**
   * Init variables
   */
  let postsLoaded = BLOG_POST_GRID.childElementCount; // Init to amount of child elements.

  /**
   * Send fetch request to ajax and update current page value
   */
  BLOG_LOAD_MORE.addEventListener('click', () => {
    /**
     * Fetch next posts
     */
    fetch(AJAX_URL, {
      method: 'POST',
      headers: headers,
      body: new URLSearchParams(data).toString()
    }).then(response => response.json()).then(data => {
      /**
       * Save response data
       */
      let posts = data.posts;
      let postCount = data.post_count;

      /** 
       * Insert to new post elements DOM
       */
      posts.forEach(post => {
        BLOG_POST_GRID.append(createPostCardNode(post.content));
        postsLoaded++;
      });

      /**
       * Update current page index
       */
      currentPage++;

      /**
       * Log succesful fetch
       */
      if (data.length == 0) {
        console.info(__('No more posts to fetch:', TEXTDOMAIN));
      } else {
        console.info(__('Posts fetched succesfully:', TEXTDOMAIN), posts);
      }

      /**
       * If reached end of the list hide add more button
       */
      if (postsLoaded == postCount) {
        BLOG_LOAD_MORE.disabled = true;
        BLOG_LOAD_MORE.setAttribute("aria-disabled", "true");
      }
    }).catch(error => {
      /**
       * Append error message to DOM
       */
      BLOG_POST_GRID.append(createErrorNode(__('Error while loading more posts', TEXTDOMAIN)));

      /**
       * Log error
       */
      console.error('Error:', error);
    });
  });
}


/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/*!**********************************************!*\
  !*** ./src/blocks/dynamic/blog-grid/view.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/helpers */ "./src/blocks/dynamic/blog-grid/scripts/helpers.js");




/**
 * Handle user requests about loading more blog posts
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  let elements = {
    container: document.getElementById("blog-post-container"),
    list: document.getElementById("blog-post-list"),
    cards: document.querySelectorAll(".blog-grid__item"),
    loadMore: document.getElementById("blog-load-more")
  };
  let counters = {
    postsLoaded: elements.list.childElementCount
  };
  let request = {
    url: PHP_VARIABLES.ajax_url,
    data: {
      action: 'load_more_posts',
      security: PHP_VARIABLES.ajax_nonce,
      paged: 2 // Init to 2 because first page is already loaded.
    },

    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };

  /**
   * Send fetch request to ajax and update current page value
   */
  elements.loadMore.addEventListener('click', async () => {
    try {
      //Get posts from ajax
      const data = await (0,_scripts_helpers__WEBPACK_IMPORTED_MODULE_2__.getPosts)(request);

      // Insert to new post elements DOM
      data.posts.forEach(post => {
        elements.list.append((0,_scripts_helpers__WEBPACK_IMPORTED_MODULE_2__.createPostCardNode)(post.content));
        counters.postsLoaded++;
      });

      //Update current page index
      request.data.paged++;

      //Log succesful fetch
      if (data.posts.length == 0) {
        console.info((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No more posts to fetch:', 'kotisivu-block-theme'));
      } else {
        console.info((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Posts fetched succesfully:', 'kotisivu-block-theme'), data.posts);
      }

      // If reached end of the list hide add more button
      if (counters.postsLoaded == data.postCount) {
        elements.loadMore.disabled = true;
        elements.loadMore.setAttribute("aria-disabled", "true");
      }
    } catch (err) {
      elements.list.append((0,_scripts_helpers__WEBPACK_IMPORTED_MODULE_2__.createErrorNode)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error while loading more posts', 'kotisivu-block-theme')));
      console.error('Error:', err);
    }
  });
});

/**
 * Handle post card clicks
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  elements.cards.forEach(card => {
    card.addEventListener("click", () => {
      window.location.assign(card.dataset.url);
    });
  });
});
})();

/******/ })()
;
//# sourceMappingURL=blog-grid-view-script.js.map