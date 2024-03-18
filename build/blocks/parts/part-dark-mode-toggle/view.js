(()=>{"use strict";var e={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return e.d(o,{a:o}),o},d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.domReady;var o=e.n(t);const r=window.wp.i18n;o()((function(){const e=document.getElementsByTagName("html")[0],t=document.querySelectorAll(".dark-mode-toggle"),o=window.matchMedia("(prefers-color-scheme: dark)"),c=(document.getElementById("dark-mode-toggle-text"),()=>{e.setAttribute("color-scheme","dark"),t.forEach((e=>{e.setAttribute("aria-label",(0,r.__)("Dark color scheme","kotisivu-block-theme"))}))}),a=()=>{e.setAttribute("color-scheme","light"),t.forEach((e=>{e.setAttribute("aria-label",(0,r.__)("Light color scheme","kotisivu-block-theme"))}))};o.matches&&"light"!==e.getAttribute("color-scheme")?c():a(),t.forEach((t=>{t.addEventListener("click",(()=>{const t=e.getAttribute("color-scheme");o.matches?"dark"===t?a():c():"light"===t?c():a(),window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"button_click",category:"site_preferences",action:"switch_color_scheme",value:e.getAttribute("color-scheme")}),document.cookie="color-scheme = "+e.getAttribute("color-scheme")+"; max-age=2592000; path=/; samesite=strict; secure"}))}))}))})();