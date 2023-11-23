!function(){"use strict";var e={n:function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,{a:a}),a},d:function(t,a){for(var i in a)e.o(a,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:a[i]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.i18n,a=window.wp.blocks,i=window.wp.domReady,s=e.n(i),r=window.wp.element,l=window.wp.blockEditor,o=window.wp.components;const m=["image"];var n=({mediaIDs:e,props:t})=>(0,r.createElement)(l.MediaUploadCheck,null,(0,r.createElement)(l.MediaUpload,{onSelect:e=>{t.setAttributes({images:e.map((e=>({mediaID:e.id,mediaURL:e.url,mediaALT:e.alt,mediaMime:e.mime,mediaWidth:`${e.sizes.full.width}px`,mediaHeight:`${e.sizes.full.height}px`,lazyLoad:"lazy"})))})},allowedTypes:m,value:e,render:({open:t})=>(0,r.createElement)(o.Button,{onClick:t,className:"button button-large"},e.length<1?"Upload/Select Images":"Edit"),gallery:!0,multiple:!0}));var d=({image:e,imageClass:t})=>(0,r.createElement)("img",{"data-id":e.mediaID,loading:e.lazyLoad,className:t,src:e.mediaURL,alt:e.mediaALT,width:e.mediaWidth,height:e.mediaHeight,type:e.mediaMime});var c=e=>{const{attributes:{images:a}}=e,i=(0,l.useBlockProps)({className:"image-gallery"});return(0,r.createElement)("div",{className:"image-gallery__editor-wrapper"},a.length>=1?(0,r.createElement)("div",{...i},a.map((e=>(0,r.createElement)(d,{key:e.mediaID,image:e,imageClass:"image-gallery__item"})))):(0,r.createElement)("div",{className:"image-gallery__help-text"},(0,t.__)("Selected images will be shown here","kotisivu-block-theme")),(0,r.createElement)(n,{mediaIDs:a.map((e=>e.mediaID)),props:e}))};var g=e=>{const{attributes:{images:t}}=e,a=l.useBlockProps.save({className:"image-gallery"});return(0,r.createElement)("div",{...a},t.map((e=>(0,r.createElement)(d,{key:e.mediaID,image:e,imageClass:"image-gallery__item"}))))},u=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/image-gallery","title":"Image Gallery","category":"media","icon":"images-alt","description":"Optimized simple image gallery","keywords":["image","gallery"],"textdomain":"kotisivu-theme-blocks","supports":{"className":false},"editorScript":"file:../../../../assets/js/blocks/image-gallery.js","editorStyle":"file:../../../../assets/css/blocks/image-gallery.css","style":"file:../../../../assets/css/blocks/style-image-gallery.css","attributes":{"images":{"type":"array","source":"query","selector":"img","default":[],"query":{"mediaID":{"type":"number","source":"attribute","attribute":"data-id"},"mediaURL":{"type":"string","source":"attribute","attribute":"src"},"mediaALT":{"type":"string","source":"attribute","attribute":"alt"},"mediaWidth":{"type":"string","source":"attribute","attribute":"width"},"mediaHeight":{"type":"string","source":"attribute","attribute":"height"},"mediaMime":{"type":"string","source":"attribute","attribute":"type"},"lazyLoad":{"type":"string","source":"attribute","attribute":"loading"}}}}}');const{apiVersion:p,name:y,title:b,category:h,icon:w,description:k,keywords:v,textdomain:_,supports:f}=u,E={apiVersion:p,title:(0,t.__)(b,"kotisivu-block-theme"),description:(0,t.__)(k,"kotisivu-block-theme"),category:h,icon:w,supports:f,keywords:v,textdomain:_,edit:c,save:g};(0,a.registerBlockType)(y,E),s()((function(){(0,a.registerBlockStyle)(y,{name:"image-gallery-client",label:(0,t.__)("Client","kotisivu-block-theme")})}))}();