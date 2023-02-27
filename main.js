import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { loadStaticSceneObjects } from "./scripts/loaders/sceneLoader.js";

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
camera.position.y = 1.8;
camera.position.z = 0;

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.LinearEncoding;

document.body.appendChild(renderer.domElement);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// const fpc = new FirstPersonControls(camera, renderer.domElement);
// fpc.constrainVertical = true;
// fpc.heightMax = 1.8;
// fpc.heightMin = 1.8;
// fpc.lookSpeed = 0.1;

// Add HDRI skybox
new RGBELoader()
    .load("textures/hdri/grassland.hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    });

loadStaticSceneObjects(scene);

// Render loop
const clock = new THREE.Clock();
const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    // fpc.update(clock.getDelta());
    // camera.position.y = 1.8;
    renderer.render(scene, camera);
}
animate();