import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import logo from "../../images/logo.svg";

import useValidator from "../../utils/useValidator";
import FailContext from "../../contexts/FailContext";
import IsSendContext from "../../contexts/IsSendContext";

export default function Register ({onSignUp}) {
    const [isFail, setIsFail] = useContext(FailContext);
    const isSend = useContext(IsSendContext);
    const { values, errors, isInputValid, isFormValid, handleChange,} =
    useValidator();

    function handleSubmit(evt) {
        evt.preventDefault();
        onSignUp({
            name: values.user_name,
            password: values.user_password,
            email: values.user_email
          });
    }

    useEffect(() => {
        setIsFail(false);
      },[setIsFail]);

    return (
        <main className="register">
            <div className="register__wrapper">
                <Link to="/" className="register__home">
                    <img
                    src={logo}
                    alt="логотип Мovies"
                    className="register__logo"
                    />
                </Link>
                <Form
                    buttonType={"logreg"}
                    name={"register"}
                    title={"Добро пожаловать!"}
                    titleButton={"Зарегистрироваться"}
                    isValid={isFormValid}
                    onSubmit={handleSubmit}
                    isFail={isFail}
                    isSend={isSend}
                >
                    <fieldset className="register__fieldset">
                        <Input
                            inputType={"logreg"}
                            values={values.user_name}
                            inputLabel={"name"}
                            minLength={"2"}
                            maxLength={"30"}
                            isInputValid={isInputValid.user_name}
                            onChange={handleChange}
                            onClick={() => setIsFail(false)}
                            errors={errors.user_name}
                            />
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
                <p className="register__caption">Уже зарегистрированы? <Link to="/signin" className="register__signin">Войти</Link></p>
            </div>
        </main>
    )
}