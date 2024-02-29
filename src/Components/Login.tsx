import {auth, provider} from "../Config/firebase";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { IconContext } from "react-icons";
import Google from "../images/google.svg"

export const Login = () => {
  const navigate = useNavigate()
  const authenticator = getAuth()
  const [user] = useAuthState(auth);

  useEffect(() => {
    if(user) {
      console.log("logged")
      navigate('/Main')
    }
  }, [user])

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
    navigate('/Main')
  }

  return(
    <div className="fullFlex">
      <p>Login to your account</p>
      <button className="button outline square" onClick={signInWithGoogle}>
        <img src={Google} alt="google" className="icon" /></button>
    </div>
  )
}
