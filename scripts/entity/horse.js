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
    offset = random(0, 10);

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

    async getMesh() {
        return this.horse;
    }

    update(delta) {
        const target = this.scene.camera.position.clone();
        target.z += this.offset;
        target.x += this.offset;

        this.horse.position.lerp(target, delta * this.speed);
        this.horse.position.y = 0.5;

        this.horse.lookAt(this.scene.camera.position);
        this.horse.rotation.x = 0;
        this.horse.rotation.z = 0;

        if (this.horse.position.x < this.boundaries[0].x)
            this.horse.position.x = this.boundaries[0].x;
        if (this.horse.position.x > this.boundaries[1].x)
            this.horse.position.x = this.boundaries[1].x;
        if (this.horse.position.z > this.boundaries[0].y)
            this.horse.position.z = this.boundaries[0].y;
        if (this.horse.position.z < this.boundaries[1].y)
            this.horse.position.z = this.boundaries[1].y;
    }
}