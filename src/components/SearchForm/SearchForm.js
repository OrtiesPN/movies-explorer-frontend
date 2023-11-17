import { useEffect } from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";
import useValidator from "../../utils/useValidator";

export default function SearchForm({onSubmit, firstSearch, isShort, handleShort, query, setQuery, setIsFail}) {
    const location = useLocation();
    const { values, handleChange, reset} =
    useValidator();


    function handleSearch(evt) {
        evt.preventDefault();
        onSubmit(values.movie);
    }

    useEffect(() => {
        if (location.pathname === '/movies' && query) {
            reset({ movie : query});
        }
        if (location.pathname === '/saved-movies') {
            reset({ movie : ""});
        }
      }, [location, reset, query]);

    useEffect(() => {
        if (location.pathname === '/saved-movies' & values.movie === "") setQuery("")
    }, [location, values.movie, setQuery]);

    return (
        <form className="search" onSubmit={handleSearch}>
            <div className="search__form-container">
                <label className="search__label">
                    <span className="search__input-icon">
                        <input
                            className="search__input "
                            type="search"
                            name="movie"
                            placeholder="Фильм"
                            // required
                            value={values.movie || ""}
                            onChange={handleChange}
                            onClick={() => {
                                if (location.pathname === '/movies') setIsFail(false);
                            }}
                        >
                        </input>
                    </span>
                </label>
                <div className="search__button-block">
                    <button
                        className="search__go"
                        type="submit"
                        onClick={handleSearch}
                        aria-label="Поиск"
                        disabled={values.movie === "" ? true : false }
                    >
                    </button>
                    
                </div>
                <div className="search__options">
                        <button
                            className={`search__thumb search__thumb${isShort? "_active" : "_inactive"}`}
                            type="button"
                            onClick={handleShort}
                            disabled={firstSearch}
                            aria-label="Искать короткометражки"
                        >
                        </button>
                        <span className="search__option">Короткометражки</span>
                    </div>
            </div> 
        </form>
    )
}