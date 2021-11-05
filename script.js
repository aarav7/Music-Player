
let audioElement = new Audio();
let progressBar = document.getElementById("myprogressBar");
let playBtn = document.getElementById("playBtn");
let songList = document.getElementsByClassName("songItem");
let playSongs = document.getElementsByClassName("playSong");
let bottom = document.getElementsByClassName("bottom");
let loopBtn = document.getElementById("loopBtn");
let songInfo = document.getElementsByClassName("songInfo");
let songId = 0;
let loop = 0;

let songs = [
    {
        songName: 'Warriyo - Mortals [NCS Release]',
        filePath: 'songs/1.mp3',
        coverPath: 'covers/1.jpg',
        time: '03:50'
    },
    {
        songName: 'Cielo - Huma-Huma',
        filePath: 'songs/2.mp3',
        coverPath: 'covers/2.jpg',
        time: '02:33'
    },
    {
        songName: 'DEAF KEV - Invincible [NCS Release]-320k',
        filePath: 'songs/3.mp3',
        coverPath: 'covers/3.jpg',
        time: '04:33'
    },
    {
        songName: 'Different Heaven & EH!DE - My Heart [NCS Release]',
        filePath: 'songs/4.mp3',
        coverPath: 'covers/4.jpg',
        time: '04:27'
    },
    {
        songName: 'Janji-Heroes-Tonight-feat-Johnning-NCS-Release',
        filePath: 'songs/5.mp3',
        coverPath: 'covers/5.jpg',
        time: '03:28'
    },
    {
        songName: 'Rabba - Salam-e-Ishq',
        filePath: 'songs/6.mp3',
        coverPath: 'covers/6.jpg',
        time: '03:28'
    },
    {
        songName: 'Sakhiyaan - Salam-e-Ishq',
        filePath: 'songs/7.mp3',
        coverPath: 'covers/7.jpg',
        time: '04:33'
    },
    {
        songName: 'Bhula Dena - Salam-e-Ishq',
        filePath: 'songs/8.mp3',
        coverPath: 'covers/8.jpg',
        time: '03:50'
    },
    {
        songName: 'Tumhari Kasam - Salam-e-Ishq',
        filePath: 'songs/9.mp3',
        coverPath: 'covers/9.jpg',
        time: '03:28'
    },
    {
        songName: 'Na Jaana - Salam-e-Ishq',
        filePath: 'songs/10.mp3',
        coverPath: 'covers/10.jpg',
        time: '04:27'
    }
]


for (i = 0; i < songList.length; i++) {
    songList[i].getElementsByTagName("img")[0].src = songs[i].coverPath;
    songList[i].getElementsByTagName("span")[0].innerHTML = songs[i].songName;
    songList[i].getElementsByClassName("time")[0].innerText = songs[i].time;
}

playBtn.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playBtn.classList.remove("fa-play-circle");
        playBtn.classList.add("fa-pause-circle");
        for (i = 0; i < playSongs.length; i++) {
            if (parseInt(playSongs[i].id) == songId) {
                playSongs[i].classList.remove("fa-play-circle");
                playSongs[i].classList.add("fa-pause-circle");
            }
        }
    }
    else {
        audioElement.pause();
        playBtn.classList.remove("fa-pause-circle");
        playBtn.classList.add("fa-play-circle");
        for (i = 0; i < playSongs.length; i++) {
            if (parseInt(playSongs[i].id) == songId) {
                playSongs[i].classList.remove("fa-pause-circle");
                playSongs[i].classList.add("fa-play-circle");
            }
        }
    }
})

audioElement.addEventListener("timeupdate", () => {
    progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress;
    var minutes = Math.floor(Math.floor(audioElement.currentTime) / 60);
    var seconds = Math.floor(audioElement.currentTime) - minutes * 60;
    if (minutes >= 10) {
        var mm = minutes;
    }
    else {
        var mm = `0${minutes}`;
    }
    if (seconds >= 10) {
        var ss = seconds;
    }
    else {
        var ss = `0${seconds}`;
    }
    songInfo[0].getElementsByTagName("span")[0].innerText = `${mm}:${ss}`;
})

progressBar.addEventListener("change", () => {
    audioElement.currentTime = (progressBar.value) * (audioElement.duration) / 100;
})

audioElement.addEventListener("ended", () => {
    playBtn.classList.remove("fa-pause-circle");
    playBtn.classList.add("fa-play-circle");
    progressBar.value = 0;
    if (loop == songId) {
        audioElement.play();
        playBtn.classList.remove("fa-play-circle");
        playBtn.classList.add("fa-pause-circle");
    }
    else {
        nextSong();
    }
})

