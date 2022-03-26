import { careerService } from "../services/careerService.js";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";

const careerRouter = Router();

careerRouter.post("/careers", loginRequired, async (req, res, next) => {
  try {
    const { userId, title, fromDate, toDate } = req.body;
    const createCareer = await careerService.addCareer({
      userId,
      title,
      fromDate,
      toDate,
    });
    res
      .status(201)
      .json({ status: "succ", message: "경력 생성 성공", createCareer });
  } catch (error) {
    next(error);
  }
});

careerRouter.get("/careers/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const career = await careerService.getCareer({ id });
    res.status(201).json(career);
  } catch (error) {
    next(error);
  }
});

careerRouter.put("/careers/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, fromDate, toDate } = req.body;
    const toUpdate = {
      title,
      fromDate,
      toDate,
    };
    const career = await careerService.setCareer({ id, toUpdate });
    res.status(201).json(career);
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
      res.status(201).json(careers);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.delete("/careers/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const career = await careerService.deleteCareer({ id });
    res.status(200).json({ data: career, code: 200, message: "삭제 성공" });
  } catch (error) {
    next(error);
  }
});

export { careerRouter };
