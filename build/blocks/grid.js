(()=>{var e,t={979:(e,t,l)=>{"use strict";const r=window.wp.i18n,i=window.wp.blocks,n=window.wp.element,s=window.wp.blockEditor;var o=l(184),a=l.n(o);const c=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/grid","title":"Grid","category":"design","icon":"layout","description":"","keywords":["container, columns, column, 50, wrapper"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"html":true,"anchor":true,"color":{"text":false,"background":true},"spacing":{"margin":["top","bottom"],"padding":true}},"editorScript":"file:../../../../build/blocks/grid.js","editorStyle":"file:../../../../build/blocks/grid.css","style":"file:../../../../build/blocks/style-grid.css","attributes":{"style":{"type":"object"},"template":{"type":"array","default":[]},"childTemplate":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"variationName":{"type":"string","default":""}}}'),m=window.wp.components,d=window.wp.data,v=({attributes:e,setAttributes:t})=>{const{style:l}=e;return(0,n.createElement)(s.PanelColorSettings,{title:(0,r.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:l.backgroundColor,onChange:e=>{return r=l,i=e,void t({style:{...r,backgroundColor:i}});var r,i},label:(0,r.__)("Background color","kotisivu-block-theme")}]})},p=e=>(0,n.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 34 29",...e},(0,n.createElement)("path",{d:"M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z",style:{fill:"currentColor"},transform:"translate(-278 -119.264)"})),u=e=>(0,n.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,n.createElement)("path",{d:"M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z",style:{fill:"currentColor"},transform:"translate(-86.984 -117.738)"})),h=e=>(0,n.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,n.createElement)("path",{d:"M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z",style:{fill:"currentColor"},transform:"translate(-182.977 -119.761)"})),g=e=>(0,n.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,n.createElement)("path",{d:"M148.981 121.808v22.084h-6v-22.084h6Zm10.003 0v14.037h-6v-14.037h6Zm8.023-2.989h-32.036v-3.038h32.036v3.038Z",style:{fill:"currentColor"},transform:"translate(-134.971 -115.781)"})),k=e=>(0,n.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,n.createElement)("path",{d:"M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z",style:{fill:"currentColor"},transform:"translate(-230.998 -115.78)"})),b=e=>(0,n.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 37 33",...e},(0,n.createElement)("path",{d:"M91.403 231.729v-5.976h3.037v5.976h6.581v6H94.44v8.063h4.507v6H94.44v5.997h-3.037v-5.997h-4.507v-6h4.507v-8.063h-6.581v-6h6.581Zm20.11 0v-5.976h3.038v5.976h6.581v6h-6.581v8.063h4.507v6h-4.507v5.997h-3.038v-5.997h-4.507v-6h4.507v-8.063h-6.58v-6h6.58Z",style:{fill:"currentColor"},transform:"translate(-84.822 -225.753)"})),w=e=>(0,n.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,n.createElement)("path",{d:"M211.966 237.729h-11.009v-6h11.009v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Zm-18.074 0h-11.008v-6h11.008v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Z",style:{fill:"currentColor"},transform:"translate(-182.884 -225.753)"})),y=e=>(0,n.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,n.createElement)("path",{d:"M138.017 231.729h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Zm18.049 0h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Z",style:{fill:"currentColor"},transform:"translate(-134.98 -225.753)"})),f=e=>(0,n.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 32 33",...e},(0,n.createElement)("path",{d:"M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z",style:{fill:"currentColor"},transform:"translate(-231.002 -225.753)"})),E=e=>{const{attributes:{style:t,isReversed:l},setAttributes:i}=e,s=(e,t)=>{i(t!==e?.alignItems?{style:{...e,alignItems:t}}:{style:{...e,alignItems:void 0}})},o=(e,t)=>{i(t!==e?.justifyItems?{style:{...e,justifyItems:t}}:{style:{...e,justifyItems:void 0}})};return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(m.PanelBody,{title:(0,r.__)("Alignment Controls","kotisivu-block-theme")},(0,n.createElement)(m.PanelRow,null,(0,n.createElement)("div",{className:"editor-alignment-controls"},(0,n.createElement)("div",null,(0,n.createElement)("p",null,"Align-Items"),(0,n.createElement)(m.ButtonGroup,null,(0,n.createElement)(m.Button,{icon:(0,n.createElement)(u,null),isPressed:"center"===t?.alignItems,onClick:()=>s(t,"center")}),(0,n.createElement)(m.Button,{icon:(0,n.createElement)(g,null),isPressed:"start"===t?.alignItems,onClick:()=>s(t,"start")}),(0,n.createElement)(m.Button,{icon:(0,n.createElement)(h,null),isPressed:"end"===t?.alignItems,onClick:()=>s(t,"end")}),(0,n.createElement)(m.Button,{icon:(0,n.createElement)(k,null),isPressed:"stretch"===t?.alignItems,onClick:()=>s(t,"stretch")}),(0,n.createElement)(m.Button,{icon:(0,n.createElement)(p,null),isPressed:"baseline"===t?.alignItems,onClick:()=>s(t,"baseline")}))),(0,n.createElement)("div",null,(0,n.createElement)("p",null,"Justify-Items"),(0,n.createElement)(m.ButtonGroup,null,(0,n.createElement)(m.Button,{icon:(0,n.createElement)(b,null),isPressed:"center"===t?.justifyItems,onClick:()=>o(t,"center")}),(0,n.createElement)(m.Button,{icon:(0,n.createElement)(y,null),isPressed:"start"===t?.justifyItems,onClick:()=>o(t,"start")}),(0,n.createElement)(m.Button,{icon:(0,n.createElement)(w,null),isPressed:"end"===t?.justifyItems,onClick:()=>o(t,"end")}),(0,n.createElement)(m.Button,{icon:(0,n.createElement)(f,null),isPressed:"stretch"===t?.justifyItems,onClick:()=>o(t,"stretch")}))))),(0,n.createElement)(m.PanelRow,null,(0,n.createElement)(m.ToggleControl,{label:(0,r.__)("Reverse Order","kotisivu-block-theme"),checked:l,onChange:()=>i({isReversed:!l})}))))},_=e=>(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.InspectorControls,{group:"styles"},(0,n.createElement)(v,{...e}),(0,n.createElement)(E,{...e}))),C=({setAttributes:e,blockVariations:t})=>t?(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.__experimentalBlockVariationPicker,{label:(0,r.__)("Choose variation","kotisivu-block-theme"),instructions:(0,r.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>e((e=>({variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}))(t)),variations:t})):null;function B({style:e}){const t=e=>{if("0"!=e)return"var(--wp--"+e.split(":")[1].trim().replaceAll("|","--")+")"};return{background:e?.backgroundColor?e.backgroundColor:void 0,marginTop:e?.spacing?.margin?.top?t(e.spacing.margin.top):void 0,marginBottom:e?.spacing?.margin?.bottom?t(e.spacing.margin.bottom):void 0,paddingTop:e?.spacing?.padding?.top?t(e.spacing.padding.top):void 0,paddingBottom:e?.spacing?.padding?.bottom?t(e.spacing.padding.bottom):void 0,paddingLeft:e?.spacing?.padding?.left?t(e.spacing.padding.left):void 0,paddingRight:e?.spacing?.padding?.right?t(e.spacing.padding.right):void 0,width:e?.width?e?.width:void 0,justifyItems:e?.justifyItems?e?.justifyItems:void 0,alignItems:e?.alignItems?e?.alignItems:void 0}}const x=[{name:"grid-50-50",title:(0,r.__)("Grid | 50-50","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/grid-item",{blockClass:"grid-item is-stacked"}],["ksd/grid-item",{blockClass:"grid-item is-stacked"}],["ksd/grid-item",{blockClass:"grid-item is-stacked"}],["ksd/grid-item",{blockClass:"grid-item is-stacked"}]],attributes:{blockClass:"grid grid-cols-2",childTemplate:[["ksd/wrapper",{variationName:"wrapper-100",className:"grid-item__wrapper",template:[["core/heading",{className:"grid-item__heading"}],["core/paragraph",{className:"grid-item__paragraph"}],["core/button",{className:"grid-item__button"}]]}],["core/image",{className:"grid-item__background-image"}]],templateLock:"all",style:{}}},{name:"grid-33-33-33",title:(0,r.__)("Grid | 33-33-33","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/grid-item"],["ksd/grid-item"],["ksd/grid-item"],["ksd/grid-item"],["ksd/grid-item"],["ksd/grid-item"]],attributes:{blockClass:"grid grid-cols-3",childTemplate:[["ksd/wrapper",{variationName:"wrapper-100",className:"grid-item__wrapper",template:[["core/heading",{className:"grid-item__heading"}],["core/paragraph",{className:"grid-item__paragraph"}],["core/button",{className:"grid-item__button"}]]}],["core/image",{className:"grid-item__background-image"}]],templateLock:"all",style:{}}}],{apiVersion:j,name:I,title:R,category:P,icon:S,description:Z,keywords:N,textdomain:M,supports:L}=c,O={apiVersion:j,title:(0,r.__)(R,"kotisivu-block-theme"),description:(0,r.__)(Z,"kotisivu-block-theme"),category:P,icon:S,supports:L,keywords:N,textdomain:M,providesContext:{"ksd/childTemplate":"childTemplate"},variations:x,edit:e=>{const{attributes:{blockClass:t,template:l,templateLock:r,style:o,variationName:m},setAttributes:v,clientId:p}=e,u=(({clientId:e,template:t,templateLock:l,allowedBlocks:r,blockProps:i})=>{const{hasChildBlocks:n}=(0,d.useSelect)((t=>{const{getBlockOrder:l}=t(s.store);return{hasChildBlocks:l(e).length>0}}),[e]);return(0,s.useInnerBlocksProps)({...i},{template:t,templateLock:l,allowedBlocks:r,renderAppender:n?void 0:s.InnerBlocks.ButtonBlockAppender})})({clientId:p,template:l,templateLock:r,blockProps:(0,s.useBlockProps)({className:a()(t),style:B({style:o})})}),h=(g=c.name,(0,d.useSelect)((e=>{const{getBlockVariations:t}=e(i.store);return t(g,"block")}),[g]));var g;return m?(0,n.createElement)(n.Fragment,null,(0,n.createElement)(_,{...e}),(0,n.createElement)("div",{...u})):(0,n.createElement)(C,{setAttributes:v,blockVariations:h})},save:e=>{const{attributes:{blockClass:t,style:l}}=e,r=s.useInnerBlocksProps.save(s.useBlockProps.save({className:a()(t),style:B({style:l})}));return(0,n.createElement)("div",{...r})}};(0,i.registerBlockType)(I,O)},184:(e,t)=>{var l;!function(){"use strict";var r={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var n=typeof l;if("string"===n||"number"===n)e.push(l);else if(Array.isArray(l)){if(l.length){var s=i.apply(null,l);s&&e.push(s)}}else if("object"===n){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){e.push(l.toString());continue}for(var o in l)r.call(l,o)&&l[o]&&e.push(o)}}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(l=function(){return i}.apply(t,[]))||(e.exports=l)}()}},l={};function r(e){var i=l[e];if(void 0!==i)return i.exports;var n=l[e]={exports:{}};return t[e](n,n.exports,r),n.exports}r.m=t,e=[],r.O=(t,l,i,n)=>{if(!l){var s=1/0;for(m=0;m<e.length;m++){for(var[l,i,n]=e[m],o=!0,a=0;a<l.length;a++)(!1&n||s>=n)&&Object.keys(r.O).every((e=>r.O[e](l[a])))?l.splice(a--,1):(o=!1,n<s&&(s=n));if(o){e.splice(m--,1);var c=i();void 0!==c&&(t=c)}}return t}n=n||0;for(var m=e.length;m>0&&e[m-1][2]>n;m--)e[m]=e[m-1];e[m]=[l,i,n]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var l in t)r.o(t,l)&&!r.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={5276:0,3367:0};r.O.j=t=>0===e[t];var t=(t,l)=>{var i,n,[s,o,a]=l,c=0;if(s.some((t=>0!==e[t]))){for(i in o)r.o(o,i)&&(r.m[i]=o[i]);if(a)var m=a(r)}for(t&&t(l);c<s.length;c++)n=s[c],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(m)},l=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var i=r.O(void 0,[3367],(()=>r(979)));i=r.O(i)})();