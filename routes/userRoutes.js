import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { loginHandler, signUpHandler } from "../middlewares/errorHandler.js";

const userRouter = Router();

userRouter.route("/signup").post(signUpHandler, createUser);
userRouter.route("/login").post(loginHandler, loginUser);

export { userRouter };
