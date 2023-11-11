import "./Movies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import {demoMovies} from "../../utils/constants"
import Button from "../Button/Button";
import Preloader from "../Preloader/Preloader"

// В этой секции для демонстрации стилей иконки сохраненных фильмов они реализованы как кнопки лайка

export default function Movies() {
    return (
        <main className="movies">
            <SearchForm />
            {/* <Preloader /> */}
            <MoviesCardList movies={demoMovies} savedMoviesSection={false}/>  
            <div className="movies__more">
                <Button buttonType="more" titleButton="Ещё" />
            </div>
        </main>
    )
}

