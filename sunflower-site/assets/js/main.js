/* =============================================
   Main JS — Sunflower & Honeybee Site
   Music, Navigation, Utilities, GSAP helpers
   ============================================= */

/* ---- YouTube IFrame API Music Player ---- */
const MusicPlayer = (() => {
  let player = null;
  let ready = false;
  let muted = false;
  let startedOnce = false;

  // Load YouTube IFrame API
  function loadAPI() {
    if (document.getElementById('yt-api-script')) return;
    const tag = document.createElement('script');
    tag.id = 'yt-api-script';
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }

  // Called by YouTube API when ready
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('yt-player', {
      height: '1',
      width: '1',
      videoId: '3tmd-ClpJxA', // "Sunflower" by Post Malone & Swae Lee
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: '3tmd-ClpJxA',
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (e) => {
          ready = true;
          e.target.setVolume(35);
          // Auto-play after brief delay if user already interacted
          if (startedOnce) e.target.playVideo();
        },
        onStateChange: (e) => {
          // If ended (shouldn't with loop, but just in case)
          if (e.data === YT.PlayerState.ENDED) {
            player.playVideo();
          }
        },
      },
    });
  };

  function play() {
    if (!player || !ready) {
      startedOnce = true;
      return;
    }
    player.playVideo();
    player.unMute();
    muted = false;
    updateToggleBtn();
  }

  function toggleMute() {
    if (!player || !ready) return;
    if (muted) {
      player.unMute();
      player.setVolume(35);
      muted = false;
    } else {
      player.mute();
      muted = true;
    }
    updateToggleBtn();
  }

  function updateToggleBtn() {
    const btn = document.getElementById('music-toggle');
    if (!btn) return;
    btn.textContent = muted ? '🔇' : '🎵';
    btn.classList.toggle('muted', muted);
    btn.setAttribute('aria-label', muted ? 'Unmute music' : 'Mute music');
  }

  function init() {
    loadAPI();
    const btn = document.getElementById('music-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!startedOnce) {
          startedOnce = true;
          play();
        } else {
          toggleMute();
        }
      });
    }
  }

  return { init, play, toggleMute };
})();


