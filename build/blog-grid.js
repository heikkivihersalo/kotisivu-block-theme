!function(){"use strict";var e,t={337:function(e,t,r){var o=window.wp.i18n,i=window.wp.blocks,n=window.wp.element,s=window.wp.blockEditor,l=window.wp.serverSideRender,c=r.n(l);window.wp.components;var u=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/blog-grid","title":"Blog Grid","category":"blog","icon":"grid-view","description":"Grid view of blog posts","keywords":["blog, grid"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/blog-grid.js","editorStyle":"file:../../../../build/blog-grid.css","style":"file:../../../../build/style-blog-grid.css","viewScript":"file:../../../../build/blog-grid-view-script.js","attributes":{}}');const{apiVersion:d,name:a,title:p,category:f,icon:b,description:g,keywords:v,textdomain:w,supports:k}=u,m={apiVersion:d,title:(0,o.__)(p,"kotisivu-block-theme"),description:(0,o.__)(g,"kotisivu-block-theme"),category:f,icon:b,supports:k,keywords:v,textdomain:w,edit:e=>{const{attributes:{maxPosts:t},setAttributes:r}=e,o=(0,s.useBlockProps)();return(0,n.createElement)("div",o,(0,n.createElement)(c(),{block:"ksd/blog-grid"}))},save:()=>null,getEditWrapperProps(){return{"data-align":"full"}}};(0,i.registerBlockType)(a,m)}},r={};function o(e){var i=r[e];if(void 0!==i)return i.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,o),n.exports}o.m=t,e=[],o.O=function(t,r,i,n){if(!r){var s=1/0;for(d=0;d<e.length;d++){r=e[d][0],i=e[d][1],n=e[d][2];for(var l=!0,c=0;c<r.length;c++)(!1&n||s>=n)&&Object.keys(o.O).every((function(e){return o.O[e](r[c])}))?r.splice(c--,1):(l=!1,n<s&&(s=n));if(l){e.splice(d--,1);var u=i();void 0!==u&&(t=u)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[r,i,n]},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={454:0,639:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,n,s=r[0],l=r[1],c=r[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(i in l)o.o(l,i)&&(o.m[i]=l[i]);if(c)var d=c(o)}for(t&&t(r);u<s.length;u++)n=s[u],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(d)},r=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var i=o.O(void 0,[639],(function(){return o(337)}));i=o.O(i)}();