import Header from "../Header/Header"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile"
import Footer from "../Footer/Footer"

export default function ProtectedElement({
    elementType,
    isBurgerClicked,
    handleBurgerMenuClick,
    handleSubmit,
    handleExit,
    handleMovieLike,
    handleMovieDislike,
    handleMovieDelete,
    savedMovies,
    ...props}) {

    return {
        movies:
            <>
                <Header 
                    isBurgerClicked={isBurgerClicked}
                    onClickBurger={handleBurgerMenuClick}
                />
                <Movies
                    savedMovies={savedMovies}
                    handleMovieLike={handleMovieLike}
                    handleMovieDislike={handleMovieDislike}
                />
                <Footer />
            </>,
        savedMovies:
            <>
                <Header
                    isBurgerClicked={isBurgerClicked}
                    onClickBurger={handleBurgerMenuClick}
                />
                <SavedMovies
                    savedMovies={savedMovies}
                    handleMovieDelete={handleMovieDelete}
                />
                <Footer />
            </>,
        profile:
            <>
                <Header
                    isBurgerClicked={isBurgerClicked}
                    onClickBurger={handleBurgerMenuClick}
                />
                <Profile
                    onSubmit={handleSubmit}
                    onSignout={handleExit}
                    {...props}
                />
            </>,
    }[elementType];
}