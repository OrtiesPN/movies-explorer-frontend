import "./Form.css";
import Button from "../Button/Button";

export default function Form({
  buttonType,
  name,
  title,
  titleButton,
  isValid = true,
  onSubmit,
  isFail,
  isSend,
  children,
}) {

  return (
    <form
      className="form"
      id={`${name}-form`}
      onSubmit={onSubmit}
    >
        <h2 className="form__title">{title}</h2>
        {children}
        <div className="form__button-wrapper">
          <span className="form__alert">{isFail && "Что-то пошло не так"}</span>
          <Button buttonType={buttonType} titleButton={titleButton} isValid={isValid} isFail={isFail} isSend={isSend} />
        </div>
      </form>
  )
}
      