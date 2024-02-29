import {Link} from "react-router-dom";
import {auth} from "../Config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import React from "react";

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }
    return(
        <div className="navbar">            
            <div className="user">
                {user && (
                    <>
                    <button className="button outline" onClick={signUserOut}>Logout</button>
                    </>
                )}
            </div>
        </div>
    )
}