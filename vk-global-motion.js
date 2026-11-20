/* VERSION-K / GLOBAL MOTION SYSTEM 3.0 — BPO reference behavior */
(()=>{'use strict';
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const body=document.body;
 if(!document.querySelector('.vk-progress')){const progress=document.createElement('div');progress.className='vk-progress';progress.innerHTML='<span></span>';body.prepend(progress);const bar=progress.firstElementChild;const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?scrollY/max*100:0)+'%'};addEventListener('scroll',update,{passive:true});update();}
 if(!document.querySelector('.vk-orb')){const orb=document.createElement('div');orb.className='vk-orb';body.appendChild(orb);}
 const selectors='main section, main article, .business-card, .business-gallery figure, .bpo-service, .flow-item, .career-values article, .career-flow article, .digital-card, .flow-step, .clean-service, .clean-value, .yutaka-value, .point, .feature, .flow-card, .job, .privacy-block, .guide-item, .category-option, .product-item, .profile-table, .contact-form-card, .contact-aside, .company-intro';
 const targets=[...document.querySelectorAll(selectors)].filter(el=>!el.classList.contains('vk-reveal'));
 targets.forEach((el,i)=>{el.classList.add('vk-reveal');el.dataset.vkDelay=String(i%4)});
 if('IntersectionObserver'in window&&!reduce){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.10,rootMargin:'0px 0px -36px 0px'});targets.forEach(el=>io.observe(el));}
 else targets.forEach(el=>el.classList.add('is-visible'));
 const hero=document.querySelector('.hero,.company-hero,.career-hero,.bpo-hero,.suit-hero,.lux-hero,.contact-hero');
 if(hero&&!reduce){hero.classList.add('vk-hero-ready');hero.querySelectorAll('h1,h2,.hero-content,.hero-inner,.hero-copy,.bpo-hero-content,.hero-actions,.eyebrow,.bpo-kicker,.contact-hero-copy').forEach((el,i)=>{el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:900,delay:100+i*110,easing:'cubic-bezier(.2,.75,.25,1)',fill:'both'})})}
 if(!reduce&&matchMedia('(pointer:fine)').matches){let raf=0;addEventListener('pointermove',e=>{if(raf)return;raf=requestAnimationFrame(()=>{const orb=document.querySelector('.vk-orb');if(orb){orb.style.left=(e.clientX-170)+'px';orb.style.top=(e.clientY-170)+'px'}raf=0})},{passive:true})}
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id&&id.length>1){const target=document.querySelector(id);if(target){e.preventDefault();target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})}}}));
})();
