import { useState } from 'react'
import React from 'react'
import ChessPage from './ChessPage'
import { ContextProfile, profileContext } from './functions/context'
import { useAuth } from './auth/use_auth_client'


interface AppWrapProp {}
const AppWrap = ({} : AppWrapProp) => {

  // const playersUsers = async () => {
  //   try {
  //     const userPlayer = await whoamiActor?.update_player_profile(
        
  //     )
  //   } catch (error) {
      
  //   }
  // }
  
  const [profile, setProfile] = useState<ContextProfile>({
    age: 0,
    principal: "",
    name: "",
    count: 0,
    description: ""
  })

  const { whoamiActor } = useAuth()
  const [ updatingProfile, setUpdatingProfile ] = useState(false)

  const create_player_profile = async(age: string, principal: string, username: string, count: string, description: string) => {
    try {
        setUpdatingProfile(true)

        console.log("Sending data:", {
            age,
            principal: principal.toString(),
            username,
            count,
            description,
        });

        // const PlayerUsername = UseProfileContext();

        const users = await whoamiActor?.update_player_profile(
            parseInt(age),
            principal.toString(),
            username,
            parseInt(count),
            description,
        )
        // console.log("testing");
        if (users) {
            console.log("created profile", users);
        } else {
            console.warn("Profile creation returned undefined. Check backend response.");
        }
        // console.log("age", age);
        // console.log("principal", principal);
        // console.log("username", username);
        // console.log("count", count);
        // console.log("description", description);
        
        // if (user) {
        //     setIsLoading(true);
        //     if (window.location.pathname === "/game") {
        //         window.location.reload()
        //     }
        //     sessionStorage.setItem("PlayerState", "true")
        // } else {
        //     setIsLoading(false)
        // }
    } catch (err) {
        // setIsLoading(false)
        console.log("Failed to create an account", err);
    } finally {
        setUpdatingProfile(true);
    }
}

  return (
    
    <profileContext.Provider value={profile}>
      <ChessPage />
    </profileContext.Provider>
  
  )
}

export default AppWrap