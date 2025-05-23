import React, { useState } from "react";
import { UseProfileContext } from "./context";
import { useAuth } from "../auth/use_auth_client";
// import 
import swal from 'sweetalert';
// import { UseProfileContext } from "./context";
import Swal from "sweetalert2";

export const chessFunctions = () => {
    const { whoamiActor, isAuthenticated, principal } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)
    const [ isLoadingProfile, setIsLoading ] = useState<boolean>(false)
    const contextGrab = UseProfileContext();
    const setProfile = UseProfileContext();

    const popUp = () => {
        Swal.fire({
          position: "center",
          title: "Success",
          icon: "success",
          text: "Account Creation Successful",
          confirmButtonText: "Continue",
        //   background: "#01070E",
        //   color: "#fff",
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     navigate(route)
        //   }
        // })
        })
    }

     
    const create_player_profile = async(
        age: string, 
        principal: string, 
        username: string, 
        count: string, 
        description: string
    ) => {
        try {
            setUpdatingProfile(true)
            const users = await whoamiActor?.update_player_profile(
                parseInt(age),
                principal.toString(),
                username,
                parseInt(count),
                description,
            ) 
            if (users) {
                setProfile.profile.name === username
                if (window.location.pathname === "/game") {
                    window.location.reload()
                }
                console.log("created profile", users);
                popUp()
                
            } else {
                console.warn("Profile creation returned undefined. Check backend response.");
            }
            
        } catch (err) {
            // setIsLoading(false)
            console.log("Failed to create an account", err);
        } finally {
            setUpdatingProfile(true);
        }
    }

    const getProfile = async () => {
        try {
            setIsLoading(true)
            const user: any = await whoamiActor?.getPlayerProfile()
            if (user) {
                contextGrab.updateProfile({
                    age: user.age,
                    // principal,
                    name: user.name,
                    count: user.count,
                    // description,
                })
            }
            console.log("players profile gotten", user);
        } catch (error) {
            setIsLoading(false)
            console.log("couldn't get player profile", error);   
        }
    }

    const ws_open = () => {

    }

    return {
        create_player_profile,
        updatingProfile, 
        getProfile,
    }
}