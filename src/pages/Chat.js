import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"
import axios from "axios"
import OtherMessage from "../components/OtherMessage"
import UserMessage from "../components/UserMessage.js"
import { useNavigate } from "react-router-dom"

function Chat({other}){
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState('')

    useEffect(()=>{
        if (user==""){
            navigate("/login")
        }
        else{
        const funct = async()=>{
            console.log(`/messages/${user}/${other}`)
            const {data} = await axios.get(`/messages/${user}/${other}`)
            setMessages(data)
    }
    funct()
}},[])

    const sendMessage = async(event)=>{
        event.preventDefault()
        console.log(user)
        const message_obj = {"message":message,"username":user,"recipient":other}
        const {data} = await axios.post(`/messages`,message_obj)
        setMessages([...messages,data[0]])
        console.log(user)
    }

    return(
        <div className="chat-container">
            <div className="messages-container">
                {messages.map(msg=>{
                    console.log(messages)
                    if (msg.username == user){
                        console.log(msg)
                        return <UserMessage message = {msg.message} time = {(new Date(msg.time_sent)).toLocaleString('en-us',{year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true})} />
                    }
                    else{
                        return <OtherMessage message = {msg.message} user = {msg.username} time = {(new Date(msg.time_sent)).toLocaleString('en-us',{year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true})}/>
                    }
                })}
            </div>
            <div className="input-container">
                <form onSubmit={sendMessage}>
                    <input type = "text" placeholder="Send Message" onChange={e=>setMessage(e.target.value)}></input>
                    <button type = "submit">Send</button>
                </form>
            </div>
        </div>
    )

}
export default Chat