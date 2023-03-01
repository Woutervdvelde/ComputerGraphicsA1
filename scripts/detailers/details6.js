import * as THREE from 'three';
import { degreesToRadians } from '../helper.js';
import { Textures, get_material } from '../loaders/textureLoader.js';

const addTowerBushes = (scene) => {
    const tower1 = new THREE.Mesh(
        new THREE.CylinderGeometry(.1, 1, 1.8, 8),
        get_material(Textures.hedge_01, 4, 4, 4)
    );

    const tower2 = new THREE.Mesh(
        new THREE.CylinderGeometry(.1, 1, 2, 8),
        get_material(Textures.hedge_01, 4, 4, 4)
    );

    const tower3 = new THREE.Mesh(
        new THREE.CylinderGeometry(.1, 1, 2.2, 8),
        get_material(Textures.hedge_01, 4, 4, 4)
    );

    tower1.position.set(-1.8, 1.8 / 2, -.8);
    tower2.position.y = 2 / 2;
    tower3.position.set(-1.8, 2.2 / 2, .8);

    const towers = new THREE.Group();
    towers.add(tower1);
    towers.add(tower2);
    towers.add(tower3);
    towers.position.set(-2, 0, -15);

    scene.add(towers);


    const bigBush = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 1, 3, 8),
        get_material(Textures.hedge_01, 4, 4, 4)
    );
    bigBush.position.set(-12, 1.5, -13);

    scene.add(bigBush);
}

const addSmallBushes = (scene) => {

}

export const loadDetails = (scene) => {
    addTowerBushes(scene);
    addSmallBushes(scene);
}