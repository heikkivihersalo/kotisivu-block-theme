(()=>{var e,t={329:(e,t,l)=>{"use strict";const r=window.wp.i18n,n=window.wp.blocks,o=[{name:"wrapper-100",title:(0,r.__)("Wrapper | 100","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[],attributes:{blockClass:"grid-cols-1",style:{}}},{name:"wrapper-50-50",title:(0,r.__)("Wrapper | 50-50","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/column"],["ksd/column"]],attributes:{blockClass:"grid-cols-2",style:{}}},{name:"wrapper-33-33-33",title:(0,r.__)("Wrapper | 33-33-33","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/column"],["ksd/column"],["ksd/column"]],attributes:{blockClass:"grid-cols-3",style:{}}}],s=window.wp.element,i=window.wp.blockEditor;var a=l(184),c=l.n(a);const v=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":3,"name":"ksd/wrapper","title":"Wrapper","category":"containers","icon":"layout","description":"","keywords":["container, columns, column, wrapper"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"anchor":true,"html":true,"color":{"text":false,"background":true},"spacing":{"margin":["top","bottom"],"padding":true},"align":["full"]},"editorScript":"file:../../../../build/blocks/wrapper.js","editorStyle":"file:../../../../build/blocks/wrapper.css","style":"file:../../../../build/blocks/style-wrapper.css","attributes":{"blockClass":{"type":"string","default":""},"style":{"type":"object","default":{}},"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"isReversed":{"type":"boolean","default":false},"variationName":{"type":"string","default":""}}}'),m=window.wp.components,d=window.wp.data,u=({attributes:e,setAttributes:t})=>{const{style:l}=e;return(0,s.createElement)(i.PanelColorSettings,{title:(0,r.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:l.backgroundColor,onChange:e=>{return r=l,n=e,void t({style:{...r,backgroundColor:n}});var r,n},label:(0,r.__)("Background color","kotisivu-block-theme")}]})},p=({attributes:e,setAttributes:t})=>{const l="var(--wp--style--global--wide-size)",n="var(--wp--style--global--content-size)",o=(e,l)=>{t(l!==e?.width?{style:{...e,width:l}}:{style:{...e,width:void 0}})};return(0,s.createElement)(s.Fragment,null,(0,s.createElement)(m.PanelBody,{title:(0,r.__)("Width Controls","kotisivu-block-theme")},(0,s.createElement)(m.PanelRow,null,(0,s.createElement)("div",{className:"editor-width-controls"},(0,s.createElement)(m.ButtonGroup,null,(0,s.createElement)(m.Button,{icon:"align-full-width",isPressed:e.style?.width===l,onClick:()=>o(e.style,l)}),(0,s.createElement)(m.Button,{icon:"align-wide",isPressed:e.style?.width===n,onClick:()=>o(e.style,n)}))))))},h=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 34 29",...e},(0,s.createElement)("path",{d:"M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z",style:{fill:"currentColor"},transform:"translate(-278 -119.264)"})),g=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,s.createElement)("path",{d:"M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z",style:{fill:"currentColor"},transform:"translate(-86.984 -117.738)"})),k=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,s.createElement)("path",{d:"M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z",style:{fill:"currentColor"},transform:"translate(-182.977 -119.761)"})),w=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,s.createElement)("path",{d:"M148.981 121.808v22.084h-6v-22.084h6Zm10.003 0v14.037h-6v-14.037h6Zm8.023-2.989h-32.036v-3.038h32.036v3.038Z",style:{fill:"currentColor"},transform:"translate(-134.971 -115.781)"})),b=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,s.createElement)("path",{d:"M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z",style:{fill:"currentColor"},transform:"translate(-230.998 -115.78)"})),y=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 37 33",...e},(0,s.createElement)("path",{d:"M91.403 231.729v-5.976h3.037v5.976h6.581v6H94.44v8.063h4.507v6H94.44v5.997h-3.037v-5.997h-4.507v-6h4.507v-8.063h-6.581v-6h6.581Zm20.11 0v-5.976h3.038v5.976h6.581v6h-6.581v8.063h4.507v6h-4.507v5.997h-3.038v-5.997h-4.507v-6h4.507v-8.063h-6.58v-6h6.58Z",style:{fill:"currentColor"},transform:"translate(-84.822 -225.753)"})),f=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,s.createElement)("path",{d:"M211.966 237.729h-11.009v-6h11.009v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Zm-18.074 0h-11.008v-6h11.008v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Z",style:{fill:"currentColor"},transform:"translate(-182.884 -225.753)"})),E=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,s.createElement)("path",{d:"M138.017 231.729h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Zm18.049 0h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Z",style:{fill:"currentColor"},transform:"translate(-134.98 -225.753)"})),B=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 32 33",...e},(0,s.createElement)("path",{d:"M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z",style:{fill:"currentColor"},transform:"translate(-231.002 -225.753)"})),C=e=>{const{attributes:{style:t,isReversed:l},setAttributes:n}=e,o=(e,t)=>{n(t!==e?.alignItems?{style:{...e,alignItems:t}}:{style:{...e,alignItems:void 0}})},i=(e,t)=>{n(t!==e?.justifyItems?{style:{...e,justifyItems:t}}:{style:{...e,justifyItems:void 0}})};return(0,s.createElement)(s.Fragment,null,(0,s.createElement)(m.PanelBody,{title:(0,r.__)("Alignment Controls","kotisivu-block-theme")},(0,s.createElement)(m.PanelRow,null,(0,s.createElement)("div",{className:"editor-alignment-controls"},(0,s.createElement)("div",null,(0,s.createElement)("p",null,"Align-Items"),(0,s.createElement)(m.ButtonGroup,null,(0,s.createElement)(m.Button,{icon:(0,s.createElement)(g,null),isPressed:"center"===t?.alignItems,onClick:()=>o(t,"center")}),(0,s.createElement)(m.Button,{icon:(0,s.createElement)(w,null),isPressed:"start"===t?.alignItems,onClick:()=>o(t,"start")}),(0,s.createElement)(m.Button,{icon:(0,s.createElement)(k,null),isPressed:"end"===t?.alignItems,onClick:()=>o(t,"end")}),(0,s.createElement)(m.Button,{icon:(0,s.createElement)(b,null),isPressed:"stretch"===t?.alignItems,onClick:()=>o(t,"stretch")}),(0,s.createElement)(m.Button,{icon:(0,s.createElement)(h,null),isPressed:"baseline"===t?.alignItems,onClick:()=>o(t,"baseline")}))),(0,s.createElement)("div",null,(0,s.createElement)("p",null,"Justify-Items"),(0,s.createElement)(m.ButtonGroup,null,(0,s.createElement)(m.Button,{icon:(0,s.createElement)(y,null),isPressed:"center"===t?.justifyItems,onClick:()=>i(t,"center")}),(0,s.createElement)(m.Button,{icon:(0,s.createElement)(E,null),isPressed:"start"===t?.justifyItems,onClick:()=>i(t,"start")}),(0,s.createElement)(m.Button,{icon:(0,s.createElement)(f,null),isPressed:"end"===t?.justifyItems,onClick:()=>i(t,"end")}),(0,s.createElement)(m.Button,{icon:(0,s.createElement)(B,null),isPressed:"stretch"===t?.justifyItems,onClick:()=>i(t,"stretch")}))))),(0,s.createElement)(m.PanelRow,null,(0,s.createElement)(m.ToggleControl,{label:(0,r.__)("Reverse Order","kotisivu-block-theme"),checked:l,onChange:()=>n({isReversed:!l})}))))},x=e=>(0,s.createElement)(s.Fragment,null,(0,s.createElement)(i.InspectorControls,{group:"styles"},(0,s.createElement)(u,{...e}),(0,s.createElement)(C,{...e}),(0,s.createElement)(p,{...e}))),_=({setAttributes:e,blockVariations:t})=>t?(0,s.createElement)(s.Fragment,null,(0,s.createElement)(i.__experimentalBlockVariationPicker,{label:(0,r.__)("Choose variation","kotisivu-block-theme"),instructions:(0,r.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>e((e=>({variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}))(t)),variations:t})):null;function j({style:e}){const t=e=>{if("0"!=e)return"var(--wp--"+e.split(":")[1].trim().replaceAll("|","--")+")"};return{background:e?.backgroundColor?e.backgroundColor:void 0,marginTop:e?.spacing?.margin?.top?t(e.spacing.margin.top):void 0,marginBottom:e?.spacing?.margin?.bottom?t(e.spacing.margin.bottom):void 0,paddingTop:e?.spacing?.padding?.top?t(e.spacing.padding.top):void 0,paddingBottom:e?.spacing?.padding?.bottom?t(e.spacing.padding.bottom):void 0,paddingLeft:e?.spacing?.padding?.left?t(e.spacing.padding.left):void 0,paddingRight:e?.spacing?.padding?.right?t(e.spacing.padding.right):void 0,width:e?.width?e?.width:void 0,justifyItems:e?.justifyItems?e?.justifyItems:void 0,alignItems:e?.alignItems?e?.alignItems:void 0}}const I=e=>!!e&&"is-reversed",{apiVersion:P,name:R,title:S,category:Z,icon:M,description:O,keywords:L,textdomain:A,supports:N}=v,T={apiVersion:P,title:(0,r.__)(S,"kotisivu-block-theme"),description:(0,r.__)(O,"kotisivu-block-theme"),category:Z,icon:M,supports:N,keywords:L,textdomain:A,variations:o,edit:e=>{const{attributes:{blockClass:t,template:l,templateLock:r,style:o,variationName:a,isReversed:m},setAttributes:u,clientId:p}=e,h=(({clientId:e,template:t,templateLock:l,allowedBlocks:r,blockProps:n})=>{const{hasChildBlocks:o}=(0,d.useSelect)((t=>{const{getBlockOrder:l}=t(i.store);return{hasChildBlocks:l(e).length>0}}),[e]);return(0,i.useInnerBlocksProps)({...n},{template:t,templateLock:l,allowedBlocks:r,renderAppender:o?void 0:i.InnerBlocks.ButtonBlockAppender})})({clientId:p,template:l,templateLock:r,blockProps:(0,i.useBlockProps)({className:c()(t,I(m)),style:j({style:o})})}),g=(k=v.name,(0,d.useSelect)((e=>{const{getBlockVariations:t}=e(n.store);return t(k,"block")}),[k]));var k;return a?(0,s.createElement)(s.Fragment,null,(0,s.createElement)(x,{...e}),(0,s.createElement)("div",{...h})):(0,s.createElement)(_,{setAttributes:u,blockVariations:g})},save:e=>{const{attributes:{blockClass:t,style:l,isReversed:r}}=e,n=i.useInnerBlocksProps.save(i.useBlockProps.save({className:c()(t,I(r)),style:j({style:l})}));return(0,s.createElement)("div",{...n})},getEditWrapperProps:()=>({"data-align":"full"})};(0,n.registerBlockType)(R,T)},184:(e,t)=>{var l;!function(){"use strict";var r={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var o=typeof l;if("string"===o||"number"===o)e.push(l);else if(Array.isArray(l)){if(l.length){var s=n.apply(null,l);s&&e.push(s)}}else if("object"===o){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){e.push(l.toString());continue}for(var i in l)r.call(l,i)&&l[i]&&e.push(i)}}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(l=function(){return n}.apply(t,[]))||(e.exports=l)}()}},l={};function r(e){var n=l[e];if(void 0!==n)return n.exports;var o=l[e]={exports:{}};return t[e](o,o.exports,r),o.exports}r.m=t,e=[],r.O=(t,l,n,o)=>{if(!l){var s=1/0;for(v=0;v<e.length;v++){for(var[l,n,o]=e[v],i=!0,a=0;a<l.length;a++)(!1&o||s>=o)&&Object.keys(r.O).every((e=>r.O[e](l[a])))?l.splice(a--,1):(i=!1,o<s&&(s=o));if(i){e.splice(v--,1);var c=n();void 0!==c&&(t=c)}}return t}o=o||0;for(var v=e.length;v>0&&e[v-1][2]>o;v--)e[v]=e[v-1];e[v]=[l,n,o]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var l in t)r.o(t,l)&&!r.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={186:0,481:0};r.O.j=t=>0===e[t];var t=(t,l)=>{var n,o,[s,i,a]=l,c=0;if(s.some((t=>0!==e[t]))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(a)var v=a(r)}for(t&&t(l);c<s.length;c++)o=s[c],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(v)},l=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var n=r.O(void 0,[481],(()=>r(329)));n=r.O(n)})();