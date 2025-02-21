import { Router } from "express";
import middlewares from "../../../middlewares/index.js";
import UserMiddleware from "../../../middlewares/userMiddleware.js";
import CarController from "../../../controllers/carController.js";
const CarRouter = Router();

//Thêm xe mới (đã là provider - role: 'PROVIDER')

CarRouter.post(
  "/create-car",
  
  UserMiddleware.checkRoleProvider,
  CarController.createCar
);
// tìm xe qua id
CarRouter.get("/car/:idCar", CarController.getCarById);
// tìm xe (có query)
CarRouter.get("", CarController.getListCar);
// CarRouter.put("/addColor", CarController.updateCarColors);
CarRouter.get("/brand", CarController.findCarsByBrand);
// api tìm kiếm xe bằng tên
CarRouter.get("/search", CarController.searchingCar);
// sửa thông tin của xe
CarRouter.put("/updatecar/:idCar", UserMiddleware.checkProviderOrAdmin, CarController.updatedCar);
// xoá xe
CarRouter.delete("/deletecar/:idCar", UserMiddleware.checkProviderOrAdmin, CarController.deleteCar);
// Đếm tất cả xe theo trạng thái - ADMIN
CarRouter.get("/countCars", middlewares.verifyAccessToken, middlewares.validateAdmin, CarController.countCars);
// Lấy tất cả xe - ADMIN
CarRouter.get("/getAllCar", middlewares.verifyAccessToken, middlewares.validateAdmin, CarController.getAllCar);
// lấy tất cả xe của user qua id
CarRouter.get("/:idProvider", CarController.listUserCar);

export default CarRouter;
