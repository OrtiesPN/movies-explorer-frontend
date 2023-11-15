import "./MoviesCard.css"
import { useEffect, useState} from "react";
import { beatApi } from "../../utils/constants";
import { useLocation } from "react-router-dom";

export default function MoviesCard({savedMovies, savedMoviesSection, handleMovieLike, handleMovieDislike, handleMovieDelete, ...props}) {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function onLikeClick() {
    if (savedMovies.some(item => props.id === item.movieId)) {
        handleMovieDislike(props)
        setIsLiked(false)
        
    } else {
        setIsLiked(true)
        handleMovieLike(props)
      }
    }

    function onDeleteClick() {
      handleMovieDelete(props)
    }

    useEffect(() => {
      if (location.pathname === '/movies')
        setIsLiked(savedMovies.some(item => props.id === item.movieId))
    }, [setIsLiked, props.id, savedMovies, location]) 
  
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
                className={`card__button card__button${isLiked ? "_active" : "_inactive"}`}
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