import { Controller } from "./Controller.js";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { get_material, Textures } from "../loaders/textureLoader.js";
import { degreesToRadians } from "../helper.js";

/**
 * @classdesc Controller that allows the user to move the camera to different positions on the X-axis, mimics Google Street View
 * @extends Controller
 */
export class MapsController extends Controller {
    moveIcon;
    mouseX; mouseY;
    lastMouseDown;
    lastPosition = new THREE.Vector3();
    maxZoom = 100;
    minZoom = 20;
    zoomStep = 2;

    /**
     * @param {THREE.Scene} scene 
     * @param {THREE.Camera} camera 
     * @param {THREE.Renderer} renderer 
     * @param {THREE.Vector3[]} positions - Array of positions the camera is allowed to move to on the X-axis
     */
    constructor(scene, camera, renderer, positions) {
        super(scene, camera, renderer);
        this.positions = positions;
        this.lastPosition = positions[0];

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 1.8, 0.01);
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = .1;
        this.controls.rotateSpeed = - .25;

        this.camera.position.set(0, 1.8, 0);

        this.mouseMoveHandler = this._mouseMove.bind(this);
        this.mouseDownHandler = this._mouseDown.bind(this);
        this.mouseUpHandler = this._mouseUp.bind(this);
        this.wheelHandler = this._wheel.bind(this);

        window.addEventListener('mousemove', this.mouseMoveHandler);
        window.addEventListener('mousedown', this.mouseDownHandler);
        window.addEventListener('mouseup', this.mouseUpHandler);
        window.addEventListener('wheel', this.wheelHandler);
        this._createMoveIcon();
    }

    _mouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    _mouseDown(e) {
        e.preventDefault();
        document.body.style.cursor = "move";
        this.lastMouseDown = Date.now();
    }

    _mouseUp(e) {
        document.body.style.cursor = "default";

        // If the user clicks on something else than the canvas, don't teleport
        if (e.target.tagName != "CANVAS") return;

        if (Date.now() - this.lastMouseDown < 200 && this.moveIcon.visible)
            this._teleportToClosestPosition();
    }

    _wheel(e) {
        if (e.deltaY > 0)
            this._zoomOut();
        else
            this._zoomIn();
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

    _zoomIn() {
        this.camera.fov -= this.zoomStep;
        if (this.camera.fov < this.minZoom)
            this.camera.fov = this.minZoom;
        this.camera.updateProjectionMatrix();
    }

    _zoomOut() {
        this.camera.fov += this.zoomStep;
        if (this.camera.fov > this.maxZoom)
            this.camera.fov = this.maxZoom;
        this.camera.updateProjectionMatrix();
    }

    _teleportToClosestPosition() {
        const closest = this.positions.filter(p => p.x != this.lastPosition.x).reduce((prev, curr) => {
            const a = Math.abs(curr.x - this.moveIcon.position.x);
            const b = Math.abs(prev.x - this.moveIcon.position.x);
            return a < b ? curr : prev;
        });

        // To prevent the camera from moving backwards when the closest position is behind the camera
        if (this.moveIcon.position.x > this.camera.position.x && closest.x < this.camera.position.x) return;
        if (this.moveIcon.position.x < this.camera.position.x && closest.x > this.camera.position.x) return;
        
        const oldRotation = this.camera.rotation.clone();
        const oldPosition = this.camera.position.sub(this.lastPosition);
        const newPosition = new THREE.Vector3(closest.x + oldPosition.x, closest.y + oldPosition.y, closest.z + oldPosition.z);

        this.camera.rotation.set(oldRotation.x, oldRotation.y, oldRotation.z);
        this.controls.target.set(closest.x, closest.y, closest.z + 0.01);
        this.camera.position.set(newPosition.x, newPosition.y, newPosition.z);

        this.lastPosition = closest;
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
        window.removeEventListener('mousemove', this.mouseMoveHandler);
        window.removeEventListener('mousedown', this.mouseDownHandler);
        window.removeEventListener('mouseup', this.mouseUpHandler);
        window.removeEventListener('wheel', this.wheelHandler);

        this.moveIcon.geometry.dispose();
        this.moveIcon.material.dispose();
        this.scene.remove(this.moveIcon);

        this.controls.dispose();
    }
}