import { MovieSummary } from "./MovieSummary";
import { Genre } from './Genre';
/*
 * Class to describe a single Movie Summary
 */

export class MovieDetail extends MovieSummary {
    constructor(id, title, popularity, posterPath, backdropPath, releaseDate, overview, character, genres, budget, revenue, status) {
        super(id, title, popularity, posterPath, backdropPath, releaseDate, overview, character);
        tempGenres = [];
        genres.forEach(element => {
            tempGenres.push(new Genre(element.name, element.id))
        });
        this.genres = tempGenres;
        this.budget = budget;
        this.revenue = revenue;
        this.status = status;
    }
}
