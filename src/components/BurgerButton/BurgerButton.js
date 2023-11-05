import "./BurgerButton.css";

export default function BurgerButton({isBurgerClicked, onClickBurger}) {
    return (
        <button
                className={`burger ${isBurgerClicked ? "burger_clicked" : ""}`}
                onClick={onClickBurger}
                type="button"
                aria-label="Меню"
            >
                <div className={`burger__bar ${isBurgerClicked ? "burger__bar_clicked" : ""}`}></div>
                <div className={`burger__bar ${isBurgerClicked ? "burger__bar_clicked" : ""}`}></div>
                <div className={`burger__bar ${isBurgerClicked ? "burger__bar_clicked" : ""}`}></div>
        </button>
    )
    
};