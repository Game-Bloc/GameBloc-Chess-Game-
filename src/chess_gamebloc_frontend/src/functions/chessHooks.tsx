import { useState } from "react";
import { useAuth } from "../auth/use_auth_client";
import { ContextProfile } from "./context";

interface ProfileProps {}

export const chessHooks = async ({} : ProfileProps) => {
    const {isAuthenticated, whoamiActor, principal} = useAuth();
    const [profile] = useState<ContextProfile>({
        
    })


    return (
        <div></div>
    )
}