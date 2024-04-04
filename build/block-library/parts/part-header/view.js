(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var a in n)e.o(n,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.domReady;function n(e=null,t,n,a={modal:"data-modal",expanded:"data-expanded"}){e&&e.preventDefault(),Object.values(t).forEach((e=>{e!==t.header&&(e.removeAttribute("inert"),e.removeAttribute("aria-hidden"))})),document.getElementsByTagName("body")[0].removeAttribute("style"),t.header.setAttribute(a.modal,"closed"),n.setAttribute(a.expanded,"false"),n.focus()}e.n(t)()((function(){const e={container:document.getElementById("header-dialog-container"),toggleOpen:document.getElementById("header-dialog-btn--open"),toggleClose:document.getElementById("header-dialog-btn--close")},t={header:document.getElementsByTagName("header")[0],content:document.getElementsByClassName("content-area")[0],footer:document.getElementsByTagName("footer")[0]},a={container:document.getElementsByClassName("site-header__menu")[0],links:document.querySelectorAll(".site-header__menu-item"),first:document.querySelectorAll(".site-header__menu-item a")[0],last:document.querySelectorAll(".site-header__menu-item:last-child > :is(a, span)")[0]},o={modal:"data-modal",expanded:"aria-expanded",transition:"data-transition",sticky:"data-sticky"};(async()=>{try{!function(e,t,a,o){[t.toggleOpen,t.toggleClose].forEach((d=>{d.addEventListener("click",(d=>{const r=e.header.getAttribute(o.modal);r&&"closed"!==r?n(d,e,t.toggleOpen,o):async function(e=null,t,n,a,o={modal:"data-modal",expanded:"aria-expanded"}){e&&e.preventDefault(),Object.values(t).forEach((e=>{e!==t.header&&(e.setAttribute("inert",!0),e.setAttribute("aria-hidden","true"))})),document.getElementsByTagName("body")[0].style.overflow="hidden",t.header.setAttribute(o.modal,"open"),n.setAttribute(o.expanded,"true"),a.focus()}(d,e,t.toggleOpen,a.first,o)}))}))}(t,e,a,o),function(e,t,a,o){a.links.forEach((a=>{a.addEventListener("click",(a=>{n(a,e,t.toggleOpen,o)}))}))}(t,e,a,o),function(e,t={transition:"data-transition",sticky:"data-sticky"}){document.addEventListener("scroll",(()=>{window.scrollY>100?e.setAttribute(t.transition,"true"):e.removeAttribute(t.transition),window.scrollY>300?e.setAttribute(t.sticky,"true"):e.removeAttribute(t.sticky)}))}(t.header,o),function(e,t,a,o){document.addEventListener("keyup",(a=>{switch(a.key){case"Tab":case"Enter":default:break;case"Escape":n(a,e,t.toggleOpen,o)}})),document.addEventListener("keydown",(n=>{const d="open"===e.header.getAttribute(o.modal);if("Tab"===n.key&&d){const e=document.activeElement;if(n.shiftKey){if(e===a.last)return;if(e===t.toggleClose)return a.last.focus(),void n.preventDefault()}e===a.last&&(t.toggleClose.focus(),n.preventDefault())}}))}(t,e,a,o)}catch(e){console.error(e)}})()}))})();