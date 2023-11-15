import { Link } from "react-router-dom";
import "./Profile.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import FailContext from "../../contexts/FailContext";
import IsSendContext from "../../contexts/IsSendContext";

import useValidator from "../../utils/useValidator";

export default function Profile ({onSubmit, onSignout, isOnEdit, setIsOnEdit, isSuccess, setIsSuccess}) {
    const { values, errors, isInputValid, isFormValid, handleChange, reset} =
    useValidator();

    const currentUser = useContext(CurrentUserContext);
    const [isFail, setIsFail] = useContext(FailContext);
    const isSend = useContext(IsSendContext); 

    function handleEdit(evt) {
        evt.preventDefault();
        setIsOnEdit(true);
        setIsSuccess(false);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({
            name: values.edit_name,
            email: values.edit_email
        })
    }

    function resetEdit(evt) {
        evt.preventDefault();
        setIsOnEdit(false);
        setIsFail(false);
        reset(currentUser);
    }

    useEffect(() => {
        setIsFail(false);
        setIsOnEdit(false);
        reset(currentUser);
      },[setIsFail, setIsOnEdit, reset, currentUser]);

    useEffect(() => {
        setIsSuccess(false);
    }, [setIsSuccess])


    return (
        <section className="profile">
            <form
                className="profile__form"
                name="account"
                id="account-form"
                onSubmit={handleSubmit}
                isValid={isFormValid}
            >
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                {!isOnEdit ? (
                    <>
                        <fieldset className="profile__fieldset">
                                <Input
                                    inputType={"edit"}
                                    values={currentUser.name}
                                    inputLabel={"name"}
                                    onEdit={isOnEdit}
                                />
                                <div className="profile__divider"></div>
                                <Input
                                    inputType={"edit"}
                                    values={currentUser.email}
                                    inputLabel={"email"}
                                    onEdit={isOnEdit}
                                />
                            </fieldset>
                        <div className="profile__buttons">
                        <span className="profile__allert profile__allert_succes">{isSuccess ? "Данные обновлены" : ""}</span>
                            <Button buttonType={"profile"} titleButton={"Редактировать"} isValid={true} onClick={handleEdit} />
                            <Link to="/" className="profile__signout" onClick={onSignout}>Выйти из аккаунта</Link>
                        </div>
                    </>
                    ) : (
                        <>
                            <fieldset className="profile__fieldset">
                                <Input
                                    inputType={"edit"}
                                    values={values.edit_name}
                                    inputLabel={"name"}
                                    placeholder={currentUser.name}
                                    minLength={"2"}
                                    maxLength={"30"}
                                    isInputValid={isInputValid.edit_name}
                                    onChange={handleChange}
                                    onEdit={isOnEdit}
                                    onClick={() => setIsFail(false)}
                                />
                                <div className="profile__divider"></div>
                                <Input
                                    inputType={"edit"}
                                    values={values.edit_email}
                                    inputLabel={"email"}
                                    placeholder={currentUser.email}
                                    isInputValid={isInputValid.edit_email}
                                    onChange={handleChange}
                                    onEdit={isOnEdit}
                                    onClick={() => setIsFail(false)}
                                />
                            </fieldset>
                            <div className="profile__buttons">
                                <span className="profile__allert">{errors.edit_name ? errors.edit_name : errors.edit_email ? errors.edit_email : isFail ? "Что-то пошло не так" : ""}</span>
                                <Button
                                buttonType={"logreg"}
                                titleButton={"Сохранить"}
                                isValid={isFormValid}
                                isFail={isFail}
                                isSend={isSend}
                                onClick={handleSubmit}
                                />
                                <Button buttonType={"profile"} titleButton={"Отменить редактирование"} isValid={true} onClick={resetEdit} />
                            </div> 
                        </>
                )}
            </form>
        </section>
    )


}