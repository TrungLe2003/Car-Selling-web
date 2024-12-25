// mongodb+srv://TrungLe2003:Trungcrazy2003@carsellingweb.amr1k.mongodb.net/
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import RootRouter from "./Router/index.js";

await mongoose
  .connect(
    "mongodb+srv://TrungLe2003:Trungcrazy2003@carsellingweb.amr1k.mongodb.net/CarSellingWeb"
  )
  .then(() => {
    console.log("Connected database!");
  });

const app = express();
app.use(express.json());
app.use(cors());
app.get("", (req, res) => {
  res.send({
    message: "Connected!",
  });
});

app.use("/api", RootRouter);

app.listen(8081, () => {
  console.log("This is Car Selling Project");
});
