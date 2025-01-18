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
import NewsModel from "../models/NewsModel.js";

const newsController = {
    createNews: [upload.single('file'), async (req, res) => {
        try {
            const currentUser = req.currentUser;
            const {title, content, isCategory} = req.body;
            const file = req.file;
            if (!file) throw new Error('Chưa lựa chọn ảnh!');
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const fileName = file.originalname.split('.')[0];
            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: fileName,
                resource_type: 'auto',
            });
            const newNews = await NewsModel.create({
                author: currentUser._id,
                title,
                content,
                img: result.secure_url,
                isCategory,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            res.status(201).send({
                message: 'Đăng bài viết mới thành công!',
                data: newNews,
            });
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null,
            });
        }
    }],
    getAllNews: async (req, res) => {
        try {
            const result = await NewsModel.find({})
            .populate('author');
            const allNews = result.map(news => ({
                _id: news._id,
                author: news.author.username,
                title: news.title,
                content: news.content,
                img: news.img,
                isCategory: news.isCategory,
                isStatus: news.isStatus,
                createdAt: news.createdAt,
                updatedAt: news.updatedAt,
            }));
            res.status(200).send({
                message: 'Lấy thông tin tất cả bài viết thành công!',
                data: allNews,
            });
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null,
            });
        }
    },
    getNewsById: async (req, res) => {
        try {
            const {id} = req.params
            const result = await NewsModel.findById(id)
            .populate('author');
            const news = {
                _id: result._id,
                avatarAuthor: result.author.avatar,
                usernameAuthor: result.author.username,
                title: result.title,
                content: result.content,
                img: result.img,
                isCategory: result.isCategory,
                isStatus: result.isStatus,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
            };
            res.status(200).send({
                message: 'Lấy thông tin bài viết thành công!',
                data: news,
            });
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null,
            });
        }
    }
}

export default newsController