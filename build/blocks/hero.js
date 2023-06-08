/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/link-off.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/link-off.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const linkOff = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M15.6 7.3h-.7l1.6-3.5-.9-.4-3.9 8.5H9v1.5h2l-1.3 2.8H8.4c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7H10V7.3H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H9l-1.4 3.2.9.4 5.7-12.5h1.4c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (linkOff);
//# sourceMappingURL=link-off.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/link.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/link.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const link = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (link);
//# sourceMappingURL=link.js.map

/***/ }),

/***/ "./src/blocks/static/hero/components/Inspector.js":
/*!********************************************************!*\
  !*** ./src/blocks/static/hero/components/Inspector.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _features_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @features/image */ "./src/features/image/index.js");
/* harmony import */ var _features_inspector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @features/inspector */ "./src/features/inspector/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);






const Inspector = props => {
  const {
    attributes: {
      hasBackgroundImage
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Hero Settings", "kotisivu-block-theme"),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_features_inspector__WEBPACK_IMPORTED_MODULE_4__.BackgroundImage, props)), hasBackgroundImage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_features_image__WEBPACK_IMPORTED_MODULE_3__.ImageSelectorSidebar, props));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inspector);

/***/ }),

/***/ "./src/blocks/static/hero/edit.js":
/*!****************************************!*\
  !*** ./src/blocks/static/hero/edit.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _features_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @features/image */ "./src/features/image/index.js");
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _components_Inspector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Inspector */ "./src/blocks/static/hero/components/Inspector.js");
/* harmony import */ var _editor_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.css */ "./src/blocks/static/hero/editor.css");








const Edit = props => {
  const {
    attributes: {
      modifiers,
      hasBackgroundImage,
      heroClass
    },
    clientId
  } = props;
  const template = [['ksd/image-optimized', {
    className: 'hero__logo'
  }], ['core/heading', {
    level: 1,
    className: 'hero__heading'
  }], ['ksd/image-optimized', {
    className: 'hero__decorative-image'
  }], ['ksd/image-optimized', {
    className: 'hero__decorative-image--arch'
  }]];
  const allowedBlocks = [['ksd/image-optimized']['core/heading']];
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    className: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_5__.cleanSpaces)(`${heroClass} ${modifiers}`)
  });

  /**
   * Get render appender
   */
  const {
    hasChildBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const {
      getBlockOrder
    } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
    return {
      hasChildBlocks: getBlockOrder(clientId).length > 0
    };
  }, [clientId]);
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useInnerBlocksProps)({
    ...blockProps
  }, {
    template: template,
    templateLock: "all",
    allowedBlocks,
    renderAppender: hasChildBlocks ? undefined : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks.ButtonBlockAppender
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inspector__WEBPACK_IMPORTED_MODULE_6__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero__container"
  }, innerBlocksProps.children), hasBackgroundImage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_features_image__WEBPACK_IMPORTED_MODULE_4__.ImageMarkup, props)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/static/hero/index.js":
/*!*****************************************!*\
  !*** ./src/blocks/static/hero/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "settings": () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/static/hero/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/static/hero/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/static/hero/block.json");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/blocks/static/hero/style.css");






const {
  apiVersion,
  name,
  title,
  category,
  icon,
  description,
  keywords,
  textdomain,
  supports
} = _block_json__WEBPACK_IMPORTED_MODULE_4__;
const settings = {
  apiVersion: apiVersion,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(title, 'kotisivu-block-theme'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(description, 'kotisivu-block-theme'),
  category: category,
  icon: icon,
  supports: supports,
  keywords: keywords,
  textdomain: textdomain,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"],
  getEditWrapperProps() {
    return {
      'data-align': 'full'
    };
  }
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(name, settings);

/***/ }),

/***/ "./src/blocks/static/hero/save.js":
/*!****************************************!*\
  !*** ./src/blocks/static/hero/save.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _features_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @features/image */ "./src/features/image/index.js");
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils/modifiers */ "./src/utils/modifiers.js");





const Save = props => {
  const {
    attributes: {
      hasBackgroundImage,
      modifiers,
      heroClass
    }
  } = props;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
    className: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_4__.cleanSpaces)(`${heroClass} ${modifiers}`)
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null)), hasBackgroundImage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_features_image__WEBPACK_IMPORTED_MODULE_3__.ImageMarkup, props));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Save);

/***/ }),

/***/ "./src/features/image/index.js":
/*!*************************************!*\
  !*** ./src/features/image/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageMarkup": () => (/* reexport safe */ _lib_imageMarkup__WEBPACK_IMPORTED_MODULE_0__.ImageMarkup),
