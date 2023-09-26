import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import api from "../api";
export default function Login() {
    const navigate = useNavigate()

  const [errorMessage,setErrorMessage]=useState("")
  const [login, setLogin] = useState({
    email: "", password:""
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
    // if(!login.email || !login.password){
    //   console.log("veuillez saisir votre email et mot de passe")
    //   return
    // }
        axios.post("http://localhost:3001/api/v1/user/login", { email: login.email,password:login.password}
      )

      .then((res) => {
         console.log("Email saisi :", login.email);
      console.log("Mot de passe saisi :", login.password);
      navigate("/profile");
      })
      .catch((error) => {
setErrorMessage(error.response.data.message)    
navigate("/signup");
return 
 });     

  };
return (
<main className="main bg-dark">
<section className="sign-in-content">
  <i className="fa fa-user-circle sign-in-icon"></i>
  <h1>Sign In</h1>
<form onSubmit={submitForm}>
    <div className="input-wrapper">
      <label>Username</label>
      <input type="email" id="username" name="email" onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label>Password</label>
        <input type="password" id="password" name="password" onChange={handleChange} />
    </div>
    <div className="input-remember">
      <input type="checkbox" id="remember-me" />
      <label>Remember me</label>
    </div>
    <p className="catch-message">{errorMessage}</p>
    <button type="submit" className="sign-in-button">Sign In</button>
  
  </form>

</section>
</main>






  );
}

