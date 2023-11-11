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
    ...props}) {

    return {
        movies:
            <>
                <Header 
                    isBurgerClicked={isBurgerClicked}
                    onClickBurger={handleBurgerMenuClick}
                />
                <Movies />
                <Footer />
            </>,
        savedMovies:
            <>
                <Header
                    isBurgerClicked={isBurgerClicked}
                    onClickBurger={handleBurgerMenuClick}
                />
                <SavedMovies />
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