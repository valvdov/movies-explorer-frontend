import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useEffect } from "react";
import useForm from "../../hooks/useForm";

function Login({ onLogin }) {

  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  useEffect(() => {
    resetForm()
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return (
    <main className="login">
      <form className="login__form" name="login" noValidate onSubmit={handleSubmit}>
        <Link to="/" className="login__link">
          <img src={logo} alt="Логотип" className="login__logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <div className="login__labels-container">
          <label className="login__label">
            <span className="login__label-text">E-mail</span>
            <input
              name="email"
              className={errors.email ? 'login__input login__input_error' : `login__input`}
              onChange={handleChange}
              minLength={2}
              maxLength={200}
              type="email"
              required
            />
            <span className="login__error">{errors.email}</span>
          </label>
          <label className="login__label">
            <span className="login__label-text">Пароль</span>
            <input
              name="password"
              className={errors.password ? 'login__input login__input_error' : `login__input`}
              onChange={handleChange}
              type="password"
              minLength={6}
              required
            />
            <span className="login__error">{errors.password}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`login__button ${
            !isFormValid && 'login__button_disabled'
          }`}
          disabled={!isFormValid}
        >
          Войти
        </button>
        <span className="login__support">
          Ещё не зарегистрированы?&nbsp;
          <Link to="signup" className="login__link">
            Регистрация
          </Link>
        </span>
      </form>
    </main>
  )
}

export default Login;
