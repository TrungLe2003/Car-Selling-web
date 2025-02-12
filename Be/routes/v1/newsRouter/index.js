import { Router } from "express";
import middlewares from "../../../middlewares/index.js"
import newsController from "../../../controllers/newsController.js";
const NewsRouter = Router();

NewsRouter.post("/create-news", middlewares.verifyAccessToken, newsController.createNews); // Tạo tin tức mới
NewsRouter.put("/edit-news/:id", middlewares.verifyAccessToken, newsController.editNews); // Sửa tin tức
NewsRouter.get("/the3LatestNewsPerCategory", newsController.getThe3LatestNewsPerCategory); // 3 tin mới nhất mỗi danh mục, hiển thị ở NewsPage - Overview
NewsRouter.get("/publishedByCategory", newsController.getAllNewsPublishedByCategory); // Đã xuất bản, hiển thị ở NewsPage - Category
NewsRouter.get("/countNews", newsController.countNews); // Đếm tất cả tin và theo trạng thái
NewsRouter.get("/", newsController.getAllNews); // Tất cả, hiển thị ở AdminPage
NewsRouter.delete("/deleteNewsById/:id", middlewares.verifyAccessToken, newsController.deleteNewsById); // Tất cả, hiển thị ở AdminPage
NewsRouter.get("/:id", newsController.getNewsById); // Theo id

export default NewsRouter;
