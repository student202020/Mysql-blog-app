import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useLocation} from "react-router-dom";


export default function Write(){
 
const state = useLocation().state;

 const [title1, setTitle1] = React.useState(state?.title || "")
 const [desc1, setDesc1] = React.useState(state?.desc || "")
 const [file, setFile] = React.useState(null);

 const navigate = useNavigate();

 const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:7000/api/upload", formData, {withCredentials: true});
      return res.data;
      } catch (err) {
      console.log(err);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(imgUrl)

    try {
      state
        ? await axios.put(`http://localhost:7000/api/posts/${state.id}`, {
            title: title1,
            desc: desc1,
            img: file ? imgUrl : "",
         },  {withCredentials: true})
        : await axios.post(`http://localhost:7000/api/posts/`,  {
            title: title1,
            desc: desc1,
            img: file ? imgUrl : "",
         },  {withCredentials: true});
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

   
    return(
        <div className="authframe">
        <div className="auth">

            <input type="text"
                name="title"
                placeholder="Title"
                value={title1}
                onChange={(e) => setTitle1(e.target.value)}
            />
            <input type="text"
                name="desc"
                placeholder="description..."
                value={desc1}
                onChange={(e) => setDesc1(e.target.value)}
            />
            <div></div>
            <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name=""
                onChange={(e) => setFile(e.target.files[0])}
          />
          <div></div>
          <div>
          <label className="file" htmlFor="file">
            Upload Image
          </label>

          </div>
        

        <button onClick={handleSubmit}>{state ? "Update post" : "Add post"}</button>
 
        </div>
        </div>
    )
}
