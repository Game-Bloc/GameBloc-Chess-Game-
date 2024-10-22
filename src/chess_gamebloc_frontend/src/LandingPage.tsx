import React from 'react'
import { useAuth } from "./auth/use_auth_client";


const LandingPage = () => {
    const { isAuthenticated,login ,loginNFID} = useAuth();
  return (
    <div className='flex item-center mt-[45vh] justify-center space-x-3 '>
        <button className='bg-blue-500  text-white px-2 py-2 rounded-lg ' onClick={() => {
            console.log('login:', loginNFID);
            login();
        }}>Login with II</button>
        <button className='px-2 py-2 border-2 rounded-lg' onClick={() => {
        console.log('login:', loginNFID);
        loginNFID();
        }}>Login with NFID</button>
    </div>
  )
}

export default LandingPage;