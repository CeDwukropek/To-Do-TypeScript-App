// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhWmo_x2MqgD-cusgMFDLB6ItQlLXZY9U",
  authDomain: "to-do-app-f079e.firebaseapp.com",
  projectId: "to-do-app-f079e",
  storageBucket: "to-do-app-f079e.appspot.com",
  messagingSenderId: "647605966689",
  appId: "1:647605966689:web:0dea64f43470a93dbc5720",
  measurementId: "G-3Y718ZYSDE"
};


  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
