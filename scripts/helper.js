const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
}

const addCustomObject = (object) => {
    scene.add(object.getMesh());
}

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

export {
    degreesToRadians,
    addCustomObject,
    random
}