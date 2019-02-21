/*
 * Class to describe a single Movie
 */

export class MovieSummary {
    constructor(id, title, popularity, posterPath, backdropPath, releaseDate, overview) {
        this.id = id;
        this.title = title;
        this.popularity = popularity;
        this.posterPath = posterPath;
        this.backdropPath = backdropPath;
        this.releaseDate = releaseDate;
        this.overview = overview;
    }
}
