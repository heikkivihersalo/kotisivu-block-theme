(()=>{"use strict";var e,t={282:()=>{const e=window.wp.i18n,t=window.wp.blocks,s=window.wp.element,i=window.wp.blockEditor,l=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/link-list","title":"Link List","category":"blocks","icon":"id-alt","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/blocks/link-list.js","editorStyle":"file:../../../../build/blocks/link-list.css","style":"file:../../../../build/blocks/style-link-list.css","attributes":{"template":{"type":"array","default":[]},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaMime":{"type":"string","default":""},"mediaWidth":{"type":"number"},"mediaHeight":{"type":"number"}}}'),{apiVersion:o,name:r,title:n,category:a,icon:c,description:d,keywords:p,textdomain:k,supports:m}=l,u={apiVersion:o,title:(0,e.__)(n,"kotisivu-block-theme"),description:(0,e.__)(d,"kotisivu-block-theme"),category:a,icon:c,supports:m,keywords:p,textdomain:k,edit:e=>{const{attributes:{template:t}}=e,l=(0,i.useBlockProps)({className:"link-list"});return(0,s.createElement)("address",l,(0,s.createElement)(i.InnerBlocks,{allowedBlocks:"ksd/link-list-item",template:t,templateLock:"all"}))},save:e=>{const t=i.useBlockProps.save({className:"link-list"});return(0,s.createElement)("address",t,(0,s.createElement)(i.InnerBlocks.Content,null))}};(0,t.registerBlockType)(r,u)}},s={};function i(e){var l=s[e];if(void 0!==l)return l.exports;var o=s[e]={exports:{}};return t[e](o,o.exports,i),o.exports}i.m=t,e=[],i.O=(t,s,l,o)=>{if(!s){var r=1/0;for(d=0;d<e.length;d++){for(var[s,l,o]=e[d],n=!0,a=0;a<s.length;a++)(!1&o||r>=o)&&Object.keys(i.O).every((e=>i.O[e](s[a])))?s.splice(a--,1):(n=!1,o<r&&(r=o));if(n){e.splice(d--,1);var c=l();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[s,l,o]},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={227:0,620:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var l,o,[r,n,a]=s,c=0;if(r.some((t=>0!==e[t]))){for(l in n)i.o(n,l)&&(i.m[l]=n[l]);if(a)var d=a(i)}for(t&&t(s);c<r.length;c++)o=r[c],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(d)},s=globalThis.webpackChunkksd_custom_blocks=globalThis.webpackChunkksd_custom_blocks||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var l=i.O(void 0,[620],(()=>i(282)));l=i.O(l)})();