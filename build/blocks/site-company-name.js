!function(){"use strict";var e={n:function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,{a:o}),o},d:function(t,o){for(var i in o)e.o(o,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:o[i]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.i18n,o=window.wp.blocks,i=window.wp.element,n=window.wp.blockEditor,s=window.wp.serverSideRender,r=e.n(s);var a=e=>{const t=(0,n.useBlockProps)();return(0,i.createElement)("div",{...t},(0,i.createElement)(r(),{block:"ksd/site-company-name",attributes:e.attributes}))};var c=()=>null,l=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/site-company-name","title":"Company Name","category":"dynamic-data","icon":"building","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/blocks/site-company-name.js","editorStyle":"file:../../../../build/blocks/site-company-name.css","style":"file:../../../../build/blocks/style-site-company-name.css","attributes":{"options":{"type":"object"}}}');const{apiVersion:p,name:d,title:u,category:m,icon:b,description:y,keywords:k,textdomain:w,supports:f}=l,v={apiVersion:p,title:(0,t.__)(u,"kotisivu-block-theme"),description:(0,t.__)(y,"kotisivu-block-theme"),category:m,icon:b,supports:f,keywords:k,textdomain:w,edit:a,save:c,getEditWrapperProps(){return{"data-align":"full"}}};(0,o.registerBlockType)(d,v)}();