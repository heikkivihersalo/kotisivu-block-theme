!function(){"use strict";var e,t={790:function(){var e=window.wp.i18n,t=window.wp.blocks,o=window.wp.element,r=window.wp.blockEditor;window.wp.components;var n=window.wp.data,s=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/column","title":"Column","category":"design","icon":"columns","description":"","keywords":["columns, column"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"parent":["ksd/section","ksd/wrapper"],"editorScript":"file:../../../../build/blocks/column.js","editorStyle":"file:../../../../build/blocks/column.css","style":"file:../../../../build/blocks/style-column.css","attributes":{"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]}}}');const{apiVersion:l,name:i,title:c,category:a,icon:p,description:u,keywords:d,textdomain:k,supports:m,parent:f}=s,w={apiVersion:l,title:(0,e.__)(c,"kotisivu-block-theme"),description:(0,e.__)(u,"kotisivu-block-theme"),category:a,icon:p,supports:m,keywords:d,textdomain:k,parent:f,edit:e=>{const{attributes:{template:t,templateLock:s,allowedBlocks:l},clientId:i}=e,c=(({clientId:e,template:t,templateLock:o,allowedBlocks:s,blockProps:l})=>{const{hasChildBlocks:i}=(0,n.useSelect)((t=>{const{getBlockOrder:o}=t(r.store);return{hasChildBlocks:o(e).length>0}}),[e]);return(0,r.useInnerBlocksProps)({...l},{template:t,templateLock:o,allowedBlocks:s,renderAppender:i?void 0:r.InnerBlocks.ButtonBlockAppender})})({clientId:i,template:t,templateLock:s,allowedBlocks:l,blockProps:(0,r.useBlockProps)()});return(0,o.createElement)("div",{...c})},save:e=>{const t=r.useInnerBlocksProps.save(r.useBlockProps.save());return(0,o.createElement)("div",{...t})},getEditWrapperProps(){return{"data-align":"full"}}};(0,t.registerBlockType)(i,w)}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var s=o[e]={exports:{}};return t[e](s,s.exports,r),s.exports}r.m=t,e=[],r.O=function(t,o,n,s){if(!o){var l=1/0;for(p=0;p<e.length;p++){o=e[p][0],n=e[p][1],s=e[p][2];for(var i=!0,c=0;c<o.length;c++)(!1&s||l>=s)&&Object.keys(r.O).every((function(e){return r.O[e](o[c])}))?o.splice(c--,1):(i=!1,s<l&&(l=s));if(i){e.splice(p--,1);var a=n();void 0!==a&&(t=a)}}return t}s=s||0;for(var p=e.length;p>0&&e[p-1][2]>s;p--)e[p]=e[p-1];e[p]=[o,n,s]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={8593:0,4508:0};r.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,s,l=o[0],i=o[1],c=o[2],a=0;if(l.some((function(t){return 0!==e[t]}))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(c)var p=c(r)}for(t&&t(o);a<l.length;a++)s=l[a],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(p)},o=self.webpackChunkkotisivu_block_theme=self.webpackChunkkotisivu_block_theme||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var n=r.O(void 0,[4508],(function(){return r(790)}));n=r.O(n)}();