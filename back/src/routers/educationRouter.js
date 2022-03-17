import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { educationService } from "../services/educationService.js";

const educationRouter = Router();

educationRouter.post(
  "/education/create",
  login_required,
  async function (req, res, next) {
    try {
      const { user_id } = req.body;
      const { school } = req.body;
      const { major } = req.body;
      const { position } = req.body;
      const newEducation = await educationService.addEducation({
        user_id,
        school,
        major,
        position,
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
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const education = await educationService.getEducation({ id });
      res.status(201).json(education);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get(
  "/educationlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const { user_id } = req.params;
      const education = await educationService.getEducationsList({ user_id });
      res.status(201).json(education);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.put(
  "/educations/:id",
  login_required,
  async function (req, res) {
    try {
      const id = req.params.id;
      const school = req.body.school;
      const major = req.body.major;
      const position = req.body.position;
      const toUpdate = {
        school,
        major,
        position,
      };
      const education = await educationService.updateEducation({
        id,
        toUpdate,
      });

      res.status(201).json({ message: "수정 성공" });
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
