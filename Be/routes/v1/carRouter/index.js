import { Router } from "express";
import CarController from "../../../controllers/carController.js";
import UserMiddleware from "../../../middlewares/userMiddleware.js";
const CarRouter = Router();

//Thêm xe mới (đã là provider - role: 'PROVIDER')
CarRouter.post(
  "/create-car",
  UserMiddleware.checkRoleProvider,
  CarController.createCar
);
CarRouter.get("/:id", CarController.getCarById);
CarRouter.get("/car", CarController.getListCar);

export default CarRouter;
