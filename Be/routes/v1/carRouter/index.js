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
//tìm xe qua id
CarRouter.get("/car/:idCar", CarController.getCarById);
//tìm xe (có query)
CarRouter.get("", CarController.getListCar);
// CarRouter.put("/addColor", CarController.updateCarColors);
CarRouter.get("/brand", CarController.findCarsByBrand);
//api tìm kiếm xe bằng tên
CarRouter.get("/search", CarController.searchingCar);

export default CarRouter;
