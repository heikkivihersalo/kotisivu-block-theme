!function(){"use strict";var e={n:function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,{a:o}),o},d:function(t,o){for(var s in o)e.o(o,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:o[s]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.i18n,o=window.wp.blocks,s=window.wp.element,i=window.wp.blockEditor,n=window.wp.serverSideRender,r=e.n(n);var c=e=>{const t=(0,i.useBlockProps)();return(0,s.createElement)("div",{...t},(0,s.createElement)(r(),{block:"ksd/site-phone",attributes:e.attributes}))};var a=()=>null,p=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/site-phone","title":"Phone","category":"dynamic-data","icon":"phone","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../assets/js/blocks/site-phone.js","editorStyle":"file:../../../../assets/css/blocks/site-phone.css","style":"file:../../../../assets/css/blocks/style-site-phone.css","attributes":{"options":{"type":"object"}}}');const{apiVersion:l,name:d,title:u,category:k,icon:w,description:b,keywords:m,textdomain:y,supports:f}=p,h={apiVersion:l,title:(0,t.__)(u,"kotisivu-block-theme"),description:(0,t.__)(b,"kotisivu-block-theme"),category:k,icon:w,supports:f,keywords:m,textdomain:y,edit:c,save:a,getEditWrapperProps(){return{"data-align":"full"}}};(0,o.registerBlockType)(d,h)}();