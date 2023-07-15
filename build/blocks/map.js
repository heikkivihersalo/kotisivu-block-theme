(()=>{var e,t={60:(e,t,l)=>{"use strict";const r=window.wp.i18n,n=window.wp.blocks,s=[{name:"map-full-width",title:(0,r.__)("Map | Full Width","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["core/html",{className:"map__map"}]],attributes:{blockClass:"map",style:{}}},{name:"map-with-address",title:(0,r.__)("Map | With Address","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/wrapper",{blockClass:"map__address-container",variationName:"map-with-address",template:[["ksd/site-logo",{className:"map__logo",isLink:!1}],["ksd/site-address",{className:"map__address"}],["ksd/site-email",{className:"map__email"}]]}],["core/html",{className:"map__map"}]],attributes:{blockClass:"map grid-cols-2",style:{backgroundColor:"var(--wp--preset--color--grey-light)"}}}],o=window.wp.element,a=window.wp.blockEditor;var i=l(184),c=l.n(i);const m=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":3,"name":"ksd/map","title":"Map","category":"sections","icon":"location-alt","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false,"anchor":true,"html":true,"color":{"text":false,"background":true},"spacing":{"margin":["top","bottom"],"padding":true},"ariaLabel":true,"align":["full"]},"editorScript":"file:../../../../build/blocks/map.js","editorStyle":"file:../../../../build/blocks/map.css","style":"file:../../../../build/blocks/style-map.css","attributes":{"blockClass":{"type":"string","default":""},"style":{"type":"object","default":{"margin":{"top":"0","bottom":"var(--wp--preset--spacing--50)"}}},"ariaLabel":{"type":"string"},"ariaLabelledBy":{"type":"string"},"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"isReversed":{"type":"boolean","default":false},"variationName":{"type":"string","default":""}}}'),d=window.wp.components;d.ColorPalette;const v=window.wp.data,u=e=>{let{attributes:t,setAttributes:l}=e;const{ariaLabel:n,ariaLabelledBy:s}=t;return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(d.PanelBody,{title:(0,r.__)("Accessibility","kotisivu-block-theme"),initialOpen:!1},(0,o.createElement)(d.TextControl,{label:(0,r.__)("Aria Labelled By","kotisivu-block-theme"),help:(0,r.__)("Identifies the element (or elements) that labels the element it is applied to. Use the same ID as in the section heading.","kotisivu-block-theme"),value:s,onChange:e=>l({ariaLabelledBy:e})}),(0,o.createElement)(d.TextControl,{label:(0,r.__)("Aria label","kotisivu-block-theme"),help:(0,r.__)("If section heading doesn`t match correct description, you can use aria-label. IMPORTANT! Use aria-labelledby by default.","kotisivu-block-theme"),value:n,onChange:e=>l({ariaLabel:e})})))},p=e=>{let{attributes:t,setAttributes:l}=e;const{style:n}=t;return(0,o.createElement)(a.PanelColorSettings,{title:(0,r.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:n.backgroundColor,onChange:e=>{return t=n,r=e,void l({style:{...t,backgroundColor:r}});var t,r},label:(0,r.__)("Background color","kotisivu-block-theme")}]})},h=e=>{let{attributes:t,setAttributes:l}=e;const n="var(--wp--style--global--wide-size)",s="var(--wp--style--global--content-size)",a=(e,t)=>{l(t!==e?.width?{style:{...e,width:t}}:{style:{...e,width:void 0}})};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(d.PanelBody,{title:(0,r.__)("Width Controls","kotisivu-block-theme")},(0,o.createElement)(d.PanelRow,null,(0,o.createElement)("div",{className:"editor-width-controls"},(0,o.createElement)(d.ButtonGroup,null,(0,o.createElement)(d.Button,{icon:"align-full-width",isPressed:t.style?.width===n,onClick:()=>a(t.style,n)}),(0,o.createElement)(d.Button,{icon:"align-wide",isPressed:t.style?.width===s,onClick:()=>a(t.style,s)}))))))};function g(){return g=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r])}return e},g.apply(this,arguments)}const k=e=>(0,o.createElement)("svg",g({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 34 29"},e),(0,o.createElement)("path",{d:"M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z",style:{fill:"currentColor"},transform:"translate(-278 -119.264)"})),b=e=>(0,o.createElement)("svg",g({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29"},e),(0,o.createElement)("path",{d:"M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z",style:{fill:"currentColor"},transform:"translate(-86.984 -117.738)"})),y=e=>(0,o.createElement)("svg",g({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29"},e),(0,o.createElement)("path",{d:"M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z",style:{fill:"currentColor"},transform:"translate(-182.977 -119.761)"})),w=e=>(0,o.createElement)("svg",g({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29"},e),(0,o.createElement)("path",{d:"M148.981 121.808v22.084h-6v-22.084h6Zm10.003 0v14.037h-6v-14.037h6Zm8.023-2.989h-32.036v-3.038h32.036v3.038Z",style:{fill:"currentColor"},transform:"translate(-134.971 -115.781)"})),f=e=>(0,o.createElement)("svg",g({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33"},e),(0,o.createElement)("path",{d:"M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z",style:{fill:"currentColor"},transform:"translate(-230.998 -115.78)"})),E=e=>(0,o.createElement)("svg",g({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 37 33"},e),(0,o.createElement)("path",{d:"M91.403 231.729v-5.976h3.037v5.976h6.581v6H94.44v8.063h4.507v6H94.44v5.997h-3.037v-5.997h-4.507v-6h4.507v-8.063h-6.581v-6h6.581Zm20.11 0v-5.976h3.038v5.976h6.581v6h-6.581v8.063h4.507v6h-4.507v5.997h-3.038v-5.997h-4.507v-6h4.507v-8.063h-6.58v-6h6.58Z",style:{fill:"currentColor"},transform:"translate(-84.822 -225.753)"})),B=e=>(0,o.createElement)("svg",g({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33"},e),(0,o.createElement)("path",{d:"M211.966 237.729h-11.009v-6h11.009v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Zm-18.074 0h-11.008v-6h11.008v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Z",style:{fill:"currentColor"},transform:"translate(-182.884 -225.753)"})),C=e=>(0,o.createElement)("svg",g({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33"},e),(0,o.createElement)("path",{d:"M138.017 231.729h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Zm18.049 0h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Z",style:{fill:"currentColor"},transform:"translate(-134.98 -225.753)"})),_=e=>(0,o.createElement)("svg",g({xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 32 33"},e),(0,o.createElement)("path",{d:"M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z",style:{fill:"currentColor"},transform:"translate(-231.002 -225.753)"})),x=e=>{const{attributes:{style:t,isReversed:l},setAttributes:n}=e,s=(e,t)=>{n(t!==e?.alignItems?{style:{...e,alignItems:t}}:{style:{...e,alignItems:void 0}})},a=(e,t)=>{n(t!==e?.justifyItems?{style:{...e,justifyItems:t}}:{style:{...e,justifyItems:void 0}})};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(d.PanelBody,{title:(0,r.__)("Alignment Controls","kotisivu-block-theme")},(0,o.createElement)(d.PanelRow,null,(0,o.createElement)("div",{className:"editor-alignment-controls"},(0,o.createElement)("div",null,(0,o.createElement)("p",null,"Align-Items"),(0,o.createElement)(d.ButtonGroup,null,(0,o.createElement)(d.Button,{icon:(0,o.createElement)(b,null),isPressed:"center"===t?.alignItems,onClick:()=>s(t,"center")}),(0,o.createElement)(d.Button,{icon:(0,o.createElement)(w,null),isPressed:"start"===t?.alignItems,onClick:()=>s(t,"start")}),(0,o.createElement)(d.Button,{icon:(0,o.createElement)(y,null),isPressed:"end"===t?.alignItems,onClick:()=>s(t,"end")}),(0,o.createElement)(d.Button,{icon:(0,o.createElement)(f,null),isPressed:"stretch"===t?.alignItems,onClick:()=>s(t,"stretch")}),(0,o.createElement)(d.Button,{icon:(0,o.createElement)(k,null),isPressed:"baseline"===t?.alignItems,onClick:()=>s(t,"baseline")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"Justify-Items"),(0,o.createElement)(d.ButtonGroup,null,(0,o.createElement)(d.Button,{icon:(0,o.createElement)(E,null),isPressed:"center"===t?.justifyItems,onClick:()=>a(t,"center")}),(0,o.createElement)(d.Button,{icon:(0,o.createElement)(C,null),isPressed:"start"===t?.justifyItems,onClick:()=>a(t,"start")}),(0,o.createElement)(d.Button,{icon:(0,o.createElement)(B,null),isPressed:"end"===t?.justifyItems,onClick:()=>a(t,"end")}),(0,o.createElement)(d.Button,{icon:(0,o.createElement)(_,null),isPressed:"stretch"===t?.justifyItems,onClick:()=>a(t,"stretch")}))))),(0,o.createElement)(d.PanelRow,null,(0,o.createElement)(d.ToggleControl,{label:(0,r.__)("Reverse Order","kotisivu-block-theme"),checked:l,onChange:()=>n({isReversed:!l})}))))},I=e=>(0,o.createElement)(o.Fragment,null,(0,o.createElement)(a.InspectorControls,null,(0,o.createElement)(u,e)),(0,o.createElement)(a.InspectorControls,{group:"styles"},(0,o.createElement)(p,e),(0,o.createElement)(x,e),(0,o.createElement)(h,e))),j=e=>{let{setAttributes:t,blockVariations:l}=e;return l?(0,o.createElement)(o.Fragment,null,(0,o.createElement)(a.__experimentalBlockVariationPicker,{label:(0,r.__)("Choose variation","kotisivu-block-theme"),instructions:(0,r.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:e=>t((e=>({variationName:e.name,template:e.innerBlocks,blockClass:e.attributes.blockClass,style:e.attributes.style}))(e)),variations:l})):null};function P(e){const{style:t,width:l}=e,r=e=>{if("0"!=e)return"var(--wp--"+e.split(":")[1].trim().replaceAll("|","--")+")"};return{background:t.backgroundColor?t.backgroundColor:void 0,marginTop:t?.spacing?.margin?.top?r(t.spacing.margin.top):void 0,marginBottom:t?.spacing?.margin?.bottom?r(t.spacing.margin.bottom):void 0,paddingTop:t?.spacing?.padding?.top?r(t.spacing.padding.top):void 0,paddingBottom:t?.spacing?.padding?.bottom?r(t.spacing.padding.bottom):void 0,paddingLeft:t?.spacing?.padding?.left?r(t.spacing.padding.left):void 0,paddingRight:t?.spacing?.padding?.right?r(t.spacing.padding.right):void 0,width:t?.width?t?.width:void 0,justifyItems:t?.justifyItems?t?.justifyItems:void 0,alignItems:t?.alignItems?t?.alignItems:void 0}}const R=e=>!!e&&"is-reversed",{apiVersion:L,name:M,title:O,category:S,icon:Z,description:A,keywords:N,textdomain:T,supports:V}=m,F={apiVersion:L,title:(0,r.__)(O,"kotisivu-block-theme"),description:(0,r.__)(A,"kotisivu-block-theme"),category:S,icon:Z,supports:V,keywords:N,textdomain:T,variations:s,edit:e=>{const{attributes:{blockClass:t,ariaLabel:l,ariaLabelledBy:r,template:s,templateLock:i,style:d,variationName:u,isReversed:p},setAttributes:h,clientId:g}=e,k=(e=>{let{clientId:t,template:l,templateLock:r,allowedBlocks:n,blockProps:s}=e;const{hasChildBlocks:o}=(0,v.useSelect)((e=>{const{getBlockOrder:l}=e(a.store);return{hasChildBlocks:l(t).length>0}}),[t]);return(0,a.useInnerBlocksProps)({...s},{template:l,templateLock:r,allowedBlocks:n,renderAppender:o?void 0:a.InnerBlocks.ButtonBlockAppender})})({clientId:g,template:s,templateLock:i,blockProps:(0,a.useBlockProps)({className:c()(t,R(p)),style:P({style:d}),"aria-label":l||null,"aria-labelledby":r||null})}),b=(y=m.name,(0,v.useSelect)((e=>{const{getBlockVariations:t}=e(n.store);return t(y,"block")}),[y]));var y;return u?(0,o.createElement)(o.Fragment,null,(0,o.createElement)(I,e),(0,o.createElement)("section",k)):(0,o.createElement)(j,{setAttributes:h,blockVariations:b})},save:e=>{const{attributes:{blockClass:t,ariaLabel:l,ariaLabelledBy:r,style:n,isReversed:s}}=e,i=a.useInnerBlocksProps.save(a.useBlockProps.save({className:c()(t,R(s)),style:P({style:n}),"aria-label":l||null,"aria-labelledby":r||null}));return(0,o.createElement)("section",i)},getEditWrapperProps:()=>({"data-align":"full"})};(0,n.registerBlockType)(M,F)},184:(e,t)=>{var l;!function(){"use strict";var r={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var s=typeof l;if("string"===s||"number"===s)e.push(l);else if(Array.isArray(l)){if(l.length){var o=n.apply(null,l);o&&e.push(o)}}else if("object"===s){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){e.push(l.toString());continue}for(var a in l)r.call(l,a)&&l[a]&&e.push(a)}}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(l=function(){return n}.apply(t,[]))||(e.exports=l)}()}},l={};function r(e){var n=l[e];if(void 0!==n)return n.exports;var s=l[e]={exports:{}};return t[e](s,s.exports,r),s.exports}r.m=t,e=[],r.O=(t,l,n,s)=>{if(!l){var o=1/0;for(m=0;m<e.length;m++){for(var[l,n,s]=e[m],a=!0,i=0;i<l.length;i++)(!1&s||o>=s)&&Object.keys(r.O).every((e=>r.O[e](l[i])))?l.splice(i--,1):(a=!1,s<o&&(o=s));if(a){e.splice(m--,1);var c=n();void 0!==c&&(t=c)}}return t}s=s||0;for(var m=e.length;m>0&&e[m-1][2]>s;m--)e[m]=e[m-1];e[m]=[l,n,s]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var l in t)r.o(t,l)&&!r.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={842:0,93:0};r.O.j=t=>0===e[t];var t=(t,l)=>{var n,s,[o,a,i]=l,c=0;if(o.some((t=>0!==e[t]))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(i)var m=i(r)}for(t&&t(l);c<o.length;c++)s=o[c],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(m)},l=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var n=r.O(void 0,[93],(()=>r(60)));n=r.O(n)})();