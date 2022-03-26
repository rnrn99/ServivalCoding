import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { EducationService } from "../services/educationService.js";
import { UserAuthService } from "../services/userService.js";
import {
  checkUpdate,
  checkId,
  checkUserId,
  checkEducationCreated,
} from "../middlewares/checkMiddleware.js";
import * as commonMiddleware from "../middlewares/commonMiddleware.js";

const educationRouter = Router();

educationRouter.post(
  "/educations",
  loginRequired,
  commonMiddleware.isBodyEmpty,
  checkEducationCreated,
  commonMiddleware.checkRequestBody("school", "major", "position"),
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const newEducation = await EducationService.addEducation({
        userId,
        ...req.toPost,
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
  commonMiddleware.getParameter("id"),
  checkId,
  async function (req, res, next) {
    try {
      const id = req.id;
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
  commonMiddleware.getParameter("userId"),
  checkUserId,
  async function (req, res, next) {
    try {
      const userId = req.userId;

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
  commonMiddleware.getParameter("id"),
  checkId,
  checkUpdate,
  commonMiddleware.checkRequestBody("school", "major", "position"),
  async (req, res, next) => {
    try {
      const id = req.id;
      const toUpdate = req.toPost;

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
  commonMiddleware.getParameter("id"),
  checkId,
  async (req, res, next) => {
    try {
      const id = req.id;
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
