!function(){"use strict";var e={n:function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,{a:s}),s},d:function(t,s){for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.i18n,s=window.wp.blocks,i=window.wp.element,r=window.wp.blockEditor,o=window.wp.serverSideRender,n=e.n(o);var a=e=>{const t=(0,r.useBlockProps)();return(0,i.createElement)("div",{...t},(0,i.createElement)(n(),{block:"ksd/site-header",attributes:e.attributes}))};var c=()=>null,l=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/site-header","title":"Site Header","category":"theme","icon":"grid-view","description":"","keywords":["menu, header"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"multiple":false},"editorScript":"file:../../../../assets/js/blocks/site-header.js","editorStyle":"file:../../../../assets/css/blocks/site-header.css","style":"file:../../../../assets/css/blocks/style-site-header.css","viewScript":"file:../../../../assets/js/blocks/site-header-view-script.js","attributes":{"options":{"type":"object"}}}');const{apiVersion:d,name:p,title:u,category:w,icon:k,description:b,keywords:m,textdomain:f,supports:h}=l,v={apiVersion:d,title:(0,t.__)(u,"kotisivu-block-theme"),description:(0,t.__)(b,"kotisivu-block-theme"),category:w,icon:k,supports:h,keywords:m,textdomain:f,edit:a,save:c,getEditWrapperProps(){return{"data-align":"full"}}};(0,s.registerBlockType)(p,v)}();