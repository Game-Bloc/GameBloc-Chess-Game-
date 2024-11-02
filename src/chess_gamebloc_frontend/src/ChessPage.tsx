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
  const [ description, setDescription ] = useState<string>("")
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

  // const onChangePrincipal = (e: any) => {
  //   e.preventDefault()
  //   const porincipalInput = e.target.value
  //   setPrincipal(porincipalInput)
  // }

  const onChangeCount = (e: any) => {
    e.preventDefault()
    const countInput = e.target.value
    setCount(countInput)
  }

  const onChangeDescription = (e: any) => {
    e.preventDefault()
    const countInput = e.target.value
    setDescription(countInput)
  }

  const submit = () => {
    if (username.trim() === "" || age.trim() === "") {
      console.log("Either age or username is Empty");
    } else {
      update_player_profile(
        +age,
        principal,
        username,
        +count, 
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
        handleContinue={() => submit()}
      >
        <div id="user-input1">
          <TextField // Input
            autoFocus // automatically set focus on input (make it active).
            margin="dense"
            id="age"
            label="Age"
            name="age"
            value={age}
            required
            onChange={onChangeAge} 
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField // Input
            autoFocus // automatically set focus on input (make it active).
            margin="dense"
            id="username"
            label="Username"
            name="username"
            value={username}
            required
            onChange={onChangeUsername} 
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField // Input
            autoFocus // automatically set focus on input (make it active).
            margin="dense"
            id="count"
            label="Won Count"
            name="Won Count"
            value={count}
            required
            onChange={onChangeCount} 
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField // Input
            autoFocus // automatically set focus on input (make it active).
            margin="dense"
            id="description"
            label="Intro About 'ya Self"
            name="Won Count"
            value={description}
            required
            onChange={onChangeDescription} 
            type="text"
            fullWidth
            variant="standard"
          />
        </div>
        
        <div id="user-input3">
          
        </div>
        <div id="user-input4">
          
        </div>

      </CustomDialog>
      <Game />
    </Container>
    </profileContext.Provider>
  );
}

export default ChessPage;

