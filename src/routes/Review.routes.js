import express from "express"
import { Authorization, isAdmin, isAdminOrUser } from "../middlewares/auth.middleware.js";
import { createReview, deleteReview, getAllReviews, getASingleReview } from "../controller/Review.controller.js";

const reviewRoutes = express.Router();

reviewRoutes
.post("/:id/reviews", Authorization, createReview)
.get("/:id/reviews", getAllReviews)
.get("/:movieId/reviews/:reviewId", getASingleReview)
.delete("/:movieId/reviews/:reviewId", Authorization, isAdminOrUser,  deleteReview)

export default reviewRoutes