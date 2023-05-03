import {db} from "../db.js";
import jwt from "jsonwebtoken";


export const getPosts = (req, res) => {
    const q = "SELECT * FROM `posts` ";
    db.query(q, (err, data) =>{
        if(err) return console.log(err)
        res.json(data)
    })

}
export const getPost = (req, res) => {
    const q = "SELECT  p.id, `title`, `desc`, `img`, `userID`, `username` FROM users u JOIN posts p ON u.id = `userID` WHERE p.id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if(err) return console.log(err);
        res.json(data)
    })
}
export const addPost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return console.log("niste logovani")

    jwt.verify(token, "jwtkey", (err, userInfo) =>{
        const q = "INSERT INTO posts (`title`, `desc`, `img`,`userid` ) VALUES(?)";
        const values =[
            req.body.title,
            req.body.desc,
            req.body.img,
            userInfo.id,
        ]
        db.query(q, [values], (err, data) => {
            if(err) return console.log(err)
            res.json(data) 
        })
    })
    
}
export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return console.log("niste logovani");

    jwt.verify(token, "jwtkey", (err, userInfo) =>{
        const q = "DELETE FROM posts WHERE id=?";
    
        db.query(q, [req.params.id], (err, data) => {
            if(err) return console.log(err)
            res.json(data) 
        })
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return console.log("niste logovani")

    jwt.verify(token, "jwtkey", (err, userInfo) =>{
        const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?,`userid`=? WHERE id=?"
        const values =[
            req.body.title,
            req.body.desc,
            req.body.img,
            userInfo.id
        ]
        db.query(q, [...values, req.params.id], (err, data) => {
            if(err) return console.log(err)
            res.json(data) 
        })
    })
}