!function(){"use strict";var e={n:function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,{a:s}),s},d:function(t,s){for(var a in s)e.o(s,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:s[a]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.domReady;e.n(t)()((function(){const e=document.getElementsByTagName("header")[0],t=document.getElementsByClassName("header__toggle")[0],s=document.querySelectorAll(".wp-block-pages-list__item");(async()=>{try{e&&document.addEventListener("scroll",(()=>{window.scrollY>100?e.classList.add("sticky-opacity"):e.classList.remove("sticky-opacity"),window.scrollY>500?e.classList.add("sticky-header"):e.classList.remove("sticky-header")})),e&&t.addEventListener("click",(()=>{const s=t.getAttribute("data-state");s&&"closed"!==s?(t.setAttribute("data-state","closed"),t.setAttribute("aria-expanded","false")):(t.setAttribute("data-state","opened"),t.setAttribute("aria-expanded","true")),e.classList.toggle("active")})),e&&s.forEach((s=>{s.addEventListener("click",(()=>{e.classList.remove("active"),t.classList.remove("active")}))}))}catch(e){console.error(e)}})()}))}();