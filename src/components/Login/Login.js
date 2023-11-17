import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import logo from "../../images/logo.svg";

import useValidator from "../../utils/useValidator";
import FailContext from "../../contexts/FailContext";
import IsSendContext from "../../contexts/IsSendContext";

export default function Login ({onSignIn}) {
    const [isFail, setIsFail] = useContext(FailContext);
    const isSend = useContext(IsSendContext);
    const { values, errors, isInputValid, isFormValid, handleChange,} =
    useValidator();

    function handleSubmit(evt) {
        evt.preventDefault();
        onSignIn({
            email: values.user_email,
            password: values.user_password
        })
    }

    useEffect(() => {
        setIsFail(false);
      },[setIsFail]);

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
                    isFail={isFail}
                    isSend={isSend}
                >
                    <fieldset className="login__fieldset">
                    <Input
                            inputType={"logreg"}
                            values={values.user_email}
                            inputLabel={"email"}
                            isInputValid={isInputValid.user_email}
                            onChange={handleChange}
                            onClick={() => setIsFail(false)}
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
                            onClick={() => setIsFail(false)}
                            errors={errors.user_password}
                            />
                    </fieldset>
                </Form>
                <p className="login__caption">Ещё не зарегистрированы? <Link to="/signup" className="login__signup">Регистрация</Link></p>
            </div>
        </main>
    )
}