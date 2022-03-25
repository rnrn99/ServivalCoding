import multer from "multer";
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
      await UserAuthService.setProfile({ userId, profile });
      res.status(201).json({
        success: true,
        profiles: req.file,
      });
    } catch (error) {
      next(error);
    }
  }
);

export { multerRouter };
