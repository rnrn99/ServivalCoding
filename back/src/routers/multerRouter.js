import multer from "multer";
import path from "path";
import dayjs from "dayjs";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { UserAuthService } from "../services/userService.js";

const multerRouter = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

multerRouter.post(
  "/profiles",
  loginRequired,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const profile = req.file.filename;
      const userId = req.currentUserId;
      const result = await UserAuthService.setProfile({ userId, profile });
      res.status(201).json({
        success: true,
        profiles: req.file,
      });
    } catch (error) {
      next(error);
    }
  }
);

multerRouter.get("/profiles", async (req, res, next) => {
  res.send(
    `<img src="profile-67fe5e13-35ef-41a3-8e1a-2bbf946aca83.png"></img>`
  );
});

export { multerRouter };
