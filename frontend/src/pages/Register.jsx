import { createUserWithEmailAndPassword } from "firebase/auth";
import React , {useState} from "react";
import { auth } from "../firebase";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
      .then((usercredential) => {
       console.log(usercredential);
       props.onFormSwitch('login');
      })
      .catch ((error) => {
      console.log(error);
  });
};

       

    return (
        <div className = "auth-form-container"> 
        <h2>Register</h2>
        <form className="register-form" onSubmit = {handleSubmit}> 
           
           <lable htmlFor ="email" > Email </lable>
           <input value = {email} onChange={(e) => setEmail(e.target.value)} type = "email" placeholder = "youremail@gmail.com" id = "email" name = "email" /> 
           <lable htmlFor = "password" > Password </lable> 
           <input value = {password} type="password" onChange={(e) => setPassword(e.target.value)} for = "password" placeholder = "******" id ="password" name = "password" /> 
           <button type = "submit"> Register </button> 
       </form>
          <button className = "link-btn" onClick = {() => props.onFormSwitch('login')}> Already have an account? Login here </button>
        </div>
    )
}