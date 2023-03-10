import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__form" name="search">
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          required
        />
        <button className="search__button" type="submit">Найти</button>
      </form>
      <FilterCheckbox />
    </section>
  );
}
