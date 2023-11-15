import './Input.css';
import { nameRegex, emailRegex } from '../../utils/constants';
import IsSendContext from '../../contexts/IsSendContext';
import { useContext } from 'react';

export default function Input ({inputType, inputLabel, minLength="", maxLength="", values, placeholder, isInputValid, onChange, errors, onEdit, onClick}) {
    const isSend = useContext(IsSendContext);
    return {
        logreg: (
            <label className='input input_logreg'>
                {inputLabel === "name" ? "Имя" : inputLabel === "email" ? "E-mail" : "Пароль" }
                <input
                    className={`input__field input__field_logreg ${
                        isInputValid === undefined || isInputValid
                          ? ""
                          : "input__field_logreg_error"
                      }`}
                    name={`user_${inputLabel}`}
                    type={inputLabel === "name" ? "text" : inputLabel}
                    placeholder={inputLabel === "name" ? "Имя" : inputLabel === "password" ? "Пароль" : "E-mail"}
                    pattern={inputLabel === "name" ? nameRegex : inputLabel === "email" ? emailRegex : undefined}
                    minLength={minLength}
                    maxLength={maxLength}
                    required
                    value={values ? values : ""}
                    onChange={onChange}
                    onClick={onClick}
                    disabled={isSend}
                >
                </input>
                <span className="input__error_active">
                    {errors === "Введите данные в указанном формате." ? "Имя может содержать латиницу или кириллицу, пробел или дефис" :errors}
                </span>
            </label>
        ),
        edit: (
            <label className='input input_profile'>
                {inputLabel === "name" ? "Имя" : "E-mail"}
                <input 
                    className='input__field input__field_profile'
                    name={`edit_${inputLabel}`}
                    type={inputLabel === "name" ? "text" : inputLabel}
                    placeholder={placeholder}
                    required
                    value={values ? values : ""}
                    onChange={onChange}
                    onClick={onClick}
                    pattern={inputLabel === "name" ? nameRegex : inputLabel === "email" ? emailRegex : undefined}
                    disabled={!onEdit || isSend}
                >
                </input>
            </label>
        ),
    }[inputType] 
}