import { useEffect, useState } from "react";
import "./Movies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { moviesApi } from "../../utils/MoviesApi";
import { useLocation } from "react-router-dom";


export default function Movies({ handleMovieLike, handleMovieDislike, savedMovies}) {
    const location = useLocation();
    const [isAwaitApi, setIsAwaitApi] = useState(false);
    const [isShort, setIsShort] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    const [query, setQuery] = useState("")
    const [initMovies, setInitMovies] = useState([]);
    const [requestedMovies, setRequestedMovies] = useState([]);

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
        localStorage.setItem('query', query);
        setQuery(query);
        localStorage.setItem('isShort', isShort);
        // setIsShort(isShort);
        if (localStorage.initMovies) {
            setInitMovies(JSON.parse(localStorage.initMovies));
            const movies = JSON.parse(localStorage.initMovies);
            filter (query, movies, isShort);
        } else {
            setIsAwaitApi(true);
        moviesApi.getMovies()
        .then((res) => {
            localStorage.setItem('initMovies', JSON.stringify(res));
            setInitMovies(res);
            const movies = JSON.parse(localStorage.initMovies);
            filter (query, movies, isShort);
        })
        .catch(err => {
            setIsFail(true);
            console.log(`Не удалось выполнить запрос ${err}`)})
        .finally(() => {
            setIsAwaitApi(false);
        })
        }
    }

    function handleShort() {
        localStorage.setItem('isShort', !isShort);
        setIsShort(!isShort);
        filter(query, initMovies, !isShort);
        
    }

    useEffect(() => {
        if (requestedMovies.length === 0) setIsNotFound(true);
         else setIsNotFound(false);
    }, [requestedMovies])

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.initMovies) {
            const movies = JSON.parse(localStorage.initMovies);
            const query = localStorage.query;
            const isShort = JSON.parse(localStorage.isShort);
            setInitMovies(movies);
            setIsShort(isShort);
            setQuery(query);
            filter(query, movies, isShort);
        }
      }, [location]);


      useEffect(() => {
        setIsFail(false);
      },[setIsFail]);

    return (
        <main className="movies">
            <SearchForm
                onSubmit={goSearch}
                firstSearch={initMovies.length === 0 ? true : false}
                query={query}
                setQuery={setQuery}
                isShort={isShort}
                handleShort={handleShort}
                setIsFail={setIsFail}
            />
            <MoviesCardList
                movies={requestedMovies}
                isAwaitApi={isAwaitApi}
                firstSearch={initMovies.length === 0 ? true : false}
                isNotFound={isNotFound}
                isFail={isFail}
                savedMoviesSection={false}
                savedMovies={savedMovies}
                handleMovieLike={handleMovieLike}
                handleMovieDislike={handleMovieDislike}
            />
            
        </main>
    )
}

