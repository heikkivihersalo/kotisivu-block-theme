!function(){"use strict";var e={n:function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,{a:s}),s},d:function(t,s){for(var o in s)e.o(s,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:s[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.i18n,s=window.wp.blocks,o=window.wp.element,i=window.wp.blockEditor,r=window.wp.serverSideRender,n=e.n(r);var c=e=>{const t=(0,i.useBlockProps)();return(0,o.createElement)("div",{...t},(0,o.createElement)(n(),{block:"ksd/site-social",attributes:e.attributes}))};var a=()=>null,l=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/site-social","title":"Social Accounts","category":"dynamic-data","icon":"networking","description":"Add global social icons to your site.","keywords":["social, icons, header"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../assets/js/blocks/site-social.js","editorStyle":"file:../../../../assets/css/blocks/site-social.css","style":"file:../../../../assets/css/blocks/style-site-social.css","attributes":{"options":{"type":"object"}}}');const{apiVersion:d,name:p,title:u,category:k,icon:w,description:b,keywords:m,textdomain:y,supports:f}=l,v={apiVersion:d,title:(0,t.__)(u,"kotisivu-block-theme"),description:(0,t.__)(b,"kotisivu-block-theme"),category:k,icon:w,supports:f,keywords:m,textdomain:y,edit:c,save:a,getEditWrapperProps(){return{"data-align":"full"}}};(0,s.registerBlockType)(p,v)}();