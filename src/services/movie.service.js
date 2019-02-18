//-------------------------------------------------------------------
//
// The purpose of this class is to provide a single location that the
// rest of the application can use to obtain URL routes for working with
// the backend API.
//
//-------------------------------------------------------------------
import apiService from './api.service';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';


let MovieService = class MovieService {
	constructor() {
	}

    getGenres() {
        return new Promise((resolve, reject) => {
            fetch(apiService.getGenreList())
                .then(( response ) => response.json() )
                .then(( response ) => {
                    let genres = [];
                    response.genres.forEach(element => {
                        genres.push(new Genre(element.name, element.id));
                    });
                    resolve(genres);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    getMoviesByGenreId(page, genreId) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getMoviesByGenre(page, genreId))
                .then(( response ) => response.json() )
                .then(( response ) => {
                    let movies = [];
                    response.results.forEach(element => {
                        movies.push(new Movie(element.title, element.popularity, element.poster_path, element.release_date, element.overview))
                    });
                    resolve(movies);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }
};

// Create a Singleton
const movieService = new MovieService();
export default movieService;
