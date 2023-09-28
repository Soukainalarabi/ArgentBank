import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import api from "../api";
export default function SignUp() {
    const navigate=useNavigate()
    const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    firstName:"",
    lastName:"",
    email: "", 
    password:""
  });

  const handleChange = (e) => {
    e.preventDefault();
    const {name,value}=e.target
    setLogin((login)=>({
      ...login,
      [name]:value,
    }))
  };

  const submitForm = (e) => {
    e.preventDefault();
    if(!login.email || !login.password || !login.lastName|| !login.firstName){
      console.log("veuillez remplire le formulaire")
      return
    }
        axios.post("http://localhost:3001/api/v1/user/signup", { 
        firstName: login.firstName,
        lastName: login.lastName,
        email: login.email,
        password:login.password})
        .then((res) => {
            navigate("/login")
            // if (res.data.body.token) {
            //   navigate("/login");
            // } else {
            //   // Gérer le cas où la création du compte échoue ici
            //   navigate("/signup");

            // }
          })
      .catch((erreur)=>{
 console.log(erreur.response.data.message)
setErrorMessage(erreur.response.data.message)
      })
  };

return (
<main className="main bg-dark">
<section className="sign-in-content">
  <i className="fa fa-user-circle sign-in-icon"></i>
  <h1>Sign Up</h1>
<form onSubmit={submitForm}>
<div className="input-wrapper">
      <label>firstName</label>
      <input type="text" id="firstName" name="firstName" onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label>lastName</label>
      <input type="text" id="lastName" name="lastName" onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label>email</label>
      <input type="email" id="username" name="email" onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label>Password</label>
        <input type="password" id="password" name="password" onChange={handleChange} />
    </div>
  <p className="catch-message">
  {errorMessage} </p>

    {/* <div className="input-remember">
      <input type="checkbox" id="remember-me" />
      <label>Remember me</label>
    </div> */}
    <button className="sign-in-button">Sign Up</button>
  
  </form>

</section>
</main>






  );
}

