import { createContext, useContext } from "react";
import User from "./user";

export interface Session {
    user: User;
}
export interface SessionContextValue {
    session: Session | null;
    setSession: (session: Session | null) => void;
}

export const SessionContext = createContext<SessionContextValue>({
    session: null,
    setSession: () => {},
});

export function useSession() {
    return useContext(SessionContext);
}
