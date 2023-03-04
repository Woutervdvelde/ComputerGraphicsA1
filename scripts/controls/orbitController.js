import { Controller } from "./Controller.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export class OrbitController extends Controller {
    constructor(scene, camera, renderer) {
        super(scene, camera, renderer);
        this.controls = new OrbitControls(camera, renderer.domElement);
    }

    update() {
        this.controls.update();
    }

    dispose() {
        this.controls.dispose();
    }
}