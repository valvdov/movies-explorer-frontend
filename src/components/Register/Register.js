import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useForm from "../../hooks/useForm";
import { useEffect } from "react";

function Register({ onRegister}) {
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  useEffect(() => {
    resetForm()
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }


  return (
    <main className="register">
      <form className="register__form" name="register" noValidate onSubmit={handleSubmit}>
        <Link to="/" className="register__link">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <div className="register__labels-container">
          <label className="register__label">
            <span className="register__label-text">Имя</span>
            <input
              name="name"
              className={errors.email ? 'register__input register__input_error' : `register__input`}
              onChange={handleChange}
              type="text"
              required
              minLength={2}
              maxLength={30}
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
            <span className="register__error">{errors.name}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">E-mail</span>
            <input
              name="email"
              className={errors.email ? 'register__input register__input_error' : `register__input`}
              onChange={handleChange}
              type="email"
              required
            />
            <span className="register__error">{errors.email}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">Пароль</span>
            <input
              name="password"
              className={errors.email ? 'register__input register__input_error' : `register__input`}
              onChange={handleChange}
              minLength={6}
              type="password"
              required
            />
            <span className="register__error">{errors.password}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`register__button ${
              !isFormValid && 'register__button_disabled'
          }`}
          disabled={!isFormValid}
        >
          Зарегистрироваться
        </button>
        <span className="register__support">
          Уже зарегистрированы?&nbsp;
          <Link to="signin" className="register__link">
            Войти
          </Link>
        </span>
      </form>
    </main>
  )
}

export default Register;
