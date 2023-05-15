// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP2-Bs_d4YrE5Dr4xBIRDBsu4eKkDdgwI",
  authDomain: "reactsignup-6ceae.firebaseapp.com",
  projectId: "reactsignup-6ceae",
  storageBucket: "reactsignup-6ceae.appspot.com",
  messagingSenderId: "184484488786",
  appId: "1:184484488786:web:6309094d33343f1aee218b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize firebase authentication 
export const auth = getAuth(app);