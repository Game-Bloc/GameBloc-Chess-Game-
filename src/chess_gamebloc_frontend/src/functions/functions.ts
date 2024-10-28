import React, { useState } from "react";
import { profileContext } from "./context";
import { useAuth } from "../auth/use_auth_client";
import { Principal } from "@dfinity/principal"

export const chessFunctions = () => {
    const { whoamiActor, isAuthenticated, principal } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)

    const createUserProfile = async (
        age: number,
        principal: string,
        name: string,
        count: number,
        description: string,
    ) => {
        setUpdatingProfile(true)
        const user = who
        
        
    }

    return {
        createUserProfile,
        updatingProfile,
    }
}