(()=>{"use strict";var e,o={11:()=>{const e=window.wp.i18n,o=window.wp.blocks,t=window.wp.element,l=window.wp.blockEditor;window.wp.components.ColorPalette;const s=window.wp.data,r=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/column","title":"Column","category":"design","icon":"columns","description":"","keywords":["columns, column"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"parent":["ksd/section","ksd/wrapper"],"editorScript":"file:../../../../build/blocks/column.js","editorStyle":"file:../../../../build/blocks/column.css","style":"file:../../../../build/blocks/style-column.css","attributes":{"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]}}}'),{apiVersion:n,name:i,title:a,category:c,icon:p,description:d,keywords:k,textdomain:u,supports:m,parent:w}=r,b={apiVersion:n,title:(0,e.__)(a,"kotisivu-block-theme"),description:(0,e.__)(d,"kotisivu-block-theme"),category:c,icon:p,supports:m,keywords:k,textdomain:u,parent:w,edit:e=>{const{attributes:{template:o,templateLock:r,allowedBlocks:n},clientId:i}=e,a=(e=>{let{clientId:o,template:t,templateLock:r,allowedBlocks:n,blockProps:i}=e;const{hasChildBlocks:a}=(0,s.useSelect)((e=>{const{getBlockOrder:t}=e(l.store);return{hasChildBlocks:t(o).length>0}}),[o]);return(0,l.useInnerBlocksProps)({...i},{template:t,templateLock:r,allowedBlocks:n,renderAppender:a?void 0:l.InnerBlocks.ButtonBlockAppender})})({clientId:i,template:o,templateLock:r,allowedBlocks:n,blockProps:(0,l.useBlockProps)()});return(0,t.createElement)("div",a)},save:e=>{const o=l.useInnerBlocksProps.save(l.useBlockProps.save());return(0,t.createElement)("div",o)},getEditWrapperProps:()=>({"data-align":"full"})};(0,o.registerBlockType)(i,b)}},t={};function l(e){var s=t[e];if(void 0!==s)return s.exports;var r=t[e]={exports:{}};return o[e](r,r.exports,l),r.exports}l.m=o,e=[],l.O=(o,t,s,r)=>{if(!t){var n=1/0;for(p=0;p<e.length;p++){for(var[t,s,r]=e[p],i=!0,a=0;a<t.length;a++)(!1&r||n>=r)&&Object.keys(l.O).every((e=>l.O[e](t[a])))?t.splice(a--,1):(i=!1,r<n&&(n=r));if(i){e.splice(p--,1);var c=s();void 0!==c&&(o=c)}}return o}r=r||0;for(var p=e.length;p>0&&e[p-1][2]>r;p--)e[p]=e[p-1];e[p]=[t,s,r]},l.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e={593:0,508:0};l.O.j=o=>0===e[o];var o=(o,t)=>{var s,r,[n,i,a]=t,c=0;if(n.some((o=>0!==e[o]))){for(s in i)l.o(i,s)&&(l.m[s]=i[s]);if(a)var p=a(l)}for(o&&o(t);c<n.length;c++)r=n[c],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(p)},t=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))})();var s=l.O(void 0,[508],(()=>l(11)));s=l.O(s)})();