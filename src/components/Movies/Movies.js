import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

export default function Movies({ movies }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  )
}
