/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/static/timeline-list-item/components/StatusIcon.js":
/*!***********************************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/components/StatusIcon.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_buildingIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/buildingIcon */ "./src/blocks/static/timeline-list-item/icons/buildingIcon.js");
/* harmony import */ var _icons_checkIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/checkIcon */ "./src/blocks/static/timeline-list-item/icons/checkIcon.js");
/* harmony import */ var _icons_circleIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/circleIcon */ "./src/blocks/static/timeline-list-item/icons/circleIcon.js");




const StatusIcon = _ref => {
  let {
    timelineStatus
  } = _ref;
  /**
   * Define the default case.
   * @returns {JSX.Element}
   */
  const DefaultIcon = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      className: "timeline-list-item__icon timeline-list-item__icon--default",
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
      cx: "50",
      cy: "50",
      r: "10px",
      fill: "var(--wp--preset--color--background)"
    }));
  };

  /** 
   * If wrapperName is not defined, return the default case.
   */
  if (!timelineStatus) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DefaultIcon, null);
  }

  /**
   * Return the correct HTML wrapper for element 
   * @returns {JSX.Element}
   */
  switch (timelineStatus) {
    case 'ready':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_checkIcon__WEBPACK_IMPORTED_MODULE_2__["default"], null);
    case 'in-progress':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_buildingIcon__WEBPACK_IMPORTED_MODULE_1__["default"], null);
    case 'coming':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_circleIcon__WEBPACK_IMPORTED_MODULE_3__["default"], null);
    default:
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DefaultIcon, null);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatusIcon);

/***/ }),

/***/ "./src/blocks/static/timeline-list-item/components/inspector.js":
/*!**********************************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/components/inspector.js ***!
  \**********************************************************************/
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




const Inspector = props => {
  const {
    attributes: {
      timelineStatus
    },
    setAttributes
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Settings", "kotisivu-block-theme"),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Timeline Status', 'kotisivu-block-theme'),
    value: timelineStatus,
    onChange: content => {
      setAttributes({
        timelineStatus: content
      });
    },
    options: [{
      value: 'not-set',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Not Set', 'kotisivu-block-theme')
    }, {
      value: 'coming',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Coming', 'kotisivu-block-theme')
    }, {
      value: 'in-progress',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('In Progress', 'kotisivu-block-theme')
    }, {
      value: 'ready',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ready', 'kotisivu-block-theme')
    }]
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inspector);

/***/ }),

/***/ "./src/blocks/static/timeline-list-item/edit.js":
/*!******************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/edit.js ***!
  \******************************************************/
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
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _components_StatusIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/StatusIcon */ "./src/blocks/static/timeline-list-item/components/StatusIcon.js");
/* harmony import */ var _icons_dotsIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/dotsIcon */ "./src/blocks/static/timeline-list-item/icons/dotsIcon.js");
/* harmony import */ var _editor_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.css */ "./src/blocks/static/timeline-list-item/editor.css");
/* harmony import */ var _components_inspector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/inspector */ "./src/blocks/static/timeline-list-item/components/inspector.js");








const Edit = props => {
  const {
    attributes: {
      timelineName,
      timelineStatus,
      timelineStatusText
    },
    setAttributes
  } = props;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_3__.cleanSpaces)(`timeline-list-item timeline-list-item--${timelineStatus}`)
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_inspector__WEBPACK_IMPORTED_MODULE_7__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add timeline name', 'kotisivu-block-theme'),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add timeline name', 'kotisivu-block-theme'),
    value: timelineName,
    className: "timeline-list-item__name",
    tagName: "h3",
    onChange: content => setAttributes({
      timelineName: content
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_dotsIcon__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "timeline-list-item__status"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add status text', 'kotisivu-block-theme'),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add status text', 'kotisivu-block-theme'),
    value: timelineStatusText,
    className: "timeline-list-item__status-text",
    tagName: "span",
    onChange: content => setAttributes({
      timelineStatusText: content
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StatusIcon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    timelineStatus: timelineStatus
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/static/timeline-list-item/icons/buildingIcon.js":
/*!********************************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/icons/buildingIcon.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const BuildingIcon = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "timeline-list-item__icon timeline-list-item__icon--building",
    width: "100%",
    height: "100%",
    viewBox: "0 0 42 37",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    "stroke-linecap": "square",
    "stroke-miterlimit": "1.5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    transform: "matrix(1,0,0,1.10028,-868.84,-1249.87)"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M891.1,1136.54L891.1,1169.26L900.115,1169.26L900.115,1136.54L891.1,1136.54ZM894.1,1139.27L897.115,1139.27C897.115,1139.27 897.115,1166.53 897.115,1166.53C897.115,1166.53 894.1,1166.53 894.1,1166.53L894.1,1139.27Z",
    fill: "var(--wp--preset--color--background)"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    transform: "matrix(1,0,0,1,-869.333,-1133.84)"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M891.1,1136.54L875.874,1145.97L879.668,1143.62L879.668,1158.3",
    fill: "none",
    stroke: "var(--wp--preset--color--background)",
    "stroke-width": "3px"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    transform: "matrix(1,0,0,1,-829.929,-1133.88)"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M832.633,1145.94L853.318,1145.94",
    fill: "none",
    stroke: "var(--wp--preset--color--background)",
    "stroke-width": "3px"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    transform: "matrix(1,0,0,1,-829.929,-1134.15)"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M860.128,1145.94L868.652,1145.94",
    fill: "none",
    stroke: "var(--wp--preset--color--background)",
    "stroke-width": "3px"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BuildingIcon);

/***/ }),

/***/ "./src/blocks/static/timeline-list-item/icons/checkIcon.js":
/*!*****************************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/icons/checkIcon.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const CheckIcon = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "timeline-list-item__icon timeline-list-item__icon--checkmark",
    width: "100%",
    height: "100%",
    viewBox: "0 0 42 37",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-miterlimit": "1.5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    transform: "matrix(0.899919,0,0,0.899919,-654.041,-948.856)"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M729,1074.6L742.565,1092.6L771,1056.6",
    fill: "none",
    stroke: "var(--wp--preset--color--background)",
    "stroke-width": "4.44px"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckIcon);

/***/ }),

