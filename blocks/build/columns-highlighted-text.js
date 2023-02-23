!function(){"use strict";var e,t={714:function(){var e=window.wp.i18n,t=window.wp.blocks,o=window.wp.element,n=window.wp.blockEditor,i=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/columns-highlighted-text","title":"Columns with highlighted text","category":"text","icon":"columns","description":"Section with two columns, one with highlighted text","keywords":["container, columns, column, 50-50"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:../../../../build/columns-highlighted-text.js","editorStyle":"file:../../../../build/columns-highlighted-text.css","style":"file:../../../../build/style-columns-highlighted-text.css","attributes":{"template":{"type":"array","default":[]},"templateLock":{"type":["string","boolean"],"enum":["all","insert",false],"default":true},"align":{"type":"string","default":"full"}}}');const{apiVersion:l,name:s,title:r,category:c,icon:a,description:u,keywords:h,textdomain:m,supports:p}=i,d={apiVersion:l,title:(0,e.__)(r,"kotisivu-block-theme"),description:(0,e.__)(u,"kotisivu-block-theme"),category:c,icon:a,supports:p,keywords:h,textdomain:m,edit:e=>{const{attributes:{templateLock:t}}=e,i=(0,n.useBlockProps)({className:"columns-highlighted-text"});return(0,o.createElement)("section",i,(0,o.createElement)(n.InnerBlocks,{allowedBlocks:["ksd/inner-column"],template:[["ksd/inner-column",{className:"columns-highlighted-text__column ",templateLock:!0,template:[["core/heading",{level:2,className:"columns-highlighted-text__heading"}],["core/separator",{className:"columns-highlighted-text__separator"}]]}],["ksd/inner-column",{className:"columns-highlighted-text__column",templateLock:!0,template:[["core/paragraph",{className:"columns-highlighted-text__paragraph"}]]}]],templateLock:t}))},save:e=>{const t=n.useBlockProps.save({className:"columns-highlighted-text"});return(0,o.createElement)("section",t,(0,o.createElement)(n.InnerBlocks.Content,t))},getEditWrapperProps(){return{"data-align":"full"}}};(0,t.registerBlockType)(s,d)}},o={};function n(e){var i=o[e];if(void 0!==i)return i.exports;var l=o[e]={exports:{}};return t[e](l,l.exports,n),l.exports}n.m=t,e=[],n.O=function(t,o,i,l){if(!o){var s=1/0;for(u=0;u<e.length;u++){o=e[u][0],i=e[u][1],l=e[u][2];for(var r=!0,c=0;c<o.length;c++)(!1&l||s>=l)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(r=!1,l<s&&(s=l));if(r){e.splice(u--,1);var a=i();void 0!==a&&(t=a)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[o,i,l]},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={9239:0,5524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var i,l,s=o[0],r=o[1],c=o[2],a=0;if(s.some((function(t){return 0!==e[t]}))){for(i in r)n.o(r,i)&&(n.m[i]=r[i]);if(c)var u=c(n)}for(t&&t(o);a<s.length;a++)l=s[a],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(u)},o=self.webpackChunkksd_custom_blocks=self.webpackChunkksd_custom_blocks||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var i=n.O(void 0,[5524],(function(){return n(714)}));i=n.O(i)}();