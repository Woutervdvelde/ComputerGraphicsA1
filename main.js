import * as THREE from 'three';
import { GUI } from './scripts/gui.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Controller } from './scripts/controls/controller.js';
import { MapsController } from './scripts/controls/mapsController.js';
import { OrbitController } from './scripts/controls/orbitController.js';
import { loadSceneObjects } from "./scripts/loaders/sceneLoader.js";
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

loadSceneObjects(scene);

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

const googleMapsLinks = [
    "https://www.google.com/maps/embed?pb=!4v1678043887453!6m8!1m7!1sR1ACGyB0uAG0_b_0ewoLIg!2m2!1d52.37523469529211!2d6.045703803222062!3f275.0068870660023!4f-12.795163181952944!5f0.7820865974627469",
    "https://www.google.com/maps/embed?pb=!4v1678043987458!6m8!1m7!1s4VIIaxymlACQDNp4vmbPQQ!2m2!1d52.37533375897245!2d6.045719498686811!3f272.9189761961907!4f-10.092039059951176!5f0.7820865974627469",
    "https://www.google.com/maps/embed?pb=!4v1678044011308!6m8!1m7!1s_TvfjJLYFHtme_Lrda73JA!2m2!1d52.37543462463778!2d6.045736624011245!3f290.65712938458125!4f-18.676200955220807!5f0.7820865974627469",
    "https://www.google.com/maps/embed?pb=!4v1678044035371!6m8!1m7!1sspOSrv7DEd9p6SINYkkm8A!2m2!1d52.3755486682665!2d6.045755911370732!3f289.1620496265291!4f-23.86174477975723!5f0.7820865974627469",
    "https://www.google.com/maps/embed?pb=!4v1678044057253!6m8!1m7!1s1fXthI78WNXOL4IgTwNdXw!2m2!1d52.37566648279805!2d6.045770021211519!3f347.1917304979463!4f-17.491034221041886!5f0.7820865974627469",
    "https://www.google.com/maps/embed?pb=!4v1678044189776!6m8!1m7!1szjryNWDcxvYa4VenQGBOhA!2m2!1d52.37513837482!2d6.04569026130873!3f279.2153198573348!4f-3.7703722297014934!5f0.7820865974627469",
    "https://www.google.com/maps/embed?pb=!4v1678044225820!6m8!1m7!1sKeP1FuIlXupKDYBGUFF8OA!2m2!1d52.37504300944126!2d6.045675583035095!3f271.42821005493545!4f-4.327930060834689!5f0.7820865974627469",
    "https://www.google.com/maps/embed?pb=!4v1678044243786!6m8!1m7!1sX1DLj9ndwltFwveBGATNZw!2m2!1d52.37494798564433!2d6.0456590129845!3f271.42821005493545!4f-4.327930060834689!5f0.7820865974627469",
    "https://www.google.com/maps/embed?pb=!4v1678044277929!6m8!1m7!1stVqBPyY6fhpcIGPRNOhkvw!2m2!1d52.3748516740522!2d6.045643713529013!3f271.42821005493545!4f-4.327930060834689!5f0.7820865974627469",
    "https://www.google.com/maps/embed?pb=!4v1678044301306!6m8!1m7!1s5DFavEwdjH-IvisNg6LTZA!2m2!1d52.37474697092518!2d6.045625126976891!3f271.42821005493545!4f-4.327930060834689!5f0.7820865974627469",
]

/**
 * Some objects need some time to load when the camera first looks at them.
 * This is a workaround to make sure objects are loaded before the user can interact with the scene.
 */
camera.lookAt(scene.position);
renderer.render(scene, camera);

let controls = new Controller(scene, camera, renderer);
setTimeout(() => {
    controls = new MapsController(scene, camera, renderer, cameraPositions, googleMapsLinks);
    loadingScreen.style.opacity = 0;
}, 5000);

// Add GUI
const settings = [
    {
        name: "Fullscreen",
        icon: "<img src='images/fullscreen.svg'/>",
        action: () => {
            if (document.fullscreenElement)
                document.exitFullscreen();
            else
                document.documentElement.requestFullscreen();
        }
    },
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
                    controls = new MapsController(scene, camera, renderer, cameraPositions, googleMapsLinks);
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

// Resize event
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});