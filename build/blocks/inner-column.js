(()=>{"use strict";var e,o={75:()=>{const e=window.wp.i18n,o=window.wp.blocks,t=window.wp.element,l=window.wp.blockEditor;window.wp.components.ColorPalette;const r=window.wp.data,s=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/inner-column","title":"Inner Column","category":"design","icon":"columns","description":"Optimized column for column container","keywords":["columns, column"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"parent":["ksd/column-container"],"editorScript":"file:../../../../build/blocks/build/inner-column.js","editorStyle":"file:../../../../build/blocks/build/inner-column.css","style":"file:../../../../build/blocks/build/style-inner-column.css","attributes":{"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]}}}'),{apiVersion:n,name:i,title:c,category:a,icon:p,description:d,keywords:u,textdomain:k,supports:m,parent:b}=s,w={apiVersion:n,title:(0,e.__)(c,"kotisivu-block-theme"),description:(0,e.__)(d,"kotisivu-block-theme"),category:a,icon:p,supports:m,keywords:u,textdomain:k,parent:b,edit:e=>{const{attributes:{template:o,templateLock:s,allowedBlocks:n},clientId:i}=e,c=(e=>{let{clientId:o,template:t,templateLock:s,allowedBlocks:n,blockProps:i}=e;const{hasChildBlocks:c}=(0,r.useSelect)((e=>{const{getBlockOrder:t}=e(l.store);return{hasChildBlocks:t(o).length>0}}),[o]);return(0,l.useInnerBlocksProps)({...i},{template:t,templateLock:s,allowedBlocks:n,renderAppender:c?void 0:l.InnerBlocks.ButtonBlockAppender})})({clientId:i,template:o,templateLock:s,allowedBlocks:n,blockProps:(0,l.useBlockProps)()});return(0,t.createElement)("div",c)},save:e=>{const o=l.useInnerBlocksProps.save(l.useBlockProps.save());return(0,t.createElement)("div",o)}};(0,o.registerBlockType)(i,w)}},t={};function l(e){var r=t[e];if(void 0!==r)return r.exports;var s=t[e]={exports:{}};return o[e](s,s.exports,l),s.exports}l.m=o,e=[],l.O=(o,t,r,s)=>{if(!t){var n=1/0;for(p=0;p<e.length;p++){for(var[t,r,s]=e[p],i=!0,c=0;c<t.length;c++)(!1&s||n>=s)&&Object.keys(l.O).every((e=>l.O[e](t[c])))?t.splice(c--,1):(i=!1,s<n&&(n=s));if(i){e.splice(p--,1);var a=r();void 0!==a&&(o=a)}}return o}s=s||0;for(var p=e.length;p>0&&e[p-1][2]>s;p--)e[p]=e[p-1];e[p]=[t,r,s]},l.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e={479:0,830:0};l.O.j=o=>0===e[o];var o=(o,t)=>{var r,s,[n,i,c]=t,a=0;if(n.some((o=>0!==e[o]))){for(r in i)l.o(i,r)&&(l.m[r]=i[r]);if(c)var p=c(l)}for(o&&o(t);a<n.length;a++)s=n[a],l.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return l.O(p)},t=globalThis.webpackChunkksd_custom_blocks=globalThis.webpackChunkksd_custom_blocks||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))})();var r=l.O(void 0,[830],(()=>l(75)));r=l.O(r)})();