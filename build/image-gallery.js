!function(){"use strict";var e,t={79:function(){var e=window.wp.i18n,t=window.wp.blocks,i=window.wp.element,a=window.wp.blockEditor,r=window.wp.components,l=t=>{const{attributes:{sectionHeading:l},setAttributes:s}=t;return(0,i.createElement)(a.InspectorControls,null,(0,i.createElement)(r.PanelBody,{title:(0,e.__)("Image Gallery Settings","kotisivu-block-theme"),initialOpen:!0},(0,i.createElement)(r.TextControl,{label:(0,e.__)("Section Heading","kotisivu-block-theme"),help:(0,e.__)("Add some descriptive information (ex. title or heading) for assistive technologies","kotisivu-block-theme"),onChange:e=>s({sectionHeading:e}),value:l})))};const s=["image"];var n=e=>{let{mediaIDs:t,props:l}=e;return(0,i.createElement)(a.MediaUploadCheck,null,(0,i.createElement)(a.MediaUpload,{onSelect:e=>{l.setAttributes({images:e.map((e=>({mediaID:e.id,mediaURL:e.url,mediaALT:e.alt,mediaMime:e.mime,mediaWidth:`${e.sizes.full.width}px`,mediaHeight:`${e.sizes.full.height}px`,lazyLoad:"lazy"})))})},allowedTypes:s,value:t,render:e=>{let{open:a}=e;return(0,i.createElement)(r.Button,{onClick:a,className:"button button-large"},t.length<1?"Upload/Select Images":"Edit")},gallery:!0,multiple:!0}))},o=e=>{let{image:t,imageClass:a}=e;return(0,i.createElement)("img",{"data-id":t.mediaID,loading:t.lazyLoad,className:a,src:t.mediaURL,alt:t.mediaAlt,width:t.mediaWidth,height:t.mediaHeight,type:t.mediaMime})},m=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/image-gallery","title":"Optimized Image Gallery","category":"media","icon":"format-gallery","description":"Optimized simple image gallery","keywords":["image","gallery"],"textdomain":"kotisivu-theme-blocks","supports":{"className":false},"editorScript":"file:../../../../build/image-gallery.js","editorStyle":"file:../../../../build/image-gallery.css","style":"file:../../../../build/style-image-gallery.css","attributes":{"sectionHeading":{"type":"string","default":""},"images":{"type":"array","source":"query","selector":"img","default":[],"query":{"mediaID":{"type":"number","source":"attribute","attribute":"data-id"},"mediaURL":{"type":"string","source":"attribute","attribute":"src"},"mediaALT":{"type":"string","source":"attribute","attribute":"alt"},"mediaWidth":{"type":"string","source":"attribute","attribute":"width"},"mediaHeight":{"type":"string","source":"attribute","attribute":"height"},"mediaMime":{"type":"string","source":"attribute","attribute":"type"},"lazyLoad":{"type":"string","source":"attribute","attribute":"loading"}}}}}');const{apiVersion:c,name:d,title:u,category:g,icon:p,description:y,keywords:b,textdomain:h,supports:k}=m,f={apiVersion:c,title:(0,e.__)(u,"kotisivu-block-theme"),description:(0,e.__)(y,"kotisivu-block-theme"),category:g,icon:p,supports:k,keywords:b,textdomain:h,edit:t=>{const{attributes:{images:r,sectionHeading:s}}=t,m=(0,a.useBlockProps)({className:"image-gallery"});return(0,i.createElement)(i.Fragment,null,(0,i.createElement)(l,t),(0,i.createElement)("section",m,(0,i.createElement)("h2",{className:"accessible-hidden"},s),r.length>=1?(0,i.createElement)("div",{className:"image-gallery__container"},r.map((e=>(0,i.createElement)(o,{key:e.mediaID,image:e,imageClass:"image-gallery__item"})))):(0,i.createElement)("div",{className:"image-gallery__help-text"},(0,e.__)("Selected images will be shown here","kotisivu-block-theme")),(0,i.createElement)(n,{mediaIDs:r.map((e=>e.mediaID)),props:t})))},save:e=>{console.log(e);const{attributes:{images:t,sectionHeading:r}}=e,l=a.useBlockProps.save({className:"image-gallery"});return(0,i.createElement)("section",l,(0,i.createElement)("h2",{className:"accessible-hidden"},r),(0,i.createElement)("div",{className:"image-gallery__container"},t.map((e=>(0,i.createElement)(o,{key:e.mediaID,image:e,imageClass:"image-gallery-item"})))))}};(0,t.registerBlockType)(d,f)}},i={};function a(e){var r=i[e];if(void 0!==r)return r.exports;var l=i[e]={exports:{}};return t[e](l,l.exports,a),l.exports}a.m=t,e=[],a.O=function(t,i,r,l){if(!i){var s=1/0;for(c=0;c<e.length;c++){i=e[c][0],r=e[c][1],l=e[c][2];for(var n=!0,o=0;o<i.length;o++)(!1&l||s>=l)&&Object.keys(a.O).every((function(e){return a.O[e](i[o])}))?i.splice(o--,1):(n=!1,l<s&&(s=l));if(n){e.splice(c--,1);var m=r();void 0!==m&&(t=m)}}return t}l=l||0;for(var c=e.length;c>0&&e[c-1][2]>l;c--)e[c]=e[c-1];e[c]=[i,r,l]},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={124:0,852:0};a.O.j=function(t){return 0===e[t]};var t=function(t,i){var r,l,s=i[0],n=i[1],o=i[2],m=0;if(s.some((function(t){return 0!==e[t]}))){for(r in n)a.o(n,r)&&(a.m[r]=n[r]);if(o)var c=o(a)}for(t&&t(i);m<s.length;m++)l=s[m],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(c)},i=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var r=a.O(void 0,[852],(function(){return a(79)}));r=a.O(r)}();