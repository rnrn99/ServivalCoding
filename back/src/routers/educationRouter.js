import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { EducationService } from "../services/educationService.js";

const educationRouter = Router();

educationRouter.post(
  "/educations",
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const newEducation = await EducationService.addEducation({
        userId,
        ...req.body,
      });
      res.status(201).json(newEducation);
      // status(400) 잘못된 데이터 인식 [ API 호출하는 쪽의 문제 ] validator 함수를 사용하기
      // express-validator 알아보기! [middleware 타이트하게 체크!] [ 스키마도 체크 해줌! ]
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get(
  "/educations/:id",
  loginRequired,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const education = await EducationService.getEducation({ id });
      res.status(200).json(education);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get(
  "/education-lists/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      const educations = await EducationService.getEducationsList({ userId });
      res.status(200).json(educations);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.put(
  "/educations/:id",
  loginRequired,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const toUpdate = {
        ...req.body,
      };
      const education = await EducationService.updateEducation({
        id,
        toUpdate,
      });
      res.status(201).json(education);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.delete(
  "/educations/:id",
  loginRequired,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const education = await EducationService.deleteEducation({ id });
      res.status(200).json(education);
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
