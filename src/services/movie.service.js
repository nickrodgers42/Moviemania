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
    
    getMovies() {
        return new Promise((resolve, reject) => {
            fetch(apiService.getMovieList())
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                response.movies.forEach(element => {
                    items.push(new Movie(element.title, element.releaseYear));
                });
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
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
};

// Create a Singleton
const movieService = new MovieService();
export default movieService;
