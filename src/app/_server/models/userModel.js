import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    hash: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true},
    status: { type: Boolean, required: false, default: true },
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

export default mongoose.models.user || mongoose.model("user", userSchema);
