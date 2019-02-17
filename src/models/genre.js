/*
 * Class to describe a single Movie genre
 */

export class Genre {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }
}
