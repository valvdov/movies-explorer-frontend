import './Profile.css';
import {useEffect, useContext } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';
import useForm from "../../hooks/useForm";

export default function Profile({ onSignOut, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  }
  function handleSignOut() {
    onSignOut();
  }

  return (
    <main className="profile">
      <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className={`profile__input ${errors.name && 'profile__input_error'}`}
              onChange={handleChange}
              value={enteredValues.name || currentUser.name}
              type="text"
              required
              minLength={2}
              maxLength={30}
            />
            <span className="profile__error-name">{errors.name || ''}</span>
          </label>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              className={`profile__input ${errors.email && 'profile__input_error'}`}
              onChange={handleChange}
              value={enteredValues.email || currentUser.email}
              type="email"
              minLength={2}
              maxLength={200}
              required
            />
            <span className="profile__error">{errors.email || ''}</span>
          </label>
        </div>
        <div className="profile__button-container">
          <button
            type="submit"
            className={`profile__button-edit ${
              !isFormValid && 'profile__button-edit_disabled'
            }`}
            disabled={!isFormValid}
          >
            Редактировать
          </button>
          <button type="submit" className="profile__button-exit" onClick={handleSignOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  )
}
