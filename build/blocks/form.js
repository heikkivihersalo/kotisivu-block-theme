(()=>{var e,t={585:(e,t,l)=>{"use strict";const n=window.wp.i18n,r=window.wp.blocks,o=window.wp.element,i=window.wp.blockEditor;var s=l(184),a=l.n(s);const c=window.wp.components,m=window.wp.data,d=({attributes:e,setAttributes:t})=>{const{ariaLabel:l,ariaLabelledBy:r}=e;return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.PanelBody,{title:(0,n.__)("Accessibility","kotisivu-block-theme"),initialOpen:!1},(0,o.createElement)(c.TextControl,{label:(0,n.__)("Aria Labelled By","kotisivu-block-theme"),help:(0,n.__)("Identifies the element (or elements) that labels the element it is applied to. Use the same ID as in the section heading.","kotisivu-block-theme"),value:r,onChange:e=>t({ariaLabelledBy:e})}),(0,o.createElement)(c.TextControl,{label:(0,n.__)("Aria label","kotisivu-block-theme"),help:(0,n.__)("If section heading doesn`t match correct description, you can use aria-label. IMPORTANT! Use aria-labelledby by default.","kotisivu-block-theme"),value:l,onChange:e=>t({ariaLabel:e})})))},u=({attributes:e,setAttributes:t})=>{const{style:l}=e;return(0,o.createElement)(i.PanelColorSettings,{title:(0,n.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:l.backgroundColor,onChange:e=>{return n=l,r=e,void t({style:{...n,backgroundColor:r}});var n,r},label:(0,n.__)("Background color","kotisivu-block-theme")}]})},v=({attributes:e,setAttributes:t})=>{const l="var(--wp--custom--wide-size)",r="var(--wp--custom--content-size)",i=(e,l)=>{t(l!==e?.width?{style:{...e,width:l}}:{style:{...e,width:void 0}})};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.PanelBody,{title:(0,n.__)("Width Controls","kotisivu-block-theme")},(0,o.createElement)(c.PanelRow,null,(0,o.createElement)("div",{className:"editor-width-controls"},(0,o.createElement)(c.ButtonGroup,null,(0,o.createElement)(c.Button,{icon:"align-full-width",isPressed:e.style?.width===l,onClick:()=>i(e.style,l)}),(0,o.createElement)(c.Button,{icon:"align-wide",isPressed:e.style?.width===r,onClick:()=>i(e.style,r)}))))))},p=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 123",...e},(0,o.createElement)("path",{d:"M50.147 86h95.471v36.531H50.147V86Zm0-86h95.471v36.531H50.147V0Zm145.618 70.548H0V51.983h195.765v18.565Z",style:{fill:"currentColor"}})),h=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M47.53,130.841L143,130.841L143,167.373L47.53,167.373L47.53,130.841ZM47.53,28.087L143,28.087L143,64.618L47.53,64.618L47.53,28.087ZM0,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895ZM195.765,18.565L0,18.565L0,0L195.765,0L195.765,18.565Z",style:{fill:"currentColor"}})),g=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M143,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.53,176.895L47.53,140.428L143,140.428L143,176.895ZM47.53,18.565L0,18.565L0,0L195.765,0L195.765,18.565L143,18.565L143,54.991L47.53,54.991L47.53,18.565Z",style:{fill:"currentColor"}})),L=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M49.794,117.541L145.265,117.541L145.265,154.072L49.794,154.072L49.794,117.541ZM49.794,41.388L145.265,41.388L145.265,77.919L49.794,77.919L49.794,41.388ZM0,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895ZM195.765,18.565L0,18.565L0,0L195.765,0L195.765,18.565Z",style:{fill:"currentColor"}})),w=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M47.412,18.565L0,18.565L0,0L195.765,0L195.765,18.565L142.883,18.565L142.883,82.002L47.412,82.002L47.412,18.565ZM142.883,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.412,176.895L47.412,113.459L142.883,113.459L142.883,176.895Z",style:{fill:"currentColor"}})),k=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 34 29",...e},(0,o.createElement)("path",{d:"M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z",style:{fill:"currentColor"},transform:"translate(-278 -119.264)"})),y=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,o.createElement)("path",{d:"M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z",style:{fill:"currentColor"},transform:"translate(-86.984 -117.738)"})),f=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,o.createElement)("path",{d:"M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z",style:{fill:"currentColor"},transform:"translate(-182.977 -119.761)"})),E=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,o.createElement)("path",{d:"M148.981 121.808v22.084h-6v-22.084h6Zm10.003 0v14.037h-6v-14.037h6Zm8.023-2.989h-32.036v-3.038h32.036v3.038Z",style:{fill:"currentColor"},transform:"translate(-134.971 -115.781)"})),b=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,o.createElement)("path",{d:"M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z",style:{fill:"currentColor"},transform:"translate(-230.998 -115.78)"})),C=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 37 33",...e},(0,o.createElement)("path",{d:"M91.403 231.729v-5.976h3.037v5.976h6.581v6H94.44v8.063h4.507v6H94.44v5.997h-3.037v-5.997h-4.507v-6h4.507v-8.063h-6.581v-6h6.581Zm20.11 0v-5.976h3.038v5.976h6.581v6h-6.581v8.063h4.507v6h-4.507v5.997h-3.038v-5.997h-4.507v-6h4.507v-8.063h-6.58v-6h6.58Z",style:{fill:"currentColor"},transform:"translate(-84.822 -225.753)"})),x=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,o.createElement)("path",{d:"M211.966 237.729h-11.009v-6h11.009v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Zm-18.074 0h-11.008v-6h11.008v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Z",style:{fill:"currentColor"},transform:"translate(-182.884 -225.753)"})),B=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,o.createElement)("path",{d:"M138.017 231.729h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Zm18.049 0h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Z",style:{fill:"currentColor"},transform:"translate(-134.98 -225.753)"})),M=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 32 33",...e},(0,o.createElement)("path",{d:"M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z",style:{fill:"currentColor"},transform:"translate(-231.002 -225.753)"})),j=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-32 0 196 196",...e},(0,o.createElement)("path",{d:"M36.531,50.147L36.531,145.618L0,145.618L0,50.147L36.531,50.147ZM122.531,50.147L122.531,145.618L86,145.618L86,50.147L122.531,50.147ZM51.983,195.765L51.983,0L70.548,0L70.548,195.765L51.983,195.765Z",style:{fill:"currentColor"}})),Z=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-46 0 196 196",...e},(0,o.createElement)("path",{d:"M36.531,50.147L36.531,145.618L0,145.618L0,50.147L36.531,50.147ZM82.062,50.147L82.062,145.618L45.531,145.618L45.531,50.147L82.062,50.147ZM100.435,195.765L100.435,0L119,0L119,195.765L100.435,195.765Z",style:{fill:"currentColor"}})),R=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M64.618,47.53L64.618,143L28.087,143L28.087,47.53L64.618,47.53ZM167.373,47.53L167.373,143L130.841,143L130.841,47.53L167.373,47.53ZM18.565,0L18.565,195.765L0,195.765L0,0L18.565,0ZM176.895,195.765L176.895,0L195.459,0L195.459,195.765L176.895,195.765Z",style:{fill:"currentColor"}})),I=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M18.565,143L18.565,195.765L0,195.765L0,0L18.565,0L18.565,47.53L55.031,47.53L55.031,143L18.565,143ZM176.895,143L140.469,143L140.469,47.53L176.895,47.53L176.895,0L195.459,0L195.459,195.765L176.895,195.765L176.895,143Z",style:{fill:"currentColor"}})),P=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M18.565,0L18.565,195.765L0,195.765L0,0L18.565,0ZM176.895,195.765L176.895,0L195.459,0L195.459,195.765L176.895,195.765ZM77.919,49.794L77.919,145.265L41.388,145.265L41.388,49.794L77.919,49.794ZM154.072,49.794L154.072,145.265L117.541,145.265L117.541,49.794L154.072,49.794Z",style:{fill:"currentColor"}})),S=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-46 0 196 196",...e},(0,o.createElement)("path",{d:"M118.717,50.147L118.717,145.618L82.186,145.618L82.186,50.147L118.717,50.147ZM73.186,50.147L73.186,145.618L36.655,145.618L36.655,50.147L73.186,50.147ZM18.565,0L18.565,195.765L0,195.765L0,0L18.565,0Z",style:{fill:"currentColor"}})),_=e=>{const{attributes:{style:t,isReversed:l},setAttributes:r}=e,i=(e,t,l)=>{r(l!==e?.[t]?{style:{...e,[t]:l}}:{style:{...e,[t]:void 0}})};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.PanelBody,{title:(0,n.__)("Alignment Controls","kotisivu-block-theme")},(0,o.createElement)(c.PanelRow,null,(0,o.createElement)("div",{className:"editor-alignment-controls"},(0,o.createElement)("div",null,(0,o.createElement)("p",null,"Align-Content"),(0,o.createElement)(c.ButtonGroup,null,(0,o.createElement)(c.Button,{icon:(0,o.createElement)(p,null),isPressed:"center"===t?.alignContent,onClick:()=>i(t,"alignContent","center")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(g,null),isPressed:"space-between"===t?.alignContent,onClick:()=>i(t,"alignContent","space-between")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(h,null),isPressed:"space-around"===t?.alignContent,onClick:()=>i(t,"alignContent","space-around")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(L,null),isPressed:"space-evenly"===t?.alignContent,onClick:()=>i(t,"alignContent","space-evenly")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(w,null),isPressed:"stretch"===t?.alignContent,onClick:()=>i(t,"alignContent","stretch")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"Justify-Content"),(0,o.createElement)(c.ButtonGroup,null,(0,o.createElement)(c.Button,{icon:(0,o.createElement)(j,null),isPressed:"center"===t?.justifyContent,onClick:()=>i(t,"justifyContent","center")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(S,null),isPressed:"start"===t?.justifyContent,onClick:()=>i(t,"justifyContent","start")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(Z,null),isPressed:"end"===t?.justifyContent,onClick:()=>i(t,"justifyContent","end")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(I,null),isPressed:"space-between"===t?.justifyContent,onClick:()=>i(t,"justifyContent","space-between")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(R,null),isPressed:"space-around"===t?.justifyContent,onClick:()=>i(t,"justifyContent","space-around")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(P,null),isPressed:"space-evenly"===t?.justifyContent,onClick:()=>i(t,"justifyContent","space-evenly")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"Align-Items"),(0,o.createElement)(c.ButtonGroup,null,(0,o.createElement)(c.Button,{icon:(0,o.createElement)(y,null),isPressed:"center"===t?.alignItems,onClick:()=>i(t,"alignItems","center")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(E,null),isPressed:"start"===t?.alignItems,onClick:()=>i(t,"alignItems","start")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(f,null),isPressed:"end"===t?.alignItems,onClick:()=>i(t,"alignItems","end")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(b,null),isPressed:"stretch"===t?.alignItems,onClick:()=>i(t,"alignItems","stretch")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(k,null),isPressed:"baseline"===t?.alignItems,onClick:()=>i(t,"alignItems","baseline")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"Justify-Items"),(0,o.createElement)(c.ButtonGroup,null,(0,o.createElement)(c.Button,{icon:(0,o.createElement)(C,null),isPressed:"center"===t?.justifyItems,onClick:()=>i(t,"justifyItems","center")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(B,null),isPressed:"start"===t?.justifyItems,onClick:()=>i(t,"justifyItems","start")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(x,null),isPressed:"end"===t?.justifyItems,onClick:()=>i(t,"justifyItems","end")}),(0,o.createElement)(c.Button,{icon:(0,o.createElement)(M,null),isPressed:"stretch"===t?.justifyItems,onClick:()=>i(t,"justifyItems","stretch")}))))),(0,o.createElement)(c.PanelRow,null,(0,o.createElement)(c.ToggleControl,{label:(0,n.__)("Reverse Order","kotisivu-block-theme"),checked:l,onChange:()=>r({isReversed:!l})}))))},O=e=>(0,o.createElement)(o.Fragment,null,(0,o.createElement)(i.InspectorControls,null,(0,o.createElement)(d,{...e})),(0,o.createElement)(i.InspectorControls,{group:"styles"},(0,o.createElement)(u,{...e}),(0,o.createElement)(_,{...e}),(0,o.createElement)(v,{...e})));function A({style:e}){const t=e=>{if("0"!=e)return"var(--wp--"+e.split(":")[1].trim().replaceAll("|","--")+")"};return{background:e?.backgroundColor?e.backgroundColor:void 0,marginTop:e?.spacing?.margin?.top?t(e.spacing.margin.top):void 0,marginBottom:e?.spacing?.margin?.bottom?t(e.spacing.margin.bottom):void 0,paddingTop:e?.spacing?.padding?.top?t(e.spacing.padding.top):void 0,paddingBottom:e?.spacing?.padding?.bottom?t(e.spacing.padding.bottom):void 0,paddingLeft:e?.spacing?.padding?.left?t(e.spacing.padding.left):void 0,paddingRight:e?.spacing?.padding?.right?t(e.spacing.padding.right):void 0,width:e?.width?e?.width:void 0,display:(e=>!!(e?.justifyContent||e?.justifyItems||e?.alignItems||e?.alignContent))(e)?"grid":void 0,justifyItems:e?.justifyItems?e?.justifyItems:void 0,alignItems:e?.alignItems?e?.alignItems:void 0,alignContent:e?.alignContent?e?.alignContent:void 0}}const T=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/form","title":"Form","category":"widgets","icon":"editor-table","description":"Form","keywords":["form, contact form"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"anchor":true,"html":true,"color":{"text":false,"background":true},"spacing":{"margin":["top","bottom"],"padding":true}},"editorScript":"file:../../../../build/blocks/form.js","editorStyle":"file:../../../../build/blocks/form.css","style":"file:../../../../build/blocks/style-form.css","attributes":{"blockClass":{"type":"string","default":"contact-us"},"style":{"type":"object","default":{"margin":{"top":"var(--wp--preset--spacing--50)","bottom":"var(--wp--preset--spacing--50)"}}},"ariaLabel":{"type":"string"},"ariaLabelledBy":{"type":"string"},"template":{"type":"array","default":[["core/heading",{"placeholder":"Otsikko","level":2}],["core/shortcode",{"text":"[fluentform id=\'3\']"}]]},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]}}}'),{apiVersion:F,name:H,title:N,category:V,icon:G,description:J,keywords:z,textdomain:U,supports:W}=T,D={apiVersion:F,title:(0,n.__)(N,"kotisivu-block-theme"),description:(0,n.__)(J,"kotisivu-block-theme"),category:V,icon:G,supports:W,keywords:z,textdomain:U,edit:e=>{const{attributes:{ariaLabel:t,ariaLabelledBy:l,blockClass:n,template:r,templateLock:s,style:c},clientId:d}=e,u=(({clientId:e,template:t,templateLock:l,allowedBlocks:n,blockProps:r})=>{const{hasChildBlocks:o}=(0,m.useSelect)((t=>{const{getBlockOrder:l}=t(i.store);return{hasChildBlocks:l(e).length>0}}),[e]);return(0,i.useInnerBlocksProps)({...r},{template:t,templateLock:l,allowedBlocks:n,renderAppender:o?void 0:i.InnerBlocks.ButtonBlockAppender})})({clientId:d,template:r,templateLock:s,blockProps:(0,i.useBlockProps)({className:a()(n),style:A({style:c}),"aria-label":t||null,"aria-labelledby":l||null})});return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(O,{...e}),(0,o.createElement)("section",{...u}))},save:e=>{const{attributes:{blockClass:t,style:l,ariaLabel:n,ariaLabelledBy:r}}=e,s=i.useInnerBlocksProps.save(i.useBlockProps.save({className:a()(t),style:A({style:l}),"aria-label":n||null,"aria-labelledby":r||null}));return(0,o.createElement)("section",{...s})},getEditWrapperProps:()=>({"data-align":"full"})};(0,r.registerBlockType)(H,D)},184:(e,t)=>{var l;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var o=typeof l;if("string"===o||"number"===o)e.push(l);else if(Array.isArray(l)){if(l.length){var i=r.apply(null,l);i&&e.push(i)}}else if("object"===o){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){e.push(l.toString());continue}for(var s in l)n.call(l,s)&&l[s]&&e.push(s)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(l=function(){return r}.apply(t,[]))||(e.exports=l)}()}},l={};function n(e){var r=l[e];if(void 0!==r)return r.exports;var o=l[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,l,r,o)=>{if(!l){var i=1/0;for(m=0;m<e.length;m++){for(var[l,r,o]=e[m],s=!0,a=0;a<l.length;a++)(!1&o||i>=o)&&Object.keys(n.O).every((e=>n.O[e](l[a])))?l.splice(a--,1):(s=!1,o<i&&(i=o));if(s){e.splice(m--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var m=e.length;m>0&&e[m-1][2]>o;m--)e[m]=e[m-1];e[m]=[l,r,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={6680:0,9485:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var r,o,[i,s,a]=l,c=0;if(i.some((t=>0!==e[t]))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(a)var m=a(n)}for(t&&t(l);c<i.length;c++)o=i[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(m)},l=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var r=n.O(void 0,[9485],(()=>n(585)));r=n.O(r)})();