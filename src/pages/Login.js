import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogin } from "../actions/login";
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [errorMessage,setErrorMessage]=useState("")
  const [login, setLogin] = useState({
    email: "", password:""
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
         
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
    if (login.email && login.password) {
      dispatch(postLogin(login))
        .then((response) => {
          const token = response.data.body.token;
            if (token) {
            navigate("/profile");
          }
        })
        .catch((error) => {
          setErrorMessage(error?.response?.data?.message);
        });
    }else{
      console.log("Veuillez remplire le formulaire pour se connecter")
    }
  };
return (
<main className="main bg-dark">
<section className="sign-in-content">
  <i className="fa fa-user-circle sign-in-icon"></i>
  <h1>Sign In</h1>
<form onSubmit={submitForm}>
    <div className="input-wrapper">
      <label>Username</label>
      <input type="email" id="username" name="email" autoComplete="current-email" onChange={handleChange} />
    </div>
    <div className="input-wrapper">
      <label>Password</label>
        <input type="password" id="password" name="password" autoComplete="current-password" onChange={handleChange} />

    </div>
    <div className="input-remember">
      <input type="checkbox" id="remember-me" />
      <label>Remember me</label>
    </div>
    {/* {!login.email || !login.password ?(
          <p className="catch-message">Veuillez remplire le formulaire pour se connecter</p>
    ):null} */}
    {errorMessage && <p className="catch-message">{errorMessage}</p>}

    <button type="submit" className="sign-in-button">Sign In</button>
  
  </form>

</section>
</main>






  );
}

