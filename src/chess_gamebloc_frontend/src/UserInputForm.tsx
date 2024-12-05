import React, { useContext, useEffect } from 'react'
import Game from './Game'
import { Container, TextField } from '@mui/material'
import { useState } from "react";
import CustomDialog from "./components/CustomDialog";
import { ContextProfile, profileContext, UseProfileContext } from './functions/context';
// import { useAuth } from './auth/use_auth_client';
import { chessFunctions } from "./functions/functions"
import { useNavigate } from 'react-router';
import { useAuth } from './auth/use_auth_client';
import Swal from 'sweetalert2';

// interface PlayerInputProps {
//   createPlayerProfile: (
//       age: string,
//       principal: string,
//       username: string,
//       count: string,
//       description: string
//   ) => Promise<void>;
// }

function UserInputForm() {

  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('');  // the player gets to enter a in-game username for the game
  const [ age, setAge ] = useState("")
  // const [ principal, setPrincipal ] = useState<string>("")
  const [ count, setCount ] = useState("")
  const {  isAuthenticated, principal} = useAuth()
  const [ description, setDescription ] = useState<string>("")
  const [usernameSubmitted, setUsernameSubmitted] = useState<boolean>(false); // indicator that the player username has been submitted
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false)
  const contextGrab = UseProfileContext()
  const { setProfile } = UseProfileContext()
  const usernameContext = contextGrab.profile.name
  const { create_player_profile, updatingProfile } = chessFunctions()
  // const users = useContext(profileContext)
  // const [profile] = useState<ContextProfile>({
  //   age: 0,
  //   principal: "",
  //   name: "",
  //   count: 0,
  //   description: ""
  // })

  // const handleProfileUpdate = () => {
  //   createPlayerProfile(
  //     "0", 
  //     "principal_id", 
  //     "", 
  //     "0", 
  //     "",
  //   );
  // };

  // Swal.fire({
  //   title: 'Error!',
  //   text: 'Do you want to continue?',
  //   icon: 'warning',
  //   confirmButtonText: 'Cool'
  // });

  // const Alert = () => {
  //   Swal.fire({
  //     title: "Account Creation Successful",
  //     text: "You will be redirected",
  //     icon: "warning",
  //     showCancelButton: true,
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Okay"
  //   }).then(function () {
  //     // Redirect the user
  //     window.location.href = "/game";
  //   });
  // };

  // Swal.fire({
  //   title: 'Success',
  //   text: "Account Creation Successful",
  //   icon: 'success',
  //   confirmButtonText: 'Continue'
  // })


  const onChangeUsername = (e: any) => {
    e.preventDefault()
    const userNameInput = e.target.value;
    // const playerGName = contextGrab.name(userNameInput)
    // console.log("username", userNameInput);
    setUsername(userNameInput)
  }

  const onChangeAge = (e: any) => {
    e.preventDefault()
    const ageInput = e.target.value
    setAge(ageInput)
  }

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

  // const submit = async () => {
  //   if (username.trim() === "" || age.trim() === "") {
  //     console.log("Either age or username is Empty");
  //   } else {
  //     create_player_profile(
  //       age,
  //       principal || "",
  //       username,
  //       count,
  //       description,
  //     )
  //   }
  //   contextGrab.updateProfile({
  //     age: parseInt(age),
  //     principal: principal || "",
  //     name: username,
  //     count: parseInt(count),
  //     description,
  //   })

  //   // console.log("Profile created with context", contextGrab);
  // }

  const submit = async () => {
    if (username.trim() === "" || age.trim() === "") {
      console.log("Either age or username is Empty");
      return;
    } 

    try {
      await create_player_profile(
        age,
        principal || "",
        username,
        count,
        description,
      )
      // contextGrab.updateProfile({
      //   setAge
      // })
      // contextGrab.updateProfile({
      //   age: parseInt(age),
      //   principal: principal || "",
      //   name: username,
      //   count: parseInt(count),
      //   description,
      // });

      console.log("Profile created with context", contextGrab);
    } catch (error) {
      console.error("failed to create useContext", error)
    }

  }

  const continueFunction = () => {
    submit();
    // Alert();
    setUsernameSubmitted(true)
    navigate("/game")
    // if (window.location.pathname === "/game") {
    //   window.location.reload()
    // }
    
  }
  
  // console.log("username", setUsername);
  // console.log("age", setAge);
  // console.log("description", setDescription);
  // console.log("count", setCount);
  

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // if (username === "") {
  //     //   getProfile()
  //     // } else {
  //     //   create_player_profile(
  //     //     +age,
  //     //   principal,
  //     //   username,
  //     //   +count, 
  //     //   description
  //     //   )
  //     // }
  //     getProfile()
  //   }
  // }, [isAuthenticated])

  return (
    <Container>
      <CustomDialog
        open={!usernameSubmitted} 
        title="Pick a username" 
        contentText="Please select a username" 
        handleContinue={continueFunction}
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
    </Container>
  )
}

export default UserInputForm