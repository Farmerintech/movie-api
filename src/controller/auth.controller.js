import mongoose from "mongoose"
import UserModel from "../models/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const {username, password, role} = req.body
        const usernameExists = await UserModel.findOne({username});

        //check if the request contain the neccessary fields
        if(!username || !password){
            return res
            .status(402)
            .json({message:'Username or password is missing...!'})
        }
        //check if username already exist to ensure a unique username
        if(usernameExists){
           return res
            .status(400)
            .json({message:"username already exist"})
        }

        //saltround and hash
        const saltRound = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRound)
       //create new user with the hashed password and the username
        const newUser = await UserModel.create({
            username,
            password:hashedPassword,
            role
        })
        return res
        .status(201)
        .json({message:"New user created", newUser})
    } catch (error) {
        return res
        .status(500)
        .json({errorMessage:error})
        
    }
}

export const Login  = async (req, res) =>{
    try {
        const {username, password} = req.body
         //check if the request contain the neccessary fields
         if(!username || !password){
            return res
            .status(400)
            .json({message:'Username or password is missing...!'})
        }
        //check if username exist
        const user = await UserModel.findOne({username});
        if(!user){
            return res.status(404)
            .json({message:"username does not exist"});
        }
        //check if password match
        const matchedPassword = await bcrypt.compare(password, user.password)
        if(!matchedPassword){
            return res.status(404)
            .json({message:"incorrect password"});  
        }
        //now generate the access token 
        const token = jwt.sign(
            {
                id:user._id,
                role:user.role,
            },
            process.env.SECRETE_KEY,
            {
                expiresIn:process.env.LIFE_TIME
            }
        )
        return res
        .status(200)
        .json({message:"Login successful..", token})
    } catch (error) {
       return res
       .status(500)
       .json({message:error})
        
    }

}