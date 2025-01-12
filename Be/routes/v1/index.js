import { Router } from "express";
import UserRouter from "./userRouter/index.js";
import CarRouter from "./CarRouter/index.js";
const V1Router = Router();

V1Router.use("/users", UserRouter);
V1Router.use("/cars", CarRouter);
export default V1Router;
