(()=>{var e,t={452:(e,t,l)=>{"use strict";const n=window.wp.i18n,r=window.wp.blocks,o=[{name:"section-100",title:(0,n.__)("Section | 100","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[],attributes:{blockClass:"grid-cols-1",style:{}}},{name:"section-50-50",title:(0,n.__)("Section | 50-50","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/column"],["ksd/column"]],attributes:{blockClass:"grid-cols-2",style:{}}},{name:"section-33-33-33",title:(0,n.__)("Section | 33-33-33","kotisivu-theme-blocks"),icon:"button",scope:"",innerBlocks:[["ksd/column"],["ksd/column"],["ksd/column"]],attributes:{blockClass:"grid-cols-3",style:{}}}],i=window.wp.element,s=window.wp.blockEditor;var a=l(184),c=l.n(a);const m=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":3,"name":"ksd/section","title":"Section","category":"containers","icon":"layout","description":"","keywords":["container, columns, column, wrapper"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"anchor":true,"html":true,"color":{"text":false,"background":true},"spacing":{"margin":["top","bottom"],"padding":true},"ariaLabel":true,"align":["full"]},"editorScript":"file:../../../../build/blocks/section.js","editorStyle":"file:../../../../build/blocks/section.css","style":"file:../../../../build/blocks/style-section.css","attributes":{"blockClass":{"type":"string","default":""},"style":{"type":"object","default":{"margin":{"top":"var(--wp--preset--spacing--50)","bottom":"var(--wp--preset--spacing--50)"}}},"ariaLabel":{"type":"string"},"ariaLabelledBy":{"type":"string"},"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"isReversed":{"type":"boolean","default":false},"variationName":{"type":"string","default":""}}}'),v=window.wp.components,u=window.wp.data,d=({attributes:e,setAttributes:t})=>{const{ariaLabel:l,ariaLabelledBy:r}=e;return(0,i.createElement)(i.Fragment,null,(0,i.createElement)(v.PanelBody,{title:(0,n.__)("Accessibility","kotisivu-block-theme"),initialOpen:!1},(0,i.createElement)(v.TextControl,{label:(0,n.__)("Aria Labelled By","kotisivu-block-theme"),help:(0,n.__)("Identifies the element (or elements) that labels the element it is applied to. Use the same ID as in the section heading.","kotisivu-block-theme"),value:r,onChange:e=>t({ariaLabelledBy:e})}),(0,i.createElement)(v.TextControl,{label:(0,n.__)("Aria label","kotisivu-block-theme"),help:(0,n.__)("If section heading doesn`t match correct description, you can use aria-label. IMPORTANT! Use aria-labelledby by default.","kotisivu-block-theme"),value:l,onChange:e=>t({ariaLabel:e})})))},p=({attributes:e,setAttributes:t})=>{const{style:l}=e;return(0,i.createElement)(s.PanelColorSettings,{title:(0,n.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:l.backgroundColor,onChange:e=>{return n=l,r=e,void t({style:{...n,backgroundColor:r}});var n,r},label:(0,n.__)("Background color","kotisivu-block-theme")}]})},h=({attributes:e,setAttributes:t})=>{const l="var(--wp--style--global--wide-size)",r="var(--wp--style--global--content-size)",o=(e,l)=>{t(l!==e?.width?{style:{...e,width:l}}:{style:{...e,width:void 0}})};return(0,i.createElement)(i.Fragment,null,(0,i.createElement)(v.PanelBody,{title:(0,n.__)("Width Controls","kotisivu-block-theme")},(0,i.createElement)(v.PanelRow,null,(0,i.createElement)("div",{className:"editor-width-controls"},(0,i.createElement)(v.ButtonGroup,null,(0,i.createElement)(v.Button,{icon:"align-full-width",isPressed:e.style?.width===l,onClick:()=>o(e.style,l)}),(0,i.createElement)(v.Button,{icon:"align-wide",isPressed:e.style?.width===r,onClick:()=>o(e.style,r)}))))))},g=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 34 29",...e},(0,i.createElement)("path",{d:"M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z",style:{fill:"currentColor"},transform:"translate(-278 -119.264)"})),k=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,i.createElement)("path",{d:"M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z",style:{fill:"currentColor"},transform:"translate(-86.984 -117.738)"})),b=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,i.createElement)("path",{d:"M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z",style:{fill:"currentColor"},transform:"translate(-182.977 -119.761)"})),y=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,i.createElement)("path",{d:"M148.981 121.808v22.084h-6v-22.084h6Zm10.003 0v14.037h-6v-14.037h6Zm8.023-2.989h-32.036v-3.038h32.036v3.038Z",style:{fill:"currentColor"},transform:"translate(-134.971 -115.781)"})),w=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,i.createElement)("path",{d:"M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z",style:{fill:"currentColor"},transform:"translate(-230.998 -115.78)"})),f=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 37 33",...e},(0,i.createElement)("path",{d:"M91.403 231.729v-5.976h3.037v5.976h6.581v6H94.44v8.063h4.507v6H94.44v5.997h-3.037v-5.997h-4.507v-6h4.507v-8.063h-6.581v-6h6.581Zm20.11 0v-5.976h3.038v5.976h6.581v6h-6.581v8.063h4.507v6h-4.507v5.997h-3.038v-5.997h-4.507v-6h4.507v-8.063h-6.58v-6h6.58Z",style:{fill:"currentColor"},transform:"translate(-84.822 -225.753)"})),E=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,i.createElement)("path",{d:"M211.966 237.729h-11.009v-6h11.009v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Zm-18.074 0h-11.008v-6h11.008v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Z",style:{fill:"currentColor"},transform:"translate(-182.884 -225.753)"})),B=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,i.createElement)("path",{d:"M138.017 231.729h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Zm18.049 0h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Z",style:{fill:"currentColor"},transform:"translate(-134.98 -225.753)"})),C=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 32 33",...e},(0,i.createElement)("path",{d:"M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z",style:{fill:"currentColor"},transform:"translate(-231.002 -225.753)"})),_=e=>{const{attributes:{style:t,isReversed:l},setAttributes:r}=e,o=(e,t)=>{r(t!==e?.alignItems?{style:{...e,alignItems:t}}:{style:{...e,alignItems:void 0}})},s=(e,t)=>{r(t!==e?.justifyItems?{style:{...e,justifyItems:t}}:{style:{...e,justifyItems:void 0}})};return(0,i.createElement)(i.Fragment,null,(0,i.createElement)(v.PanelBody,{title:(0,n.__)("Alignment Controls","kotisivu-block-theme")},(0,i.createElement)(v.PanelRow,null,(0,i.createElement)("div",{className:"editor-alignment-controls"},(0,i.createElement)("div",null,(0,i.createElement)("p",null,"Align-Items"),(0,i.createElement)(v.ButtonGroup,null,(0,i.createElement)(v.Button,{icon:(0,i.createElement)(k,null),isPressed:"center"===t?.alignItems,onClick:()=>o(t,"center")}),(0,i.createElement)(v.Button,{icon:(0,i.createElement)(y,null),isPressed:"start"===t?.alignItems,onClick:()=>o(t,"start")}),(0,i.createElement)(v.Button,{icon:(0,i.createElement)(b,null),isPressed:"end"===t?.alignItems,onClick:()=>o(t,"end")}),(0,i.createElement)(v.Button,{icon:(0,i.createElement)(w,null),isPressed:"stretch"===t?.alignItems,onClick:()=>o(t,"stretch")}),(0,i.createElement)(v.Button,{icon:(0,i.createElement)(g,null),isPressed:"baseline"===t?.alignItems,onClick:()=>o(t,"baseline")}))),(0,i.createElement)("div",null,(0,i.createElement)("p",null,"Justify-Items"),(0,i.createElement)(v.ButtonGroup,null,(0,i.createElement)(v.Button,{icon:(0,i.createElement)(f,null),isPressed:"center"===t?.justifyItems,onClick:()=>s(t,"center")}),(0,i.createElement)(v.Button,{icon:(0,i.createElement)(B,null),isPressed:"start"===t?.justifyItems,onClick:()=>s(t,"start")}),(0,i.createElement)(v.Button,{icon:(0,i.createElement)(E,null),isPressed:"end"===t?.justifyItems,onClick:()=>s(t,"end")}),(0,i.createElement)(v.Button,{icon:(0,i.createElement)(C,null),isPressed:"stretch"===t?.justifyItems,onClick:()=>s(t,"stretch")}))))),(0,i.createElement)(v.PanelRow,null,(0,i.createElement)(v.ToggleControl,{label:(0,n.__)("Reverse Order","kotisivu-block-theme"),checked:l,onChange:()=>r({isReversed:!l})}))))},x=e=>(0,i.createElement)(i.Fragment,null,(0,i.createElement)(s.InspectorControls,null,(0,i.createElement)(d,{...e})),(0,i.createElement)(s.InspectorControls,{group:"styles"},(0,i.createElement)(p,{...e}),(0,i.createElement)(_,{...e}),(0,i.createElement)(h,{...e}))),I=({setAttributes:e,blockVariations:t})=>t?(0,i.createElement)(i.Fragment,null,(0,i.createElement)(s.__experimentalBlockVariationPicker,{label:(0,n.__)("Choose variation","kotisivu-block-theme"),instructions:(0,n.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>e((e=>({variationName:e.name,template:e.innerBlocks,blockClass:e.attributes.blockClass,style:e.attributes.style}))(t)),variations:t})):null;function j({style:e}){const t=e=>{if("0"!=e)return"var(--wp--"+e.split(":")[1].trim().replaceAll("|","--")+")"};return{background:e.backgroundColor?e.backgroundColor:void 0,marginTop:e?.spacing?.margin?.top?t(e.spacing.margin.top):void 0,marginBottom:e?.spacing?.margin?.bottom?t(e.spacing.margin.bottom):void 0,paddingTop:e?.spacing?.padding?.top?t(e.spacing.padding.top):void 0,paddingBottom:e?.spacing?.padding?.bottom?t(e.spacing.padding.bottom):void 0,paddingLeft:e?.spacing?.padding?.left?t(e.spacing.padding.left):void 0,paddingRight:e?.spacing?.padding?.right?t(e.spacing.padding.right):void 0,width:e?.width?e?.width:void 0,justifyItems:e?.justifyItems?e?.justifyItems:void 0,alignItems:e?.alignItems?e?.alignItems:void 0}}const P=e=>!!e&&"is-reversed",{apiVersion:R,name:L,title:S,category:Z,icon:M,description:O,keywords:A,textdomain:N,supports:T}=m,V={apiVersion:R,title:(0,n.__)(S,"kotisivu-block-theme"),description:(0,n.__)(O,"kotisivu-block-theme"),category:Z,icon:M,supports:T,keywords:A,textdomain:N,variations:o,edit:e=>{const{attributes:{blockClass:t,ariaLabel:l,ariaLabelledBy:n,template:o,templateLock:a,style:v,variationName:d,isReversed:p},setAttributes:h,clientId:g}=e,k=(({clientId:e,template:t,templateLock:l,allowedBlocks:n,blockProps:r})=>{const{hasChildBlocks:o}=(0,u.useSelect)((t=>{const{getBlockOrder:l}=t(s.store);return{hasChildBlocks:l(e).length>0}}),[e]);return(0,s.useInnerBlocksProps)({...r},{template:t,templateLock:l,allowedBlocks:n,renderAppender:o?void 0:s.InnerBlocks.ButtonBlockAppender})})({clientId:g,template:o,templateLock:a,blockProps:(0,s.useBlockProps)({className:c()(t,P(p)),style:j({style:v}),"aria-label":l||null,"aria-labelledby":n||null})}),b=(y=m.name,(0,u.useSelect)((e=>{const{getBlockVariations:t}=e(r.store);return t(y,"block")}),[y]));var y;return d?(0,i.createElement)(i.Fragment,null,(0,i.createElement)(x,{...e}),(0,i.createElement)("section",{...k})):(0,i.createElement)(I,{setAttributes:h,blockVariations:b})},save:e=>{const{attributes:{blockClass:t,ariaLabel:l,ariaLabelledBy:n,style:r,isReversed:o}}=e,a=s.useInnerBlocksProps.save(s.useBlockProps.save({className:c()(t,P(o)),style:j({style:r}),"aria-label":l||null,"aria-labelledby":n||null}));return(0,i.createElement)("section",{...a})},getEditWrapperProps:()=>({"data-align":"full"})};(0,r.registerBlockType)(L,V)},184:(e,t)=>{var l;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var o=typeof l;if("string"===o||"number"===o)e.push(l);else if(Array.isArray(l)){if(l.length){var i=r.apply(null,l);i&&e.push(i)}}else if("object"===o){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){e.push(l.toString());continue}for(var s in l)n.call(l,s)&&l[s]&&e.push(s)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(l=function(){return r}.apply(t,[]))||(e.exports=l)}()}},l={};function n(e){var r=l[e];if(void 0!==r)return r.exports;var o=l[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,l,r,o)=>{if(!l){var i=1/0;for(m=0;m<e.length;m++){for(var[l,r,o]=e[m],s=!0,a=0;a<l.length;a++)(!1&o||i>=o)&&Object.keys(n.O).every((e=>n.O[e](l[a])))?l.splice(a--,1):(s=!1,o<i&&(i=o));if(s){e.splice(m--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var m=e.length;m>0&&e[m-1][2]>o;m--)e[m]=e[m-1];e[m]=[l,r,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={912:0,706:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var r,o,[i,s,a]=l,c=0;if(i.some((t=>0!==e[t]))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(a)var m=a(n)}for(t&&t(l);c<i.length;c++)o=i[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(m)},l=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var r=n.O(void 0,[706],(()=>n(452)));r=n.O(r)})();