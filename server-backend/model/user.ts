import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

export default mongoose.model("user", userSchema);
