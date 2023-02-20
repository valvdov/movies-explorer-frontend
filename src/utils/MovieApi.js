class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    getMovies() {
        return fetch(`${this._url}`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => this._getResponse(res))
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };
}




const movieApi = new Api({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


export default movieApi;
