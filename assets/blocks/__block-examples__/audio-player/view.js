!function(){"use strict";var e={n:function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,{a:a}),a},d:function(t,a){for(var r in a)e.o(a,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:a[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,a=window.wp.i18n,r=window.wp.domReady,i=e.n(r),n=(0,t.createContext)(null),l=window.wp.apiFetch,s=e.n(l);const u=e=>(0,t.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 1000 1000","aria-hidden":"true",...e},(0,t.createElement)("path",{d:"M500 0c275.958 0 500 224.042 500 500 0 275.958-224.042 500-500 500C224.042 1000 0 775.958 0 500 0 224.042 224.042 0 500 0Zm264 500L336 209.5v581L764 500Z",style:{fill:"var(--wp--preset--color--primary)"}})),d=e=>(0,t.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 1000 1000","aria-hidden":"true",...e},(0,t.createElement)("path",{d:"M500 0c275.958 0 500 224.042 500 500 0 275.958-224.042 500-500 500C224.042 1000 0 775.958 0 500 0 224.042 224.042 0 500 0Zm-49.799 236H305.522v528h144.679V236Zm244.277 0H549.799v528h144.679V236Z",style:{fill:"var(--wp--preset--color--primary)"}})),m=e=>(0,t.createElement)("svg",{className:"music-playlist__placeholder-image",xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",width:400,height:400,style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:2},viewBox:"0 0 400 400",...e},(0,t.createElement)("path",{d:"M0 0h400v400H0z",style:{fill:"#ebebeb"}})),c=async e=>e.map(((e,t)=>({id:t,title:e?.title.rendered,artist:e?.media_details?.artist,album:e?.media_details?.album,meta:{sampleRate:e?.media_details?.sample_rate,format:e?.media_details?.fileformat},time:{duration:e?.media_details?.length,durationFormatted:e?.media_details?.length_formatted}})));async function o(e,t,a){const r=await(async e=>["play","pause","complete","seek","stream"].includes(e)?e:"undefined")(a),i=await((e,t)=>{const a=Math.round(e/t*100),r={0:15,15:25,25:50,50:75,75:100};for(let e in r)if(a<=r[e])return e})(t,e?.duration),n=await(async({id:e,title:t,artist:a,album:r,sampleRate:i,format:n})=>({id:e,title:t,artist:a,album:r,meta:{sampleRate:i,format:n}}))(e),l={current:Math.round(t),duration:e?.duration,percent:Math.round(t/e?.duration*100)};window.dataLayer=window.dataLayer||[],"seek"!==r&&"stream"!==r&&window.dataLayer.push({event:`music_${r}`,song:n,time:l}),window.dataLayer.push({event:`music_${a}_${i}`,song:n,time:l})}var _=({playerRef:e,trackRef:r})=>{const{isPlaying:i,setIsPlaying:l}=(0,t.useContext)(n),[s,c]=(0,t.useState)(0),[_,f]=(0,t.useState)(0),[p,h]=(0,t.useState)(0);function g(e){const t=Math.floor(e/60),a=e-60*t;return`${t}:${a<10?"0":""}${a}`}return(0,t.useEffect)((()=>{(async()=>{if(i)switch(_){case 16:case 26:case 51:case 76:await o(r.current,s,"stream")}})()}),[_]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"audio-player",tabIndex:"-1","aria-hidden":"true"},(0,t.createElement)("div",{className:"audio-player__info"},(0,t.createElement)("button",{className:"audio-player__btn audio-player__btn--play","data-state":i?"pause":"play",onClick:async function(t){await l(!i);const a=e.current;i?(a.pause(),o(r.current,a.currentTime,"pause")):(a.play(),o(r.current,a.currentTime,"play"))},tabIndex:-1,"aria-hidden":"true"},(0,t.createElement)("span",{className:"is-visually-hidden"},i?(0,a.__)("Pause","kotisivu-block-theme"):(0,a.__)("Play","kotisivu-block-theme")),i?(0,t.createElement)(d,null):(0,t.createElement)(u,null)),(0,t.createElement)("div",{className:"audio-player__track-details"},(0,t.createElement)("div",{className:"audio-player__now-playing"},(0,t.createElement)("h3",null,(0,a.__)("Now Playing","kotisivu-block-theme")),(0,t.createElement)("div",{className:"audio-player__quality"},(0,t.createElement)("span",{className:"audio-player__quality-item"},r.current?.format),(0,t.createElement)("span",{className:"audio-player__quality-item"},r.current?.sampleRate))),(0,t.createElement)("p",{className:"audio-player__track-name"},!r.current?.artist&&(0,a.__)("Loading...","kotisivu-block-theme"),r.current?.artist&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)("span",{className:"audio-player__artist"},r.current?.artist),":"," ",(0,t.createElement)("span",{className:"audio-player__album"},r.current?.album)))),r.current?.featuredImage?(0,t.createElement)("img",{className:"audio-player__cover",src:r.current?.featuredImage.src,width:r.current?.featuredImage.width,height:r.current?.featuredImage.height,alt:r.current?.featuredImage.alt}):(0,t.createElement)(m,null)),(0,t.createElement)("div",{className:"audio-player__timeline"},(0,t.createElement)("div",{className:"audio-player__timeline-elapsed"},(0,t.createElement)("span",{className:"is-visually-hidden"},(0,a.__)("Elapsed Time","kotisivu-block-theme")),g(s)),(0,t.createElement)("label",{htmlFor:"audio-timeline",className:"is-visually-hidden"},(0,a.__)("Timeline","kotisivu-block-theme")),(0,t.createElement)("input",{type:"range",id:"audio-timeline",value:s,min:0,max:p,onChange:async function(t){const a=parseFloat(t.target.value);await c(a),e.current.currentTime=a,i&&o(r.current,a,"seek")},"aria-valuetext":`${s} seconds`,tabIndex:-1}),(0,t.createElement)("div",{className:"audio-player__timeline-duration"},(0,t.createElement)("span",{className:"is-visually-hidden"},(0,a.__)("Total Duration","kotisivu-block-theme")),g(p)))),(0,t.createElement)("audio",{className:"is-visually-hidden",controls:!0,ref:e,src:r.current?.src,onLoadedMetadata:async function(){await h(Math.round(e.current.duration))},onTimeUpdate:async function(){await c(Math.round(e.current.currentTime)),await f(Math.round(s/p*100))},onPlay:()=>l(!0),onPause:()=>l(!1)}),(0,t.createElement)("p",{className:"is-visually-hidden"},`${(0,a.__)("Now playing song","kotisivu-block-theme")} ${r.current?.album} ${(0,a.__)("from artist","kotisivu-block-theme")} ${r.current?.artist}`))};const f=()=>{const e=(0,t.useRef)(null),r=(0,t.useRef)(0),i=(0,t.useRef)(null),[l,u]=(0,t.useState)(!1),[,d]=(0,t.useState)(Date.now()),[f,p]=function(e){const[a,r]=(0,t.useState)([]),[i,n]=(0,t.useState)(!0);return(0,t.useEffect)((()=>{(async()=>{let t=await async function(e=null){let t=new URL(window.location.origin+"/wp/v2/media");for(const[a,r]of Object.entries(e))t.searchParams.append(a,r);return await s()({path:t.pathname+t.search}).then((e=>e))}({per_page:25,media_type:"audio"});await r(t),e.current={id:0,title:t[0]?.title?.rendered,album:t[0]?.media_details?.album,artist:t[0]?.media_details?.artist,format:t[0]?.media_details?.fileformat,sampleRate:t[0]?.media_details?.sample_rate,src:t[0]?.source_url,duration:t[0]?.media_details?.length,durationFormatted:t[0]?.media_details?.length_formatted,featuredImage:{src:t[0]?.metadata?.featured_image?.url,alt:t[0]?.metadata?.featured_image?.alt,height:t[0]?.metadata?.featured_image?.height,width:t[0]?.metadata?.featured_image?.width,title:t[0]?.metadata?.featured_image?.title}},n(!1)})()}),[]),[a,i]}(e),[h,g]=function(e){const a=(0,t.useRef)(null),[r,i]=(0,t.useState)(!1),n=e=>{e.forEach((e=>{e.isIntersecting&&i(!0)}))};return(0,t.useEffect)((()=>{const t=new IntersectionObserver(n,e);return a.current&&t.observe(a.current),()=>{a.current&&t.unobserve(a.current)}}),[a.current,e]),[a,r]}({root:null,rootMargin:"0px",threshold:.5});async function y(){const t=i.current,a=await f.find(((e,t)=>{if(t===r.current)return e}));e.current={id:r.current,title:a.title.rendered,album:a.media_details?.album,artist:a.media_details?.artist,format:a.media_details?.fileformat,sampleRate:a.media_details?.sample_rate,src:a.source_url,duration:a.media_details?.length,durationFormatted:a.media_details?.length_formatted,featuredImage:{src:a.metadata?.featured_image?.url,alt:a.metadata?.featured_image?.alt,height:a.metadata?.featured_image?.height,width:a.metadata?.featured_image?.width,title:a.metadata?.featured_image?.title}},await d(Date.now()),document.querySelector('.audio-player__list-item[aria-current="true"]').focus(),l&&(t.play(),u(!0),o(e.current,t.currentTime,"play"))}return(0,t.useEffect)((()=>{g&&0!==f.length&&async function(e){window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"music_view_tracks",songs:await c(e)})}(f)}),[g,f]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n.Provider,{value:{isPlaying:l,setIsPlaying:u}},!f.length&&p&&(0,t.createElement)("div",null,(0,a.__)("Loading...","kotisivu-block-theme")),!f.length&&!p&&(0,t.createElement)("div",null,(0,a.__)("No audio files found","kotisivu-block-theme")),!p&&f.length>0&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)(_,{playerRef:i,trackRef:e}),(0,t.createElement)("ol",{ref:h,className:"audio-player__list","aria-label":(0,a.__)("Playlist","kotisivu-block-theme"),role:"list",onKeyDown:t=>async function(t){const a=i.current,n=parseInt(document.activeElement.dataset.id);switch(t.key){case" ":if(n===r.current)(async()=>{l?(a.pause(),u(!1),o(e.current,a.currentTime,"pause")):(a.play(),u(!0),o(e.current,a.currentTime,"play"))})();else{r.current=n;const t=await f.find(((e,t)=>{if(n===t)return e}));e.current={id:r.current,title:t.title.rendered,album:t.media_details?.album,artist:t.media_details?.artist,format:t.media_details?.fileformat,sampleRate:t.media_details?.sample_rate,src:t.source_url,duration:t.media_details?.length,durationFormatted:t.media_details?.length_formatted,featuredImage:{src:t.metadata?.featured_image?.url,alt:t.metadata?.featured_image?.alt,height:t.metadata?.featured_image?.height,width:t.metadata?.featured_image?.width,title:t.metadata?.featured_image?.title}},await d(Date.now()),i.current.play(),u(!0),o(e.current,a.currentTime,"play")}break;case"ArrowDown":"LI"===t.target.tagName&&t.preventDefault(),await(async()=>{r.current===f.length-1?r.current=0:r.current=r.current+1})(),y();break;case"ArrowUp":"LI"===t.target.tagName&&t.preventDefault(),await(async()=>{0===r.current?r.current=f.length-1:r.current=r.current-1})(),y()}await d(Date.now())}(t)},f.map(((n,s)=>{const c={id:s,title:n.title.rendered,album:n.media_details?.album,artist:n.media_details?.artist,format:n.media_details?.fileformat,sampleRate:n.media_details?.sample_rate,src:n.source_url,duration:n.media_details?.length,durationFormatted:n.media_details?.length_formatted,featuredImage:{src:n.metadata?.featured_image?.url,alt:n.metadata?.featured_image?.alt,height:n.metadata?.featured_image?.height,width:n.metadata?.featured_image?.width,title:n.metadata?.featured_image?.title}};return(0,t.createElement)("li",{key:c.id,className:"audio-player__list-item",role:"listItem",onClick:t=>async function(t,a,n){const s=i.current,m=e.current;if(e.current=n,r.current=a,await d(Date.now()),l&&e.current.id===m.id)return s.pause(),u(!1),void o(e.current,s.currentTime,"pause");s.play(),u(!0),o(e.current,s.currentTime,"play")}(0,s,c),"data-id":c.id,"data-src":c.src,"data-album":c.album,"data-artist":c.artist,"data-format":c.format,"data-samplerate":c.sampleRate,"aria-label":`${(0,a.__)("Play song","kotisivu-block-theme")} ${s+1} ${(0,a.__)("of","kotisivu-block-theme")} ${f.length} ${(0,a.__)("in playlist","kotisivu-block-theme")}`,"aria-current":r.current===s?"true":"false",tabIndex:"0"},(0,t.createElement)("span",{className:"audio-player__list-item-text"},function(e){const t={"&#8211;":"-"};for(const a in t)if(e.indexOf(a)>=0)return e.replaceAll(a,t[a]);return e}(c.title)),c.featuredImage.src?(0,t.createElement)("img",{className:"audio-player__list-item-image","aria-hidden":"true",src:c.featuredImage.src,alt:c.featuredImage.alt,height:c.featuredImage.height,width:c.featuredImage.width}):(0,t.createElement)(m,null))}))))))};i()((async function(){(0,t.createRoot)(document.getElementById("audio-player")).render((0,t.createElement)(f,null))}))}();