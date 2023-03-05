import * as THREE from 'three';
import { GUI } from './scripts/gui.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Controller } from './scripts/controls/controller.js';
import { MapsController } from './scripts/controls/mapsController.js';
import { OrbitController } from './scripts/controls/orbitController.js';
import { loadStaticSceneObjects } from "./scripts/loaders/sceneLoader.js";
import Stats from 'three/addons/libs/stats.module.js';
import { followBehaviour, wanderBehaviour } from './scripts/entity/horse.js';

const loadingScreen = document.getElementById("loading_screen");

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

camera.position.x = 0;
camera.position.y = 500;
camera.position.z = 0;

// Create scene
const scene = new THREE.Scene();
// Creating an array to store all the entities in the scene
scene.entities = [];
scene.camera = camera;
window.scene = scene;

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

// Add GUI
const settings = [
    {
        name: "Controls",
        icon: "<img src='images/move.svg'/>",
        options: [
            {
                name: "street view",
                subtitle: "recommended",
                icon: "<img src='images/location_on.svg'/>",
                action: () => {
                    controls.dispose();
                    controls = new MapsController(scene, camera, renderer, cameraPositions);
                },
                selected: true
            },
            {
                name: "orbit",
                icon: "<img src='images/orbit.svg'/>",
                action: () => {
                    controls.dispose();
                    controls = new OrbitController(scene, camera, renderer);
                },
                selected: false
            }
        ]
    },
    {
        name: "Toggle FPS",
        icon: "<img src='images/timer.svg'/>",
        action: () => {
            stats.dom.style.display = stats.dom.style.display === "none" ? "block" : "none";
        }
    },
    {
        name: "Horse behaviour",
        icon: "<img src='images/run.svg'/>",
        options: [
            {
                name: "wander",
                icon: "<img src='images/random.svg'/>",
                action: () => {
                    scene.entities.forEach(entity => entity.setBehaviour(wanderBehaviour));
                },
                selected: true
            },
            {
                name: "follow",
                icon: "<img src='images/near_me.svg'/>",
                action: () => {
                    scene.entities.forEach(entity => entity.setBehaviour(followBehaviour));
                },
                selected: false
            }
        ]
    }
]
new GUI(settings);

const stats = new Stats();
document.body.appendChild(stats.dom);
stats.dom.style.display = "none";


// Render loop
const clock = new THREE.Clock();
const animate = function () {
    const delta = clock.getDelta();

    controls.update(delta);
    renderer.render(scene, camera);
    stats.update();
    scene.entities.forEach(entity => entity.update(delta));
    requestAnimationFrame(animate);
}
animate();