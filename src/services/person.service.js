//-------------------------------------------------------------------
//
// The purpose of this class is to provide a single location that the
// rest of the application can use to obtain URL routes for working with
// the backend API.
//
//-------------------------------------------------------------------
import apiService from './api.service';
import { PersonDetail } from '../models/PersonDetail'
import { MovieSummary } from '../models/MovieSummary';

let PersonService = class PersonService {
    constructor() {}

    getPersonDetail(id) {
        return new Promise( (resolve, reject) => {
            fetch(apiService.getPersonDetail(id)) 
                .then( (response) => response.json() )
                .then( (response) => {
                    let a = response;
                    let person = new PersonDetail(a.id, a.name, a.popularity, a.profile_path, a.birthday, a.deathday, a.place_of_birth, a.biography);
                    resolve(person);
                })
                .catch( (error) => {
                    console.error(error);
                    reject(error);
                })
        });
    }
    
    getPersonCredits(id) {
        return new Promise( (resolve, reject) => {
            fetch(apiService.getPersonCredits(id))
                .then( (response) => response.json() )
                .then( (response) => {
                    let credits = [];
                    response.cast.forEach( (element) => {
                        credits.push(new MovieSummary(element.id, element.title, element.popularity, element.poster_path, element.backdrop_path, element.release_date, element.overview, element.character))
                    })
                    resolve(credits);
                })
        });
    }
};

// Create a Singleton
const personService = new PersonService();
export default personService;
