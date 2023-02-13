import './SearchForm.css';
import {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';
import useFormWithValidation from '../../hooks/useFormWithValidation.js';
import CurrentUserContext from '../../context/CurrentUserContext.js';

export default function SearchForm({ handleSearchSubmit, handleShortMovies, shortMovies }) {
    const currentUser = useContext(CurrentUserContext);
    const location = useLocation();
    const { values, handleChange, isValid, setIsValid } = useFormWithValidation();

    const [errorQuery, setErrorQuery] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
    }

    useEffect(() => {
        setErrorQuery('')
    }, [isValid]);

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - movieSearch`)) {
            values.search = localStorage.getItem(`${currentUser.email} - movieSearch`);
        }
    }, [currentUser]);

    return (
        <section className="search">
            <form className="search__form" name="search" noValidate onSubmit={handleSubmit}>
                <input
                    className="search__input"
                    name="search"
                    type="text"
                    placeholder="Фильм"
                    autoComplete="off"
                    value={values.search || ''}
                    onChange={handleChange}
                />
                <span className="search__error">{errorQuery}</span>
                <button className="search__button" type="submit">Найти</button>
            </form>
            <FilterCheckbox shortMovies={shortMovies} handleShortMovies={handleShortMovies} />
        </section>
    )
}
