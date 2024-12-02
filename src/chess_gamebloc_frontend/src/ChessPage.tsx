import React, { useContext } from 'react'
import Game from './Game'
import { Container, TextField } from '@mui/material'
import { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { ContextProfile, profileContext, UseProfileContext } from './functions/context';
// import { useAuth } from './auth/use_auth_client';
// import { ProfileContextType } from './UserInputForm';
import { chessFunctions } from "./functions/functions"
import { useAuth } from './auth/use_auth_client';
// import { chessFunctions } from "./functions/functions"

interface Props {
  modal?: () => void
}

const ChessPage = ({ modal } : Props) => {

  const [ age, setAge ] = useState("")
  const {  isAuthenticated } = useAuth()
  const contextTrial = UseProfileContext()
  const principalVar:any = contextTrial.profile.principal
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

  return (
      <Container>
        <Game />
      </Container>
  );
}

export default ChessPage;

