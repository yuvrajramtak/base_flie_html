console.log("Welcome to Spotify");

// Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songList = document.getElementById('songList');

let songs = [
  { songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
];

// Create UI
songs.forEach((song, index) => {
  let item = document.createElement('div');
  item.classList.add('songItem');
  item.innerHTML = `
    <img src="${song.coverPath}" />
    <span class="songName">${song.songName}</span>
    <i class="fa-regular fa-circle-play songItemPlay" id="${index}"></i>
  `;
  songList.appendChild(item);
});

// Update master song
const updateMasterSong = () => {
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  makeAllPlays();
  document.getElementById(songIndex).classList.remove('fa-circle-play');
  document.getElementById(songIndex).classList.add('fa-circle-pause');
};

// Play/Pause Master Button
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    updateMasterSong();
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
    makeAllPlays();
  }
});

// Progress Bar update
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all song play icons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((el) => {
    el.classList.remove('fa-circle-pause');
    el.classList.add('fa-circle-play');
  });
};

// Individual song play
document.querySelectorAll('.songItemPlay').forEach((el) => {
  el.addEventListener('click', (e) => {
    songIndex = parseInt(e.target.id);
    updateMasterSong();
  });
});

// Next/Previous
document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  updateMasterSong();
});

document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  updateMasterSong();
});

// Auto reset after song ends
audioElement.addEventListener('ended', () => {
  gif.style.opacity = 0;
  masterPlay.classList.remove('fa-circle-pause');
  masterPlay.classList.add('fa-circle-play');
  makeAllPlays();
});
