import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  profile,
  putProfile,
} from '../reducers/profile.reducer';

export default function Profile() {
  const navigate = useNavigate();
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const loginState = useSelector((state) => state.login);
  const profileState = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (!loginState.token) {
      navigate('/login');
      return;
    }
    dispatch(profile(loginState.token));
  }, [loginState.token, dispatch, navigate]);

  function handleClickEdit() {
    setEditing(true);
  }

  function handleClickCancel() {
    setEditing(false);
  }

  function handleClickSave() {
    const updatedData = {
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
    };
    dispatch(putProfile(updatedData, loginState.token));
    setEditing(false);
  }

  return (
    <>
      <nav />
      {!editing ? (
        <main className="main bg-dark">
          <div className="header">
            <h1>
              Welcome back
              <br />
              {profileState.firstName}
              {' '}
              {profileState.lastName}
              {' '}
              !
            </h1>
            <button type="button" className="edit-button" onClick={handleClickEdit}>Edit Name</button>
          </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button type="button" className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button type="button" className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button type="button" className="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
      ) : (
        <main className="main bg-light">
          <div className="header-editing">
            <h1>Welcome back</h1>
            <div className="inputEdit">
              <input ref={firstNameInput} type="text" id="firstName" placeholder={profileState.firstName} defaultValue={profileState.firstName} />
              <input ref={lastNameInput} type="text" id="lastName" placeholder={profileState.lastName} defaultValue={profileState.lastName} />
            </div>
            <div className="buttons">
              <button type="button" className="button-save" onClick={handleClickSave}>Save</button>
              <button type="button" className="button-cancel" onClick={handleClickCancel}>Cancel</button>
            </div>
          </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account-light">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button type="button" className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account-light">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button type="button" className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account-light">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button type="button" className="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
      )}

    </>
  );
}
