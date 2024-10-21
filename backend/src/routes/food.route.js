import express from "express";
import {
  addFood,
  foodList,
  removeFood,
} from "../controllers/food.controller.js";
import multer from "multer";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

foodRouter.post("/add", uploads.single("image"), addFood);
foodRouter.get("/list", foodList);
foodRouter.post("/remove", uploads.single("image"), removeFood);

export default foodRouter;
