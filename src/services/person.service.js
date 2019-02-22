//-------------------------------------------------------------------
//
// The purpose of this class is to provide a single location that the
// rest of the application can use to obtain URL routes for working with
// the backend API.
//
//-------------------------------------------------------------------
import apiService from './api.service';
import { PersonDetail } from '../models/PersonDetail'

let PersonService = class PersonService {
    constructor() {}

    getPersonDetail(id) {
        console.log('get Person' + id);
        return new Promise( (resolve, reject) => {
            fetch(apiService.getPersonDetail(id)) 
                .then( (response) => response.json() )
                .then( (response) => {
                    let a = response;
                    console.log(a);
                    let person = new PersonDetail(a.id, a.name, a.popularity, a.profile_path, a.birthday, a.deathday, a.place_of_birth, a.biography);
                    console.log(person);
                    resolve(person);
                })
                .catch( (error) => {
                    console.error(error);
                    reject(error);
                })
        });
    }
    
};

// Create a Singleton
const personService = new PersonService();
export default personService;
