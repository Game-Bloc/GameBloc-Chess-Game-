import React from 'react'
import { Routes, Route } from "react-router-dom"
import ChessPage from './ChessPage'
import LandingPage from './LandingPage'
import UserInputForm from './UserInputForm'
import UserInputWrap from './UserInputWrap'
import AppWrap from './AppWrap'
import {  } from "@dfinity/identity"
import { canisterId } from "../../declarations/chess"
import IcWebSocket, { generateRandomIdentity, createWsConfig } from "ic-websocket-js"
import { chess } from "../../declarations/chess"

export interface AppMessage {
  AppMessage: String,
}

const App = () => {



    let gatewayUrl:string = "http://127.0.0.1:4943";
    const icUrl = "http://localhost:4943/";

    const wsConfig = createWsConfig({
      canisterId: canisterId,
      canisterActor: chess,
      identity: generateRandomIdentity(),
      networkUrl: icUrl,
    });
    
    // try {
    //   const ws = new IcWebSocket(gatewayUrl, "", wsConfig); 
    // } catch (err) {
    //   console.log("Websocket not working", err);
    
    // }

    // ws.onopen = () => {
    //   console.log("Connected to the canister");
    // };
    
    // ws.onmessage = async (event) => {
    //   console.log("Received message:", event.data);
    
    //   const messageToSend = {
    //     text: event.data.text + "-pong",
    //   };
    //   ws.send(messageToSend);
    // };
    
    // ws.onclose = () => {
    //   console.log("Disconnected from the canister");
    // };
    
    // ws.onerror = (error) => {
    //   console.log("Error:", error);
    // };
    // try {
    // } catch (error) {
    //   console.error("Websocket not working", error)
    // };

    // const msg_type: AppMessage | null = {
    //   AppMessage: "moves",
    // }
    
    // const msgTypeWrapped:any = msg_type ? Some(msg_type) :  None;
    // ws(args, msgTypeWrapped)
    
    
    // console.log(
    //   "wsConfig;", wsConfig
    // );

    // console.log("error");
    
    

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
