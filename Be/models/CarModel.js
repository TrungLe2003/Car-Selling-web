import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: true,
  },
  carImg: String,
  carPrice: {
    type: Number,
    required: true,
    min: 1
  },
  color: String,
  version: String,
  ODO: String, //odograph: máy ghi quãng đường của ô tô
  year: Number,
  origin: String, //xuất xứ
  gearBox: { type: String, enum: ["Tự động", "Số sàn"], default: "Tự động" }, //Hộp số
  driveSystem: String, //Hệ dẫn động,
  torque: String, //Momen xoắn,
  engine: String, //Động cơ
  horsePower: String, //mã lực
  power: String, //năng lượng
  //   idProvider: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: '',
  //   },
});

const CarModel = mongoose.model("cars", carSchema);

export default CarModel;
