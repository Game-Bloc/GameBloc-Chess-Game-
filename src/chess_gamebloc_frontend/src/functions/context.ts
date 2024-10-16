
import { createContext } from "react";

export interface contextProfile {
    age : number,
    principal : string | undefined,
    name : string | undefined,
    count : number | undefined,
    description : string | undefined
}

export const profileContext = createContext<contextProfile | undefined>(undefined);


