// ============================
// MOBILE NAV
// ============================

const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');
const mobileNav = document.getElementById('mobileNav');

navToggle.addEventListener('click', () => mobileNav.classList.add('open'));
navClose.addEventListener('click', () => mobileNav.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ============================
// HERO PLAYER
// ============================

let playing = false;
let timeElapsed = 0;
const totalSeconds = 215; // 03:35
const heroPlayBtn = document.getElementById('heroPlay');
const heroPlayIcon = document.getElementById('heroPlayIcon');
const heroFill = document.getElementById('heroFill');
const heroHandle = document.getElementById('heroHandle');
const heroTimeEl = document.getElementById('heroTime');
let ticker;

function padZ(n) {
  return n < 10 ? '0' + n : '' + n;
}

function updatePlayerUI() {
  const pct = (timeElapsed / totalSeconds) * 100;
  heroFill.style.width = pct + '%';
  heroHandle.style.right = (100 - pct) + '%';
  const m = Math.floor(timeElapsed / 60);
  const s = timeElapsed % 60;
  heroTimeEl.textContent = padZ(m) + ':' + padZ(s);
}

heroPlayBtn.addEventListener('click', () => {
  playing = !playing;
  heroPlayIcon.className = playing ? 'fas fa-pause' : 'fas fa-play';
  if (playing) {
    ticker = setInterval(() => {
      timeElapsed = (timeElapsed + 1) % (totalSeconds + 1);
      updatePlayerUI();
    }, 1000);
  } else {
    clearInterval(ticker);
  }
});

document.getElementById('heroProgress').addEventListener('click', function (e) {
  const pct = e.offsetX / this.offsetWidth;
  timeElapsed = Math.round(pct * totalSeconds);
  updatePlayerUI();
});

// ============================
// TRACK LIST
// ============================

document.querySelectorAll('.track-item').forEach(item => {
  item.addEventListener('click', function () {
    // Reset all tracks
    document.querySelectorAll('.track-item').forEach(i => {
      i.querySelector('.track-play').innerHTML = '<i class="fas fa-play"></i>';
      i.querySelector('.track-mini-fill').style.width = '0%';
    });

    // Activate clicked track
    this.querySelector('.track-play').innerHTML = '<i class="fas fa-pause"></i>';

    const fill = this.querySelector('.track-mini-fill');
    fill.style.transition = 'none';
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.transition = 'width 8s linear';
      fill.style.width = '70%';
    }, 50);
  });
});

// ============================
// COUNTER ANIMATION
// ============================

const counters = document.querySelectorAll('.number[data-target]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const step = Math.ceil(target / 60);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 25);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ============================
// WAVEFORM ANIMATION
// ============================

const wf = document.getElementById('waveform');
if (wf) {
  for (let i = 0; i < 48; i++) {
    const bar = document.createElement('div');
    const h = 10 + Math.random() * 60;
    bar.style.cssText = `width:4px;background:#e8c84a;border-radius:2px;height:${h}px;opacity:${0.3 + Math.random() * 0.7};transition:height 0.4s ease;`;
    wf.appendChild(bar);
  }

  setInterval(() => {
    wf.querySelectorAll('div').forEach(bar => {
      bar.style.height = (10 + Math.random() * 60) + 'px';
    });
  }, 400);
}

// ============================
// NEWSLETTER FORM
// ============================

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = this.querySelector('input');
    const btn = this.querySelector('button');
    btn.textContent = 'Subscribed!';
    btn.style.background = '#4ade80';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3000);
  });
}

// ============================
// SMOOTH SCROLL
// ============================

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const id = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
