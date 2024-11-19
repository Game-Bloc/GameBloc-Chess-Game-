import React, { useContext } from 'react'
import Game from './Game'
import { Container, TextField } from '@mui/material'
import { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { ContextProfile, profileContext, UseProfileContext } from './functions/context';
// import { useAuth } from './auth/use_auth_client';
import { chessFunctions } from "./functions/functions"
import { useAuth } from './auth/use_auth_client';
// import { chessFunctions } from "./functions/functions"

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
  const { create_player_profile, updatingProfile, getProfile } = chessFunctions()
  const users = UseProfileContext();
  const {  isAuthenticated } = useAuth()
  const [ userPrincipal, setUserPrincipal ] = useState("")
  const contextTrial = UseProfileContext()
  const principalVar:any = contextTrial.principal
  const playerPrincipal = Principal.fromText(principalVar);
  // const principalID = principalVar
  
  const principalCheck = () => {
    if (isAuthenticated) {
      console.log("Player Principal To Text", playerPrincipal)
    }
  }

  useEffect (() => {
    principalCheck()
  }, []) 

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

  // const submit = () => {
  //   if (username.trim() === "" || age.trim() === "") {
  //     console.log("Either age or username is Empty");
  //   } else {
  //     create_player_profile(
  //       +age,
  //       principal,
  //       username,
  //       +count, 
  //       description
  //     )
  //   }
  // }

  // const continueFunction = () => {
  //   submit();
  //   setUsernameSubmitted(true)    
  // }

  useEffect(() => {
    // if (isAuthenticated) {
      // if (username === "") {
      //   getProfile()
      // } else {
      //   create_player_profile(
      //     +age,
      //   principal,
      //   username,
      //   +count, 
      //   description
      //   )
      // }
      getProfile()
    // }
  }, [isAuthenticated])

  return (
    // <profileContext.Provider value={profile}>
      <Container>
        <Game />
      </Container>
    // </profileContext.Provider>
  );
}

export default ChessPage;

