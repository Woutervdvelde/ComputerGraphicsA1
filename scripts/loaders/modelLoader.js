import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

/**
 * loads GLTF models
 * @param {string} model - Name of the model file to load
 * @returns 
 */
const LoadModel = (model) => {
    return new Promise((resolve, reject) => {
        loader.load(`models/${model}`, resolve, null, reject);
    });
}

export {
    LoadModel
}