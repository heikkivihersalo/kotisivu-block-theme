!function(){"use strict";var e,t={101:function(){var e=window.wp.i18n,t=window.wp.blocks,i=window.wp.element,r=window.wp.blockEditor;window.wp.serverSideRender;var o=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/audio-player","title":"Audio Player","category":"widgets","icon":"format-audio","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js","attributes":{}}');const{apiVersion:n,name:s,title:a,category:l,icon:c,description:p,keywords:u,textdomain:d,supports:f}=o,v={apiVersion:n,title:(0,e.__)(a,"kotisivu-block-theme"),description:(0,e.__)(p,"kotisivu-block-theme"),category:l,icon:c,supports:f,keywords:u,textdomain:d,edit:t=>((0,r.useBlockProps)(),(0,i.createElement)("div",{className:"audio-player__editor-wrapper"},(0,i.createElement)("p",{className:"audio-player__editor-text"},(0,e.__)("This is an accessible audio player with playlist feature. Your audio playlist will be rendered on the front-end.","kotisivu-block-theme")))),save:()=>null,getEditWrapperProps(){return{"data-align":"full"}}};(0,t.registerBlockType)(s,v)}},i={};function r(e){var o=i[e];if(void 0!==o)return o.exports;var n=i[e]={exports:{}};return t[e](n,n.exports,r),n.exports}r.m=t,e=[],r.O=function(t,i,o,n){if(!i){var s=1/0;for(p=0;p<e.length;p++){i=e[p][0],o=e[p][1],n=e[p][2];for(var a=!0,l=0;l<i.length;l++)(!1&n||s>=n)&&Object.keys(r.O).every((function(e){return r.O[e](i[l])}))?i.splice(l--,1):(a=!1,n<s&&(s=n));if(a){e.splice(p--,1);var c=o();void 0!==c&&(t=c)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[i,o,n]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={6302:0,5571:0};r.O.j=function(t){return 0===e[t]};var t=function(t,i){var o,n,s=i[0],a=i[1],l=i[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(l)var p=l(r)}for(t&&t(i);c<s.length;c++)n=s[c],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(p)},i=self.webpackChunkkotisivu_block_theme=self.webpackChunkkotisivu_block_theme||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var o=r.O(void 0,[5571],(function(){return r(101)}));o=r.O(o)}();