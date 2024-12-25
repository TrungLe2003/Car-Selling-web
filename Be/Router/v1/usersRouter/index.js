import { Router } from "express";
import UserMiddleware from "../../../middleware/userMiddleware.js";
import UserController from "../../../controller/User/userController.js";
const UserRouter = Router();

UserRouter.post("/register", UserMiddleware.register, UserController.register);
UserRouter.post("/logIn", UserController.logIn);

export default UserRouter;
