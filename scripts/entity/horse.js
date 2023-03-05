import * as THREE from 'three';
import { random } from '../helper.js';
import { LoadModel } from '../loaders/modelLoader.js';
import { Entity } from "./entity.js";

/**
 * Horse entity
 */
export class Horse extends Entity {
    horse;
    speed = 0.1;
    offset = random(0, 7);
    target;

    /**
     * Creates a horse and adds it to the scene
     * @param {THREE.Vector2[]} boundaries - Array of two 2D vectors representing the boundaries of the horse
     * @param {THREE.Scene} scene 
     */
    constructor(boundaries, scene) {
        super();
        if (boundaries.length != 2)
            throw new Error("Horse must have two vectors representing the boundaries");

        this.boundaries = boundaries;
        this.scene = scene;
        this._createHorse();
        this.behaviour = wanderBehaviour;
    }

    async _createHorse() {
        const horseModel = await LoadModel('horse.glb');
        const horse = horseModel.scene;

        horse.position.set(
            random(this.boundaries[0].x, this.boundaries[1].x),
            0.5,
            random(this.boundaries[0].y, this.boundaries[1].y)
        );
        this.horse = horse;
        
        scene.entities.push(this);
        scene.add(horse);
    }

    setBehaviour(behaviour) {
        this.behaviour = behaviour;
    }

    async getMesh() {
        return this.horse;
    }

    update(delta) {
        this.behaviour(this, delta);
    }
}

export const followBehaviour = (horse, delta) => {
    const target = horse.scene.camera.position.clone();
    target.x += horse.offset;
    target.y = 0;
    target.z += horse.offset;

    horse.horse.position.lerp(target, delta * horse.speed);
    horse.horse.position.y = 0;

    horse.horse.lookAt(target);

    if (horse.horse.position.x < horse.boundaries[0].x)
        horse.horse.position.x = horse.boundaries[0].x;
    if (horse.horse.position.x > horse.boundaries[1].x)
        horse.horse.position.x = horse.boundaries[1].x;
    if (horse.horse.position.z > horse.boundaries[0].y)
        horse.horse.position.z = horse.boundaries[0].y;
    if (horse.horse.position.z < horse.boundaries[1].y)
        horse.horse.position.z = horse.boundaries[1].y;
}

export const wanderBehaviour = (horse, delta) => {
    if (horse.target == null || horse.horse.position.distanceTo(horse.target) < 1) {
        horse.target = new THREE.Vector3(
            random(horse.boundaries[0].x, horse.boundaries[1].x),
            0,
            random(horse.boundaries[0].y, horse.boundaries[1].y)
        );
    }

    horse.horse.position.lerp(horse.target, delta * horse.speed);
    horse.horse.position.y = 0;

    horse.horse.lookAt(horse.target);
}
