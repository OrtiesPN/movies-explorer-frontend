import './Input.css';
import { nameRegex } from '../../utils/constants';

export default function Input ({inputType, inputLabel, minLength="", maxLength="", values, placeholder, isInputValid, onChange, errors, onEdit, onClick}) {
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
                    pattern={inputLabel === "name" ? nameRegex : undefined}
                    minLength={minLength}
                    maxLength={maxLength}
                    required
                    value={values ? values : ""}
                    onChange={onChange}
                    onClick={onClick}
                >
                </input>
                <span className="input__error_active">
                    {errors === "Введите данные в указанном формате." ? "Имя может содержать латиницу или кириллицу, пробел или дефис" :errors}
                </span>
                {/* <span className={`input__error ${
                        isInputValid === undefined || isInputValid
                          ? ""
                          : "input__error_active"
                      }`}>
                    {errors}
                </span> */}
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
                    pattern={inputLabel === "name" ? nameRegex : undefined}
                    disabled={!onEdit}
                >
                </input>
            </label>
        ),
    }[inputType] 
}