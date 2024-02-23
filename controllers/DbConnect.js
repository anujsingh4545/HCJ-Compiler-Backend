import mongoose from "mongoose";
import "dotenv/config";

export const DbConnect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Db Connected");
    })
    .catch((e) => {
      console.log("Error connnecting db " + e);
    });
};
