// Basic interactivity: floating nav show on scroll, reveal animations, audio/play reset using speechSynthesis, wave animation toggle

// small utils
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Floating nav show after scrolling a bit
  const floatNav = document.querySelector('.floating-nav');
  let floated = false;
  window.addEventListener('scroll', () => {
    if (!floated && window.scrollY > 240) {
      floatNav.classList.add('show');
      floated = true;
    } else if (floated && window.scrollY < 140) {
      floatNav.classList.remove('show');
      floated = false;
    }
  });

  // IntersectionObserver for reveal elements
  const reveals = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => io.observe(r));

  // Wave / audio using SpeechSynthesis for a small guided reset
  const wave = document.getElementById('wave');
  const playBtn = document.getElementById('play-reset');
  const audioPlayBtn = document.getElementById('audio-play');

  function startWave(){
    wave.classList.add('playing');
  }
  function stopWave(){
    wave.classList.remove('playing');
  }

  // Guided text
  const guidedText = `Find a comfortable position. Close your eyes if that feels safe.
  Inhale gently for four counts. Hold for two. Exhale slowly for six.
  Repeat two more times. When you're ready, open your eyes and notice one small change in your mind.`;

  function playGuided(){
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser. Try Chrome, Edge, or Safari.');
      return;
    }

    // Cancel any existing
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(guidedText);
    utter.rate = 0.95;
    utter.pitch = 1.0;
    utter.lang = 'en-US';

    utter.onstart = startWave;
    utter.onend = stopWave;
    utter.onerror = stopWave;

    window.speechSynthesis.speak(utter);
  }

  playBtn.addEventListener('click', playGuided);
  audioPlayBtn.addEventListener('click', playGuided);

  // Smooth link behavior for anchor links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:'smooth',block:'center'});
      }
    });
  });

  // tiny accessible enhancement: allow space/enter activation on pill buttons
  $$('.pill-btn').forEach(btn => {
    btn.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        btn.click();
      }
    });
  });

  // Small touch: subtle parallax effect for hero ripple based on pointer
  const hero = document.querySelector('.hero');
  const ripple = document.querySelector('.hero-ripple');
  if (hero && ripple && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      // translate ripple slightly
      ripple.style.transform = `translate3d(${(x-0.5)*30}px, ${(y-0.5)*18}px, 0)`;
    });
    hero.addEventListener('pointerleave', () => {
      ripple.style.transform = '';
    });
  }
});