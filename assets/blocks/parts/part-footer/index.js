!function(){"use strict";var e,t={292:function(e,t,r){var o=window.wp.i18n,n=window.wp.blocks,i=window.wp.element,s=window.wp.blockEditor,c=window.wp.serverSideRender,u=r.n(c),a=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/part-footer","title":"Part | Footer","category":"theme","icon":"block-default","description":"","keywords":["menu, header"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"multiple":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","attributes":{}}');const{apiVersion:l,name:d,title:p,category:f,icon:k,description:v,keywords:m,textdomain:b,supports:h}=a,w={apiVersion:l,title:(0,o.__)(p,"kotisivu-block-theme"),description:(0,o.__)(v,"kotisivu-block-theme"),category:f,icon:k,supports:h,keywords:m,textdomain:b,edit:e=>{const t=(0,s.useBlockProps)();return(0,i.createElement)("div",{...t},(0,i.createElement)(u(),{block:"ksd/site-footer",attributes:e.attributes}))},save:()=>null,getEditWrapperProps(){return{"data-align":"full"}}};(0,n.registerBlockType)(d,w)}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=function(t,r,n,i){if(!r){var s=1/0;for(l=0;l<e.length;l++){r=e[l][0],n=e[l][1],i=e[l][2];for(var c=!0,u=0;u<r.length;u++)(!1&i||s>=i)&&Object.keys(o.O).every((function(e){return o.O[e](r[u])}))?r.splice(u--,1):(c=!1,i<s&&(s=i));if(c){e.splice(l--,1);var a=n();void 0!==a&&(t=a)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[r,n,i]},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={4914:0,9216:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,i,s=r[0],c=r[1],u=r[2],a=0;if(s.some((function(t){return 0!==e[t]}))){for(n in c)o.o(c,n)&&(o.m[n]=c[n]);if(u)var l=u(o)}for(t&&t(r);a<s.length;a++)i=s[a],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(l)},r=self.webpackChunkkotisivu_block_theme=self.webpackChunkkotisivu_block_theme||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var n=o.O(void 0,[9216],(function(){return o(292)}));n=o.O(n)}();