/* harmony export */   "ImageSelector": () => (/* reexport safe */ _lib_imageSelector__WEBPACK_IMPORTED_MODULE_1__.ImageSelector),
/* harmony export */   "ImageSelectorSidebar": () => (/* reexport safe */ _lib_imageSelectorSidebar__WEBPACK_IMPORTED_MODULE_2__.ImageSelectorSidebar)
/* harmony export */ });
/* harmony import */ var _lib_imageMarkup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/imageMarkup */ "./src/features/image/lib/imageMarkup.js");
/* harmony import */ var _lib_imageSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/imageSelector */ "./src/features/image/lib/imageSelector.js");
/* harmony import */ var _lib_imageSelectorSidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/imageSelectorSidebar */ "./src/features/image/lib/imageSelectorSidebar.js");
/**
 * Images
 */




/***/ }),

/***/ "./src/features/image/lib/common/img.js":
/*!**********************************************!*\
  !*** ./src/features/image/lib/common/img.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const Img = props => {
  const {
    attributes: {
      className,
      mediaUrl,
      mediaAlt,
      mediaWidth,
      mediaHeight,
      lazyLoad
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    loading: `${lazyLoad ? "lazy" : "eager"}`,
    className: className,
    src: mediaUrl,
    alt: mediaAlt,
    width: `${mediaWidth ? `${mediaWidth}px` : ''}`,
    height: `${mediaHeight ? `${mediaHeight}px` : ''}`
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Img);

/***/ }),

/***/ "./src/features/image/lib/common/inspector/button.js":
/*!***********************************************************!*\
  !*** ./src/features/image/lib/common/inspector/button.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/index */ "./src/features/image/lib/utilities/index.js");




const Button = props => {
  const {
    attributes: {
      mediaId
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => (0,_utilities_index__WEBPACK_IMPORTED_MODULE_3__.setImage)(media, props),
    allowedTypes: "image",
    value: mediaId,
    render: _ref => {
      let {
        open
      } = _ref;
      return (0,_utilities_index__WEBPACK_IMPORTED_MODULE_3__.getImage)(props, open);
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./src/features/image/lib/common/inspector/fullWidth.js":
/*!**************************************************************!*\
  !*** ./src/features/image/lib/common/inspector/fullWidth.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../utils/modifiers */ "./src/utils/modifiers.js");




const FullWidth = props => {
  const {
    attributes: {
      isFullWidth,
      className
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Full Width", "kotisivu-theme-blocks"),
    checked: isFullWidth,
    onChange: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_3__.addModifiers)(props, "isFullWidth", isFullWidth, "is-full-width", "className", className)
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FullWidth);

/***/ }),

/***/ "./src/features/image/lib/common/inspector/lazyLoad.js":
/*!*************************************************************!*\
  !*** ./src/features/image/lib/common/inspector/lazyLoad.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



const Lazyload = props => {
  const {
    attributes: {
      lazyLoad
    },
    setAttributes
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
    className: "image-block-buttons__lazy-load"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Lazy Load", "kotisivu-theme-blocks"),
    checked: lazyLoad,
    onChange: () => setAttributes({
      lazyLoad: !lazyLoad
    })
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lazyload);

/***/ }),

/***/ "./src/features/image/lib/common/inspector/preview.js":
/*!************************************************************!*\
  !*** ./src/features/image/lib/common/inspector/preview.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/index */ "./src/features/image/lib/utilities/index.js");
/* harmony import */ var _lazyLoad__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lazyLoad */ "./src/features/image/lib/common/inspector/lazyLoad.js");






const Preview = props => {
  const {
    attributes: {
      mediaId
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-block-buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-block-buttons__update"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.setImage)(media, props),
    allowedTypes: "image",
    value: mediaId,
    render: _ref => {
      let {
        open
      } = _ref;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        onClick: open,
        isDefault: true,
        isLarge: true
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change image', 'kotisivu-block-theme'));
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    onClick: (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.removeImage)(props),
    isLink: true,
    isDestructive: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove image', 'kotisivu-block-theme')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_lazyLoad__WEBPACK_IMPORTED_MODULE_5__["default"], props));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Preview);

/***/ }),

/***/ "./src/features/image/lib/common/inspector/sidebar.js":
/*!************************************************************!*\
  !*** ./src/features/image/lib/common/inspector/sidebar.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utilities_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/index */ "./src/features/image/lib/utilities/index.js");





const Sidebar = props => {
  const {
    attributes: {
      mediaId
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "editor-post-featured-image"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.setImage)(media, props),
    allowedTypes: "image",
    value: mediaId,
    render: _ref => {
      let {
        open
      } = _ref;
      return (0,_utilities_index__WEBPACK_IMPORTED_MODULE_4__.getImage)(props, open);
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);

/***/ }),

/***/ "./src/features/image/lib/common/srcset.js":
/*!*************************************************!*\
  !*** ./src/features/image/lib/common/srcset.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const SrcSet = props => {
  const {
    attributes: {
      className,
      mediaSrcSet,
      mediaSrcSizes,
      mediaUrl,
      mediaAlt,
      mediaWidth,
      mediaHeight,
      lazyLoad
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    loading: `${lazyLoad ? "lazy" : "eager"}`,
    className: className,
    srcSet: mediaSrcSet,
    sizes: mediaSrcSizes,
    src: mediaUrl,
    alt: mediaAlt,
    width: `${mediaWidth ? `${mediaWidth}px` : ''}`,
    height: `${mediaHeight ? `${mediaHeight}px` : ''}`
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SrcSet);

/***/ }),

