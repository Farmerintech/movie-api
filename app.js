import express from "express"
import { connectDB } from "./src/config/db.js";
import UserRoutes from "./src/routes/user.routes.js";
import movieRoutes from "./src/routes/Movies.routes.js";
import reviewRoutes from "./src/routes/Review.routes.js";

const PORT = process.env.PORT

const app = express();


app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use("/api/v1/movies/", UserRoutes)
app.use("/api/v1/movies", movieRoutes)
app.use("/api/v1/movies/", reviewRoutes)

connectDB()

app.listen(PORT,() => {
    console.log(`Server started at PORT ${PORT}`)
})