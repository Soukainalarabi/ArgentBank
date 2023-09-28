import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/argentBankLogo.png"
import { Link } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const[connected,setConnected]=useState(false)
  const [editing, setEditing] = useState(true);
  const [fullName, setFullName] = useState({
    firstName: "",
    lastName: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Vérifiez d'abord si le token est valide
    if (!token) {
      navigate("/login");
      setConnected(false)
      return; 
    }

    axios
      .post("http://localhost:3001/api/v1/user/profile", {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((res) => {
        const userData = res.data.body;

        // Vérifiez si les données du profil sont présentes et non vides
        if (userData && userData.firstName !== null && userData.lastName !== null) {
          setFullName({
            firstName: userData.firstName,
            lastName: userData.lastName,
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [token, navigate]);

  function handleClickEdit() {
    setEditing(false);
  }

  function handleClickCancel() {
    setEditing(true);
  }
function signOut(){
  setConnected(false)
  localStorage.removeItem("token");

}
  function handleClickSave() {
    axios
      .put("http://localhost:3001/api/v1/user/profile", fullName, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((res) => {
        setFullName({
          firstName: res.data.body.firstName,
          lastName: res.data.body.lastName,
        });
        setEditing(true);
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
           <Link to="./user.html" className="main-nav-item">
             <i className="fa fa-user-circle"></i>
             Tony
           </Link>
           <Link to="/login" className="main-nav-item" onClick={signOut}>
             <i className="fa fa-sign-out"></i>
             Sign Out
           </Link>
    </div>
    </nav>
    <main className="main bg-dark">
     {editing?(  <div className="header">
          <h1>Welcome back<br />{fullName.firstName}  {fullName.lastName} !</h1>
          <button className="edit-button" onClick={handleClickEdit}>Edit Name</button>
        </div>):(
            <div className="header">  
                      <h1>Welcome back</h1>
             <div className="inputEdit">
                <input type="firstName" id="firstName"placeholder={fullName.firstName} />
                <input type="lastName" id="lastName" placeholder={fullName.lastName} />
               </div>
                 <div className="buttons">
                        <button className="button-save" onClick={handleClickSave}>Save</button>
                       <button className="button-cancel" onClick={handleClickCancel}>Cancel</button>
             </div>
             </div>
        )}
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