/***/ "./src/features/image/lib/imageMarkup.js":
/*!***********************************************!*\
  !*** ./src/features/image/lib/imageMarkup.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageMarkup": () => (/* binding */ ImageMarkup)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_img__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/img */ "./src/features/image/lib/common/img.js");
/* harmony import */ var _common_srcset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/srcset */ "./src/features/image/lib/common/srcset.js");




/**
 * 
 * @param {*} props 
 * @returns 
 */
const ImageMarkup = props => {
  const {
    attributes: {
      mediaMime
    },
    srcset,
    img
  } = props;

  /**
   * Force desired image format
   */
  if (srcset) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_srcset__WEBPACK_IMPORTED_MODULE_2__["default"], props);
  }
  if (img) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_img__WEBPACK_IMPORTED_MODULE_1__["default"], props);
  }

  /**
   * Load default behaviour
   */
  return mediaMime == "image/svg+xml" ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_img__WEBPACK_IMPORTED_MODULE_1__["default"], props) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_srcset__WEBPACK_IMPORTED_MODULE_2__["default"], props);
};


/***/ }),

/***/ "./src/features/image/lib/imageSelector.js":
/*!*************************************************!*\
  !*** ./src/features/image/lib/imageSelector.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageSelector": () => (/* binding */ ImageSelector)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_inspector_preview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/inspector/preview */ "./src/features/image/lib/common/inspector/preview.js");
/* harmony import */ var _common_inspector_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/inspector/button */ "./src/features/image/lib/common/inspector/button.js");



const ImageSelector = props => {
  const {
    attributes: {
      mediaUrl
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_inspector_button__WEBPACK_IMPORTED_MODULE_2__["default"], props), mediaUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_inspector_preview__WEBPACK_IMPORTED_MODULE_1__["default"], props));
};


/***/ }),

/***/ "./src/features/image/lib/imageSelectorSidebar.js":
/*!********************************************************!*\
  !*** ./src/features/image/lib/imageSelectorSidebar.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageSelectorSidebar": () => (/* binding */ ImageSelectorSidebar)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_inspector_preview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/inspector/preview */ "./src/features/image/lib/common/inspector/preview.js");
/* harmony import */ var _common_inspector_lazyLoad__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/inspector/lazyLoad */ "./src/features/image/lib/common/inspector/lazyLoad.js");
/* harmony import */ var _common_inspector_fullWidth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/inspector/fullWidth */ "./src/features/image/lib/common/inspector/fullWidth.js");
/* harmony import */ var _common_inspector_sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/inspector/sidebar */ "./src/features/image/lib/common/inspector/sidebar.js");







const ImageSelectorSidebar = props => {
  const {
    attributes: {
      mediaUrl
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select background image", "kotisivu-block-theme"),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_inspector_sidebar__WEBPACK_IMPORTED_MODULE_6__["default"], props), mediaUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_inspector_preview__WEBPACK_IMPORTED_MODULE_3__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_inspector_fullWidth__WEBPACK_IMPORTED_MODULE_5__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_inspector_lazyLoad__WEBPACK_IMPORTED_MODULE_4__["default"], props));
};


/***/ }),

/***/ "./src/features/image/lib/utilities/functions/getImage.js":
/*!****************************************************************!*\
  !*** ./src/features/image/lib/utilities/functions/getImage.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getImage": () => (/* binding */ getImage)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _features_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @features/image */ "./src/features/image/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _placeholder_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../placeholder.png */ "./src/features/image/placeholder.png");






/**
 * Get image markup for block
 * @param {*} props 
 * @param {*} openEvent 
 * @returns 
 */
const getImage = (props, openEvent) => {
  const {
    attributes: {
      className,
      mediaUrl,
      mediaAlt,
      mediaMime
    }
  } = props;

  /**
   *  If no image is selected, return 'upload image' button
   */
  if (!mediaUrl) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "button-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: openEvent,
      className: "button button-large"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick a image', 'kotisivu-block-theme')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      class: "image-placeholder",
      src: _placeholder_png__WEBPACK_IMPORTED_MODULE_4__
    })));
  }

  /**
   * If image is svg, return correct markup for svg image
   */
  if (mediaMime == "image/svg+xml") {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      className: className,
      src: mediaUrl,
      alt: mediaAlt
    });
  }
  ;

  /**
   * Return markup for image element
   */
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_features_image__WEBPACK_IMPORTED_MODULE_2__.ImageMarkup, props);
};


/***/ }),

