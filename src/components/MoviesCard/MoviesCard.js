import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import {timeConversion} from "../../utils/utils";
export default function MoviesCard(props) {

  const handleClick = () => {
    props.onSave(props.movie);
  }
  const location = useLocation();

  const movieClick = () => {
    window.open(props.movie.trailerLink);
  };

  return (
    <li className="movies-card">
      <article className="movies-card__item">
          {location.pathname === '/movies' && (
              <img
              src={`https://api.nomoreparties.co${props.movie.image.url}` || props.movie.image}
              alt={props.movie.nameRU}
              className="movies-card__poster"
              onClick={movieClick}
              />
              )}
          {location.pathname === '/saved-movies' && (
              <img
                  src={props.movie.image}
                  alt={props.movie.nameRU}
                  className="movies-card__poster"
                  onClick={movieClick}
              />

          )}
        <div className="movies-card__description">
          <h2 className="movies-card__title">{props.movie.nameRU}</h2>
            {location.pathname === '/movies' && (
              <button
                  type="button"
                  className={`movies-card__button 
                   ${props.movie.saved && !props.showSaved ? 'movies-card__button_type_saved' : 'movies-card__button_type_save'}`}
                  onClick={handleClick}
              ></button>
            )}
            {location.pathname === '/saved-movies' && (
                <button
                    type="button"
                    className={`movies-card__button 
                   ${props.movie.saved && !props.showSaved ? '' : 'movies-card__button_type_unsaved'}`}
                    onClick={handleClick}
                ></button>
            )}
        </div>
        <span className="movies-card__duration">{timeConversion(props.movie.duration)}</span>
      </article>
    </li>
  )
}
