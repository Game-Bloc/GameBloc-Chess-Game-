import React, { useContext } from 'react'
import Game from './Game'
import { Container, TextField } from '@mui/material'
import { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { ContextProfile, profileContext, UseProfileContext } from './functions/context';
import { useAuth } from './auth/use_auth_client';

interface Props {
  modal?: () => void
}

const ChessPage = ({ modal } : Props) => {

  const { isAuthenticated } = useAuth()
  const contextTrial = UseProfileContext()
  // const principalVar:any = contextTrial.profile.principal
  // const playerPrincipal = Principal.fromText(principalVar);
  
  // const principalCheck = () => {
  //   if (isAuthenticated) {
  //     console.log("Player Principal To Text", playerPrincipal)
  //   }
  // }

  // useEffect (() => {
  //   principalCheck()
  // }, []) 

  return (
      <Container>
        <Game />
      </Container>
  );
}

export default ChessPage;

