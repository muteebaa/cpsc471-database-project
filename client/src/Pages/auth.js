import { Children, createContext, useContext, useState, useNavigate} from "react";
import Axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [pw, setPW] = useState(null)
    const [authState, setAuthState] = useState(null)
    
    const login = (user, pw) => {
        console.log('auth login called');
        setUser(user)
        setPW(pw)
        setAuthState(new Boolean(true))
        
        console.log("user"+user);
        console.log(pw);
        
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, pw, login, logout}}> 
            { children } 
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    
    return useContext(AuthContext)
}