/***/ "./src/features/image/lib/utilities/functions/removeImage.js":
/*!*******************************************************************!*\
  !*** ./src/features/image/lib/utilities/functions/removeImage.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeImage": () => (/* binding */ removeImage)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Remove attributes from the given element
 * @param {*} props 
 */
const removeImage = props => event => {
  props.setAttributes({
    mediaUrl: '',
    mediaId: 0,
    mediaAlt: '',
    mediaMime: '',
    mediaWidth: '',
    mediaHeight: '',
    mediaSrcset: '',
    sizes: []
  });
};


/***/ }),

/***/ "./src/features/image/lib/utilities/functions/setImage.js":
/*!****************************************************************!*\
  !*** ./src/features/image/lib/utilities/functions/setImage.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setImage": () => (/* binding */ setImage)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


/**
 * 
 * @param {*} sizes 
 * @returns 
 */
const convertToSrcSet = sizes => {
  return sizes.slice(0).reverse().map((size, index) => {
    let width = size.width;
    let url = size.url;
    return `${url} ${width}w`;
  }).join(', ');
};

/**
 * 
 * @param {*} sizes 
 * @returns 
 */
const convertToSizes = sizes => {
  const sizesReverse = sizes.slice(0).reverse();
  return sizesReverse.map((size, index) => {
    return index == sizesReverse.length - 1 ? `${size.width}px` : `(max-width: ${size.width}px) ${size.width}px`;
  }).join(', ');
};

/**
 * 
 * @param {*} obj 
 * @returns 
 */
const getImageSizes = obj => {
  const sizes = Object.entries(obj).map((_ref, index) => {
    let [key, value] = _ref;
    return {
      id: index,
      name: key,
      url: value.url,
      width: value.width,
      height: value.height
    };
  });

  /* Sort images from largest to smallest */
  sizes[0].width >= sizes[0].height ? sizes.sort((a, b) => b.width - a.width) /* Image orientation is horizontal */ : sizes.sort((a, b) => b.height - a.height); /* Image orientation is vertical */

  return sizes;
};

/**
 * 
 * @param {*} media 
 * @param {*} props 
 */
const setImage = (media, props) => {
  /* If image is svg, set svg properties correctly */
  if (media.mime == "image/svg+xml") {
    props.setAttributes({
      mediaUrl: media.url,
      mediaId: media.id,
      mediaAlt: media.alt,
      mediaMime: media.mime
    });
    return;
  }

  /* Get image sizes from WordPress */
  const imageSizes = getImageSizes(media.sizes);

  /* Set attributes for image block */
  props.setAttributes({
    mediaUrl: media.url,
    mediaId: media.id,
    mediaAlt: media.alt,
    mediaMime: media.mime,
    mediaWidth: media.width,
    mediaHeight: media.height,
    mediaSrcSet: convertToSrcSet(imageSizes),
    mediaSrcSizes: convertToSizes(imageSizes)
  });
};


/***/ }),

/***/ "./src/features/image/lib/utilities/index.js":
/*!***************************************************!*\
  !*** ./src/features/image/lib/utilities/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getImage": () => (/* reexport safe */ _functions_getImage__WEBPACK_IMPORTED_MODULE_0__.getImage),
/* harmony export */   "removeImage": () => (/* reexport safe */ _functions_removeImage__WEBPACK_IMPORTED_MODULE_1__.removeImage),
/* harmony export */   "setImage": () => (/* reexport safe */ _functions_setImage__WEBPACK_IMPORTED_MODULE_2__.setImage)
/* harmony export */ });
/* harmony import */ var _functions_getImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/getImage */ "./src/features/image/lib/utilities/functions/getImage.js");
/* harmony import */ var _functions_removeImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/removeImage */ "./src/features/image/lib/utilities/functions/removeImage.js");
/* harmony import */ var _functions_setImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/setImage */ "./src/features/image/lib/utilities/functions/setImage.js");




/***/ }),

/***/ "./src/features/inspector/index.js":
/*!*****************************************!*\
  !*** ./src/features/inspector/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlignmentButtons": () => (/* reexport safe */ _lib_alignmentButtons__WEBPACK_IMPORTED_MODULE_0__.AlignmentButtons),
