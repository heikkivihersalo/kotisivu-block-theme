!function(){"use strict";var e,t={119:function(){var e=window.wp.i18n,t=window.wp.blocks,r=window.wp.element,n=window.wp.blockEditor,o=window.wp.components;const l=e=>e.replace(/\s+/g," ").trim(),a=(e,t,r,n,o,a)=>s=>{let i=a.split(" ");e.setAttributes({[t]:!r}),r?i=i.filter((e=>e!=n)):i.push(n),e.setAttributes({[o]:l(i.join(" "))})},s=t=>{const{attributes:{modifiers:n,isReversed:l}}=t;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(o.PanelRow,null,(0,r.createElement)(o.ToggleControl,{label:(0,e.__)("Reverse Block Alignment","kotisivu-block-theme"),checked:l,onChange:a(t,"isReversed",l,"is-reversed","modifiers",n)})))},i=t=>{const{attributes:{modifiers:n,backgroundColor:l,hasBackgroundColor:s},setAttributes:i}=t;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(o.PanelRow,null,(0,r.createElement)("div",{class:"editor__background-color-selector"},(0,r.createElement)(o.ToggleControl,{label:(0,e.__)("Use Background Color","kotisivu-block-theme"),checked:s,onChange:a(t,"hasBackgroundColor",s,"has-bg-color","modifiers",n)}),s&&(0,r.createElement)(o.ColorPalette,{colors:[{name:"primary-light",color:"var(--wp--preset--color--primary-light)"},{name:"primary",color:"var(--wp--preset--color--primary)"},{name:"primary-dark",color:"var(--wp--preset--color--primary-dark)"},{name:"secondary",color:"var(--wp--preset--color--secondary)"},{name:"background",color:"var(--wp--preset--color--background)"},{name:"foreground",color:"var(--wp--preset--color--foreground)"},{name:"grey-light",color:"var(--wp--preset--color--grey-light)"},{name:"grey",color:"var(--wp--preset--color--grey)"},{name:"grey-dark",color:"var(--wp--preset--color--grey-dark)"}],value:l,onChange:e=>{i({backgroundColor:e})}}))))};o.ColorPalette;const c=t=>{const{attributes:{htmlContainer:n},setAttributes:l}=t;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(o.SelectControl,{label:(0,e.__)("Container Semantics","kotisivu-block-theme"),value:n,onChange:e=>{l({htmlContainer:e})},options:[{value:null,label:"Select element",disabled:!0},{value:"div",label:"div"},{value:"section",label:"section"},{value:"article",label:"article"},{value:"aside",label:"aside"},{value:"main",label:"main"}]}))};window.wp.data;const u=t=>{const{attributes:{sectionId:n,sectionName:l},setAttributes:a}=t;return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(o.TextControl,{label:(0,e.__)("Name","kotisivu-block-theme"),placeholder:(0,e.__)("Sets name to an element. Can be used to differentiate sections on a page (ex. with css ids and class selectors)","kotisivu-block-theme"),onChange:e=>a({sectionName:e}),value:l}),(0,r.createElement)(o.TextControl,{label:(0,e.__)("ID","kotisivu-block-theme"),placeholder:(0,e.__)("Sets ID value to an element. Can be used to differentiate sections on a page (ex. with css ids and class selectors)","kotisivu-block-theme"),onChange:e=>a({sectionId:e}),value:n}))};var m=t=>(0,r.createElement)(n.InspectorControls,null,(0,r.createElement)(o.PanelBody,{title:(0,e.__)("Settings","kotisivu-block-theme"),initialOpen:!0},(0,r.createElement)(s,t),(0,r.createElement)(i,t),(0,r.createElement)(c,t),(0,r.createElement)(u,t)));const d=e=>{const{children:t,attributes:{sectionId:n,sectionContainer:o},classes:l,styles:a}=e,s=()=>(0,r.createElement)("div",{id:n||null,className:l,style:a},t);if(!o)return s;switch(o){case"div":return(0,r.createElement)("div",{id:n||null,className:l,style:a},t);case"section":return(0,r.createElement)("section",{id:n||null,className:l,style:a},t);case"article":return(0,r.createElement)("article",{id:n||null,className:l,style:a},t);case"aside":return(0,r.createElement)("aside",{id:n||null,className:l,style:a},t);case"main":return(0,r.createElement)("main",{id:n||null,className:l,style:a},t);default:return s}};var p=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/container-50-50","title":"Container 50|50","category":"design","icon":"columns","description":"Container for two column sections","keywords":["container, columns, column, 50-50"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/container-50-50.js","editorStyle":"file:../../../../build/container-50-50.css","style":"file:../../../../build/style-container-50-50.css","attributes":{"sectionId":{"type":"string","default":""},"sectionName":{"type":"string","default":""},"sectionContainer":{"type":"string","default":"div"},"modifiers":{"type":"string","default":""},"isReversed":{"type":"boolean"},"hasBackgroundColor":{"type":"boolean","default":false},"backgroundColor":{"type":"string"},"template":{"type":"array","default":[["ksd/inner-column",{"className":"inner-column","templateLock":false}],["ksd/inner-column",{"className":"inner-column","templateLock":false}]]},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false],"default":true},"align":{"type":"string","default":"full"}}}');const{apiVersion:k,name:b,title:g,category:v,icon:f,description:h,keywords:y,textdomain:w,supports:C}=p,E={apiVersion:k,title:(0,e.__)(g,"kotisivu-block-theme"),description:(0,e.__)(h,"kotisivu-block-theme"),category:v,icon:f,supports:C,keywords:y,textdomain:w,edit:e=>{const{children:t,attributes:o,attributes:{sectionName:a,template:s,templateLock:i,modifiers:c,backgroundColor:u}}=e,p=(0,n.useBlockProps)({className:l(`container-50-50 ${a} ${c}`).toLowerCase(),style:{backgroundColor:u}});return(0,r.createElement)("div",p,(0,r.createElement)(m,e),(0,r.createElement)(d,{children:t,attributes:o,classes:p.className,styles:p.style},(0,r.createElement)(n.InnerBlocks,{allowedBlocks:["ksd/inner-column"],template:s,templateLock:i})))},save:e=>{const{children:t,attributes:o,attributes:{sectionName:a,modifiers:s,backgroundColor:i}}=e,c=n.useBlockProps.save({className:l(`container-50-50 ${a} ${s}`).toLowerCase(),style:{backgroundColor:i}});return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(d,{children:t,attributes:o,classes:c.className,styles:c.style},(0,r.createElement)(n.InnerBlocks.Content,c)))},getEditWrapperProps(){return{"data-align":"full"}}};(0,t.registerBlockType)(b,E)}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var l=r[e]={exports:{}};return t[e](l,l.exports,n),l.exports}n.m=t,e=[],n.O=function(t,r,o,l){if(!r){var a=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],l=e[u][2];for(var s=!0,i=0;i<r.length;i++)(!1&l||a>=l)&&Object.keys(n.O).every((function(e){return n.O[e](r[i])}))?r.splice(i--,1):(s=!1,l<a&&(a=l));if(s){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[r,o,l]},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={44:0,586:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,l,a=r[0],s=r[1],i=r[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(i)var u=i(n)}for(t&&t(r);c<a.length;c++)l=a[c],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(u)},r=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var o=n.O(void 0,[586],(function(){return n(119)}));o=n.O(o)}();