import './Movies.css';
import { useState, useContext, useEffect } from 'react';
import {
    transformMovies,
    filterMovies,
    filterShortMovies,
} from '../../utils/utils.js';
import moviesApi from '../../utils/MoviesApi.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function Movies({ setIsLoader, setIsInfoTooltip, savedMoviesList, onLikeClick, onDeleteClick }) {
    const currentUser = useContext(CurrentUserContext);

    const [shortMovies, setShortMovies] = useState(false);
    const [initialMovies, setInitialMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [NotFound, setNotFound] = useState(false);
    const [isAllMovies, setIsAllMovies] = useState([]);

    function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
        const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
        if (moviesList.length === 0) {
            setIsInfoTooltip({
                isOpen: true,
                successful: false,
                text: 'Ничего не найдено.',
            });
            setNotFound(true);
        } else {
            setNotFound(false);
        }
        setInitialMovies(moviesList);
        setFilteredMovies(
            shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
        );
        localStorage.setItem(
            `${currentUser.email} - movies`,
            JSON.stringify(moviesList)
        );
    }

    // поиск по запросу
    function handleSearchSubmit(inputValue) {
        localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
        localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);

        if (isAllMovies.length === 0) {
            setIsLoader(true);
            moviesApi
                .getMovies()
                .then(movies => {
                    setIsAllMovies(movies);
                    handleSetFilteredMovies(
                        transformMovies(movies),
                        inputValue,
                        shortMovies
                    );
                })
                .catch(() =>
                    setIsInfoTooltip({
                        isOpen: true,
                        successful: false,
                        text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
                    })
                )
                .finally(() => setIsLoader(false));
        } else {
            handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
        }
    }

    function handleShortMovies() {
        setShortMovies(!shortMovies);
        if (!shortMovies) {
            setFilteredMovies(filterShortMovies(initialMovies));
        } else {
            setFilteredMovies(initialMovies);
        }
        localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
    }

    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
            setShortMovies(true);
        } else {
            setShortMovies(false);
        }
    }, [currentUser]);

    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - movies`)) {
            const movies = JSON.parse(
                localStorage.getItem(`${currentUser.email} - movies`)
            );
            setInitialMovies(movies);
            if (
                localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
            ) {
                setFilteredMovies(filterShortMovies(movies));
            } else {
                setFilteredMovies(movies);
            }
        }
    }, [currentUser]);

    return (
        <main className="movies">
            <SearchForm
                handleSearchSubmit={handleSearchSubmit}
                handleShortMovies={handleShortMovies}
                shortMovies={shortMovies}
            />
            {!NotFound && (
                <MoviesCardList
                    moviesList={filteredMovies}
                    savedMoviesList={savedMoviesList}
                    onLikeClick={onLikeClick}
                    onDeleteClick={onDeleteClick}
                />
            )}
        </main>
    );
}
