import type { Session } from "@toolpad/core";
import { createContext, useContext } from "react";

export interface SessionContextValue {
    session: Session | null;
    setSession: (session: Session | null) => void;
}

export const SessionContext = createContext<SessionContextValue>({
    session: {},
    setSession: () => {},
});

export function useSession() {
    return useContext(SessionContext);
}
