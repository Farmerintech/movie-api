import express from "express"
import { createMovie, deleteMovie, getAllMovies, getASingleMovie, updateMovie } from "../controller/movie.controller.js";
import { Authorization, isAdmin } from "../middlewares/auth.middleware.js";


const movieRoutes = express.Router();

movieRoutes
.post("/", Authorization, isAdmin, createMovie)
.get('/', getAllMovies)
.get('/:id', getASingleMovie)
.put('/:id', Authorization, isAdmin, updateMovie)
.delete('/:id', Authorization, isAdmin, deleteMovie)

export default movieRoutes