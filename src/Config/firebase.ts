// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtbUwNdgCYtxDbTCABm4glMasqlRDOD5Q",
  authDomain: "to-do-app-48659.firebaseapp.com",
  projectId: "to-do-app-48659",
  storageBucket: "to-do-app-48659.appspot.com",
  messagingSenderId: "532187499772",
  appId: "1:532187499772:web:5b5bd1497c6d2404495b79",
  measurementId: "G-6LBJ49EQK5"
};


  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
