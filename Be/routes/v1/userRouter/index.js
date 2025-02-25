import { Router } from "express";
import UserMiddleware from "../../../middlewares/userMiddleware.js";
import UserController from "../../../controllers/userController.js";
const UserRouter = Router();

UserRouter.post(
  "/register",
  UserMiddleware.validateRegister,
  UserController.register
);
UserRouter.post("/login", UserMiddleware.validateLogin, UserController.login);
UserRouter.get("/:id", UserController.getUser);
UserRouter.put("/modify/:id", UserController.modifyUser);



export default UserRouter;