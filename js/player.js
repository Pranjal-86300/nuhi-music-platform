document.addEventListener("DOMContentLoaded", () => {
    const playBtn = document.getElementById("play-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const song = document.getElementById("song");
    const volumeSlider = document.getElementById("volume");
    const progressBar = document.getElementById("progress-bar");

    // Play/Pause Functionality
    playBtn.addEventListener("click", () => {
        song.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
    });

    pauseBtn.addEventListener("click", () => {
        song.pause();
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline-block";
    });

    // Volume Control
    volumeSlider.addEventListener("input", () => {
        song.volume = volumeSlider.value / 100;
    });

    // Progress Bar Updates
    song.addEventListener("timeupdate", () => {
        const progress = (song.currentTime / song.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Seek Functionality
    progressBar.addEventListener("click", (e) => {
        const newTime = (e.offsetX / progressBar.clientWidth) * song.duration;
        song.currentTime = newTime;
    });
});
