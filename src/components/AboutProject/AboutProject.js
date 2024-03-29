import "./AboutProject.css";

export default function AboutProject() {
    return (
        <section className="project">
            <div className="project__wrapper">
                <h2 className="project__about-title" id="about">О проекте</h2>
                <ul className="project__specs">
                    <li className="project__spec">
                        <h3 className="project__spec-title">Дипломный проект включал 5 этапов</h3>
                        <p className="project__spec-about">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </li>
                    <li className="project__spec">
                        <h3 className="project__spec-title">На выполнение диплома ушло 5 недель</h3>
                        <p className="project__spec-about">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </li>
                </ul>
                <div className="project__timebar">
                    <span className="project__timecell project__timecell_week1">1 неделя</span>
                    <span className="project__stagename backend">Back-end</span>
                    <span className="project__timecell project__timecell_week4">4 недели</span>
                    <span className="project__stagename frontend">Front-end</span>
                </div>
            </div>
        </section>
    )
}