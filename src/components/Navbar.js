import '../css/Navbar.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useEffect, useState } from 'react';
import DropDown from './DropDown'
function Navbar(){
    const navigate = useNavigate()
    const {user,logout} = useContext(UserContext)
    const[loggedIn,setLoggedIn] = useState(user!="")
    const[showMenu,setShowMenu] = useState(false)
    useEffect(()=>{
        setLoggedIn(user!="")
        if (user===""){
            setShowMenu(false)
        }
    },[user])

    const handleClick = ()=>{
        if (user === ""){
            console.log("going to login")
            navigate('/login')
        }
        else{
            setShowMenu(!showMenu)
        }
    }
  return (
    <nav className="navbar">
      <div className="logo">
        <button onClick={()=>navigate('/home')}>Home</button>
      </div>
      <div className="navLinks">
        <button onClick={() => navigate('/about')}>About</button>
        <button onClick={() => navigate('/chat')}>Messenger</button>
        <button onClick={() => navigate('/forum')}>Forum</button>
        <button className="log" onClick={handleClick}>{loggedIn?`Hello, ${user}`:"Login"}</button>
        {showMenu?<DropDown/>:<div/>}
      </div>
    </nav>
  );
};

export default Navbar;