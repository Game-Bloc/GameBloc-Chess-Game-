
import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { Profile } from "../../../declarations/chess/chess.did"; //ignore
// import { ProfileContextType } from "../UserInputForm";
// import { useAuth } from "../auth/use_auth_client"

// const { isAuthenticated, whoamiActor } = useAuth()
export interface ContextProfile {
    // const player = whoamiActor.
    age : number | undefined,
    principal : string,
    name : string,
    count : number,
    description : string
    updateProfile: (newProfile: Partial<ContextProfile>) => void;
} // this is related to the user type that was used in the git example

//this is for the setProfile issue
export interface ProfileContextType {
    profile: ContextProfile;
    setProfile: Dispatch<SetStateAction<ContextProfile>>;
    updateProfile: (newProfile: Partial<ContextProfile>) => void;
}

export const profileContext = createContext<ProfileContextType | undefined>(undefined);

export function UseProfileContext () {
    const users = useContext(profileContext)

    if (users === undefined) {
        throw new Error("must be wrapped with profileContext")
    }

    return users;
}


