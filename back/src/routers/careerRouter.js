import { careerService } from "../services/careerService.js";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import {
  checkUpdate,
  checkId,
  checkUserId,
  checkCareerCreated,
} from "../middlewares/checkMiddleware.js";
import * as commonMiddleware from "../middlewares/commonMiddleware.js";

const careerRouter = Router();

careerRouter.post(
  "/careers",
  loginRequired,
  commonMiddleware.isBodyEmpty,
  checkCareerCreated,
  commonMiddleware.checkRequestBody("title", "fromDate", "toDate"),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const createCareer = await careerService.addCareer({
        userId,
        ...req.toPost
      });

      const body = {
        success: true,
        career: createCareer,
      };

      res
        .status(201)
        .json(body);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.get(
  "/careers/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  checkId,
  async (req, res, next) => {
    try {
      const id = req.id

      const career = await careerService.getCareer({ id });

      const body = {
        success: true,
        career,
      };

      res
        .status(200)
        .json(body);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.put(
  "/careers/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  checkId,
  checkUpdate,
  commonMiddleware.checkRequestBody("title", "fromDate", "toDate"),
  async (req, res, next) => {
    try {
      const id = req.id;

      const toUpdate = req.toPost;

      const career = await careerService.updateCareer({ id, toUpdate });

      const body = {
        success: true,
        career,
      };

      res
        .status(201)
        .json(body);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.get(
  "/career-lists/:userId",
  loginRequired,
  commonMiddleware.getParameter("userId"),
  checkUserId,
  async (req, res, next) => {
    try {
      const userId = req.userId;

      const careers = await careerService.getCareers({ userId });

      const body = {
        success: true,
        careers,
      };

      res
        .status(200)
        .json(body);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.delete(
  "/careers/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  checkId,
  async (req, res, next) => {
    try {
      const id = req.id;

      await careerService.deleteCareer({ id });
      res
        .status(200)
        .json({ success: true, message: "성공적으로 삭제되었습니다." });
    } catch (error) {
      next(error);
    }
  }
);

export { careerRouter };
