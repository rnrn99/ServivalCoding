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
    console.log(createdAward);
    return res.status(201).json({ status: "succ", meesage: "Award 생성 성공" });
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", login_required, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const award = await AwardService.getAward({ id });
    return res.status(201).json(award);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
