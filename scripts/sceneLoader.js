import { degreesToRadians } from './helper.js';

const roadDimensions = {
    borch1: {
        length: 136,
        width: 4,
        height: 1
    },
    borch2: {
        length: 17,
        width: 4,
        height: 1
    },
    borch3: {
        length: 34,
        width: 4,
        height: 3
    },
    kanaal: {
        length: 182,
        width: 5,
        height: 3
    }
};

/**
 * Adds the base of the scene, grass plane and roads
 * @param {THREE.Scene} scene 
 */
const addBase = (scene) => {
    // Grass plane
    const grass = new THREE.PlaneGeometry(500, 500);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    scene.add(new THREE.Mesh(grass, material));

    // Material used by roads
    const road_material = new THREE.MeshPhongMaterial({ color: 0xeeeeee });
    // Roads generated based on roadDimensions
    const road_borch1 = new THREE.Mesh(
        new THREE.BoxGeometry(
            roadDimensions.borch1.length,
            roadDimensions.borch1.width,
            roadDimensions.borch1.height
        ),
        road_material);

    const road_borch2 = new THREE.Mesh(
        new THREE.BoxGeometry(
            roadDimensions.borch2.length, 
            roadDimensions.borch2.width, 
            roadDimensions.borch2.height
        ),
        road_material);

    const road_borch3 = new THREE.Mesh(
        new THREE.BoxGeometry(
        roadDimensions.borch3.length + 5, 
        roadDimensions.borch3.width, 
        roadDimensions.borch3.height
        ),
        road_material);

    const road_kanaal = new THREE.Mesh(
        new THREE.BoxGeometry(
        roadDimensions.kanaal.length, 
        roadDimensions.kanaal.width, 
        roadDimensions.kanaal.height
        ), 
    road_material);

    // Move roads to correct position
    road_borch2.position.x = roadDimensions.borch1.length / 2 - 2; // -2 to compensate for rotation
    road_borch2.position.y = -(17 / 2);
    road_borch2.rotation.z = degreesToRadians(70);


    road_borch3.position.x = roadDimensions.borch1.length / 2 + 7; // +7 to compensate for rotation
    road_borch3.position.y = 34 / 2;
    road_borch3.position.z = .25;
    road_borch3.rotation.x = degreesToRadians(5);
    road_borch3.rotation.z = degreesToRadians(70);

    road_kanaal.position.x = 10;
    road_kanaal.position.y = 78;
    road_kanaal.position.z = 1.5;
    road_kanaal.rotation.z = degreesToRadians(-29);


    scene.add(road_borch1);
    scene.add(road_borch2);
    scene.add(road_borch3);
    scene.add(road_kanaal);
}

/**
 * 
 * @param {THREE.Scene} scene 
 */
const loadSceneObjects = (scene) => {
    addBase(scene);
}

export {
    loadSceneObjects
}