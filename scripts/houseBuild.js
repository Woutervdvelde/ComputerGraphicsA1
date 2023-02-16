export class House {
    wallTexture = new THREE.MeshBasicMaterial({ color: 0xafa0a3 });
    roofTexture = new THREE.MeshBasicMaterial({ color: 0x4d4c49 });

    constructor(w, h, l) {
        this.width = w;
        this.height = h;
        this.length = l;
    }

    setWallTexture(texture) {
        this.wallTexture = texture;
    }

    setRoofTexture(texture) {
        this.roofTexture = texture;
    }

    _generateRoof() {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            0, 0, 0,
            0, 0, this.width,
            0, this.height, this.width / 2,

            this.length, 0, 0,
            this.length, this.height, this.width / 2,
            this.length, 0, this.width,

            0, 0, 0,
            this.length, this.height, this.width / 2,
            this.length, 0, 0,

            0, 0, 0,
            0, this.height, this.width / 2,
            this.length, this.height, this.width / 2,

            0, 0, this.width,
            this.length, 0, this.width,
            this.length, this.height, this.width / 2,

            0, 0, this.width,
            this.length, this.height, this.width / 2,
            0, this.height, this.width / 2,
        ]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();
        const roof = new THREE.Mesh(geometry, this.roofTexture);

        return roof;
    }

    getMesh() {
        const roof = this._generateRoof();
        return roof;
    }
}