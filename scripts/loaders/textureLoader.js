import * as THREE from 'three';
const textureLoader = new THREE.TextureLoader();

const Textures = {
    bush: "bush_texture.png",
    grass: "grass.jpg",
    road_brick: "road_brick.jpg",
    road_gravel: "ground_gravel_crop.jpg",
    hedge_01: "hedge_01.jpg",
    hedge_02: "hedge_02.jpg",
}

const _getTexture = (texture_name, x, y, repeat = true) => {
    const texture = textureLoader.load(`textures/${texture_name}`);
    if (!repeat) return texture;

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(x, y);
    return texture;
}

const get_material = (texture_name, w, h, l, repeat = true) => {
    if (l == undefined)
        return new THREE.MeshStandardMaterial({ map: _getTexture(texture_name, w, h, repeat) })

    const materials = [];
    materials.push(new THREE.MeshStandardMaterial({ map: _getTexture(texture_name, l, h, repeat) }));
    materials.push(new THREE.MeshStandardMaterial({ map: _getTexture(texture_name, w, l, repeat) }));
    materials.push(new THREE.MeshStandardMaterial({ map: _getTexture(texture_name, w, h, repeat) }));

    const mapping = [
        materials[0], materials[0], materials[1],
        materials[1], materials[2], materials[2]
    ];

    return mapping;
}


export {
    Textures,
    get_material,
}