/*! For license information please see hero.js.LICENSE.txt */
!function(){var e={184:function(e,t){var l;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var o=typeof l;if("string"===o||"number"===o)e.push(l);else if(Array.isArray(l)){if(l.length){var s=r.apply(null,l);s&&e.push(s)}}else if("object"===o){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){e.push(l.toString());continue}for(var i in l)n.call(l,i)&&l[i]&&e.push(i)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(l=function(){return r}.apply(t,[]))||(e.exports=l)}()}},t={};function l(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,l),o.exports}l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,{a:t}),t},l.d=function(e,t){for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){"use strict";var e={};l.r(e);var t=window.wp.i18n,n=window.wp.blocks;var r=[{name:"hero-stacked",title:(0,t.__)("Hero | Stacked","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/wrapper",{blockClass:"hero__content",showAlignmentControls:!0,variationName:"wrapper-100",width:null,template:[["core/heading",{level:1,placeholder:"Hero Heading",className:"hero__heading"}],["core/paragraph",{placeholder:"Hero Text",className:"hero__text"}],["core/buttons",{placeholder:"Hero Buttons",className:"hero__buttons"}]]}],["core/image",{className:"hero__image",align:"full",sizeSlug:"full",url:"https://picsum.photos/1920/1080"}]],attributes:{blockClass:"hero hero-stacked is-stacked",templateLock:"all",width:"var(--wp--custom--wide-size)",style:{}}},{name:"hero-two-column",title:(0,t.__)("Hero | Two Columns","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/wrapper",{blockClass:"hero__content",showAlignmentControls:!0,variationName:"wrapper-100",width:null,template:[["core/heading",{level:1,placeholder:"Hero Heading",className:"hero__heading"}],["core/paragraph",{placeholder:"Hero Text",className:"hero__text"}],["core/buttons",{placeholder:"Hero Buttons",className:"hero__buttons"}]]}],["core/image",{className:"hero__image",align:"full",sizeSlug:"full",url:"https://picsum.photos/1920/1080"}]],attributes:{blockClass:"hero hero-two-column grid-cols-2",templateLock:"all",width:"var(--wp--custom--wide-size)",style:{}}}],o=window.wp.element,s=window.wp.blockEditor,i=l(184),a=l.n(i),c=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":3,"name":"ksd/hero","title":"Hero","category":"sections","icon":"layout","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false,"anchor":true,"html":true,"color":{"text":false,"background":true},"spacing":{"margin":["top","bottom"],"padding":true},"ariaLabel":true,"align":["full"]},"editorScript":"file:../../../../assets/js/blocks/hero.js","editorStyle":"file:../../../../assets/css/blocks/hero.css","style":"file:../../../../assets/css/blocks/style-hero.css","attributes":{"blockClass":{"type":"string","default":""},"style":{"type":"object","default":{"margin":{"top":"0","bottom":"var(--wp--preset--spacing--50)"}}},"ariaLabel":{"type":"string"},"ariaLabelledBy":{"type":"string"},"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"variationName":{"type":"string","default":""}}}'),u=window.wp.components;var m=window.wp.data;const d=({attributes:e,setAttributes:l})=>{const{ariaLabel:n,ariaLabelledBy:r}=e;return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u.PanelBody,{title:(0,t.__)("Accessibility","kotisivu-block-theme"),initialOpen:!1},(0,o.createElement)(u.TextControl,{label:(0,t.__)("Aria Labelled By","kotisivu-block-theme"),help:(0,t.__)("Identifies the element (or elements) that labels the element it is applied to. Use the same ID as in the section heading.","kotisivu-block-theme"),value:r,onChange:e=>l({ariaLabelledBy:e})}),(0,o.createElement)(u.TextControl,{label:(0,t.__)("Aria label","kotisivu-block-theme"),help:(0,t.__)("If section heading doesn`t match correct description, you can use aria-label. IMPORTANT! Use aria-labelledby by default.","kotisivu-block-theme"),value:n,onChange:e=>l({ariaLabel:e})})))},v=({attributes:e,setAttributes:l})=>{const{style:n}=e;return(0,o.createElement)(s.PanelColorSettings,{title:(0,t.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:n.backgroundColor,onChange:e=>{return t=n,r=e,void l({style:{...t,backgroundColor:r}});var t,r},label:(0,t.__)("Background color","kotisivu-block-theme")}]})},p=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 123",...e},(0,o.createElement)("path",{d:"M50.147 86h95.471v36.531H50.147V86Zm0-86h95.471v36.531H50.147V0Zm145.618 70.548H0V51.983h195.765v18.565Z",style:{fill:"currentColor"}})),h=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M47.53,130.841L143,130.841L143,167.373L47.53,167.373L47.53,130.841ZM47.53,28.087L143,28.087L143,64.618L47.53,64.618L47.53,28.087ZM0,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895ZM195.765,18.565L0,18.565L0,0L195.765,0L195.765,18.565Z",style:{fill:"currentColor"}})),L=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M143,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.53,176.895L47.53,140.428L143,140.428L143,176.895ZM47.53,18.565L0,18.565L0,0L195.765,0L195.765,18.565L143,18.565L143,54.991L47.53,54.991L47.53,18.565Z",style:{fill:"currentColor"}})),w=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M49.794,117.541L145.265,117.541L145.265,154.072L49.794,154.072L49.794,117.541ZM49.794,41.388L145.265,41.388L145.265,77.919L49.794,77.919L49.794,41.388ZM0,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895ZM195.765,18.565L0,18.565L0,0L195.765,0L195.765,18.565Z",style:{fill:"currentColor"}})),g=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M47.412,18.565L0,18.565L0,0L195.765,0L195.765,18.565L142.883,18.565L142.883,82.002L47.412,82.002L47.412,18.565ZM142.883,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.412,176.895L47.412,113.459L142.883,113.459L142.883,176.895Z",style:{fill:"currentColor"}})),y=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 34 29",...e},(0,o.createElement)("path",{d:"M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z",style:{fill:"currentColor"},transform:"translate(-278 -119.264)"})),k=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,o.createElement)("path",{d:"M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z",style:{fill:"currentColor"},transform:"translate(-86.984 -117.738)"})),b=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,o.createElement)("path",{d:"M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z",style:{fill:"currentColor"},transform:"translate(-182.977 -119.761)"})),E=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,o.createElement)("path",{d:"M148.981 121.808v22.084h-6v-22.084h6Zm10.003 0v14.037h-6v-14.037h6Zm8.023-2.989h-32.036v-3.038h32.036v3.038Z",style:{fill:"currentColor"},transform:"translate(-134.971 -115.781)"})),f=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,o.createElement)("path",{d:"M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z",style:{fill:"currentColor"},transform:"translate(-230.998 -115.78)"})),C=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 37 33",...e},(0,o.createElement)("path",{d:"M91.403 231.729v-5.976h3.037v5.976h6.581v6H94.44v8.063h4.507v6H94.44v5.997h-3.037v-5.997h-4.507v-6h4.507v-8.063h-6.581v-6h6.581Zm20.11 0v-5.976h3.038v5.976h6.581v6h-6.581v8.063h4.507v6h-4.507v5.997h-3.038v-5.997h-4.507v-6h4.507v-8.063h-6.58v-6h6.58Z",style:{fill:"currentColor"},transform:"translate(-84.822 -225.753)"})),x=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,o.createElement)("path",{d:"M211.966 237.729h-11.009v-6h11.009v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Zm-18.074 0h-11.008v-6h11.008v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Z",style:{fill:"currentColor"},transform:"translate(-182.884 -225.753)"})),B=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,o.createElement)("path",{d:"M138.017 231.729h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Zm18.049 0h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Z",style:{fill:"currentColor"},transform:"translate(-134.98 -225.753)"})),M=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 32 33",...e},(0,o.createElement)("path",{d:"M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z",style:{fill:"currentColor"},transform:"translate(-231.002 -225.753)"})),j=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-32 0 196 196",...e},(0,o.createElement)("path",{d:"M36.531,50.147L36.531,145.618L0,145.618L0,50.147L36.531,50.147ZM122.531,50.147L122.531,145.618L86,145.618L86,50.147L122.531,50.147ZM51.983,195.765L51.983,0L70.548,0L70.548,195.765L51.983,195.765Z",style:{fill:"currentColor"}})),Z=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-46 0 196 196",...e},(0,o.createElement)("path",{d:"M36.531,50.147L36.531,145.618L0,145.618L0,50.147L36.531,50.147ZM82.062,50.147L82.062,145.618L45.531,145.618L45.531,50.147L82.062,50.147ZM100.435,195.765L100.435,0L119,0L119,195.765L100.435,195.765Z",style:{fill:"currentColor"}})),_=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M64.618,47.53L64.618,143L28.087,143L28.087,47.53L64.618,47.53ZM167.373,47.53L167.373,143L130.841,143L130.841,47.53L167.373,47.53ZM18.565,0L18.565,195.765L0,195.765L0,0L18.565,0ZM176.895,195.765L176.895,0L195.459,0L195.459,195.765L176.895,195.765Z",style:{fill:"currentColor"}})),R=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M18.565,143L18.565,195.765L0,195.765L0,0L18.565,0L18.565,47.53L55.031,47.53L55.031,143L18.565,143ZM176.895,143L140.469,143L140.469,47.53L176.895,47.53L176.895,0L195.459,0L195.459,195.765L176.895,195.765L176.895,143Z",style:{fill:"currentColor"}})),S=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M18.565,0L18.565,195.765L0,195.765L0,0L18.565,0ZM176.895,195.765L176.895,0L195.459,0L195.459,195.765L176.895,195.765ZM77.919,49.794L77.919,145.265L41.388,145.265L41.388,49.794L77.919,49.794ZM154.072,49.794L154.072,145.265L117.541,145.265L117.541,49.794L154.072,49.794Z",style:{fill:"currentColor"}})),P=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-46 0 196 196",...e},(0,o.createElement)("path",{d:"M118.717,50.147L118.717,145.618L82.186,145.618L82.186,50.147L118.717,50.147ZM73.186,50.147L73.186,145.618L36.655,145.618L36.655,50.147L73.186,50.147ZM18.565,0L18.565,195.765L0,195.765L0,0L18.565,0Z",style:{fill:"currentColor"}})),A=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 198 198",...e},(0,o.createElement)("path",{d:"M197.019,53.942L197.019,137.827L-0,137.827L-0,53.942L197.019,53.942ZM168.962,166.058L168.962,193.942L28.058,193.942L28.058,166.058L168.962,166.058ZM168.962,0L168.962,27.884L28.058,27.884L28.058,0L168.962,0Z",style:{fill:"currentColor"}})),T=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 198 198",...e},(0,o.createElement)("path",{d:"M197.019,0L197.019,140.114L-0,140.114L-0,0L197.019,0ZM168.962,168.345L168.962,196.229L28.058,196.229L28.058,168.345L168.962,168.345Z",style:{fill:"currentColor"}})),I=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 -35 198 198",...e},(0,o.createElement)("path",{d:"M197.019,45.913L197.019,85.913L0,85.913L0,45.913L197.019,45.913ZM168.962,103.942L168.962,131.826L28.058,131.826L28.058,103.942L168.962,103.942ZM168.962,0L168.962,27.884L28.058,27.884L28.058,0L168.962,0Z",style:{fill:"currentColor"}})),N=({attributes:e,setAttributes:l})=>{const n="var(--wp--custom--wide-size)",r="var(--wp--custom--content-size)",s="var(--wp--custom--narrow-size)",i=(e,t,n)=>{l(n!==e?.[t]?{style:{...e,[t]:n}}:{style:{...e,[t]:void 0}})};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u.PanelBody,{title:(0,t.__)("Width Controls","kotisivu-block-theme")},(0,o.createElement)(u.PanelRow,null,(0,o.createElement)("div",{className:"editor-width-controls"},(0,o.createElement)("p",null,"width: ",(0,o.createElement)("span",{style:{opacity:.7,color:"var(--wp--preset--color--black)"}},e.style?.width)),(0,o.createElement)(u.ButtonGroup,null,(0,o.createElement)(u.Button,{label:"Set width as full",showTooltip:"true",icon:(0,o.createElement)(T,null),isPressed:e.style?.width===n,onClick:()=>i(e.style,"width",n)}),(0,o.createElement)(u.Button,{label:"Set width as content",showTooltip:"true",icon:(0,o.createElement)(A,null),isPressed:e.style?.width===r,onClick:()=>i(e.style,"width",r)}),(0,o.createElement)(u.Button,{label:"Set width as narrow",showTooltip:"true",icon:(0,o.createElement)(I,null),isPressed:e.style?.width===s,onClick:()=>i(e.style,"width",s)})))),(0,o.createElement)(u.PanelRow,null,(0,o.createElement)(u.ToggleControl,{label:"Set as 100% height",checked:"100%"===e.style?.height,onChange:()=>i(e.style,"height","100%")}))))},H=e=>{const{attributes:{style:l,isReversed:n},setAttributes:r}=e,s=(e,t,l)=>{r(l!==e?.[t]?{style:{...e,[t]:l}}:{style:{...e,[t]:void 0}})},i={opacity:.7,color:"var(--wp--preset--color--black)"};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u.PanelBody,{title:(0,t.__)("Alignment Controls","kotisivu-block-theme")},(0,o.createElement)(u.PanelRow,null,(0,o.createElement)("div",{className:"editor-alignment-controls"},(0,o.createElement)("div",null,(0,o.createElement)("p",null,"align-content: ",(0,o.createElement)("span",{style:i},l?.alignContent)),(0,o.createElement)(u.ButtonGroup,null,(0,o.createElement)(u.Button,{label:"Add align-content: center",showTooltip:"true",icon:(0,o.createElement)(p,null),isPressed:"center"===l?.alignContent,onClick:()=>s(l,"alignContent","center")}),(0,o.createElement)(u.Button,{label:"Add align-content: space-between",showTooltip:"true",icon:(0,o.createElement)(L,null),isPressed:"space-between"===l?.alignContent,onClick:()=>s(l,"alignContent","space-between")}),(0,o.createElement)(u.Button,{label:"Add align-content: space-around",showTooltip:"true",icon:(0,o.createElement)(h,null),isPressed:"space-around"===l?.alignContent,onClick:()=>s(l,"alignContent","space-around")}),(0,o.createElement)(u.Button,{label:"Add align-content: space-evenly",showTooltip:"true",icon:(0,o.createElement)(w,null),isPressed:"space-evenly"===l?.alignContent,onClick:()=>s(l,"alignContent","space-evenly")}),(0,o.createElement)(u.Button,{label:"Add align-content: stretch",showTooltip:"true",icon:(0,o.createElement)(g,null),isPressed:"stretch"===l?.alignContent,onClick:()=>s(l,"alignContent","stretch")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"justify-content: ",(0,o.createElement)("span",{style:i},l?.justifyContent)),(0,o.createElement)(u.ButtonGroup,null,(0,o.createElement)(u.Button,{label:"Add justify-content: center",showTooltip:"true",icon:(0,o.createElement)(j,null),isPressed:"center"===l?.justifyContent,onClick:()=>s(l,"justifyContent","center")}),(0,o.createElement)(u.Button,{label:"Add justify-content: start",showTooltip:"true",icon:(0,o.createElement)(P,null),isPressed:"start"===l?.justifyContent,onClick:()=>s(l,"justifyContent","start")}),(0,o.createElement)(u.Button,{label:"Add justify-content: end",showTooltip:"true",icon:(0,o.createElement)(Z,null),isPressed:"end"===l?.justifyContent,onClick:()=>onAlignChange(l,"justifyContent","end")}),(0,o.createElement)(u.Button,{label:"Add justify-content: space-between",showTooltip:"true",icon:(0,o.createElement)(R,null),isPressed:"space-between"===l?.justifyContent,onClick:()=>s(l,"justifyContent","space-between")}),(0,o.createElement)(u.Button,{label:"Add justify-content: space-around",showTooltip:"true",icon:(0,o.createElement)(_,null),isPressed:"space-around"===l?.justifyContent,onClick:()=>s(l,"justifyContent","space-around")}),(0,o.createElement)(u.Button,{label:"Add justify-content: space-evenly",showTooltip:"true",icon:(0,o.createElement)(S,null),isPressed:"space-evenly"===l?.justifyContent,onClick:()=>s(l,"justifyContent","space-evenly")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"align-items: ",(0,o.createElement)("span",{style:i},l?.alignItems)),(0,o.createElement)(u.ButtonGroup,null,(0,o.createElement)(u.Button,{label:"Add align-items: center",showTooltip:"true",icon:(0,o.createElement)(k,null),isPressed:"center"===l?.alignItems,onClick:()=>s(l,"alignItems","center")}),(0,o.createElement)(u.Button,{label:"Add align-items: start",showTooltip:"true",icon:(0,o.createElement)(E,null),isPressed:"start"===l?.alignItems,onClick:()=>s(l,"alignItems","start")}),(0,o.createElement)(u.Button,{label:"Add align-items: end",showTooltip:"true",icon:(0,o.createElement)(b,null),isPressed:"end"===l?.alignItems,onClick:()=>s(l,"alignItems","end")}),(0,o.createElement)(u.Button,{label:"Add align-items: stretch",showTooltip:"true",icon:(0,o.createElement)(f,null),isPressed:"stretch"===l?.alignItems,onClick:()=>s(l,"alignItems","stretch")}),(0,o.createElement)(u.Button,{label:"Add align-items: baseline",showTooltip:"true",icon:(0,o.createElement)(y,null),isPressed:"baseline"===l?.alignItems,onClick:()=>s(l,"alignItems","baseline")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"justify-items: ",(0,o.createElement)("span",{style:i},l?.justifyItems)),(0,o.createElement)(u.ButtonGroup,null,(0,o.createElement)(u.Button,{label:"Add justify-items: center",showTooltip:"true",icon:(0,o.createElement)(C,null),isPressed:"center"===l?.justifyItems,onClick:()=>s(l,"justifyItems","center")}),(0,o.createElement)(u.Button,{label:"Add justify-items: start",showTooltip:"true",icon:(0,o.createElement)(B,null),isPressed:"start"===l?.justifyItems,onClick:()=>s(l,"justifyItems","start")}),(0,o.createElement)(u.Button,{label:"Add justify-items: end",showTooltip:"true",icon:(0,o.createElement)(x,null),isPressed:"end"===l?.justifyItems,onClick:()=>s(l,"justifyItems","end")}),(0,o.createElement)(u.Button,{label:"Add justify-items: stretch",showTooltip:"true",icon:(0,o.createElement)(M,null),isPressed:"stretch"===l?.justifyItems,onClick:()=>s(l,"justifyItems","stretch")}))))),(0,o.createElement)(u.PanelRow,null,(0,o.createElement)(u.ToggleControl,{label:(0,t.__)("Reverse Order","kotisivu-block-theme"),checked:n,onChange:()=>r({isReversed:!n})}))))};var O=e=>(0,o.createElement)(o.Fragment,null,(0,o.createElement)(s.InspectorControls,null,(0,o.createElement)(d,{...e})),(0,o.createElement)(s.InspectorControls,{group:"styles"},(0,o.createElement)(v,{...e}),(0,o.createElement)(H,{...e}),(0,o.createElement)(N,{...e})));const V=({setAttributes:e,blockVariations:l})=>{if(!l)return null;return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(s.__experimentalBlockVariationPicker,{label:(0,t.__)("Choose variation","kotisivu-block-theme"),instructions:(0,t.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>{e((e=>({variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}))(t))},variations:l}))};var z=t=>{const{attributes:{blockClass:l,ariaLabel:r,ariaLabelledBy:i,template:u,templateLock:d,style:v,variationName:p},setAttributes:h,clientId:L}=t,w=(({clientId:e,template:t,templateLock:l,allowedBlocks:n,blockProps:r})=>{const{hasChildBlocks:o}=(0,m.useSelect)((t=>{const{getBlockOrder:l}=t(s.store);return{hasChildBlocks:l(e).length>0}}),[e]);return(0,s.useInnerBlocksProps)({...r},{template:t,templateLock:l,allowedBlocks:n,renderAppender:o?void 0:s.InnerBlocks.ButtonBlockAppender})})({clientId:L,template:u,templateLock:d,blockProps:(0,s.useBlockProps)({className:a()(l),style:(0,e.getBlockSyles)({style:v}),"aria-label":r||null,"aria-labelledby":i||null})}),g=(y=c.name,(0,m.useSelect)((e=>{const{getBlockVariations:t}=e(n.store);return t(y,"block")}),[y]));var y;return p?(0,o.createElement)(o.Fragment,null,(0,o.createElement)(O,{...t}),(0,o.createElement)("section",{...w})):(0,o.createElement)(V,{setAttributes:h,blockVariations:g})};var F=t=>{const{attributes:{blockClass:l,ariaLabel:n,ariaLabelledBy:r,style:i}}=t,c=s.useInnerBlocksProps.save(s.useBlockProps.save({className:a()(l),style:(0,e.getBlockSyles)({style:i}),"aria-label":n||null,"aria-labelledby":r||null}));return(0,o.createElement)("section",{...c})};const{apiVersion:G,name:U,title:W,category:D,icon:J,description:$,keywords:q,textdomain:K,supports:Q}=c,X={apiVersion:G,title:(0,t.__)(W,"kotisivu-block-theme"),description:(0,t.__)($,"kotisivu-block-theme"),category:D,icon:J,supports:Q,keywords:q,textdomain:K,variations:r,edit:z,save:F,getEditWrapperProps(){return{"data-align":"full"}}};(0,n.registerBlockType)(U,X)}()}();