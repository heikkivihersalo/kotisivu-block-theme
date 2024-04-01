(()=>{var e,t={256:(e,t,a)=>{"use strict";const n=window.wp.blocks,o="ksd/details",r=window.React,l=window.wp.i18n,i=window.wp.blockEditor;var s=a(2084),c=a.n(s);const p=window.wp.components,m=window.wp.data,u=({attributes:e,setAttributes:t})=>{const{style:a}=e;return(0,r.createElement)(i.PanelColorSettings,{title:(0,l.__)("Color settings","kotisivu-block-theme"),initialOpen:!1,colorSettings:[{value:a.backgroundColor,onChange:e=>{return n=a,o=e,void t({style:{...n,backgroundColor:o}});var n,o},label:(0,l.__)("Background color","kotisivu-block-theme")}]})},d=e=>{const{attributes:{useSchema:t,containerSchemaProp:a,containerSchemaType:n,headingSchemaProp:o,contentSchemaProp:s,contentSchemaType:c,isOpenOnLoad:m},setAttributes:d}=e;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(i.InspectorControls,{group:"styles"},(0,r.createElement)(u,{...e})),(0,r.createElement)(i.InspectorControls,null,(0,r.createElement)(p.PanelBody,{title:(0,l.__)("Behaviour","kotisivu-block-theme"),initialOpen:!1},(0,r.createElement)("p",null,(0,l.__)("Select the behaviour for this block.","kotisivu-block-theme")),(0,r.createElement)(p.PanelRow,null,(0,r.createElement)(p.ToggleControl,{label:(0,l.__)("Open on page load","kotisivu-block-theme"),checked:m,onChange:()=>d({isOpenOnLoad:!m})}))),(0,r.createElement)(p.PanelBody,{title:(0,l.__)("Schema","kotisivu-block-theme"),initialOpen:!1},(0,r.createElement)("p",null,(0,l.__)("Select the schema type for this block.","kotisivu-block-theme")),(0,r.createElement)(p.PanelRow,null,(0,r.createElement)(p.ToggleControl,{label:(0,l.__)("Use schema","kotisivu-block-theme"),checked:t,onChange:()=>d({useSchema:!t})})),t&&(0,r.createElement)(r.Fragment,null,(0,r.createElement)(p.TextControl,{label:(0,l.__)("Container (details) schema property","kotisivu-block-theme"),value:a,onChange:e=>d({containerSchemaProp:e})}),(0,r.createElement)(p.TextControl,{label:(0,l.__)("Container (details) schema type","kotisivu-block-theme"),value:n,onChange:e=>d({containerSchemaType:e})}),(0,r.createElement)(p.TextControl,{label:(0,l.__)("Heading (summary) schema property","kotisivu-block-theme"),value:o,onChange:e=>d({headingSchemaProp:e})}),(0,r.createElement)(p.TextControl,{label:(0,l.__)("Content (text) schema property","kotisivu-block-theme"),value:s,onChange:e=>d({contentSchemaProp:e})}),(0,r.createElement)(p.TextControl,{label:(0,l.__)("Content (text) schema type","kotisivu-block-theme"),value:c,onChange:e=>d({contentSchemaType:e})})))))},h=({setAttributes:e,blockVariations:t})=>t?(0,r.createElement)(r.Fragment,null,(0,r.createElement)(i.__experimentalBlockVariationPicker,{label:(0,l.__)("Choose variation","kotisivu-block-theme"),instructions:(0,l.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>{e((e=>({variationName:e?.name,template:e?.innerBlocks,childTemplate:e.attributes?.childTemplate,blockClass:e.attributes?.blockClass,style:e.attributes?.style}))(t))},variations:t})):null;function g(e){return e?"is-reversed":void 0}function k({style:e}){const t=e=>{if("0"!==e)return`var(--wp--${e.split(":")[1].trim().replaceAll("|","--")})`};return{background:e?.backgroundColor,marginTop:e?.spacing?.margin?.top&&t(e.spacing.margin.top),marginBottom:e?.spacing?.margin?.bottom&&t(e.spacing.margin.bottom),paddingTop:e?.spacing?.padding?.top&&t(e.spacing.padding.top),paddingBottom:e?.spacing?.padding?.bottom&&t(e.spacing.padding.bottom),paddingLeft:e?.spacing?.padding?.left&&t(e.spacing.padding.left),paddingRight:e?.spacing?.padding?.right&&t(e.spacing.padding.right),width:e?.width,height:e?.height,display:(e=>e?.justifyContent||e?.justifyItems||e?.alignItems||e?.alignContent)(e)?"grid":void 0,justifyItems:e?.justifyItems,alignItems:e?.alignItems,alignContent:e?.alignContent,gap:e?.gap}}const b=[{name:"details-default",title:(0,l.__)("Details | Default","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[],attributes:{blockClass:"details",style:{}}}];(0,n.registerBlockType)(o,{edit:e=>{const{attributes:{blockClass:t,template:a,templateLock:s,style:p,variationName:u,isReversed:b,headingContent:v,isOpenOnLoad:_},setAttributes:y,clientId:f}=e,C=(0,i.useBlockProps)({className:c()(t,g(b)),style:k({style:p}),open:_}),{children:E,...w}=(({clientId:e,template:t,templateLock:a,allowedBlocks:n,blockProps:o})=>{const{hasChildBlocks:r}=(0,m.useSelect)((t=>{const{getBlockOrder:a}=t(i.store);return{hasChildBlocks:a(e).length>0}}),[e]);return(0,i.useInnerBlocksProps)({...o},{template:t,templateLock:a,allowedBlocks:n,renderAppender:r?void 0:i.InnerBlocks.ButtonBlockAppender})})({clientId:f,template:a,templateLock:s,blockProps:C}),S=(P=o,(0,m.useSelect)((e=>{const{getBlockVariations:t}=e(n.store);return t(P,"block")}),[P]));var P;return u?(0,r.createElement)(r.Fragment,null,(0,r.createElement)(d,{...e}),(0,r.createElement)("details",{...w},(0,r.createElement)(i.RichText,{tagName:"summary",className:"details__heading",value:v,onChange:e=>y({headingContent:e}),placeholder:(0,l.__)("Add a descriptive text here...","kotisivu-block-theme")}),E)):(0,r.createElement)(h,{setAttributes:y,blockVariations:S})},save:e=>{const{attributes:{blockClass:t,style:a,headingContent:n,useSchema:o,containerSchemaProp:l,containerSchemaType:s,headingSchemaProp:p,contentSchemaProp:m,contentSchemaType:u,isOpenOnLoad:d}}=e,{children:h,...g}=i.useInnerBlocksProps.save(i.useBlockProps.save({className:c()(t),style:k({style:a}),open:d,"aria-expanded":d?"true":"false"}));return o?(0,r.createElement)("details",{...g,itemScope:!0,itemProp:l,itemType:s},(0,r.createElement)("summary",{className:"details__wrapper details__wrapper--summary"},(0,r.createElement)(i.RichText.Content,{tagName:"h3",className:"details__heading",value:n,itemProp:p})),(0,r.createElement)("div",{className:"details__wrapper details__wrapper--text",itemScope:!0,itemProp:m,itemType:u},(0,r.createElement)("div",{itemProp:"text"},h))):(0,r.createElement)("details",{...g},(0,r.createElement)(i.RichText.Content,{tagName:"summary",className:"details__heading",value:n}),(0,r.createElement)("div",{className:"details__wrapper details__wrapper--text"},h))},variations:b,getEditWrapperProps:e=>({"data-align":"full"})})},2084:(e,t)=>{var a;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e="",t=0;t<arguments.length;t++){var a=arguments[t];a&&(e=l(e,r(a)))}return e}function r(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return o.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var a in e)n.call(e,a)&&e[a]&&(t=l(t,a));return t}function l(e,t){return t?e?e+" "+t:e+t:e}e.exports?(o.default=o,e.exports=o):void 0===(a=function(){return o}.apply(t,[]))||(e.exports=a)}()}},a={};function n(e){var o=a[e];if(void 0!==o)return o.exports;var r=a[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,a,o,r)=>{if(!a){var l=1/0;for(p=0;p<e.length;p++){for(var[a,o,r]=e[p],i=!0,s=0;s<a.length;s++)(!1&r||l>=r)&&Object.keys(n.O).every((e=>n.O[e](a[s])))?a.splice(s--,1):(i=!1,r<l&&(l=r));if(i){e.splice(p--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var p=e.length;p>0&&e[p-1][2]>r;p--)e[p]=e[p-1];e[p]=[a,o,r]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={4652:0,3516:0};n.O.j=t=>0===e[t];var t=(t,a)=>{var o,r,[l,i,s]=a,c=0;if(l.some((t=>0!==e[t]))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(s)var p=s(n)}for(t&&t(a);c<l.length;c++)r=l[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(p)},a=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var o=n.O(void 0,[3516],(()=>n(256)));o=n.O(o)})();