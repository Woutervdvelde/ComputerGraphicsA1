import * as THREE from 'three';
import { get_material } from '../loaders/textureLoader.js';


export class Hedge {
    hedgeMaterial = new THREE.MeshStandardMaterial({ color: 0x376931 });
    mesh = null;

    /**
     * @param {float} w width of the hedge
     * @param {float} h height of the hedge
     * @param {float} l length of the hedge
     * @returns {THREE.Mesh} mesh containing the hedge
     */
    constructor(w, h, l, headgeTexture) {
        this.width = w;
        this.height = h;
        this.length = l;
        if (headgeTexture)
            this.setHedgeMaterial(headgeTexture);

        this.position = this.getMesh().position;
        this.rotation = this.getMesh().rotation;
    }

    setHedgeMaterial(texture) {
        this.hedgeMaterial = get_material(texture, this.width, this.height, this.length);
        this.getMesh().material = this.hedgeMaterial;
    }

    _generateHedge() {
        const geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
        const hedge = new THREE.Mesh(geometry, this.hedgeMaterial);
        hedge.position.y = this.height / 2;
        return hedge;
    }

    getMesh() {
        if (!this.mesh)
            this.mesh = this._generateHedge();

        return this.mesh;
    }
}