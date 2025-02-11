import { Router } from "express";
import middlewares from "../../../middlewares/index.js"
import commentController from "../../../controllers/commentController.js";
const CommentRouter = Router();

CommentRouter.post("/create-comment", middlewares.verifyAccessToken, commentController.createComment);
CommentRouter.get("/", commentController.getAllComment);
CommentRouter.get("/commentByNewsId", commentController.getCommentByNewsId);

export default CommentRouter;
