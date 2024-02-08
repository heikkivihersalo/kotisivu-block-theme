!function(){var e,t={770:function(e,t,a){"use strict";var c=window.wp.blocks,r=window.wp.i18n,l=JSON.parse('{"u2":"ksd/contact-card"}'),o=[{name:"contact-card-default",title:(0,r.__)("Contact Card | Single","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/contact-card-item",{templateLock:"all",template:[["core/heading",{level:2,className:"contact-card-item__heading",placeholder:"Add a heading"}],["core/image",{className:"contact-card-item__image"}],["core/paragraph",{className:"contact-card-item__name",placeholder:"Add a person name here."}]],blockClass:"contact-card-item",blockWrapper:"div"}]],attributes:{blockClass:"contact-card contact-card-single",blockWrapper:"div",templateLock:"all"}},{name:"contact-card-list",title:(0,r.__)("Contact Card | List","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/contact-card-item",{templateLock:"all",template:[["core/heading",{level:2,className:"contact-card-item__heading",placeholder:"Add a heading"}],["core/image",{className:"contact-card-item__image",sizeSlug:"medium",url:"https://picsum.photos/1920/1080"}],["core/paragraph",{className:"contact-card-item__name",placeholder:"Add a person name here."}]],blockClass:"contact-card-item",blockWrapper:"li"}],["ksd/contact-card-item",{templateLock:"all",template:[["core/heading",{level:2,className:"contact-card-item__heading",placeholder:"Add a heading"}],["core/image",{className:"contact-card-item__image",sizeSlug:"medium",url:"https://picsum.photos/1920/1080"}],["core/paragraph",{className:"contact-card-item__name",placeholder:"Add a person name here."}]],blockClass:"contact-card-item",blockWrapper:"li"}],["ksd/contact-card-item",{templateLock:"all",template:[["core/heading",{level:2,className:"contact-card-item__heading",placeholder:"Add a heading"}],["core/image",{className:"contact-card-item__image",sizeSlug:"medium",url:"https://picsum.photos/1920/1080"}],["core/paragraph",{className:"contact-card-item__name",placeholder:"Add a person name here."}]],blockClass:"contact-card-item",blockWrapper:"li"}]],attributes:{blockClass:"contact-card contact-card-list",blockWrapper:"ul",templateLock:"all"}}],n=window.wp.element,s=window.wp.blockEditor;a(184),window.wp.components;var i=window.wp.data;const p=({setAttributes:e,blockVariations:t})=>t?(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.__experimentalBlockVariationPicker,{label:(0,r.__)("Choose variation","kotisivu-block-theme"),instructions:(0,r.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>{e((e=>({variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}))(t))},variations:t})):null,d=({anchor:e,children:t,blockWrapper:a,classes:c,styles:r})=>{const l=()=>(0,n.createElement)("div",{id:e||null,className:c,style:r},t);if(!a)return l;switch(a){case"div":return(0,n.createElement)("div",{id:e||null,className:c,style:r},t);case"li":return(0,n.createElement)("li",{id:e||null,className:c,style:r},t);default:return l}};(0,c.registerBlockType)(l.u2,{edit:e=>{const{attributes:{variationName:t,blockClass:a,blockWrapper:r,template:o,templateLock:m},clientId:u,setAttributes:k}=e,h=(({clientId:e,template:t,templateLock:a,allowedBlocks:c,blockProps:r})=>{const{hasChildBlocks:l}=(0,i.useSelect)((t=>{const{getBlockOrder:a}=t(s.store);return{hasChildBlocks:a(e).length>0}}),[e]);return(0,s.useInnerBlocksProps)({...r},{template:t,templateLock:a,allowedBlocks:c,renderAppender:l?void 0:s.InnerBlocks.ButtonBlockAppender})})({clientId:u,template:o,templateLock:m,blockProps:(0,s.useBlockProps)({className:a})}),b=(v=l.u2,(0,i.useSelect)((e=>{const{getBlockVariations:t}=e(c.store);return t(v,"block")}),[v]));var v;if(!t)return(0,n.createElement)(p,{setAttributes:k,blockVariations:b});let g={anchor:e.attributes?.anchor,children:h.children,blockWrapper:r,classes:h.className,styles:h.style};return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(d,{...g}))},save:e=>{const{attributes:{blockClass:t,blockWrapper:a}}=e,c=s.useInnerBlocksProps.save(s.useBlockProps.save({className:t}));let r={anchor:e.attributes?.anchor,children:c.children,blockWrapper:a,classes:c.className,styles:c.style};return(0,n.createElement)(d,{...r})},variations:o,getEditWrapperProps(){return{"data-align":"full"}}})},184:function(e,t){var a;!function(){"use strict";var c={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var l=typeof a;if("string"===l||"number"===l)e.push(a);else if(Array.isArray(a)){if(a.length){var o=r.apply(null,a);o&&e.push(o)}}else if("object"===l){if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]")){e.push(a.toString());continue}for(var n in a)c.call(a,n)&&a[n]&&e.push(n)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()}},a={};function c(e){var r=a[e];if(void 0!==r)return r.exports;var l=a[e]={exports:{}};return t[e](l,l.exports,c),l.exports}c.m=t,e=[],c.O=function(t,a,r,l){if(!a){var o=1/0;for(p=0;p<e.length;p++){a=e[p][0],r=e[p][1],l=e[p][2];for(var n=!0,s=0;s<a.length;s++)(!1&l||o>=l)&&Object.keys(c.O).every((function(e){return c.O[e](a[s])}))?a.splice(s--,1):(n=!1,l<o&&(o=l));if(n){e.splice(p--,1);var i=r();void 0!==i&&(t=i)}}return t}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[a,r,l]},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={681:0,401:0};c.O.j=function(t){return 0===e[t]};var t=function(t,a){var r,l,o=a[0],n=a[1],s=a[2],i=0;if(o.some((function(t){return 0!==e[t]}))){for(r in n)c.o(n,r)&&(c.m[r]=n[r]);if(s)var p=s(c)}for(t&&t(a);i<o.length;i++)l=o[i],c.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return c.O(p)},a=self.webpackChunkkotisivu_block_theme=self.webpackChunkkotisivu_block_theme||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var r=c.O(void 0,[401],(function(){return c(770)}));r=c.O(r)}();