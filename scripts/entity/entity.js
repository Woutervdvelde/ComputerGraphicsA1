/**
 * Abstract class Entity
 */
export class Entity {
    constructor() {}

    /**
     * Called every animation frame
     * @param {number} [delta] - DeltaTime 
     */
    update(delta) {
        throw new Error("Method not implemented.");
    }
}