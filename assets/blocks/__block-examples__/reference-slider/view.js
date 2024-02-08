!function(){"use strict";var e={n:function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,{a:r}),r},d:function(t,r){for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,r=window.wp.i18n,n=window.wp.domReady,l=e.n(n),a=window.wp.apiFetch,i=e.n(a),s=(0,t.createContext)(null);const c=e=>(0,t.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 1000 1000",...e},(0,t.createElement)("path",{d:"M500 0c275.958 0 500 224.042 500 500 0 275.958-224.042 500-500 500C224.042 1000 0 775.958 0 500 0 224.042 224.042 0 500 0Zm264 500L336 209.5v581L764 500Z",style:{fill:"var(--wp--preset--color--primary), black"},transform:"rotate(180 500 500)"})),o=e=>(0,t.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 1000 1000",...e},(0,t.createElement)("path",{d:"M500 0c275.958 0 500 224.042 500 500 0 275.958-224.042 500-500 500C224.042 1000 0 775.958 0 500 0 224.042 224.042 0 500 0Zm264 500L336 209.5v581L764 500Z",style:{fill:"var(--wp--preset--color--primary), black"}})),d=e=>(0,t.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},width:"100%",height:"100%",viewBox:"0 0 615 576",...e},(0,t.createElement)("path",{d:"M0 0h256l-44 576H42L0 0ZM359 0h256l-44 576H401L359 0Z",fill:"var(--wp--preset--color--secondary)"})),m=e=>(0,t.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 500 500",...e},(0,t.createElement)("circle",{fill:"var(--wp--preset--color--black)",cx:280,cy:276,r:220,transform:"translate(-68.182 -63.636) scale(1.13636)"})),u=e=>(0,t.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 500 500",...e},(0,t.createElement)("path",{d:"M249.999 0c137.978 0 250 112.021 250 249.999s-112.022 250-250 250-250-112.022-250-250 112.022-250 250-250Zm0 30c-121.421 0-220 98.578-220 219.999 0 121.421 98.579 220 220 220s220-98.579 220-220-98.579-220-220-220Z",fill:"var(--wp--preset--color--black)"}));var f=({data:e})=>{const{sliderIndex:r,setSliderIndex:n}=(0,t.useContext)(s);return(0,t.createElement)("div",{className:"reference-slider__pagination"},e.map(((e,l)=>(0,t.createElement)("button",{key:l,className:"reference-slider__pagination-btn","aria-label":`View Reference ${l+1}`,onClick:()=>n(l)},(0,t.createElement)("span",{className:"is-visually-hidden"},`View Reference ${l+1}`),l===r?(0,t.createElement)(m,{"aria-hidden":!0}):(0,t.createElement)(u,{"aria-hidden":!0})))))},p=({length:e})=>{const{sliderIndex:n,setSliderIndex:l}=(0,t.useContext)(s);(0,t.useEffect)((()=>{setInterval((()=>{a()}),2e3)}),[]);const a=()=>{l((t=>t===e-1?0:t+1))};return(0,t.createElement)("div",{className:"reference-slider__controls"},(0,t.createElement)("button",{onClick:()=>{l((t=>0===t?e-1:t-1))},className:"reference-slider__btn reference-slider__btn--prev","aria-label":(0,r.__)("View Previous Reference","kotisivu-block-theme")},(0,t.createElement)("span",{className:"is-visually-hidden"},(0,r.__)("Previous","kotisivu-block-theme")),(0,t.createElement)(c,{"aria-hidden":!0})),(0,t.createElement)("button",{onClick:a,className:"reference-slider__btn reference-slider__btn--next","aria-label":(0,r.__)("View Next Reference","kotisivu-block-theme")},(0,t.createElement)("span",{className:"is-visually-hidden"},(0,r.__)("Next","kotisivu-block-theme")),(0,t.createElement)(o,{"aria-hidden":!0})))};window.wp.data;const v=({featured_image:e,logo:n,excerpt:l,name:a,link:i})=>{return(0,t.createElement)("div",{className:"reference-slider__slide"},(0,t.createElement)("div",{className:"reference-slider__image-container is-stacked"},(0,t.createElement)("img",{className:"reference-slider__image reference-slider__image--background",src:e.url,alt:e.alt,width:e.width,height:e.height}),(0,t.createElement)("img",{className:"reference-slider__image reference-slider__image--logo",src:n.url,alt:n.alt,width:n.width,height:n.height})),(0,t.createElement)("div",{className:"reference-slider__content-container"},(0,t.createElement)(d,{"aria-hidden":!0,className:"reference-slider__quote"}),(0,t.createElement)("div",{className:"reference-slider__content-wrapper"},(0,t.createElement)("p",{className:"reference-slider__excerpt"},(s=l,(c=document.createElement("DIV")).innerHTML=s,c.textContent||c.innerText||"")),(0,t.createElement)("p",{className:"reference-slider__name"},a),(0,t.createElement)("div",{class:"references-slider__button wp-block-button"},(0,t.createElement)("a",{class:"wp-block-button__link wp-element-button",href:i},(0,r.__)("Explore","kotisivu-block-theme"))))));var s,c};var h=e=>{const r=(0,t.useRef)(null),{sliderIndex:n,setSliderIndex:l}=(0,t.useContext)(s),a=Object.keys(e),i=function(e){const[r,n]=(0,t.useState)();return(0,t.useLayoutEffect)((()=>{const t=()=>{n((e=>({width:e.current.offsetWidth,height:e.current.offsetHeight}))(e))};return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)}),[]),r}(r),[c,o]=(0,t.useState)({x:null,locked:!1,offset:0,factor:0}),d=e=>e.changedTouches?e.changedTouches[0]:e;return(0,t.createElement)("div",{ref:r,className:"reference-slider__slides"+(c.locked?" is-smooth":""),style:{"--slide-count":a.length,"--slide-index":n,"--slide-offset":c.offset+"px","--slide-transition-factor":c.factor},onTouchStart:e=>(e=>{o({...c,x:d(e).clientX,locked:!0})})(e),onTouchEnd:t=>(t=>{if(!c.locked)return;let r=d(t).clientX-c.x,a=Math.sign(r),s=+(a*r/i.width).toFixed(2),m=Object.keys(e).length;(n>0||a<0)&&(n<m-1||a>0)&&s>.2&&(l((e=>a<0?e+1:a>0?e-1:void 0)),o({x:null,factor:1-s,offset:0,locked:!1}))})(t),onTouchMove:e=>(e=>{if(e.preventDefault(),c.locked){let t=Math.round(d(e).clientX-c.x);o({...c,offset:t})}})(e)},(0,t.createElement)("div",{className:"reference-slider__track"},a.map(((r,n)=>(0,t.createElement)(v,{key:n,...e[r].metadata.reference})))))};const w=()=>{const[e,n]=(0,t.useState)(0),[l,a]=(0,t.useState)([]);return(0,t.useEffect)((()=>{(async()=>{const e=await async function(e=null){let t=new URL(window.location.origin+"/wp/v2/references");for(const[r,n]of Object.entries(e))t.searchParams.append(r,n);return await i()({path:t.pathname+t.search}).then((e=>e))}({per_page:10});a(e)})()}),[]),0===l.length?null:(0,t.createElement)(s.Provider,{value:{sliderIndex:e,setSliderIndex:n}},(0,t.createElement)("a",{href:"#skip-slider-controls",className:"is-visually-hidden"},(0,r.__)("Skip Slider Controls","kotisivu-block-theme")),(0,t.createElement)(h,{...l}),(0,t.createElement)(p,{length:l.length}),(0,t.createElement)(f,{data:l}),(0,t.createElement)("div",{id:"skip-slider-controls"}))};l()((async function(){(0,t.createRoot)(document.getElementById("reference-slider")).render((0,t.createElement)(w,null))}))}();