import React from 'react'
import { useAuth } from "./auth/use_auth_client";


const LandingPage = () => {
    const { isAuthenticated,login ,loginNFID} = useAuth();
  return (
    <div>
        <button onClick={() => {
            console.log('login:', loginNFID);
            login();
        }}>Login with II</button>

        <button onClick={() => {
        console.log('login:', loginNFID);
        loginNFID();
        }}>Login with NFID</button>
    </div>
  )
}

export default LandingPage;