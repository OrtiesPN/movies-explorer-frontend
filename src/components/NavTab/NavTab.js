import "./NavTab.css";

export default function NavTab() {
    return (
        <nav className="navtab">
            <ul className="navtab__list">
                <li className="navtab__item">
                    <a className="navtab__anchorlink" href="#about">О проекте</a>  
                </li>
                <li className="navtab__item">
                    <a className="navtab__anchorlink" href="#techs">Технологии</a>  
                </li>
                <li className="navtab__item">
                    <a className="navtab__anchorlink" href="#student">Студент</a>  
                </li>
            </ul>
        </nav>
    )
};
