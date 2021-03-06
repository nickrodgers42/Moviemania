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

	getMoviesByGenre(page, genreId) {
		return `${this.apiLocation}/3/discover/movie?api_key=${this.apiKey}&language=${this.lang}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`
	}

	getMovieDetail(movieId) {
		return `${this.apiLocation}/3/movie/${movieId}?api_key=${this.apiKey}&language=${this.lang}`
	}

	getMovieCast(movieId) {
		return `${this.apiLocation}/3/movie/${movieId}/credits?api_key=${this.apiKey}`
	}

	getPersonDetail(id) {
		return `${this.apiLocation}/3/person/${id}?api_key=${this.apiKey}&language=${this.lang}`
	}

	getPersonCredits(id) {
		return `${this.apiLocation}/3/person/${id}/movie_credits?api_key=${this.apiKey}&language=${this.lang}`
	}

	getMovieSearchResults(query, page) {
		encodedQuery = encodeURIComponent(query);
		return `${this.apiLocation}/3/search/movie?api_key=${this.apiKey}&language=${this.lang}&query=${encodedQuery}&page=${page}&include_adult=false`
	}

	getPersonSearchResults(query, page) {
		encodedQuery = encodeURIComponent(query);
		return `${this.apiLocation}/3/search/person?api_key=${this.apiKey}&language=${this.lang}&query=${encodedQuery}&page=${page}&include_adult=false`
	}
};

// Create a Singleton
const apiService = new ApiService();
export default apiService;
