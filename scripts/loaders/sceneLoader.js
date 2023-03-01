import * as THREE from 'three';
import { degreesToRadians, addCustomObject, random } from '../helper.js';

import { Textures, get_material } from './textureLoader.js';
import { LoadModel } from './modelLoader.js';

import { House } from '../builders/houseBuilder.js';
import { Hedge } from '../builders/hedgeBuilder.js';
import { BushField } from '../builders/bushFieldBuilder.js';
import { loadAllDetails } from '../detailers/detailLoader.js';

/**
 * Adds the base of the scene, grass plane and roads
 * @param {THREE.Scene} scene 
 */
const addBase = (scene) => {
    // Grass plane
    const grass = new THREE.PlaneGeometry(500, 500);
    const grassObject = new THREE.Mesh(grass, get_material(Textures.grass, 500, 500));
    grassObject.rotation.x = degreesToRadians(-90);
    scene.add(grassObject);

    // Actual (roughly) dimensions of the roads in meters
    const roadDimensions = {
        borch1: {
            width: 4,
            height: .1,
            length: 136,
        },
        borch2: {
            width: 4,
            height: .1,
            length: 17,
        },
        borch3: {
            width: 4,
            height: 3,
            length: 34,
        },
        borch4: {
            width: 2,
            height: .1,
            length: 21,
        },
        borch5: {
            width: 4,
            height: .1,
            length: 78,
        },
        kanaal: {
            width: 5,
            height: 3,
            length: 182,
        }
    };

    // Roads generated based on roadDimensions
    let road = roadDimensions.borch1;
    const road_borch1 = new THREE.Mesh(
        new THREE.BoxGeometry(
            road.width,
            road.height,
            road.length,
        ),
        get_material(Textures.road_brick, road.width, road.height, road.length)
    );

    road = roadDimensions.borch2;
    const road_borch2 = new THREE.Mesh(
        new THREE.BoxGeometry(
            road.width,
            road.height,
            road.length,
        ),
        get_material(Textures.road_brick, road.width, road.height, road.length)
    );

    road = roadDimensions.borch3;
    const road_borch3 = new THREE.Mesh(
        new THREE.BoxGeometry(
            road.width,
            road.height,
            road.length + 5,
        ),
        get_material(Textures.road_brick, road.width, road.height, road.length)
    );

    road = roadDimensions.borch4;
    const road_borch4 = new THREE.Mesh(
        new THREE.BoxGeometry(
            road.width,
            road.height,
            road.length,
        ),
        get_material(Textures.road_brick, road.width, road.height, road.length)
    );

    road = roadDimensions.borch5;
    const road_borch5 = new THREE.Mesh(
        new THREE.BoxGeometry(
            road.width,
            road.height,
            road.length,
        ),
        get_material(Textures.road_brick, road.width, road.height, road.length)
    );

    road = roadDimensions.kanaal;
    const road_kanaal = new THREE.Mesh(
        new THREE.BoxGeometry(
            road.width,
            road.height,
            road.length,
        ),
        get_material(Textures.road_brick, road.width, road.height, road.length)
    );

    // Move roads to correct position
    road_borch1.rotation.y = degreesToRadians(90);

    road_borch2.position.x = roadDimensions.borch1.length / 2 - 2; // -2 to compensate for rotation
    road_borch2.position.z = roadDimensions.borch2.length / 2;
    road_borch2.rotation.y = degreesToRadians(-20);

    road_borch3.position.x = roadDimensions.borch1.length / 2 + 7; // +7 to compensate for rotation
    road_borch3.position.y = .2;
    road_borch3.position.z = -(roadDimensions.borch3.length / 2);
    road_borch3.rotation.x = degreesToRadians(5);
    road_borch3.rotation.y = degreesToRadians(-20);

    road_borch4.position.x = 0;
    road_borch4.position.z = -(roadDimensions.borch4.length / 2) - (roadDimensions.borch1.width / 2);

    road_borch5.position.x = -23;
    road_borch5.position.z = (roadDimensions.borch5.length / 2) + (roadDimensions.borch1.width / 2);

    road_kanaal.position.x = 10;
    road_kanaal.position.y = 1.5;
    road_kanaal.position.z = -78;
    road_kanaal.rotation.y = degreesToRadians(61);

    // Add roads to scene
    scene.add(road_borch1);
    scene.add(road_borch2);
    scene.add(road_borch3);
    scene.add(road_borch4);
    scene.add(road_borch5);
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
    addCustomObject(house3);

    // Address: 3A
    const house3a = new House(7, 7, 10);
    const house3a_2 = new House(6, 7, 7);
    house3a.position.x = -40;
    house3a.position.z = 21;
    house3a_2.position.x = -40 - 3.5;
    house3a_2.position.z = 21;
    house3a_2.rotation.y = degreesToRadians(90);
    addCustomObject(house3a);
    addCustomObject(house3a_2);

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
    addCustomObject(house6);
    addCustomObject(house6_2);
    addCustomObject(house6_3);
    addCustomObject(house6_4);

    // Address: 8
    const house8 = new House(9, 9, 12);
    house8.position.x = -78;
    house8.position.z = -18;
    house8.rotation.y = degreesToRadians(90);
    addCustomObject(house8);
}

/**
 * Adds all the main hedges to the scene
 * @param {THREE.Scene} scene 
 */
