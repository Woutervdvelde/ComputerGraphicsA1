import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const LoadModel = (model) => {
    return new Promise((resolve, reject) => {
        loader.load(`models/${model}`, resolve, null, reject);
    });
}

export {
    LoadModel
}