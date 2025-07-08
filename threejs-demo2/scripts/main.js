import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

const container = document.getElementById('threejs-canvas-container');
const width = container.offsetWidth;
const height = container.offsetHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222233);

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Bouncing spheres
const spheres = [];
const sphereCount = 7;
const colors = [0xff4444, 0x44ff44, 0x4444ff, 0xffcc00, 0x00e6e6, 0xff66cc, 0xffffff];
for (let i = 0; i < sphereCount; i++) {
    const geometry = new THREE.SphereGeometry(0.5 + Math.random() * 0.3, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], metalness: 0.3, roughness: 0.5 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-3 + i, 0, 0);
    mesh.userData = {
        vy: 0.05 + Math.random() * 0.08,
        baseY: 0,
        phase: Math.random() * Math.PI * 2
    };
    spheres.push(mesh);
    scene.add(mesh);
}

function animate() {
    requestAnimationFrame(animate);
    const t = performance.now() * 0.001;
    for (let i = 0; i < spheres.length; i++) {
        const s = spheres[i];
        // Bouncing effect
        s.position.y = Math.abs(Math.sin(t * 1.5 + s.userData.phase)) * 2.2 - 1.1;
        // Gentle left-right sway
        s.position.x += Math.sin(t * 0.7 + i) * 0.002;
    }
    renderer.render(scene, camera);
}
animate();
