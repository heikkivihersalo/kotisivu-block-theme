(()=>{"use strict";var e,t={528:(e,t,r)=>{const o=window.wp.blocks,n=JSON.parse('{"N9":"ksd/part-logo-dynamic"}'),i=window.React,l=window.wp.blockEditor,a=window.wp.serverSideRender;var s=r.n(a);const c=window.wp.i18n,u=window.wp.components,d=e=>{const{attributes:{isLink:t},setAttributes:r}=e;return(0,i.createElement)(l.InspectorControls,null,(0,i.createElement)(u.PanelBody,{title:(0,c.__)("Site logo settings","kotisivu-block-theme"),initialOpen:!0},(0,i.createElement)(u.PanelRow,null,(0,i.createElement)(u.ToggleControl,{label:(0,c.__)("Enable home link","kotisivu-block-theme"),checked:t,onChange:()=>{r({isLink:!t})}}))))};(0,o.registerBlockType)(n.N9,{edit:function(e){const t=(0,l.useBlockProps)({className:"site-logo-editor-wrapper"});return(0,i.createElement)("div",{...t},(0,i.createElement)(d,{...e}),(0,i.createElement)(s(),{block:"ksd/part-logo-dynamic",attributes:e.attributes,className:e.className}))},save:function(){return null}})}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,r,n,i)=>{if(!r){var l=1/0;for(u=0;u<e.length;u++){for(var[r,n,i]=e[u],a=!0,s=0;s<r.length;s++)(!1&i||l>=i)&&Object.keys(o.O).every((e=>o.O[e](r[s])))?r.splice(s--,1):(a=!1,i<l&&(l=i));if(a){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,n,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={3251:0,7600:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,i,[l,a,s]=r,c=0;if(l.some((t=>0!==e[t]))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(s)var u=s(o)}for(t&&t(r);c<l.length;c++)i=l[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},r=globalThis.webpackChunkkotisivu_block_theme=globalThis.webpackChunkkotisivu_block_theme||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[7600],(()=>o(528)));n=o.O(n)})();