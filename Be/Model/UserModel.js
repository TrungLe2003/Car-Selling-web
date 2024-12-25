import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  avatarImg: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
