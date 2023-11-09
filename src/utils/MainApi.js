class MainApi {
    constructor(options) {
      this._baseUrl = options.baseUrl;
    }
  
    _checkRes(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status} ${res.statusText}`);
    }

    // Методы пользователя
  
    setRegistration(data) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
          name: data.name,
          password: data.password,
          email: data.email,
        }),
      }).then(this._checkRes);
    }
  
    setAuthorization(data) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",      
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          password: data.password,
          email: data.email,
        }),
      }).then(this._checkRes);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
       },
      }).then(this._checkRes);
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
         },
          body: JSON.stringify({
            name: data.name,
            email: data.email
          }),
        }).then(this._checkRes);
      }
  
    signOut() {
        return fetch(`${this._baseUrl}/signout`, {
            method: "POST",      
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
        }).then(this._checkRes);
    }

    // методы фильмов

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
        }).then(this._checkRes);
    }

    addMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",      
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailerLink: data.trailerLink,
                thumbnail: `https://api.nomoreparties.co${data.thumbnail.url}`,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
                movieId: data.id,
            })
        }).then(this._checkRes);
    }

    deleteMovie(data) {
        return fetch(`${this._baseUrl}/movies/${data.cardId}`, {
            method: "DELETE",      
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
        }).then(this._checkRes);
    }

  }

  export const mainApi = new MainApi({
    // baseUrl: "https://api.diploma-orties.nomoredomainsrocks.ru"
    baseUrl: "http://localhost:3000",
  });
  