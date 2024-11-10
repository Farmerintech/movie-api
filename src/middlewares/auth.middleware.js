import jwt from "jsonwebtoken"
import UserModel from "../models/User.model.js"
import ReviewModel from "../models/Reviews.model.js"
import mongoose from "mongoose"

export const Authorization = async (req, res, next) =>{
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
        return res.status(401).json({message:"Not authorized"})
    }
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY);
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(500).json({message:error})  
    }


}


export const isAdmin = (req, res, next) =>{
    if(!req.user) 
        return res.status(401).json({message:"Not authorized"})
    if(req.user.role !=="admin" ){
        return res
        .status(401)
        .json({message:"Not authorized, must be an admin"})
    }
    next()
}

export const isAdminOrUser = async(req, res, next) =>{
    const user = await UserModel.findById(req.user.id);
    if(!req.user) 
        return res.status(401).json({message:"Not authorized, abeg login"})
    if(req.user.role !=="admin" && req.user.role !=="user"){
        return res
        .status(401)
        .json({message:"Not authorized, must be an admin or at least a user"})
    }
    next()
}