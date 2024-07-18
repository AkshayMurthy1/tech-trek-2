import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UserContext = createContext()

export default UserContext

export const UserProvider = ({children})=>{
    const navigate = useNavigate()
    const [user, setUser] = useState("");
    const login = (username) => {
        setUser(username);
      };
    const logout = ()=>{
        setUser('');
        navigate('/login')
    }
    return (
        <UserContext.Provider value={{ user, login, logout }}>
          {children}
        </UserContext.Provider>
      )
}