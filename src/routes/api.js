import express from "express";
import { Register } from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { Login } from "../controllers/login.controller.js";
import { updateScores,  leaderBoard } from "../controllers/game.controller.js";
import { check } from "express-validator";
import {AuthMiddleware} from '../middlewares/AuthMiddleware.js'

const apiRoute = express.Router();


apiRoute.post('/register',RegisterSchema,Register)
apiRoute.post('/login',LoginSchema,Login)
apiRoute.use(AuthMiddleware);

apiRoute.patch('/updatescore/:userId',updateScores)

apiRoute.get('/leaderboard', leaderBoard)

export default apiRoute;