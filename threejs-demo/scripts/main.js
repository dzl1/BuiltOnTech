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

// --- Mouse drag rotation logic ---
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let dragDelta = { x: 0, y: 0 };

renderer.domElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouse = { x: e.clientX, y: e.clientY };
    dragDelta = { x: 0, y: 0 };
});
renderer.domElement.addEventListener('mouseup', () => {
    isDragging = false;
});
renderer.domElement.addEventListener('mouseleave', () => {
    isDragging = false;
});
renderer.domElement.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;
    dragDelta.x += dx;
    dragDelta.y += dy;
    prevMouse = { x: e.clientX, y: e.clientY };
});


// Cube always rotates, but direction can be changed by mouse drag
let rotX = 0.01;
let rotY = 0.01;

function animate() {
    requestAnimationFrame(animate);
    // If a drag just happened, set rotation direction based on drag
    if (!isDragging && (dragDelta.x !== 0 || dragDelta.y !== 0)) {
        // Scale drag to reasonable rotation speed
        rotY = dragDelta.x * 0.005;
        rotX = dragDelta.y * 0.005;
        dragDelta = { x: 0, y: 0 };
    }
    cube.rotation.x += rotX;
    cube.rotation.y += rotY;
    renderer.render(scene, camera);
}
animate();
