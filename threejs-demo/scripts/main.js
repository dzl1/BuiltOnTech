// Basic Three.js demo setup
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

const container = document.getElementById('threejs-canvas-container');
const width = container.offsetWidth;
const height = container.offsetHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f4fa);

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x2a4d8f });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);


// --- Mouse drag movement logic ---
let isDragging = false;
let prevMouse = { x: 0, y: 0 };

renderer.domElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouse = { x: e.clientX, y: e.clientY };
});
renderer.domElement.addEventListener('mouseup', () => {
    isDragging = false;
});
renderer.domElement.addEventListener('mouseleave', () => {
    isDragging = false;
});
renderer.domElement.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = (e.clientX - prevMouse.x) / width * 5; // scale factor for movement
    const dy = -(e.clientY - prevMouse.y) / height * 5;
    cube.position.x += dx;
    cube.position.y += dy;
    prevMouse = { x: e.clientX, y: e.clientY };
});

function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
