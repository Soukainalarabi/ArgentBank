import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSlice, postLogin } from '../reducers/login.reducer';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  useEffect(() => {
    if (loginState.token) {
      navigate('/');
    }
  }, [loginState.token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (loginState.loginInfo) {
      dispatch(loginSlice.actions.loginInfo({ ...loginState.loginInfo, [name]: value }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (loginState.loginInfo.email && loginState.loginInfo.password) {
      dispatch(postLogin(loginState.loginInfo))
        .then((res) => {
          navigate('/profile');
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={submitForm}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              name="email"
              value={loginState.loginInfo.email}
              autoComplete="current-email"
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginState.loginInfo.password}
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label>Remember me</label>
          </div>
          {loginState.error && <p className="catch-message">{loginState.error}</p>}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
