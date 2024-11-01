import React, { useContext } from 'react'
import Game from './Game'
import { Container, TextField } from '@mui/material'
import { useState } from "react";
import CustomDialog from "./components/CustomDialog";
import { ContextProfile, profileContext } from './functions/context';
// import { useAuth } from './auth/use_auth_client';
import { chessFunctions } from "./functions/functions"

interface Props {
  modal? : () => void
}

const ChessPage = ({ modal } : Props) => {

  const [username, setUsername] = useState<string>('');  // the player gets to enter a in-game username for the game
  const [ age, setAge ] = useState("")
  const [ principal, setPrincipal ] = useState<string>("")
  const [ count, setCount ] = useState("")
  const [ description, setDescription ] = useState<String>("")
  const [usernameSubmitted, setUsernameSubmitted] = useState<boolean>(false); // indicator that the player username has been submitted
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false)
  const { update_player_profile, updatingProfile } = chessFunctions()
  const users = useContext(profileContext)
  const [profile] = useState<ContextProfile>({
    age: 0,
    principal: "",
    name: "",
    count: 0,
    description: ""
  })

  const onChangeUsername = (e: any) => {
    e.preventDefault()
    const userNameInput = e.target.value
    setUsername(userNameInput)
  }

  const onChangeAge = (e: any) => {
    e.preventDefault()
    const ageInput = e.target.value
    setAge(ageInput)
  }

  const submit = () => {
    if (username.trim() === "" && age.trim() === "") {
      console.log("username is Empty");
    } else {
      update_player_profile(
        +age,
        principal,
        Username,
        count,
        description
      )
    }
  }

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
            id="age"
            label="Age"
            name="age"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)} 
            type="number"
            fullWidth
            variant="standard"
          />
        </div>
        <div id="user-input">
          <TextField // Input
            autoFocus // automatically set focus on input (make it active).
            margin="dense"
            id="principal"
            label="IC Principal"
            name="principal"
            value={principal}
            required
            onChange={(e) => setPrincipal(e.target.value)} 
            type="text"
            fullWidth
            variant="standard"
          />
        </div>
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
        <div id="user-input">
          <TextField // Input
            autoFocus // automatically set focus on input (make it active).
            margin="dense"
            id="count"
            label="winCount"
            name="Won Count"
            value={count}
            required
            onChange={(e) => setCount(e.target.value)} 
            type="number"
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

