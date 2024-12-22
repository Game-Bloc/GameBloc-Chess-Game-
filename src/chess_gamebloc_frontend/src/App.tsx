import React from 'react'
import { Routes, Route } from "react-router-dom"
import ChessPage from './ChessPage'
import LandingPage from './LandingPage'
import UserInputForm from './UserInputForm'
import UserInputWrap from './UserInputWrap'
import AppWrap from './AppWrap'
import {  } from "@dfinity/identity"
import { canisterId } from "../../declarations/chess_gamebloc_backend"
import IcWebSocket, { generateRandomIdentity, createWsConfig } from "ic-websocket-js"
import { chess } from "../../declarations/chess"


const App = () => {

    const gatewayUrl = "http://127.0.0.1:4943";
    const icUrl = "http://localhost:3000/";

    const wsConfig = createWsConfig({
      canisterId: canisterId,
      canisterActor: chess,
      identity: generateRandomIdentity(),
      networkUrl: icUrl,
    });

    const ws = new IcWebSocket(gatewayUrl, undefined, wsConfig);
    
    console.warn("ws is not working");
    return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/landingPage' element={<UserInputWrap />} />
        <Route path='/game' element={<AppWrap />} />
      </Routes>
    </div>
  )
}


export default App
