import "./SavedMovies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import {demoSavedMovies} from "../../utils/constants"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SavedMovies({handleMovieDelete, savedMovies}) {
    const location = useLocation();
    const [noSaves, setNoSaves] = useState(true);
    const [isShort, setIsShort] = useState(false);
    const [query, setQuery] = useState("");
    const [requestedMovies, setRequestedMovies] = useState(savedMovies);

    function filter(query, movies, isShort) {
        const queryResult = movies.filter((movie) => {
            const searchRU = movie.nameRU.toLowerCase().includes(query.toLowerCase());
            return searchRU;
        })
        if (isShort) {
            setRequestedMovies(queryResult.filter((result) => result.duration <= 40 ));
        } else
            setRequestedMovies(queryResult);
        }

    function goSearch(query) {
        setQuery(query);
        filter (query, savedMovies, isShort);
    }

    function handleShort() {
        setIsShort(!isShort);
        filter(query, savedMovies, !isShort);
    }

    useEffect(() => {
        if (savedMovies.length === 0) {
            setNoSaves(true)
        } else {
            setNoSaves(false)
        }
        filter(query, savedMovies, isShort);
    // }, [savedMovies])
    }, [query, savedMovies, isShort])

    return (
        <main className="saved-movies">
            <SearchForm
                onSubmit={goSearch}
                firstSearch={noSaves}
                isShort={isShort}
                setQuery={setQuery}
                handleShort={handleShort}
            />
            <MoviesCardList
                movies={requestedMovies}
                savedMoviesSection={true}
                noSaves={noSaves}
                isNotFound={savedMovies.length !== 0 & requestedMovies.length === 0 ? true : false}
                handleMovieDelete={handleMovieDelete}
            />
        </main>
    )
}