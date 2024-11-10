import express from "express"
import { Login, Register } from "../controller/User.controller.js";

const UserRoutes = express.Router();
UserRoutes
 .post('/register', Register)
 .post('/login', Login)

export default UserRoutes
