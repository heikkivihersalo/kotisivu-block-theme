!function(){"use strict";var e=window.wp.i18n,t=window.wp.blocks,s=window.wp.element,l=window.wp.blockEditor;window.wp.components;var a=window.wp.data;const c=({children:e,blockWrapper:t,classes:l,styles:a})=>{const c=()=>(0,s.createElement)("div",{className:l,style:a},e);if(!t)return c;switch(t){case"div":return(0,s.createElement)("div",{className:l,style:a},e);case"li":return(0,s.createElement)("li",{className:l,style:a},e);default:return c}};var o=e=>{const{attributes:{blockClass:t,blockWrapper:o,template:r,templateLock:n},clientId:i}=e,p=(({clientId:e,template:t,templateLock:s,allowedBlocks:c,blockProps:o})=>{const{hasChildBlocks:r}=(0,a.useSelect)((t=>{const{getBlockOrder:s}=t(l.store);return{hasChildBlocks:s(e).length>0}}),[e]);return(0,l.useInnerBlocksProps)({...o},{template:t,templateLock:s,allowedBlocks:c,renderAppender:r?void 0:l.InnerBlocks.ButtonBlockAppender})})({clientId:i,template:r,templateLock:n,blockProps:(0,l.useBlockProps)({className:t})});let d={children:p.children,blockWrapper:o,classes:p.className,styles:p.style};return(0,s.createElement)(s.Fragment,null,(0,s.createElement)(c,{...d}))};var r=e=>{const{attributes:{blockClass:t,blockWrapper:a}}=e,o=l.useInnerBlocksProps.save(l.useBlockProps.save({className:t}));let r={children:o.children,blockWrapper:a,classes:o.className,styles:o.style};return(0,s.createElement)(c,{...r})},n=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":3,"name":"ksd/contact-card-item","title":"Contact Card Item","category":"containers","icon":"layout","description":"","keywords":["contact","card","item"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"html":false,"spacing":{"margin":["top","bottom"],"padding":true}},"parent":["ksd/contact-card"],"editorScript":"file:../../../../assets/js/blocks/contact-card-item.js","editorStyle":"file:../../../../assets/css/blocks/contact-card-item.css","style":"file:../../../../assets/css/blocks/style-contact-list-item.css","attributes":{"style":{"type":"object"},"blockClass":{"type":"string","default":"contact-card-item"},"blockWrapper":{"type":"string"},"template":{"type":"array","default":[]},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]}}}');const{apiVersion:i,name:p,title:d,category:m,icon:k,description:u,keywords:y,textdomain:b,supports:w}=n,h={apiVersion:i,title:(0,e.__)(d,"kotisivu-block-theme"),description:(0,e.__)(u,"kotisivu-block-theme"),category:m,icon:k,supports:w,keywords:y,textdomain:b,edit:o,save:r,getEditWrapperProps(){return{"data-align":"full"}}};(0,t.registerBlockType)(p,h)}();