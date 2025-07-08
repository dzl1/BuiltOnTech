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

// Physics-based rotation
let baseRotX = 0.01;
let baseRotY = 0.01;
let rotX = baseRotX;
let rotY = baseRotY;
let velocityX = 0;
let velocityY = 0;
let easing = 0.96; // friction/easing factor

function animate() {
    requestAnimationFrame(animate);
    // If a drag just happened, set velocity based on drag
    if (!isDragging && (dragDelta.x !== 0 || dragDelta.y !== 0)) {
        // Set velocity proportional to drag distance
        velocityY = dragDelta.x * 0.01; // higher for more effect
        velocityX = dragDelta.y * 0.01;
        dragDelta = { x: 0, y: 0 };
    }
    // Apply velocity to rotation
    rotX = baseRotX + velocityX;
    rotY = baseRotY + velocityY;
    // Ease velocity back to zero
    velocityX *= easing;
    velocityY *= easing;
    // If velocity is very small, reset to base
    if (Math.abs(velocityX) < 0.0001) velocityX = 0;
    if (Math.abs(velocityY) < 0.0001) velocityY = 0;

    cube.rotation.x += rotX;
    cube.rotation.y += rotY;
    renderer.render(scene, camera);
}
animate();
