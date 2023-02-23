!function(){"use strict";var e,t={648:function(e,t,a){var r=window.wp.i18n,i=window.wp.blocks,l=window.wp.element,n=window.wp.data,o=window.wp.blockEditor,s=e=>{const{attributes:{className:t,mediaUrl:a,mediaAlt:r,mediaWidth:i,mediaHeight:n,lazyLoad:o}}=e;return(0,l.createElement)("img",{loading:o?"lazy":"eager",className:t,src:a,alt:r,width:i?`${i}px`:"",height:n?`${n}px`:""})},c=e=>{const{attributes:{className:t,mediaSrcSet:a,mediaSrcSizes:r,mediaUrl:i,mediaAlt:n,mediaWidth:o,mediaHeight:s,lazyLoad:c}}=e;return(0,l.createElement)("img",{loading:c?"lazy":"eager",className:t,srcSet:a,sizes:r,src:i,alt:n,width:o?`${o}px`:"",height:s?`${s}px`:""})};const m=e=>{const{attributes:{mediaMime:t},srcset:a,img:r}=e;return a?(0,l.createElement)(c,e):r||"image/svg+xml"==t?(0,l.createElement)(s,e):(0,l.createElement)(c,e)};var d=window.wp.components,u=a.p+"images/placeholder.d7054663.png";const h=e=>t=>{e.setAttributes({mediaUrl:"",mediaId:0,mediaAlt:"",mediaMime:"",mediaWidth:"",mediaHeight:"",mediaSrcset:"",sizes:[]})},g=e=>{const t=e.slice(0).reverse();return t.map(((e,a)=>a==t.length-1?`${e.width}px`:`(max-width: ${e.width}px) ${e.width}px`)).join(", ")},p=(e,t)=>{if("image/svg+xml"==e.mime)return void t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime});const a=(e=>{const t=Object.entries(e).map(((e,t)=>{let[a,r]=e;return{id:t,name:a,url:r.url,width:r.width,height:r.height}}));return t[0].width>=t[0].height?t.sort(((e,t)=>t.width-e.width)):t.sort(((e,t)=>t.height-e.height)),t})(e.sizes);var r;t.setAttributes({mediaUrl:e.url,mediaId:e.id,mediaAlt:e.alt,mediaMime:e.mime,mediaWidth:e.width,mediaHeight:e.height,mediaSrcSet:(r=a,r.slice(0).reverse().map(((e,t)=>{let a=e.width;return`${e.url} ${a}w`})).join(", ")),mediaSrcSizes:g(a)})};var k=e=>{const{attributes:{lazyLoad:t},setAttributes:a}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(d.PanelRow,{className:"image-block-buttons__lazy-load"},(0,l.createElement)(d.ToggleControl,{label:(0,r.__)("Lazy Load","kotisivu-theme-blocks"),checked:t,onChange:()=>a({lazyLoad:!t})})))},b=e=>{const{attributes:{mediaId:t}}=e;return(0,l.createElement)("div",{className:"image-block-buttons"},(0,l.createElement)("div",{className:"image-block-buttons__update"},(0,l.createElement)(o.MediaUploadCheck,null,(0,l.createElement)(o.MediaUpload,{onSelect:t=>p(t,e),allowedTypes:"image",value:t,render:e=>{let{open:t}=e;return(0,l.createElement)(d.Button,{onClick:t,isDefault:!0,isLarge:!0},(0,r.__)("Change image","kotisivu-block-theme"))}})),(0,l.createElement)(o.MediaUploadCheck,null,(0,l.createElement)(d.Button,{onClick:h(e),isLink:!0,isDestructive:!0},(0,r.__)("Remove image","kotisivu-block-theme")))),(0,l.createElement)(k,e))};const f=e=>e.replace(/\s+/g," ").trim(),v=(e,t,a,r,i,l)=>n=>{let o=l.split(" ");e.setAttributes({[t]:!a}),a?o=o.filter((e=>e!=r)):o.push(r),e.setAttributes({[i]:f(o.join(" "))})};var E=e=>{const{attributes:{isFullWidth:t,className:a}}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(d.PanelRow,null,(0,l.createElement)(d.ToggleControl,{label:(0,r.__)("Full Width","kotisivu-theme-blocks"),checked:t,onChange:v(e,"isFullWidth",t,"is-full-width","className",a)})))},w=e=>{const{attributes:{mediaId:t}}=e;return(0,l.createElement)("div",{className:"editor-post-featured-image"},(0,l.createElement)(o.MediaUploadCheck,null,(0,l.createElement)(o.MediaUpload,{onSelect:t=>p(t,e),allowedTypes:"image",value:t,render:t=>{let{open:a}=t;return((e,t)=>{const{attributes:{className:a,mediaUrl:i,mediaAlt:n,mediaMime:o}}=e;return i?"image/svg+xml"==o?(0,l.createElement)("img",{className:a,src:i,alt:n}):(0,l.createElement)(m,e):(0,l.createElement)(l.Fragment,null,(0,l.createElement)("div",{className:"button-container"},(0,l.createElement)(d.Button,{onClick:t,className:"button button-large"},(0,r.__)("Pick a image","kotisivu-block-theme")),(0,l.createElement)("img",{class:"image-placeholder",src:u})))})(e,a)}})))};const y=e=>{const{attributes:{mediaUrl:t}}=e;return(0,l.createElement)(d.PanelBody,{title:(0,r.__)("Select background image","kotisivu-block-theme"),initialOpen:!0},(0,l.createElement)(w,e),t&&(0,l.createElement)(b,e),(0,l.createElement)(E,e),(0,l.createElement)(k,e))};d.ColorPalette;const _=e=>{const{attributes:{modifiers:t,hasBackgroundImage:a}}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(d.PanelRow,null,(0,l.createElement)(d.ToggleControl,{label:(0,r.__)("Use Background Image","kotisivu-theme-blocks"),checked:a,onChange:v(e,"hasBackgroundImage",a,"has-image","modifiers",t)})))};var B=e=>{const{attributes:{hasBackgroundImage:t}}=e;return(0,l.createElement)(o.InspectorControls,null,(0,l.createElement)(d.PanelBody,{title:(0,r.__)("Hero Settings","kotisivu-block-theme"),initialOpen:!0},(0,l.createElement)(_,e)),t&&(0,l.createElement)(y,e))},N=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/hero","title":"Hero","category":"theme","icon":"cover-image","description":"Hero block","keywords":["section, container, hero"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/hero.js","editorStyle":"file:../../../../build/hero.css","style":"file:../../../../build/style-hero.css","attributes":{"heroClass":{"type":"string","default":"hero"},"modifiers":{"type":"string","default":""},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"hasBackgroundImage":{"type":"boolean"},"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaWidth":{"type":"number","default":""},"mediaHeight":{"type":"number","default":""},"mediaMime":{"type":"string","default":""},"mediaSrcSet":{"type":"string","default":""},"mediaSrcSizes":{"type":"string","default":""},"lazyLoad":{"type":"boolean","default":true},"align":{"type":"string","default":"full"}}}');const{apiVersion:S,name:C,title:z,category:x,icon:I,description:$,keywords:A,textdomain:O,supports:U}=N,P={apiVersion:S,title:(0,r.__)(z,"kotisivu-block-theme"),description:(0,r.__)($,"kotisivu-block-theme"),category:x,icon:I,supports:U,keywords:A,textdomain:O,edit:e=>{const{attributes:{modifiers:t,hasBackgroundImage:a,heroClass:r},clientId:i}=e,s=[["ksd/image-optimized"]["core/heading"]],c=(0,o.useBlockProps)({className:f(`${r} ${t}`)}),{hasChildBlocks:d}=(0,n.useSelect)((e=>{const{getBlockOrder:t}=e(o.store);return{hasChildBlocks:t(i).length>0}}),[i]),u=(0,o.useInnerBlocksProps)({...c},{template:[["ksd/image-optimized",{className:"hero__logo"}],["core/heading",{level:1,className:"hero__heading"}],["ksd/image-optimized",{className:"hero__decorative-image"}],["ksd/image-optimized",{className:"hero__decorative-image--arch"}]],templateLock:"all",allowedBlocks:s,renderAppender:d?void 0:o.InnerBlocks.ButtonBlockAppender});return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(B,e),(0,l.createElement)("section",c,(0,l.createElement)("div",{className:"hero__container"},u.children),a&&(0,l.createElement)(m,e)))},save:e=>{const{attributes:{hasBackgroundImage:t,modifiers:a,heroClass:r}}=e,i=o.useBlockProps.save({className:f(`${r} ${a}`)});return(0,l.createElement)("section",i,(0,l.createElement)("div",{className:"hero__container"},(0,l.createElement)(o.InnerBlocks.Content,null)),t&&(0,l.createElement)(m,e))},getEditWrapperProps(){return{"data-align":"full"}}};(0,i.registerBlockType)(C,P)}},a={};function r(e){var i=a[e];if(void 0!==i)return i.exports;var l=a[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=function(t,a,i,l){if(!a){var n=1/0;for(m=0;m<e.length;m++){a=e[m][0],i=e[m][1],l=e[m][2];for(var o=!0,s=0;s<a.length;s++)(!1&l||n>=l)&&Object.keys(r.O).every((function(e){return r.O[e](a[s])}))?a.splice(s--,1):(o=!1,l<n&&(n=l));if(o){e.splice(m--,1);var c=i();void 0!==c&&(t=c)}}return t}l=l||0;for(var m=e.length;m>0&&e[m-1][2]>l;m--)e[m]=e[m-1];e[m]=[a,i,l]},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var a=t.getElementsByTagName("script");a.length&&(e=a[a.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e}(),function(){var e={279:0,844:0};r.O.j=function(t){return 0===e[t]};var t=function(t,a){var i,l,n=a[0],o=a[1],s=a[2],c=0;if(n.some((function(t){return 0!==e[t]}))){for(i in o)r.o(o,i)&&(r.m[i]=o[i]);if(s)var m=s(r)}for(t&&t(a);c<n.length;c++)l=n[c],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(m)},a=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var i=r.O(void 0,[844],(function(){return r(648)}));i=r.O(i)}();