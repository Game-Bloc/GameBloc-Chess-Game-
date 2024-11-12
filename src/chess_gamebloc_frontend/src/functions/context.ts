
import { createContext, useContext } from "react";
import { Profile } from "../../../declarations/chess/chess.did"; //ignore
import { useAuth } from "../auth/use_auth_client"

const { isAuthenticated, whoamiActor } = useAuth()
export interface ContextProfile {
    age : number,
    principal : string,
    name : string,
    count : number,
    description : string
} // this is related to the user type that was used in the tuto

export const profileContext = createContext<ContextProfile | undefined>(undefined);

export function UseProfileContext () {
    const users = useContext(profileContext)

    if (users === undefined) {
        throw new Error("must be wrapped with profileContext")
    }

    return users;
}


