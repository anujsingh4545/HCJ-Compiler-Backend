import express from "express";
import cors from "cors";
import "dotenv/config";
import {DbConnect} from "./controllers/DbConnect.js";
import UserRoute from "./routes/UserRoute.js";
import CompilerRoute from "./routes/CompilerRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

// global error middleware
app.use((error, req, res, next) => {
  res.status(500).send({
    message: "An Internal server error occured !",
    success: false,
  });
});

DbConnect();

app.use("/user", UserRoute);
app.use("/compiler", CompilerRoute);

app.listen(4001, () => {
  console.log("hello world");
});
