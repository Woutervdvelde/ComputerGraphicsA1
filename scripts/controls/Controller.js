/**
 * Abstract class for a controller, this is used to control the camera and how the user interacts with it.
 */
export class Controller {
    /**
     * @param {THREE.Scene} screne
     * @param {THREE.Camera} camera 
     * @param {THREE.WebGLRenderer} renderer
     */
    constructor(screne, camera, renderer) {
        this.scene = screne;
        this.camera = camera;
        this.renderer = renderer;
    }

    /**
     * Called every animation frame
     * @param {number} [delta] - DeltaTime
     */
    update(delta) {}

    //Called when the controller is disposed, use this to remove event listeners
    dispose() {}
}