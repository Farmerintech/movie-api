import mongoose from "mongoose"

export const MovieSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    releasedYear:{
        type:Number,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
}, {timestmps:true})

const MoviesModel = mongoose.model("Movie", MovieSchema)

export default MoviesModel