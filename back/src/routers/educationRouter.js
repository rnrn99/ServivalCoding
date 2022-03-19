import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { EducationService } from "../services/educationService.js";

const educationRouter = Router();

educationRouter.post(
  "/educations",
  loginRequired,
  async function (req, res, next) {
    try {
      const { userId } = req.body;
      const { school } = req.body;
      const { major } = req.body;
      const { position } = req.body;
      const newEducation = await EducationService.addEducation({
        userId,
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
  loginRequired,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const education = await EducationService.getEducation({ id });
      res.status(201).json(education);
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
      res.status(201).json(education);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.put(
  "/educations/:id",
<<<<<<< HEAD
  login_required,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { school, major, position } = req.body;
=======
  loginRequired,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const school = req.body.school;
      const major = req.body.major;
      const position = req.body.position;
>>>>>>> d34a64822e8cdf702138c5746d31f374e5cff697
      const toUpdate = {
        school,
        major,
        position,
      };
      const education = await EducationService.updateEducation({
        id,
        toUpdate,
      });
<<<<<<< HEAD
      res.status(201).json({ message: "수정 성공", education });
=======
      console.log(education);
      res.status(201).json({ message: "수정 성공" });
>>>>>>> d34a64822e8cdf702138c5746d31f374e5cff697
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
      const deleteEducation = await EducationService.removeEducation({ id });
      if (!deleteEducation) {
        return res
          .status(404)
          .json({ status: "fail", message: "삭제할 자료가 없습니다." });
      }
      res.status(200).json({ status: "succ", message: "삭제 성공!" });
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
