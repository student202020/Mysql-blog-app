import express from "express";
import bcrypt from"bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {db} from "../db.js";


export const register = (req, res) => {
    
    
    const q = "SELECT * FROM `users` WHERE `username` = ? OR `email` = ?"
    db.query(q, [req.body.username, req.body.email], (err, data)=> {
        if(err) return console.log(err)
        if(data.length) return console.log("vec ste registrovani")
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO `users` (`email`, `username`, `password`) VALUES (?)"
        const values = [
            req.body.email,
            req.body.username,
            hash
        ]
        db.query(q, [values], (err, data) => {
            if(err) return console.log(err) 
            res.json("novi korisnik je unesen")
        })

    })
}
export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE `username` = ? ";
    db.query(q, [req.body.username], (err, data) => {
        if(err) return console.log(err) ;
        if(data.length === 0) return console.log("niste registstrovani");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if(!isPasswordCorrect) return console.log("pogrešan password");
         
        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        
        
        const {password, ...other} = data[0];

        
        res.cookie("access_token", token, {httpOnly: true }).status(200).json(other);
    
        })




    } 




export const logout = (req, res) => {

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
      }).status(200).json("User has been logged out.")
    
}