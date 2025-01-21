import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title: String,
    content: Object,
    img: String,
    isCategory: {
        type: String,
        enum: ["carNews", "marketNews", "explore"],
    },
    isStatus: {
        type: String,
        enum: ["Đã xuất bản", "Bản nháp", "Thùng rác"],
    },
    createdAt: Date,
    updatedAt: Date,
});

const NewsModel = mongoose.model("news", newsSchema);

export default NewsModel;
