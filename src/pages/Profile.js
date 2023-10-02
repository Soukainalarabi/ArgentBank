import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/argentBankLogo.png"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../actions/profile";
import { putProfile } from "../actions/profilePut";
import { logout } from "../actions/logout";

export default function Profile() {
  const navigate = useNavigate();
  const firstNameInput = useRef();
  const lastNameInput = useRef();

  const login = useSelector((state)=>state.loginReducer)
  const profileState = useSelector((state)=>state.profileReducer)

  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [editing, setEditing] = useState(false);


  useEffect(() => {
    // Vérifiez d'abord si le token est valide
    if (!login.token) {
      navigate("/login");
      return; 
    }
   dispatch(profile(login.token))
  }, [login.token,dispatch, navigate]);

  function handleClickEdit() {
    setEditing(true);
  }

  function handleClickCancel() {
    setEditing(false);
  }
function signOut(){
dispatch(logout())
}
  function handleClickSave() {
   dispatch(putProfile({firstName:firstNameInput.current.value,lastName: lastNameInput.current.value},login.token))
      .then(() => {
        setEditing(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  return (
    <>
      <nav className="main-nav">
    <Link to="/" className="main-nav-logo" >
      <img
        className="main-nav-logo-image"
        src={logo}
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
    <div className="navigate-profile">
           <div className="main-nav-item">
             <i className="fa fa-user-circle"></i>
             {profileState.firstName} 
           </div>
           <Link to="/login" className="main-nav-item" onClick={signOut}>
             <i className="fa fa-sign-out"></i>
             Sign Out
           </Link>
    </div>
    </nav>
    <main className="main bg-dark">
     {!editing?(  <div className="header">
          <h1>Welcome back<br />{profileState.firstName}  {profileState.lastName} !</h1>
          <button className="edit-button" onClick={handleClickEdit}>Edit Name</button>
        </div>):(
            <div className="header">  
                      <h1>Welcome back</h1>
             <div className="inputEdit">
             <input ref={firstNameInput} type="text" id="firstName" placeholder={profileState.firstName} defaultValue={profileState.firstName} />
              <input ref={lastNameInput} type="text" id="lastName" placeholder={profileState.lastName}  defaultValue={profileState.lastName} />
               </div>
                 <div className="buttons">
                        <button className="button-save" onClick={handleClickSave}>Save</button>
                       <button className="button-cancel" onClick={handleClickCancel}>Cancel</button>
             </div>
             </div>
        )}
          {/* {updatedFullName && (
            <div className="header-edit">
            <h1>Welcome back<br />{updatedFullName.firstName} {updatedFullName.lastName} !</h1>
            <button className="edit-button update" onClick={handleClickEdit}>Edit Name</button>
         </div>
        )} */}
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      
    
    </>
  );
}