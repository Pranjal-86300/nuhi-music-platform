import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.136/build/three.module.js";

// Setup Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

camera.position.set(0, 0, 5); // Ensure particles appear in the center
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-1"; // Make sure it's behind everything
document.body.appendChild(renderer.domElement);

// Create Particles
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20; // Increase spread
}

particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0x0077ff, // Light blue glow effect
    size: 0.2,
    transparent: true,
    opacity: 0.8
});

const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);
camera.position.set(0, 0, 5);

// 🎵 Audio Setup (Reacting to Music Beat for ANY Song)
function setupAudioContext(audioElement) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);

    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;

    return analyser;
}

// 🎶 Detect Any Song Playing
function listenToSongs() {
    document.querySelectorAll(".audio-player").forEach(audio => {
        audio.addEventListener("play", () => {
            const analyser = setupAudioContext(audio);
            animateVisuals(analyser);
        });
    });
}

// 🌀 Animate Particles Based on Music
function animateVisuals(analyser) {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function animate() {
        requestAnimationFrame(animate);
        analyser.getByteFrequencyData(dataArray);

        let bassIntensity = dataArray[0] / 255; // Detect bass level

        // 🔹 Particle Interactivity
        particleSystem.rotation.y += bassIntensity * 0.03;
        material.opacity = 0.4 + bassIntensity * 0.6;
        
        // 🎶 Beat-Pulse Effect (Subtle Scale Animation)
        particleSystem.scale.set(1 + bassIntensity * 0.1, 1 + bassIntensity * 0.1, 1);
        
        renderer.render(scene, camera);
    }

    animate();
}

// 🚀 Start Listening for Song Changes
listenToSongs();
