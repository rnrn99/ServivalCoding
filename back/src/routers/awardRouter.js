import { AwardService } from "../services/awardService.js";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";

const awardRouter = Router();

awardRouter.post("/awards", loginRequired, async (req, res, next) => {
  try {
    const { userId, title, description } = req.body;

    const createdAward = await AwardService.addAward({
      userId,
      title,
      description,
    });
    console.log(createdAward);
    return res.status(201).json({ status: "succ", meesage: "Award 생성 성공" });
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await AwardService.getAward({ id });
    return res.status(201).json(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", loginRequired, async (req, res, next) => {
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
  "/award-lists/:userId",
  loginRequired,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const awards = await AwardService.listAward({ userId });
      res.status(201).json(awards);
    } catch (error) {
      next(error);
    }
  }
);

export { awardRouter };
