
import { createContext } from "react";

export interface ContextProfile {
    age : number,
    principal : string | undefined,
    name : string | undefined,
    count : number | undefined,
    description : string | undefined
}

export const profileContext = createContext<ContextProfile | undefined>(undefined);


