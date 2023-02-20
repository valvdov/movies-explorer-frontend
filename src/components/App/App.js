import './App.css';
import {useCallback, useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import mainApi from "../../utils/MainApi";
import CurrentUserContext from "../../context/CurrentUserContext";
import movieApi from "../../utils/MovieApi";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import {searchFilter} from "../../utils/utils";


export default function App() {
    const history = useHistory();
    const location = useLocation();

    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState('');

    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [moviesFound, setMoviesFound] = useState([]);
    const [moviesShort, setMoviesShort] = useState([]);
    const [shortSavedMovies, setShortSavedMovies] = useState([]);
    const [showShortMovies, setShowShortMovies] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const [preloader, setPreloader] = useState(false);
    const [searchMovieError, setSearchMovieError] = useState(false);
    const [isBurgerOpened, setIsBurgerOpened] = useState(false);

    const [cardsOnDisplay, setCardsOnDisplay] = useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 917) return 12;
        else if (windowWidth > 583) return 8;
        else return 5;
    });

    const [cardsAddToDisplay, setCardsAddToDisplay] = useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 917) return 3;
        else if (windowWidth > 583) return 2;
        else return 2;
    });

    const onScreenResize = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth > 917) {
            setCardsOnDisplay(12);
            setCardsAddToDisplay(3);
        } else if (windowWidth > 583) {
            setCardsOnDisplay(8);
            setCardsAddToDisplay(2);
        } else {
            setCardsOnDisplay(5);
            setCardsAddToDisplay(2);
        }

        setMovies(moviesFound.slice(0, cardsOnDisplay));
    }

    useEffect(() => {
        window.addEventListener('resize', onScreenResize);
        return () => window.removeEventListener('resize', onScreenResize);
    },);

    function handleRegister(data) {
        mainApi.register(data)
            .then(res => {
                if (res) {
                    setSuccess(true);
                    setIsInfoTooltipPopupOpen(true)
                    handleLogin(data)
                }
            })
            .catch(err=> {
                setSuccess(false);
                setIsInfoTooltipPopupOpen(true)
                setMessage('При регистрации пользоваеля произошла ошибка');
                if (err === 400) return setMessage('Проверьте корректность заполнения полей')
                if (err === 409) return setMessage('Пользователь с таким email уже существует')
            })
            .finally(closePopup())
    }

    function handleLogin(data) {

        mainApi.login(data)

            .then(res => {
                if (res) {
                    setLoggedIn(true);
                    setSuccess(true);
                    localStorage.setItem('token', res.token);
                    history.go('/')
                }
            })
            .catch(() => {
                setSuccess(false);
                setIsInfoTooltipPopupOpen(true)
                setMessage('Проверьте введенные данный или попробуйте позже');
            })
    }

    function handleUpdateUser(newUserInfo) {
        mainApi.setUserProfile(newUserInfo).then((data) => {
            setCurrentUser(data);
            setIsInfoTooltipPopupOpen(true);
            setSuccess(true)
            setMessage("Данные профиля успешно изменены");
        })
            .catch(err => {
                setIsInfoTooltipPopupOpen(true);
                setSuccess(false)
                if (err === 409) return setMessage(`Пользователь с таким email уже существует.`)
                setMessage("При обновлении профиля произошла ошибка.")
            })
            .finally()
    }

    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('moviesFound');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('movies');
        history.push('/signin');
    }

    function closePopup() {
        setIsInfoTooltipPopupOpen(false)
    }

    const handleEscClose = (e) => {
        if (e.key === 'Escape') setIsBurgerOpened(false);
    }

    const handleMoreMovies = () => {
        setMovies(moviesFound.slice(0, movies.length + cardsAddToDisplay));
    }

    function onClickBurger() {
        setIsBurgerOpened(!isBurgerOpened);
    }

    function goBack(){
        history.goBack()
    }


    useEffect(() => {
        if (isBurgerOpened) document.addEventListener('keydown', handleEscClose);
        else document.removeEventListener('keydown', handleEscClose);
    }, [isBurgerOpened]);

    const checkToken = useCallback(() => {
        const jwt = localStorage.getItem('token');
        const foundedMovies = localStorage.getItem('moviesFound');

        const savedMovies = localStorage.getItem('savedMovies');

            if (foundedMovies) setMovies(JSON.parse(foundedMovies));
            if (savedMovies) setSavedMovies(JSON.parse(savedMovies));

            mainApi.getUserProfile(jwt)
                .then(user => {
                    setCurrentUser(user);
                    setLoggedIn(true);
                })
                .catch(err => console.log(err))

    }, [])


    useEffect(() => {
        checkToken()
    }, [checkToken])


    useEffect(() => {
        mainApi.getUserProfile()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch(err => console.log(err))
    }, []);


    useEffect(() => {
        setMessage('')
        setSearchMovieError(false);
    }, [location]);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([mainApi.getUserProfile(), mainApi.getSavedMovies(), movieApi.getMovies()])
                .then(([user, savedMovie, movies]) => {
                    setCurrentUser(user);

                    const newMovies = movies.map(i => Object.assign(i, {movieId: i.id}));
                    let newMoviesWithSaved = [];
                    savedMovie.length > 0 ?
                        savedMovie.forEach(el => {
                            newMoviesWithSaved = newMovies.map(i => (i.id === el.movieId ? Object.assign(i, {saved: true}) : i))
                        }) : newMoviesWithSaved = newMovies

                    localStorage.setItem('movies', JSON.stringify(newMoviesWithSaved));
                    localStorage.setItem('savedMovies', JSON.stringify(savedMovie));
                    localStorage.setItem('moviesFound', JSON.stringify([]));

                    setSavedMovies(savedMovie);
                })
                .catch(err =>
                    console.log(err))
        }
    }, [loggedIn])


    const searchMovies = ({text, saved, shortMovies}) => {
        text && setPreloader(true);
        setMessage("");
        setMovies([]);
        setMoviesFound([]);

        const localMovies = JSON.parse(localStorage.getItem('movies'));
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));

        const setToSearch = saved ? localSavedMovies : localMovies
        const result = searchFilter({setToSearch, text, shortMovies});

        result.length > 0 ? setSearchMovieError(false) : text && setSearchMovieError(true)

        if (saved) {
            setSavedMovies(result);
        } else {
            setMoviesFound(result);
            localStorage.setItem('moviesFound', JSON.stringify(result));
        }
        setMovies(result.slice(0, cardsOnDisplay));

        setTimeout(() => setPreloader(false), 500);
    }

    const addMovie = (movie) => {
        setPreloader(true);
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const localFoundedMovies = JSON.parse(localStorage.getItem('moviesFound'));

        const movieCopy = localMovies.filter(i => i.id === movie.id)[0];

        const {country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id} = movieCopy;

        const movieToSave = {
            country: country || "---",
            director: director || "---",
            duration: duration || 0,
            year: year || "----",
            description: description || "----",
            image: `https://api.nomoreparties.co${image.url}`,
            trailer: trailerLink,
            thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
            nameRU: nameRU || "----",
            nameEN: nameEN || "----",
            movieId: id,
        };

        mainApi.addNewMovie(movieToSave)
            .then(newMovie => {
                const newLocalSavedMovies = [...localSavedMovies, {
                    nameRU: newMovie.nameRU,
                    _id: newMovie._id,
                    id: newMovie.movieId,
                    movieId: newMovie.movieId,
                    trailerLink: newMovie.trailer,
                    duration: newMovie.duration,
                    image: newMovie.image,
                }]

                localStorage.setItem('savedMovies', JSON.stringify(newLocalSavedMovies));
                setSavedMovies(newLocalSavedMovies);

                const newMovies = localMovies.map(movie => (movie.id === newMovie.movieId ? Object.assign(movie, {saved: true}, {_id: newMovie._id}) : movie))
                const newMoviesFound = movies.map(movie => (movie.id === newMovie.movieId ? Object.assign(movie, {saved: true}, {_id: newMovie._id}) : movie))
                const newLocalMoviesFound = localFoundedMovies.map(movie => (movie.id === newMovie.movieId ? Object.assign(movie, {saved: true}, {_id: newMovie._id}) : movie))
                setMovies(newMoviesFound);
                localStorage.setItem('movies', JSON.stringify(newMovies));
                localStorage.setItem('moviesFound', JSON.stringify(newLocalMoviesFound));
            })
            .catch(() => {
                setSuccess(false);
                setIsInfoTooltipPopupOpen(true)
                setMessage('Произошла ошибка на сервере')
            })
            .finally(() => {
                setPreloader(false);
            })
    }

    const deleteMovie = (movie) => {
        setPreloader(true);
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        const localFoundedMovies = JSON.parse(localStorage.getItem('moviesFound'));
        const _id = movie._id;

        mainApi.deleteMovies(_id)
            .then((deletedMovie) => {

                const newLocalSavedMovies = localSavedMovies.filter(mov => mov._id !== deletedMovie._id);
                localStorage.setItem('savedMovies', JSON.stringify(newLocalSavedMovies));

                setSavedMovies(newLocalSavedMovies);

                const newMovies = localMovies.map(movie => (movie.id === deletedMovie.movieId ? Object.assign(movie, {saved: false}) : movie));
                const newMoviesFound = movies.map(movie => (movie.id === deletedMovie.movieId ? Object.assign(movie, {saved: false}) : movie));
                const newLocalMoviesFound = localFoundedMovies.map(movie => (movie.id === deletedMovie.movieId ? Object.assign(movie, {saved: false}) : movie));
                setMovies(newMoviesFound);
                localStorage.setItem('movies', JSON.stringify(newMovies));
                localStorage.setItem('moviesFound', JSON.stringify(newLocalMoviesFound));
                setSuccess(true);
                setIsInfoTooltipPopupOpen(true)
            })
            .catch(() => {
                setSuccess(false);
                setIsInfoTooltipPopupOpen(true)
                setMessage('Произошла ошибка на сервере')
            })
            .finally(() => {
                setPreloader(false)
                closePopup()
            })
    }

    useEffect(() => {
        if (location === '/saved-movies') setSavedMovies(savedMovies);
    }, [savedMovies, location]);

    const handleSave = (movie) => {
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const savedMovie = localSavedMovies.filter(mov => mov.movieId === movie.movieId)[0];

        savedMovie ? deleteMovie(savedMovie) : addMovie(movie)
    }

    const filterShortMovies = (set) => {
        return set.filter(el => el.duration <= 40);
    }

    const onRenderShort = ({saved, shortMovies}) => {
        if (shortMovies) {
            setShowShortMovies(true)
            saved ? setShortSavedMovies(filterShortMovies(savedMovies)) : setMoviesShort(filterShortMovies(moviesFound))
        } else {
            setShowShortMovies(false)
            saved ? setShortSavedMovies([]) : setMoviesShort([])
        }
    }

    useEffect(() => {
    }, [savedMovies, movies])


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Switch>
                    <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
                        <Header themeDark={true} loggedIn={loggedIn} isBurgerOpened={isBurgerOpened}
                                onClickBurger={onClickBurger}/>
                        <Movies
                            preloader={preloader}
                            handleSearch={searchMovies}
                            searchMovieError={searchMovieError}
                            cardsForList={showShortMovies ? moviesShort : movies}
                            moviesFound={moviesFound}
                            onSave={handleSave}
                            moreMovies={handleMoreMovies}
                            renderShort={onRenderShort}
                        />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
                        <Header themeDark={true} isBurgerOpened={isBurgerOpened} onClickBurger={onClickBurger}
                                loggedIn={loggedIn}/>
                        <SavedMovies
                            preloader={preloader}
                            handleSearch={searchMovies}
                            searchMovieError={searchMovieError}
                            cardsForList={showShortMovies ? shortSavedMovies : savedMovies}
                            onSave={handleSave}
                            renderShort={onRenderShort}
                        />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
                        <Header loggedIn={loggedIn} onClickBurger={onClickBurger} isBurgerOpened={isBurgerOpened}
                                themeDark={true}/>
                        <Profile onSignOut={handleSignOut} onUpdateUser={handleUpdateUser}/>
                    </ProtectedRoute>
                    <Route exact path="/">
                        <Header themeDark={false} isBurgerOpened={isBurgerOpened} onClickBurger={onClickBurger}
                                loggedIn={loggedIn}/>
                        <Main loggedIn={loggedIn}/>
                    </Route>
                    <Route path="/signup">
                        {
                            !loggedIn
                                ? <Register onRegister={handleRegister}/>
                                : <Redirect to='/'/>
                        }
                    </Route>
                    <Route path="/signin">
                        {
                            !loggedIn
                                ? <Login onLogin={handleLogin}/>
                                : <Redirect to='/'/>
                        }
                    </Route>
                    <Route path="*">
                        <NotFound
                        goBack={goBack}/>
                    </Route>
                </Switch>
                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    success={success}
                    onClose={closePopup}
                    message={message}
                />
                <Footer/>
            </div>
        </CurrentUserContext.Provider>
    )
}
