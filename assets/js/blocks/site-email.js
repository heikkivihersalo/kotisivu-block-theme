/*! For license information please see site-email.js.LICENSE.txt */
!function(){"use strict";var e={"./src/blocks/dynamic/site-email/edit.js":function(e,s,t){t.r(s);var o=t("@wordpress/element"),r=(t("@wordpress/i18n"),t("@wordpress/block-editor")),i=t("@wordpress/server-side-render"),n=t.n(i);t("./src/blocks/dynamic/site-email/editor.css");s.default=e=>{const s=(0,r.useBlockProps)();return(0,o.createElement)("div",{...s},(0,o.createElement)(n(),{block:"ksd/site-email",attributes:e.attributes}))}},"./src/blocks/dynamic/site-email/save.js":function(e,s,t){t.r(s);s.default=()=>null},"./src/blocks/dynamic/site-email/editor.css":function(e,s,t){t.r(s)},"./src/blocks/dynamic/site-email/style.css":function(e,s,t){t.r(s)},"@wordpress/block-editor":function(e){e.exports=window.wp.blockEditor},"@wordpress/blocks":function(e){e.exports=window.wp.blocks},"@wordpress/element":function(e){e.exports=window.wp.element},"@wordpress/i18n":function(e){e.exports=window.wp.i18n},"@wordpress/server-side-render":function(e){e.exports=window.wp.serverSideRender},"./src/blocks/dynamic/site-email/block.json":function(e){e.exports=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/site-email","title":"Email","category":"dynamic-data","icon":"email-alt","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../assets/js/blocks/site-email.js","editorStyle":"file:../../../../assets/css/blocks/site-email.css","style":"file:../../../../assets/css/blocks/style-site-email.css","attributes":{"className":{"type":"string"},"options":{"type":"object"}}}')}},s={};function t(o){var r=s[o];if(void 0!==r)return r.exports;var i=s[o]={exports:{}};return e[o](i,i.exports,t),i.exports}t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,{a:s}),s},t.d=function(e,s){for(var o in s)t.o(s,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:s[o]})},t.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};!function(){t.r(o),t.d(o,{settings:function(){return k}});var e=t("@wordpress/i18n"),s=t("@wordpress/blocks"),r=t("./src/blocks/dynamic/site-email/edit.js"),i=t("./src/blocks/dynamic/site-email/save.js"),n=t("./src/blocks/dynamic/site-email/block.json");t("./src/blocks/dynamic/site-email/style.css");const{apiVersion:c,name:a,title:l,category:d,icon:p,description:u,keywords:m,textdomain:b,supports:f}=n,k={apiVersion:c,title:(0,e.__)(l,"kotisivu-block-theme"),description:(0,e.__)(u,"kotisivu-block-theme"),category:d,icon:p,supports:f,keywords:m,textdomain:b,edit:r.default,save:i.default,getEditWrapperProps(){return{"data-align":"full"}}};(0,s.registerBlockType)(a,k)}()}();
//# sourceMappingURL=site-email.js.map