import {Router} from "express";
import {getCode, getUser, register, signin} from "../controllers/UserController.js";
import protectUser from "../middleware/Protect.js";

const route = Router();

route.post("/register", register);
route.post("/signin", signin);

route.get("/:id", getCode);
route.post("/getuser", protectUser, getUser);

export default route;