/* harmony export */   "AlignmentReverse": () => (/* reexport safe */ _lib_alignmentReverse__WEBPACK_IMPORTED_MODULE_1__.AlignmentReverse),
/* harmony export */   "BackgroundColor": () => (/* reexport safe */ _lib_backgroundColor__WEBPACK_IMPORTED_MODULE_2__.BackgroundColor),
/* harmony export */   "BackgroundImage": () => (/* reexport safe */ _lib_backgroundImage__WEBPACK_IMPORTED_MODULE_3__.BackgroundImage),
/* harmony export */   "BigHeading": () => (/* reexport safe */ _lib_bigHeading__WEBPACK_IMPORTED_MODULE_4__.BigHeading),
/* harmony export */   "ContainerControls": () => (/* reexport safe */ _lib_containerControls__WEBPACK_IMPORTED_MODULE_7__.ContainerControls),
/* harmony export */   "DropShadow": () => (/* reexport safe */ _lib_dropShadow__WEBPACK_IMPORTED_MODULE_5__.DropShadow),
/* harmony export */   "EventTracking": () => (/* reexport safe */ _lib_eventTracking__WEBPACK_IMPORTED_MODULE_6__.EventTracking),
/* harmony export */   "IconSelector": () => (/* reexport safe */ _lib_iconSelector__WEBPACK_IMPORTED_MODULE_8__.IconSelector),
/* harmony export */   "InnerBlocksAppender": () => (/* reexport safe */ _lib_innerBlocksAppender__WEBPACK_IMPORTED_MODULE_9__.InnerBlocksAppender),
/* harmony export */   "LinkControls": () => (/* reexport safe */ _lib_linkControls__WEBPACK_IMPORTED_MODULE_10__.LinkControls),
/* harmony export */   "TransparentBackground": () => (/* reexport safe */ _lib_transparentBackground__WEBPACK_IMPORTED_MODULE_11__.TransparentBackground)
/* harmony export */ });
/* harmony import */ var _lib_alignmentButtons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/alignmentButtons */ "./src/features/inspector/lib/alignmentButtons.js");
/* harmony import */ var _lib_alignmentReverse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/alignmentReverse */ "./src/features/inspector/lib/alignmentReverse.js");
/* harmony import */ var _lib_backgroundColor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/backgroundColor */ "./src/features/inspector/lib/backgroundColor.js");
/* harmony import */ var _lib_backgroundImage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/backgroundImage */ "./src/features/inspector/lib/backgroundImage.js");
/* harmony import */ var _lib_bigHeading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/bigHeading */ "./src/features/inspector/lib/bigHeading.js");
/* harmony import */ var _lib_dropShadow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/dropShadow */ "./src/features/inspector/lib/dropShadow.js");
/* harmony import */ var _lib_eventTracking__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/eventTracking */ "./src/features/inspector/lib/eventTracking.js");
/* harmony import */ var _lib_containerControls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/containerControls */ "./src/features/inspector/lib/containerControls.js");
/* harmony import */ var _lib_iconSelector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/iconSelector */ "./src/features/inspector/lib/iconSelector.js");
/* harmony import */ var _lib_innerBlocksAppender__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/innerBlocksAppender */ "./src/features/inspector/lib/innerBlocksAppender.js");
/* harmony import */ var _lib_linkControls__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/linkControls */ "./src/features/inspector/lib/linkControls.js");
/* harmony import */ var _lib_transparentBackground__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/transparentBackground */ "./src/features/inspector/lib/transparentBackground.js");













/***/ }),

/***/ "./src/features/inspector/lib/alignmentButtons.js":
/*!********************************************************!*\
  !*** ./src/features/inspector/lib/alignmentButtons.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlignmentButtons": () => (/* binding */ AlignmentButtons)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const AlignmentButtons = props => {
  const {
    attributes: {
      cardModifiers,
      alignment
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    icon: "editor-alignleft",
    isPressed: alignment == "left" ? true : false,
    onClick: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_2__.setLCR)(props, "alignment", alignment, "left", "cardModifiers", cardModifiers)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    icon: "editor-aligncenter",
    isPressed: alignment == "center" ? true : false,
    onClick: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_2__.setLCR)(props, "alignment", alignment, "center", "cardModifiers", cardModifiers)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    icon: "editor-alignright",
    isPressed: alignment == "right" ? true : false,
    onClick: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_2__.setLCR)(props, "alignment", alignment, "right", "cardModifiers", cardModifiers)
  }))));
};


/***/ }),

/***/ "./src/features/inspector/lib/alignmentReverse.js":
/*!********************************************************!*\
  !*** ./src/features/inspector/lib/alignmentReverse.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlignmentReverse": () => (/* binding */ AlignmentReverse)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const AlignmentReverse = props => {
  const {
    attributes: {
      modifiers,
      isReversed
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reverse Block Alignment', 'kotisivu-block-theme'),
    checked: isReversed,
    onChange: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_2__.addModifiers)(props, "isReversed", isReversed, "is-reversed", "modifiers", modifiers)
  })));
};


/***/ }),

