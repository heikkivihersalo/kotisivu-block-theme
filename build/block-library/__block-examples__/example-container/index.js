(()=>{var e,t={7428:(e,t,l)=>{"use strict";const n=window.wp.blocks,r=JSON.parse('{"N9":"ksd/example-container"}'),o=window.wp.i18n,i=[{name:"example-stacked",title:(0,o.__)("example | Stacked","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/wrapper",{blockClass:"example__content",showAlignmentControls:!0,variationName:"wrapper-100",width:null,template:[]}],["core/image",{className:"example__image",align:"full",sizeSlug:"full",url:"https://picsum.photos/1920/1080"}]],attributes:{blockClass:"example example-stacked is-stacked",templateLock:"all",width:"var(--wp--custom--wide-size)",style:{}}}],s=window.React,a=window.wp.blockEditor;var c=l(2084),u=l.n(c);const m=window.wp.components,d=window.wp.data,v=({attributes:e,setAttributes:t})=>{const{ariaLabel:l,ariaLabelledBy:n}=e;return(0,s.createElement)(s.Fragment,null,(0,s.createElement)(m.PanelBody,{title:(0,o.__)("Accessibility","kotisivu-block-theme"),initialOpen:!1},(0,s.createElement)(m.TextControl,{label:(0,o.__)("Aria Labelled By","kotisivu-block-theme"),help:(0,o.__)("Identifies the element (or elements) that labels the element it is applied to. Use the same ID as in the section heading.","kotisivu-block-theme"),value:n,onChange:e=>t({ariaLabelledBy:e})}),(0,s.createElement)(m.TextControl,{label:(0,o.__)("Aria label","kotisivu-block-theme"),help:(0,o.__)("If section heading doesn`t match correct description, you can use aria-label. IMPORTANT! Use aria-labelledby by default.","kotisivu-block-theme"),value:l,onChange:e=>t({ariaLabel:e})})))},p=({attributes:e,setAttributes:t})=>{const{style:l}=e;return(0,s.createElement)(a.PanelColorSettings,{title:(0,o.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:l.backgroundColor,onChange:e=>{return n=l,r=e,void t({style:{...n,backgroundColor:r}});var n,r},label:(0,o.__)("Background color","kotisivu-block-theme")}]})},h=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 123",...e},(0,s.createElement)("path",{d:"M50.147 86h95.471v36.531H50.147V86Zm0-86h95.471v36.531H50.147V0Zm145.618 70.548H0V51.983h195.765v18.565Z",style:{fill:"currentColor"}})),L=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,s.createElement)("path",{d:"M47.53,130.841L143,130.841L143,167.373L47.53,167.373L47.53,130.841ZM47.53,28.087L143,28.087L143,64.618L47.53,64.618L47.53,28.087ZM0,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895ZM195.765,18.565L0,18.565L0,0L195.765,0L195.765,18.565Z",style:{fill:"currentColor"}})),g=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,s.createElement)("path",{d:"M143,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.53,176.895L47.53,140.428L143,140.428L143,176.895ZM47.53,18.565L0,18.565L0,0L195.765,0L195.765,18.565L143,18.565L143,54.991L47.53,54.991L47.53,18.565Z",style:{fill:"currentColor"}})),w=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,s.createElement)("path",{d:"M49.794,117.541L145.265,117.541L145.265,154.072L49.794,154.072L49.794,117.541ZM49.794,41.388L145.265,41.388L145.265,77.919L49.794,77.919L49.794,41.388ZM0,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895ZM195.765,18.565L0,18.565L0,0L195.765,0L195.765,18.565Z",style:{fill:"currentColor"}})),k=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,s.createElement)("path",{d:"M47.412,18.565L0,18.565L0,0L195.765,0L195.765,18.565L142.883,18.565L142.883,82.002L47.412,82.002L47.412,18.565ZM142.883,176.895L195.765,176.895L195.765,195.459L0,195.459L0,176.895L47.412,176.895L47.412,113.459L142.883,113.459L142.883,176.895Z",style:{fill:"currentColor"}})),y=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 34 29",...e},(0,s.createElement)("path",{d:"M312 147.726h-34v-3.452h34v3.452Zm-6.591-7.716h-4.557l-1.812-4.712h-8.293l-1.712 4.712h-4.444l8.081-20.746h4.43l8.307 20.746Zm-7.713-8.208-2.859-7.698-2.802 7.698h5.661Z",style:{fill:"currentColor"},transform:"translate(-278 -119.264)"})),E=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,s.createElement)("path",{d:"M94.948 130.392v-12.654h6v12.654h6.079v-6.58h6v6.58h5.993v3.038h-5.993v6.58h-6v-6.58h-6.079v12.654h-6V133.43h-7.964v-3.038h7.964Z",style:{fill:"currentColor"},transform:"translate(-86.984 -117.738)"})),f=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,s.createElement)("path",{d:"M197.001 119.761v22.085h-6v-22.085h6Zm18.012 28.09h-32.036v-3.037h32.036v3.037Zm-8.026-20.043v14.038h-6v-14.038h6Z",style:{fill:"currentColor"},transform:"translate(-182.977 -119.761)"})),b=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 29",...e},(0,s.createElement)("path",{d:"M148.981 121.808v22.084h-6v-22.084h6Zm10.003 0v14.037h-6v-14.037h6Zm8.023-2.989h-32.036v-3.038h32.036v3.038Z",style:{fill:"currentColor"},transform:"translate(-134.971 -115.781)"})),C=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,s.createElement)("path",{d:"M244.97 121.785v20.061h-6v-20.061h6Zm9.984 0v20.061h-6v-20.061h6Zm8.08-2.968h-32.036v-3.037h32.036v3.037Zm0 29.034h-32.036v-3.037h32.036v3.037Z",style:{fill:"currentColor"},transform:"translate(-230.998 -115.78)"})),x=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 37 33",...e},(0,s.createElement)("path",{d:"M91.403 231.729v-5.976h3.037v5.976h6.581v6H94.44v8.063h4.507v6H94.44v5.997h-3.037v-5.997h-4.507v-6h4.507v-8.063h-6.581v-6h6.581Zm20.11 0v-5.976h3.038v5.976h6.581v6h-6.581v8.063h4.507v6h-4.507v5.997h-3.038v-5.997h-4.507v-6h4.507v-8.063h-6.58v-6h6.58Z",style:{fill:"currentColor"},transform:"translate(-84.822 -225.753)"})),B=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,s.createElement)("path",{d:"M211.966 237.729h-11.009v-6h11.009v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Zm-18.074 0h-11.008v-6h11.008v-5.976h3.037v32.036h-3.037v-5.997h-6.946v-6h6.946v-8.063Z",style:{fill:"currentColor"},transform:"translate(-182.884 -225.753)"})),M=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 33 33",...e},(0,s.createElement)("path",{d:"M138.017 231.729h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Zm18.049 0h11.008v6h-11.008v8.063h6.946v6h-6.946v5.997h-3.037v-32.036h3.037v5.976Z",style:{fill:"currentColor"},transform:"translate(-134.98 -225.753)"})),j=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 32 33",...e},(0,s.createElement)("path",{d:"M234.04 231.729h10.967v6H234.04v8.063h10.967v6H234.04v5.997h-3.038v-32.036h3.038v5.976Zm25.91 6h-10.994v-6h10.994v-5.976h3.038v32.036h-3.038v-5.997h-10.994v-6h10.994v-8.063Z",style:{fill:"currentColor"},transform:"translate(-231.002 -225.753)"})),Z=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-32 0 196 196",...e},(0,s.createElement)("path",{d:"M36.531,50.147L36.531,145.618L0,145.618L0,50.147L36.531,50.147ZM122.531,50.147L122.531,145.618L86,145.618L86,50.147L122.531,50.147ZM51.983,195.765L51.983,0L70.548,0L70.548,195.765L51.983,195.765Z",style:{fill:"currentColor"}})),R=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-46 0 196 196",...e},(0,s.createElement)("path",{d:"M36.531,50.147L36.531,145.618L0,145.618L0,50.147L36.531,50.147ZM82.062,50.147L82.062,145.618L45.531,145.618L45.531,50.147L82.062,50.147ZM100.435,195.765L100.435,0L119,0L119,195.765L100.435,195.765Z",style:{fill:"currentColor"}})),P=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,s.createElement)("path",{d:"M64.618,47.53L64.618,143L28.087,143L28.087,47.53L64.618,47.53ZM167.373,47.53L167.373,143L130.841,143L130.841,47.53L167.373,47.53ZM18.565,0L18.565,195.765L0,195.765L0,0L18.565,0ZM176.895,195.765L176.895,0L195.459,0L195.459,195.765L176.895,195.765Z",style:{fill:"currentColor"}})),S=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,s.createElement)("path",{d:"M18.565,143L18.565,195.765L0,195.765L0,0L18.565,0L18.565,47.53L55.031,47.53L55.031,143L18.565,143ZM176.895,143L140.469,143L140.469,47.53L176.895,47.53L176.895,0L195.459,0L195.459,195.765L176.895,195.765L176.895,143Z",style:{fill:"currentColor"}})),A=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 196 196",...e},(0,s.createElement)("path",{d:"M18.565,0L18.565,195.765L0,195.765L0,0L18.565,0ZM176.895,195.765L176.895,0L195.459,0L195.459,195.765L176.895,195.765ZM77.919,49.794L77.919,145.265L41.388,145.265L41.388,49.794L77.919,49.794ZM154.072,49.794L154.072,145.265L117.541,145.265L117.541,49.794L154.072,49.794Z",style:{fill:"currentColor"}})),I=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"-46 0 196 196",...e},(0,s.createElement)("path",{d:"M118.717,50.147L118.717,145.618L82.186,145.618L82.186,50.147L118.717,50.147ZM73.186,50.147L73.186,145.618L36.655,145.618L36.655,50.147L73.186,50.147ZM18.565,0L18.565,195.765L0,195.765L0,0L18.565,0Z",style:{fill:"currentColor"}})),_=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 198 198",...e},(0,s.createElement)("path",{d:"M197.019,53.942L197.019,137.827L-0,137.827L-0,53.942L197.019,53.942ZM168.962,166.058L168.962,193.942L28.058,193.942L28.058,166.058L168.962,166.058ZM168.962,0L168.962,27.884L28.058,27.884L28.058,0L168.962,0Z",style:{fill:"currentColor"}})),T=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 198 198",...e},(0,s.createElement)("path",{d:"M197.019,0L197.019,140.114L-0,140.114L-0,0L197.019,0ZM168.962,168.345L168.962,196.229L28.058,196.229L28.058,168.345L168.962,168.345Z",style:{fill:"currentColor"}})),O=e=>(0,s.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 -35 198 198",...e},(0,s.createElement)("path",{d:"M197.019,45.913L197.019,85.913L0,85.913L0,45.913L197.019,45.913ZM168.962,103.942L168.962,131.826L28.058,131.826L28.058,103.942L168.962,103.942ZM168.962,0L168.962,27.884L28.058,27.884L28.058,0L168.962,0Z",style:{fill:"currentColor"}})),N=({attributes:e,setAttributes:t})=>{const l="var(--wp--custom--wide-size)",n="var(--wp--custom--content-size)",r="var(--wp--custom--narrow-size)",i=(e,l,n)=>{t(n!==e?.[l]?{style:{...e,[l]:n}}:{style:{...e,[l]:void 0}})};return(0,s.createElement)(s.Fragment,null,(0,s.createElement)(m.PanelBody,{title:(0,o.__)("Width Controls","kotisivu-block-theme")},(0,s.createElement)(m.PanelRow,null,(0,s.createElement)("div",{className:"editor-width-controls"},(0,s.createElement)("p",null,"width: ",(0,s.createElement)("span",{style:{opacity:.7,color:"var(--wp--preset--color--black)"}},e.style?.width)),(0,s.createElement)(m.ButtonGroup,null,(0,s.createElement)(m.Button,{label:"Set width as full",showTooltip:"true",icon:(0,s.createElement)(T,null),isPressed:e.style?.width===l,onClick:()=>i(e.style,"width",l)}),(0,s.createElement)(m.Button,{label:"Set width as content",showTooltip:"true",icon:(0,s.createElement)(_,null),isPressed:e.style?.width===n,onClick:()=>i(e.style,"width",n)}),(0,s.createElement)(m.Button,{label:"Set width as narrow",showTooltip:"true",icon:(0,s.createElement)(O,null),isPressed:e.style?.width===r,onClick:()=>i(e.style,"width",r)})))),(0,s.createElement)(m.PanelRow,null,(0,s.createElement)(m.ToggleControl,{label:"Set as 100% height",checked:"100%"===e.style?.height,onChange:()=>i(e.style,"height","100%")}))))},V=e=>{const{attributes:{style:t,isReversed:l},setAttributes:n}=e,r=(e,t,l)=>{n(l!==e?.[t]?{style:{...e,[t]:l}}:{style:{...e,[t]:void 0}})},i={opacity:.7,color:"var(--wp--preset--color--black)"};return(0,s.createElement)(s.Fragment,null,(0,s.createElement)(m.PanelBody,{title:(0,o.__)("Alignment Controls","kotisivu-block-theme")},(0,s.createElement)(m.PanelRow,null,(0,s.createElement)("div",{className:"editor-alignment-controls"},(0,s.createElement)("div",null,(0,s.createElement)("p",null,"align-content: ",(0,s.createElement)("span",{style:i},t?.alignContent)),(0,s.createElement)(m.ButtonGroup,null,(0,s.createElement)(m.Button,{label:"Add align-content: center",showTooltip:"true",icon:(0,s.createElement)(h,null),isPressed:"center"===t?.alignContent,onClick:()=>r(t,"alignContent","center")}),(0,s.createElement)(m.Button,{label:"Add align-content: space-between",showTooltip:"true",icon:(0,s.createElement)(g,null),isPressed:"space-between"===t?.alignContent,onClick:()=>r(t,"alignContent","space-between")}),(0,s.createElement)(m.Button,{label:"Add align-content: space-around",showTooltip:"true",icon:(0,s.createElement)(L,null),isPressed:"space-around"===t?.alignContent,onClick:()=>r(t,"alignContent","space-around")}),(0,s.createElement)(m.Button,{label:"Add align-content: space-evenly",showTooltip:"true",icon:(0,s.createElement)(w,null),isPressed:"space-evenly"===t?.alignContent,onClick:()=>r(t,"alignContent","space-evenly")}),(0,s.createElement)(m.Button,{label:"Add align-content: stretch",showTooltip:"true",icon:(0,s.createElement)(k,null),isPressed:"stretch"===t?.alignContent,onClick:()=>r(t,"alignContent","stretch")}))),(0,s.createElement)("div",null,(0,s.createElement)("p",null,"justify-content: ",(0,s.createElement)("span",{style:i},t?.justifyContent)),(0,s.createElement)(m.ButtonGroup,null,(0,s.createElement)(m.Button,{label:"Add justify-content: center",showTooltip:"true",icon:(0,s.createElement)(Z,null),isPressed:"center"===t?.justifyContent,onClick:()=>r(t,"justifyContent","center")}),(0,s.createElement)(m.Button,{label:"Add justify-content: start",showTooltip:"true",icon:(0,s.createElement)(I,null),isPressed:"start"===t?.justifyContent,onClick:()=>r(t,"justifyContent","start")}),(0,s.createElement)(m.Button,{label:"Add justify-content: end",showTooltip:"true",icon:(0,s.createElement)(R,null),isPressed:"end"===t?.justifyContent,onClick:()=>onAlignChange(t,"justifyContent","end")}),(0,s.createElement)(m.Button,{label:"Add justify-content: space-between",showTooltip:"true",icon:(0,s.createElement)(S,null),isPressed:"space-between"===t?.justifyContent,onClick:()=>r(t,"justifyContent","space-between")}),(0,s.createElement)(m.Button,{label:"Add justify-content: space-around",showTooltip:"true",icon:(0,s.createElement)(P,null),isPressed:"space-around"===t?.justifyContent,onClick:()=>r(t,"justifyContent","space-around")}),(0,s.createElement)(m.Button,{label:"Add justify-content: space-evenly",showTooltip:"true",icon:(0,s.createElement)(A,null),isPressed:"space-evenly"===t?.justifyContent,onClick:()=>r(t,"justifyContent","space-evenly")}))),(0,s.createElement)("div",null,(0,s.createElement)("p",null,"align-items: ",(0,s.createElement)("span",{style:i},t?.alignItems)),(0,s.createElement)(m.ButtonGroup,null,(0,s.createElement)(m.Button,{label:"Add align-items: center",showTooltip:"true",icon:(0,s.createElement)(E,null),isPressed:"center"===t?.alignItems,onClick:()=>r(t,"alignItems","center")}),(0,s.createElement)(m.Button,{label:"Add align-items: start",showTooltip:"true",icon:(0,s.createElement)(b,null),isPressed:"start"===t?.alignItems,onClick:()=>r(t,"alignItems","start")}),(0,s.createElement)(m.Button,{label:"Add align-items: end",showTooltip:"true",icon:(0,s.createElement)(f,null),isPressed:"end"===t?.alignItems,onClick:()=>r(t,"alignItems","end")}),(0,s.createElement)(m.Button,{label:"Add align-items: stretch",showTooltip:"true",icon:(0,s.createElement)(C,null),isPressed:"stretch"===t?.alignItems,onClick:()=>r(t,"alignItems","stretch")}),(0,s.createElement)(m.Button,{label:"Add align-items: baseline",showTooltip:"true",icon:(0,s.createElement)(y,null),isPressed:"baseline"===t?.alignItems,onClick:()=>r(t,"alignItems","baseline")}))),(0,s.createElement)("div",null,(0,s.createElement)("p",null,"justify-items: ",(0,s.createElement)("span",{style:i},t?.justifyItems)),(0,s.createElement)(m.ButtonGroup,null,(0,s.createElement)(m.Button,{label:"Add justify-items: center",showTooltip:"true",icon:(0,s.createElement)(x,null),isPressed:"center"===t?.justifyItems,onClick:()=>r(t,"justifyItems","center")}),(0,s.createElement)(m.Button,{label:"Add justify-items: start",showTooltip:"true",icon:(0,s.createElement)(M,null),isPressed:"start"===t?.justifyItems,onClick:()=>r(t,"justifyItems","start")}),(0,s.createElement)(m.Button,{label:"Add justify-items: end",showTooltip:"true",icon:(0,s.createElement)(B,null),isPressed:"end"===t?.justifyItems,onClick:()=>r(t,"justifyItems","end")}),(0,s.createElement)(m.Button,{label:"Add justify-items: stretch",showTooltip:"true",icon:(0,s.createElement)(j,null),isPressed:"stretch"===t?.justifyItems,onClick:()=>r(t,"justifyItems","stretch")}))))),(0,s.createElement)(m.PanelRow,null,(0,s.createElement)(m.ToggleControl,{label:(0,o.__)("Reverse Order","kotisivu-block-theme"),checked:l,onChange:()=>n({isReversed:!l})}))))},H=({setAttributes:e,blockVariations:t})=>t?(0,s.createElement)(s.Fragment,null,(0,s.createElement)(a.__experimentalBlockVariationPicker,{label:(0,o.__)("Choose variation","kotisivu-block-theme"),instructions:(0,o.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>{e((e=>({variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}))(t))},variations:t})):null;function F({style:e}){const t=e=>{if("0"!==e)return`var(--wp--${e.split(":")[1].trim().replaceAll("|","--")})`};return{background:e?.backgroundColor,marginTop:e?.spacing?.margin?.top&&t(e.spacing.margin.top),marginBottom:e?.spacing?.margin?.bottom&&t(e.spacing.margin.bottom),paddingTop:e?.spacing?.padding?.top&&t(e.spacing.padding.top),paddingBottom:e?.spacing?.padding?.bottom&&t(e.spacing.padding.bottom),paddingLeft:e?.spacing?.padding?.left&&t(e.spacing.padding.left),paddingRight:e?.spacing?.padding?.right&&t(e.spacing.padding.right),width:e?.width,height:e?.height,display:(e=>e?.justifyContent||e?.justifyItems||e?.alignItems||e?.alignContent)(e)?"grid":void 0,justifyItems:e?.justifyItems,alignItems:e?.alignItems,alignContent:e?.alignContent,gap:e?.gap}}const z=e=>(0,s.createElement)(s.Fragment,null,(0,s.createElement)(a.InspectorControls,null,(0,s.createElement)(v,{...e})),(0,s.createElement)(a.InspectorControls,{group:"styles"},(0,s.createElement)(p,{...e}),(0,s.createElement)(V,{...e}),(0,s.createElement)(N,{...e})));(0,n.registerBlockType)(r.N9,{edit:function(e){const{attributes:{blockClass:t,ariaLabel:l,ariaLabelledBy:o,template:i,templateLock:c,style:m,variationName:v},setAttributes:p,clientId:h}=e,L=(({clientId:e,template:t,templateLock:l,allowedBlocks:n,blockProps:r})=>{const{hasChildBlocks:o}=(0,d.useSelect)((t=>{const{getBlockOrder:l}=t(a.store);return{hasChildBlocks:l(e).length>0}}),[e]);return(0,a.useInnerBlocksProps)({...r},{template:t,templateLock:l,allowedBlocks:n,renderAppender:o?void 0:a.InnerBlocks.ButtonBlockAppender})})({clientId:h,template:i,templateLock:c,blockProps:(0,a.useBlockProps)({className:u()(t),style:F({style:m}),"aria-label":l||null,"aria-labelledby":o||null})}),g=(w=r.N9,(0,d.useSelect)((e=>{const{getBlockVariations:t}=e(n.store);return t(w,"block")}),[w]));var w;return v?(0,s.createElement)(s.Fragment,null,(0,s.createElement)(z,{...e}),(0,s.createElement)("section",{...L})):(0,s.createElement)(H,{setAttributes:p,blockVariations:g})},save:function(e){const{attributes:{blockClass:t,ariaLabel:l,ariaLabelledBy:n,style:r}}=e,o=a.useInnerBlocksProps.save(a.useBlockProps.save({className:u()(t),style:F({style:r}),"aria-label":l||null,"aria-labelledby":n||null}));return(0,s.createElement)("section",{...o})},variations:i,getEditWrapperProps:e=>({"data-align":"full"})})},2084:(e,t)=>{var l;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e="",t=0;t<arguments.length;t++){var l=arguments[t];l&&(e=i(e,o(l)))}return e}function o(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return r.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var l in e)n.call(e,l)&&e[l]&&(t=i(t,l));return t}function i(e,t){return t?e?e+" "+t:e+t:e}e.exports?(r.default=r,e.exports=r):void 0===(l=function(){return r}.apply(t,[]))||(e.exports=l)}()}},l={};function n(e){var r=l[e];if(void 0!==r)return r.exports;var o=l[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,l,r,o)=>{if(!l){var i=1/0;for(u=0;u<e.length;u++){for(var[l,r,o]=e[u],s=!0,a=0;a<l.length;a++)(!1&o||i>=o)&&Object.keys(n.O).every((e=>n.O[e](l[a])))?l.splice(a--,1):(s=!1,o<i&&(i=o));if(s){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[l,r,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={3272:0,3144:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var r,o,[i,s,a]=l,c=0;if(i.some((t=>0!==e[t]))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(a)var u=a(n)}for(t&&t(l);c<i.length;c++)o=i[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},l=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var r=n.O(void 0,[3144],(()=>n(7428)));r=n.O(r)})();