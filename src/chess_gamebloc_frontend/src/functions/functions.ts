import React, { useState } from "react";
import { profileContext } from "./context";
import { useAuth } from "../auth/use_auth_client";
// import 
import swal from 'sweetalert';
// import { UseProfileContext } from "./context";
import { Principal } from "@dfinity/principal"

export const chessFunctions = () => {
    const { whoamiActor, isAuthenticated, principal } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)
    const [ isLoadingProfile, setIsLoading ] = useState<boolean>(false)

     
    const create_player_profile = async(
        age: string, 
        principal: string, 
        username: string, 
        count: string, 
        description: string
    ) => {
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
            console.log("players profile gotten", user);
            // if (user.name != "") {
            //     console.log("gotten profile:", user);
            // } else {
            //     console.log("couldn't listen to the player info");
            // }
            
        } catch (error) {
            setIsLoading(false)
            console.log("couldn't get player profile", error);
            
        }
    }

    return {
        create_player_profile,
        updatingProfile, 
        getProfile,
    }
}