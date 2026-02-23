import { useContext } from "react";
import { AuthContext } from "./auth.context";
import { login, register, getMe } from "./services/auth.api";

export const useAuth =()=>{ //custom react hook 
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading}= context
  
console.log("CTX:", context)


    const handleLogin = async (username,password)=>{
        setLoading(true)
        const response = await login(username, password)
            setUser(response.user)
            setLoading(false)
        }

    const handleRegister = async (username, email, password)=>{
        setLoading(true)
        const response = await register(username, email, password)
        setUser(response.user)
        setLoading(false)
    }
    

    return {handleLogin,handleRegister,user,loading}
    }

