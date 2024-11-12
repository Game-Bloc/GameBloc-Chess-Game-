import React, { useState } from "react";
import { profileContext } from "./context";
import { useAuth } from "../auth/use_auth_client";
// import 
import swal from 'sweetalert';
// import { Principal } from "@dfinity/principal"

export const chessFunctions = () => {
    const { whoamiActor, isAuthenticated, principal } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)
    const [ isLoadingProfile, setIsLoading ] = useState<boolean>(false)

     
    const create_player_profile = async(
        age: number,
        principal: string,
        username: string,
        count: number,
        description: string,
    ) => {
        try {
            setUpdatingProfile(true)
            const user = await whoamiActor?.update_player_profile(
                age,
                principal,
                username,
                count,
                description,
            )
            if (user) {
                setIsLoading(true);
                if (window.location.pathname === "/game") {
                    window.location.reload()
                }
                sessionStorage.setItem("PlayerState", "true")
            } else {
                setIsLoading(false)
            }
        } catch (err) {
            setIsLoading(false)
            console.log("Failed to create an account", err);
            
        } finally {
            setIsLoading(false)
            return
        }
    }

    const getProfile = () => {

    }

    return {
        create_player_profile,
        updatingProfile, 
    }
}