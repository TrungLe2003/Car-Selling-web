import { Router } from "express";
import UserRouter from "./userRouter/index.js";
const V1Router = Router();

V1Router.use("/users", UserRouter);
export default V1Router;
