import {auth, provider} from "../Config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Google from "../images/google.svg"

export const Login = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth);

  useEffect(() => {
    if(user) {
      //console.log("logged")
      navigate('/Main')
    }
  }, [user, navigate])

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then(() => navigate('/Main'))
    .catch((error) => {
      const errorMessage = error.message;

      console.log(errorMessage)
    });
  }

  return(
    <div className="fullFlex">
      <p>Login to your account</p>
      <button className="button outline square" onClick={signInWithGoogle}>
        <img src={Google} alt="google" className="icon" /></button>
    </div>
  )
}
