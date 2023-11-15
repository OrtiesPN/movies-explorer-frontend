import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Button from "../Button/Button";
import Preloader from "../Preloader/Preloader"
import { useCallback, useEffect, useState } from "react";

import {
    tablet,
    tabletWide,
    mobile,
    desktopBody,
    desktopStep,
    tabletBody,
    tabletStep,
    tabletWideBody,
    tabletWideStep,
    mobileBody,
    mobileStep,
    desktop
} from "../../utils/constants"
import { useLocation } from "react-router-dom";

export default function MoviesCardList({movies, isAwaitApi, firstSearch, isNotFound, isFail, savedMovies, noSaves, savedMoviesSection, handleMovieLike, handleMovieDislike, handleMovieDelete}) {
    
    const location = useLocation()
    const [limit, setLimit] = useState("");

    const cards = movies.slice(0, limit);

    function setCounters() {
        const counter = { body: desktopBody, step: desktopStep}
        if (window.innerWidth <= tabletWide) {
            counter.body = tabletWideBody;
            counter.step = tabletWideStep;
        }
        if (window.innerWidth <= tablet) {
            counter.body = tabletBody;
            counter.step = tabletStep;
        }
        if (window.innerWidth <= mobile) {
            counter.body = mobileBody;
            counter.step = mobileStep;
        }
        return counter
    }

    function renderMore() {
        setLimit(limit + setCounters().step)
    }

    useEffect(() => {
        if (location.pathname === "/movies") {
            setLimit(setCounters().body)
            function renderLimits() {
                if (window.innerWidth > tabletWide) {
                    setLimit(setCounters().body)
                }
                if (window.innerWidth <= tabletWide) {
                    setLimit(setCounters().body)
                }
                if (window.innerWidth <= tablet) {
                    setLimit(setCounters().body)
                }
                if (window.innerWidth <= mobile) {
                    setLimit(setCounters().body)
                }
            }
            window.addEventListener('resize', renderLimits)
            return () => window.removeEventListener('resize', renderLimits)
        }
    }, [location, movies])

    // useEffect(() => {
    //     setTimeout(() => {
    //       window.addEventListener('resize', setCounters);
    //     }, 500);
    //   });

    return (
        isAwaitApi ? (
            <Preloader />
            ) : (
                <>
                <p className={`elements-message ${isNotFound || isFail || noSaves || firstSearch ? "elements-message_active" : ""}`}>
                   {isNotFound & !firstSearch ? "Ничего не найдено" :
                   isFail ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" :
                   noSaves ? "У вас нет сохраненных фильмов" :
                   firstSearch ? <Preloader /> : ""}
                </p>
                { location.pathname === "/movies" ? (
                    <>
                        <ul className={`elements ${isNotFound ? "elements_hidden" : ""}`}>
                            {cards.map(({id, ...rest}) => (
                                <MoviesCard
                                    key={id}
                                    id={id}
                                    savedMovies={savedMovies}
                                    savedMoviesSection={savedMoviesSection}
                                    handleMovieLike={handleMovieLike}
                                    handleMovieDislike={handleMovieDislike}
                                    {...rest}
                                />
                            ))}
                        </ul>
                        <div className={`elements-more ${cards.length < limit ? "elements-more_hidden" : ""} `}> 
                            <Button buttonType="more" titleButton="Ещё" onClick={renderMore} />
                        </div>
                    </>
                    
                ) : (
                    <ul className={`elements ${movies.length === 0 ? "elements_hidden" : ""}`}>
                            {movies.map(({id, ...rest}) => (
                                <MoviesCard
                                    key={id}
                                    id={id}
                                    handleMovieDelete={handleMovieDelete}
                                    savedMoviesSection={savedMoviesSection}
                                    {...rest}
                                />
                            ))}
                        </ul>
                )}
                
                </>
            )
        
        
    )
}

// elements-more_hidden