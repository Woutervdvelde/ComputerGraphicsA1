import * as THREE from 'three';
import { degreesToRadians } from '../helper.js';
import { get_material } from '../loaders/textureLoader.js';


export class House {
    wallMaterial = new THREE.MeshStandardMaterial({ color: 0xafa0a3 });
    roofMaterial = new THREE.MeshStandardMaterial({ color: 0x4d4c49 });
    thresholdRoof = 0.5;
    mesh = null;

    /**
     * @param {float} w width of the house
     * @param {float} h height of the house
     * @param {float} l length of the house
     * @param {float} thresholdRoof defines the height of the roof relative to the height of the house, 0.5 means half the height of the entire house
     * @param {float} reduceBase defines the reduction of the base relative to the width of the house, 0.1 means 10% of the width of the house, this will make it look like the roof has more overhang
     * @returns {THREE.Group} group containing the house (base and roof)
     */
    constructor(w, h, l, thresholdRoof = 0.5, reduceBase = 0.1) {
        this.width = w;
        this.height = h;
        this.length = l;
        this.thresholdRoof = thresholdRoof;
        this.reduceBase = reduceBase;

        this.position = this.getMesh().position;
        this.rotation = this.getMesh().rotation;
    }

    setWallMaterial(texture) {
        this.wallMaterial = get_material(texture, this.width, this.height, this.length);
        this.getMesh().children[0].material = this.wallMaterial;
    }

    setRoofMaterial(texture) {
        this.roofMaterial = get_material(texture, this.width, this.height, this.length);
        this.getMesh().children[1].material = this.roofMaterial;
    }

    _generateBase() {
        const reduce = this.reduceBase * this.width;
        const geometry = new THREE.BoxGeometry(this.width - reduce, this.height * (1 - this.thresholdRoof), this.length - reduce);
        const base = new THREE.Mesh(geometry, this.wallMaterial);
        base.position.y = this.height * (1 - this.thresholdRoof) / 2;
        return base;
    }

    _generateRoof() {
        const geometry = new THREE.BufferGeometry();
        const baseHeight = this.height * (1 - this.thresholdRoof);
        const vertices = new Float32Array([
            0, baseHeight, 0,
            0, baseHeight, this.width,
            0, this.height, this.width / 2,

            this.length, baseHeight, 0,
            this.length, this.height, this.width / 2,
            this.length, baseHeight, this.width,

            0, baseHeight, 0,
            this.length, this.height, this.width / 2,
            this.length, baseHeight, 0,

            0, baseHeight, 0,
            0, this.height, this.width / 2,
            this.length, this.height, this.width / 2,

            0, baseHeight, this.width,
            this.length, baseHeight, this.width,
            this.length, this.height, this.width / 2,

            0, baseHeight, this.width,
            this.length, this.height, this.width / 2,
            0, this.height, this.width / 2,

            0, baseHeight, 0,
            this.length, baseHeight, 0,
            this.length, baseHeight, this.width,

            0, baseHeight, 0,
            this.length, baseHeight, this.width,
            0, baseHeight, this.width,
        ]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        const roof = new THREE.Mesh(geometry, this.roofMaterial);
        roof.position.x = -(this.width / 2);
        roof.position.z = this.length / 2;
        roof.rotation.y = degreesToRadians(90);

        return roof;
    }

    _generateHouse() {
        const house = new THREE.Group();
        const roof = this._generateRoof();
        const base = this._generateBase();

        house.add(base);
        house.add(roof);

        return house;
    }

    getMesh() {
        if (!this.mesh)
            this.mesh = this._generateHouse();

        return this.mesh;
    }
}