import NewsModel from "../models/NewsModel.js";

const commentMidleware = {
    validateNews: async (req, res, next) => {
        try {
            const {newsId} = req.body;
            const news = await NewsModel.findById(newsId);
            if (news.isStatus === 'draft') throw new Error('Tin chưa xuất bản, chưa thể bình luận!');
            next();
        } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null,
            });
        }
    },
}

export default commentMidleware