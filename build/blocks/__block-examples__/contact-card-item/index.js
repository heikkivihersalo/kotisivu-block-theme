(()=>{"use strict";var e,t={5808:()=>{const e=window.wp.i18n,t=window.wp.blocks,s=window.React,r=window.wp.blockEditor,o=(window.wp.components,window.wp.data),l=({children:e,blockWrapper:t,classes:r,styles:o})=>{const l=()=>(0,s.createElement)("div",{className:r,style:o},e);if(!t)return l;switch(t){case"div":return(0,s.createElement)("div",{className:r,style:o},e);case"li":return(0,s.createElement)("li",{className:r,style:o},e);default:return l}},a=JSON.parse('{"apiVersion":3,"name":"ksd/contact-card-item","title":"Contact Card Item","category":"containers","icon":"layout","description":"","keywords":["contact","card","item"],"textdomain":"kotisivu-block-theme","supports":{"className":false,"html":false,"spacing":{"margin":["top","bottom"],"padding":true}}}'),{apiVersion:c,name:n,title:i,category:p,icon:d,description:k,keywords:m,textdomain:u,supports:h}=a,b={apiVersion:c,title:(0,e.__)(i,"kotisivu-block-theme"),description:(0,e.__)(k,"kotisivu-block-theme"),category:p,icon:d,supports:h,keywords:m,textdomain:u,edit:e=>{const{attributes:{blockClass:t,blockWrapper:a,template:c,templateLock:n},clientId:i}=e,p=(({clientId:e,template:t,templateLock:s,allowedBlocks:l,blockProps:a})=>{const{hasChildBlocks:c}=(0,o.useSelect)((t=>{const{getBlockOrder:s}=t(r.store);return{hasChildBlocks:s(e).length>0}}),[e]);return(0,r.useInnerBlocksProps)({...a},{template:t,templateLock:s,allowedBlocks:l,renderAppender:c?void 0:r.InnerBlocks.ButtonBlockAppender})})({clientId:i,template:c,templateLock:n,blockProps:(0,r.useBlockProps)({className:t})});let d={children:p.children,blockWrapper:a,classes:p.className,styles:p.style};return(0,s.createElement)(s.Fragment,null,(0,s.createElement)(l,{...d}))},save:e=>{const{attributes:{blockClass:t,blockWrapper:o}}=e,a=r.useInnerBlocksProps.save(r.useBlockProps.save({className:t}));let c={children:a.children,blockWrapper:o,classes:a.className,styles:a.style};return(0,s.createElement)(l,{...c})},getEditWrapperProps:()=>({"data-align":"full"})};(0,t.registerBlockType)(n,b)}},s={};function r(e){var o=s[e];if(void 0!==o)return o.exports;var l=s[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=(t,s,o,l)=>{if(!s){var a=1/0;for(p=0;p<e.length;p++){for(var[s,o,l]=e[p],c=!0,n=0;n<s.length;n++)(!1&l||a>=l)&&Object.keys(r.O).every((e=>r.O[e](s[n])))?s.splice(n--,1):(c=!1,l<a&&(a=l));if(c){e.splice(p--,1);var i=o();void 0!==i&&(t=i)}}return t}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[s,o,l]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={8988:0,5772:0};r.O.j=t=>0===e[t];var t=(t,s)=>{var o,l,[a,c,n]=s,i=0;if(a.some((t=>0!==e[t]))){for(o in c)r.o(c,o)&&(r.m[o]=c[o]);if(n)var p=n(r)}for(t&&t(s);i<a.length;i++)l=a[i],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(p)},s=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var o=r.O(void 0,[5772],(()=>r(5808)));o=r.O(o)})();