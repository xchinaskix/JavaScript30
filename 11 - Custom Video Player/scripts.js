// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const sliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

console.dir(video);

// add play/pause method
function playerToggle() {
    const state = video.paused ? 'play' : 'pause';
    video[state]();
}

function updateButton() {
    const state = video.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
    toggle.innerHTML = state;
}

function skip() {
    video.currentTime += +this.dataset.skip;
}

function rangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const prog = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${prog}%`;
}

function scrub(e) {
    const percent = (e.offsetX / progress.offsetWidth) * 100;
    const time = (percent * video.duration) / 100;
    video.currentTime = time;

} 

// hook event listeners
video.addEventListener('click', playerToggle);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', playerToggle);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
sliders.forEach(slider => slider.addEventListener('change', rangeUpdate));

let draggin = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => draggin && scrub(e));

progress.addEventListener('mousedown', () => draggin = true);
progress.addEventListener('mouseup', () => draggin = false);

