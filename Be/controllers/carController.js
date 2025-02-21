import CarModel from "../models/CarModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const getCloudinaryConfig = JSON.parse(process.env.CLOUD_DAINARY_CONFIG);
cloudinary.config(getCloudinaryConfig);
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
  // Tạo đơn đăng bán xe mới
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
  // Lấy thông tin xe theo id
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
  // Lấy tất cả xe (có limit)
  getListCar: async (req, res) => {
    try {
      const { limit, page, brand, state, color, year, minPrice, maxPrice } =
        req.query;
      const dataLimit = parseInt(limit) || 9;
      const pageNumber = parseInt(page) || 1;
      const skip = (pageNumber - 1) * dataLimit;
      // console.log("Min Price:", minPrice, "Max Price:", maxPrice);
      const filters = {};
      if (brand) filters.brand = { $regex: brand, $options: "i" }; //áp các điều kiện vô filter - k phân biệt hoa thường
      if (state) filters.state = state;
      if (color) filters.color = color;
      if (year) filters.year = parseInt(year);
      if (minPrice && maxPrice) {
        filters.carPrice = { $gte: Number(minPrice), $lte: Number(maxPrice) };
      }
      const listCar = await CarModel.find(filters).skip(skip).limit(dataLimit); //find({color : color})
      const totalCars = await CarModel.countDocuments(filters); //Đếm những phần tử thỏa mãn đk
      res.status(200).send({
        message: "Successful",
        data: listCar,
        totalPages: Math.ceil(totalCars / dataLimit),
        currentPage: pageNumber,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
  // Lấy tất xe theo brand
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
  // Hàm thêm lại ghế ngồi (trước đăng lên thiếu)
  updateCarColors: async (req, res) => {
    try {
      const result = await CarModel.updateMany(
        { sitChairs: { $exists: false } }, // chỉ up cái nào cần
        { $set: { sitChairs: 7 } } // Set chỗ ngồi
      );

      res.status(200).send({
        message: "sitChairs updated successfully for all cars",
        modifiedCount: result.modifiedCount, // Number of documents modified
      });
    } catch (error) {
      res.status(500).send({
        message: "Error updating car sitChairs",
        error: error.message,
      });
    }
  },
  // Tìm xe theo tên
  searchingCar: async (req, res) => {
    const { carName, limit, page } = req.query;
    const dataLimit = parseInt(limit) || 9;
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * dataLimit;
    try {
      const regex = new RegExp(carName, "i"); //k pbiet hoa thường
      const cars = await CarModel.find({ carName: regex })
        .limit(dataLimit)
        .skip(skip);
      const totalCars = await CarModel.countDocuments({ carName: regex }); //hàm này cần điều kiện truy vấn (ở đây là carName)
      res.status(200).send({
        message: "Xe bạn tìm",
        data: cars,
        totalPages: Math.ceil(totalCars / dataLimit),
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  // Lấy tất cả xe của Provider theo id
  listUserCar: async (req, res) => {
    try {
      const { idProvider } = req.params;
      const cars = await CarModel.find({ idProvider });
      res.status(200).send({
        message: "Successful",
        data: cars,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
  // Sửa thông tin của xe
  updatedCar: [
    // uploadImgCar,
    async (req, res) => {
      try {
        const { idCar } = req.params;
        // ////Tải lên Cloudinary và lấy URL
        // const files = req.files;
        // if (!files || files.length === 0) {
        //   return res
        //     .status(400)
        //     .send({ message: "Chưa có file ảnh nào được tải lên" });
        // }

        ////Duyệt qua tất cả các ảnh và tải lên Cloudinary
        // const imageUrls = await Promise.all(files.map(uploadToCloudinary));
        const {
          carPrice,
          color,
          ODO,
          year,
          origin,
          gearBox,
          driveSystem,
          torque,
          engine,
          horsePower,
          power,
          brand,
          describe,
          state,
          sitChairs,
        } = req.body;
        const updatedCar = await CarModel.findByIdAndUpdate(idCar, {
          carPrice,
          color,
          ODO,
          year,
          origin,
          gearBox,
          driveSystem,
          torque,
          engine,
          horsePower,
          power,
          brand,
          describe,
          state,
          sitChairs,
        });
        //xóa phần img với name ở 2 dòng trên
        res.status(201).send({
          message: "Update successful!",
          data: updatedCar,
        });
      } catch (error) {
        res.status(500).send({
          message: error.message,
          data: null,
        });
      }
    },
  ],
  // Xoá xe
  deleteCar: async (req, res) => {
    try {
      const { idCar } = req.params;
      const deleteCar = await CarModel.findByIdAndDelete(idCar);
      res.status(201).send({
        message: "Delete successful!",
        data: deleteCar,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  // Phương thêm từ đây để dử dụng cho trang quản trị
  // Đếm tất cả xe theo trạng thái
  countCars: async (req, res) => {
    try {
        const totalCars = await CarModel.find({});
        const approvedCars = await CarModel.find({isStatus: 'approved'});
        const pendingCars = await CarModel.find({isStatus: 'pending'});
        res.status(200).send({
            message: 'Đếm xe thành công!',
            totalCars: totalCars.length,
            approvedCars: approvedCars.length,
            pendingCars: pendingCars.length,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: null,
        });
    }
  },
  // Lấy tất cả xe theo trạng thái
  getAllCar: async (req, res) => {
    try {
      const {limit, currentPage, isStatus} = req.query;
      const dataLimit = parseInt(limit);
      const pageNumber = parseInt(currentPage) || 1;
      const skip = (pageNumber - 1) * dataLimit;
      if (isStatus === 'all') {
        const totalCars = await CarModel.find({}, 'carName brand state isStatus createdAt');
        const result = await CarModel.find({}, 'carName brand state isStatus createdAt')
        .skip(skip)
        .limit(dataLimit)
        .sort({createdAt: -1})
        .populate('idProvider', 'username avatar');
        res.status(200).send({
          message: 'Lấy thông tin tất cả xe thành công!',
          data: result,
          totalPages: Math.ceil(totalCars.length / dataLimit),
        });
      } else {
        const totalCars = await CarModel.find({
          isStatus: isStatus
        }, 'carName brand state isStatus createdAt');
        const result = await CarModel.find({
          isStatus: isStatus
        }, 'carName brand state isStatus createdAt')
        .skip(skip)
        .limit(dataLimit)
        .sort({createdAt: -1})
        .populate('idProvider', 'username avatar');
        res.status(200).send({
          message: 'Lấy thông tin tất cả xe theo trạng thái thành công!',
          data: result,
          totalPages: Math.ceil(totalCars.length / dataLimit),
        });
      }
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
