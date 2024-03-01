// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcCC6r28HzRBgAWg6oTREq9hmJEbo6yww",
  authDomain: "to-do-app-2-8b2e9.firebaseapp.com",
  projectId: "to-do-app-2-8b2e9",
  storageBucket: "to-do-app-2-8b2e9.appspot.com",
  messagingSenderId: "579226067987",
  appId: "1:579226067987:web:91aac7cb6ee523b17a4be6",
  measurementId: "G-9QFVVHMEHE"
};


  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
