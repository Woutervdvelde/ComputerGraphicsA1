const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
}

const addCustomObject = (object) => {
    scene.add(object.getMesh());
}

export {
    degreesToRadians,
    addCustomObject
}