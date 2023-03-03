import { Controller } from "./Controller.js";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { get_material, Textures } from "../loaders/textureLoader.js";
import { degreesToRadians } from "../helper.js";


export class MapsController extends Controller {
    moveIcon;
    mouseX; mouseY;

    constructor(scene, camera, renderer) {
        super(scene, camera, renderer);
        this.onmousemove = window.addEventListener('mousemove', (e) => this._mouseMove(e));
        this.onmousedown = window.addEventListener('mousedown', (e) => this._mouseDown(e));
        this.onmouseup = window.addEventListener('mouseup', (e) => this._mouseUp(e));
        this._createMoveIcon();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 1.8, 0);
        this.controls.enablePan = false;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = .1;
        this.controls.rotateSpeed = - .25;

        this.camera.position.set(0, 1.8, 0.01);
    }

    _mouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    _mouseDown(e) {
        document.body.style.cursor = "move";
    }

    _mouseUp(e) {
        document.body.style.cursor = "default";
    }

    _createMoveIcon() {
        const material = get_material(Textures.maps_move_icon, 2, 2, undefined, false);
        material.transparent = true;

        const icon = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            material
        );
        icon.name = "move_icon";
        icon.visible = false;
        icon.rotation.x = degreesToRadians(-90);
        this.moveIcon = icon;
        this.scene.add(this.moveIcon);
    }

    _displayMoveIcon(x, y, z) {
        this.moveIcon.position.set(x, y + 0.01, z);
        this.moveIcon.rotation.z = this.camera.position.x > x ? degreesToRadians(90) : degreesToRadians(-90);
        this.moveIcon.visible = true;

    }

    _hideMoveIcon() {
        this.moveIcon.visible = false;
    }

    update() {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        mouse.x = (this.mouseX / window.innerWidth) * 2 - 1;
        mouse.y = - (this.mouseY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse.clone(), this.camera);

        var objects = raycaster.intersectObjects(scene.children);
        if (!objects || !objects[0]) return this._hideMoveIcon();

        const hasRoad = objects.find(o => o.object.name === "main_road");
        if (hasRoad)
            this._displayMoveIcon(hasRoad.point.x, hasRoad.point.y, hasRoad.point.z);
        else
            this._hideMoveIcon();

        this.controls.update();
    }

    dispose() {
        window.removeEventListener('mousemove', this.onmousemove);
        window.removeEventListener('mousedown', this.onmousedown);
        window.removeEventListener('mouseup', this.onmouseup);
        this.controls.dispose();
    }
}