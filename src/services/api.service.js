/*
 * A single location to obtain routes for the web API
 */


let ApiService = class ApiService {
	constructor() {
		this.apiProtocol = 'https:';
        this.apiHost = 'api.themoviedb.org';
        this.apiKey = 'e940cc68f48379f8402625c472daf120';
        this.lang = 'en-US';
	}

	/*
	* Utility methods/properties
	*/
	get apiLocation() {
		return `${this.apiProtocol}//${this.apiHost}`;
	}

    getGenreList() {
        return `${this.apiLocation}/3/genre/movie/list?api_key=${this.apiKey}&language=${this.lang}`
    }

	/*
	* API addresses
	*/
	getMovieList() {
		return `${this.apiLocation}/movies.json`;
	}
};

// Create a Singleton
const apiService = new ApiService();
export default apiService;
