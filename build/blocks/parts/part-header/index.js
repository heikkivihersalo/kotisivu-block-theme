!function(){"use strict";var e,t={830:function(){var e=window.wp.i18n,t=window.wp.blocks,r=window.wp.element,o=window.wp.blockEditor,i=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/part-header","title":"Part | Header","category":"theme","icon":"block-default","description":"","keywords":["menu, header"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"multiple":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js","attributes":{"template":{"type":"array","default":[["ksd/wrapper",{"className":"site-header__wrapper","template":[["ksd/part-dark-mode-toggle"],["core/buttons",{"className":"site-header__buttons"}]],"variationName":"wrapper-100"}]]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]}}}');const{apiVersion:n,name:a,title:s,category:l,icon:c,description:p,keywords:d,textdomain:u,supports:m}=i,f={apiVersion:n,title:(0,e.__)(s,"kotisivu-block-theme"),description:(0,e.__)(p,"kotisivu-block-theme"),category:l,icon:c,supports:m,keywords:d,textdomain:u,edit:function(e){const{attributes:{template:t,templateLock:i,allowedBlocks:n}}=e,a=(0,o.useBlockProps)();return(0,r.createElement)("header",{...a},(0,r.createElement)("div",{className:"editor-site-logo-placeholder"},"Site Logo"),(0,r.createElement)("div",{className:"editor-site-navigation-placeholder"},"Site Navigation"),(0,r.createElement)(o.InnerBlocks,{template:t,templateLock:i,allowedBlocks:n}))},save:function(){return(0,r.createElement)(o.InnerBlocks.Content,null)},getEditWrapperProps(){return{"data-align":"full"}}};(0,t.registerBlockType)(a,f)}},r={};function o(e){var i=r[e];if(void 0!==i)return i.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,o),n.exports}o.m=t,e=[],o.O=function(t,r,i,n){if(!r){var a=1/0;for(p=0;p<e.length;p++){r=e[p][0],i=e[p][1],n=e[p][2];for(var s=!0,l=0;l<r.length;l++)(!1&n||a>=n)&&Object.keys(o.O).every((function(e){return o.O[e](r[l])}))?r.splice(l--,1):(s=!1,n<a&&(a=n));if(s){e.splice(p--,1);var c=i();void 0!==c&&(t=c)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[r,i,n]},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={2668:0,5150:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,n,a=r[0],s=r[1],l=r[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(i in s)o.o(s,i)&&(o.m[i]=s[i]);if(l)var p=l(o)}for(t&&t(r);c<a.length;c++)n=a[c],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(p)},r=self.webpackChunkkotisivu_block_theme=self.webpackChunkkotisivu_block_theme||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var i=o.O(void 0,[5150],(function(){return o(830)}));i=o.O(i)}();