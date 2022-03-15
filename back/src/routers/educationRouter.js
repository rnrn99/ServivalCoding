import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { educationService } from "../services/educationService.js";

const educationRouter = Router();

educationRouter.post(
  "/education/create",
  login_required,
  async function (req, res, next) {
    try {
      const newEducation = await educationService.addEducation(
        req.body.id,
        req.body.school,
        req.body.major,
        req.body.position
      );
      res.status(201).json(newEducation);
      // status(400) 잘못된 데이터 인식 [ API 호출하는 쪽의 문제 ] validator 함수를 사용하기
      // express-validator 알아보기! [middleware 타이트하게 체크!] [ 스키마도 체크 해줌! ]
    } catch (err) {
      next(err);
    }
  }
);

educationRouter.get("/educationlist/:id", async function (req, res) {
  const educations = await educationService.getEducations(req.params.id);
  res.status(201).json(educations);
});

educationRouter.get("/education/:id", async function (req, res) {
  const education = await educationService.getEducation(req.params.id);
  res.status(201).json(education);
});

export { educationRouter };
