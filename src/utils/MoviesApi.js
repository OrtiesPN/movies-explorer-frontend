class MoviesApi {
    constructor(options) {
      this._baseUrl = options.baseUrl;
    }
  
    _checkRes(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status} ${res.statusText}`);
    }

    getMovies() {
        return fetch(this._baseUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(this._checkRes);
      }
}

export const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  });