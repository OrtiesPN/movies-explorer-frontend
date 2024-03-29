import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import NavTab from "../NavTab/NavTab";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

export default function Main() {
    return (
        <main>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <Portfolio />
        </main>
    )
}