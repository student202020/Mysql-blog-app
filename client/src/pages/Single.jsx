import React from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";



export default function Single(){

    const {currentUser} = useGlobalContext()
    const [post, setPost] = React.useState({})
    const navigate = useNavigate()
    const {id} = useParams()

    const handleDelete = async ()=>{
        try {
          await axios.delete(`http://localhost:7000/api/posts/${id}`, {withCredentials: true});
          navigate("/")
        } catch (err) {
          console.log(err);
        }
      }
    
    const fetchPost = async (nesto) => {
        const res =  await axios.get(`http://localhost:7000/api/posts/${nesto}`);
       if(res.data.length) {setPost(res.data[0])}
       }
    
    React.useEffect(()=> {fetchPost(id)},[id]);
    
    return(
      <div className="single">
      <img src={`../upload/${post?.img}`} alt=""/>
      <div className="both"> 
      <h1>{post.title}</h1>
      <p>{post.username}</p>
      </div>
      <p>{post.desc}</p>
      
 
     {(currentUser && (currentUser.username === post.username)) &&
    <div>
    <button onClick={handleDelete}>Delete</button>
    <Link to="/write" state={post}><button>Edit</button></Link>
    </div>}
    <Link to="/"><button>Back</button></Link>
    </div>
    )
}