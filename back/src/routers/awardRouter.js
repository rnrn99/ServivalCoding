import { AwardService } from "../services/awardService.js";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";

const awardRouter = Router();

awardRouter.post("/awards", loginRequired, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.currentUserId;
    const createdAward = await AwardService.addAward({
      userId,
      title,
      description,
    });
    return res
      .status(201)
      .json({ data: createdAward, code: 201, meesage: "수상내역 생성 성공" });
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await AwardService.getAward({ id });
    if (!award) {
      return res
        .status(404)
        .json({ code: 404, message: "올바르지 않은 id 입니다." });
    }
    return res
      .status(201)
      .json({ data: award, code: 200, message: "수상내역 조회 성공" });
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", loginRequired, async (req, res, next) => {
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

    const award = await AwardService.updateAward({ id, toUpdate });

    res
      .status(201)
      .json({ data: award, code: 201, message: "수상내역 수정 성공" });
  } catch (error) {
    next(error);
  }
});

awardRouter.get(
  "/award-lists/:userId",
  loginRequired,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (userId === null || userId === undefined) {
        return res
          .status(404)
          .json({ code: 404, message: "userId 값을 넣어주세요." });
      }
      const awards = await AwardService.listAward({ userId });
      res.status(201).json({
        data: awards,
        code: 200,
        message: "수상내역 리스트 조회 성공",
      });
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.delete("/awards/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await AwardService.deleteAward({ id });
    if (award === null || award === undefined) {
      return res
        .status(400)
        .json({ code: 400, message: "삭제할 자료가 없습니다." });
    }
    res
      .status(201)
      .json({ data: award, code: 201, message: "수상내역 삭제 성공" });
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
