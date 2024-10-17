import { useState } from "react";
import { useAuth } from "../auth/use_auth_client";
import { ContextProfile, profileContext } from "./context";
import App from "../App"

interface ProfileProps {}

export const chessHooks = async ({} : ProfileProps) => {
    const {isAuthenticated, whoamiActor, principal} = useAuth();
    const user = whoamiActor?.get_player
    const [profile] = useState<ContextProfile>({
        age: 11,
        principal: "soft",
        name: "felix",
        count: 13,
        description: "where"
    })

    // const getProfile = async () => {
    //     const users = whoamiActor?.get_player
    //     try {
    //         if (users.) {
                
    //         }
    //     } catch (error) {
            
    //     }
    // }


    return (
        <profileContext.Provider value={profile}>
        <App />
        </profileContext.Provider>
    )
}