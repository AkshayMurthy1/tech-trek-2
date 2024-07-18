import UserContext from "../UserContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import Post from "../components/Post"
import axios from "axios";
import '../css/Forum.css'

import { useNavigate } from "react-router-dom";

function Forum({forum_name}){
    const {user,logout} = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [post,setPost] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        //when component loads
        const funct = async()=>{
            const {data} = await axios.get('/posts/id/reverse=true')
            //filter out data
            let temp = []
            if (forum_name!="all")
              for (const pst of data){
                if (pst.forum_catergory==forum_name){
                  temp.push(pst)
                }
              }
            setPosts(temp)
          }
        funct()

        if (user===""){
          console.log("Not logged in")
            navigate("/login")
        }
    },[])
    useEffect(()=>{
      console.log(posts)
    },[posts])


    const handleSubmit = async(event)=>{
        event.preventDefault()
        const post_obj = {post,"username":user}
        const {data} = await axios.post(`/posts/${forum_name}`,post_obj)
        setPosts([data,...posts])
    }
    
    return(
        <div className="forum">
      <h1>{`${forum_name.toUpperCase()} Forum`}</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          name="content"
          placeholder="Your post"
          value={post}
          onChange={(e)=>{setPost(e.target.value)}}
          required
        ></textarea>
        <button type="submit">Submit Post</button>
      </form>
      {posts.map(pst => (
        <Post
          author={pst.username}
          content={pst.post}
          timestamp={(new Date(pst.time_posted)).toLocaleString('en-us',{year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true})}
        />
      ))}
    </div>
  );
};

export default Forum;