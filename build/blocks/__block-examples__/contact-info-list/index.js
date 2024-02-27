(()=>{"use strict";var t,e={3668:()=>{const t=window.wp.blocks,e=window.wp.i18n,o=JSON.parse('{"N9":"ksd/contact-info-list"}'),l=[{name:"contact-info-list-default",title:(0,e.__)("Contact Info | Default","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/contact-info-list-item",{type:"email",content:"email@address.com"}],["ksd/contact-info-list-item",{type:"phone",content:"045 123 1234"}]],attributes:{blockClass:"contact-list",templateLock:"all"}}],a=window.React,s=window.wp.blockEditor,r=(window.wp.components,window.wp.data),n=({setAttributes:t,blockVariations:o})=>o?(0,a.createElement)(a.Fragment,null,(0,a.createElement)(s.__experimentalBlockVariationPicker,{label:(0,e.__)("Choose variation","kotisivu-block-theme"),instructions:(0,e.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:e=>{t((t=>({variationName:t?.name,template:t?.innerBlocks,childTemplate:t.attributes?.childTemplate,blockClass:t.attributes?.blockClass,style:t.attributes?.style}))(e))},variations:o})):null;(0,t.registerBlockType)(o.N9,{edit:e=>{const{attributes:{variationName:l,blockClass:i,template:c,templateLock:k},clientId:p,setAttributes:u}=e,m=(({clientId:t,template:e,templateLock:o,allowedBlocks:l,blockProps:a})=>{const{hasChildBlocks:n}=(0,r.useSelect)((e=>{const{getBlockOrder:o}=e(s.store);return{hasChildBlocks:o(t).length>0}}),[t]);return(0,s.useInnerBlocksProps)({...a},{template:e,templateLock:o,allowedBlocks:l,renderAppender:n?void 0:s.InnerBlocks.ButtonBlockAppender})})({clientId:p,template:c,templateLock:k,blockProps:(0,s.useBlockProps)({className:i})}),b=(d=o.N9,(0,r.useSelect)((e=>{const{getBlockVariations:o}=e(t.store);return o(d,"block")}),[d]));var d;return l?(0,a.createElement)(a.Fragment,null,(0,a.createElement)("ul",{...m})):(0,a.createElement)(n,{setAttributes:u,blockVariations:b})},save:t=>{const e=s.useInnerBlocksProps.save(s.useBlockProps.save({className:t.attributes?.blockClass}));return(0,a.createElement)("ul",{...e})},variations:l,getEditWrapperProps:()=>({"data-align":"full"})})}},o={};function l(t){var a=o[t];if(void 0!==a)return a.exports;var s=o[t]={exports:{}};return e[t](s,s.exports,l),s.exports}l.m=e,t=[],l.O=(e,o,a,s)=>{if(!o){var r=1/0;for(k=0;k<t.length;k++){for(var[o,a,s]=t[k],n=!0,i=0;i<o.length;i++)(!1&s||r>=s)&&Object.keys(l.O).every((t=>l.O[t](o[i])))?o.splice(i--,1):(n=!1,s<r&&(r=s));if(n){t.splice(k--,1);var c=a();void 0!==c&&(e=c)}}return e}s=s||0;for(var k=t.length;k>0&&t[k-1][2]>s;k--)t[k]=t[k-1];t[k]=[o,a,s]},l.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={6928:0,1556:0};l.O.j=e=>0===t[e];var e=(e,o)=>{var a,s,[r,n,i]=o,c=0;if(r.some((e=>0!==t[e]))){for(a in n)l.o(n,a)&&(l.m[a]=n[a]);if(i)var k=i(l)}for(e&&e(o);c<r.length;c++)s=r[c],l.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return l.O(k)},o=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})();var a=l.O(void 0,[1556],(()=>l(3668)));a=l.O(a)})();