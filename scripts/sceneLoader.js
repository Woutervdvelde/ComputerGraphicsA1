/**
 * Adds the base of the scene, grass plane and roads
 * @param {THREE.Scene} scene 
 */
const addBase = (scene) => {
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

const loadSceneObjects = (scene) => {
    addBase(scene);
}

export {
    loadSceneObjects
}