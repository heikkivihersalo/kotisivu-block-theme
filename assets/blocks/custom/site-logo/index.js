!function(){"use strict";var e,t={938:function(e,t,o){var n=window.wp.i18n,i=window.wp.blocks,r=window.wp.element,s=window.wp.blockEditor,l=window.wp.serverSideRender,a=o.n(l),c=window.wp.components,u=e=>{const{attributes:{isLink:t},setAttributes:o}=e;return(0,r.createElement)(s.InspectorControls,null,(0,r.createElement)(c.PanelBody,{title:(0,n.__)("Site logo settings","kotisivu-block-theme"),initialOpen:!0},(0,r.createElement)(c.PanelRow,null,(0,r.createElement)(c.ToggleControl,{label:(0,n.__)("Enable home link","kotisivu-block-theme"),checked:t,onChange:()=>{o({isLink:!t})}}))))},p=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"ksd/site-logo","title":"Company Logo","category":"dynamic-data","icon":"nametag","description":"Display site logo on your site","keywords":["site, logo"],"textdomain":"kotisivu-block-theme","supports":{"className":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","attributes":{"options":{"type":"object"},"isLink":{"type":"boolean","default":true}}}');const{apiVersion:d,name:f,title:k,category:m,icon:b,description:v,keywords:w,textdomain:h,supports:g}=p,y={apiVersion:d,title:(0,n.__)(k,"kotisivu-block-theme"),description:(0,n.__)(v,"kotisivu-block-theme"),category:m,icon:b,supports:g,keywords:w,textdomain:h,edit:e=>{const t=(0,s.useBlockProps)({className:"site-logo-editor-wrapper"});return(0,r.createElement)("div",{...t},(0,r.createElement)(u,{...e}),(0,r.createElement)(a(),{block:"ksd/site-logo",attributes:e.attributes,className:e.className}))},save:()=>null};(0,i.registerBlockType)(f,y)}},o={};function n(e){var i=o[e];if(void 0!==i)return i.exports;var r=o[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=function(t,o,i,r){if(!o){var s=1/0;for(u=0;u<e.length;u++){o=e[u][0],i=e[u][1],r=e[u][2];for(var l=!0,a=0;a<o.length;a++)(!1&r||s>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[a])}))?o.splice(a--,1):(l=!1,r<s&&(s=r));if(l){e.splice(u--,1);var c=i();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[o,i,r]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={6482:0,9010:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var i,r,s=o[0],l=o[1],a=o[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(i in l)n.o(l,i)&&(n.m[i]=l[i]);if(a)var u=a(n)}for(t&&t(o);c<s.length;c++)r=s[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(u)},o=self.webpackChunkkotisivu_block_theme=self.webpackChunkkotisivu_block_theme||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var i=n.O(void 0,[9010],(function(){return n(938)}));i=n.O(i)}();