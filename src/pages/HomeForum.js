import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/HomeForum.css'
import UserContext from "../UserContext";
import { useContext } from "react";

function HomeForum(){
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const [forums,setForums] = useState([])
    const [forum,setForum] = useState('')
    useEffect(()=>{
        const funct = async()=>{
        const {data} = await axios.get(`/forums`)
        setForums(data)
        }
        funct()
    },[])
    
const handleSubmit= async(event)=>{
    event.preventDefault()
    if (user===""){
        alert("Must be logged in to create forums")
    }
    else{
    const form_obj = {"forum_catergory":forum}
    const {data} = await axios.post('/forums',form_obj)
    setForums([...forums,data])
    }
}

    return(
        <div className="home-forum-content">
            <div className="display">
                {forums.map((frm)=><button onClick = {()=>{
                    console.log(`/forum/${frm.forum_catergory}`)
                    navigate(`/forum/${frm.forum_catergory}`)
                    }}>{frm.forum_catergory}</button>)}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input onChange={e=>setForum(e.target.value)} required></input>
                    <button type="submit">Create a forum!</button>
                </form>
            </div>
        </div>
    )
}

export default HomeForum