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
            setUpdatingProfile(false);
        }
    }

    const getProfile = async () => {
        try {
            setIsLoading(true)
            const user: any = await whoamiActor?.getPlayerProfile()
            console.log("players profile gotten", user);
            
        } catch (error) {
            console.log("couldn7t get player profile");
            
        }
    }

    return {
        create_player_profile,
        updatingProfile, 
        getProfile,
    }
}