import { Router } from "express";
import UserMiddleware from "../../../middlewares/userMiddleware.js";
import UserController from "../../../controllers/userController.js";
const UserRouter = Router();

UserRouter.post("/register", UserMiddleware.validateRegister, UserController.register);
UserRouter.post("/login", UserMiddleware.validateLogin, UserController.login);

export default UserRouter;