/* ---- Fade-In on Scroll Observer ---- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.fade-in, .reason-card');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}


/* ---- Stars Background Generator ---- */
function generateStars(containerId, count = 60) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = 1 + Math.random() * 3;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --dur: ${2 + Math.random() * 4}s;
      --delay: ${Math.random() * 4}s;
      opacity: ${0.1 + Math.random() * 0.9};
    `;
    container.appendChild(star);
  }
}


/* ---- Heart Burst on Click ---- */
function spawnClickHeart(e) {
  const heart = document.createElement('span');
  heart.className = 'heart-burst';
  heart.textContent = ['💛', '🌻', '❤️', '✨', '🐝'][Math.floor(Math.random() * 5)];
  heart.style.left = (e.clientX - 20) + 'px';
  heart.style.top = (e.clientY - 20) + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}


/* ---- Typewriter Effect ---- */
function typewrite(element, text, speed = 55, callback) {
  if (!element) return;
  element.textContent = '';
  element.style.opacity = '1';
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      element.classList.add('done');
      if (callback) setTimeout(callback, 400);
    }
  }, speed);
}


/* ---- Page Transition ---- */
function navigateTo(url, delay = 600) {
  document.body.style.transition = 'opacity 0.6s ease';
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = url; }, delay);
}


/* ---- Page Entrance Fade ---- */
function pageEntrance() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.8s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
}


/* ---- GSAP Honeybee Wander Animation (Landing page) ---- */
function animateBeeWander(beeEl, flowers, onComplete) {
  if (!window.gsap || !beeEl) return;
  const tl = gsap.timeline({ onComplete });

  // Start off-screen left
  gsap.set(beeEl, { x: -120, y: window.innerHeight * 0.3, opacity: 1 });

  // Fly in and visit each "nope" flower
  flowers.forEach((flower, i) => {
    const rect = flower.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2 - 50;
    const targetY = rect.top + rect.top * 0.1 - 80;

    tl.to(beeEl, {
      x: targetX,
      y: targetY,
      duration: 1.2,
      ease: 'power1.inOut',
    })
    .to(beeEl, { y: targetY - 15, duration: 0.3, ease: 'power1.out', yoyo: true, repeat: 1 })
    .to(flower, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.out' }, '<')
    .call(() => {
      // Show "nope" shake on bee
      gsap.to(beeEl, { rotation: -10, duration: 0.1, yoyo: true, repeat: 5 });
      flower.classList.add('rejected');
    })
    .to(beeEl, { y: targetY - 40, duration: 0.4, ease: 'power1.out' }, '+=0.2');
  });

  return tl;
}


/* ---- GSAP Bee Fly to Sunflower ---- */
function animateBeeToSunflower(beeEl, sunflowerEl, onComplete) {
  if (!window.gsap || !beeEl || !sunflowerEl) return;
  const sfRect = sunflowerEl.getBoundingClientRect();
  const targetX = sfRect.left + sfRect.width / 2 - 50;
  const targetY = sfRect.top + sfRect.height * 0.2 - 50;

  const tl = gsap.timeline({ onComplete });

  tl.to(beeEl, {
    x: targetX,
    y: targetY,
    duration: 1.4,
    ease: 'power2.inOut',
  })
  .to(beeEl, {
    scale: 1.3,
    duration: 0.3,
    ease: 'back.out(2)',
  })
  // Show heart eyes on bee
  .call(() => {
    const heartEyes = beeEl.querySelectorAll('#heart-eyes, #heart-eyes2');
    const normalEyes = beeEl.querySelectorAll('circle[fill="#1a1a2e"]');
    heartEyes.forEach(el => gsap.to(el, { opacity: 1, duration: 0.3 }));
    normalEyes.forEach(el => gsap.to(el, { opacity: 0, duration: 0.3 }));
    const blushMarks = beeEl.querySelectorAll('.blush-mark');
    blushMarks.forEach(el => gsap.to(el, { opacity: 0.7, duration: 0.4 }));
  })
  // Sunflower blushes
  .to(sunflowerEl.querySelectorAll('#blush-extra-l, #blush-extra-r'), {
    opacity: 0.6,
    duration: 0.5,
  }, '<');

  return tl;
}


/* ---- Chapter 1: Meet Animation ---- */
function animateMeet(beeEl, sfEl) {
  if (!window.gsap) return;

  // Position bee on left, sunflower on right
  gsap.set(beeEl, { x: -200, opacity: 0 });
  gsap.set(sfEl, { x: 200, opacity: 0 });

  const tl = gsap.timeline();
  tl.to(beeEl, { x: 0, opacity: 1, duration: 1.2, ease: 'power2.out' })
    .to(sfEl, { x: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.8')
    // Bee looks at sunflower (slight tilt)
    .to(beeEl, { rotation: 15, duration: 0.4, ease: 'power1.inOut', yoyo: true, repeat: 1 })
    // Sunflower waves
    .to(sfEl.querySelector && sfEl.querySelector('#wave-arm'), {
      rotation: 20,
      transformOrigin: '0% 100%',
      duration: 0.3,
      yoyo: true,
      repeat: 3,
      ease: 'sine.inOut',
    }, '-=0.4');

  return tl;
}


/* ---- Question Page: Wish Reveal ---- */
function animateWishReveal(wishEl, wishSubEl, callback) {
  if (!wishEl) return;
  const tl = window.gsap ? gsap.timeline({ onComplete: callback }) : null;

  if (tl) {
    tl.to(wishEl, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.5 })
      .to(wishSubEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3');
  } else {
    setTimeout(() => {
      wishEl.style.opacity = '1';
      wishEl.style.transform = 'translateY(0)';
      if (wishSubEl) wishSubEl.style.opacity = '1';
      if (callback) setTimeout(callback, 1000);
    }, 500);
  }
}


/* ---- Celebration: Confetti + Dance ---- */
function triggerCelebration(particles) {
  // Trigger particle celebration
  if (particles) particles.start('celebration');

  // Canvas confetti (library)
  if (window.confetti) {
    const end = Date.now() + 4000;
    const colors = ['#FFF778', '#022658', '#F5C518', '#ff6b9d', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
}


/* ---- Easter Egg: Bee Dance ---- */
function initEasterEgg(beeEl) {
  if (!beeEl || !window.gsap) return;
  let clickCount = 0;
  beeEl.style.cursor = 'pointer';
  beeEl.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 3) {
      clickCount = 0;
      gsap.to(beeEl, {
        rotation: 360,
        scale: 1.4,
        duration: 0.5,
        ease: 'back.out(3)',
        yoyo: true,
        repeat: 3,
        onComplete: () => gsap.set(beeEl, { rotation: 0, scale: 1 }),
      });
    }
  });
}


/* ---- Init on DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  pageEntrance();
  MusicPlayer.init();
  initScrollReveal();

  // Click hearts anywhere
  document.addEventListener('click', spawnClickHeart);

  // Progress stem
  const stem = document.querySelector('.progress-stem');
  const flowerIcon = document.querySelector('.progress-flower');
  if (stem && flowerIcon) {
    const updateProgress = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const height = Math.min(100, Math.round(scrollPct * 100));
      stem.style.height = height + 'vh';
      flowerIcon.style.bottom = height + 'vh';
    };
    window.addEventListener('scroll', updateProgress);
    updateProgress();
  }
});

// Expose globals
window.MusicPlayer = MusicPlayer;
window.typewrite = typewrite;
window.navigateTo = navigateTo;
window.generateStars = generateStars;
window.animateBeeWander = animateBeeWander;
window.animateBeeToSunflower = animateBeeToSunflower;
window.animateMeet = animateMeet;
window.animateWishReveal = animateWishReveal;
window.triggerCelebration = triggerCelebration;
window.initEasterEgg = initEasterEgg;
