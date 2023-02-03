import { UserController } from "../controller/UserController";
import express from "express";

const userController = new UserController()
export const userRouter = express.Router()

userRouter.post('/create', userController.createUser)
userRouter.post('/makeFriendship', userController.makeFriendship)
userRouter.delete('/endFriendship', userController.endFrienship)