import bcrypt from "bcrypt";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
cloudinary.config({
  cloud_name: "dxkokrlhr",
  api_key: "494724485678384",
  api_secret: "KWRTFbpOnBzDtbcx7xsipZUnVKM",
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//
import UserModel from "../models/UserModel.js";

const UserController = {
  register: async (req, res) => {
    try {
      const { email, username, password, confirmPassword } = req.body;
      // Validate
      // if (!email || email.length < 6) {
      //   return res
      //     .status(400)
      //     .send({ message: "Email must be at least 6 characters." });
      // };
      // if (!password || password.length < 6) {
      //   return res
      //     .status(400)
      //     .send({ message: "Password must be at least 6 characters." });
      // };
      // Tìm email đã tồn tại
      const existedEmail = await UserModel.findOne({ email });
      if (existedEmail) throw new Error("Email đã tồn tại!");
      // Tìm username đã tồn tại
      const existedUsername = await UserModel.findOne({ username });
      if (existedUsername) throw new Error("Username đã tồn tại!");
      // Kiểm tra mật khẩu nhập lại
      if (confirmPassword !== password)
        throw new Error("Mật khẩu nhập lại không đúng!");
      //
      const checkUser = await UserModel.find({});
      let role;
      if (checkUser.length === 0) {
        role = "ADMIN";
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = await UserModel.create({
        email,
        username,
        fullname: "",
        dateOfBirth: "",
        address: "",
        phoneNumber: "",
        password: hashedPassword,
        salt,
        avatar:
          "https://res.cloudinary.com/dxkokrlhr/image/upload/v1732884464/uj1miv0g9t5hduvbfvlg.png",
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).send({
        message: "Đăng ký thành công!",
        data: newUser,
      });
    } catch (error) {
      res.status(401).send({
        message: error.message,
        data: null,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Tìm user qua email nhập vào
      const findUser = await UserModel.findOne({ email });
      if (!findUser) throw new Error("Email không đúng!");
      // Đối chiếu mật khẩu
      const comparePassword = bcrypt.compareSync(password, findUser.password);
      if (!comparePassword) throw new Error("Mật khẩu không đúng!");
      //
      const getUser = {
        ...findUser.toObject(),
      };
      delete getUser.salt;
      delete getUser.password;
      const accessToken = jwt.sign(getUser, SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      const refreshToken = jwt.sign(getUser, SECRET_KEY, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      req.getUser = {
        ...getUser,
        accessToken,
        refreshToken,
      };
      res.status(200).send({
        message: "Đăng nhập thành công!",
        data: req.getUser,
      });
    } catch (error) {
      res.status(401).send({
        message: error.message,
        data: null,
      });
    }
  },

  /////////////////////

  getListUser: async (req, res) => {
    try {
      const listusers = await UserModel.find();
      res.status(200).send({
        message: "Successful",
        data: listusers,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },

  ////////////

  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      res.status(200).send({
        message: "Successful",
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },

  ///////

  modifyUser: async (req, res) => {
    try {
      const { id } = req.params;
      const dataUpdate = req.body;
      const updateData = await UserModel.findByIdAndUpdate(id, dataUpdate);
      res.status(201).send({
        message: "Successful!",
        data: updateData,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default UserController;
