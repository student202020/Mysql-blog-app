import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";

export default function Home(){

    const {currentUser, logout} = useGlobalContext()
    const [posts, setPosts] = React.useState([])

  const fetchPosts = async() =>{
    const res = await axios.get("http://localhost:7000/api/posts/");
    setPosts(res.data);
  }

React.useEffect(()=>{fetchPosts()}, [])
return(
    <div className="home">
    <div className="lef">     
    {currentUser && currentUser.username}
    {!currentUser && <Link to="/register"><button>Register</button></Link>}
    {currentUser ? <div> <button onClick={logout}>Logout</button>
    <Link to="/write" ><button>Add post</button></Link></div>: <Link to="/login"><button>Login</button></Link>}
    </div >
<div className="cent"><h1>Our Posts...</h1></div>
{posts.map(item => {
    return(
        <div key={item.id} className="posts">
            <img src={`../upload/${item.img}`} alt="nema slike"/>
<Link to={`/posts/${item.id}`}><h3>{item.title}</h3></Link>


<p>{item.desc}</p>


</div>
    )
})}


    </div>)
    

}