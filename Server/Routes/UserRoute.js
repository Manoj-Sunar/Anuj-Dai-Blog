import express from "express";
import { LoginUserDetails, UserLogin, UserRegister } from "../Controller/UserRegisterController.js";
import { authMiddleware } from "../Middleware/AuthMiddleware.js";

export const AuthRouter=express.Router();

AuthRouter.post("/user-register",UserRegister);

AuthRouter.post("/user-login",UserLogin);

AuthRouter.get("/auth-user-details",authMiddleware,LoginUserDetails)