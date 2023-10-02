import React, { useRef,useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { postSignup } from "../actions/signup";
export default function Signup() {
     const dispatch = useDispatch();
     const firstNameInput = useRef();
     const lastNameInput = useRef();
     const emailInput = useRef();
     const passwordInput = useRef();
     const [errorMessage, setErrorMessage] = useState("");

  const signupState = useSelector((state)=>state.signupReducer)
  const submitForm = (e) => {
     e.preventDefault();
    if(!emailInput.current.value || !passwordInput.current.value || !lastNameInput.current.value||!firstNameInput.current.value){
     console.log("veuillez remplire le formulaire")
      return
     }
    dispatch(postSignup({firstName:firstNameInput.current.value,lastName: lastNameInput.current.value,email:emailInput.current.value,password:passwordInput.current.value}))
    .then(() => {
      // navigate("/login")
    })
    .catch((error) => {
      setErrorMessage(error?.response?.data?.message);    
    console.log( setErrorMessage(error?.response?.data?.message))});
  };
return (
<main className="main bg-dark">
<section className="sign-in-content">
  <i className="fa fa-user-circle sign-in-icon"></i>
  <h1>Sign Up</h1>
<form onSubmit={submitForm}>
<div className="input-wrapper">
      <label>firstName</label>
      <input  ref={firstNameInput}type="text" id="firstName" name="firstName" defaultValue={signupState.firstName} />
    </div>
    <div className="input-wrapper">
      <label>lastName</label>
      <input ref={lastNameInput} type="text" id="lastName" name="lastName" defaultValue={signupState.lastName}  />
    </div>
    <div className="input-wrapper">
      <label>email</label>
      <input ref={emailInput}  type="email" id="username" name="email"autoComplete="current-email" defaultValue={signupState.email}  />
    </div>
    <div className="input-wrapper">
      <label>Password</label>
        <input ref={passwordInput}  type="password" id="password" name="password" autoComplete="current-password" defaultValue={signupState.password}/>

    </div>
    {errorMessage && <p className="catch-message">{errorMessage}</p>}
    <button className="sign-in-button">Sign Up</button>
  
  </form>

</section>
</main>






  );
}

