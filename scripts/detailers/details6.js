import * as THREE from 'three';
import { Horse } from '../entity/horse.js';
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

const addHorsePen = (scene) => {
    const poleHeight = 1;
    const poleRadius = .1;
    const poles = [
        [12, poleHeight / 2, -3],
        [12, poleHeight / 2, -29],
        [8, poleHeight / 2, -29],
        [7, poleHeight / 2, -70],
        [73, poleHeight / 2, -38],
        [64, poleHeight / 2, -4]
    ]

    for (let i = 0; i < poles.length; i++) {
        const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(poleRadius, poleRadius, poleHeight, 8),
            get_material(Textures.wood_01, 4, 4, 4)
        );
        pole.position.set(...poles[i]);
        scene.add(pole);

        const count = (i + 1) - (poles.length - 1);
        if (count > 1) return;
        const pole1 = poles[i];
        const pole2 = poles[count < 1 ? i + 1 : 0];

        const maxLines = 3;
        for (let j = 0; j < maxLines; j++) {
            const width = Math.sqrt(Math.pow(pole1[0] - pole2[0], 2) + Math.pow(pole1[2] - pole2[2], 2));
            const height = poleHeight / 10;
            const lenght = .05;

            const line = new THREE.Mesh(
                new THREE.BoxGeometry(width, height, lenght),
                new THREE.MeshBasicMaterial({ color: 0x000000 })
            );

            const x = (pole1[0] + pole2[0]) / 2;
            const y = poleHeight / maxLines * (j + 1) - (height / 2 + .01); //+.01 to avoid y-fighting
            const z = (pole1[2] + pole2[2]) / 2;

            const rotation = Math.atan2(pole2[2] - pole1[2], pole2[0] - pole1[0]);
            line.rotation.y = -rotation;

            line.position.set(x, y, z);

            scene.add(line);
        }
    }
}

const addHorses = async (scene) => {
    for (let i = 0; i < 3; i++)
        new Horse([new THREE.Vector2(13.5, -4.5), new THREE.Vector2(64, -38)], scene)
}

export const loadDetails = (scene) => {
    addTowerBushes(scene);
    addSmallBushes(scene);
    addPath(scene);

    addHorsePen(scene);
    addHorses(scene);
}