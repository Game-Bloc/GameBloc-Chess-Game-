import { useState } from "react";
import { useAuth } from "../auth/use_auth_client";
import { ContextProfile, profileContext } from "./context";
import Game from "../Game";

interface ProfileProps {}

export const chessHooks = async ({} : ProfileProps) => {
    const {isAuthenticated, whoamiActor, principal} = useAuth();
    const user = whoamiActor?.get_player
    

    // const getProfile = async () => {
    //     const users = whoamiActor?.get_player
    //     try {
    //         if (users.) {
                
    //         }
    //     } catch (error) {
            
    //     }
    // }


    return (
        
        <Game />
        
    )
}