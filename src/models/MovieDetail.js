import { MovieSummary } from "./MovieSummary";

/*
 * Class to describe a single Movie Summary
 */

export class MovieDetail extends MovieSummary {
    constructor(id, title, popularity, posterPath, backdropPath, releaseDate, overview, genres, budget, revenue, status) {
        super(id, title, popularity, posterPath, backdropPath, releaseDate, overview);
        this.genres = genres;
        this.budget = budget;
        this.revenue = revenue;
        this.status = status;
    }
}
