import { Router } from "express";
import CarController from "../../../controllers/carController.js";
const CarRouter = Router();

CarRouter.post("/create-car", CarController.createCar);
CarRouter.get("/car/:id", CarController.getCar);
CarRouter.get("/car", CarController.getListCar);

export default CarRouter;