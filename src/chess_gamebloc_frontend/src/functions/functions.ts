import React, { useState } from "react";
import { profileContext } from "./context";
import { useAuth } from "../auth/use_auth_client";
import { Principal } from "@dfinity/principal"

export const chessFunctions = () => {
    const { whoamiActor, isAuthenticated, principal } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)

    const updateUserProfile = async () => {
        setUpdatingProfile(true)
        const user:any = await whoamiActor.getSelf()
        console.log("Profile", user);
        
    }

    return {
        updateUserProfile,
        updatingProfile,
    }
}