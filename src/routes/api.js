import express from "express";
import { Register } from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { loginUser,registerUser } from "../controllers/user.controller.js";
import { updateScores,  leaderBoard } from "../controllers/game.controller.js";
import { check } from "express-validator";
import {AuthMiddleware} from '../middlewares/AuthMiddleware.js'

const apiRoute = express.Router();


apiRoute.post('/register',registerUser)
apiRoute.post('/login',loginUser)
apiRoute.use(AuthMiddleware);

apiRoute.patch('/updatescore/:userId',updateScores)

apiRoute.get('/leaderboard', leaderBoard)

export default apiRoute;