import React from "react";
import {useNavigate} from "react-router-dom";
import { useGlobalContext } from "../context";


export default function Login(){
 const [user, setUser] = React.useState({
    username: "",
    password: ""
 })
const {login} = useGlobalContext()
const navigate = useNavigate();

    const handleSubmit = async (e) =>{
       e.preventDefault() 
      
        await login(user)
        navigate("/");
        
     
   
    }

  const handleChange = (e) => {
  setUser(prevValue => ({...prevValue, [e.target.name]: e.target.value}))

  }
 
    return(
        <div className="authframe">
        <div className="auth"> 
         <h3>Login</h3>
            <input type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
            />
            <input type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />

        <button onClick={handleSubmit}>submit</button>
 
       

        </div>
        </div>
    )
}
