import React, { useRef, useEffect } from 'react';
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
  useEffect(() => {
    if (loginState.token) {
      navigate('/');
    }
  }, [loginState.token, navigate]);
  const submitForm = (e) => {
    e.preventDefault();
    if (!emailInput.current.value || !passwordInput.current.value
      || !lastNameInput.current.value || !firstNameInput.current.value) {
      console.log('veuillez remplire le formulaire');
    }
    const formInfo = {
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
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
            <label htmlFor="firstName">firstName</label>
            <input
              ref={firstNameInput}
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={postSignup.firstName}
            />
            {' '}

          </div>
          <div className="input-wrapper">
            <label htmlFor="firstName">lastName</label>
            <input ref={lastNameInput} type="text" id="lastName" name="lastName" defaultValue={postSignup.lastName} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">email</label>
            <input ref={emailInput} type="email" id="username" name="email" autoComplete="current-email" defaultValue={postSignup.email} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input ref={passwordInput} type="password" id="password" name="password" autoComplete="current-password" defaultValue={postSignup.password} />
          </div>
          {errorFromRedux && <p className="catch-message">{errorFromRedux}</p>}
          <button type="button" className="sign-in-button">Sign Up</button>

        </form>

      </section>
    </main>

  );
}
