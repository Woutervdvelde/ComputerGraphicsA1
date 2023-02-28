import * as THREE from 'three';
import { Textures, get_material } from '../loaders/textureLoader.js';
import { degreesToRadians, random } from '../helper.js';


export class BushField {
    mesh = null;

    /**
     * @param {float} w width of the field
     * @param {float} h height of the field
     * @param {float} l length of the field
     * @param {int} amount amount of bushes on the field
     * @returns {THREE.Group} group containing the field with bushes
     */
    constructor(w, h, l, amount) {
        this.width = w;
        this.height = h;
        this.length = l;

        this.position = this.getMesh().position;
        this.rotation = this.getMesh().rotation;
    }

    _scatterBushes = (width, height, amount) => {
        const bushWidth = .5;
        const bushHeight = .5;

        const b = new THREE.PlaneGeometry(bushWidth, bushHeight);
        const bushMaterial = get_material(Textures.bush, width, height, null, false);
        bushMaterial.side = THREE.DoubleSide;
        bushMaterial.transparent = true;

        const b1 = new THREE.Mesh(b, bushMaterial);
        const b2 = new THREE.Mesh(b, bushMaterial);

        const instanced = new THREE.Group();
        const instance1 = new THREE.InstancedMesh(b1.geometry, b1.material, amount);
        const instance2 = new THREE.InstancedMesh(b2.geometry, b2.material, amount);

        let dummy = new THREE.Object3D();
        let mat4 = new THREE.Matrix4();

        for (let i = 0; i < amount; i++) {
            const x = random(0, width) - width / 2;
            const y = bushHeight / 2;
            const z = random(0, height) - height / 2;

            instance1.getMatrixAt(i, mat4);
            mat4.decompose(dummy.position, dummy.quaternion, dummy.scale);

            dummy.position.set(x, y, z);
            dummy.rotation.y = degreesToRadians(90);
            dummy.updateMatrix();
            instance1.setMatrixAt(i, dummy.matrix.clone());

            instance2.getMatrixAt(i, mat4);
            mat4.decompose(dummy.position, dummy.quaternion, dummy.scale);

            dummy.position.set(x, y, z);
            dummy.updateMatrix();
            instance2.setMatrixAt(i, dummy.matrix.clone());
        }

        instanced.add(instance1);
        instanced.add(instance2);

        return instanced;
    }

    _generateField() {
        const ground = new THREE.BoxGeometry(this.width, this.height, this.length);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x2c1908 });

        const groundMesh = new THREE.Mesh(ground, groundMaterial);
        groundMesh.position.x = 0;
        groundMesh.position.z = 0;

        const bushes = this._scatterBushes(ground.parameters.width, ground.parameters.depth, 1000);

        const field = new THREE.Group();
        field.add(groundMesh);
        field.add(bushes);

        return field;
    }

    getMesh() {
        if (!this.mesh)
            this.mesh = this._generateField();

        return this.mesh;
    }
}