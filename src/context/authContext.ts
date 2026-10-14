import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export type AuthContextType = {
    token :string | null,
    setToken : Dispatch<SetStateAction<string | null>>
}

export const AuthContext = createContext<AuthContextType | null>(null);





export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthContextProvider");
    }

    return context;
}
