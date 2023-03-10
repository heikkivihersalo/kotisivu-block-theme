(()=>{"use strict";var e,t={571:(e,t,i)=>{const r=window.wp.i18n,a=window.wp.blocks;function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},l.apply(this,arguments)}const n=window.wp.element,o=window.wp.blockEditor,s=window.wp.components;s.ColorPalette;const c=e=>{const{attributes:{hasTracking:t,trackingIdentifier:i},setAttributes:a}=e;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.PanelBody,{title:(0,r.__)("Analytics","kotisivu-block-theme"),initialOpen:!0},(0,n.createElement)(s.ToggleControl,{label:(0,r.__)("Track Events","kotisivu-block-theme"),checked:t,onChange:()=>a({hasTracking:!t})}),(0,n.createElement)(s.TextControl,{label:(0,r.__)("Identifier","kotisivu-block-theme"),placeholder:(0,r.__)("ex. name for this button","kotisivu-block-theme"),onChange:e=>a({trackingIdentifier:e}),value:i})))},m=(window.wp.data,window.wp.primitives),d=(0,n.createElement)(m.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(m.Path,{d:"M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"})),u=(0,n.createElement)(m.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(m.Path,{d:"M15.6 7.3h-.7l1.6-3.5-.9-.4-3.9 8.5H9v1.5h2l-1.3 2.8H8.4c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7H10V7.3H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H9l-1.4 3.2.9.4 5.7-12.5h1.4c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2z"})),p=e=>{const{attributes:{post:t,url:i,target:a,rel:l},isSelected:m,setAttributes:p}=e,h=(0,n.useRef)(),g=(0,n.useRef)(),[b,k]=(0,n.useState)(!1),v="_blank"===a,w=!!i,f=()=>{p({post:void 0,url:void 0,target:void 0,rel:void 0}),k(!1)};return(0,n.useEffect)((()=>{m||k(!1)}),[m]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.BlockControls,{group:"block"},!w&&(0,n.createElement)(s.ToolbarButton,{name:"link",icon:d,title:(0,r.__)("Link"),onClick:e=>{e.preventDefault(),k(!0)}}),w&&(0,n.createElement)(s.ToolbarButton,{name:"link",icon:u,title:(0,r.__)("Unlink"),onClick:f,isActive:!0})),m&&(b||w)&&(0,n.createElement)(s.Popover,{position:"bottom center",onClose:()=>{k(!1),g.current?.focus()},anchorRef:h?.current,focusOnMount:!!b&&"firstElement",__unstableSlotName:"__unstable-block-tools-after"},(0,n.createElement)(o.__experimentalLinkControl,{value:t,onChange:e=>{p({post:e,url:e.url,title:e.title}),v!==e.opensInNewTab&&(e=>{const t=e?"_blank":void 0;let i=l;t&&!l?i="noreferrer noopener":t||"noreferrer noopener"!==l||(i=void 0),p({target:t,rel:i})})(e.opensInNewTab)},onRemove:()=>{f(),g.current?.focus()},forceIsEditingLink:b})),(0,n.createElement)(o.InspectorControls,null,(0,n.createElement)(c,e)))},h=e=>{const{attributes:{className:t,mediaUrl:i,mediaAlt:r,mediaWidth:a,mediaHeight:l,lazyLoad:o}}=e;return(0,n.createElement)("img",{loading:o?"lazy":"eager",className:t,src:i,alt:r,width:a?`${a}px`:"",height:l?`${l}px`:""})},g=e=>{const{attributes:{className:t,mediaSrcSet:i,mediaSrcSizes:r,mediaUrl:a,mediaAlt:l,mediaWidth:o,mediaHeight:s,lazyLoad:c}}=e;return(0,n.createElement)("img",{loading:c?"lazy":"eager",className:t,srcSet:i,sizes:r,src:a,alt:l,width:o?`${o}px`:"",height:s?`${s}px`:""})},b=e=>{const{attributes:{mediaMime:t},srcset:i,img:r}=e;return i?(0,n.createElement)(g,e):r||"image/svg+xml"==t?(0,n.createElement)(h,e):(0,n.createElement)(g,e)},k=i.p+"images/placeholder.d7054663.png",v=e=>t=>{e.setAttributes({mediaUrl:"",mediaId:0,mediaAlt:"",mediaMime:"",mediaWidth:"",mediaHeight:"",mediaSrcset:"",sizes:[]})},w=e=>{const t=e.slice(0).reverse();return t.map(((e,i)=>i==t.length-1?`${e.width}px`:`(max-width: ${e.width}px) ${e.width}px`)).join(", ")},f=(e,t)=>{if("image/svg+xml"==e.mime)return void t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime});const i=(e=>{const t=Object.entries(e).map(((e,t)=>{let[i,r]=e;return{id:t,name:i,url:r.url,width:r.width,height:r.height}}));return t[0].width>=t[0].height?t.sort(((e,t)=>t.width-e.width)):t.sort(((e,t)=>t.height-e.height)),t})(e.sizes);var r;t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime,mediaWidth:e.width,mediaHeight:e.height,mediaSrcSet:(r=i,r.slice(0).reverse().map(((e,t)=>{let i=e.width;return`${e.url} ${i}w`})).join(", ")),mediaSrcSizes:w(i)})},E=e=>{const{attributes:{lazyLoad:t},setAttributes:i}=e;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.PanelRow,{className:"image-block-buttons__lazy-load"},(0,n.createElement)(s.ToggleControl,{label:(0,r.__)("Lazy Load","kotisivu-theme-blocks"),checked:t,onChange:()=>i({lazyLoad:!t})})))},y=e=>{const{attributes:{mediaId:t}}=e;return(0,n.createElement)("div",{className:"image-block-buttons"},(0,n.createElement)("div",{className:"image-block-buttons__update"},(0,n.createElement)(o.MediaUploadCheck,null,(0,n.createElement)(o.MediaUpload,{onSelect:t=>f(t,e),allowedTypes:"image",value:t,render:e=>{let{open:t}=e;return(0,n.createElement)(s.Button,{onClick:t,isDefault:!0,isLarge:!0},(0,r.__)("Change image","kotisivu-block-theme"))}})),(0,n.createElement)(o.MediaUploadCheck,null,(0,n.createElement)(s.Button,{onClick:v(e),isLink:!0,isDestructive:!0},(0,r.__)("Remove image","kotisivu-block-theme")))),(0,n.createElement)(E,e))},_=e=>{const{attributes:{mediaId:t}}=e;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.MediaUploadCheck,null,(0,n.createElement)(o.MediaUpload,{onSelect:t=>f(t,e),allowedTypes:"image",value:t,render:t=>{let{open:i}=t;return((e,t)=>{const{attributes:{className:i,mediaUrl:a,mediaAlt:l,mediaMime:o}}=e;return a?"image/svg+xml"==o?(0,n.createElement)("img",{className:i,src:a,alt:l}):(0,n.createElement)(b,e):(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{className:"button-container"},(0,n.createElement)(s.Button,{onClick:t,className:"button button-large"},(0,r.__)("Pick a image","kotisivu-block-theme")),(0,n.createElement)("img",{class:"image-placeholder",src:k})))})(e,i)}})))},x=e=>{const{attributes:{mediaUrl:t}}=e;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(_,e),t&&(0,n.createElement)(y,e))},C=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/link-list-item","title":"List Item","category":"child","icon":"block-default","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"parent":["ksd/link-list"],"editorScript":"file:../../../../build/blocks/link-list-item.js","editorStyle":"file:../../../../build/blocks/link-list-item.css","style":"file:../../../../build/blocks/style-link-list-item.css","attributes":{"post":{"type":"object"},"url":{"type":"string","default":""},"title":{"type":"string","default":""},"content":{"type":"string","default":""},"target":{"type":"string"},"rel":{"type":"string"},"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaMime":{"type":"string","default":""},"mediaWidth":{"type":"number"},"mediaHeight":{"type":"number"}}}'),{apiVersion:S,name:A,title:N,category:T,icon:H,description:O,keywords:z,textdomain:$,supports:j,parent:I}=C,M={apiVersion:S,title:(0,r.__)(N,"kotisivu-block-theme"),description:(0,r.__)(O,"kotisivu-block-theme"),category:T,icon:H,supports:j,keywords:z,textdomain:$,parent:I,edit:e=>{const{attributes:{content:t},setAttributes:i}=e,a=(0,n.useRef)(),s=(0,n.useRef)(),c=(0,o.useBlockProps)({className:"link-list-item",ref:a});return(0,n.createElement)("div",c,(0,n.createElement)(p,e),(0,n.createElement)(x,l({},e,{img:!0})),(0,n.createElement)(o.RichText,{ref:s,"aria-label":(0,r.__)("Add text","kotisivu-block-theme"),placeholder:(0,r.__)("Add text","kotisivu-block-theme"),value:t,onChange:e=>i({content:e}),withoutInteractiveFormatting:!0}))},save:e=>{const{attributes:{content:t,url:i,title:r,target:a,rel:s,mediaUrl:c,mediaAlt:m}}=e,d=o.useBlockProps.save({className:"link-list-item"});return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.RichText.Content,l({},d,{tagName:"a",href:i,title:r,value:`<img src=${c} alt=${m}/>${t}`,target:a,rel:s})))}};(0,a.registerBlockType)(A,M)}},i={};function r(e){var a=i[e];if(void 0!==a)return a.exports;var l=i[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=(t,i,a,l)=>{if(!i){var n=1/0;for(m=0;m<e.length;m++){for(var[i,a,l]=e[m],o=!0,s=0;s<i.length;s++)(!1&l||n>=l)&&Object.keys(r.O).every((e=>r.O[e](i[s])))?i.splice(s--,1):(o=!1,l<n&&(n=l));if(o){e.splice(m--,1);var c=a();void 0!==c&&(t=c)}}return t}l=l||0;for(var m=e.length;m>0&&e[m-1][2]>l;m--)e[m]=e[m-1];e[m]=[i,a,l]},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{var e={443:0,521:0};r.O.j=t=>0===e[t];var t=(t,i)=>{var a,l,[n,o,s]=i,c=0;if(n.some((t=>0!==e[t]))){for(a in o)r.o(o,a)&&(r.m[a]=o[a]);if(s)var m=s(r)}for(t&&t(i);c<n.length;c++)l=n[c],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(m)},i=globalThis.webpackChunkksd_custom_blocks=globalThis.webpackChunkksd_custom_blocks||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var a=r.O(void 0,[521],(()=>r(571)));a=r.O(a)})();