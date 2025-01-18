import CarModel from "../models/CarModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
cloudinary.config({
  cloud_name: "dxkokrlhr",
  api_key: "494724485678384",
  api_secret: "KWRTFbpOnBzDtbcx7xsipZUnVKM",
});
const storage = multer.memoryStorage();
const uploadImgCar = multer({ storage: storage }).array("carImg", 5); // CHo phép tối đa 5 ảnh

// Hàm upload ảnh lên Cloudinary sử dụng Promise (sử dụn cho Api đăng tải xe)
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(file.buffer);
  });
};

const CarController = {
  createCar: [
    uploadImgCar,
    async (req, res) => {
      try {
        const { carName, carPrice } = req.body;
        const { idUser } = req.user;

        if (!carName) throw new Error("Cần nhập tên xe");
        if (!carPrice) throw new Error("Cần nhập giá xe");

        // Tải lên Cloudinary và lấy URL
        const files = req.files;
        if (!files || files.length === 0) {
          return res
            .status(400)
            .send({ message: "Chưa có file ảnh nào được tải lên" });
        }

        // Duyệt qua tất cả các ảnh và tải lên Cloudinary
        const imageUrls = await Promise.all(files.map(uploadToCloudinary));

        // Tạo xe mới trong database
        const newCar = await CarModel.create({
          carName,
          carPrice,
          carImg: imageUrls,
          color: req.body.color,
          version: req.body.version,
          ODO: req.body.ODO, //odograph: máy ghi quãng đường của ô tô
          year: req.body.year,
          origin: req.body.origin,
          gearBox: req.body.gearBox, //Hộp số
          driveSystem: req.body.driveSystem, //Hệ dẫn động,
          torque: req.body.torque, //Momen xoắn,
          engine: req.body.engine, //Động cơ
          horsePower: req.body.horsePower, //Mã lực
          power: req.body.power, //năng lượng
          brand: req.body.brand,
          describe: req.body.describe,
          state: req.body.state, //trạng thái: cũ/mới
          color: req.body.color,
          sitChairs: req.body.sitChairs,
          idProvider: idUser,
        });

        res.status(201).send({
          message: "Tạo xe thành công!",
          data: newCar,
        });
      } catch (error) {
        res.status(500).send({
          message: error.message,
          data: null,
        });
      }
    },
  ],
  getCarById: async (req, res) => {
    try {
      const { idCar } = req.params;
      const car = await CarModel.findById(idCar).populate("idProvider");
      res.status(200).send({
        message: "Successful",
        data: car,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
  //api lấy tất cả xe (có limit)
  getListCar: async (req, res) => {
    try {
      const { limit, page } = req.query;
      const dataLimit = parseInt(limit) || 9;
      const pageNumber = parseInt(page) || 1;
      const skip = (pageNumber - 1) * dataLimit; // Số lượng xe cần bỏ qua
      const listCar = await CarModel.find().skip(skip).limit(dataLimit);
      const totalCars = await CarModel.countDocuments({});
      res.status(200).send({
        message: "Successful",
        data: listCar,
        totalPages: Math.ceil(totalCars / dataLimit), // Tổng số trang
        currentPage: pageNumber, // Trang hiện tại
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
  //Lấy xe theo brand
  findCarsByBrand: async (req, res) => {
    try {
      const { brand, limit } = req.query;
      const dataLimit = parseInt(limit) || 0;

      if (!brand) {
        return res.status(400).send({
          message: "Thiếu thông tin brand",
          data: null,
        });
      }
      const cars = await CarModel.find({
        brand: { $regex: brand, $options: "i" }, // Regex không phân biệt hoa thường
      }).limit(dataLimit);

      if (!cars.length) {
        return res.status(404).send({
          message: "Không tìm thấy xe với brand được cung cấp",
          data: [],
        });
      }
      res.status(200).send({
        message: `Tìm thấy ${cars.length} xe theo brand '${brand}'`,
        data: cars,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default CarController;

//Giải thích code:
/*
I) Api create xe

*/
