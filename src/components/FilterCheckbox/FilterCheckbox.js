import './FilterCheckbox.css';

export default function FilterCheckbox({ shortMovies, handleShortMovies }) {
    return (
        <label className="filter">
            <input className="filter__checkbox" type="checkbox" onChange={handleShortMovies} checked={shortMovies ? true : false}/>
            <span className="filter__tumbler"></span>
            <span className="filter__text">Короткометражки</span>
        </label>
    );
}
