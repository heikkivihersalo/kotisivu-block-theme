!function(){"use strict";var e={n:function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,{a:o}),o},d:function(t,o){for(var i in o)e.o(o,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:o[i]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.i18n,o=window.wp.blocks,i=window.wp.element,r=window.wp.blockEditor,s=window.wp.serverSideRender,n=e.n(s);var l=e=>{const t=(0,r.useBlockProps)();return(0,i.createElement)("div",{...t},(0,i.createElement)(n(),{block:"ksd/blog-post",attributes:e.attributes}))};var c=()=>null,a=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/blog-post","title":"Blog Post","category":"blog","icon":"grid-view","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/blocks/blog-post.js","editorStyle":"file:../../../../build/blocks/blog-post.css","style":"file:../../../../build/blocks/style-blog-post.css","attributes":{}}');const{apiVersion:d,name:p,title:u,category:b,icon:k,description:w,keywords:g,textdomain:m,supports:f}=a,y={apiVersion:d,title:(0,t.__)(u,"kotisivu-block-theme"),description:(0,t.__)(w,"kotisivu-block-theme"),category:b,icon:k,supports:f,keywords:g,textdomain:m,edit:l,save:c,getEditWrapperProps(){return{"data-align":"full"}}};(0,o.registerBlockType)(p,y)}();