
import { createContext } from "react";

export interface ContextProfile {
    age : number | null,
    principal : string | null,
    name : string | null,
    count : number | null,
    description : string | null
}

export const profileContext = createContext<ContextProfile | undefined>(undefined);


