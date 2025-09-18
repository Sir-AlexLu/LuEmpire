// set year
document.getElementById('year').textContent = new Date().getFullYear();

// typed headline
(function typed(){
  const el = document.getElementById('typed');
  const phrases = ['Order.', 'Power.', 'Legacy.'];
  let i = 0, j = 0, forward = true;
  function tick(){
    const current = phrases[i];
    if(forward){
      j++;
      el.textContent = current.slice(0,j);
      if(j === current.length){ forward = false; setTimeout(tick,900); return; }
    } else {
      j--;
      el.textContent = current.slice(0,j);
      if(j === 0){ forward = true; i = (i+1) % phrases.length; setTimeout(tick,300); return; }
    }
    setTimeout(tick, 80 + Math.random()*40);
  }
  tick();
})();

// simple reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show') }
  });
}, {threshold:0.12});
revealEls.forEach(el=>obs.observe(el));

// tilt effect for .feature and throne
function addTilt(el, strength = 12) { // Reduced strength for subtler effect
  let rect = null;
  function update(e){
    rect = rect || el.getBoundingClientRect();
    const x = ( ('touches' in e && e.touches[0]) ? e.touches[0].clientX : e.clientX ) - rect.left;
    const y = ( ('touches' in e && e.touches[0]) ? e.touches[0].clientY : e.clientY ) - rect.top;
    const cx = rect.width/2, cy = rect.height/2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    el.style.transform = `perspective(800px) rotateX(${ -dy * strength }deg) rotateY(${ dx * strength }deg) translateZ(4px)`;
  }
  function reset(){ el.style.transform = ''; }
  el.addEventListener('mousemove', update);
  el.addEventListener('touchmove', update, {passive:true});
  el.addEventListener('mouseleave', reset);
  el.addEventListener('touchend', reset);
}
document.querySelectorAll('[data-tilt]').forEach(el=>addTilt(el, 6));
addTilt(document.getElementById('throne'), 4);

// cta
function ctaPrimary(){
  const btn = event.target;
  btn.animate(
    [{transform:'scale(1)'},{transform:'scale(0.96)'},{transform:'scale(1)'}],
    {duration:420}
  );

  const msg = document.createElement('div');
  msg.style.position = 'fixed';
  msg.style.left = '50%';
  msg.style.top = '14%';
  msg.style.transform = 'translateX(-50%)';
  msg.style.padding = '12px 16px';
  
  // 🔥 Dark background with subtle gradient
  msg.style.background = 'linear-gradient(135deg, #0f172a, #1e293b)';
  msg.style.border = '1px solid rgba(255,255,255,0.08)';
  msg.style.borderRadius = '10px';
  msg.style.boxShadow = '0 8px 32px rgba(0,0,0,0.7)';
  
  // Text
  msg.style.color = 'var(--accent-2)'; // golden or accent color
  msg.style.fontWeight = 700;
  msg.style.fontSize = '0.875rem';
  
  msg.style.zIndex = 9999;
  msg.style.opacity = 0;
  msg.style.transition = 'opacity 300ms';

  msg.textContent = 'Charter request received — A decree will be issued.';

  document.body.appendChild(msg);

  setTimeout(() => msg.style.opacity = 1, 100);
  setTimeout(() => msg.style.opacity = 0, 1800);
  setTimeout(() => document.body.removeChild(msg), 2500);
}

// accessibility: keyboard shortcut "g" to go to about
document.addEventListener('keydown',(e)=>{ if(e.key.toLowerCase()==='g'){ document.getElementById('about').scrollIntoView({behavior:'smooth'}) } });

// lazy paint for float-dot
window.requestAnimationFrame(()=> {
  document.querySelector('.float-dot').style.display = 'block';
});

// Back to top button
const backToTop = document.createElement('button');
backToTop.classList.add('back-to-top');
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTop.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// Subtle parallax on visual (desktop only)
if (window.innerWidth > 880) {
  const visual = document.querySelector('.visual');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    visual.style.transform = `translateY(${scrollPos * 0.08}px)`; // Subtler parallax
  });
}
