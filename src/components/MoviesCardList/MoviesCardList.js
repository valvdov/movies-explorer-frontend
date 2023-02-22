import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';

export default function MoviesCardList( props ) {


    return (
                  <section className="movies-card-list">
                      <ul className="movies-card-list__list">
                          {props.cardsForList.map((movie) => (
                              <MoviesCard
                                  movie={movie}
                                  key={movie.id ? movie.id : movie._id}
                                  showSaved={props.showSaved}
                                  onSave={props.onSave}

                              />
                          ))}
                      </ul>
                  </section>
  )
}
