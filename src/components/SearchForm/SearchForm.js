import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import { useState } from "react";

export default function SearchForm(props ) {

    const [text, setText] = useState(" ");
    const [shortMovies, setShortFilms] = useState(false);
    const [validForm, setValidForm] = useState(true);
    const saved = !!props.showSaved;

    const handleInputChange = (e) => {
        setText(e.target.value);
        setValidForm(e.target.checkValidity());
    }

    const handleSearchClick = (e) => {
        e.preventDefault();
        props.handleSearch({ text, saved, shortMovies });
    }

    const handleShortFilmsClick = ({ checked }) => {
        setShortFilms(props.checked);
        props.handleSearch({ text, saved, shortMovies : checked });
    }

    return (
    <section className="search">
      <form className="search__form" name="search" onSubmit={handleSearchClick}>
        <input
          className="search__input"
          placeholder="Фильм"
          name="search"
          type="text"
          onChange={handleInputChange}
          required
        />
         <span className="search__error">{!validForm && "Необходимо заполнить поле"}</span>
        <button className="search__button" type="submit" disabled={!validForm}>Найти</button>
      </form>
      <FilterCheckbox onChange={handleShortFilmsClick} />
    </section>
  );
}
