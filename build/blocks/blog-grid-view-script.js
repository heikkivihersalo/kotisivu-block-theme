(()=>{"use strict";var e={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return e.d(o,{a:o}),o},d:(t,o)=>{for(var s in o)e.o(o,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:o[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.domReady;var o=e.n(t);const s=window.wp.i18n;o()((function(){let e={container:document.getElementById("blog-post-container"),list:document.getElementById("blog-post-list"),cards:document.querySelectorAll(".blog-grid__item"),loadMore:document.getElementById("blog-load-more")},t={postsLoaded:e.list.childElementCount},o={url:PHP_VARIABLES.ajax_url,data:{action:"load_more_posts",security:PHP_VARIABLES.ajax_nonce,paged:2},headers:{"Content-type":"application/x-www-form-urlencoded; charset=UTF-8"}};e.loadMore.addEventListener("click",(async()=>{try{const a=await(async({url:e,data:t,headers:o})=>{const s=await fetch(e,{method:"POST",headers:o,body:new URLSearchParams(t).toString()}),a=await s.json();return{posts:a.posts,postCount:a.post_count}})(o);a.posts.forEach((o=>{e.list.append((e=>{let t=document.createElement("div");return t.innerHTML=e,t.firstChild})(o.content)),t.postsLoaded++})),o.data.paged++,0==a.posts.length?console.info((0,s.__)("No more posts to fetch:","kotisivu-block-theme")):console.info((0,s.__)("Posts fetched succesfully:","kotisivu-block-theme"),a.posts),t.postsLoaded==a.postCount&&(e.loadMore.disabled=!0,e.loadMore.setAttribute("aria-disabled","true"))}catch(t){e.list.append((e=>{let t=document.createElement("div");return t.className="blog-post-list__error-message",t.innerHTML=`<p>${e}</p>`,t})((0,s.__)("Error while loading more posts","kotisivu-block-theme"))),console.error("Error:",t)}})),e.cards.forEach((e=>{e.addEventListener("click",(()=>{window.location.assign(e.dataset.url)}))}))}))})();