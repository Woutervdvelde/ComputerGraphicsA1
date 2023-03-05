const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
}

const radiansToDegrees = (radians) => {
    return radians * (180 / Math.PI);
}

const addCustomObject = (object) => {
    scene.add(object.getMesh());
}

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

export {
    degreesToRadians,
    radiansToDegrees,
    addCustomObject,
    random
}