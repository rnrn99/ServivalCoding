import { AwardService } from "../services/awardService.js";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";

const awardRouter = Router();

awardRouter.post("/award/create", login_required, async (req, res, next) => {
  try {
    const { user_id, title, description } = req.body;

    const createdAward = await AwardService.addAward({
      user_id,
      title,
      description,
    });
    return res
      .status(201)
      .json({ status: "succ", meesage: "Award 생성 성공", createdAward });
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", login_required, async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await AwardService.getAward({ id });
    return res.status(201).json(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", login_required, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const toUpdate = {
      title,
      description,
    };

    const award = await AwardService.putAward({ id, toUpdate });
    res.status(201).json({ status: "succ", message: "수정 성공", award });
  } catch (error) {
    next(error);
  }
});

awardRouter.get(
  "/awardlist/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const awards = await AwardService.listAward({ user_id });
      res.status(201).json(awards);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.delete("/awards/:id", login_required, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteAward = await AwardService.removeAward({ id });
    if (!deleteAward) {
      return res
        .status(404)
        .json({ status: "fail", message: "삭제할 자료가 없습니다." });
    }
    res.status(201).json({ status: "succ", message: "삭제 성공" });
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
