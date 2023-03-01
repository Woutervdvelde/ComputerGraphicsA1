import * as THREE from 'three';
import { House } from '../builders/houseBuilder.js';
import { degreesToRadians } from '../helper.js';
import { Textures, get_material } from '../loaders/textureLoader.js';

const addBillboard = (scene) => {
    const material = get_material(Textures.nursery_billboard, 3, 1.8, null, false);
    material.transparent = true;

    const billboard = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 1.8),
        material
    );
    billboard.position.set(-26.5, 1, 5.5);
    billboard.rotation.y = degreesToRadians(110);

    scene.add(billboard);
}

const addMailbox = (scene) => {
    const left = new House(.2, .35, .2, .2);
    const middle = new House(.25, .5, .3, .2);
    const right = new House(.2, .35, .2, .2);

    middle.setWallMaterial(Textures.wood_01);
    left.setWallMaterial(Textures.wood_01);
    right.setWallMaterial(Textures.wood_01);

    left.position.x = -.025;
    left.position.z = -0.2;

    right.position.x = -.025;
    right.position.z = 0.2;

    const mailbox = new THREE.Group();
    mailbox.add(left.getMesh());
    mailbox.add(middle.getMesh());
    mailbox.add(right.getMesh());

    mailbox.position.set(-25.7, .5, 8);

    const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.075, .5, 6),
        get_material(Textures.wood_01, 1, 1, 1, false)
    );
    pole.position.set(-25.7, .25, 8);

    scene.add(mailbox);
    scene.add(pole);
}

export const loadDetails = (scene) => {
    addBillboard(scene);
    addMailbox(scene);
}