import React, { useState } from "react";
import { profileContext } from "./context";
import { useAuth } from "../auth/use_auth_client";
import swal from 'sweetalert';
// import { Principal } from "@dfinity/principal"

export const chessFunctions = () => {
    const { whoamiActor, isAuthenticated, principal } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)

    const update_player_profile = (
        age: number,
        principal: string,
        name: string,
        count: number,
        description: string,
    ) => {
        try {
            setUpdatingProfile(true)
            const user = whoamiActor?.update_player_profile(
                age,
                principal,
                name,
                count,
                description,
            )
            if (user) {
                
            }
        } catch (error) {
        }
    }

    return {
        update_player_profile,
        updatingProfile, 
    }
}