/***/ "./src/features/inspector/lib/backgroundColor.js":
/*!*******************************************************!*\
  !*** ./src/features/inspector/lib/backgroundColor.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BackgroundColor": () => (/* binding */ BackgroundColor)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const BackgroundColor = props => {
  const {
    attributes: {
      modifiers,
      backgroundColor,
      hasBackgroundColor
    },
    setAttributes
  } = props;
  const colors = [{
    name: 'primary-light',
    color: 'var(--wp--preset--color--primary-light)'
  }, {
    name: 'primary',
    color: 'var(--wp--preset--color--primary)'
  }, {
    name: 'primary-dark',
    color: 'var(--wp--preset--color--primary-dark)'
  }, {
    name: 'secondary',
    color: 'var(--wp--preset--color--secondary)'
  }, {
    name: 'background',
    color: 'var(--wp--preset--color--background)'
  }, {
    name: 'foreground',
    color: 'var(--wp--preset--color--foreground)'
  }, {
    name: 'grey-light',
    color: 'var(--wp--preset--color--grey-light)'
  }, {
    name: 'grey',
    color: 'var(--wp--preset--color--grey)'
  }, {
    name: 'grey-dark',
    color: 'var(--wp--preset--color--grey-dark)'
  }];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "editor__background-color-selector"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Use Background Color", "kotisivu-block-theme"),
    checked: hasBackgroundColor,
    onChange: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_2__.addModifiers)(props, "hasBackgroundColor", hasBackgroundColor, "has-bg-color", "modifiers", modifiers)
  }), hasBackgroundColor && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPalette, {
    colors: colors,
    value: backgroundColor,
    onChange: color => {
      setAttributes({
        backgroundColor: color
      });
    }
  }))));
};

_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPalette;

/***/ }),

/***/ "./src/features/inspector/lib/backgroundImage.js":
/*!*******************************************************!*\
  !*** ./src/features/inspector/lib/backgroundImage.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BackgroundImage": () => (/* binding */ BackgroundImage)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const BackgroundImage = props => {
  const {
    attributes: {
      modifiers,
      hasBackgroundImage
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Use Background Image", "kotisivu-theme-blocks"),
    checked: hasBackgroundImage,
    onChange: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_2__.addModifiers)(props, "hasBackgroundImage", hasBackgroundImage, "has-image", "modifiers", modifiers)
  })));
};


/***/ }),

/***/ "./src/features/inspector/lib/bigHeading.js":
/*!**************************************************!*\
  !*** ./src/features/inspector/lib/bigHeading.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BigHeading": () => (/* binding */ BigHeading)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const BigHeading = props => {
  const {
    attributes: {
      cardModifiers,
      bigHeading
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Big Heading", "kotisivu-theme-blocks"),
    checked: bigHeading,
    onChange: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_2__.addModifiers)(props, "bigHeading", bigHeading, "has-big-heading", "cardModifiers", cardModifiers)
  })));
};


/***/ }),

/***/ "./src/features/inspector/lib/containerControls.js":
/*!*********************************************************!*\
  !*** ./src/features/inspector/lib/containerControls.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContainerControls": () => (/* binding */ ContainerControls)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



const ContainerControls = props => {
  const {
    attributes: {
      id,
      name,
      container
    },
    setAttributes
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Container Tag', 'kotisivu-block-theme'),
    value: container,
    onChange: container => {
      setAttributes({
        container
      });
    },
    options: [{
      value: null,
      label: 'Select element',
      disabled: true
    }, {
      value: 'div',
      label: 'div'
    }, {
      value: 'section',
      label: 'section'
    }, {
      value: 'article',
      label: 'article'
    }, {
      value: 'aside',
      label: 'aside'
    }, {
      value: 'main',
      label: 'main'
    }]
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ID', 'kotisivu-block-theme'),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sets ID attribute to an element', 'kotisivu-block-theme'),
    onChange: id => setAttributes({
      id
    }),
    value: id
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name', 'kotisivu-block-theme'),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sets name to an element', 'kotisivu-block-theme'),
    onChange: name => setAttributes({
      name
    }),
    value: name
  }));
};


/***/ }),

/***/ "./src/features/inspector/lib/dropShadow.js":
/*!**************************************************!*\
  !*** ./src/features/inspector/lib/dropShadow.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropShadow": () => (/* binding */ DropShadow)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const DropShadow = props => {
  const {
    attributes: {
      cardModifiers,
      shadow
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Drop Shadow", "kotisivu-theme-blocks"),
    checked: shadow,
    onChange: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_2__.addModifiers)(props, "shadow", shadow, "has-shadow", "cardModifiers", cardModifiers)
  })));
};


/***/ }),

/***/ "./src/features/inspector/lib/eventTracking.js":
/*!*****************************************************!*\
  !*** ./src/features/inspector/lib/eventTracking.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventTracking": () => (/* binding */ EventTracking)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



const EventTracking = props => {
  const {
    attributes: {
      hasTracking,
      trackingIdentifier
    },
    setAttributes
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Analytics', 'kotisivu-block-theme'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Track Events', 'kotisivu-block-theme'),
    checked: hasTracking,
    onChange: () => setAttributes({
      hasTracking: !hasTracking
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Identifier', 'kotisivu-block-theme'),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ex. name for this button', 'kotisivu-block-theme'),
    onChange: content => setAttributes({
      trackingIdentifier: content
    }),
    value: trackingIdentifier
  })));
};


/***/ }),