for (i = 0; i < playSongs.length; i++) {
    playSongs[i].addEventListener("click", (e) => {

        if (!Array.from(e.target.classList).includes("fa-pause-circle")) {
            for (i = 0; i < playSongs.length; i++) {
                playSongs[i].classList.remove("fa-pause-circle");
                playSongs[i].classList.add("fa-play-circle");
            }
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            playBtn.classList.remove("fa-play-circle");
            playBtn.classList.add("fa-pause-circle");
            if (parseInt(e.target.id) == songId) {
                audioElement.play();
            }
            else {
                audioElement.src = `songs/${e.target.id}.mp3`;
                audioElement.play();
                songId = parseInt(e.target.id);
            }
        }
        else {
            audioElement.pause();
            e.target.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");
            playBtn.classList.remove("fa-pause-circle");
            playBtn.classList.add("fa-play-circle");
        }
        displayInfo();
        bottom[0].style.transform = "translateY(-15%)";
    })
}

function nextSong() {
    if (songId == 10) {
        songId = 1;
        audioElement.src = `songs/${songId.toString()}.mp3`;
        audioElement.load();
        audioElement.play();
        for (i = 0; i < playSongs.length; i++) {
            playSongs[i].classList.remove("fa-pause-circle");
            playSongs[i].classList.add("fa-play-circle");
        }
        for (i = 0; i < playSongs.length; i++) {
            if (parseInt(playSongs[i].id) == songId) {
                playSongs[i].classList.remove("fa-play-circle");
                playSongs[i].classList.add("fa-pause-circle");
            }
        }
        displayInfo();
    }
    else {
        songId += 1;
        audioElement.src = `songs/${songId.toString()}.mp3`;
        audioElement.play();
        for (i = 0; i < playSongs.length; i++) {
            playSongs[i].classList.remove("fa-pause-circle");
            playSongs[i].classList.add("fa-play-circle");
        }
        for (i = 0; i < playSongs.length; i++) {
            if (parseInt(playSongs[i].id) == songId) {
                playSongs[i].classList.remove("fa-play-circle");
                playSongs[i].classList.add("fa-pause-circle");
            }
        }
        displayInfo();
    }
    playBtn.classList.remove("fa-play-circle");
    playBtn.classList.add("fa-pause-circle");
}

function prevSong() {
    if (audioElement.currentTime <= 5 && audioElement.currentTime >= 0) {
        if (songId == 1) {
            songId = 10;
            audioElement.src = `songs/${songId.toString()}.mp3`;
            audioElement.play();
            for (i = 0; i < playSongs.length; i++) {
                playSongs[i].classList.remove("fa-pause-circle");
                playSongs[i].classList.add("fa-play-circle");
            }
            for (i = 0; i < playSongs.length; i++) {
                if (parseInt(playSongs[i].id) == songId) {
                    playSongs[i].classList.remove("fa-play-circle");
                    playSongs[i].classList.add("fa-pause-circle");
                }
            }
        }
        else {
            songId--;
            audioElement.src = `songs/${songId.toString()}.mp3`;
            audioElement.play();
            for (i = 0; i < playSongs.length; i++) {
                playSongs[i].classList.remove("fa-pause-circle");
                playSongs[i].classList.add("fa-play-circle");
            }
            for (i = 0; i < playSongs.length; i++) {
                if (parseInt(playSongs[i].id) == songId) {
                    playSongs[i].classList.remove("fa-play-circle");
                    playSongs[i].classList.add("fa-pause-circle");
                }
            }
        }
        displayInfo();
    }
    else {
        audioElement.src = `songs/${songId.toString()}.mp3`;
        audioElement.play();
    }
}

loopBtn.addEventListener("click", () => {
    if (!Array.from(loopBtn.classList).includes("loop")) {
        loop = songId;
        loopBtn.innerText = "repeat_on";
        loopBtn.style.color = "#8a4191";
        loopBtn.classList.add("loop");
    }
    else {
        loop = 0;
        loopBtn.innerText = "repeat";
        loopBtn.style.color = "#515c6f";
        loopBtn.classList.remove("loop");
    }
})

function displayInfo() {
    for (i = 0; i < playSongs.length; i++) {
        if (parseInt(playSongs[i].id) == songId) {
            songInfo[0].getElementsByClassName("sName")[0].innerText = playSongs[i].parentElement.previousElementSibling.innerText;
            songInfo[0].getElementsByTagName("span")[2].innerText = playSongs[i].previousElementSibling.innerText;
        }
    }
}

