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
      const { school, major, position } = req.body;
      const newEducation = await EducationService.addEducation({
        userId,
        school,
        major,
        position,
      });
      res
        .status(201)
        .json({ data: newEducation, code: 201, message: "학력 생성 성공!" });
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
      res
        .status(200)
        .json({ data: education, code: 200, message: "학력 조회 성공" });
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
      const education = await EducationService.getEducationsList({ userId });
      res
        .status(200)
        .json({ data: education, code: 200, message: "학력 리스트 조회 성공" });
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
      if (toUpdate === null || toUpdate === undefined) {
        return res
          .status(400)
          .json({ code: 400, message: "수정할 값을 넣어주지 않았습니다." });
      }
      const education = await EducationService.updateEducation({
        id,
        toUpdate,
      });
      res
        .status(201)
        .json({ data: education, code: 201, message: "학력 수정 성공" });
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
      if (!education) {
        return res
          .status(404)
          .json({ code: 404, message: "삭제할 자료가 없습니다." });
      }
      res
        .status(200)
        .json({ data: education, code: 200, message: "학력 삭제 성공!" });
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
