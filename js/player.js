const audio = new Audio();
const playPauseBtn = document.getElementById('playPause');
const volumeControl = document.getElementById('volume');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-bar-container');
const songTitle = document.getElementById('songTitle');
const bgVideo = document.getElementById('bgVideo');
const shuffleBtn = document.getElementById('shuffle');
const nextSongBtn = document.getElementById('nextSong');
const themeToggle = document.getElementById('themeToggle');
const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration');


let isPlaying = false;
let currentSongIndex = 0;
let isDarkTheme = false;
const userName= localStorage.getItem('userName') || 'Guest';
const songs = {
    english: [
        {title: "Dusk Till Dawn", src: "songs/english1.mp3", clip: "english1.mp4"},
        {title: "Die with A Smile", src: "songs/english2.mp3", clip: "assets/clips/english2.mp4"},
        // Add more songs
    ],
    hindi: [
        {title: "Aye Mere Humsafar", src: "songs/hindi1.mp3", clip: "assets/clips/hindi1.mp4"},
        {title: "Do Pal", src: "songs/hindi2.mp3", clip: "assets/clips/hindi2.mp4"},
        // Add more songs
    ],
    punjabi: [
        {title: "Kina Chir", src: "songs/punjabi1.mp3", clip: "assets/clips/punjabi1.mp4"},
        {title: "Wakh Ho Jana", src: "songs/punjabi2.mp3", clip: "assets/clips/punjabi2.mp4"},
        // Add more songs
    ],
    bengali: [
        {title: "Song 1", src: "assets/songs/bengali1.mp3", clip: "assets/clips/bengali1.mp4"},
        {title: "Song 2", src: "assets/songs/bengali2.mp3", clip: "assets/clips/bengali2.mp4"},
        // Add more songs
    ]
    
    // Add punjabi and bengali songs
};

const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get('lang');
let playlist = songs[language] || songs.english;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function loadSong(index) {
    audio.src = playlist[index].src;
    songTitle.textContent = playlist[index].title;
    bgVideo.src = playlist[index].clip;
    songTitle.style.animation = 'fadeIn 0.5s';
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="material-icons">pause</i>';
    }
    isPlaying = !isPlaying;
    playPauseBtn.style.animation = 'buttonClick 0.3s';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
    nextSongBtn.style.animation = 'buttonClick 0.3s';
}

function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTime.textContent = formatTime(audio.currentTime);
    durationTime.textContent = formatTime(audio.duration);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function shufflePlaylist() {
    playlist.sort(() => Math.random() - 0.5);
    currentSongIndex = 0;
    loadSong(currentSongIndex);
    shuffleBtn.style.animation = 'buttonClick 0.3s';
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    themeToggle.style.animation = 'buttonClick 0.3s';
}

// Event Listeners
playPauseBtn.addEventListener('click', playPause);
nextSongBtn.addEventListener('click', nextSong);
volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    volumeControl.style.animation = 'buttonClick 0.3s';
});
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
shuffleBtn.addEventListener('click', shufflePlaylist);
themeToggle.addEventListener('click', toggleTheme);
audio.addEventListener('ended', nextSong);

// Initial load
loadSong(currentSongIndex);
audio.addEventListener('loadedmetadata', () => {
    durationTime.textContent = formatTime(audio.duration);
});
