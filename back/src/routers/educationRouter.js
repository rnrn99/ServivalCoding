import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { EducationService } from "../services/educationService.js";
import { UserAuthService } from "../services/userService.js";
import {
  checkId,
  checkUserId,
  checkEducationCreated,
  checkUpdate,
} from "../middlewares/checkMiddleware.js";

const educationRouter = Router();

educationRouter.post(
  "/educations",
  loginRequired,
  checkEducationCreated,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const newEducation = await EducationService.addEducation({
        userId,
        ...req.body,
      });

      const body = {
        success: true,
        education: {
          ...newEducation,
        },
      };

      res.status(201).json(body);
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
  checkId,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const education = await EducationService.getEducation({ id });

      const body = {
        success: true,
        education,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get(
  "/education-lists/:userId",
  loginRequired,
  checkUserId,
  async function (req, res, next) {
    try {
      const { userId } = req.params;

      // author 정보를 db에서 가져오기
      const author = await UserAuthService.getUserInfo({ userId });

      const educations = await EducationService.getEducationsList({ author });

      const body = {
        success: true,
        educations,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.put(
  "/educations/:id",
  loginRequired,
  checkId,
  checkUpdate,
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

      const body = {
        success: true,
        education,
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.delete(
  "/educations/:id",
  loginRequired,
  checkId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const education = await EducationService.deleteEducation({ id });

      const body = {
        success: true,
        education,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
