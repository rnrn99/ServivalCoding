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
    return res.status(201).json(createdAward);
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

    const toUpdate = {
      ...req.body,
    };

    const award = await AwardService.updateAward({ id, toUpdate });
    res.status(201).json(award);
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

awardRouter.delete("/awards/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await AwardService.deleteAward({ id });
    res.status(201).json(award);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
