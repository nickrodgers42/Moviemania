//-------------------------------------------------------------------
//
// The purpose of this class is to provide a single location that the
// rest of the application can use to obtain URL routes for working with
// the backend API.
//
//-------------------------------------------------------------------
import apiService from './api.service';
import { MovieSummary } from '../models/MovieSummary';
import { Genre } from '../models/Genre';
import { MovieDetail } from '../models/MovieDetail';
import { CastMember } from '../models/CastMember';

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
                        movies.push(new MovieSummary(element.id, element.title, element.popularity, element.poster_path, element.backdrop_path, element.release_date, element.overview))
                    });
                    resolve(movies);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    getMovieDetail(movieId) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getMovieDetail(movieId))
                .then(( response ) => response.json() )
                .then(( response ) => {
                    let a = response;
                    let movie = new MovieDetail(a.id, a.title, a.popularity, a.poster_path, a.backdrop_path, a.release_date, a.overview, a.genres, a.budget, a.revenue, a.status);
                    resolve(movie);
                })
                .catch(( error ) => {
                    console.error(error);
                    reject(error);
                })
        });
    }

    getMovieCast(movieId) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getMovieCast(movieId))
                .then( (response) => response.json() )
                .then( (response) => {
                    let cast = [];
                    response.cast.forEach((element) => {
                        cast.push(new CastMember(element.id, element.name, element.character, element.profile_path));
                    })
                    resolve(cast);
                })
                .catch( (error) => {
                    console.error(error);
                    reject(error);
                })
        });
    }

};

// Create a Singleton
const movieService = new MovieService();
export default movieService;
