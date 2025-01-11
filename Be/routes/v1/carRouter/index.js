import { Router } from "express";
import CarController from "../../../controllers/carController.js";
const CarRouter = Router();

CarRouter.post("/create-car", CarController.createCar);

export default CarRouter;