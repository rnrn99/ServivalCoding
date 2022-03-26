import { AwardService } from "../services/awardService.js";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import {
  checkUpdate,
  checkId,
  checkAwardCreated,
  checkUserId,
} from "../middlewares/checkMiddleware.js";
import * as commonMiddleware from "../middlewares/commonMiddleware.js";

const awardRouter = Router();

awardRouter.post(
  "/awards",
  loginRequired,
  commonMiddleware.isBodyEmpty,
  checkAwardCreated,
  commonMiddleware.checkRequestBody("title", "description"),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const createdAward = await AwardService.addAward({
        userId,
        ...req.toPost
      });

      const body = {
        success: true,
        award: {
          ...createdAward,
        },
      };

      res
        .status(201)
        .json(body);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.get(
  "/awards/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  checkId,
  async (req, res, next) => {
    try {
      const id = req.id;

      const award = await AwardService.getAward({ id });

      const body = {
        success: true,
        award,
      };

      res
        .status(200)
        .json(body);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.put(
  "/awards/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  checkId,
  checkUpdate,
  commonMiddleware.checkRequestBody("title", "description"),
  async (req, res, next) => {
    try {
      const id = req.id;

      const toUpdate = req.toPost
      const award = await AwardService.updateAward({ id, toUpdate });

      const body = {
        success: true,
        award,
      };

      res
        .status(201)
        .json(body);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.get(
  "/award-lists/:userId",
  loginRequired,
  commonMiddleware.getParameter("userId"),
  checkUserId,
  async (req, res, next) => {
    try {
      const userId = req.userId;

      const awards = await AwardService.listAward({ userId });

      const body = {
        success: true,
        awards,
      };

      res
        .status(200)
        .json(body);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.delete(
  "/awards/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  checkId,
  async (req, res, next) => {
    try {
      const id = req.id;

      const award = await AwardService.deleteAward({ id });

      const body = {
        success: true,
        award,
      };

      res
        .status(200)
        .json(body);
    } catch (error) {
      next(error);
    }
  }
);

export { awardRouter };
