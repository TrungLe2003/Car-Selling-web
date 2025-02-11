import CommentModel from "../models/CommentModel.js";
import UserModel from "../models/UserModel.js";

const commentController = {
    createComment: async (req, res) => {
        try {
            const currentUser = req.currentUser;
            const {newsId, userId, content} = req.body;
            const newComment = await CommentModel.create({
                user: currentUser._id,
                news: newsId,
                content,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            res.status(201).send({
                message: 'Tạo bình luận thành công!',
                data: newComment
            });
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null,
            });
        }
    },
    getAllComment: async (req, res) => {
        try {
            const {limit} = req.query;
            const dataLimit = parseInt(limit) || 0;
            const result = await CommentModel.find({})
            .limit(dataLimit)
            .sort({createdAt: -1})
            .populate('user', 'username avatar');
            res.status(200).send({
                message: 'Lấy thông tin tất cả bình luận thành công!',
                data: result,
            });
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null,
            });
        }
    },
    getCommentByNewsId: async (req, res) => {
        try {
            const {limit, newsId} = req.query;            
            const dataLimit = parseInt(limit) || 0;
            const result = await CommentModel.find({news: newsId})
            .limit(dataLimit)
            .sort({createdAt: -1})
            .populate('user', 'username avatar');
            res.status(200).send({
                message: 'Lấy thông tin tất cả bình luận theo tin thành công!',
                data: result,
            });
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null,
            });
        }
    }
}

export default commentController