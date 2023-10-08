import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../reducers/login.reducer"; // Importez l'action postLogin

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (login.email && login.password) {
       dispatch(postLogin(login)); // Utilisez l'action postLogin pour effectuer la requête de connexion
        navigate("/profile");
      
    } else {
      console.log("Veuillez remplir le formulaire pour vous connecter");
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
            <input
              type="email"
              id="username"
              name="email"
              autoComplete="current-email"
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label>Remember me</label>
          </div>
          {error && <p className="catch-message">{error}</p>}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}