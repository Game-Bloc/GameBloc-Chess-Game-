
import { createContext } from "react";

export interface ContextProfile {
    age : number,
    principal : string,
    name : string,
    count : number,
    description : string
}

export const profileContext = createContext<ContextProfile | undefined>(undefined);


