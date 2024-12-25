import { Router } from "express";
import UserRouter from "./usersRouter/index.js";
const V1Router = Router();

V1Router.use("/user", UserRouter);
export default V1Router;
