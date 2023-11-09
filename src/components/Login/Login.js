import { Link } from "react-router-dom";
import "./Login.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import logo from "../../images/logo.svg";

import useValidator from "../../utils/useValidator";

export default function Login ({onSignIn}) {
    const { values, errors, isInputValid, isFormValid, handleChange,} =
    useValidator();

    function handleSubmit(evt) {
        evt.preventDefault();
        onSignIn({
            email: values.user_email,
            password: values.user_password
        })
    }

    return (
        <main className="login">
            <div className="login__wrapper">
                <Link to="/" className="login__home">
                    <img
                        src={logo}
                        alt="логотип Мovies"
                        className="login__logo"
                    />
                </Link>
                <Form
                    buttonType={"logreg"}
                    name={"login"}
                    title={"Рады видеть!"}
                    titleButton={"Войти"}
                    isValid={isFormValid}
                    onSubmit={handleSubmit}
                >
                    <fieldset className="login__fieldset">
                    <Input
                            inputType={"logreg"}
                            values={values.user_email}
                            inputLabel={"email"}
                            isInputValid={isInputValid.user_email}
                            onChange={handleChange}
                            errors={errors.user_email}
                            />
                            <Input
                            inputType={"logreg"}
                            values={values.user_password}
                            inputLabel={"password"}
                            minLength={"2"}
                            maxLength={"8"}
                            isInputValid={isInputValid.user_password}
                            onChange={handleChange}
                            errors={errors.user_password}
                            />
                    </fieldset>
                </Form>
                <p className="login__caption">Ещё не зарегистрированы? <Link to="/signup" className="login__signup">Регистрация</Link></p>
            </div>
        </main>
    )
}