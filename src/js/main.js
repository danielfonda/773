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
// AUDIO PLAYER
// ============================

const audio = document.getElementById('audioPlayer');
const trackItems = document.querySelectorAll('.track-item[data-src]');
const playerTitle = document.getElementById('playerTitle');
const playerGenre = document.getElementById('playerGenre');
const playerIcon = document.getElementById('playerIcon');
const playerPlayPause = document.getElementById('playerPlayPause');
const playerFill = document.getElementById('playerFill');
const playerProgress = document.getElementById('playerProgress');
const playerCurrent = document.getElementById('playerCurrent');
const playerDuration = document.getElementById('playerDuration');
const playerPrev = document.getElementById('playerPrev');
const playerNext = document.getElementById('playerNext');
const playerMute = document.getElementById('playerMute');
const playerVolIcon = document.getElementById('playerVolIcon');
const playerVolume = document.getElementById('playerVolume');

let currentIndex = -1;

function formatTime(s) {
  if (!s || isNaN(s)) return '00:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return (m < 10 ? '0' + m : m) + ':' + (sec < 10 ? '0' + sec : sec);
}

function loadTrack(index, autoplay) {
  if (index < 0 || index >= trackItems.length) return;
  currentIndex = index;
  const item = trackItems[index];

  // Highlight active row
  trackItems.forEach(t => {
    t.classList.remove('active');
    t.querySelector('.track-play').innerHTML = '<i class="fas fa-play"></i>';
    t.querySelector('.track-mini-fill').style.width = '0%';
  });
  item.classList.add('active');

  // Set source
  audio.src = item.dataset.src;
  playerTitle.textContent = item.querySelector('.track-info h3').textContent;
  playerGenre.textContent = item.querySelector('.genre').textContent;
  playerFill.style.width = '0%';
  playerCurrent.textContent = '00:00';

  if (autoplay) {
    audio.play();
    playerIcon.className = 'fas fa-pause';
    item.querySelector('.track-play').innerHTML = '<i class="fas fa-pause"></i>';
  }
}

// Click a track row
trackItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    const wasPlaying = currentIndex === i && !audio.paused;
    if (wasPlaying) {
      audio.pause();
      playerIcon.className = 'fas fa-play';
      item.querySelector('.track-play').innerHTML = '<i class="fas fa-play"></i>';
    } else if (currentIndex === i) {
      audio.play();
      playerIcon.className = 'fas fa-pause';
      item.querySelector('.track-play').innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      loadTrack(i, true);
    }
  });
});

// Play/pause button
playerPlayPause.addEventListener('click', () => {
  if (currentIndex === -1) { loadTrack(0, true); return; }
  if (audio.paused) {
    audio.play();
    playerIcon.className = 'fas fa-pause';
    trackItems[currentIndex].querySelector('.track-play').innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playerIcon.className = 'fas fa-play';
    trackItems[currentIndex].querySelector('.track-play').innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Prev / Next
playerPrev.addEventListener('click', () => {
  if (currentIndex <= 0) loadTrack(trackItems.length - 1, true);
  else loadTrack(currentIndex - 1, true);
});
playerNext.addEventListener('click', () => {
  if (currentIndex >= trackItems.length - 1) loadTrack(0, true);
  else loadTrack(currentIndex + 1, true);
});

// Time update
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  playerFill.style.width = pct + '%';
  playerCurrent.textContent = formatTime(audio.currentTime);

  // Mini progress on active track
  if (currentIndex >= 0) {
    trackItems[currentIndex].querySelector('.track-mini-fill').style.width = pct + '%';
  }
});

// Duration loaded — update track row display
audio.addEventListener('loadedmetadata', () => {
  playerDuration.textContent = formatTime(audio.duration);
  if (currentIndex >= 0) {
    trackItems[currentIndex].querySelector('.track-duration').textContent = formatTime(audio.duration);
  }
});

// Seek via progress bar
playerProgress.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const pct = e.offsetX / playerProgress.offsetWidth;
  audio.currentTime = pct * audio.duration;
});

// Auto-next on end
audio.addEventListener('ended', () => {
  if (currentIndex < trackItems.length - 1) loadTrack(currentIndex + 1, true);
  else {
    playerIcon.className = 'fas fa-play';
    trackItems[currentIndex].querySelector('.track-play').innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Volume
playerVolume.addEventListener('input', () => {
  audio.volume = parseFloat(playerVolume.value);
  playerVolIcon.className = audio.volume === 0 ? 'fas fa-volume-mute' : 'fas fa-volume-up';
});

playerMute.addEventListener('click', () => {
  audio.muted = !audio.muted;
  playerVolIcon.className = audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
});

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
