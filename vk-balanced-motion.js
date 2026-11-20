
/* VERSION-K balanced motion: purposeful, restrained and accessible */
(() => {
 const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.documentElement.classList.add('vk-motion-ready');
 const targets = [
  'main > section:not(.hero):not(.bpo-hero)',
  '.bpo-service','.flow-item','.career-values article','.career-flow article',
  '.clean-value','.business-card','.business-gallery figure',
  '.service-card','.value-card','.feature-card','.support-card','.card'
 ].join(',');
 const nodes = [...document.querySelectorAll(targets)];
 if (reduce || !('IntersectionObserver' in window)) {
   nodes.forEach(n => n.classList.add('vk-visible'));
   return;
 }
 nodes.forEach((n,i) => {
   n.classList.add('vk-reveal');
   if (n.matches('article,figure,.bpo-service,.flow-item')) n.style.setProperty('--vk-delay', `${(i%4)*70}ms`);
 });
 const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
   if(e.isIntersecting){e.target.classList.add('vk-visible');io.unobserve(e.target)}
  });
 },{threshold:.12,rootMargin:'0px 0px -36px 0px'});
 nodes.forEach(n=>io.observe(n));
 // Header gains subtle depth after the first scroll.
 document.querySelectorAll('.vk-mobile-menu').forEach(btn=>{
  const nav=btn.nextElementSibling;
  if(!nav) return;
  btn.addEventListener('click',()=>{
   const open=nav.classList.toggle('open');
   btn.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
   nav.classList.remove('open');btn.setAttribute('aria-expanded','false');
  }));
 });
 const headers = document.querySelectorAll('.header,.site-header,.bpo-header,.suit-header');
 const tick = () => headers.forEach(h=>h.classList.toggle('vk-scrolled',window.scrollY>18));
 tick(); window.addEventListener('scroll',tick,{passive:true});
})();
