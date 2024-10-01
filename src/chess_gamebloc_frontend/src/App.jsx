import React from 'react'
import Game from './Game'
import { Container, TextField } from '@mui/material'
import { useState } from "react";
import CustomDialog from "./components/CustomDialog";

export default function App () {

  const [username, setUsername] = useState('');  // the player gets to enter a in-game username for the game

  const [usernameSubmitted, setUsernameSubmitted] = useState(false); // indicator that the player username has been submitted

  return (
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
      </CustomDialog>
      <Game />
    </Container>
  );
}
