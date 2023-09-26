 import { useState,useEffect } from "react";
 import axios from "axios";
 export default  function Profile(){
    const [editing,setEditing]= useState(true)
    const [fullName,setFullName] =useState({
      firstName:"",
      lastName:"",
    })
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTM1YjEyNTU1ZDFiNjFmOTI0MTc1OSIsImlhdCI6MTY5NTc2OTQzNiwiZXhwIjoxNjk1ODU1ODM2fQ.mRTaH-ImHhXZCq0QmoOSr1Fm6osuUhGfXjCtWF64zt8"
       function handlClickEdit(){
    setEditing(false)
    }
    function handlClickCancel(){
        setEditing(true)
        }
    function handlClickSave(){
      setFullName(fullName)      
      setEditing(true)
    }
  useEffect(() => {
axios.post("http://localhost:3001/api/v1/user/profile", 
{firstName:fullName.firstName, lastName:fullName.lastName},
{headers: {'Authorization': `Bearer ${token}`}
})

.then((res)=>{
  if (res.data.body) {
    setFullName({
      firstName: res.data.body.firstName,
      lastName: res.data.body.lastName
    });
  }
  localStorage.setItem("token", token);
})
.catch((error)=>{console.log(error.response.data.message)})
},[fullName.firstName, fullName.lastName] );

    return(
        <main className="main bg-dark">
     {editing?(  <div className="header">
          <h1>Welcome back<br />{fullName.firstName}  {fullName.lastName} !</h1>
          <button className="edit-button" onClick={handlClickEdit}>Edit Name</button>
        </div>):(
            <div className="header">  
                      <h1>Welcome back</h1>
             <div className="inputEdit">
                <input type="firstName" id="firstName"placeholder={fullName.firstName} />
                <input type="lastName" id="lastName" placeholder={fullName.lastName} />
               </div>
                 <div className="buttons">
                        <button className="button-save" onClick={handlClickSave}>Save</button>
                       <button className="button-cancel" onClick={handlClickCancel}>Cancel</button>
   
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
    );
 }