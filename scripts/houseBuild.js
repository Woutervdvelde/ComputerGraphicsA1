import { degreesToRadians } from './helper.js';

export class House {
    wallTexture = new THREE.MeshStandardMaterial({ color: 0xafa0a3 });
    roofTexture = new THREE.MeshStandardMaterial({ color: 0x4d4c49 });
    //Defines the height of the roof relative to the height of the house, 0.5 means half the height of the entire house
    thresholdRoof = 0.5;

    constructor(w, h, l, thresholdRoof = 0.5) {
        this.width = w;
        this.height = h;
        this.length = l;
        this.thresholdRoof = thresholdRoof;

        return this._getMesh();
    }

    setWallTexture(texture) {
        this.wallTexture = texture;
    }

    setRoofTexture(texture) {
        this.roofTexture = texture;
    }

    _generateBase() {
        const geometry = new THREE.BoxGeometry(this.width, this.height * (1 - this.thresholdRoof), this.length);
        const base = new THREE.Mesh(geometry, this.wallTexture);
        base.position.y = this.height * (1 - this.thresholdRoof) / 2;
        return base;
    }

    _generateRoof() {
        const geometry = new THREE.BufferGeometry();
        const baseHeight = this.height * this.thresholdRoof;
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
        ]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        const roof = new THREE.Mesh(geometry, this.roofTexture);
        roof.position.x = -(this.width / 2);
        roof.position.z = this.length / 2;
        roof.rotation.y = degreesToRadians(90);

        return roof;
    }

    _getMesh() {
        const house = new THREE.Group();
        const roof = this._generateRoof();
        const base = this._generateBase();

        house.add(base);
        house.add(roof);

        return house;
    }
}