import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "news",
    },
    content: String,
    createdAt: Date,
    updatedAt: Date,
});

const CommentModel = mongoose.model("comments", commentSchema);

export default CommentModel;
