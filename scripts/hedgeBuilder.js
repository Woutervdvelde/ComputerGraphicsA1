export class Hedge {
    hedgeTexture = new THREE.MeshStandardMaterial({ color: 0x376931 });

    /**
     * @param {float} w width of the hedge
     * @param {float} h height of the hedge
     * @param {float} l length of the hedge
     * @returns {THREE.Mesh} mesh containing the hedge
     */
    constructor(w, h, l) {
        this.width = w;
        this.height = h;
        this.length = l;

        return this._getMesh();
    }

    setHedgeTexture(texture) {
        this.hedgeTexture = texture;
    }

    _generateHedge() {
        const geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
        const hedge = new THREE.Mesh(geometry, this.hedgeTexture);
        hedge.position.y = this.height / 2;
        return hedge;
    }

    _getMesh() {
        const hedge = this._generateHedge();
        return hedge;
    }
}