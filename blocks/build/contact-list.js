!function(){"use strict";var t,e={129:function(){var t=window.wp.i18n,e=window.wp.blocks,o=window.wp.element,n=window.wp.blockEditor,i=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/contact-list","title":"Contact List","category":"blocks","icon":"id-alt","description":"Contact list with contact information","keywords":[""],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/contact-list.js","editorStyle":"file:../../../../build/contact-list.css","style":"file:../../../../build/style-contact-list.css","attributes":{"template":{"type":"array","default":[]},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false]},"mediaId":{"type":"number","default":0},"mediaUrl":{"type":"string","default":""},"mediaAlt":{"type":"string","default":""},"mediaMime":{"type":"string","default":""},"mediaWidth":{"type":"number"},"mediaHeight":{"type":"number"}}}');const{apiVersion:r,name:s,title:a,category:c,icon:l,description:u,keywords:d,textdomain:p,supports:m}=i,f={apiVersion:r,title:(0,t.__)(a,"kotisivu-block-theme"),description:(0,t.__)(u,"kotisivu-block-theme"),category:c,icon:l,supports:m,keywords:d,textdomain:p,edit:t=>{const{attributes:{template:e}}=t,i=(0,n.useBlockProps)({className:"contact-list-item"});return(0,o.createElement)("address",i,(0,o.createElement)(n.InnerBlocks,{allowedBlocks:"ksd/contact-list-item",template:e,templateLock:"all"}))},save:t=>{const e=n.useBlockProps.save({className:"contact-list-item"});return(0,o.createElement)("address",e,(0,o.createElement)(n.InnerBlocks.Content,null))}};(0,e.registerBlockType)(s,f)}},o={};function n(t){var i=o[t];if(void 0!==i)return i.exports;var r=o[t]={exports:{}};return e[t](r,r.exports,n),r.exports}n.m=e,t=[],n.O=function(e,o,i,r){if(!o){var s=1/0;for(u=0;u<t.length;u++){o=t[u][0],i=t[u][1],r=t[u][2];for(var a=!0,c=0;c<o.length;c++)(!1&r||s>=r)&&Object.keys(n.O).every((function(t){return n.O[t](o[c])}))?o.splice(c--,1):(a=!1,r<s&&(s=r));if(a){t.splice(u--,1);var l=i();void 0!==l&&(e=l)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[o,i,r]},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={70:0,188:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var i,r,s=o[0],a=o[1],c=o[2],l=0;if(s.some((function(e){return 0!==t[e]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(c)var u=c(n)}for(e&&e(o);l<s.length;l++)r=s[l],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(u)},o=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var i=n.O(void 0,[188],(function(){return n(129)}));i=n.O(i)}();