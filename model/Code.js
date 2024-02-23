import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema(
  {
    html: {
      type: String,
    },

    css: {
      type: String,
    },

    javascript: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Code", CodeSchema);
