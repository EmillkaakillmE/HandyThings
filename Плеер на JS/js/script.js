
document.querySelector('#play__btn').onclick = play;
document.querySelector('#pause__btn').onclick = pause;
document.querySelector('#stop__btn').onclick = stop;
document.querySelector('#speed-up__btn').onclick = speedUp;
document.querySelector('#speed-down__btn').onclick = speedDown;
document.querySelector('#speed-normal__btn').onclick = speedNormal;
document.querySelector('#volume__inp').oninput = videoVolume;

let video = document.querySelector('#video-player');;
let display;
let progress = document.querySelector('#progress');

//
video.ontimeupdate = progressUpdate;
progress.onclick = videoRewind;

function play() {
    video.play();
}

function pause() {
    video.pause();
}

function stop() {
    video.pause();
    video.currentTime = 0;
}

function speedUp() {
    video.play();
    video.playbackRate = 2;
}

function speedDown() {
    video.play();
    video.playbackRate = 0.5;
}

function speedNormal() {
    video.play();
    video.playbackRate = 1;
}

function videoVolume() {
    let v = this.value;
    // console.log(v);
    video.volume = v/100;
}

function progressUpdate() {
    progress.value = 100*(video.currentTime/video.duration);
}

function videoRewind() {
    let w = this.offsetWidth;
    let o = event.offsetX;
    this.value = (o/w)*100;
    video.pause();
    video.currentTime = video.duration * (o/w);
    video.play();
}