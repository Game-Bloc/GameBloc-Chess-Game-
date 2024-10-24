import React, { useContext } from 'react'
import Game from './Game'
import { Container, TextField } from '@mui/material'
import { useState } from "react";
import CustomDialog from "./components/CustomDialog";
import { ContextProfile, profileContext } from './functions/context';
import { useAuth } from './auth/use_auth_client';
import { chessFunctions } from './functions/functions';

interface ChessPageProps {}

const ChessPage = ({} : ChessPageProps) => {

  const [username, setUsername] = useState('');  // the player gets to enter a in-game username for the game

  const [usernameSubmitted, setUsernameSubmitted] = useState(false); // indicator that the player username has been submitted

  const { isAuthenticated } = useAuth()
  
  const { updateUserProfile, updatingProfile } = chessFunctions()
  
  const users = useContext(profileContext)
  const [profile] = useState<ContextProfile>({
    age: 0,
    principal: "",
    name: "",
    count: 0,
    description: ""
  })

  return (
    <profileContext.Provider value={profile}>
    <Container>
      <CustomDialog
        open={!usernameSubmitted} 
        title="Pick a username" 
        contentText="Please select a username" 
        handleContinue={() => { 
          if (!username) return; 
          // socket.emit("username", username); 
          setUsernameSubmitted(true); 
        }}
      >
        <div id="user-input">
          <TextField // Input
            autoFocus // automatically set focus on input (make it active).
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
        </div>
      </CustomDialog>
      <Game />
    </Container>
    </profileContext.Provider>
  );
}

export default ChessPage;

