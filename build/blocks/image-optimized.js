(()=>{"use strict";var e,t={860:(e,t,i)=>{const a=window.wp.i18n,r=window.wp.blocks;function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e},l.apply(this,arguments)}const n=window.wp.element,s=window.wp.blockEditor,o=e=>{const{attributes:{className:t,mediaUrl:i,mediaAlt:a,mediaWidth:r,mediaHeight:l,lazyLoad:s}}=e;return(0,n.createElement)("img",{loading:s?"lazy":"eager",className:t,src:i,alt:a,width:r?`${r}px`:"",height:l?`${l}px`:""})},m=e=>{const{attributes:{className:t,mediaSrcSet:i,mediaSrcSizes:a,mediaUrl:r,mediaAlt:l,mediaWidth:s,mediaHeight:o,lazyLoad:m}}=e;return(0,n.createElement)("img",{loading:m?"lazy":"eager",className:t,srcSet:i,sizes:a,src:r,alt:l,width:s?`${s}px`:"",height:o?`${o}px`:""})},c=e=>{const{attributes:{mediaMime:t},srcset:i,img:a}=e;return i?(0,n.createElement)(m,e):a||"image/svg+xml"==t?(0,n.createElement)(o,e):(0,n.createElement)(m,e)},d=window.wp.components,u=i.p+"images/placeholder.d7054663.png",p=e=>t=>{e.setAttributes({mediaUrl:"",mediaId:0,mediaAlt:"",mediaMime:"",mediaWidth:"",mediaHeight:"",mediaSrcset:"",sizes:[]})},g=e=>{const t=e.slice(0).reverse();return t.map(((e,i)=>i==t.length-1?`${e.width}px`:`(max-width: ${e.width}px) ${e.width}px`)).join(", ")},h=(e,t)=>{if("image/svg+xml"==e.mime)return void t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime});const i=(e=>{const t=Object.entries(e).map(((e,t)=>{let[i,a]=e;return{id:t,name:i,url:a.url,width:a.width,height:a.height}}));return t[0].width>=t[0].height?t.sort(((e,t)=>t.width-e.width)):t.sort(((e,t)=>t.height-e.height)),t})(e.sizes);var a;t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime,mediaWidth:e.width,mediaHeight:e.height,mediaSrcSet:(a=i,a.slice(0).reverse().map(((e,t)=>{let i=e.width;return`${e.url} ${i}w`})).join(", ")),mediaSrcSizes:g(i)})},b=e=>{const{attributes:{lazyLoad:t},setAttributes:i}=e;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(d.PanelRow,{className:"image-block-buttons__lazy-load"},(0,n.createElement)(d.ToggleControl,{label:(0,a.__)("Lazy Load","kotisivu-theme-blocks"),checked:t,onChange:()=>i({lazyLoad:!t})})))},k=e=>{const{attributes:{mediaId:t}}=e;return(0,n.createElement)("div",{className:"image-block-buttons"},(0,n.createElement)("div",{className:"image-block-buttons__update"},(0,n.createElement)(s.MediaUploadCheck,null,(0,n.createElement)(s.MediaUpload,{onSelect:t=>h(t,e),allowedTypes:"image",value:t,render:e=>{let{open:t}=e;return(0,n.createElement)(d.Button,{onClick:t,isDefault:!0,isLarge:!0},(0,a.__)("Change image","kotisivu-block-theme"))}})),(0,n.createElement)(s.MediaUploadCheck,null,(0,n.createElement)(d.Button,{onClick:p(e),isLink:!0,isDestructive:!0},(0,a.__)("Remove image","kotisivu-block-theme")))),(0,n.createElement)(b,e))},v=e=>{const{attributes:{mediaId:t}}=e;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.MediaUploadCheck,null,(0,n.createElement)(s.MediaUpload,{onSelect:t=>h(t,e),allowedTypes:"image",value:t,render:t=>{let{open:i}=t;return((e,t)=>{const{attributes:{className:i,mediaUrl:r,mediaAlt:l,mediaMime:s}}=e;return r?"image/svg+xml"==s?(0,n.createElement)("img",{className:i,src:r,alt:l}):(0,n.createElement)(c,e):(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{className:"button-container"},(0,n.createElement)(d.Button,{onClick:t,className:"button button-large"},(0,a.__)("Pick a image","kotisivu-block-theme")),(0,n.createElement)("img",{class:"image-placeholder",src:u})))})(e,i)}})))},w=e=>{const{attributes:{mediaUrl:t}}=e;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(v,e),t&&(0,n.createElement)(k,e))},y=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/image-optimized","title":"Image (Optimized)","category":"media","icon":"format-image","description":"Super simple image block to replace Gutenberg default image block","keywords":["image"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/blocks/image-optimized.js","editorStyle":"file:../../../../build/blocks/image-optimized.css","style":"file:../../../../build/blocks/style-image-optimized.css","attributes":{"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaWidth":{"type":"number","default":""},"mediaHeight":{"type":"number","default":""},"mediaMime":{"type":"string","default":""},"mediaClass":{"type":"string","default":"image-optimized"},"mediaSrcSet":{"type":"string","default":""},"mediaSrcSizes":{"type":"string","default":""},"lazyLoad":{"type":"boolean","default":true}}}'),{apiVersion:f,name:E,title:S,category:z,icon:_,description:x,keywords:O,textdomain:j,supports:N}=y,U={apiVersion:f,title:(0,a.__)(S,"kotisivu-block-theme"),description:(0,a.__)(x,"kotisivu-block-theme"),category:z,icon:_,supports:N,keywords:O,textdomain:j,edit:e=>{const t=(0,s.useBlockProps)();return(0,n.createElement)("div",t,(0,n.createElement)(w,l({},e,{srcset:!0})))},save:e=>(0,n.createElement)(n.Fragment,null,(0,n.createElement)(c,l({},e,{srcset:!0})))};(0,r.registerBlockType)(E,U)}},i={};function a(e){var r=i[e];if(void 0!==r)return r.exports;var l=i[e]={exports:{}};return t[e](l,l.exports,a),l.exports}a.m=t,e=[],a.O=(t,i,r,l)=>{if(!i){var n=1/0;for(c=0;c<e.length;c++){for(var[i,r,l]=e[c],s=!0,o=0;o<i.length;o++)(!1&l||n>=l)&&Object.keys(a.O).every((e=>a.O[e](i[o])))?i.splice(o--,1):(s=!1,l<n&&(n=l));if(s){e.splice(c--,1);var m=r();void 0!==m&&(t=m)}}return t}l=l||0;for(var c=e.length;c>0&&e[c-1][2]>l;c--)e[c]=e[c-1];e[c]=[i,r,l]},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e})(),(()=>{var e={191:0,921:0};a.O.j=t=>0===e[t];var t=(t,i)=>{var r,l,[n,s,o]=i,m=0;if(n.some((t=>0!==e[t]))){for(r in s)a.o(s,r)&&(a.m[r]=s[r]);if(o)var c=o(a)}for(t&&t(i);m<n.length;m++)l=n[m],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(c)},i=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var r=a.O(void 0,[921],(()=>a(860)));r=a.O(r)})();