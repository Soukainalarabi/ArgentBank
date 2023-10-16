import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../reducers/signup.reducer';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const loginState = useSelector((state) => state.login);
  const errorFromRedux = useSelector((state) => state.signup.error);
  const [isFormIncomplete, setIsFormIncomplete] = useState(false);
  useEffect(() => {
    if (loginState.token) {
      navigate('/');
    }
  }, [loginState.token, navigate]);
  const submitForm = (e) => {
    e.preventDefault();
    const firstNameValue = firstNameInput.current ? firstNameInput.current.value : '';
    const lastNameValue = lastNameInput.current ? lastNameInput.current.value : '';
    const emailValue = emailInput.current ? emailInput.current.value : '';
    const passwordValue = passwordInput.current ? passwordInput.current.value : '';
    const formInfo = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
    };
    if (!firstNameValue || !lastNameValue || !emailValue || !passwordValue) {
      setIsFormIncomplete(true);
      return;
    }
    setIsFormIncomplete(false);
    dispatch(postSignup(formInfo))
      .then((res) => {
        navigate('/login');
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign Up</h1>
        <form onSubmit={submitForm}>
          <div className="input-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input ref={firstNameInput} type="text" id="firstName" name="firstName" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input ref={lastNameInput} type="text" id="lastName" name="lastName" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input ref={emailInput} type="email" id="email" name="email" autoComplete="current-email" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input ref={passwordInput} type="password" id="password" name="password" autoComplete="current-password" />
          </div>
          {isFormIncomplete && (
            <p className="catch-message">Veuillez remplir le formulaire</p>
          )}
          {errorFromRedux && <p className="catch-message">{errorFromRedux}</p>}
          <button type="submit" className="sign-in-button">Sign Up</button>
        </form>
      </section>
    </main>
  );
}
