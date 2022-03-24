import { careerService } from "../services/careerService.js";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";

const careerRouter = Router();

careerRouter.post("/careers", loginRequired, async (req, res, next) => {
  try {
    const { title, fromDate, toDate } = req.body;
    const userId = req.currentUserId;
    const createCareer = await careerService.addCareer({
      userId,
      title,
      fromDate,
      toDate,
    });

    const body = {
      success: true,
      career: createCareer,
    };

    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

careerRouter.get("/careers/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const career = await careerService.getCareer({ id });

    const body = {
      success: true,
      career
    };

    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

careerRouter.put("/careers/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const toUpdate = {
      ...req.body,
    };
    const career = await careerService.updateCareer({ id, toUpdate });

    const body = {
      success: true,
      career
    };

    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

careerRouter.get(
  "/career-lists/:userId",
  loginRequired,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const careers = await careerService.getCareers({ userId });

      const body = {
        success: true,
        careers
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.delete("/careers/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const career = await careerService.deleteCareer({ id });
    res.status(200).json({ success: true, message: "성공적으로 삭제되었습니다."});
  } catch (error) {
    next(error);
  }
});

export { careerRouter };
