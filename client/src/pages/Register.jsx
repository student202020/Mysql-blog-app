import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export default function Register(){
 const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: ""
 })

const navigate = useNavigate();
    const handleSubmit = async (e) =>{
       e.preventDefault() 
      
        await  axios.post("http://localhost:7000/api/auth/register", user);
        navigate("/login");
     
   
    }

  const handleChange = (e) => {
  setUser(prevValue => ({...prevValue, [e.target.name]: e.target.value}))

  }
 
    return(
        <div className="authframe">
        <div className="auth">
        <h3>Register</h3>
            <input type="emeil"
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />
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
        <h4>{user.email}</h4>
        <h4>{user.username}</h4>
       

        </div>
        </div>
       
    )
}
