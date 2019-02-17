/*
 * Class to describe a single Movie
 */

export class Movie {
    constructor(title, year) {
        this.title = title;
        this.yearReleased = year;
    }

    getTitle() {
        return this.title;
    }

    getYearReleased() {
        return this.yearReleased;
    }
}
