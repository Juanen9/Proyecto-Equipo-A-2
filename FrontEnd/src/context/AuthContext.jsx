import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProviderComponent = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));


    useEffect(() => {
        if (token != null){
            localStorage.setItem("token", token)
        }
    },[token]);

    const login = (token) => {
        setToken(token);
      }
    return(
        <AuthContext.Provider value={{token ,login}}>
            {children}
        </AuthContext.Provider>
    );
};