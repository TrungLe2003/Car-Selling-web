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
const upload = multer({
    storage: storage,
    limits: {
        fieldNameSize: 1024
    }
});
//
import NewsModel from "../models/NewsModel.js";

const newsController = {
    createNews: [upload.single('file'), async (req, res) => {
        try {
            const currentUser = req.currentUser;
            const {title, content, isCategory, isStatus} = req.body;
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
                isStatus,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            if (isStatus === 'Đã xuất bản') {
                res.status(201).send({
                    message: 'Đăng bài viết mới thành công!',
                    data: newNews,
                });
            };
            if (isStatus === 'Bản nháp') {
                res.status(201).send({
                    message: 'Đã lưu bản nháp!',
                    data: newNews,
                });
            };
            if (isStatus === 'Thùng rác') {
                res.status(201).send({
                    message: 'Đã bỏ vào thùng rác!',
                    data: newNews,
                });
            };
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null,
            });
        }
    }],
    getAllNews: async (req, res) => {
        try {
            const {isCategory, limit} = req.query;
            const dataLimit = parseInt(limit) || 0;
            if (isCategory) {
                const result = await NewsModel.find({
                    isCategory: isCategory
                })
                .limit(dataLimit)
                .sort({createdAt: -1})
                .populate('author', 'username avatar');
                res.status(200).send({
                    message: 'Lấy thông tin tất cả bài viết theo danh mục thành công!',
                    data: result,
                });
            } else {
                const result = await NewsModel.find({})
                .limit(dataLimit)
                .sort({createdAt: -1})
                .populate('author', 'username avatar');
                res.status(200).send({
                    message: 'Lấy thông tin tất cả bài viết thành công!',
                    data: result,
                });
            }
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null,
            });
        }
    },
    getAllNewsPublished: async (req, res) => {
        try {
            const {isCategory, limit} = req.query;
            const dataLimit = parseInt(limit) || 0;
            if (isCategory) {
                const result = await NewsModel.find({
                    isCategory: isCategory,
                    isStatus: 'Đã xuất bản'
                })
                .limit(dataLimit)
                .sort({createdAt: -1})
                .populate('author', 'username avatar');
                res.status(200).send({
                    message: 'Lấy thông tin tất cả bài viết theo danh mục thành công!',
                    data: result,
                });
            } else {
                const result = await NewsModel.find({
                    isStatus: 'Đã xuất bản'
                })
                .limit(dataLimit)
                .sort({createdAt: -1})
                .populate('author', 'username avatar');
                res.status(200).send({
                    message: 'Lấy thông tin tất cả bài viết thành công!',
                    data: result,
                });
            }
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null,
            });
        }
    },
    getNewsById: async (req, res) => {
        try {
            const {id} = req.params;
            const result = await NewsModel.findById(id)
            .populate('author', 'username avatar');
            res.status(200).send({
                message: 'Lấy thông tin bài viết thành công!',
                data: result,
            });
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null,
            });
        }
    },
}

export default newsController