const addHedges = (scene) => {
    const hedge1 = new Hedge(.5, 1, 24, Textures.hedge_02);
    hedge1.position.x = 37;
    hedge1.position.z = 4;
    hedge1.rotation.y = degreesToRadians(90);

    const hedge2 = new Hedge(.5, 2, 42, Textures.hedge_02);
    hedge2.position.x = 5;
    hedge2.position.z = 4;
    hedge2.rotation.y = degreesToRadians(90);

    const hedge3 = new Hedge(.5, 2, 6, Textures.hedge_02);
    hedge3.position.x = -18 + .5; // +.5 to compensate for rotation
    hedge3.position.z = 6 + .5; // +.5 to compensate for rotation
    hedge3.rotation.y = degreesToRadians(-35);

    const hedge4 = new Hedge(.5, 2, 2, Textures.hedge_02);
    hedge4.position.x = -26;
    hedge4.position.z = 8;

    const hedge5 = new Hedge(.5, 2, 8, Textures.hedge_02);
    hedge5.position.x = -31;
    hedge5.position.z = 4;
    hedge5.rotation.y = degreesToRadians(90);

    const hedge6 = new Hedge(.5, 1, 15, Textures.hedge_02);
    hedge6.position.x = -42.5;
    hedge6.position.z = 4;
    hedge6.rotation.y = degreesToRadians(90);

    const hedge7 = new Hedge(.5, 2, 20, Textures.hedge_02);
    hedge7.position.x = -60;
    hedge7.position.z = 4;
    hedge7.rotation.y = degreesToRadians(90);

    const hedge8 = new Hedge(.5, 4, 104, Textures.hedge_01);
    hedge8.position.x = -62;
    hedge8.position.z = -55;

    //TODO replace this one with row of trees later (south of address 6)
    const hedge9 = new Hedge(.5, 3, 53, Textures.hedge_02);
    hedge9.position.x = -23;
    hedge9.position.z = -30;

    const hedge10 = new Hedge(.5, .5, 20, Textures.hedge_02);
    hedge10.position.x = -13;
    hedge10.position.z = -3;
    hedge10.rotation.y = degreesToRadians(90);

    const hedge11 = new Hedge(.5, 2, 77, Textures.hedge_02);
    hedge11.position.x = -12;
    hedge11.position.z = 42.5;

    const hedge12 = new Hedge(.5, 3, 17, Textures.hedge_02);
    hedge12.position.x = 7;
    hedge12.position.z = -28;

    const hedge13 = new Hedge(.75, 3.1, 3, Textures.hedge_02);
    hedge13.position.x = 7 - 1.5;
    hedge13.position.z = -19;
    hedge13.rotation.y = degreesToRadians(90);

    const hedge14 = new Hedge(.5, 3, 14, Textures.hedge_02);
    hedge14.position.x = 2;
    hedge14.position.z = -49;

    const hedge15 = new Hedge(.5, 3, 24, Textures.hedge_02);
    hedge15.position.x = -10;
    hedge15.position.z = -56;
    hedge15.rotation.y = degreesToRadians(90);

    addCustomObject(hedge1);
    addCustomObject(hedge2);
    addCustomObject(hedge3);
    addCustomObject(hedge4);
    addCustomObject(hedge5);
    addCustomObject(hedge6);
    addCustomObject(hedge7);
    addCustomObject(hedge8);
    addCustomObject(hedge9);
    addCustomObject(hedge10);
    addCustomObject(hedge11);
    addCustomObject(hedge12);
    addCustomObject(hedge13);
    addCustomObject(hedge14);
    addCustomObject(hedge15);
}

/**
 * Adds all the objects at the end of the scene.
 * This will force the player to not go any further.
 * Mainly the road barriers at the end and start of Borch1 road.
 */
const addEndOfSceneObjects = async (scene) => {
    const barrier = await LoadModel('barrier.glb');
    const gate = await LoadModel('gate.glb');

    const b1 = barrier.scene.clone(); // south side
    const b2 = barrier.scene.clone(); // south side
    const b3 = barrier.scene.clone(); // north side
    const b4 = barrier.scene.clone(); // north side

    b1.position.x = -62;
    b1.position.z = -1.5;
    b1.rotation.y = degreesToRadians(-10);

    b2.position.x = -62;
    b2.position.z = 1.5;
    b2.rotation.y = degreesToRadians(10);

    b3.position.x = 50;
    b3.position.z = -1.5;
    b3.rotation.y = degreesToRadians(10);

    b4.position.x = 50;
    b4.position.z = 1.5;
    b4.rotation.y = degreesToRadians(-10);

    scene.add(b1);
    scene.add(b2);
    scene.add(b3);
    scene.add(b4);

    gate.scene.position.x = -23.75;
    gate.scene.position.z = 9;
    gate.scene.rotation.y = degreesToRadians(-90);
    scene.add(gate.scene);
}

const addBushField = (scene) => {
    //Field in between address 6 and 8
    const field = new BushField(37, .1, 80, 1000);
    field.position.x = -43;
    field.position.z = -45;
    addCustomObject(field);
}

/**
 * Loads all static scene objects
 * @param {THREE.Scene} scene 
 */
const loadStaticSceneObjects = async (scene) => {
    addBase(scene);
    addHouses(scene);
    addHedges(scene);
    addEndOfSceneObjects(scene);
    addBushField(scene);

    loadAllDetails(scene);
}

export {
    loadStaticSceneObjects
}