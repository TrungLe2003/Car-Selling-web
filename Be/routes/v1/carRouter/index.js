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
//// lấy tất cả xe của user qua id
CarRouter.get("/:idProvider", CarController.listUserCar);
////sửa thông tin của xe
CarRouter.put("/updatecar/:idCar", UserMiddleware.checkProviderOrAdmin, CarController.updatedCar);
///xoá xe
CarRouter.delete("/deletecar/:idCar", UserMiddleware.checkProviderOrAdmin, CarController.deleteCar);

export default CarRouter;
