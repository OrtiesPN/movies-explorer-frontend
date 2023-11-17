import "./MoviesCard.css"
import { beatApi } from "../../utils/constants";
import { useLocation } from "react-router-dom";

export default function MoviesCard({savedMovies, savedMoviesSection, handleMovieLike, handleMovieDislike, handleMovieDelete, ...props}) {
  const location = useLocation();

  function onLikeClick() {
    if (savedMovies.some(item => props.id === item.movieId)) {
        handleMovieDislike(props)
    } else {
        handleMovieLike(props)
      }
    }

    function onDeleteClick() {
      handleMovieDelete(props)
    }
  
  return (
    <li className="card">
        <a href={props.trailerLink} className="card__link" target="_blank" rel="noreferrer">
            <img src={ location.pathname === "/movies" ? `${beatApi}${props.image.url}` : props.image} alt={props.nameEN} className="card__image" />
        </a>      
        <div className="card__caption">
            <div className="card__info">
                <h2 className="card__title">{props.nameRU}</h2>
                <span className="card__duration">{`${(props.duration - (props.duration % 60)) / 60}ч${props.duration % 60}м`}</span>
            </div>
            { location.pathname === "/movies" ? (
              <button
                className={`card__button card__button${savedMovies.some(item => props.id === item.movieId) ? "_active" : "_inactive"}`}
                type="button"
                aria-label="В коллекцию"
                onClick={onLikeClick}
              />
            ) : (
                  <button
                    className="card__button-delete"
                    type="button"
                    aria-label="Удалить"
                    onClick={onDeleteClick}
                  />
            )}
            
        </div>
    </li>
  );
}