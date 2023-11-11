import "./Button.css";
import userLogo from "../../images/icon__COLOR_icon-main.svg"

export default function Button ({buttonType, isBurgerClicked, onClickBurger, titleButton, isValid, isFail, isSend, onClick}) {
    return {
        signinHeader: (
            <button
                className="button button_type_header-signin"
                type="button"
                aria-label="Войти"
            >
                Войти
            </button>
        ),
        logreg: (
            <button
                className="button button_type_logreg"
                type="submit"
                disabled={!isValid || isFail || isSend ? true : false}
                aria-label={titleButton}
                onClick={onClick}
            >
                {titleButton}
            </button>
        ),
        profile: (
            <button
                className="button button_type_profile"
                type="button"
                aria-label={titleButton}
                onClick={onClick}
            >
                {titleButton}
            </button>
        ),
        signout: (
            <button
                className="button button_type_signout"
                type="button"
                aria-label={titleButton}
            >
                {titleButton}
            </button>
        ),
        more: (
            <button
                className="button button_type_more"
                type="button"
                aria-label={titleButton}
            >
                {titleButton}
            </button>
        )
    }[buttonType];
}
