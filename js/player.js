const audio = document.getElementById('main-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const seekBar = document.getElementById('seek-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');

const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

let isPlaying = false;

function loadAndPlayTrack(url, title, artist) {
    audio.src = url;
    trackTitle.textContent = title;
    trackArtist.textContent = artist;
    audio.play();
    isPlaying = true;
    updatePlayIcon();
}

function togglePlay() {
    if (!audio.src) return;
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayIcon();
}

function updatePlayIcon() {
    playPauseBtn.innerHTML = isPlaying ? '<i data-lucide="pause"></i>' : '<i data-lucide="play"></i>';
    lucide.createIcons();
}

playPauseBtn.addEventListener('click', togglePlay);

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

seekBar.addEventListener('input', () => {
    const time = (seekBar.value / 100) * audio.duration;
    audio.currentTime = time;
});

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
});

audio.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayIcon();
    seekBar.value = 0;
    currentTimeEl.textContent = "00:00";
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}
