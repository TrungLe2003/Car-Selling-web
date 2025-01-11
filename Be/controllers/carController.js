
import CarModel from "../models/CarModel.js"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
cloudinary.config({
    cloud_name: 'dxkokrlhr',
    api_key: '494724485678384',
    api_secret: 'KWRTFbpOnBzDtbcx7xsipZUnVKM'
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const CarController = {
    createCar: async (req, res) => {
        try {
            const { carName, carPrice } = req.body;
            const checkCar = await CarModel.find({});
            let gearBox;
            if (checkCar.length === 0) {
                gearBox = 'Tự động'
            };
            const newCar = await CarModel.create({
                carName,
                carPrice,
                carImg: '',
                color: '',
                version: '',
                ODO: '',
                year: '',
                origin: '',
                gearBox,
                driveSystem: '',
                torque: '',
                engine: '',
                horsePower: '',
                power: '',
            });
            res.status(201).send({
                message: 'Tạo xe thành công!',
                data: newCar,
            });
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null,
            });
        }
    },
    getCar: async (req, res) => {
        try {
            const { id } = req.params;
            const car = await CarModel.findById(id)
            res.status(200).send({
                message: 'Successful',
                data: car
            })
        } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null,
            });
        }
    },
    getListCar: async (req, res) => {
        try {
            const listcar = await CarModel.find()
            res.status(200).send({
                message: 'Successful',
                data: car
            })
        } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null,
            });
        }
    },
}


export default CarController;

