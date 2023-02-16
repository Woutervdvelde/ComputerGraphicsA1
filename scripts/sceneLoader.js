import { degreesToRadians } from './helper.js';
import { get_grass_texture, get_road_brick_texture } from './textureLoader.js';
import { House } from './houseBuild.js';

/**
 * Adds the base of the scene, grass plane and roads
 * @param {THREE.Scene} scene 
 */
const addBase = (scene) => {
    // Grass plane
    const grass = new THREE.PlaneGeometry(500, 500);
    const grassObject = new THREE.Mesh(grass, get_grass_texture(500, 500));
    grassObject.rotation.x = degreesToRadians(-90);
    scene.add(grassObject);

    // Actual (roughly) dimensions of the roads in meters
    const roadDimensions = {
        borch1: {
            length: 136,
            width: 4,
            height: .1
        },
        borch2: {
            length: 17,
            width: 4,
            height: .1
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

    // Roads generated based on roadDimensions
    let road = roadDimensions.borch1;
    const road_borch1 = new THREE.Mesh(
        new THREE.BoxGeometry(
            road.length,
            road.height,
            road.width,
        ),
        get_road_brick_texture(road.length, road.width)
    );

    road = roadDimensions.borch2;
    const road_borch2 = new THREE.Mesh(
        new THREE.BoxGeometry(
            road.length, 
            road.height,
            road.width, 
        ),
        get_road_brick_texture(road.length, road.width)
    );

    road = roadDimensions.borch3;
    const road_borch3 = new THREE.Mesh(
        new THREE.BoxGeometry(
        road.length + 5, 
        road.height,
        road.width, 
        ),
        get_road_brick_texture(road.length, road.width)
    );

    road = roadDimensions.kanaal;
    const road_kanaal = new THREE.Mesh(
        new THREE.BoxGeometry(
        road.length, 
        road.height,
        road.width, 
        ), 
        get_road_brick_texture(road.length, road.width)
    );

    // Move roads to correct position
    road_borch2.position.x = roadDimensions.borch1.length / 2 - 2; // -2 to compensate for rotation
    road_borch2.position.z = roadDimensions.borch2.length / 2;
    road_borch2.rotation.y = degreesToRadians(70);

    road_borch3.position.x = roadDimensions.borch1.length / 2 + 7; // +7 to compensate for rotation
    road_borch3.position.y = .2;
    road_borch3.position.z = -(roadDimensions.borch3.length / 2);
    road_borch3.rotation.x = degreesToRadians(5);
    road_borch3.rotation.y = degreesToRadians(70);

    road_kanaal.position.x = 10;
    road_kanaal.position.y = 1.5;
    road_kanaal.position.z = -78;
    road_kanaal.rotation.y = degreesToRadians(-29);

    // Add roads to scene
    scene.add(road_borch1);
    scene.add(road_borch2);
    scene.add(road_borch3);
    scene.add(road_kanaal);
}

/**
 * 
 * @param {THREE.Scene} scene 
 */
const addHouses = (scene) => {
    const house = new House(5, 5, 8);
    scene.add(house);

    const house2 = new House(3, 5, 6, .4);
    house2.rotation.y = degreesToRadians(90);
    house2.position.x = -3;
    scene.add(house2)
}

/**
 * Loads all static scene objects
 * @param {THREE.Scene} scene 
 */
const loadStaticSceneObjects = (scene) => {
    addBase(scene);
    addHouses(scene);
}

export {
    loadStaticSceneObjects
}