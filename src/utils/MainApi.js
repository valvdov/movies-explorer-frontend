class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    getUserProfile() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => this._getResponse(res))
    }


    setUserProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        }).then((res) => this._getResponse(res))
    }


    getSavedMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => this._getResponse(res))
    }

    addNewMovie(data) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: data.image,
                trailerLink: data.trailer,
                thumbnail: data.thumbnail,
                movieId: data.movieId,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            }),
        }).then(res => this._getResponse(res));
    }

    deleteMovies(_id) {
        return fetch(`${this._url}/movies/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => this._getResponse(res))
    }

    login = (data) => {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password})
        }).then((res) => this._getResponse(res))
    };

    register = (data) => {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password})
        }).then((res) => this._getResponse(res))
    };

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                ...this.headers,
                Authorization: `Bearer ${token}`,
            },
        }).then(this._getResponse);
    };


    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const mainApi = new Api({
    baseUrl: 'https://api.valvdov.movies.nomoredomains.rocks',
    //baseUrl: 'http://192.168.0.35:3000',
    headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export default mainApi;
