import{n as e}from"./assets/rolldown-runtime-DNdEV4Dn.js";import"./assets/styles-0BPvmdzI.js";import{n as t,t as n}from"./assets/vendor-CTp9fa9y.js";var r=e(t(),1),i=`YOUR_API_KEY`,a=document.querySelector(`.input`),o=document.querySelector(`.btn`),s=document.querySelector(`.gallery`),c=document.querySelector(`.loader`);c.style.display=`none`;var l,u,d=1,f=9,p=0;o.addEventListener(`click`,e=>{e.preventDefault(),l=a.value.trim().replace(` `,`+`),d=1,s.innerHTML=``,c.style.display=`inline-block`,Promise.all([h(d),new Promise(e=>setTimeout(e,2e3))]).then(([e])=>{if(e.hits.length===0)return c.style.display=`none`,r.default.error({message:`Sorry, there are no images matching your search query. Please try again!`,position:`topRight`});p=Math.ceil(e.totalHits/f),g(e),m.style.display=`block`,d>=p&&(m.style.display=`none`),c.style.display=`none`}).catch(e=>{c.style.display=`none`,console.log(e)})});var m=document.querySelector(`.load-more`);m.style.display=`none`,m.addEventListener(`click`,()=>{d+=1,Promise.all([h(d),new Promise(e=>setTimeout(e,2e3))]).then(([e])=>{g(e),d>=p&&(m.style.display=`none`);let{height:t}=s.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*4,behavior:`smooth`})}).catch(e=>{console.log(e)})});function h(e){return fetch(`
https://pixabay.com/api/?key=${i}&q=${l}&image_type=photo&per_page=${f}&page=${e}`).then(e=>{if(!e.ok)throw Error(e.status);return e.json()})}function g(e){let t=e.hits.map(({webformatURL:e,largeImageURL:t,tags:n,likes:r,views:i,comments:a,downloads:o})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${t}">
          <img
          class="gallery-image"
          src="${e}"
          alt="${n}" />
        </a>
        <div class="features">
          <ul>
            <li class="feature-header">Likes</li>
            <li class="feature-text">${r}</li>
          </ul>
          <ul>
            <li class="feature-header">Views</li>
            <li class="feature-text">${i}</li>
          </ul>
          <ul>
            <li class="feature-header">Comments</li>
            <li class="feature-text">${a}</li>
          </ul>
          <ul>
            <li class="feature-header">Downloads</li>
            <li class="feature-text">${o}</li>
          </ul>
        </div>
      </li>`).join(``);s.insertAdjacentHTML(`beforeend`,t),u&&u.destroy(),u=new n(`.gallery a`,{captionsData:`alt`,captionDelay:250})}
//# sourceMappingURL=image-search.js.map