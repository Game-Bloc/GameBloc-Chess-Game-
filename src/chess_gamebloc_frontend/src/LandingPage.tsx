import React from 'react'
import { useAuth } from "./auth/use_auth_client";
import CurvedTextApp from './CurvedText';
// import jsxToString from 'jsx-to-string';
import Typewriter from "typewriter-effect"


const LandingPage = () => {
    const { isAuthenticated,login ,loginNFID} = useAuth();
  return (
    <>
      <CurvedTextApp />
      <div className='flex item-center mt-[45vh] justify-center space-x-3'>
        <button className='bg-blue-500  text-white px-2 py-2 rounded-lg ' onClick={() => {
            console.log('login:', loginNFID);
            login();
        }}>Login with II</button>
        <button className='px-2 py-2 border-2 rounded-lg' onClick={() => {
        console.log('login:', loginNFID);
        loginNFID();
        }}>Login with NFID</button>
          console.log("the page starts")
      </div>
      <div className='item-center text-center'>
      <Typewriter
          onInit={(typewriter) => {
            typewriter
                .typeString("This game is affliated to Gamebloc LLC")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Sign In to get Started")
                .start();
          }}
      />
      </div>
    </>
  )
}

export default LandingPage;