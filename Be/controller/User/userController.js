import UserModel from "../../Model/UserModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const UserController = {
  //Mật khẩu t để 123456 nhé
  register: async (req, res) => {
    try {
      const { email, password, phoneNumber } = req.body;
      console.log(req.body);
      // Validate
      if (!email || email.length < 6) {
        return res
          .status(400)
          .send({ message: "Email must be at least 6 characters." });
      }
      if (!password || password.length < 6) {
        return res
          .status(400)
          .send({ message: "Password must be at least 6 characters." });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await UserModel.create({
        email,
        password: hashedPassword,
        phoneNumber,
      });
      res.status(201).send({
        message: "Successful!",
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
  logIn: async (req, res) => {
    try {
      const data = { email: req.body.email, password: req.body.password };
      if (!data.email || !data.password) {
        return res.status(400).send({
          message: "Email and password are required",
        });
      }
      //tìm email
      const findAccount = await UserModel.findOne({ email: data.email });
      if (!findAccount) {
        return res.status(404).send({
          message: "Email is invalid",
        });
      }
      //so sánh password
      const comparePassword = bcrypt.compareSync(
        data.password,
        findAccount.password
      );
      if (!comparePassword) {
        res.status(401).send({
          message: "Password is invalid",
        });
        return;
      }
      //trả token
      const accessToken = jwt.sign(
        {
          id: findAccount._id,
          email: findAccount.email,
          role: findAccount.role,
        }, //Payload
        SECRET_KEY,
        { expiresIn: 60 * 60 * 24 * 7 * 4 }
      );
      const refreshToken = jwt.sign(
        {
          id: findAccount._id,
          email: findAccount.email,
          role: findAccount.role,
        },
        SECRET_KEY,
        {
          expiresIn: 60 * 60 * 24 * 7 * 4,
        }
      );
      res.status(200).send({
        message: "Login Successful",
        accessToken,
        refreshToken,
        role: findAccount.role,
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
