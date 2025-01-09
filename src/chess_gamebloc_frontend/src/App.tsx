import { Routes, Route } from "react-router-dom"
import LandingPage from './LandingPage'
import UserInputWrap from './UserInputWrap'
import AppWrap from './AppWrap'
import {  } from "@dfinity/identity"
import WsTesting from "./components/WsTesting"

export interface AppMessage {
  AppMessage: String,
}

const App = () => {

  let gatewayUrl = "http://127.0.0.1:4943";
  const icUrl = "http://localhost:4943/";

  // const wsConfig = createWsConfig({
  //   canisterId: canisterId,
  //   canisterActor: Chess_Kitchen,
  //   identity: generateRandomIdentity(),
  //   networkUrl: icUrl,
  // });
  
  // try {
  //   const ws = new IcWebSocket(gatewayUrl, undefined, wsConfig); 
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
  
  

  // const msg_type: AppMessage | null = {
  //   AppMessage: "moves",
  // }
  
  // const msgTypeWrapped:any = msg_type ? Some(msg_type) :  None;
  // ws(args, msgTypeWrapped)
  
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<LandingPage />} /> */}
        <Route path='/' element={<WsTesting />} />
        <Route path='/landingPage' element={<UserInputWrap />} />
        <Route path='/game' element={<AppWrap />} />
      </Routes>
    </div>
  )
}


export default App;