/***/ "./src/blocks/static/timeline-list-item/icons/circleIcon.js":
/*!******************************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/icons/circleIcon.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const CircleIcon = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "timeline-list-item__icon timeline-list-item__icon--circle",
    width: "100%",
    height: "100%",
    viewBox: "0 0 41 41",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    "stroke-linecap": "square",
    "stroke-miterlimit": "1.5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    transform: "matrix(1.05814,0,0,1.05814,-682.474,-1088.82)"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M680.843,1045.05C681.02,1046.03 681.112,1047.05 681.112,1048.08C681.112,1057.49 673.472,1065.13 664.062,1065.13C654.651,1065.13 647.011,1057.49 647.011,1048.08C647.011,1038.67 654.651,1031.03 664.062,1031.03C665.108,1031.03 666.133,1031.12 667.128,1031.3",
    fill: "none",
    stroke: "var(--wp--preset--color--background)",
    "stroke-width": "3.78px"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CircleIcon);

/***/ }),

/***/ "./src/blocks/static/timeline-list-item/icons/dotsIcon.js":
/*!****************************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/icons/dotsIcon.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const DotsIcon = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "timeline-list-item__dots",
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "50",
    cy: "90",
    r: "5px",
    fill: "var(--_color)"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "50",
    cy: "65",
    r: "5px",
    fill: "var(--_color)"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "50",
    cy: "40",
    r: "5px",
    fill: "var(--_color)"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
    cx: "50",
    cy: "15",
    r: "5px",
    fill: "var(--_color)"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DotsIcon);

/***/ }),

/***/ "./src/blocks/static/timeline-list-item/index.js":
/*!*******************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "settings": () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/static/timeline-list-item/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/static/timeline-list-item/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/static/timeline-list-item/block.json");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/blocks/static/timeline-list-item/style.css");






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

/***/ "./src/blocks/static/timeline-list-item/save.js":
/*!******************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/save.js ***!
  \******************************************************/
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
/* harmony import */ var _utils_modifiers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/modifiers */ "./src/utils/modifiers.js");
/* harmony import */ var _components_StatusIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/StatusIcon */ "./src/blocks/static/timeline-list-item/components/StatusIcon.js");
/* harmony import */ var _icons_dotsIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/dotsIcon */ "./src/blocks/static/timeline-list-item/icons/dotsIcon.js");






const Save = props => {
  const {
    attributes: {
      timelineName,
      timelineStatus,
      timelineStatusText
    }
  } = props;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
    className: (0,_utils_modifiers__WEBPACK_IMPORTED_MODULE_3__.cleanSpaces)(`timeline-list-item timeline-list-item--${timelineStatus}`)
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    value: timelineName,
    className: "timeline-list-item__name",
    tagName: "h3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_dotsIcon__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "timeline-list-item__status"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    value: timelineStatusText,
    className: "timeline-list-item__status-text",
    tagName: "span"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StatusIcon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    timelineStatus: timelineStatus
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Save);

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

/***/ "./src/blocks/static/timeline-list-item/editor.css":
/*!*********************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/editor.css ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/static/timeline-list-item/style.css":
/*!********************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/style.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "./src/blocks/static/timeline-list-item/block.json":
/*!*********************************************************!*\
  !*** ./src/blocks/static/timeline-list-item/block.json ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/timeline-list-item","title":"Timeline Item","category":"child","icon":"block-default","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"parent":["ksd/timeline-list"],"editorScript":"file:../../../../build/blocks/timeline-list-item.js","editorStyle":"file:../../../../build/blocks/timeline-list-item.css","style":"file:../../../../build/blocks/style-timeline-list-item.css","attributes":{"timelineName":{"type":"string","source":"html","selector":"h3.timeline-list-item__name","default":""},"timelineStatus":{"type":"string","default":"not-set"},"timelineStatusText":{"type":"string","source":"html","selector":"span.timeline-list-item__status-text","default":""}}}');

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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"timeline-list-item": 0,
/******/ 			"./style-timeline-list-item": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-timeline-list-item"], () => (__webpack_require__("./src/blocks/static/timeline-list-item/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=timeline-list-item.js.map