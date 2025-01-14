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
CarRouter.get("/car/:idCar", CarController.getCarById);
CarRouter.get("", CarController.getListCar);
CarRouter.get("/brand", CarController.findCarsByBrand);

export default CarRouter;
