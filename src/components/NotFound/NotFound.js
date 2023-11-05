import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound () {
    return (
        <section className="notfound">
            <h1 className="notfound__title">404</h1>
            <p className="notfound__caption">Страница не найдена</p>
            <Link exact to="/" className="notfound__link">Назад</Link>
        </section>
    )
}