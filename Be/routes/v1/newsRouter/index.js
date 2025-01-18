import { Router } from "express";
import middlewares from "../../../middlewares/index.js"
import newsController from "../../../controllers/newsController.js";
const NewsRouter = Router();

NewsRouter.post("/create-news", middlewares.verifyAccessToken, newsController.createNews);
NewsRouter.get("/", newsController.getAllNews);
NewsRouter.get("/:id", newsController.getNewsById);

export default NewsRouter;
