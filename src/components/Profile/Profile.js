import { Link } from "react-router-dom";
import "./Profile.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import useValidator from "../../utils/useValidator";

export default function Profile ({onSubmit, onSignout}) {
    const { values, errors, isInputValid, isFormValid, handleChange, reset} =
    useValidator();

    const currentUser = useContext(CurrentUserContext); 
    const [isOnEdit, setIsOnEdit] = useState(false);

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({
            name: values.edit_name,
            email: values.edit_email
        })
        setIsOnEdit(false);
    }

    function handleEdit(evt) {
        evt.preventDefault();
        setIsOnEdit(true);
    }

    function resetEdit(evt) {
        evt.preventDefault();
        setIsOnEdit(false);
        reset(currentUser);
    }

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
                                <div className="profile__inputdivider"></div>
                                <Input
                                    inputType={"edit"}
                                    values={currentUser.email}
                                    inputLabel={"email"}
                                    onEdit={isOnEdit}
                                />
                            </fieldset>
                        <div className="profile__buttons">
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
                                    minLength={"2"}
                                    maxLength={"30"}
                                    isInputValid={isInputValid.edit_name}
                                    onChange={handleChange}
                                    onEdit={isOnEdit}
                                />
                                <div className="profile__inputdivider"></div>
                                <Input
                                    inputType={"edit"}
                                    values={values.edit_email}
                                    inputLabel={"email"}
                                    isInputValid={isInputValid.edit_email}
                                    onChange={handleChange}
                                    onEdit={isOnEdit}
                                />
                            </fieldset>
                            <div className="profile__buttons">
                                <span className="profile__error">{errors.edit_name ? errors.edit_name : errors.edit_email ? errors.edit_email : ""}</span>
                                <Button buttonType={"logreg"} titleButton={"Сохранить"} isValid={isFormValid} onClick={handleSubmit} />
                                <Button buttonType={"profile"} titleButton={"Отменить редактирование"} isValid={true} onClick={resetEdit} />
                            </div> 
                        </>
                )}
            </form>
        </section>
    )


}