const textureLoader = new THREE.TextureLoader();
const image_width = 3067;
const image_height = 3067;


const get_grass_texture = (w, h) => {
    const grass_texture = textureLoader.load("textures/grass.jpg");
    grass_texture.wrapS = THREE.RepeatWrapping;
    grass_texture.wrapT = THREE.RepeatWrapping;
    grass_texture.repeat.set(w, h);
    const grass = new THREE.MeshLambertMaterial({ map: grass_texture });

    return grass;
}

const get_road_brick_texture = (w, h) => {
    const road_brick_texture = textureLoader.load("textures/road_brick.jpg");
    road_brick_texture.wrapS = THREE.RepeatWrapping;
    road_brick_texture.wrapT = THREE.RepeatWrapping;
    road_brick_texture.repeat.set(w, h);
    const road_brick = new THREE.MeshLambertMaterial({ map: road_brick_texture });

    return road_brick;
}

const get_hedge_01_texture = (w, h) => {
    const hedge_01_texture = textureLoader.load("textures/hedge_01.jpg");
    hedge_01_texture.wrapS = THREE.RepeatWrapping;
    hedge_01_texture.wrapT = THREE.RepeatWrapping;
    hedge_01_texture.repeat.set(w, h);
    const hedge_01 = new THREE.MeshLambertMaterial({ map: hedge_01_texture });

    return hedge_01;
}


export {
    get_grass_texture,
    get_road_brick_texture,
    get_hedge_01_texture
}