import React, { useState } from "react";
import { profileContext } from "./context";
import { useAuth } from "../auth/use_auth_client";
// import 
import swal from 'sweetalert';
import { Principal } from "@dfinity/principal"

export const chessFunctions = () => {
    const { whoamiActor, isAuthenticated, principal } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)
    const [ isLoadingProfile, setIsLoading ] = useState<boolean>(false)

     
    const create_player_profile = async() => {
        try {
            setUpdatingProfile(true)
            const users = await whoamiActor?.update_player_profile(
                0,
                "principal",
                "username",
                0,
                "description",
            )
            // console.log("testing");
            console.log("created profile", users);
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
            setIsLoading(false)
            console.log("Failed to create an account", err);
            
        }
    }

    // const getProfile = async () => {
    //     try {
    //         setIsLoading(true)
    //         const user: any = await whoamiActor?.getPlayerProfile()
    //         console.log("the users;", user);
    //         if (user.name != "") {
    //             setIsLoading(true)
                
    //         }
    //     } catch (error) {
            
    //     }
    // }

    return {
        create_player_profile,
        updatingProfile, 
        // getProfile,
    }
}