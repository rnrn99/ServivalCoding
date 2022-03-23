import multer from "multer";
import express from "express";
import { loginRequired } from "../middlewares/loginRequired.js";

const multerRouter = express.Router();

const upload = multer({
  dest: "./src/uploads",
});

multerRouter.post(
  "/profile",
  loginRequired,
  upload.single("image"),
  (req, res, next) => {
    try {
      console.log(req.file);
      res
        .status(201)
        .json({ data: req.file.path, status: 201, message: "성공" });
    } catch (error) {
      next(error);
    }
  }
);

export { multerRouter };
