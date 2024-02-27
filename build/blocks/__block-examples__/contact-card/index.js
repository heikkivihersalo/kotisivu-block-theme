(()=>{var e,t={4564:(e,t,a)=>{"use strict";const r=window.wp.blocks,c=window.wp.i18n,l=JSON.parse('{"N9":"ksd/contact-card"}'),o=[{name:"contact-card-default",title:(0,c.__)("Contact Card | Single","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/contact-card-item",{templateLock:"all",template:[["core/heading",{level:2,className:"contact-card-item__heading",placeholder:"Add a heading"}],["core/image",{className:"contact-card-item__image"}],["core/paragraph",{className:"contact-card-item__name",placeholder:"Add a person name here."}]],blockClass:"contact-card-item",blockWrapper:"div"}]],attributes:{blockClass:"contact-card contact-card-single",blockWrapper:"div",templateLock:"all"}},{name:"contact-card-list",title:(0,c.__)("Contact Card | List","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/contact-card-item",{templateLock:"all",template:[["core/heading",{level:2,className:"contact-card-item__heading",placeholder:"Add a heading"}],["core/image",{className:"contact-card-item__image",sizeSlug:"medium",url:"https://picsum.photos/1920/1080"}],["core/paragraph",{className:"contact-card-item__name",placeholder:"Add a person name here."}]],blockClass:"contact-card-item",blockWrapper:"li"}],["ksd/contact-card-item",{templateLock:"all",template:[["core/heading",{level:2,className:"contact-card-item__heading",placeholder:"Add a heading"}],["core/image",{className:"contact-card-item__image",sizeSlug:"medium",url:"https://picsum.photos/1920/1080"}],["core/paragraph",{className:"contact-card-item__name",placeholder:"Add a person name here."}]],blockClass:"contact-card-item",blockWrapper:"li"}],["ksd/contact-card-item",{templateLock:"all",template:[["core/heading",{level:2,className:"contact-card-item__heading",placeholder:"Add a heading"}],["core/image",{className:"contact-card-item__image",sizeSlug:"medium",url:"https://picsum.photos/1920/1080"}],["core/paragraph",{className:"contact-card-item__name",placeholder:"Add a person name here."}]],blockClass:"contact-card-item",blockWrapper:"li"}]],attributes:{blockClass:"contact-card contact-card-list",blockWrapper:"ul",templateLock:"all"}}],s=window.React,n=window.wp.blockEditor;a(2084),window.wp.components;const i=window.wp.data,d=({setAttributes:e,blockVariations:t})=>t?(0,s.createElement)(s.Fragment,null,(0,s.createElement)(n.__experimentalBlockVariationPicker,{label:(0,c.__)("Choose variation","kotisivu-block-theme"),instructions:(0,c.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>{e((e=>({variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}))(t))},variations:t})):null,p=({anchor:e,children:t,blockWrapper:a,classes:r,styles:c})=>{const l=()=>(0,s.createElement)("div",{id:e||null,className:r,style:c},t);if(!a)return l;switch(a){case"div":return(0,s.createElement)("div",{id:e||null,className:r,style:c},t);case"li":return(0,s.createElement)("li",{id:e||null,className:r,style:c},t);default:return l}};(0,r.registerBlockType)(l.N9,{edit:e=>{const{attributes:{variationName:t,blockClass:a,blockWrapper:c,template:o,templateLock:m},clientId:u,setAttributes:k}=e,h=(({clientId:e,template:t,templateLock:a,allowedBlocks:r,blockProps:c})=>{const{hasChildBlocks:l}=(0,i.useSelect)((t=>{const{getBlockOrder:a}=t(n.store);return{hasChildBlocks:a(e).length>0}}),[e]);return(0,n.useInnerBlocksProps)({...c},{template:t,templateLock:a,allowedBlocks:r,renderAppender:l?void 0:n.InnerBlocks.ButtonBlockAppender})})({clientId:u,template:o,templateLock:m,blockProps:(0,n.useBlockProps)({className:a})}),b=(g=l.N9,(0,i.useSelect)((e=>{const{getBlockVariations:t}=e(r.store);return t(g,"block")}),[g]));var g;if(!t)return(0,s.createElement)(d,{setAttributes:k,blockVariations:b});let v={anchor:e.attributes?.anchor,children:h.children,blockWrapper:c,classes:h.className,styles:h.style};return(0,s.createElement)(s.Fragment,null,(0,s.createElement)(p,{...v}))},save:e=>{const{attributes:{blockClass:t,blockWrapper:a}}=e,r=n.useInnerBlocksProps.save(n.useBlockProps.save({className:t}));let c={anchor:e.attributes?.anchor,children:r.children,blockWrapper:a,classes:r.className,styles:r.style};return(0,s.createElement)(p,{...c})},variations:o,getEditWrapperProps:()=>({"data-align":"full"})})},2084:(e,t)=>{var a;!function(){"use strict";var r={}.hasOwnProperty;function c(){for(var e="",t=0;t<arguments.length;t++){var a=arguments[t];a&&(e=o(e,l(a)))}return e}function l(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return c.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var a in e)r.call(e,a)&&e[a]&&(t=o(t,a));return t}function o(e,t){return t?e?e+" "+t:e+t:e}e.exports?(c.default=c,e.exports=c):void 0===(a=function(){return c}.apply(t,[]))||(e.exports=a)}()}},a={};function r(e){var c=a[e];if(void 0!==c)return c.exports;var l=a[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=(t,a,c,l)=>{if(!a){var o=1/0;for(d=0;d<e.length;d++){for(var[a,c,l]=e[d],s=!0,n=0;n<a.length;n++)(!1&l||o>=l)&&Object.keys(r.O).every((e=>r.O[e](a[n])))?a.splice(n--,1):(s=!1,l<o&&(o=l));if(s){e.splice(d--,1);var i=c();void 0!==i&&(t=i)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[a,c,l]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={6884:0,2760:0};r.O.j=t=>0===e[t];var t=(t,a)=>{var c,l,[o,s,n]=a,i=0;if(o.some((t=>0!==e[t]))){for(c in s)r.o(s,c)&&(r.m[c]=s[c]);if(n)var d=n(r)}for(t&&t(a);i<o.length;i++)l=o[i],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(d)},a=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var c=r.O(void 0,[2760],(()=>r(4564)));c=r.O(c)})();