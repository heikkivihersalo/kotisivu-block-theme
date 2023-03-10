(()=>{"use strict";var e,t={79:()=>{const e=window.wp.i18n,t=window.wp.blocks,i=window.wp.element,a=window.wp.blockEditor,l=window.wp.components,r=t=>{const{attributes:{sectionHeading:r},setAttributes:s}=t;return(0,i.createElement)(a.InspectorControls,null,(0,i.createElement)(l.PanelBody,{title:(0,e.__)("Image Gallery Settings","kotisivu-block-theme"),initialOpen:!0},(0,i.createElement)(l.TextControl,{label:(0,e.__)("Section Heading","kotisivu-block-theme"),help:(0,e.__)("Add some descriptive information (ex. title or heading) for assistive technologies","kotisivu-block-theme"),onChange:e=>s({sectionHeading:e}),value:r})))},s=["image"],o=e=>{let{mediaIDs:t,props:r}=e;return(0,i.createElement)(a.MediaUploadCheck,null,(0,i.createElement)(a.MediaUpload,{onSelect:e=>{r.setAttributes({images:e.map((e=>({mediaID:e.id,mediaURL:e.url,mediaALT:e.alt,mediaMime:e.mime,mediaWidth:`${e.sizes.full.width}px`,mediaHeight:`${e.sizes.full.height}px`,lazyLoad:"lazy"})))})},allowedTypes:s,value:t,render:e=>{let{open:a}=e;return(0,i.createElement)(l.Button,{onClick:a,className:"button button-large"},t.length<1?"Upload/Select Images":"Edit")},gallery:!0,multiple:!0}))},n=e=>{let{image:t,imageClass:a}=e;return(0,i.createElement)("img",{"data-id":t.mediaID,loading:t.lazyLoad,className:a,src:t.mediaURL,alt:t.mediaAlt,width:t.mediaWidth,height:t.mediaHeight,type:t.mediaMime})},m=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/image-gallery","title":"Optimized Image Gallery","category":"media","icon":"format-gallery","description":"Optimized simple image gallery","keywords":["image","gallery"],"textdomain":"kotisivu-theme-blocks","supports":{"className":false},"editorScript":"file:../../../../build/blocks/image-gallery.js","editorStyle":"file:../../../../build/blocks/image-gallery.css","style":"file:../../../../build/blocks/style-image-gallery.css","attributes":{"sectionHeading":{"type":"string","default":""},"images":{"type":"array","source":"query","selector":"img","default":[],"query":{"mediaID":{"type":"number","source":"attribute","attribute":"data-id"},"mediaURL":{"type":"string","source":"attribute","attribute":"src"},"mediaALT":{"type":"string","source":"attribute","attribute":"alt"},"mediaWidth":{"type":"string","source":"attribute","attribute":"width"},"mediaHeight":{"type":"string","source":"attribute","attribute":"height"},"mediaMime":{"type":"string","source":"attribute","attribute":"type"},"lazyLoad":{"type":"string","source":"attribute","attribute":"loading"}}}}}'),{apiVersion:c,name:d,title:g,category:u,icon:p,description:b,keywords:y,textdomain:h,supports:k}=m,v={apiVersion:c,title:(0,e.__)(g,"kotisivu-block-theme"),description:(0,e.__)(b,"kotisivu-block-theme"),category:u,icon:p,supports:k,keywords:y,textdomain:h,edit:t=>{const{attributes:{images:l,sectionHeading:s}}=t,m=(0,a.useBlockProps)({className:"image-gallery"});return(0,i.createElement)(i.Fragment,null,(0,i.createElement)(r,t),(0,i.createElement)("section",m,(0,i.createElement)("h2",{className:"accessible-hidden"},s),l.length>=1?(0,i.createElement)("div",{className:"image-gallery__container"},l.map((e=>(0,i.createElement)(n,{key:e.mediaID,image:e,imageClass:"image-gallery__item"})))):(0,i.createElement)("div",{className:"image-gallery__help-text"},(0,e.__)("Selected images will be shown here","kotisivu-block-theme")),(0,i.createElement)(o,{mediaIDs:l.map((e=>e.mediaID)),props:t})))},save:e=>{console.log(e);const{attributes:{images:t,sectionHeading:l}}=e,r=a.useBlockProps.save({className:"image-gallery"});return(0,i.createElement)("section",r,(0,i.createElement)("h2",{className:"accessible-hidden"},l),(0,i.createElement)("div",{className:"image-gallery__container"},t.map((e=>(0,i.createElement)(n,{key:e.mediaID,image:e,imageClass:"image-gallery-item"})))))}};(0,t.registerBlockType)(d,v)}},i={};function a(e){var l=i[e];if(void 0!==l)return l.exports;var r=i[e]={exports:{}};return t[e](r,r.exports,a),r.exports}a.m=t,e=[],a.O=(t,i,l,r)=>{if(!i){var s=1/0;for(c=0;c<e.length;c++){for(var[i,l,r]=e[c],o=!0,n=0;n<i.length;n++)(!1&r||s>=r)&&Object.keys(a.O).every((e=>a.O[e](i[n])))?i.splice(n--,1):(o=!1,r<s&&(s=r));if(o){e.splice(c--,1);var m=l();void 0!==m&&(t=m)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[i,l,r]},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={124:0,495:0};a.O.j=t=>0===e[t];var t=(t,i)=>{var l,r,[s,o,n]=i,m=0;if(s.some((t=>0!==e[t]))){for(l in o)a.o(o,l)&&(a.m[l]=o[l]);if(n)var c=n(a)}for(t&&t(i);m<s.length;m++)r=s[m],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(c)},i=globalThis.webpackChunkksd_custom_blocks=globalThis.webpackChunkksd_custom_blocks||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var l=a.O(void 0,[495],(()=>a(79)));l=a.O(l)})();