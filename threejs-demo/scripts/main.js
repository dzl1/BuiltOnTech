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


// --- Cube as group of faces for explosion effect ---
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x2a4d8f });
// Create 6 face meshes for explosion
const faceMaterials = [];
const faceMeshes = [];
const cubeGroup = new THREE.Group();
for (let i = 0; i < 6; i++) {
    faceMaterials[i] = material.clone();
    // Each face is a PlaneGeometry
    const face = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), faceMaterials[i]);
    // Position and orient each face
    switch (i) {
        case 0: face.position.z = 0.5; break; // front
        case 1: face.position.z = -0.5; face.rotation.y = Math.PI; break; // back
        case 2: face.position.y = 0.5; face.rotation.x = -Math.PI/2; break; // top
        case 3: face.position.y = -0.5; face.rotation.x = Math.PI/2; break; // bottom
        case 4: face.position.x = 0.5; face.rotation.y = -Math.PI/2; break; // right
        case 5: face.position.x = -0.5; face.rotation.y = Math.PI/2; break; // left
    }
    cubeGroup.add(face);
    faceMeshes.push(face);
}
scene.add(cubeGroup);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);


// --- Mouse drag movement logic ---

// --- Mouse drag rotation logic ---

let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let dragDelta = { x: 0, y: 0 };
let dragStartTime = 0;
let dragDuration = 0;
let dragDirection = { x: 0, y: 0 };
let dragActive = false;

