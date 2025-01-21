// mongodb+srv://TrungLe2003:Trungcrazy2003@carsellingweb.amr1k.mongodb.net/
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
//
import RootRouter from "./routes/index.js";

await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected database!");
  });

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
//app.use(cors());
app.get("", (req, res) => {
  res.send({
    message: "Connected!",
  });
});

app.use("/api", RootRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("This is Car Selling Project");
});
