!function(){"use strict";var e,t={991:function(){var e=window.wp.i18n,t=window.wp.blocks,o=window.wp.element,s=window.wp.blockEditor;window.wp.components.ColorPalette;var i=window.wp.data,n=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/icon-list","title":"Icon List","category":"widgets","icon":"list-view","description":"Icon list with insertable image","keywords":["container, icon, list"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/icon-list.js","editorStyle":"file:../../../../build/icon-list.css","style":"file:../../../../build/style-icon-list.css","attributes":{"template":{"type":"array","default":[["ksd/icon-list-item"],["ksd/icon-list-item"]]},"allowedBlocks":{"type":"array","default":["ksd/icon-list-item"]},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false],"default":false}}}');const{apiVersion:l,name:r,title:c,category:a,icon:p,description:u,keywords:d,textdomain:k,supports:m}=n,f={apiVersion:l,title:(0,e.__)(c,"kotisivu-block-theme"),description:(0,e.__)(u,"kotisivu-block-theme"),category:a,icon:p,supports:m,keywords:d,textdomain:k,edit:e=>{const{attributes:{template:t,allowedBlocks:n,templateLock:l},clientId:r}=e,c=(e=>{let{clientId:t,template:o,templateLock:n,allowedBlocks:l,blockProps:r}=e;const{hasChildBlocks:c}=(0,i.useSelect)((e=>{const{getBlockOrder:o}=e(s.store);return{hasChildBlocks:o(t).length>0}}),[t]);return(0,s.useInnerBlocksProps)({...r},{template:o,templateLock:n,allowedBlocks:l,renderAppender:c?void 0:s.InnerBlocks.ButtonBlockAppender})})({clientId:r,template:t,templateLock:l,allowedBlocks:n,blockProps:(0,s.useBlockProps)({className:"icon-list"})});return(0,o.createElement)("ul",c)},save:e=>{const t=s.useInnerBlocksProps.save(s.useBlockProps.save({className:"icon-list"}));return(0,o.createElement)("ul",t)}};(0,t.registerBlockType)(r,f)}},o={};function s(e){var i=o[e];if(void 0!==i)return i.exports;var n=o[e]={exports:{}};return t[e](n,n.exports,s),n.exports}s.m=t,e=[],s.O=function(t,o,i,n){if(!o){var l=1/0;for(p=0;p<e.length;p++){o=e[p][0],i=e[p][1],n=e[p][2];for(var r=!0,c=0;c<o.length;c++)(!1&n||l>=n)&&Object.keys(s.O).every((function(e){return s.O[e](o[c])}))?o.splice(c--,1):(r=!1,n<l&&(l=n));if(r){e.splice(p--,1);var a=i();void 0!==a&&(t=a)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[o,i,n]},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={746:0,405:0};s.O.j=function(t){return 0===e[t]};var t=function(t,o){var i,n,l=o[0],r=o[1],c=o[2],a=0;if(l.some((function(t){return 0!==e[t]}))){for(i in r)s.o(r,i)&&(s.m[i]=r[i]);if(c)var p=c(s)}for(t&&t(o);a<l.length;a++)n=l[a],s.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return s.O(p)},o=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var i=s.O(void 0,[405],(function(){return s(991)}));i=s.O(i)}();