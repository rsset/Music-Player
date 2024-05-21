const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-proggress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'asssets/Musics/Arctic_Monkeys -Do-I-Wanna-Know.mp3',
        displayName: 'Do I Wanna Know',
        cover: 'assets/Pics/Arctic_Monkeys -Do-I-Wanna-Know_pic.jpg',
        artist: 'Artic Monkeys',
    },
    {
        path: 'asssets/Musics/David_Kushner-Daylight.mp3',
        displayName: 'Daylight',
        cover: 'assets/Pics/David_Kushner-Daylight_pic.jpg',
        artist: 'David Kushner',
    },
    {
        path: 'asssets/Musics/RagnBone_Man -Human.mp3',
        displayName: 'Human',
        cover: 'assets/Pics/RagnBone_Man -Human_pic.jpg',
        artist: 'RagnBone Man',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if(isPlaying){
        pauseMusic();
    }
    else{
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hove tittle
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hove tittle
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime} = music;
    const proggressPercent = (currentTime / duration) * 100;
    progress.style.width = `${proggressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime,(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime,(currentTime % 60)}`;
}

function setProgressBar (e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);