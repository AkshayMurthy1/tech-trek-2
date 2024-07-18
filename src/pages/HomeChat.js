import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";


function HomeChat(){
    const navigate = useNavigate()
    const [users,setUsers] = useState([])
    const {user} = useContext(UserContext)

    useEffect(()=>{
        const funct = async()=>{
        const {data} = await axios.get('/allusers')
        const usrs = data.filter((usr)=>usr.username!==user) //filters out all the 'usr' elements that return false in the callback (are equal to user)
        setUsers(usrs)
        }
        funct()
    },[])
    
    return(
        <div className="usersContainer">
            {users.map(usr=><div><button onClick={()=>navigate(`/chat/${usr.username}`)}>{usr.username}</button></div>)}
        </div>
    )

}
export default HomeChat