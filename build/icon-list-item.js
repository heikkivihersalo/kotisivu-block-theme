!function(){"use strict";var e,t={958:function(e,t,i){var a=window.wp.i18n,r=window.wp.blocks;function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e},n.apply(this,arguments)}var l=window.wp.element,s=window.wp.blockEditor,o=e=>{const{attributes:{className:t,mediaUrl:i,mediaAlt:a,mediaWidth:r,mediaHeight:n,lazyLoad:s}}=e;return(0,l.createElement)("img",{loading:s?"lazy":"eager",className:t,src:i,alt:a,width:r?`${r}px`:"",height:n?`${n}px`:""})},c=e=>{const{attributes:{className:t,mediaSrcSet:i,mediaSrcSizes:a,mediaUrl:r,mediaAlt:n,mediaWidth:s,mediaHeight:o,lazyLoad:c}}=e;return(0,l.createElement)("img",{loading:c?"lazy":"eager",className:t,srcSet:i,sizes:a,src:r,alt:n,width:s?`${s}px`:"",height:o?`${o}px`:""})};const m=e=>{const{attributes:{mediaMime:t},srcset:i,img:a}=e;return i?(0,l.createElement)(c,e):a||"image/svg+xml"==t?(0,l.createElement)(o,e):(0,l.createElement)(c,e)};var d=window.wp.components,u=i.p+"images/placeholder.d7054663.png";const p=e=>t=>{e.setAttributes({mediaUrl:"",mediaId:0,mediaAlt:"",mediaMime:"",mediaWidth:"",mediaHeight:"",mediaSrcset:"",sizes:[]})},h=e=>{const t=e.slice(0).reverse();return t.map(((e,i)=>i==t.length-1?`${e.width}px`:`(max-width: ${e.width}px) ${e.width}px`)).join(", ")},g=(e,t)=>{if("image/svg+xml"==e.mime)return void t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime});const i=(e=>{const t=Object.entries(e).map(((e,t)=>{let[i,a]=e;return{id:t,name:i,url:a.url,width:a.width,height:a.height}}));return t[0].width>=t[0].height?t.sort(((e,t)=>t.width-e.width)):t.sort(((e,t)=>t.height-e.height)),t})(e.sizes);var a;t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime,mediaWidth:e.width,mediaHeight:e.height,mediaSrcSet:(a=i,a.slice(0).reverse().map(((e,t)=>{let i=e.width;return`${e.url} ${i}w`})).join(", ")),mediaSrcSizes:h(i)})};var b=e=>{const{attributes:{lazyLoad:t},setAttributes:i}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(d.PanelRow,{className:"image-block-buttons__lazy-load"},(0,l.createElement)(d.ToggleControl,{label:(0,a.__)("Lazy Load","kotisivu-theme-blocks"),checked:t,onChange:()=>i({lazyLoad:!t})})))},v=e=>{const{attributes:{mediaId:t}}=e;return(0,l.createElement)("div",{className:"image-block-buttons"},(0,l.createElement)("div",{className:"image-block-buttons__update"},(0,l.createElement)(s.MediaUploadCheck,null,(0,l.createElement)(s.MediaUpload,{onSelect:t=>g(t,e),allowedTypes:"image",value:t,render:e=>{let{open:t}=e;return(0,l.createElement)(d.Button,{onClick:t,isDefault:!0,isLarge:!0},(0,a.__)("Change image","kotisivu-block-theme"))}})),(0,l.createElement)(s.MediaUploadCheck,null,(0,l.createElement)(d.Button,{onClick:p(e),isLink:!0,isDestructive:!0},(0,a.__)("Remove image","kotisivu-block-theme")))),(0,l.createElement)(b,e))},f=e=>{const{attributes:{mediaId:t}}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(s.MediaUploadCheck,null,(0,l.createElement)(s.MediaUpload,{onSelect:t=>g(t,e),allowedTypes:"image",value:t,render:t=>{let{open:i}=t;return((e,t)=>{const{attributes:{className:i,mediaUrl:r,mediaAlt:n,mediaMime:s}}=e;return r?"image/svg+xml"==s?(0,l.createElement)("img",{className:i,src:r,alt:n}):(0,l.createElement)(m,e):(0,l.createElement)(l.Fragment,null,(0,l.createElement)("div",{className:"button-container"},(0,l.createElement)(d.Button,{onClick:t,className:"button button-large"},(0,a.__)("Pick a image","kotisivu-block-theme")),(0,l.createElement)("img",{class:"image-placeholder",src:u})))})(e,i)}})))};const k=e=>{const{attributes:{mediaUrl:t}}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(f,e),t&&(0,l.createElement)(v,e))};var w=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/icon-list-item","title":"List Item","category":"child","icon":"block-default","description":"","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"parent":["ksd/icon-list"],"editorScript":"file:../../../../build/icon-list-item.js","editorStyle":"file:../../../../build/icon-list-item.css","style":"file:../../../../build/style-icon-list-item.css","attributes":{"textContent":{"type":"string","default":""},"post":{"type":"object"},"url":{"type":"string","default":""},"title":{"type":"string","default":""},"target":{"type":"string"},"rel":{"type":"string"},"isLink":{"type":"boolean","default":false},"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaMime":{"type":"string","default":""},"mediaWidth":{"type":"number"},"mediaHeight":{"type":"number"}}}');const{apiVersion:y,name:E,title:_,category:x,icon:S,description:C,keywords:N,textdomain:O,supports:j,parent:A}=w,z={apiVersion:y,title:(0,a.__)(_,"kotisivu-block-theme"),description:(0,a.__)(C,"kotisivu-block-theme"),category:x,icon:S,supports:j,keywords:N,textdomain:O,parent:A,edit:e=>{const{attributes:{textContent:t},setAttributes:i}=e,r=(0,s.useBlockProps)({className:"icon-list__item"});return(0,l.createElement)("li",r,(0,l.createElement)(k,n({},e,{img:!0})),(0,l.createElement)(s.RichText,{"aria-label":(0,a.__)("Add item name","kotisivu-block-theme"),placeholder:(0,a.__)("Add item name","kotisivu-block-theme"),value:t,onChange:e=>i({textContent:e})}))},save:e=>{const{attributes:{textContent:t}}=e,i=s.useBlockProps.save({className:"icon-list__item"});return(0,l.createElement)("li",i,(0,l.createElement)(m,n({},e,{img:!0})),(0,l.createElement)(s.RichText.Content,{value:t}))}};(0,r.registerBlockType)(E,z)}},i={};function a(e){var r=i[e];if(void 0!==r)return r.exports;var n=i[e]={exports:{}};return t[e](n,n.exports,a),n.exports}a.m=t,e=[],a.O=function(t,i,r,n){if(!i){var l=1/0;for(m=0;m<e.length;m++){i=e[m][0],r=e[m][1],n=e[m][2];for(var s=!0,o=0;o<i.length;o++)(!1&n||l>=n)&&Object.keys(a.O).every((function(e){return a.O[e](i[o])}))?i.splice(o--,1):(s=!1,n<l&&(l=n));if(s){e.splice(m--,1);var c=r();void 0!==c&&(t=c)}}return t}n=n||0;for(var m=e.length;m>0&&e[m-1][2]>n;m--)e[m]=e[m-1];e[m]=[i,r,n]},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e}(),function(){var e={164:0,545:0};a.O.j=function(t){return 0===e[t]};var t=function(t,i){var r,n,l=i[0],s=i[1],o=i[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(r in s)a.o(s,r)&&(a.m[r]=s[r]);if(o)var m=o(a)}for(t&&t(i);c<l.length;c++)n=l[c],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(m)},i=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var r=a.O(void 0,[545],(function(){return a(958)}));r=a.O(r)}();