!function(){"use strict";var e,t={584:function(e,t,o){var i=window.wp.i18n,r=window.wp.blocks,n=window.wp.element,s=window.wp.blockEditor,c=window.wp.serverSideRender,a=o.n(c),l=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/site-social","title":"Social Accounts","category":"dynamic-data","icon":"networking","description":"Add global social icons to your site.","keywords":["social, icons, header"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/blocks/site-social.js","editorStyle":"file:../../../../build/blocks/site-social.css","style":"file:../../../../build/blocks/style-site-social.css","attributes":{"options":{"type":"object"}}}');const{apiVersion:u,name:d,title:p,category:f,icon:k,description:b,keywords:v,textdomain:w,supports:m}=l,h={apiVersion:u,title:(0,i.__)(p,"kotisivu-block-theme"),description:(0,i.__)(b,"kotisivu-block-theme"),category:f,icon:k,supports:m,keywords:v,textdomain:w,edit:e=>{const t=(0,s.useBlockProps)();return(0,n.createElement)("div",{...t},(0,n.createElement)(a(),{block:"ksd/site-social",attributes:e.attributes}))},save:()=>null,getEditWrapperProps(){return{"data-align":"full"}}};(0,r.registerBlockType)(d,h)}},o={};function i(e){var r=o[e];if(void 0!==r)return r.exports;var n=o[e]={exports:{}};return t[e](n,n.exports,i),n.exports}i.m=t,e=[],i.O=function(t,o,r,n){if(!o){var s=1/0;for(u=0;u<e.length;u++){o=e[u][0],r=e[u][1],n=e[u][2];for(var c=!0,a=0;a<o.length;a++)(!1&n||s>=n)&&Object.keys(i.O).every((function(e){return i.O[e](o[a])}))?o.splice(a--,1):(c=!1,n<s&&(s=n));if(c){e.splice(u--,1);var l=r();void 0!==l&&(t=l)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[o,r,n]},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,{a:t}),t},i.d=function(e,t){for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={2405:0,6823:0};i.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,n,s=o[0],c=o[1],a=o[2],l=0;if(s.some((function(t){return 0!==e[t]}))){for(r in c)i.o(c,r)&&(i.m[r]=c[r]);if(a)var u=a(i)}for(t&&t(o);l<s.length;l++)n=s[l],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(u)},o=self.webpackChunkkotisivu_block_theme=self.webpackChunkkotisivu_block_theme||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var r=i.O(void 0,[6823],(function(){return i(584)}));r=i.O(r)}();