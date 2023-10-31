!function(){"use strict";var t=window.wp.i18n,e=window.wp.blocks;var o=[{name:"contact-info-list-default",title:(0,t.__)("Contact Info | Default","kotisivu-theme-blocks"),icon:"button",scope:"block",innerBlocks:[["ksd/contact-info-list-item",{type:"email",content:"email@address.com"}],["ksd/contact-info-list-item",{type:"phone",content:"045 123 1234"}]],attributes:{blockClass:"contact-list",templateLock:"all"}}],s=window.wp.element,a=window.wp.blockEditor;window.wp.components;var l=window.wp.data;var i=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":3,"name":"ksd/contact-info-list","title":"Contact Info List","category":"design","icon":"layout","description":"","keywords":["contact","list"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"html":true,"spacing":{"margin":["top","bottom"],"padding":true}},"parent":["ksd/contact-card"],"editorScript":"file:../../../../assets/js/blocks/contact-info-list.js","editorStyle":"file:../../../../assets/css/blocks/contact-info-list.css","style":"file:../../../../assets/css/blocks/style-contact-info-list.css","attributes":{"style":{"type":"object"},"blockClass":{"type":"string","default":""},"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"variationName":{"type":"string","default":""}}}');const n=({setAttributes:e,blockVariations:o})=>{if(!o)return null;return(0,s.createElement)(s.Fragment,null,(0,s.createElement)(a.__experimentalBlockVariationPicker,{label:(0,t.__)("Choose variation","kotisivu-block-theme"),instructions:(0,t.__)("Select a block variation to start with.","kotisivu-block-theme"),onSelect:t=>{e((t=>({variationName:t?.name,template:t?.innerBlocks,childTemplate:t.attributes?.childTemplate,blockClass:t.attributes?.blockClass,style:t.attributes?.style}))(t))},variations:o}))};var c=t=>{const{attributes:{variationName:o,blockClass:c,template:r,templateLock:p},clientId:k,setAttributes:m}=t,u=(({clientId:t,template:e,templateLock:o,allowedBlocks:s,blockProps:i})=>{const{hasChildBlocks:n}=(0,l.useSelect)((e=>{const{getBlockOrder:o}=e(a.store);return{hasChildBlocks:o(t).length>0}}),[t]);return(0,a.useInnerBlocksProps)({...i},{template:e,templateLock:o,allowedBlocks:s,renderAppender:n?void 0:a.InnerBlocks.ButtonBlockAppender})})({clientId:k,template:r,templateLock:p,blockProps:(0,a.useBlockProps)({className:c})}),d=(b=i.name,(0,l.useSelect)((t=>{const{getBlockVariations:o}=t(e.store);return o(b,"block")}),[b]));var b;return o?(0,s.createElement)(s.Fragment,null,(0,s.createElement)("ul",{...u})):(0,s.createElement)(n,{setAttributes:m,blockVariations:d})};var r=t=>{const e=a.useInnerBlocksProps.save(a.useBlockProps.save({className:t.attributes?.blockClass}));return(0,s.createElement)("ul",{...e})};const{apiVersion:p,name:k,title:m,category:u,icon:d,description:b,keywords:w,textdomain:v,supports:y}=i,f={apiVersion:p,title:(0,t.__)(m,"kotisivu-block-theme"),description:(0,t.__)(b,"kotisivu-block-theme"),category:u,icon:d,supports:y,keywords:w,textdomain:v,variations:o,edit:c,save:r,getEditWrapperProps(){return{"data-align":"full"}}};(0,e.registerBlockType)(k,f)}();