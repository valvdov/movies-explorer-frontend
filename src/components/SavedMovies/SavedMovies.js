import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from "../Preloader/Preloader";

export default function SavedMovies(props) {

    return (
        <main className="saved-movies">
            <SearchForm
                handleSearch = {props.handleSearch}
                renderShort = {props.renderShort}
                showSaved = {true}
            />
            {props.preloader && <Preloader />}
            <MoviesCardList
                cardsForList = {props.cardsForList}
                searchMovieError = {props.searchMovieError}
                onSave = {props.onSave}
            />
        </main>
          )
}
