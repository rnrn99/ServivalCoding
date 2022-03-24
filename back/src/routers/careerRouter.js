import { careerService } from "../services/careerService.js";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import {
  checkId,
  checkUserId,
  checkCareerCreated,
  checkUpdate,
} from "../middlewares/checkMiddleware.js";

const careerRouter = Router();

careerRouter.post(
  "/careers",
  loginRequired,
  checkCareerCreated,
  async (req, res, next) => {
    try {
      const { title, fromDate, toDate } = req.body;
      const userId = req.currentUserId;
      const createCareer = await careerService.addCareer({
        userId,
        title,
        fromDate,
        toDate,
      });
      res.status(201).json(createCareer);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.get(
  "/careers/:id",
  loginRequired,
  checkId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const career = await careerService.getCareer({ id });
      res.status(200).json(career);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.put(
  "/careers/:id",
  loginRequired,
  checkId,
  checkUpdate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const toUpdate = {
        ...req.body,
      };
      const career = await careerService.updateCareer({ id, toUpdate });
      res.status(201).json(career);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.get(
  "/career-lists/:userId",
  loginRequired,
  checkUserId,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const careers = await careerService.getCareers({ userId });
      res.status(200).json(careers);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.delete(
  "/careers/:id",
  loginRequired,
  checkId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const career = await careerService.deleteCareer({ id });
      res.status(200).json(career);
    } catch (error) {
      next(error);
    }
  }
);

export { careerRouter };
