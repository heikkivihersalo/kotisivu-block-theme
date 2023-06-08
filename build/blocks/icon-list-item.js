/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/static/icon-list-item/edit.js":
/*!**************************************************!*\
  !*** ./src/blocks/static/icon-list-item/edit.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _features_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @features/image */ "./src/features/image/index.js");
/* harmony import */ var _editor_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.css */ "./src/blocks/static/icon-list-item/editor.css");






const Edit = props => {
  const {
    attributes: {
      textContent
    },
    setAttributes
  } = props;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    className: "icon-list__item"
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("li", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_features_image__WEBPACK_IMPORTED_MODULE_4__.ImageSelector, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    img: true
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add item name', 'kotisivu-block-theme'),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add item name', 'kotisivu-block-theme'),
    value: textContent,
    onChange: content => setAttributes({
      textContent: content
    })
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/static/icon-list-item/index.js":
/*!***************************************************!*\
  !*** ./src/blocks/static/icon-list-item/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "settings": () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/static/icon-list-item/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/static/icon-list-item/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/static/icon-list-item/block.json");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/blocks/static/icon-list-item/style.css");






const {
  apiVersion,
  name,
  title,
  category,
  icon,
  description,
  keywords,
  textdomain,
  supports,
  parent
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
  parent: parent,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(name, settings);

/***/ }),

/***/ "./src/blocks/static/icon-list-item/save.js":
/*!**************************************************!*\
  !*** ./src/blocks/static/icon-list-item/save.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _features_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @features/image */ "./src/features/image/index.js");





const Save = props => {
  const {
    attributes: {
      textContent
    }
  } = props;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
    className: "icon-list__item"
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("li", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_features_image__WEBPACK_IMPORTED_MODULE_4__.ImageMarkup, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    img: true
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
    value: textContent
  }));
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

/***/ "./src/blocks/static/icon-list-item/editor.css":
/*!*****************************************************!*\
  !*** ./src/blocks/static/icon-list-item/editor.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/static/icon-list-item/style.css":
/*!****************************************************!*\
  !*** ./src/blocks/static/icon-list-item/style.css ***!
  \****************************************************/
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

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./src/blocks/static/icon-list-item/block.json":
/*!*****************************************************!*\
  !*** ./src/blocks/static/icon-list-item/block.json ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/icon-list-item","title":"List Item","category":"child","icon":"block-default","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"parent":["ksd/icon-list"],"editorScript":"file:../../../../build/blocks/icon-list-item.js","editorStyle":"file:../../../../build/blocks/icon-list-item.css","style":"file:../../../../build/blocks/style-icon-list-item.css","attributes":{"textContent":{"type":"string","default":""},"post":{"type":"object"},"url":{"type":"string","default":""},"title":{"type":"string","default":""},"target":{"type":"string"},"rel":{"type":"string"},"isLink":{"type":"boolean","default":false},"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaMime":{"type":"string","default":""},"mediaWidth":{"type":"number"},"mediaHeight":{"type":"number"}}}');

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
/******/ 			"icon-list-item": 0,
/******/ 			"./style-icon-list-item": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-icon-list-item"], () => (__webpack_require__("./src/blocks/static/icon-list-item/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=icon-list-item.js.map