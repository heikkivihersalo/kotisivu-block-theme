(()=>{var e,t={986:(e,t,r)=>{"use strict";const o=window.wp.blocks,l=JSON.parse('{"UU":"ksd/generic-carousel"}'),n=window.React,s=window.wp.blockEditor;var a=r(942),i=r.n(a);const c=window.wp.i18n,u=(window.wp.components,window.wp.data);function p({blockName:e,setAttributes:t}){const r=function(e){return(0,u.useSelect)((t=>{const{getBlockVariations:r}=t(o.store);return r(e,"block")}),[e])}(e);return r?(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.__experimentalBlockVariationPicker,{label:(0,c.__)("Choose variation","kotisivu-block-theme"),instructions:(0,c.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:e=>{t(function(e){return{variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}}(e))},variations:r})):null}window.wp.element;const d=[{name:"carousel-default",title:(0,c.__)("Default Carousel","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/generic-carousel-slide",{className:"generic-carousel__slide"}],["ksd/generic-carousel-slide",{className:"generic-carousel__slide"}],["ksd/generic-carousel-slide",{className:"generic-carousel__slide"}]],attributes:{blockClass:"generic-carousel__list",childTemplate:[["core/image",{className:"generic-carousel__slide-image"}]],templateLock:"all"}}];(0,o.registerBlockType)(l.UU,{edit:function(e){const{attributes:{blockClass:t,template:r,templateLock:o,allowedBlocks:a,variationName:c},clientId:d,setAttributes:k}=e,m=(({clientId:e,template:t,templateLock:r,allowedBlocks:o,blockProps:l})=>{const{hasChildBlocks:n}=(0,u.useSelect)((t=>{const{getBlockOrder:r}=t(s.store);return{hasChildBlocks:r(e).length>0}}),[e]);return(0,s.useInnerBlocksProps)({...l},{template:t,templateLock:r,allowedBlocks:o,renderAppender:n?void 0:s.InnerBlocks.ButtonBlockAppender})})({clientId:d,template:r,templateLock:o,blockProps:(0,s.useBlockProps)({className:i()("splide__list",t)}),allowedBlocks:a});return c?(0,n.createElement)(n.Fragment,null,(0,n.createElement)("ul",{...m})):(0,n.createElement)(p,{blockName:l.UU,setAttributes:k})},save:function(e){const{attributes:{blockClass:t}}=e,r=s.useInnerBlocksProps.save(s.useBlockProps.save({className:i()("splide__list",t)}));return(0,n.createElement)("ul",{...r})},variations:d,getEditWrapperProps:()=>({"data-align":"full"})})},942:(e,t)=>{var r;!function(){"use strict";var o={}.hasOwnProperty;function l(){for(var e="",t=0;t<arguments.length;t++){var r=arguments[t];r&&(e=s(e,n(r)))}return e}function n(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return l.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var r in e)o.call(e,r)&&e[r]&&(t=s(t,r));return t}function s(e,t){return t?e?e+" "+t:e+t:e}e.exports?(l.default=l,e.exports=l):void 0===(r=function(){return l}.apply(t,[]))||(e.exports=r)}()}},r={};function o(e){var l=r[e];if(void 0!==l)return l.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,o),n.exports}o.m=t,e=[],o.O=(t,r,l,n)=>{if(!r){var s=1/0;for(u=0;u<e.length;u++){for(var[r,l,n]=e[u],a=!0,i=0;i<r.length;i++)(!1&n||s>=n)&&Object.keys(o.O).every((e=>o.O[e](r[i])))?r.splice(i--,1):(a=!1,n<s&&(s=n));if(a){e.splice(u--,1);var c=l();void 0!==c&&(t=c)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[r,l,n]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={6034:0,1958:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var l,n,[s,a,i]=r,c=0;if(s.some((t=>0!==e[t]))){for(l in a)o.o(a,l)&&(o.m[l]=a[l]);if(i)var u=i(o)}for(t&&t(r);c<s.length;c++)n=s[c],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(u)},r=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var l=o.O(void 0,[1958],(()=>o(986)));l=o.O(l)})();