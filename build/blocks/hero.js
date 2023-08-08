(()=>{var e,t={175:(e,t,l)=>{"use strict";const r=window.wp.i18n,n=window.wp.blocks,o=[{name:"hero-with-image",title:(0,r.__)("Hero | Background Image","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/wrapper",{wrapperClass:"hero__container",showAlignmentControls:!0,variationName:"wrapper-100",width:null,template:[["core/heading",{level:1,placeholder:"Hero Heading",className:"hero__heading"}],["core/paragraph",{placeholder:"Hero Text",className:"hero__text"}],["core/buttons",{placeholder:"Hero Buttons",className:"hero__buttons"}]]}],["core/image",{className:"hero__image",align:"full",sizeSlug:"full",url:"https://picsum.photos/1920/1080"}]],attributes:{blockClass:"hero is-stacked",templateLock:"all",width:"var(--wp--custom--wide-size)",style:{}}}],i=window.wp.element,a=window.wp.blockEditor;var s=l(184),c=l.n(s);const m=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":3,"name":"ksd/hero","title":"Hero","category":"sections","icon":"layout","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false,"anchor":true,"html":true,"color":{"text":false,"background":true},"spacing":{"margin":["top","bottom"],"padding":true},"ariaLabel":true,"align":["full"]},"editorScript":"file:../../../../build/blocks/hero.js","editorStyle":"file:../../../../build/blocks/hero.css","style":"file:../../../../build/blocks/style-hero.css","attributes":{"blockClass":{"type":"string","default":""},"style":{"type":"object","default":{"margin":{"top":"0","bottom":"var(--wp--preset--spacing--50)"}}},"ariaLabel":{"type":"string"},"ariaLabelledBy":{"type":"string"},"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"variationName":{"type":"string","default":""}}}'),u=window.wp.components,v=window.wp.data,d=({attributes:e,setAttributes:t})=>{const{ariaLabel:l,ariaLabelledBy:n}=e;return(0,i.createElement)(i.Fragment,null,(0,i.createElement)(u.PanelBody,{title:(0,r.__)("Accessibility","kotisivu-block-theme"),initialOpen:!1},(0,i.createElement)(u.TextControl,{label:(0,r.__)("Aria Labelled By","kotisivu-block-theme"),help:(0,r.__)("Identifies the element (or elements) that labels the element it is applied to. Use the same ID as in the section heading.","kotisivu-block-theme"),value:n,onChange:e=>t({ariaLabelledBy:e})}),(0,i.createElement)(u.TextControl,{label:(0,r.__)("Aria label","kotisivu-block-theme"),help:(0,r.__)("If section heading doesn`t match correct description, you can use aria-label. IMPORTANT! Use aria-labelledby by default.","kotisivu-block-theme"),value:l,onChange:e=>t({ariaLabel:e})})))},h=({attributes:e,setAttributes:t})=>{const{style:l}=e;return(0,i.createElement)(a.PanelColorSettings,{title:(0,r.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:l.backgroundColor,onChange:e=>{return r=l,n=e,void t({style:{...r,backgroundColor:n}});var r,n},label:(0,r.__)("Background color","kotisivu-block-theme")}]})},p=({attributes:e,setAttributes:t})=>{const l="var(--wp--custom--wide-size)",n="var(--wp--custom--content-size)",o=(e,l)=>{t(l!==e?.width?{style:{...e,width:l}}:{style:{...e,width:void 0}})};return(0,i.createElement)(i.Fragment,null,(0,i.createElement)(u.PanelBody,{title:(0,r.__)("Width Controls","kotisivu-block-theme")},(0,i.createElement)(u.PanelRow,null,(0,i.createElement)("div",{className:"editor-width-controls"},(0,i.createElement)(u.ButtonGroup,null,(0,i.createElement)(u.Button,{icon:"align-full-width",isPressed:e.style?.width===l,onClick:()=>o(e.style,l)}),(0,i.createElement)(u.Button,{icon:"align-wide",isPressed:e.style?.width===n,onClick:()=>o(e.style,n)}))))))},g=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 34 29",...e},(0,i.createElement)("path",{d:"M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z",style:{fill:"currentColor"},transform:"translate(-278 -119.264)"})),k=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,i.createElement)("path",{d:"M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z",style:{fill:"currentColor"},transform:"translate(-86.984 -117.738)"})),b=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,i.createElement)("path",{d:"M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z",style:{fill:"currentColor"},transform:"translate(-182.977 -119.761)"})),w=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,i.createElement)("path",{d:"M148.981 121.808v22.084h-6v-22.084h6Zm10.003 0v14.037h-6v-14.037h6Zm8.023-2.989h-32.036v-3.038h32.036v3.038Z",style:{fill:"currentColor"},transform:"translate(-134.971 -115.781)"})),y=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,i.createElement)("path",{d:"M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z",style:{fill:"currentColor"},transform:"translate(-230.998 -115.78)"})),f=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 37 33",...e},(0,i.createElement)("path",{d:"M91.403 231.729v-5.976h3.037v5.976h6.581v6H94.44v8.063h4.507v6H94.44v5.997h-3.037v-5.997h-4.507v-6h4.507v-8.063h-6.581v-6h6.581Zm20.11 0v-5.976h3.038v5.976h6.581v6h-6.581v8.063h4.507v6h-4.507v5.997h-3.038v-5.997h-4.507v-6h4.507v-8.063h-6.58v-6h6.58Z",style:{fill:"currentColor"},transform:"translate(-84.822 -225.753)"})),E=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,i.createElement)("path",{d:"M211.966 237.729h-11.009v-6h11.009v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Zm-18.074 0h-11.008v-6h11.008v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Z",style:{fill:"currentColor"},transform:"translate(-182.884 -225.753)"})),B=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,i.createElement)("path",{d:"M138.017 231.729h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Zm18.049 0h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Z",style:{fill:"currentColor"},transform:"translate(-134.98 -225.753)"})),C=e=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 32 33",...e},(0,i.createElement)("path",{d:"M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z",style:{fill:"currentColor"},transform:"translate(-231.002 -225.753)"})),_=e=>{const{attributes:{style:t,isReversed:l},setAttributes:n}=e,o=(e,t)=>{n(t!==e?.alignItems?{style:{...e,alignItems:t}}:{style:{...e,alignItems:void 0}})},a=(e,t)=>{n(t!==e?.justifyItems?{style:{...e,justifyItems:t}}:{style:{...e,justifyItems:void 0}})};return(0,i.createElement)(i.Fragment,null,(0,i.createElement)(u.PanelBody,{title:(0,r.__)("Alignment Controls","kotisivu-block-theme")},(0,i.createElement)(u.PanelRow,null,(0,i.createElement)("div",{className:"editor-alignment-controls"},(0,i.createElement)("div",null,(0,i.createElement)("p",null,"Align-Items"),(0,i.createElement)(u.ButtonGroup,null,(0,i.createElement)(u.Button,{icon:(0,i.createElement)(k,null),isPressed:"center"===t?.alignItems,onClick:()=>o(t,"center")}),(0,i.createElement)(u.Button,{icon:(0,i.createElement)(w,null),isPressed:"start"===t?.alignItems,onClick:()=>o(t,"start")}),(0,i.createElement)(u.Button,{icon:(0,i.createElement)(b,null),isPressed:"end"===t?.alignItems,onClick:()=>o(t,"end")}),(0,i.createElement)(u.Button,{icon:(0,i.createElement)(y,null),isPressed:"stretch"===t?.alignItems,onClick:()=>o(t,"stretch")}),(0,i.createElement)(u.Button,{icon:(0,i.createElement)(g,null),isPressed:"baseline"===t?.alignItems,onClick:()=>o(t,"baseline")}))),(0,i.createElement)("div",null,(0,i.createElement)("p",null,"Justify-Items"),(0,i.createElement)(u.ButtonGroup,null,(0,i.createElement)(u.Button,{icon:(0,i.createElement)(f,null),isPressed:"center"===t?.justifyItems,onClick:()=>a(t,"center")}),(0,i.createElement)(u.Button,{icon:(0,i.createElement)(B,null),isPressed:"start"===t?.justifyItems,onClick:()=>a(t,"start")}),(0,i.createElement)(u.Button,{icon:(0,i.createElement)(E,null),isPressed:"end"===t?.justifyItems,onClick:()=>a(t,"end")}),(0,i.createElement)(u.Button,{icon:(0,i.createElement)(C,null),isPressed:"stretch"===t?.justifyItems,onClick:()=>a(t,"stretch")}))))),(0,i.createElement)(u.PanelRow,null,(0,i.createElement)(u.ToggleControl,{label:(0,r.__)("Reverse Order","kotisivu-block-theme"),checked:l,onChange:()=>n({isReversed:!l})}))))},x=e=>(0,i.createElement)(i.Fragment,null,(0,i.createElement)(a.InspectorControls,null,(0,i.createElement)(d,{...e})),(0,i.createElement)(a.InspectorControls,{group:"styles"},(0,i.createElement)(h,{...e}),(0,i.createElement)(_,{...e}),(0,i.createElement)(p,{...e}))),I=({setAttributes:e,blockVariations:t})=>t?(0,i.createElement)(i.Fragment,null,(0,i.createElement)(a.__experimentalBlockVariationPicker,{label:(0,r.__)("Choose variation","kotisivu-block-theme"),instructions:(0,r.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>e((e=>({variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}))(t)),variations:t})):null;function j({style:e}){const t=e=>{if("0"!=e)return"var(--wp--"+e.split(":")[1].trim().replaceAll("|","--")+")"};return{background:e?.backgroundColor?e.backgroundColor:void 0,marginTop:e?.spacing?.margin?.top?t(e.spacing.margin.top):void 0,marginBottom:e?.spacing?.margin?.bottom?t(e.spacing.margin.bottom):void 0,paddingTop:e?.spacing?.padding?.top?t(e.spacing.padding.top):void 0,paddingBottom:e?.spacing?.padding?.bottom?t(e.spacing.padding.bottom):void 0,paddingLeft:e?.spacing?.padding?.left?t(e.spacing.padding.left):void 0,paddingRight:e?.spacing?.padding?.right?t(e.spacing.padding.right):void 0,width:e?.width?e?.width:void 0,justifyItems:e?.justifyItems?e?.justifyItems:void 0,alignItems:e?.alignItems?e?.alignItems:void 0}}const{apiVersion:P,name:L,title:R,category:S,icon:Z,description:M,keywords:A,textdomain:O,supports:N}=m,T={apiVersion:P,title:(0,r.__)(R,"kotisivu-block-theme"),description:(0,r.__)(M,"kotisivu-block-theme"),category:S,icon:Z,supports:N,keywords:A,textdomain:O,variations:o,edit:e=>{const{attributes:{heroClass:t,ariaLabel:l,ariaLabelledBy:r,template:o,templateLock:s,style:u,variationName:d},setAttributes:h,clientId:p}=e,g=(({clientId:e,template:t,templateLock:l,allowedBlocks:r,blockProps:n})=>{const{hasChildBlocks:o}=(0,v.useSelect)((t=>{const{getBlockOrder:l}=t(a.store);return{hasChildBlocks:l(e).length>0}}),[e]);return(0,a.useInnerBlocksProps)({...n},{template:t,templateLock:l,allowedBlocks:r,renderAppender:o?void 0:a.InnerBlocks.ButtonBlockAppender})})({clientId:p,template:o,templateLock:s,blockProps:(0,a.useBlockProps)({className:c()(t),style:j({style:u}),"aria-label":l||null,"aria-labelledby":r||null})}),k=(b=m.name,(0,v.useSelect)((e=>{const{getBlockVariations:t}=e(n.store);return t(b,"block")}),[b]));var b;return d?(0,i.createElement)(i.Fragment,null,(0,i.createElement)(x,{...e}),(0,i.createElement)("section",{...g})):(0,i.createElement)(I,{setAttributes:h,blockVariations:k})},save:e=>{const{attributes:{blockClass:t,ariaLabel:l,ariaLabelledBy:r,style:n}}=e,o=a.useInnerBlocksProps.save(a.useBlockProps.save({className:c()(t),style:j({style:n}),"aria-label":l||null,"aria-labelledby":r||null}));return(0,i.createElement)("section",{...o})},getEditWrapperProps:()=>({"data-align":"full"})};(0,n.registerBlockType)(L,T)},184:(e,t)=>{var l;!function(){"use strict";var r={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var o=typeof l;if("string"===o||"number"===o)e.push(l);else if(Array.isArray(l)){if(l.length){var i=n.apply(null,l);i&&e.push(i)}}else if("object"===o){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){e.push(l.toString());continue}for(var a in l)r.call(l,a)&&l[a]&&e.push(a)}}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(l=function(){return n}.apply(t,[]))||(e.exports=l)}()}},l={};function r(e){var n=l[e];if(void 0!==n)return n.exports;var o=l[e]={exports:{}};return t[e](o,o.exports,r),o.exports}r.m=t,e=[],r.O=(t,l,n,o)=>{if(!l){var i=1/0;for(m=0;m<e.length;m++){for(var[l,n,o]=e[m],a=!0,s=0;s<l.length;s++)(!1&o||i>=o)&&Object.keys(r.O).every((e=>r.O[e](l[s])))?l.splice(s--,1):(a=!1,o<i&&(i=o));if(a){e.splice(m--,1);var c=n();void 0!==c&&(t=c)}}return t}o=o||0;for(var m=e.length;m>0&&e[m-1][2]>o;m--)e[m]=e[m-1];e[m]=[l,n,o]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var l in t)r.o(t,l)&&!r.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={2279:0,6171:0};r.O.j=t=>0===e[t];var t=(t,l)=>{var n,o,[i,a,s]=l,c=0;if(i.some((t=>0!==e[t]))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(s)var m=s(r)}for(t&&t(l);c<i.length;c++)o=i[c],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(m)},l=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var n=r.O(void 0,[6171],(()=>r(175)));n=r.O(n)})();