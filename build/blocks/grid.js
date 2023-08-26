(()=>{var e,t={155:(e,t,l)=>{"use strict";const n=window.wp.i18n,r=window.wp.blocks,o=window.wp.element,i=window.wp.blockEditor;var s=l(184),a=l.n(s);const c=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/grid","title":"Grid","category":"design","icon":"layout","description":"","keywords":["container, columns, column, 50, wrapper"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"html":true,"anchor":true,"color":{"text":false,"background":true},"spacing":{"margin":["top","bottom"],"padding":true}},"editorScript":"file:../../../../build/blocks/grid.js","editorStyle":"file:../../../../build/blocks/grid.css","style":"file:../../../../build/blocks/style-grid.css","attributes":{"style":{"type":"object"},"template":{"type":"array","default":[]},"childTemplate":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"variationName":{"type":"string","default":""}}}'),d=window.wp.components,m=window.wp.data,u=({attributes:e,setAttributes:t})=>{const{style:l}=e;return(0,o.createElement)(i.PanelColorSettings,{title:(0,n.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:l.backgroundColor,onChange:e=>{return n=l,r=e,void t({style:{...n,backgroundColor:r}});var n,r},label:(0,n.__)("Background color","kotisivu-block-theme")}]})},p=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 123",...e},(0,o.createElement)("path",{d:"M50.147 86h95.471v36.531H50.147V86Zm0-86h95.471v36.531H50.147V0Zm145.618 70.548H0V51.983h195.765v18.565Z",style:{fill:"currentColor"}})),v=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M47.53,130.841L143,130.841L143,167.373L47.53,167.373L47.53,130.841ZM47.53,28.087L143,28.087L143,64.618L47.53,64.618L47.53,28.087ZM0,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895ZM195.765,18.565L0,18.565L0,0L195.765,0L195.765,18.565Z",style:{fill:"currentColor"}})),g=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M143,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.53,176.895L47.53,140.428L143,140.428L143,176.895ZM47.53,18.565L0,18.565L0,0L195.765,0L195.765,18.565L143,18.565L143,54.991L47.53,54.991L47.53,18.565Z",style:{fill:"currentColor"}})),h=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M49.794,117.541L145.265,117.541L145.265,154.072L49.794,154.072L49.794,117.541ZM49.794,41.388L145.265,41.388L145.265,77.919L49.794,77.919L49.794,41.388ZM0,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895ZM195.765,18.565L0,18.565L0,0L195.765,0L195.765,18.565Z",style:{fill:"currentColor"}})),L=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M47.412,18.565L0,18.565L0,0L195.765,0L195.765,18.565L142.883,18.565L142.883,82.002L47.412,82.002L47.412,18.565ZM142.883,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.412,176.895L47.412,113.459L142.883,113.459L142.883,176.895Z",style:{fill:"currentColor"}})),k=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 34 29",...e},(0,o.createElement)("path",{d:"M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z",style:{fill:"currentColor"},transform:"translate(-278 -119.264)"})),w=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,o.createElement)("path",{d:"M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z",style:{fill:"currentColor"},transform:"translate(-86.984 -117.738)"})),y=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,o.createElement)("path",{d:"M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z",style:{fill:"currentColor"},transform:"translate(-182.977 -119.761)"})),f=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,o.createElement)("path",{d:"M148.981 121.808v22.084h-6v-22.084h6Zm10.003 0v14.037h-6v-14.037h6Zm8.023-2.989h-32.036v-3.038h32.036v3.038Z",style:{fill:"currentColor"},transform:"translate(-134.971 -115.781)"})),b=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,o.createElement)("path",{d:"M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z",style:{fill:"currentColor"},transform:"translate(-230.998 -115.78)"})),E=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 37 33",...e},(0,o.createElement)("path",{d:"M91.403 231.729v-5.976h3.037v5.976h6.581v6H94.44v8.063h4.507v6H94.44v5.997h-3.037v-5.997h-4.507v-6h4.507v-8.063h-6.581v-6h6.581Zm20.11 0v-5.976h3.038v5.976h6.581v6h-6.581v8.063h4.507v6h-4.507v5.997h-3.038v-5.997h-4.507v-6h4.507v-8.063h-6.58v-6h6.58Z",style:{fill:"currentColor"},transform:"translate(-84.822 -225.753)"})),C=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,o.createElement)("path",{d:"M211.966 237.729h-11.009v-6h11.009v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Zm-18.074 0h-11.008v-6h11.008v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Z",style:{fill:"currentColor"},transform:"translate(-182.884 -225.753)"})),x=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,o.createElement)("path",{d:"M138.017 231.729h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Zm18.049 0h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Z",style:{fill:"currentColor"},transform:"translate(-134.98 -225.753)"})),j=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 32 33",...e},(0,o.createElement)("path",{d:"M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z",style:{fill:"currentColor"},transform:"translate(-231.002 -225.753)"})),B=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-32 0 196 196",...e},(0,o.createElement)("path",{d:"M36.531,50.147L36.531,145.618L0,145.618L0,50.147L36.531,50.147ZM122.531,50.147L122.531,145.618L86,145.618L86,50.147L122.531,50.147ZM51.983,195.765L51.983,0L70.548,0L70.548,195.765L51.983,195.765Z",style:{fill:"currentColor"}})),M=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-46 0 196 196",...e},(0,o.createElement)("path",{d:"M36.531,50.147L36.531,145.618L0,145.618L0,50.147L36.531,50.147ZM82.062,50.147L82.062,145.618L45.531,145.618L45.531,50.147L82.062,50.147ZM100.435,195.765L100.435,0L119,0L119,195.765L100.435,195.765Z",style:{fill:"currentColor"}})),Z=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M64.618,47.53L64.618,143L28.087,143L28.087,47.53L64.618,47.53ZM167.373,47.53L167.373,143L130.841,143L130.841,47.53L167.373,47.53ZM18.565,0L18.565,195.765L0,195.765L0,0L18.565,0ZM176.895,195.765L176.895,0L195.459,0L195.459,195.765L176.895,195.765Z",style:{fill:"currentColor"}})),_=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M18.565,143L18.565,195.765L0,195.765L0,0L18.565,0L18.565,47.53L55.031,47.53L55.031,143L18.565,143ZM176.895,143L140.469,143L140.469,47.53L176.895,47.53L176.895,0L195.459,0L195.459,195.765L176.895,195.765L176.895,143Z",style:{fill:"currentColor"}})),R=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,o.createElement)("path",{d:"M18.565,0L18.565,195.765L0,195.765L0,0L18.565,0ZM176.895,195.765L176.895,0L195.459,0L195.459,195.765L176.895,195.765ZM77.919,49.794L77.919,145.265L41.388,145.265L41.388,49.794L77.919,49.794ZM154.072,49.794L154.072,145.265L117.541,145.265L117.541,49.794L154.072,49.794Z",style:{fill:"currentColor"}})),I=e=>(0,o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-46 0 196 196",...e},(0,o.createElement)("path",{d:"M118.717,50.147L118.717,145.618L82.186,145.618L82.186,50.147L118.717,50.147ZM73.186,50.147L73.186,145.618L36.655,145.618L36.655,50.147L73.186,50.147ZM18.565,0L18.565,195.765L0,195.765L0,0L18.565,0Z",style:{fill:"currentColor"}})),P=e=>{const{attributes:{style:t,isReversed:l},setAttributes:r}=e,i=(e,t,l)=>{r(l!==e?.[t]?{style:{...e,[t]:l}}:{style:{...e,[t]:void 0}})},s={opacity:.7,color:"var(--wp--preset--color--black)"};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(d.PanelBody,{title:(0,n.__)("Alignment Controls","kotisivu-block-theme")},(0,o.createElement)(d.PanelRow,null,(0,o.createElement)("div",{className:"editor-alignment-controls"},(0,o.createElement)("div",null,(0,o.createElement)("p",null,"align-content: ",(0,o.createElement)("span",{style:s},t?.alignContent)),(0,o.createElement)(d.ButtonGroup,null,(0,o.createElement)(d.Button,{label:"Add align-content: center",showTooltip:"true",icon:(0,o.createElement)(p,null),isPressed:"center"===t?.alignContent,onClick:()=>i(t,"alignContent","center")}),(0,o.createElement)(d.Button,{label:"Add align-content: space-between",showTooltip:"true",icon:(0,o.createElement)(g,null),isPressed:"space-between"===t?.alignContent,onClick:()=>i(t,"alignContent","space-between")}),(0,o.createElement)(d.Button,{label:"Add align-content: space-around",showTooltip:"true",icon:(0,o.createElement)(v,null),isPressed:"space-around"===t?.alignContent,onClick:()=>i(t,"alignContent","space-around")}),(0,o.createElement)(d.Button,{label:"Add align-content: space-evenly",showTooltip:"true",icon:(0,o.createElement)(h,null),isPressed:"space-evenly"===t?.alignContent,onClick:()=>i(t,"alignContent","space-evenly")}),(0,o.createElement)(d.Button,{label:"Add align-content: stretch",showTooltip:"true",icon:(0,o.createElement)(L,null),isPressed:"stretch"===t?.alignContent,onClick:()=>i(t,"alignContent","stretch")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"justify-content: ",(0,o.createElement)("span",{style:s},t?.justifyContent)),(0,o.createElement)(d.ButtonGroup,null,(0,o.createElement)(d.Button,{label:"Add justify-content: center",showTooltip:"true",icon:(0,o.createElement)(B,null),isPressed:"center"===t?.justifyContent,onClick:()=>i(t,"justifyContent","center")}),(0,o.createElement)(d.Button,{label:"Add justify-content: start",showTooltip:"true",icon:(0,o.createElement)(I,null),isPressed:"start"===t?.justifyContent,onClick:()=>i(t,"justifyContent","start")}),(0,o.createElement)(d.Button,{label:"Add justify-content: end",showTooltip:"true",icon:(0,o.createElement)(M,null),isPressed:"end"===t?.justifyContent,onClick:()=>onAlignChange(t,"justifyContent","end")}),(0,o.createElement)(d.Button,{label:"Add justify-content: space-between",showTooltip:"true",icon:(0,o.createElement)(_,null),isPressed:"space-between"===t?.justifyContent,onClick:()=>i(t,"justifyContent","space-between")}),(0,o.createElement)(d.Button,{label:"Add justify-content: space-around",showTooltip:"true",icon:(0,o.createElement)(Z,null),isPressed:"space-around"===t?.justifyContent,onClick:()=>i(t,"justifyContent","space-around")}),(0,o.createElement)(d.Button,{label:"Add justify-content: space-evenly",showTooltip:"true",icon:(0,o.createElement)(R,null),isPressed:"space-evenly"===t?.justifyContent,onClick:()=>i(t,"justifyContent","space-evenly")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"align-items: ",(0,o.createElement)("span",{style:s},t?.alignItems)),(0,o.createElement)(d.ButtonGroup,null,(0,o.createElement)(d.Button,{label:"Add align-items: center",showTooltip:"true",icon:(0,o.createElement)(w,null),isPressed:"center"===t?.alignItems,onClick:()=>i(t,"alignItems","center")}),(0,o.createElement)(d.Button,{label:"Add align-items: start",showTooltip:"true",icon:(0,o.createElement)(f,null),isPressed:"start"===t?.alignItems,onClick:()=>i(t,"alignItems","start")}),(0,o.createElement)(d.Button,{label:"Add align-items: end",showTooltip:"true",icon:(0,o.createElement)(y,null),isPressed:"end"===t?.alignItems,onClick:()=>i(t,"alignItems","end")}),(0,o.createElement)(d.Button,{label:"Add align-items: stretch",showTooltip:"true",icon:(0,o.createElement)(b,null),isPressed:"stretch"===t?.alignItems,onClick:()=>i(t,"alignItems","stretch")}),(0,o.createElement)(d.Button,{label:"Add align-items: baseline",showTooltip:"true",icon:(0,o.createElement)(k,null),isPressed:"baseline"===t?.alignItems,onClick:()=>i(t,"alignItems","baseline")}))),(0,o.createElement)("div",null,(0,o.createElement)("p",null,"justify-items: ",(0,o.createElement)("span",{style:s},t?.justifyItems)),(0,o.createElement)(d.ButtonGroup,null,(0,o.createElement)(d.Button,{label:"Add justify-items: center",showTooltip:"true",icon:(0,o.createElement)(E,null),isPressed:"center"===t?.justifyItems,onClick:()=>i(t,"justifyItems","center")}),(0,o.createElement)(d.Button,{label:"Add justify-items: start",showTooltip:"true",icon:(0,o.createElement)(x,null),isPressed:"start"===t?.justifyItems,onClick:()=>i(t,"justifyItems","start")}),(0,o.createElement)(d.Button,{label:"Add justify-items: end",showTooltip:"true",icon:(0,o.createElement)(C,null),isPressed:"end"===t?.justifyItems,onClick:()=>i(t,"justifyItems","end")}),(0,o.createElement)(d.Button,{label:"Add justify-items: stretch",showTooltip:"true",icon:(0,o.createElement)(j,null),isPressed:"stretch"===t?.justifyItems,onClick:()=>i(t,"justifyItems","stretch")}))))),(0,o.createElement)(d.PanelRow,null,(0,o.createElement)(d.ToggleControl,{label:(0,n.__)("Reverse Order","kotisivu-block-theme"),checked:l,onChange:()=>r({isReversed:!l})}))))},S=e=>(0,o.createElement)(o.Fragment,null,(0,o.createElement)(i.InspectorControls,{group:"styles"},(0,o.createElement)(u,{...e}),(0,o.createElement)(P,{...e}))),T=({setAttributes:e,blockVariations:t})=>t?(0,o.createElement)(o.Fragment,null,(0,o.createElement)(i.__experimentalBlockVariationPicker,{label:(0,n.__)("Choose variation","kotisivu-block-theme"),instructions:(0,n.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>e((e=>({variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}))(t)),variations:t})):null;function A({style:e}){const t=e=>{if("0"!=e)return"var(--wp--"+e.split(":")[1].trim().replaceAll("|","--")+")"};return{background:e?.backgroundColor?e.backgroundColor:void 0,marginTop:e?.spacing?.margin?.top?t(e.spacing.margin.top):void 0,marginBottom:e?.spacing?.margin?.bottom?t(e.spacing.margin.bottom):void 0,paddingTop:e?.spacing?.padding?.top?t(e.spacing.padding.top):void 0,paddingBottom:e?.spacing?.padding?.bottom?t(e.spacing.padding.bottom):void 0,paddingLeft:e?.spacing?.padding?.left?t(e.spacing.padding.left):void 0,paddingRight:e?.spacing?.padding?.right?t(e.spacing.padding.right):void 0,width:e?.width?e?.width:void 0,height:e?.height?e?.height:void 0,display:(e=>!!(e?.justifyContent||e?.justifyItems||e?.alignItems||e?.alignContent))(e)?"grid":void 0,justifyItems:e?.justifyItems?e?.justifyItems:void 0,alignItems:e?.alignItems?e?.alignItems:void 0,alignContent:e?.alignContent?e?.alignContent:void 0}}const N=[{name:"grid-50-50",title:(0,n.__)("Grid | 50-50","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/grid-item",{blockClass:"grid-item is-stacked"}],["ksd/grid-item",{blockClass:"grid-item is-stacked"}],["ksd/grid-item",{blockClass:"grid-item is-stacked"}],["ksd/grid-item",{blockClass:"grid-item is-stacked"}]],attributes:{blockClass:"grid grid-cols-2",childTemplate:[["ksd/wrapper",{variationName:"wrapper-100",className:"grid-item__wrapper",template:[["core/heading",{className:"grid-item__heading"}],["core/paragraph",{className:"grid-item__paragraph"}],["core/button",{className:"grid-item__button"}]]}],["core/image",{className:"grid-item__background-image"}]],templateLock:"all",style:{}}},{name:"grid-33-33-33",title:(0,n.__)("Grid | 33-33-33","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/grid-item"],["ksd/grid-item"],["ksd/grid-item"],["ksd/grid-item"],["ksd/grid-item"],["ksd/grid-item"]],attributes:{blockClass:"grid grid-cols-3",childTemplate:[["ksd/wrapper",{variationName:"wrapper-100",className:"grid-item__wrapper",template:[["core/heading",{className:"grid-item__heading"}],["core/paragraph",{className:"grid-item__paragraph"}],["core/button",{className:"grid-item__button"}]]}],["core/image",{className:"grid-item__background-image"}]],templateLock:"all",style:{}}}],{apiVersion:O,name:V,title:G,category:H,icon:F,description:J,keywords:$,textdomain:q,supports:z}=c,D={apiVersion:O,title:(0,n.__)(G,"kotisivu-block-theme"),description:(0,n.__)(J,"kotisivu-block-theme"),category:H,icon:F,supports:z,keywords:$,textdomain:q,providesContext:{"ksd/childTemplate":"childTemplate"},variations:N,edit:e=>{const{attributes:{blockClass:t,template:l,templateLock:n,style:s,variationName:d},setAttributes:u,clientId:p}=e,v=(({clientId:e,template:t,templateLock:l,allowedBlocks:n,blockProps:r})=>{const{hasChildBlocks:o}=(0,m.useSelect)((t=>{const{getBlockOrder:l}=t(i.store);return{hasChildBlocks:l(e).length>0}}),[e]);return(0,i.useInnerBlocksProps)({...r},{template:t,templateLock:l,allowedBlocks:n,renderAppender:o?void 0:i.InnerBlocks.ButtonBlockAppender})})({clientId:p,template:l,templateLock:n,blockProps:(0,i.useBlockProps)({className:a()(t),style:A({style:s})})}),g=(h=c.name,(0,m.useSelect)((e=>{const{getBlockVariations:t}=e(r.store);return t(h,"block")}),[h]));var h;return d?(0,o.createElement)(o.Fragment,null,(0,o.createElement)(S,{...e}),(0,o.createElement)("div",{...v})):(0,o.createElement)(T,{setAttributes:u,blockVariations:g})},save:e=>{const{attributes:{blockClass:t,style:l}}=e,n=i.useInnerBlocksProps.save(i.useBlockProps.save({className:a()(t),style:A({style:l})}));return(0,o.createElement)("div",{...n})}};(0,r.registerBlockType)(V,D)},184:(e,t)=>{var l;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var o=typeof l;if("string"===o||"number"===o)e.push(l);else if(Array.isArray(l)){if(l.length){var i=r.apply(null,l);i&&e.push(i)}}else if("object"===o){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){e.push(l.toString());continue}for(var s in l)n.call(l,s)&&l[s]&&e.push(s)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(l=function(){return r}.apply(t,[]))||(e.exports=l)}()}},l={};function n(e){var r=l[e];if(void 0!==r)return r.exports;var o=l[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,l,r,o)=>{if(!l){var i=1/0;for(d=0;d<e.length;d++){for(var[l,r,o]=e[d],s=!0,a=0;a<l.length;a++)(!1&o||i>=o)&&Object.keys(n.O).every((e=>n.O[e](l[a])))?l.splice(a--,1):(s=!1,o<i&&(i=o));if(s){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[l,r,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={5276:0,3367:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var r,o,[i,s,a]=l,c=0;if(i.some((t=>0!==e[t]))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(a)var d=a(n)}for(t&&t(l);c<i.length;c++)o=i[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(d)},l=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var r=n.O(void 0,[3367],(()=>n(155)));r=n.O(r)})();