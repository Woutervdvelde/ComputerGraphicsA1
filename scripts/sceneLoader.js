import { degreesToRadians } from './helper.js';
import { get_grass_texture, get_road_brick_texture } from './textureLoader.js';
import { House } from './houseBuild.js';
import { Hedge } from './hedgeBuilder.js';

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
 * Adds all houses to the scene
 * @param {THREE.Scene} scene 
 */
const addHouses = (scene) => {
    // Address: 3
    const house3 = new House(8, 8, 11, .35);
    house3.position.x = 46;
    house3.position.z = 14;
    house3.rotation.y = degreesToRadians(90);
    scene.add(house3);

    // Address: 3A
    const house3a = new House(7, 7, 10);
    const house3a_2 = new House(6, 7, 7);
    house3a.position.x = -40;
    house3a.position.z = 21;
    house3a_2.position.x = -40 - 3.5;
    house3a_2.position.z = 21;
    house3a_2.rotation.y = degreesToRadians(90);
    scene.add(house3a);
    scene.add(house3a_2);

    // Address: 6
    const house6 = new House(8, 7, 11, .6);
    const house6_2 = new House(8, 5, 18, .3);
    const house6_3 = new House(5, 5, 12, .3);
    const house6_4 = new House(2, 2.5, 4, .2);
    house6.position.x = -10;
    house6.position.z = -18;
    house6.rotation.y = degreesToRadians(90);
    house6_2.position.x = 2;
    house6_2.position.z = -32;
    house6_3.position.x = 0;
    house6_3.position.z = -29;
    house6_4.position.x = 10;
    house6_4.position.z = -24;
    scene.add(house6);
    scene.add(house6_2);
    scene.add(house6_3);
    scene.add(house6_4);

    // Address: 8
    const house8 = new House(9, 9, 12);
    house8.position.x = -78;
    house8.position.z = -18;
    house8.rotation.y = degreesToRadians(90);
    scene.add(house8);
}

/**
 * Adds all the main hedges to the scene
 * @param {THREE.Scene} scene 
 */
const addHedges = (scene) => {
    const hedge1 = new Hedge(.5, 1, 24);
    hedge1.position.x = 37;
    hedge1.position.z = 4;
    hedge1.rotation.y = degreesToRadians(90);

    const hedge2 = new Hedge(.5, 2, 42);
    hedge2.position.x = 5;
    hedge2.position.z = 4;
    hedge2.rotation.y = degreesToRadians(90);

    const hedge3 = new Hedge(.5, 2, 6);
    hedge3.position.x = -18 + .5; // +.5 to compensate for rotation
    hedge3.position.z = 6 + .5; // +.5 to compensate for rotation
    hedge3.rotation.y = degreesToRadians(-35);

    const hedge4 = new Hedge(.5, 2, 5);
    hedge4.position.x = -26 +- .5; // -.5 to compensate for rotation
    hedge4.position.z = 6 + .25; // +.25 to compensate for rotation
    hedge4.rotation.y = degreesToRadians(10);

    const hedge5 = new Hedge(.5, 2, 8);
    hedge5.position.x = -31;
    hedge5.position.z = 4;
    hedge5.rotation.y = degreesToRadians(90);

    const hedge6 = new Hedge(.5, 1, 15);
    hedge6.position.x = -42.5;
    hedge6.position.z = 4;
    hedge6.rotation.y = degreesToRadians(90);

    const hedge7 = new Hedge(.5, 2, 20);
    hedge7.position.x = -60;
    hedge7.position.z = 4;
    hedge7.rotation.y = degreesToRadians(90);

    const hedge8 = new Hedge(.5, 4, 104);
    hedge8.position.x = -62;
    hedge8.position.z = -55;

    //TODO replace this one with row of trees later (south of address 6)
    const hedge9 = new Hedge(.5, 3, 53);
    hedge9.position.x = -23;
    hedge9.position.z = -30;

    const hedge10 = new Hedge(.5, .5, 20);
    hedge10.position.x = -13;
    hedge10.position.z = -3;
    hedge10.rotation.y = degreesToRadians(90);

    const hedge11 = new Hedge(.5, 2, 77);
    hedge11.position.x = -12;
    hedge11.position.z = 42.5;

    scene.add(hedge1);
    scene.add(hedge2);
    scene.add(hedge3);
    scene.add(hedge4);
    scene.add(hedge5);
    scene.add(hedge6);
    scene.add(hedge7);
    scene.add(hedge8);
    scene.add(hedge9);
    scene.add(hedge10);
    scene.add(hedge11);
}

/**
 * Loads all static scene objects
 * @param {THREE.Scene} scene 
 */
const loadStaticSceneObjects = (scene) => {
    addBase(scene);
    addHouses(scene);
    addHedges(scene);
}

export {
    loadStaticSceneObjects
}