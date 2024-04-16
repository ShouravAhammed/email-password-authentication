// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbFTaqDTon-UFUB07iR2hnHBtayc6YgbQ",
  authDomain: "email-password-authentic-bfd8d.firebaseapp.com",
  projectId: "email-password-authentic-bfd8d",
  storageBucket: "email-password-authentic-bfd8d.appspot.com",
  messagingSenderId: "165791987021",
  appId: "1:165791987021:web:e67715c3ceccde51167304"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;