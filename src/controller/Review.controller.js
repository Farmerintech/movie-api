import mongoose from "mongoose"
import MoviesModel from "../models/Movie.model.js"
import ReviewModel from "../models/Reviews.model.js"

export const createReview = async (req, res) =>{
    try {
        //check any missing fied
        const {reviewer, comment, rating} = req.body
                if(!reviewer || ! comment || !rating){
            return res
            .status(400)
            .json({message:"One of the required field is missing"})
        }
        //get movie id which is to be reviewd and check if it realy exist
        const movieId = req.params.id;
        const isExisting = await MoviesModel.findById(movieId)
        if(!isExisting){
            return res
            .status(400)
            .json({message:"No movies with such id"})
        }
        const newReview = await ReviewModel.create({
            ...req.body,
            movie:movieId,
            reviewedBy:req.user.id
        })
        return res
        .status(201)
        .json({message:"New review record created", newReview})
    } catch (error) {
        return res
        .status(500)
        .json({message:error})     
    }
}

//getAll reviews

export const getAllReviews = async (req, res)=>{
    try {
        //extract the id of the movie whose review we want to get
        const movieId = req.params.id
        const movie = await MoviesModel.findById(movieId);
        if(!movie){
            return res
            .status(404)
            .json({message:"No movie with such id...."}) 
        }
        //get all the review particular to that movie
        const review = await ReviewModel.find({movie:movie._id})

        return res
        .status(200)
        .json({message:"Reviews....", movie, review})//i send that particular movie along with their review so user will know which movie's review thay are reading
    } catch (error) {
        return res
        .status(500)
        .json({message:error})
    }
}


export const getASingleReview = async (req, res)=>{
    try {
        const movieId = req.params.movieId
        const reviewId = req.params.reviewId
        //check if at all the moovie whose id is passed really exist
        const movie = await MoviesModel.findById(movieId)
        if(!movie){
            return res.status(404).json({message:"No movie with such id"})
        }
        //find review that has moviId and revieId that matches the one passed through params
        const review = await ReviewModel.findOne({_id:new mongoose.Types.ObjectId(reviewId), movie:movie._id})
            if(!review){
                return res.status(404).json({message:"No review with such id for this movie", review})
            }  
        return res
        .status(200)
        .json({message:"review....", review})
    } catch (error) {
        console.log(error);
        
        return res
        .status(500)
        .json({message:error})
    }
}


export const deleteReview = async (req, res)=>{
    try {
         const movieId = req.params.movieId
         const reviewId = req.params.reviewId
        //check if at all the moovie whose id is passed really exist
        const movie = await MoviesModel.findById(movieId)
        if(!movie){
            return res.status(404).json({message:"No movie with such id"})
        }
        //find review that has moviId and revieId that matches the one passed through params
        const review = await ReviewModel.findOne({_id:new mongoose.Types.ObjectId(reviewId), movie:movie._id})
            if(!review){
                return res.status(404).json({message:"No review with such id for this movie", review})
            }  
        // as far as any review matches the criteria, grant admin the access to delete it
            if(req.user.role==='admin'){
                const deleteThis = await ReviewModel.findByIdAndDelete(review._id)
                return res.status(200).json({message:"review deleted by admin....", deleteThis})
        }
        // or find if the person trying to delete is the one that created it using craterias which include the  person that create it
        const reviewToDel = await ReviewModel.findOne({_id:review._id, reviewedBy: new mongoose.Types.ObjectId(req.user.id) });
            if(!reviewToDel){
                return res.status(401).json({message:"You cannot delete the review you do not create", review})
            }  
            const deleteThis = await ReviewModel.findByIdAndDelete(reviewToDel._id)
            return res.status(200).json({message:"review deleted....", deleteThis})
    } catch (error) {
        return res
        .status(500)
        .json({message:error})
    }
}