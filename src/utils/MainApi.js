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

// const BASE_URL = "https://api.valvdov.movies.nomoredomains.rocks";
//
// const handleResponse = (res) => res.ok ? res.json() : Promise.reject(res.status);
//
// export const register = (name, email, password) => {
//     return fetch(`${BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({name, email, password})
//     })
//         .then(handleResponse);
// }
//
// export const login = (email, password) => {
//     return fetch (`${BASE_URL}/signin`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({email, password})
//     })
//         .then(handleResponse);
// }
//
// export const getUserInfo = (token) => {
//     return fetch (`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then(handleResponse);
// }
//
// export const editProfile = (token, name, email) => {
//     return fetch (`${BASE_URL}/users/me`, {
//         method: 'PATCH',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({name, email})
//     })
//         .then(handleResponse);
// }
//
// export const getSavedMovies = (token) => {
//     return fetch(`${BASE_URL}/movies`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then(handleResponse);
// }
//
// export const addMovie = (token, movie) => {
//     return fetch (`${BASE_URL}/movies`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//             country: movie.country,
//             director: movie.director,
//             duration: movie.duration,
//             year: movie.year,
//             description: movie.description,
//             image: movie.image,
//             trailerLink: movie.trailer,
//             thumbnail: movie.thumbnail,
//             movieId: String(movie.movieId),
//             nameRU: movie.nameRU,
//             nameEN: movie.nameEN,
//         })
//     })
//         .then(handleResponse);
// }
//
// export const deleteMovie = ({ token, _id }) => {
//     return fetch(`${BASE_URL}/movies/${_id}`, {
//         method: 'DELETE',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then(handleResponse);
// }

