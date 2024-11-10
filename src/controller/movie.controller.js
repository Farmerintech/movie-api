import MoviesModel from "../models/Movie.model.js"
import ReviewModel from "../models/Reviews.model.js"

export const createMovie = async (req, res) =>{
    try {
        const {title, director, genre, releasedYear, rating} = req.body
        if(!title || ! director || !genre || ! releasedYear || !rating){
            return res
            .status(400)
            .json({message:"One of thr required field is missing"})
        }

        const newMoview = await MoviesModel.create({
            title,
            director,
            genre,
            releasedYear,
            rating
        })
        return res
        .status(201)
        .json({message:"New movie record created", newMoview})
    } catch (error) {
        
    }
}

//get all movies

export const getAllMovies = async (req, res)=>{
    try {
        const movie = await MoviesModel.find();
        return res
        .status(200)
        .json({message:"Movies....", movie})
    } catch (error) {
        return res
        .status(500)
        .json({message:error})
    }
}

export const getASingleMovie = async (req, res)=>{
    try {
        const movieId = req.params.id
        const movie = await MoviesModel.findById(movieId);
        const moviewReviews = await ReviewModel.find({movie:movie._id})
        if(!movie){
            return res.status(404).json({message:"No movie with such id"})
        }
        return res
        .status(200)
        .json({message:"Movie....", movie, moviewReviews})
    } catch (error) {
        return res
        .status(500)
        .json({message:error})
    }
}

export const updateMovie = async (req, res)=>{
    try {
        const movieId = req.params.id
        const movie = await MoviesModel.findById(movieId);
        if(!movie){
            return res.status(404).json({message:"No movie with such id"})
        }
        const { reviewer, comment, rating} = req.body
        const newMovie = await MoviesModel
        .findByIdAndUpdate(
            movieId, 
            req.body,
        {
            new:true
        })
        return res
        .status(200)
        .json({message:"Movie updated....", newMovie})
    } catch (error) {
        return res
        .status(500)
        .json({message:error})
    }
}

export const deleteMovie = async (req, res)=>{
    try {
        const movieId = req.params.id
        const movie = await MoviesModel.findById(movieId);
        if(!movie){
            return res.status(404).json({message:"No movie with such id"})
        }
        const moviesReview = await ReviewModel.find({movie:movie._id});
        let rev;
        moviesReview.forEach(review => {
            rev= review._id;
            return rev
        });
        await MoviesModel.findByIdAndDelete(rev)
        const deletedMovie = await MoviesModel
        .findByIdAndDelete(movieId)
        return res
        .status(200)
        .json({message:"Movie deleted....", deletedMovie, moviesReview})
    } catch (error) {
        return res
        .status(500)
        .json({message:error})
    }
}