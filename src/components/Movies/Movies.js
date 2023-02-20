import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from "../Preloader/Preloader";
import ShowMoreButton from "../ShowMore/ShowMore";
import {useLocation} from "react-router-dom";

export default function Movies(props) {
    const location = useLocation();

    return (
            <main className="movies">
                <SearchForm
                    handleSearch = {props.handleSearch}
                    renderShort = {props.renderShort}
                />
                {props.preloader && <Preloader />}
                <MoviesCardList
                    cardsForList = {props.cardsForList}
                    searchMovieError = {props.searchMovieError}
                    onSave = {props.onSave}
                />
                {location.pathname === '/movies' && (
                    props.moviesFound.length > props.cardsForList.length && <ShowMoreButton onClick = {props.moreMovies}>Ещё</ShowMoreButton>)}
            </main>
  )
}
