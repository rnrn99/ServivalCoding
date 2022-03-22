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
    res
      .status(201)
      .json({ data: createCareer, code: 201, message: "경력 생성 성공" });
  } catch (error) {
    next(error);
  }
});

careerRouter.get("/careers/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const career = await careerService.getCareer({ id });
    res
      .status(200)
      .json({ data: career, code: 200, message: "경력 조회 성공" });
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
    if (toUpdate === null || toUpdate === undefined) {
      return res
        .status(400)
        .json({ code: 400, message: "수정할 값을 넣어주지 않았습니다." });
    }
    const career = await careerService.updateCareer({ id, toUpdate });
    res
      .status(201)
      .json({ data: career, code: 201, message: "경력 수정 성공" });
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
      if (userId === null || userId === undefined) {
        return res
          .status(404)
          .json({ code: 404, message: "올바르지 않은 userId 입니다." });
      }
      const careers = await careerService.getCareers({ userId });
      res
        .status(200)
        .json({ data: careers, code: 200, message: "경력 리스트 조회 성공" });
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.delete("/careers/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const career = await careerService.deleteCareer({ id });
    if (career === null || career === undefined) {
      return res
        .status(400)
        .json({ code: 400, message: "삭제할 자료가 없습니다." });
    }
    res.status(200).json({ data: career, code: 200, message: "삭제 성공" });
  } catch (error) {
    next(error);
  }
});

export { careerRouter };
