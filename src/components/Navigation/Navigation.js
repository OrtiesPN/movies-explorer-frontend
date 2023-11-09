import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import "./Navigation.css";
import userLogo from "../../images/icon__COLOR_icon-main.svg"
import Button from "../Button/Button";
import BurgerButton from '../BurgerButton/BurgerButton';

export default function Navigation({ isLoggedIn, isBurgerClicked, onClickBurger,}) {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    const activeLink = `navigation__link_active_${isBurgerClicked ? "mobile" : "desktop"}`;

    return(
        <>
            {!isLoggedIn ? 
            (
                <nav className="navigation">
                    <ul className="navigation__list">
                        <li className="navigation__item">
                            <Link to="/signup" className="navigation__link navigation__link_guest">
                                Регистрация
                            </Link>
                        </li>
                        <li className="navigation__item">
                            <Link to="/signin" className="navigation__link navigation__link_guest">
                                <Button buttonType="signinHeader"/>
                            </Link>
                        </li>
                    </ul>
            </nav>
            ) : isMobile ? (
                <>
                    <BurgerButton isBurgerClicked={isBurgerClicked} onClickBurger={onClickBurger} />
                    <nav className={`navigation  ${isBurgerClicked? "navigation_type_mobile navigation_type_mobile_visible" : "navigation_type_mobile" }`} onClick={onClickBurger}>
                        <ul className="navigation__list navigation__list_user-mobile" onClick={(evt=> evt.stopPropagation())}>
                        <li className="navigation__item-mobile">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => isActive ? `navigation__link navigation__link_mobile ${activeLink}` : "navigation__link navigation__link_mobile"}
                                    onClick={onClickBurger}
                                    >
                                    Главная
                                </NavLink>
                            </li>
                            <li className="navigation__item-mobile">
                                <NavLink
                                    to="/movies"
                                    className={({ isActive }) => isActive ? `navigation__link navigation__link_mobile ${activeLink}` : "navigation__link navigation__link_mobile"}
                                    onClick={onClickBurger}
                                    >
                                    Фильмы
                                </NavLink>
                            </li>
                            <li className="navigation__item-mobile">
                                <NavLink
                                to="/saved-movies"
                                className={({ isActive }) => isActive ? `navigation__link navigation__link_mobile ${activeLink}` : "navigation__link navigation__link_mobile"}
                                onClick={onClickBurger}
                                >
                                    Сохраненные фильмы
                                </NavLink>
                            </li>
                            <li className="navigation__item-mobile">
                                <NavLink
                                    to="/profile"
                                    className="navigation__link navigation__link_profile"
                                    onClick={onClickBurger}
                                >
                                    <img src={userLogo} alt="User" className="navigation__user-logo"/>
                                    Аккаунт
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </>
                ) : (
                    <nav className="navigation">
                        <ul className="navigation__list navigation__list_user-desktop">
                            <li className="navigation__item navigation__item_logged">
                                <NavLink to="/movies" className={({ isActive }) => isActive ? `navigation__link navigation__link_logged ${activeLink}` : "navigation__link navigation__link_logged"}>
                                    Фильмы
                                </NavLink>
                            </li>
                            <li className="navigation__item navigation__item_logged">
                                <NavLink to="/saved-movies" className={({ isActive }) => isActive ? `navigation__link navigation__link_logged ${activeLink}` : "navigation__link navigation__link_logged"}>
                                    Сохраненные фильмы
                                </NavLink>
                            </li>
                            <li className="navigation__item navigation__item_logged">
                                <NavLink
                                    to="/profile"
                                    className="navigation__link navigation__link_profile"
                                    onClick={onClickBurger}
                                >
                                    <img src={userLogo} alt="User" className="navigation__user-logo"/>
                                    Аккаунт
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </>
    )
}

// <Button type="burger" isBurgerClicked={isBurgerClicked} onClickBurger={onClickBurger}/>