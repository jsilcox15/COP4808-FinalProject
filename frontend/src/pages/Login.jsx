import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged} from "firebase/auth";
import React , {useState, useEffect} from "react";
import { auth} from "../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import {useNavigate} from 'react-router-dom'


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((usercredential) => {
       console.log(usercredential);
       navigate('/', { replace: true });
      })
      .catch ((error) => {
      console.log(error);});
    };

const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      navigate('/', { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
};
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log("User is signed in.");
      } else {
          console.log("No user is signed in.");
      }
  });
}, []);


    return (
    <div className = "auth-form-container">  
    <h1> Welcome </h1>
      <h2>Login</h2>
     <form className="login-form" onSubmit = {handleSubmit}> 
        <lable htmlFor ="email"> Email </lable>
        <input value = {email} onChange={(e) => setEmail(e.target.value)} type = "email" placeholder = "youremail@gmail.com" id = "email" name = "email" /> 
        <lable htmlFor = "password" > Password </lable> 
        <input value = {password} type="password" onChange={(e) => setPassword(e.target.value)} for = "password" placeholder = "******" id ="password" name = "password" /> 
        <button type = "submit"> Log In </button> 
        <br></br>
        <button className="google-signin-btn" type="button" onClick={handleGoogleSignIn}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
          Sign in with Google
        </button>
    </form>
    <button  className = "link-btn"  onClick = {() => props.onFormSwitch('register')}> Don't have an account? Register here </button>
     </div>
    )
}