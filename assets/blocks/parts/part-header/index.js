!function(){"use strict";var e,t={644:function(e,t,r){var n=window.wp.i18n,i=window.wp.blocks,o=window.wp.element,s=window.wp.blockEditor,a=window.wp.serverSideRender,c=r.n(a),u=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/part-header","title":"Part | Header","category":"theme","icon":"block-default","description":"","keywords":["menu, header"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"multiple":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js","attributes":{}}');const{apiVersion:l,name:d,title:p,category:f,icon:v,description:k,keywords:h,textdomain:m,supports:w}=u,b={apiVersion:l,title:(0,n.__)(p,"kotisivu-block-theme"),description:(0,n.__)(k,"kotisivu-block-theme"),category:f,icon:v,supports:w,keywords:h,textdomain:m,edit:e=>{const t=(0,s.useBlockProps)();return(0,o.createElement)("div",{...t},(0,o.createElement)(c(),{block:"ksd/site-header",attributes:e.attributes}))},save:()=>null,getEditWrapperProps(){return{"data-align":"full"}}};(0,i.registerBlockType)(d,b)}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=function(t,r,i,o){if(!r){var s=1/0;for(l=0;l<e.length;l++){r=e[l][0],i=e[l][1],o=e[l][2];for(var a=!0,c=0;c<r.length;c++)(!1&o||s>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(a=!1,o<s&&(s=o));if(a){e.splice(l--,1);var u=i();void 0!==u&&(t=u)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,i,o]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={2668:0,5150:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,o,s=r[0],a=r[1],c=r[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(c)var l=c(n)}for(t&&t(r);u<s.length;u++)o=s[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(l)},r=self.webpackChunkkotisivu_block_theme=self.webpackChunkkotisivu_block_theme||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var i=n.O(void 0,[5150],(function(){return n(644)}));i=n.O(i)}();