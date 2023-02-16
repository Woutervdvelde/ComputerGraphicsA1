import { loadSceneObjects } from "./sceneLoader.js";

// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

camera.position.x = 0;
camera.position.y = 1;
camera.position.z = 0;

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add light
const light = new THREE.DirectionalLight(0xdddddd, 1);
light.position.set(0, 1, 1);
scene.add(light);

// Load all scene objects
loadSceneObjects(scene);

const clock = new THREE.Clock();
const render = function () {
    requestAnimationFrame(render);
    controls.update(); //update for auto-rotation
    renderer.render(scene, camera);
}
render();
