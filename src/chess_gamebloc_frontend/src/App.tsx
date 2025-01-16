import { Routes, Route } from "react-router-dom"
import LandingPage from './LandingPage'
import UserInputWrap from './UserInputWrap'
import AppWrap from './AppWrap'
import {  } from "@dfinity/identity"
import WsTesting from "./components/WsTesting"
import Login from "./components/Login"
import  {Home}  from "./components/Home"
import { useState, useEffect, useCallback } from "react"
import socket from "./components/stuntPull/socket"

export interface AppMessage {
  AppMessage: String,
}

const App = () => {

  let gatewayUrl = "http://127.0.0.1:4943";
  const icUrl = "http://localhost:4943/";
  const [players, setPlayers] = useState([])
  const [ room, setRoom ] = useState("")
  const [ orientation, setOrientation ] = useState("")


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
  const cleanup = useCallback(() => {
    setRoom("");
    setOrientation("");
    setPlayers([]);
  }, []);

  useEffect(() => {

    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData)
      setPlayers(roomData.players);
    });
  }, []);


  const [username, setUsername] = useState()
  
  return username ? 
  (<Home  username={username} />) : (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        {/* <Route path='/' element={<Login onSubmit={setUsername}/>} /> */}
        <Route path='/landingPage' element={<UserInputWrap />} />
        <Route path='/game' element={<AppWrap />} />
      </Routes>
    </div>
  )
}
export default App;
