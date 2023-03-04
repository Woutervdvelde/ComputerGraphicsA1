import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Controller } from './scripts/controls/Controller.js';
import { MapsController } from './scripts/controls/mapsController.js';
import { OrbitController } from './scripts/controls/orbitController.js';
import { loadStaticSceneObjects } from "./scripts/loaders/sceneLoader.js";

const loadingScreen = document.getElementById("loading_screen");

// Create scene
const scene = new THREE.Scene();
window.scene = scene;

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

camera.position.x = 0;
camera.position.y = 100;
camera.position.z = 0;

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.LinearEncoding;

document.body.appendChild(renderer.domElement);

// Add HDRI skybox
new RGBELoader()
    .load("textures/hdri/grassland.hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    });

loadStaticSceneObjects(scene);

// Camera positions for the MapsController
const defaultHeight = 1.8;
const cameraPositions = [
    new THREE.Vector3(0, defaultHeight, 0),
    new THREE.Vector3(10, defaultHeight, 0),
    new THREE.Vector3(20, defaultHeight, 0),
    new THREE.Vector3(30, defaultHeight, 0),
    new THREE.Vector3(40, defaultHeight, 0),
    new THREE.Vector3(-10, defaultHeight, 0),
    new THREE.Vector3(-20, defaultHeight, 0),
    new THREE.Vector3(-30, defaultHeight, 0),
    new THREE.Vector3(-40, defaultHeight, 0),
    new THREE.Vector3(-50, defaultHeight, 0),
];

/**
 * Some objects need some time to load when the camera first looks at them.
 * This is a workaround to make sure objects are loaded before the user can interact with the scene.
 */
camera.lookAt(scene.position);
renderer.render(scene, camera);

let controls = new Controller(scene, camera, renderer);
setTimeout(() => {
    controls = new MapsController(scene, camera, renderer, cameraPositions);
    loadingScreen.style.opacity = 0;
}, 5000);


// Render loop
const clock = new THREE.Clock();
const animate = function () {
    requestAnimationFrame(animate);
    controls.update(clock.getDelta());
    renderer.render(scene, camera);
}
animate();

window.onkeydown = (e) => {
    if (e.key == "Escape") {
        controls.dispose();
        controls = new OrbitController(scene, camera, renderer);
    }
}