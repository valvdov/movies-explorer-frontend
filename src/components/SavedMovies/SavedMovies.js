import './SavedMovies.css';
import { useState, useContext, useEffect } from 'react';
import {
    filterMovies,
    filterShortMovies,
} from '../../utils/utils.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function SavedMovies({ onDeleteClick, savedMoviesList, setIsInfoTooltip }) {
    const currentUser = useContext(CurrentUserContext);

    const [shortMovies, setShortMovies] = useState(false); // состояние чекбокса
    const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы
    const [showedMovies, setShowedMovies] = useState(savedMoviesList); // показываемывые фильмы
    const [filteredMovies, setFilteredMovies] = useState(showedMovies); // отфильтрованные по запросу фильмы

    function handleSearchSubmit(inputValue) {
        const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
        if (moviesList.length === 0) {
            setNotFound(true);
            setIsInfoTooltip({
                isOpen: true,
                successful: false,
                text: 'Ничего не найдено.',
            });
        } else {
            setNotFound(false);
            setFilteredMovies(moviesList);
            setShowedMovies(moviesList);
        }
    }

    function handleShortMovies() {
        if (!shortMovies) {
            setShortMovies(true);
            localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
            setShowedMovies(filterShortMovies(filteredMovies));
            filterShortMovies(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
        } else {
            setShortMovies(false);
            localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
            filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
            setShowedMovies(filteredMovies);
        }
    }

    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === 'true') {
            setShortMovies(true);
            setShowedMovies(filterShortMovies(savedMoviesList));
        } else {
            setShortMovies(false);
            setShowedMovies(savedMoviesList);
        }
    }, [savedMoviesList, currentUser]);

    useEffect(() => {
        setFilteredMovies(savedMoviesList);
        savedMoviesList.length !== 0 ? setNotFound(false) : setNotFound(true);
    }, [savedMoviesList]);

    return (
        <main className="saved-movies">
            <SearchForm
                handleSearchSubmit={handleSearchSubmit}
                handleShortMovies={handleShortMovies}
                shortMovies={shortMovies}
            />
            {!NotFound && (
                <MoviesCardList
                    moviesList={showedMovies}
                    savedMoviesList={savedMoviesList}
                    onDeleteClick={onDeleteClick}
                />
            )}
        </main>
    );
}