/***/ "./src/features/inspector/lib/iconSelector.js":
/*!****************************************************!*\
  !*** ./src/features/inspector/lib/iconSelector.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IconSelector": () => (/* binding */ IconSelector)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const IconSelector = _ref => {
  let {
    props,
    icons,
    img,
    link
  } = _ref;
  const {
    attributes: {
      unicode,
      url,
      title,
      isLink,
      isCustomIcon,
      isImage
    },
    setAttributes
  } = props;
  const setIconCode = content => {
    if (content == 'custom-icon') {
      setAttributes({
        isCustomIcon: true
      });
      return;
    }
    setAttributes({
      isCustomIcon: false
    });
    setAttributes({
      unicode: content
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings', 'kotisivu-block-theme'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: "Select icon",
    value: [...icons, {
      label: 'Custom',
      value: 'custom-icon'
    }].some(icon => icon.value === unicode) ? unicode : 'custom-icon',
    options: icons,
    onChange: setIconCode
  }), isCustomIcon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unicode', 'kotisivu-block-theme'),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('For example fas fa-user', 'kotisivu-block-theme'),
    onChange: content => setAttributes({
      unicode: content
    }),
    value: unicode
  }), img && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: "Use custom image",
    help: isImage ? 'Block is using image insted of icon.' : 'Block is using icon insted of image',
    checked: isImage,
    onChange: () => setAttributes({
      isImage: !isImage
    })
  })), link && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Settings', 'kotisivu-block-theme'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('URL', 'kotisivu-block-theme'),
    onChange: content => setAttributes({
      url: content
    }),
    value: url
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title', 'kotisivu-block-theme'),
    onChange: content => setAttributes({
      title: content
    }),
    value: title
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set icon as link', 'kotisivu-block-theme'),
    checked: isLink,
    onChange: () => setAttributes({
      isLink: !isLink
    })
  })));
};


/***/ }),

/***/ "./src/features/inspector/lib/innerBlocksAppender.js":
/*!***********************************************************!*\
  !*** ./src/features/inspector/lib/innerBlocksAppender.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InnerBlocksAppender": () => (/* binding */ InnerBlocksAppender)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);


const InnerBlocksAppender = _ref => {
  let {
    clientId,
    template,
    templateLock,
    allowedBlocks,
    blockProps
  } = _ref;
  const {
    hasChildBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const {
      getBlockOrder
    } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.store);
    return {
      hasChildBlocks: getBlockOrder(clientId).length > 0
    };
  }, [clientId]);
  return (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useInnerBlocksProps)({
    ...blockProps
  }, {
    template: template,
    templateLock: templateLock,
    allowedBlocks: allowedBlocks,
    renderAppender: hasChildBlocks ? undefined : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.ButtonBlockAppender
  });
};


/***/ }),

/***/ "./src/features/inspector/lib/linkControls.js":
/*!****************************************************!*\
  !*** ./src/features/inspector/lib/linkControls.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkControls": () => (/* binding */ LinkControls)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _inspector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../inspector */ "./src/features/inspector/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/link.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/link-off.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);







const LinkControls = props => {
  const {
    attributes: {
      post,
      url,
      target,
      rel
    },
    isSelected,
    setAttributes
  } = props;
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const richTextRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const [isEditingURL, setIsEditingURL] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const opensInNewTab = target === '_blank';
  const isURLSet = !!url;
  const onToggleOpenInNewTab = value => {
    const newLinkTarget = value ? '_blank' : undefined;
    let updatedRel = rel;
    if (newLinkTarget && !rel) {
      updatedRel = 'noreferrer noopener';
    } else if (!newLinkTarget && rel === 'noreferrer noopener') {
      updatedRel = undefined;
    }
    setAttributes({
      target: newLinkTarget,
      rel: updatedRel
    });
  };
  const unlink = () => {
    setAttributes({
      post: undefined,
      url: undefined,
      target: undefined,
      rel: undefined
    });
    setIsEditingURL(false);
  };
  const startEditing = event => {
    event.preventDefault();
    setIsEditingURL(true);
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isSelected) {
      setIsEditingURL(false);
    }
  }, [isSelected]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, {
    group: "block"
  }, !isURLSet && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarButton, {
    name: "link",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link'),
    onClick: startEditing
  }), isURLSet && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarButton, {
    name: "link",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unlink'),
    onClick: unlink,
    isActive: true
  })), isSelected && (isEditingURL || isURLSet) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Popover, {
    position: "bottom center",
    onClose: () => {
      setIsEditingURL(false);
      richTextRef.current?.focus();
    },
    anchorRef: ref?.current,
    focusOnMount: isEditingURL ? 'firstElement' : false,
    __unstableSlotName: '__unstable-block-tools-after'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.__experimentalLinkControl, {
    value: post,
    onChange: newPost => {
      setAttributes({
        post: newPost,
        url: newPost.url,
        title: newPost.title
      });
      if (opensInNewTab !== newPost.opensInNewTab) {
        onToggleOpenInNewTab(newPost.opensInNewTab);
      }
    },
    onRemove: () => {
      unlink();
      richTextRef.current?.focus();
    },
    forceIsEditingLink: isEditingURL
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_inspector__WEBPACK_IMPORTED_MODULE_2__.EventTracking, props)));
};


