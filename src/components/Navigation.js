import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/argentBankLogo.png';
import { logoutDone } from '../reducers/logout.reducer';
import { logout } from '../reducers/login.reducer';

import { profile } from '../reducers/profile.reducer';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileState = useSelector((state) => state.profile);
  const loginState = useSelector((state) => state.login);
  function signOut() {
    dispatch(logoutDone({ token: loginState.token }));
    dispatch(logout()); // Déconnecter l'utilisateur
    navigate('/');
  }

  useEffect(() => {
    // on appelle le backend si le token existe et si le firstName est vide
    if (loginState.token && !profileState.firstName) {
      dispatch(profile(loginState.token));
    }
  }, [loginState.token, profileState.firstName, dispatch]);
  return (

    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {!loginState.token ? (
        <div className="navigate-home">
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle" />
            Sign In
          </Link>
        </div>
      ) : (
        <div className="navigate-profile">
          <div className="main-nav-item">
            <i className="fa fa-user-circle" />
            <Link to="/profile">
              {' '}
              {profileState.firstName}
              {' '}
            </Link>
          </div>
          <button type="button" className="button-cancel" onClick={signOut}>
            <i className="fa fa-sign-out" />
            Sign Out
          </button>
        </div>
      )}
    </nav>

  );
}
