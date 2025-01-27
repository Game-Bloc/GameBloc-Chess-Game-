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
import InitGame from "./components/stuntPull/InitGame"
import MainGame from "./components/stuntPull/MainGame"
import { TextField} from "@mui/material"
import Container from "@mui/material/Container";
import CustomDialog from "./components/CustomDialog"
import { canisterId } from "../../declarations/chess"
import { chess } from "../../declarations/chess"
import IcWebSocket, { generateRandomIdentity, createWsConfig } from "ic-websocket-js"

// export interface AppMessage {
//   AppMessage: String,
// }

const App = () => {

  const gatewayUrl = "0.0.0.0:8080";
  const icUrl = "http://127.0.0.1:3000/";
  const [players, setPlayers] = useState([])
  const [ room, setRoom ] = useState("")
  const [ orientation, setOrientation ] = useState("")
  const [ usernameSubmitted, setUsernameSubmitted ] = useState()


  const wsConfig = createWsConfig({
    canisterId: canisterId,
    canisterActor: chess,
    identity: generateRandomIdentity(),
    networkUrl: icUrl,
  });

  const ws = new IcWebSocket(gatewayUrl, undefined, wsConfig);
  
  // try {
  //   const ws = new IcWebSocket(gatewayUrl, undefined, wsConfig); 
  // } catch (err) {
  //   console.log("Websocket not working", err);
  
  // }

  ws.onopen = () => {
    console.log("Connected to the canister");
  };
  
  ws.onmessage = async (event) => {
    console.log("Received message:", event.data);
  
    const messageToSend = {
      text: event.data.text + "-pong",
    };
    ws.send(messageToSend);
  };

  ws.onclose = () => {
    console.log("Disconnected from the canister");
  };
  
  ws.onerror = (error) => {
    console.log("Error:", error);
  }; 

  const cleanup = useCallback(() => {
    setRoom("");
    setOrientation("");
    setPlayers([]);
  }, []);

  // useEffect(() => {

  //   socket.on("opponentJoined", (roomData) => {
  //     console.log("roomData", roomData)
  //     setPlayers(roomData.players);
  //   });
  // }, []);


  const [username, setUsername] = useState("")
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        {/* <Route path='/' element={<Login onSubmit={setUsername}/>} /> */}
        <Route path='/landingPage' element={<UserInputWrap />} />
        <Route path='/game' element={<AppWrap />} />
        <Route path="/ws" element= {
          <Container>
            <CustomDialog
              open={!usernameSubmitted}
              handleClose={() => setUsernameSubmitted(true)}
              title="Pick a username"
              contentText="Please select a username"
              handleContinue={() => {
                if (!username) return;
                socket.emit("username", username);
                setUsernameSubmitted(true);
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                name="username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                fullWidth
                variant="standard"
              />
            </CustomDialog>
            {room ? (
              <MainGame
                room={room}
                orientation={orientation}
                username={username}
                players={players}
                // the cleanup function will be used by Game to reset the state when a game is over
                cleanup={cleanup}
              />
            ) : (
              <InitGame
                setRoom={setRoom}
                setOrientation={setOrientation}
                setPlayers={setPlayers}
              />
            )}
        </Container>
        } />
        
      </Routes>
    </div>
  )
}
export default App;
