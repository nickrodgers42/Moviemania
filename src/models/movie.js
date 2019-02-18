/*
 * Class to describe a single Movie
 */

export class Movie {
    constructor(title, popularity, posterPath, releaseDate, overview) {
        this.title = title;
        this.popularity = popularity;
        this.posterPath = posterPath;
        this.releaseDate = releaseDate;
        this.overview = overview;
    }
}