/***/ }),

/***/ "./src/features/inspector/lib/transparentBackground.js":
/*!*************************************************************!*\
  !*** ./src/features/inspector/lib/transparentBackground.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransparentBackground": () => (/* binding */ TransparentBackground)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const TransparentBackground = props => {
  const {
    attributes: {
      cardModifiers,
      transparentBackground
    }
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Transparent Background", "kotisivu-theme-blocks"),
    checked: transparentBackground,
    onChange: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_2__.addModifiers)(props, "transparentBackground", transparentBackground, "is-transparent", "cardModifiers", cardModifiers)
  })));
};


/***/ }),

/***/ "./src/utils/modifiers.js":
/*!********************************!*\
  !*** ./src/utils/modifiers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addModifiers": () => (/* binding */ addModifiers),
/* harmony export */   "cleanSpaces": () => (/* binding */ cleanSpaces),
/* harmony export */   "setLCR": () => (/* binding */ setLCR),
/* harmony export */   "setReverseAlignment": () => (/* binding */ setReverseAlignment)
/* harmony export */ });
/**
 * Clean extra spaces from string
 * @param {string} string 
 * @returns Cleaned string wihout extra spaces
 */
const cleanSpaces = string => {
  return string.replace(/\s+/g, ' ').trim();
};

/**
 * Add modifier to DOM element
 * @param {string} attributeKey Block attribute key
 * @param {boolean} attributeValue Block attribute value
 * @param {string} modifier String (html class) you want to add to DOM element
 * @param {string} elementName Current class name where modifier will be added
 * @param {object} elementVal Current class value
 */
const addModifiers = (props, attributeKey, attributeValue, modifier, elementName, elementVal) => event => {
  let arr = elementVal.split(" ");
  props.setAttributes({
    [attributeKey]: !attributeValue
  });
  attributeValue ? arr = arr.filter(item => item != modifier) : arr.push(modifier);
  props.setAttributes({
    [elementName]: cleanSpaces(arr.join(" "))
  });
};

/**
 * Add alignment modifier to DOM element
 * @param {string} attributeKey Block attribute key
 * @param {boolean} attributeValue Block attribute value
 * @param {string} modifier String (html class) you want to add to DOM element
 * @param {string} elementName Current class name where modifier will be added
 * @param {object} elementVal Current class value
 */
const setLCR = function (props) {
  let attributeKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'alignment';
  let attributeValue = arguments.length > 2 ? arguments[2] : undefined;
  let modifier = arguments.length > 3 ? arguments[3] : undefined;
  let elementName = arguments.length > 4 ? arguments[4] : undefined;
  let elementVal = arguments.length > 5 ? arguments[5] : undefined;
  return event => {
    /* Split current card class into an array */
    let arr = elementVal.split(" ");
    props.setAttributes({
      [attributeKey]: attributeValue
    });

    /* Clear previous alignments */
    arr = arr.filter(item => item != "is-left" && item != "is-center" && item != "is-right");

    /* Align item */
    arr.push("is-" + modifier);
    props.setAttributes({
      [elementName]: cleanSpaces(arr.join(" "))
    });
  };
};
const setReverseAlignment = () => {};

/***/ }),

/***/ "./src/blocks/static/hero/editor.css":
/*!*******************************************!*\
  !*** ./src/blocks/static/hero/editor.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/static/hero/style.css":
/*!******************************************!*\
  !*** ./src/blocks/static/hero/style.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/features/image/placeholder.png":
/*!********************************************!*\
  !*** ./src/features/image/placeholder.png ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/placeholder.d7054663.png";

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./src/blocks/static/hero/block.json":
/*!*******************************************!*\
  !*** ./src/blocks/static/hero/block.json ***!
  \*******************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/hero","title":"Hero","category":"theme","icon":"cover-image","description":"Hero block","keywords":["section, container, hero"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/blocks/hero.js","editorStyle":"file:../../../../build/blocks/hero.css","style":"file:../../../../build/blocks/style-hero.css","attributes":{"heroClass":{"type":"string","default":"hero"},"modifiers":{"type":"string","default":""},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"hasBackgroundImage":{"type":"boolean"},"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaWidth":{"type":"number","default":""},"mediaHeight":{"type":"number","default":""},"mediaMime":{"type":"string","default":""},"mediaSrcSet":{"type":"string","default":""},"mediaSrcSizes":{"type":"string","default":""},"lazyLoad":{"type":"boolean","default":true},"align":{"type":"string","default":"full"}}}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"hero": 0,
/******/ 			"./style-hero": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkkotisivu_block_theme"] = globalThis["webpackChunkkotisivu_block_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-hero"], () => (__webpack_require__("./src/blocks/static/hero/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=hero.js.map