renderer.domElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouse = { x: e.clientX, y: e.clientY };
    dragDelta = { x: 0, y: 0 };
    dragStartTime = Date.now();
    dragActive = false;
});
renderer.domElement.addEventListener('mouseup', () => {
    if (isDragging) {
        dragDuration = (Date.now() - dragStartTime) / 1000; // in seconds
        // If there was a drag, set direction and activate drag effect
        if (Math.abs(dragDelta.x) > 0.1 || Math.abs(dragDelta.y) > 0.1) {
            dragDirection = { x: dragDelta.x, y: dragDelta.y };
            dragActive = true;
            dragEffectTime = dragDuration * 2; // rotate for 2x drag duration
            dragEffectElapsed = 0;
        }
    }
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
let dragEffectTime = 0;
let dragEffectElapsed = 0;

function animate() {
    requestAnimationFrame(animate);

    // If drag effect is active, rotate in drag direction for the set time
    if (dragActive) {
        dragEffectElapsed += 1/60; // assuming ~60fps
        // Speed up rotation for drag effect, but not too fast
        const dragLen = Math.sqrt(dragDirection.x * dragDirection.x + dragDirection.y * dragDirection.y);
        const speed = Math.min(0.08, 0.01 + dragLen * 0.0025); // cap speed
        rotX = (dragDirection.y / (Math.abs(dragDirection.y) + Math.abs(dragDirection.x) + 1e-6)) * speed;
        rotY = (dragDirection.x / (Math.abs(dragDirection.y) + Math.abs(dragDirection.x) + 1e-6)) * speed;
        if (dragEffectElapsed >= dragEffectTime) {
            dragActive = false;
            rotX = baseRotX;
            rotY = baseRotY;
        }
    } else {
        rotX = baseRotX;
        rotY = baseRotY;
    }

    cubeGroup.rotation.x += rotX;
    cubeGroup.rotation.y += rotY;
    // Animate explosion if active
    if (exploding) {
        explosionElapsed += 1/60;
        let t = Math.min(1, explosionElapsed / explosionDuration);
        // Move faces outward
        for (let i = 0; i < 6; i++) {
            let mesh = faceMeshes[i];
            let dir = explosionDirs[i];
            mesh.position.set(dir.x * t * explosionDistance + dir.base.x, dir.y * t * explosionDistance + dir.base.y, dir.z * t * explosionDistance + dir.base.z);
        }
        if (explosionElapsed >= explosionDuration) {
            // Pause for 3 seconds, then start implosion
            if (!imploding && !explosionPaused) {
                explosionPaused = true;
                setTimeout(() => {
                    imploding = true;
                    explosionElapsed = 0;
                }, 3000);
            }
        }
    } else if (imploding) {
        explosionElapsed += 1/60;
        let t = 1 - Math.min(1, explosionElapsed / explosionDuration);
        for (let i = 0; i < 6; i++) {
            let mesh = faceMeshes[i];
            let dir = explosionDirs[i];
            mesh.position.set(dir.x * t * explosionDistance + dir.base.x, dir.y * t * explosionDistance + dir.base.y, dir.z * t * explosionDistance + dir.base.z);
        }
        if (explosionElapsed >= explosionDuration) {
            imploding = false;
            explosionPaused = false;
            // Reset positions
            for (let i = 0; i < 6; i++) {
                let mesh = faceMeshes[i];
                let dir = explosionDirs[i];
                mesh.position.set(dir.base.x, dir.base.y, dir.base.z);
            }
            // Resume rotation
            rotationPaused = false;
        }
    }
    renderer.render(scene, camera);
// --- Explosion logic ---
let rotationPaused = false;
let exploding = false;
let imploding = false;
let explosionPaused = false;
let explosionElapsed = 0;
let explosionDuration = 0.5; // seconds for explosion/implosion
let explosionDistance = 2; // how far faces move out
// Store base and direction for each face
const explosionDirs = [
    { x: 0, y: 0, z: 1, base: new THREE.Vector3(0,0,0.5) },   // front
    { x: 0, y: 0, z: -1, base: new THREE.Vector3(0,0,-0.5) }, // back
    { x: 0, y: 1, z: 0, base: new THREE.Vector3(0,0.5,0) },   // top
    { x: 0, y: -1, z: 0, base: new THREE.Vector3(0,-0.5,0) }, // bottom
    { x: 1, y: 0, z: 0, base: new THREE.Vector3(0.5,0,0) },   // right
    { x: -1, y: 0, z: 0, base: new THREE.Vector3(-0.5,0,0) }, // left
];

// Raycaster for double click
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
renderer.domElement.addEventListener('dblclick', (event) => {
    // Get mouse position in normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    // Check intersection with any face
    const intersects = raycaster.intersectObjects(faceMeshes);
    if (intersects.length > 0 && !exploding && !imploding && !explosionPaused) {
        // Pause rotation
        rotationPaused = true;
        exploding = true;
        explosionElapsed = 0;
    }
});

// Pause rotation in animate if needed
function animate() {
    requestAnimationFrame(animate);

    if (!rotationPaused) {
        // ...existing code for drag/rotation...
        if (dragActive) {
            dragEffectElapsed += 1/60; // assuming ~60fps
            const dragLen = Math.sqrt(dragDirection.x * dragDirection.x + dragDirection.y * dragDirection.y);
            const speed = Math.min(0.08, 0.01 + dragLen * 0.0025); // cap speed
            rotX = (dragDirection.y / (Math.abs(dragDirection.y) + Math.abs(dragDirection.x) + 1e-6)) * speed;
            rotY = (dragDirection.x / (Math.abs(dragDirection.y) + Math.abs(dragDirection.x) + 1e-6)) * speed;
            if (dragEffectElapsed >= dragEffectTime) {
                dragActive = false;
                rotX = baseRotX;
                rotY = baseRotY;
            }
        } else {
            rotX = baseRotX;
            rotY = baseRotY;
        }
        cubeGroup.rotation.x += rotX;
        cubeGroup.rotation.y += rotY;
    }
    // ...existing code for explosion/implosion and rendering...
    if (exploding) {
        explosionElapsed += 1/60;
        let t = Math.min(1, explosionElapsed / explosionDuration);
        for (let i = 0; i < 6; i++) {
            let mesh = faceMeshes[i];
            let dir = explosionDirs[i];
            mesh.position.set(dir.x * t * explosionDistance + dir.base.x, dir.y * t * explosionDistance + dir.base.y, dir.z * t * explosionDistance + dir.base.z);
        }
        if (explosionElapsed >= explosionDuration) {
            if (!imploding && !explosionPaused) {
                explosionPaused = true;
                setTimeout(() => {
                    imploding = true;
                    explosionElapsed = 0;
                }, 3000);
            }
        }
    } else if (imploding) {
        explosionElapsed += 1/60;
        let t = 1 - Math.min(1, explosionElapsed / explosionDuration);
        for (let i = 0; i < 6; i++) {
            let mesh = faceMeshes[i];
            let dir = explosionDirs[i];
            mesh.position.set(dir.x * t * explosionDistance + dir.base.x, dir.y * t * explosionDistance + dir.base.y, dir.z * t * explosionDistance + dir.base.z);
        }
        if (explosionElapsed >= explosionDuration) {
            imploding = false;
            explosionPaused = false;
            for (let i = 0; i < 6; i++) {
                let mesh = faceMeshes[i];
                let dir = explosionDirs[i];
                mesh.position.set(dir.base.x, dir.base.y, dir.base.z);
            }
            rotationPaused = false;
        }
    }
    renderer.render(scene, camera);
}
}
animate();
