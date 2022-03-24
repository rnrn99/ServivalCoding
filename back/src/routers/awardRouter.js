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

    const body = {
      success: true,
      award: {
        ...createdAward
      }
    }

    return res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await AwardService.getAward({ id });

    const body = {
      success: true,
      award
    }

    return res.status(200).json(body);
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

    const body = {
      success: true,
      award
    }

    res.status(201).json(body);
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

      const body = {
        success: true,
        awards
      }

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.delete("/awards/:id", loginRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await AwardService.deleteAward({ id });

    const body = {
      success: true,
      award
    }

    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
