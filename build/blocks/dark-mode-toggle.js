!function(){"use strict";var e={n:function(o){var t=o&&o.__esModule?function(){return o.default}:function(){return o};return e.d(t,{a:t}),t},d:function(o,t){for(var i in t)e.o(t,i)&&!e.o(o,i)&&Object.defineProperty(o,i,{enumerable:!0,get:t[i]})},o:function(e,o){return Object.prototype.hasOwnProperty.call(e,o)}},o=window.wp.i18n,t=window.wp.blocks,i=window.wp.element,r=window.wp.blockEditor,s=window.wp.serverSideRender,n=e.n(s);var l=e=>{const o=(0,r.useBlockProps)();return(0,i.createElement)("div",{...o},(0,i.createElement)(n(),{block:"ksd/dark-mode-toggle"}))};var d=()=>null,c=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/dark-mode-toggle","title":"Dark Mode Toggle","category":"theme","icon":"grid-view","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false,"multiple":false},"editorScript":"file:../../../../build/blocks/dark-mode-toggle.js","editorStyle":"file:../../../../build/blocks/dark-mode-toggle.css","style":"file:../../../../build/blocks/style-dark-mode-toggle.css","viewScript":"file:../../../../build/blocks/dark-mode-toggle-view-script.js","attributes":{}}');const{apiVersion:a,name:p,title:u,category:k,icon:m,description:w,keywords:g,textdomain:b,supports:f}=c,v={apiVersion:a,title:(0,o.__)(u,"kotisivu-block-theme"),description:(0,o.__)(w,"kotisivu-block-theme"),category:k,icon:m,supports:f,keywords:g,textdomain:b,edit:l,save:d};(0,t.registerBlockType)(p,v)}();