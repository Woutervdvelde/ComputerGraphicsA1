import * as THREE from 'three';
import { degreesToRadians, random } from '../helper.js';
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
    const getBush = (radius) => {
        const textures = [Textures.hedge_01, Textures.hedge_02, Textures.grass];
        const texture = textures[Math.floor(Math.random() * textures.length)];

        const bush = new THREE.Mesh(
            new THREE.DodecahedronGeometry(radius, 0),
            get_material(texture, 4, 4)
        );
        bush.rotation.y = degreesToRadians(random(0, 360));

        return bush;
    }

    const bushes = [
        {
            bush: getBush(.5),
            position: [-4, 0, -13],
        },
        {
            bush: getBush(.5),
            position: [-4.5, 0, -14],
        },
        {
            bush: getBush(.5),
            position: [-5, 0, -13.9],
        },
        {
            bush: getBush(.5),
            position: [-5.5, 0, -12.5],
        },
        {
            bush: getBush(.5),
            position: [-6, 0, -13],
        },
        {
            bush: getBush(.5),
            position: [-6.5, 0, -13.5],
        },
        {
            bush: getBush(.5),
            position: [-7, 0, -13.9],
        },
        {
            bush: getBush(.5),
            position: [-7.5, 0, -12.5],
        },
        {
            bush: getBush(.5),
            position: [-13, 0, -12.5],
        },
        {
            bush: getBush(.5),
            position: [-13.5, 0, -13],
        },
        {
            bush: getBush(.5),
            position: [-14, 0, -13.5],
        }
    ]

    bushes.forEach(b => {
        b.bush.position.set(...b.position);
        scene.add(b.bush);
    });
}

const addPath = (scene) => {
    const path = new THREE.Mesh(
        new THREE.BoxGeometry(9, .1, 1),
        get_material(Textures.road_gravel, 9, .1, 1)
    );
    path.position.set(-5.5, 0, -11.5);

    const path2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, .1, 4),
        get_material(Textures.road_gravel, 1, .1, 4)
    );
    path2.position.set(-9.5, 0, -14);

    scene.add(path);
    scene.add(path2);
}

export const loadDetails = (scene) => {
    addTowerBushes(scene);
    addSmallBushes(scene);
    addPath(scene);
}