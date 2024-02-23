import {Router} from "express";
import {getCode, saveCode} from "../controllers/CompileController.js";

const route = Router();

route.post("/save", saveCode);
route.get("/:id", getCode);

export default route;
