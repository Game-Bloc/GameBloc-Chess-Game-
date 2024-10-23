
import { createContext, useContext } from "react";
import { Profile } from "../../../declarations/chess/chess.did"; //ignore

export interface ContextProfile {
    age : number,
    principal : string,
    name : string,
    count : number,
    description : string
}

export const profileContext = createContext<Profile | undefined>(undefined);

export function UseProfileContext () {
    const users = useContext(profileContext)

    if (users === undefined) {
        throw new Error("must be wrapped with profileContext")
    }

    return users;
}


