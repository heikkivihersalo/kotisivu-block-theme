!function(){"use strict";var e,t={966:function(){var e=window.wp.i18n,t=window.wp.blocks,o=window.wp.element,i=window.wp.blockEditor,n=window.wp.data,s=i=>{let{clientId:s}=i;return(0,o.createElement)("button",{className:"ksd-editor-btn ksd-editor-btn--placeholder",onClick:()=>{const e=(0,n.select)("core/block-editor").getBlocksByClientId(s)[0].innerBlocks.length;let o=(0,t.createBlock)("ksd/social-icon-list-item");(0,n.dispatch)("core/block-editor").insertBlock(o,e,s)}},(0,e.__)("Add new icon","kotisivu-block-theme"))},r=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/social-icon-list","title":"Social Icon List","category":"widgets","icon":"wordpress","description":"Icon container for Font Awesome or custom icons.","keywords":["container, icon"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/social-icon-list.js","editorStyle":"file:../../../../build/social-icon-list.css","style":"file:../../../../build/style-social-icon-list.css","attributes":{"template":{"type":"array","default":[]},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false],"default":false}}}');const{apiVersion:c,name:l,title:a,category:d,icon:u,description:p,keywords:k,textdomain:m,supports:f}=r,b={apiVersion:c,title:(0,e.__)(a,"kotisivu-block-theme"),description:(0,e.__)(p,"kotisivu-block-theme"),category:d,icon:u,supports:f,keywords:k,textdomain:m,edit:e=>{const{attributes:{template:t},clientId:n}=e,r=(0,i.useBlockProps)({className:"social-icon-list"});return(0,o.createElement)("div",r,(0,o.createElement)(i.InnerBlocks,{allowedBlocks:"ksd/social-icon-list-item",template:t,renderAppender:()=>(0,o.createElement)(s,{clientId:n})}))},save:e=>{const t=i.useBlockProps.save({className:"social-icon-list"});return(0,o.createElement)("div",t,(0,o.createElement)(i.InnerBlocks.Content,null))}};(0,t.registerBlockType)(l,b)}},o={};function i(e){var n=o[e];if(void 0!==n)return n.exports;var s=o[e]={exports:{}};return t[e](s,s.exports,i),s.exports}i.m=t,e=[],i.O=function(t,o,n,s){if(!o){var r=1/0;for(d=0;d<e.length;d++){o=e[d][0],n=e[d][1],s=e[d][2];for(var c=!0,l=0;l<o.length;l++)(!1&s||r>=s)&&Object.keys(i.O).every((function(e){return i.O[e](o[l])}))?o.splice(l--,1):(c=!1,s<r&&(r=s));if(c){e.splice(d--,1);var a=n();void 0!==a&&(t=a)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[o,n,s]},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={8958:0,9501:0};i.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,s,r=o[0],c=o[1],l=o[2],a=0;if(r.some((function(t){return 0!==e[t]}))){for(n in c)i.o(c,n)&&(i.m[n]=c[n]);if(l)var d=l(i)}for(t&&t(o);a<r.length;a++)s=r[a],i.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return i.O(d)},o=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var n=i.O(void 0,[9501],(function(){return i(966)}));n=i.O(n)}();