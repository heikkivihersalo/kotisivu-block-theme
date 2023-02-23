!function(){"use strict";var e,t={501:function(e,t,a){var i=window.wp.i18n,n=window.wp.blocks;function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},s.apply(this,arguments)}var r=window.wp.element,c=window.wp.blockEditor,l=window.wp.components,o=e=>{const{attributes:{className:t,mediaUrl:a,mediaAlt:i,mediaWidth:n,mediaHeight:s,lazyLoad:c}}=e;return(0,r.createElement)("img",{loading:c?"lazy":"eager",className:t,src:a,alt:i,width:n?`${n}px`:"",height:s?`${s}px`:""})},m=e=>{const{attributes:{className:t,mediaSrcSet:a,mediaSrcSizes:i,mediaUrl:n,mediaAlt:s,mediaWidth:c,mediaHeight:l,lazyLoad:o}}=e;return(0,r.createElement)("img",{loading:o?"lazy":"eager",className:t,srcSet:a,sizes:i,src:n,alt:s,width:c?`${c}px`:"",height:l?`${l}px`:""})};const d=e=>{const{attributes:{mediaMime:t},srcset:a,img:i}=e;return a?(0,r.createElement)(m,e):i||"image/svg+xml"==t?(0,r.createElement)(o,e):(0,r.createElement)(m,e)};var u=a.p+"images/placeholder.d7054663.png";const p=e=>t=>{e.setAttributes({mediaUrl:"",mediaId:0,mediaAlt:"",mediaMime:"",mediaWidth:"",mediaHeight:"",mediaSrcset:"",sizes:[]})},h=e=>{const t=e.slice(0).reverse();return t.map(((e,a)=>a==t.length-1?`${e.width}px`:`(max-width: ${e.width}px) ${e.width}px`)).join(", ")},g=(e,t)=>{if("image/svg+xml"==e.mime)return void t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime});const a=(e=>{const t=Object.entries(e).map(((e,t)=>{let[a,i]=e;return{id:t,name:a,url:i.url,width:i.width,height:i.height}}));return t[0].width>=t[0].height?t.sort(((e,t)=>t.width-e.width)):t.sort(((e,t)=>t.height-e.height)),t})(e.sizes);var i;t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime,mediaWidth:e.width,mediaHeight:e.height,mediaSrcSet:(i=a,i.slice(0).reverse().map(((e,t)=>{let a=e.width;return`${e.url} ${a}w`})).join(", ")),mediaSrcSizes:h(a)})};var b=e=>{const{attributes:{lazyLoad:t},setAttributes:a}=e;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(l.PanelRow,{className:"image-block-buttons__lazy-load"},(0,r.createElement)(l.ToggleControl,{label:(0,i.__)("Lazy Load","kotisivu-theme-blocks"),checked:t,onChange:()=>a({lazyLoad:!t})})))},k=e=>{const{attributes:{mediaId:t}}=e;return(0,r.createElement)("div",{className:"image-block-buttons"},(0,r.createElement)("div",{className:"image-block-buttons__update"},(0,r.createElement)(c.MediaUploadCheck,null,(0,r.createElement)(c.MediaUpload,{onSelect:t=>g(t,e),allowedTypes:"image",value:t,render:e=>{let{open:t}=e;return(0,r.createElement)(l.Button,{onClick:t,isDefault:!0,isLarge:!0},(0,i.__)("Change image","kotisivu-block-theme"))}})),(0,r.createElement)(c.MediaUploadCheck,null,(0,r.createElement)(l.Button,{onClick:p(e),isLink:!0,isDestructive:!0},(0,i.__)("Remove image","kotisivu-block-theme")))),(0,r.createElement)(b,e))},f=e=>{const{attributes:{mediaId:t}}=e;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(c.MediaUploadCheck,null,(0,r.createElement)(c.MediaUpload,{onSelect:t=>g(t,e),allowedTypes:"image",value:t,render:t=>{let{open:a}=t;return((e,t)=>{const{attributes:{className:a,mediaUrl:n,mediaAlt:s,mediaMime:c}}=e;return n?"image/svg+xml"==c?(0,r.createElement)("img",{className:a,src:n,alt:s}):(0,r.createElement)(d,e):(0,r.createElement)(r.Fragment,null,(0,r.createElement)("div",{className:"button-container"},(0,r.createElement)(l.Button,{onClick:t,className:"button button-large"},(0,i.__)("Pick a image","kotisivu-block-theme")),(0,r.createElement)("img",{class:"image-placeholder",src:u})))})(e,a)}})))};const v=e=>{const{attributes:{mediaUrl:t}}=e;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(f,e),t&&(0,r.createElement)(k,e))},_=e=>e.replace(/\s+/g," ").trim(),w=(e,t,a,i,n,s)=>r=>{let c=s.split(" ");e.setAttributes({[t]:!a}),a?c=c.filter((e=>e!=i)):c.push(i),e.setAttributes({[n]:_(c.join(" "))})};var E=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/contact-us","title":"Contact Us","category":"blocks","icon":"id-alt","description":"Contact us section with contact information","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/contact-us.js","editorStyle":"file:../../../../build/contact-us.css","style":"file:../../../../build/style-contact-us.css","attributes":{"textContent":{"type":"string","default":""},"template":{"type":"array","default":[]},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false],"default":true},"isWide":{"type":"boolean","default":false},"modifiers":{"type":"string","default":""},"align":{"type":"string","default":"full"},"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaMime":{"type":"string","default":""},"mediaWidth":{"type":"number"},"mediaHeight":{"type":"number"}}}');const{apiVersion:y,name:N,title:x,category:C,icon:S,description:A,keywords:O,textdomain:j,supports:$}=E,U={apiVersion:y,title:(0,i.__)(x,"kotisivu-block-theme"),description:(0,i.__)(A,"kotisivu-block-theme"),category:C,icon:S,supports:$,keywords:O,textdomain:j,edit:e=>{const{attributes:{templateLock:t,textContent:a,isWide:n,modifiers:o},setAttributes:m}=e,d=(0,c.useBlockProps)({className:_(`contact-us ${o}`)});return(0,r.createElement)("section",d,(0,r.createElement)(c.InspectorControls,null,(0,r.createElement)(l.PanelBody,{title:(0,i.__)("Settings","kotisivu-block-theme"),initialOpen:!0},(0,r.createElement)(l.ToggleControl,{label:(0,i.__)("Set as wide","kotisivu-block-theme"),checked:n,onChange:w(e,"isWide",n,"is-wide","modifiers",o)}))),(0,r.createElement)(c.RichText,{"aria-label":(0,i.__)("Add section heading","kotisivu-block-theme"),placeholder:(0,i.__)("Add section heading","kotisivu-block-theme"),tagName:"h2",value:a,className:"contact-us__heading",onChange:e=>m({textContent:e})}),(0,r.createElement)(v,s({},e,{img:!0})),(0,r.createElement)("hr",{className:"contact-us__separator"}),(0,r.createElement)("address",{className:"contact-us__address-container"},(0,r.createElement)(c.InnerBlocks,{allowedBlocks:["ksd/contact-us--name","ksd/contact-us--title","ksd/contact-us--phone","ksd/contact-us--email"],template:[["ksd/contact-us--name",{className:"contact-us__address contact-us__address--name"}],["ksd/contact-us--title",{className:"contact-us__address contact-us__address--title"}],["ksd/contact-us--phone",{className:"contact-us__address contact-us__address--phone"}],["ksd/contact-us--email",{className:"contact-us__address contact-us__address--email"}]],templateLock:t})))},save:e=>{const{attributes:{textContent:t,modifiers:a}}=e,i=c.useBlockProps.save({className:_(`contact-us ${a}`)});return(0,r.createElement)("section",i,(0,r.createElement)(c.RichText.Content,{tagName:"h2",value:t,className:"contact-us__heading"}),(0,r.createElement)(d,s({},e,{img:!0})),(0,r.createElement)("hr",{className:"contact-us__separator"}),(0,r.createElement)("address",{className:"contact-us__address-container"},(0,r.createElement)(c.InnerBlocks.Content,null)))}};(0,n.registerBlockType)(N,U)}},a={};function i(e){var n=a[e];if(void 0!==n)return n.exports;var s=a[e]={exports:{}};return t[e](s,s.exports,i),s.exports}i.m=t,e=[],i.O=function(t,a,n,s){if(!a){var r=1/0;for(m=0;m<e.length;m++){a=e[m][0],n=e[m][1],s=e[m][2];for(var c=!0,l=0;l<a.length;l++)(!1&s||r>=s)&&Object.keys(i.O).every((function(e){return i.O[e](a[l])}))?a.splice(l--,1):(c=!1,s<r&&(r=s));if(c){e.splice(m--,1);var o=n();void 0!==o&&(t=o)}}return t}s=s||0;for(var m=e.length;m>0&&e[m-1][2]>s;m--)e[m]=e[m-1];e[m]=[a,n,s]},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var a=t.getElementsByTagName("script");a.length&&(e=a[a.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e}(),function(){var e={8477:0,7681:0};i.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,s,r=a[0],c=a[1],l=a[2],o=0;if(r.some((function(t){return 0!==e[t]}))){for(n in c)i.o(c,n)&&(i.m[n]=c[n]);if(l)var m=l(i)}for(t&&t(a);o<r.length;o++)s=r[o],i.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return i.O(m)},a=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var n=i.O(void 0,[7681],(function(){return i(501)}));n=i.O(n)}();