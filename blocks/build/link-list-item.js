!function(){"use strict";var e,t={330:function(e,t,i){var r=window.wp.i18n,n=window.wp.blocks;function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},a.apply(this,arguments)}var l=window.wp.element,o=window.wp.blockEditor,s=window.wp.components;s.ColorPalette;const c=e=>{const{attributes:{hasTracking:t,trackingIdentifier:i},setAttributes:n}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(s.PanelBody,{title:(0,r.__)("Analytics","kotisivu-block-theme"),initialOpen:!0},(0,l.createElement)(s.ToggleControl,{label:(0,r.__)("Track Events","kotisivu-block-theme"),checked:t,onChange:()=>n({hasTracking:!t})}),(0,l.createElement)(s.TextControl,{label:(0,r.__)("Identifier","kotisivu-block-theme"),placeholder:(0,r.__)("ex. name for this button","kotisivu-block-theme"),onChange:e=>n({trackingIdentifier:e}),value:i})))};window.wp.data;var m=window.wp.primitives,u=(0,l.createElement)(m.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,l.createElement)(m.Path,{d:"M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"})),d=(0,l.createElement)(m.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,l.createElement)(m.Path,{d:"M15.6 7.3h-.7l1.6-3.5-.9-.4-3.9 8.5H9v1.5h2l-1.3 2.8H8.4c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7H10V7.3H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H9l-1.4 3.2.9.4 5.7-12.5h1.4c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2z"}));const p=e=>{const{attributes:{post:t,url:i,target:n,rel:a},isSelected:m,setAttributes:p}=e,h=(0,l.useRef)(),g=(0,l.useRef)(),[v,b]=(0,l.useState)(!1),k="_blank"===n,f=!!i,w=()=>{p({post:void 0,url:void 0,target:void 0,rel:void 0}),b(!1)};return(0,l.useEffect)((()=>{m||b(!1)}),[m]),(0,l.createElement)(l.Fragment,null,(0,l.createElement)(o.BlockControls,{group:"block"},!f&&(0,l.createElement)(s.ToolbarButton,{name:"link",icon:u,title:(0,r.__)("Link"),onClick:e=>{e.preventDefault(),b(!0)}}),f&&(0,l.createElement)(s.ToolbarButton,{name:"link",icon:d,title:(0,r.__)("Unlink"),onClick:w,isActive:!0})),m&&(v||f)&&(0,l.createElement)(s.Popover,{position:"bottom center",onClose:()=>{var e;b(!1),null===(e=g.current)||void 0===e||e.focus()},anchorRef:null==h?void 0:h.current,focusOnMount:!!v&&"firstElement",__unstableSlotName:"__unstable-block-tools-after"},(0,l.createElement)(o.__experimentalLinkControl,{value:t,onChange:e=>{p({post:e,url:e.url,title:e.title}),k!==e.opensInNewTab&&(e=>{const t=e?"_blank":void 0;let i=a;t&&!a?i="noreferrer noopener":t||"noreferrer noopener"!==a||(i=void 0),p({target:t,rel:i})})(e.opensInNewTab)},onRemove:()=>{var e;w(),null===(e=g.current)||void 0===e||e.focus()},forceIsEditingLink:v})),(0,l.createElement)(o.InspectorControls,null,(0,l.createElement)(c,e)))};var h=e=>{const{attributes:{className:t,mediaUrl:i,mediaAlt:r,mediaWidth:n,mediaHeight:a,lazyLoad:o}}=e;return(0,l.createElement)("img",{loading:o?"lazy":"eager",className:t,src:i,alt:r,width:n?`${n}px`:"",height:a?`${a}px`:""})},g=e=>{const{attributes:{className:t,mediaSrcSet:i,mediaSrcSizes:r,mediaUrl:n,mediaAlt:a,mediaWidth:o,mediaHeight:s,lazyLoad:c}}=e;return(0,l.createElement)("img",{loading:c?"lazy":"eager",className:t,srcSet:i,sizes:r,src:n,alt:a,width:o?`${o}px`:"",height:s?`${s}px`:""})};const v=e=>{const{attributes:{mediaMime:t},srcset:i,img:r}=e;return i?(0,l.createElement)(g,e):r||"image/svg+xml"==t?(0,l.createElement)(h,e):(0,l.createElement)(g,e)};var b=i.p+"images/placeholder.d7054663.png";const k=e=>t=>{e.setAttributes({mediaUrl:"",mediaId:0,mediaAlt:"",mediaMime:"",mediaWidth:"",mediaHeight:"",mediaSrcset:"",sizes:[]})},f=e=>{const t=e.slice(0).reverse();return t.map(((e,i)=>i==t.length-1?`${e.width}px`:`(max-width: ${e.width}px) ${e.width}px`)).join(", ")},w=(e,t)=>{if("image/svg+xml"==e.mime)return void t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime});const i=(e=>{const t=Object.entries(e).map(((e,t)=>{let[i,r]=e;return{id:t,name:i,url:r.url,width:r.width,height:r.height}}));return t[0].width>=t[0].height?t.sort(((e,t)=>t.width-e.width)):t.sort(((e,t)=>t.height-e.height)),t})(e.sizes);var r;t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime,mediaWidth:e.width,mediaHeight:e.height,mediaSrcSet:(r=i,r.slice(0).reverse().map(((e,t)=>{let i=e.width;return`${e.url} ${i}w`})).join(", ")),mediaSrcSizes:f(i)})};var E=e=>{const{attributes:{lazyLoad:t},setAttributes:i}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(s.PanelRow,{className:"image-block-buttons__lazy-load"},(0,l.createElement)(s.ToggleControl,{label:(0,r.__)("Lazy Load","kotisivu-theme-blocks"),checked:t,onChange:()=>i({lazyLoad:!t})})))},y=e=>{const{attributes:{mediaId:t}}=e;return(0,l.createElement)("div",{className:"image-block-buttons"},(0,l.createElement)("div",{className:"image-block-buttons__update"},(0,l.createElement)(o.MediaUploadCheck,null,(0,l.createElement)(o.MediaUpload,{onSelect:t=>w(t,e),allowedTypes:"image",value:t,render:e=>{let{open:t}=e;return(0,l.createElement)(s.Button,{onClick:t,isDefault:!0,isLarge:!0},(0,r.__)("Change image","kotisivu-block-theme"))}})),(0,l.createElement)(o.MediaUploadCheck,null,(0,l.createElement)(s.Button,{onClick:k(e),isLink:!0,isDestructive:!0},(0,r.__)("Remove image","kotisivu-block-theme")))),(0,l.createElement)(E,e))},_=e=>{const{attributes:{mediaId:t}}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(o.MediaUploadCheck,null,(0,l.createElement)(o.MediaUpload,{onSelect:t=>w(t,e),allowedTypes:"image",value:t,render:t=>{let{open:i}=t;return((e,t)=>{const{attributes:{className:i,mediaUrl:n,mediaAlt:a,mediaMime:o}}=e;return n?"image/svg+xml"==o?(0,l.createElement)("img",{className:i,src:n,alt:a}):(0,l.createElement)(v,e):(0,l.createElement)(l.Fragment,null,(0,l.createElement)("div",{className:"button-container"},(0,l.createElement)(s.Button,{onClick:t,className:"button button-large"},(0,r.__)("Pick a image","kotisivu-block-theme")),(0,l.createElement)("img",{class:"image-placeholder",src:b})))})(e,i)}})))};const x=e=>{const{attributes:{mediaUrl:t}}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(_,e),t&&(0,l.createElement)(y,e))};var C=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/link-list-item","title":"List Item","category":"child","icon":"block-default","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"parent":["ksd/link-list"],"editorScript":"file:../../../../build/link-list-item.js","editorStyle":"file:../../../../build/link-list-item.css","style":"file:../../../../build/style-link-list-item.css","attributes":{"post":{"type":"object"},"url":{"type":"string","default":""},"title":{"type":"string","default":""},"content":{"type":"string","default":""},"target":{"type":"string"},"rel":{"type":"string"},"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaMime":{"type":"string","default":""},"mediaWidth":{"type":"number"},"mediaHeight":{"type":"number"}}}');const{apiVersion:S,name:A,title:N,category:H,icon:O,description:T,keywords:z,textdomain:$,supports:j,parent:I}=C,M={apiVersion:S,title:(0,r.__)(N,"kotisivu-block-theme"),description:(0,r.__)(T,"kotisivu-block-theme"),category:H,icon:O,supports:j,keywords:z,textdomain:$,parent:I,edit:e=>{const{attributes:{content:t},setAttributes:i}=e,n=(0,l.useRef)(),s=(0,l.useRef)(),c=(0,o.useBlockProps)({className:"link-list-item",ref:n});return(0,l.createElement)("div",c,(0,l.createElement)(p,e),(0,l.createElement)(x,a({},e,{img:!0})),(0,l.createElement)(o.RichText,{ref:s,"aria-label":(0,r.__)("Add text","kotisivu-block-theme"),placeholder:(0,r.__)("Add text","kotisivu-block-theme"),value:t,onChange:e=>i({content:e}),withoutInteractiveFormatting:!0}))},save:e=>{const{attributes:{content:t,url:i,title:r,target:n,rel:s,mediaUrl:c,mediaAlt:m}}=e,u=o.useBlockProps.save({className:"link-list-item"});return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(o.RichText.Content,a({},u,{tagName:"a",href:i,title:r,value:`<img src=${c} alt=${m}/>${t}`,target:n,rel:s})))}};(0,n.registerBlockType)(A,M)}},i={};function r(e){var n=i[e];if(void 0!==n)return n.exports;var a=i[e]={exports:{}};return t[e](a,a.exports,r),a.exports}r.m=t,e=[],r.O=function(t,i,n,a){if(!i){var l=1/0;for(m=0;m<e.length;m++){i=e[m][0],n=e[m][1],a=e[m][2];for(var o=!0,s=0;s<i.length;s++)(!1&a||l>=a)&&Object.keys(r.O).every((function(e){return r.O[e](i[s])}))?i.splice(s--,1):(o=!1,a<l&&(l=a));if(o){e.splice(m--,1);var c=n();void 0!==c&&(t=c)}}return t}a=a||0;for(var m=e.length;m>0&&e[m-1][2]>a;m--)e[m]=e[m-1];e[m]=[i,n,a]},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e}(),function(){var e={3443:0,1858:0};r.O.j=function(t){return 0===e[t]};var t=function(t,i){var n,a,l=i[0],o=i[1],s=i[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(n in o)r.o(o,n)&&(r.m[n]=o[n]);if(s)var m=s(r)}for(t&&t(i);c<l.length;c++)a=l[c],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(m)},i=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var n=r.O(void 0,[1858],(function(){return r(330)}));n=r.O(n)}();